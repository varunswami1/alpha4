import { useState, useRef } from "react";
import { Upload, Leaf, AlertTriangle, Activity, Shield, Camera } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface DiseaseResult {
  disease_name: string;
  confidence: number;
  cause: string;
  treatment: string;
  prevention: string;
  final_risk: number;
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (JPG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const getGeolocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("Location permission denied. Please enable location access in your browser settings to get accurate disease analysis."));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Location information is unavailable. Please try again."));
              break;
            case error.TIMEOUT:
              reject(new Error("Location request timed out. Please try again."));
              break;
            default:
              reject(new Error("An unknown error occurred while getting your location."));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes cache
        }
      );
    });
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Get geolocation first
      toast({
        title: "Getting location...",
        description: "Please allow location access for accurate analysis",
      });

      const { lat, lon } = await getGeolocation();

      // Prepare FormData with image and location
      const formData = new FormData();
      formData.append("images", selectedFile);
      formData.append("lat", lat.toString());
      formData.append("lon", lon.toString());

      const response = await fetch("http://10.58.164.253:5001/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data: DiseaseResult = await response.json();
      setResult(data);
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${data.disease_name}`,
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      
      // Check if it's a geolocation error
      if (errorMessage.includes("Location") || errorMessage.includes("Geolocation")) {
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Analysis Failed",
          description: "Could not connect to the detection server. Make sure your Flask API is running.",
          variant: "destructive",
        });
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskLevel = (risk: number) => {
    if (risk < 30) return { label: "Low", color: "bg-green-500" };
    if (risk < 60) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "High", color: "bg-red-500" };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-red-500";
    if (score >= 50) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Leaf className="h-7 w-7 text-primary" />
            Plant Disease Detection
          </h1>
          <p className="text-muted-foreground mt-1">
            Upload a plant leaf image to detect diseases using AI-powered analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Upload Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  selectedImage ? "border-primary bg-primary/5" : "border-muted-foreground/30 hover:border-primary"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                
                {selectedImage ? (
                  <div className="space-y-4">
                    <img
                      src={selectedImage}
                      alt="Selected plant leaf"
                      className="max-h-64 mx-auto rounded-lg shadow-md object-contain"
                    />
                    <p className="text-sm text-muted-foreground">
                      Click or drag to change image
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 py-8">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                    <div>
                      <p className="font-medium">Drop your plant leaf image here</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        or click to browse files
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Button
                className="w-full mt-4"
                onClick={analyzeImage}
                disabled={!selectedImage || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Activity className="h-4 w-4 mr-2" />
                    Analyze Disease
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Detection Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  {/* Disease Name & Confidence */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{result.disease_name}</h3>
                      <Badge variant={result.confidence > 0.8 ? "destructive" : "secondary"}>
                        {(result.confidence * 100).toFixed(1)}% Confidence
                      </Badge>
                    </div>
                    
                    {/* Final Risk */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Overall Risk Level</span>
                        <span className={`font-bold ${getScoreColor(result.final_risk)}`}>
                          {result.final_risk.toFixed(1)}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress value={result.final_risk} className="h-3" />
                        <Badge 
                          className={`absolute -top-1 right-0 ${getRiskLevel(result.final_risk).color}`}
                        >
                          {getRiskLevel(result.final_risk).label} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Cause */}
                  <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-4 border border-amber-200 dark:border-amber-900">
                    <h4 className="font-semibold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Cause
                    </h4>
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                      {result.cause}
                    </p>
                  </div>

                  {/* Treatment */}
                  <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-4 border border-green-200 dark:border-green-900">
                    <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Recommended Treatment
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {result.treatment}
                    </p>
                  </div>

                  {/* Prevention */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-4 border border-blue-200 dark:border-blue-900">
                    <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Prevention Tips
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      {result.prevention}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Leaf className="h-16 w-16 mx-auto mb-4 opacity-30" />
                  <p>Upload and analyze an image to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions Card */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Upload Image</h4>
                  <p className="text-sm text-muted-foreground">
                    Take a clear photo of the affected plant leaf
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-medium">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">
                    Our deep learning model analyzes the image
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Get Results</h4>
                  <p className="text-sm text-muted-foreground">
                    View disease details and treatment recommendations
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DiseaseDetection;
