import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Copy, Share2, Gift, Check, UserPlus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Invite = () => {
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [usesCount, setUsesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const referralLink = referralCode 
    ? `${window.location.origin}/signup?ref=${referralCode}` 
    : "";

  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PLANT';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const fetchReferralCode = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('referral_codes')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setReferralCode(data.code);
        setUsesCount(data.uses_count);
      } else {
        // Generate new referral code
        const newCode = generateReferralCode();
        const { error: insertError } = await supabase
          .from('referral_codes')
          .insert({
            user_id: user.id,
            code: newCode,
          });

        if (insertError) throw insertError;
        setReferralCode(newCode);
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralCode();
  }, [user]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Copy failed",
        description: "Could not copy to clipboard.",
      });
    }
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join Plantona",
          text: "Start your gardening journey with Plantona! Use my referral link to sign up.",
          url: referralLink,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      copyToClipboard(referralLink);
    }
  };

  return (
    <DashboardLayout title="Invite Gardeners">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
              <Gift className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Share the Green Love!</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Invite your friends to join Plantona and help them start their gardening journey. 
              Track how many gardeners you've helped grow!
            </p>
          </CardContent>
        </Card>

        {/* Referral Code Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Your Referral Link
            </CardTitle>
            <CardDescription>
              Share this link with friends to invite them
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <Input 
                    value={referralLink} 
                    readOnly 
                    className="font-mono text-sm"
                  />
                  <Button 
                    variant="outline"
                    onClick={() => copyToClipboard(referralLink)}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={shareReferral}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Invite Link
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => copyToClipboard(referralCode || "")}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Code: {referralCode}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <UserPlus className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">{usesCount}</div>
                <div className="text-sm text-muted-foreground">Gardeners Invited</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Gift className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-3xl font-bold">{usesCount * 10}</div>
                <div className="text-sm text-muted-foreground">Plants Growing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card>
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Share Your Link</h4>
                  <p className="text-sm text-muted-foreground">
                    Copy your unique referral link and share it with friends
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Friends Sign Up</h4>
                  <p className="text-sm text-muted-foreground">
                    When they create an account using your link, you get credit
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Grow Together</h4>
                  <p className="text-sm text-muted-foreground">
                    Track your impact and watch your gardening community grow
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Invite;
