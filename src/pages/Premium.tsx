import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Crown, Leaf, Sparkles, Zap, 
  Shield, Cloud, Bot, Camera, Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    period: "forever",
    description: "Perfect for getting started",
    features: [
      { text: "Track up to 10 plants", included: true },
      { text: "Basic plant care reminders", included: true },
      { text: "Community access", included: true },
      { text: "Plant disease detection (5/month)", included: true },
      { text: "Basic weather alerts", included: true },
      { text: "Ad-supported experience", included: true },
      { text: "Advanced AI recommendations", included: false },
      { text: "Priority support", included: false },
      { text: "Unlimited disease scans", included: false },
    ],
    popular: false,
    icon: <Leaf className="h-6 w-6" />,
  },
  {
    id: "pro",
    name: "Pro",
    price: "₹199",
    period: "per month",
    description: "For serious gardeners",
    features: [
      { text: "Unlimited plants", included: true },
      { text: "Smart care reminders", included: true },
      { text: "Community access", included: true },
      { text: "Plant disease detection (50/month)", included: true },
      { text: "Advanced weather integration", included: true },
      { text: "Ad-free experience", included: true },
      { text: "AI-powered recommendations", included: true },
      { text: "Email support", included: true },
      { text: "Plant journal & history", included: true },
    ],
    popular: true,
    icon: <Zap className="h-6 w-6" />,
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹499",
    period: "per month",
    description: "Ultimate gardening experience",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Unlimited disease scans", included: true },
      { text: "Expert consultation access", included: true },
      { text: "IoT sensor integration", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Early access to features", included: true },
      { text: "Priority support (24/7)", included: true },
      { text: "Custom care plans", included: true },
      { text: "Family sharing (up to 5)", included: true },
    ],
    popular: false,
    icon: <Crown className="h-6 w-6" />,
  },
];

const features = [
  {
    icon: <Bot className="h-6 w-6" />,
    title: "AI Plant Doctor",
    description: "Get instant diagnosis and treatment recommendations for plant diseases"
  },
  {
    icon: <Camera className="h-6 w-6" />,
    title: "Unlimited Scans",
    description: "Scan as many plants as you want with our advanced disease detection"
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    title: "Smart Weather",
    description: "Receive personalized care alerts based on your local weather conditions"
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Priority Support",
    description: "Get help from our gardening experts whenever you need it"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Family Sharing",
    description: "Share your subscription with up to 5 family members"
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Early Access",
    description: "Be the first to try new features before they're released"
  },
];

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = (planId: string) => {
    setSelectedPlan(planId);
    toast({
      title: "Coming Soon!",
      description: "Premium subscriptions will be available soon. Stay tuned!",
    });
  };

  return (
    <DashboardLayout title="Upgrade to Premium">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-12"
      >
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto">
          <Badge className="mb-4" variant="secondary">
            <Sparkles className="h-3 w-3 mr-1" />
            Limited Time Offer
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Grow Your Garden with Premium
          </h1>
          <p className="text-muted-foreground text-lg">
            Unlock advanced features, unlimited plant tracking, and expert support 
            to take your gardening to the next level.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${
                plan.popular 
                  ? "border-primary shadow-lg scale-105" 
                  : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-2">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-2 ${
                  plan.popular ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}>
                  {plan.icon}
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className={`h-5 w-5 mt-0.5 ${
                        feature.included ? "text-green-500" : "text-muted-foreground/30"
                      }`} />
                      <span className={feature.included ? "" : "text-muted-foreground/50 line-through"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  {plan.id === "free" ? "Current Plan" : "Subscribe"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="py-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Why Go Premium?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium">Can I cancel anytime?</h4>
              <p className="text-sm text-muted-foreground">
                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div>
              <h4 className="font-medium">Is there a free trial?</h4>
              <p className="text-sm text-muted-foreground">
                Yes! New users get a 7-day free trial of Pro features when they sign up.
              </p>
            </div>
            <div>
              <h4 className="font-medium">What payment methods do you accept?</h4>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, debit cards, UPI, and net banking.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Premium;
