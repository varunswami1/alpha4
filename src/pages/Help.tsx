import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  HelpCircle, MessageSquare, Book, Send, 
  Droplets, Leaf, Bug, ShoppingBag, User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    category: "Plant Care",
    icon: <Droplets className="h-4 w-4" />,
    questions: [
      {
        q: "How often should I water my plants?",
        a: "Watering frequency depends on the plant type, pot size, and environment. Generally, check the top inch of soil - if it's dry, it's time to water. Most indoor plants prefer consistent moisture without being waterlogged."
      },
      {
        q: "Why are my plant's leaves turning yellow?",
        a: "Yellow leaves can indicate overwatering, underwatering, nutrient deficiency, or too much direct sunlight. Check your watering schedule and ensure your plant is getting appropriate light for its species."
      },
      {
        q: "How do I know if my plant needs more light?",
        a: "Signs of insufficient light include leggy growth (stretching toward light), smaller leaves, slow growth, and loss of variegation in variegated plants. Consider moving your plant closer to a window or using grow lights."
      }
    ]
  },
  {
    category: "Disease Detection",
    icon: <Bug className="h-4 w-4" />,
    questions: [
      {
        q: "How accurate is the disease detection feature?",
        a: "Our AI-powered disease detection has been trained on thousands of plant images and can identify common diseases with high accuracy. However, for serious infections, we recommend consulting a local nursery or agricultural expert."
      },
      {
        q: "What should I do if a disease is detected?",
        a: "Follow the treatment recommendations provided in the detection results. This usually includes isolating the affected plant, removing infected parts, adjusting watering, and applying appropriate treatments."
      }
    ]
  },
  {
    category: "Account & Profile",
    icon: <User className="h-4 w-4" />,
    questions: [
      {
        q: "How do I change my password?",
        a: "Go to Settings > Profile and click on 'Change Password'. You'll receive an email with instructions to set a new password."
      },
      {
        q: "Can I delete my account?",
        a: "Yes, you can delete your account from Settings > Privacy > Delete Account. Please note this action is irreversible and all your data will be permanently removed."
      }
    ]
  },
  {
    category: "Shop & Products",
    icon: <ShoppingBag className="h-4 w-4" />,
    questions: [
      {
        q: "Does Plantona sell products directly?",
        a: "No, Plantona is a recommendation platform. We curate quality gardening products and redirect you to trusted retailers where you can make purchases."
      },
      {
        q: "How are products selected for recommendation?",
        a: "Our team researches and tests products, reads reviews, and selects items that offer the best value and quality for gardeners at all levels."
      }
    ]
  }
];

const Help = () => {
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contactForm.subject || !contactForm.message) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please fill in all fields.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24-48 hours.",
    });
    
    setContactForm({ subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <DashboardLayout title="Help & Support">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <Book className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Documentation</h3>
              <p className="text-sm text-muted-foreground">Browse our guides</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Community</h3>
              <p className="text-sm text-muted-foreground">Ask other gardeners</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6 text-center">
              <HelpCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {faqs.map((category) => (
              <div key={category.category} className="mb-6 last:mb-0">
                <h3 className="flex items-center gap-2 font-semibold mb-3 text-primary">
                  {category.icon}
                  {category.category}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${category.category}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Contact Support
            </CardTitle>
            <CardDescription>
              Can't find what you're looking for? Send us a message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  placeholder="What do you need help with?"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Describe your issue or question in detail..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  rows={5}
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default Help;
