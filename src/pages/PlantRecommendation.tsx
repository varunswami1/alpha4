import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import PlantRecommendationForm from "@/components/garden/PlantRecommendationForm";
import PlantVisualization from "@/components/garden/PlantVisualization";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import type { RecommendationFormData } from "@/components/garden/PlantRecommendationForm";

const PlantRecommendation = () => {
  const [formData, setFormData] = useState<RecommendationFormData | null>(null);
  const { toast } = useToast();

  const handleFormSubmit = (data: RecommendationFormData) => {
    setFormData(data);
    toast({
      title: "Recommendations generated",
      description:
        "Here are your personalized plant recommendations based on your preferences.",
    });
  };

  const handleDownload = () => {
    const visualizationElement = document.getElementById("plant-visualization");

    if (!visualizationElement) {
      toast({
        variant: "destructive",
        title: "Download failed",
        description: "Could not generate an image. Please try again.",
      });
      return;
    }

    // Use html2canvas to convert the div to an image
    import("html2canvas")
      .then((html2canvas) => {
        html2canvas.default(visualizationElement).then((canvas) => {
          const link = document.createElement("a");
          link.download = "my-garden-plan.png";
          link.href = canvas.toDataURL("image/png");
          link.click();

          toast({
            title: "Download complete",
            description: "Your garden plan has been downloaded successfully.",
          });
        });
      })
      .catch((err) => {
        console.error("Error downloading image:", err);
        toast({
          variant: "destructive",
          title: "Download failed",
          description: "Could not generate an image. Please try again.",
        });
      });
  };

  return (
    <DashboardLayout title="Personalized Plant Recommendations">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-muted-foreground mb-6">
          Tell us about your space and preferences to get customized plant suggestions for your garden
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-card rounded-xl shadow-lg p-6">
            <PlantRecommendationForm onSubmit={handleFormSubmit} />
          </div>

          <div className="lg:col-span-8">
            {formData ? (
              <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg p-6 relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button onClick={handleDownload} className="flex items-center gap-2">
                    <Download size={16} />
                    Download Plan
                  </Button>
                </div>
                <PlantVisualization data={formData} id="plant-visualization" />
              </div>
            ) : (
              <div className="bg-card/80 backdrop-blur-sm rounded-xl shadow-lg p-6 flex items-center justify-center min-h-[400px]">
                <div className="text-center text-neutral-500">
                  <div className="text-3xl mb-4">🌱</div>
                  <p className="text-lg font-medium">Fill in your details</p>
                  <p className="mt-2">
                    Complete the form to see your personalized plant recommendations
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default PlantRecommendation;
