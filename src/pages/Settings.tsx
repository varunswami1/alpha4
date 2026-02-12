import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Languages, Globe, Clock, DollarSign, 
  Sun, Moon, Type, Zap, RotateCcw, 
  Bell, Droplets, Cloud, MessageSquare, ShoppingBag, Clock4, 
  Lock, MapPin, KeyRound, Download, BarChart4,
  User, Leaf, Heart, Mail, BrainCircuit,
  Smartphone, CloudUpload, Key, Share2, Mic,
  HelpCircle, MessageCircle, Flag, FlaskConical, Save, Loader
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SettingsSection = ({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-8 border rounded-lg p-6 bg-card shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-primary">{icon}</div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

const SettingItem = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex items-start gap-4 border-b pb-4">
      <div className="text-primary mt-0.5">{icon}</div>
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
};

interface UserPreferences {
  theme: string;
  font_size: string;
  email_notifications: boolean;
  push_notifications: boolean;
  account_visibility: string;
  language: string;
  currency: string;
}

interface Profile {
  first_name: string;
  last_name: string;
  phone_number: string;
  bio: string;
  address_line: string;
  state: string;
  city: string;
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState("appearance");
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    font_size: 'medium',
    email_notifications: true,
    push_notifications: false,
    account_visibility: 'public',
    language: 'english',
    currency: 'INR',
  });
  
  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    phone_number: '',
    bio: '',
    address_line: '',
    state: '',
    city: '',
  });

  // Fetch user preferences and profile
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        // Fetch preferences
        const { data: prefsData } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (prefsData) {
          setPreferences({
            theme: prefsData.theme || 'light',
            font_size: prefsData.font_size || 'medium',
            email_notifications: prefsData.email_notifications ?? true,
            push_notifications: prefsData.push_notifications ?? false,
            account_visibility: prefsData.account_visibility || 'public',
            language: prefsData.language || 'english',
            currency: prefsData.currency || 'INR',
          });
          
          // Apply theme from preferences
          setTheme(prefsData.theme as 'light' | 'dark' | 'system');
        }

        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
        
        if (profileData) {
          setProfile({
            first_name: profileData.first_name || '',
            last_name: profileData.last_name || '',
            phone_number: profileData.phone_number || '',
            bio: profileData.bio || '',
            address_line: profileData.address_line || '',
            state: profileData.state || '',
            city: profileData.city || '',
          });
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system');
    setPreferences(prev => ({ ...prev, theme: newTheme }));
    savePreferences({ ...preferences, theme: newTheme });
  };

  const savePreferences = async (prefs: UserPreferences) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_preferences')
        .update(prefs)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated.",
      });
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Could not save your preferences.",
      });
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', user.id);

      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been saved.",
      });
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Could not save your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      toast({
        title: "Account deletion",
        description: "Please contact support to delete your account.",
      });
    }
  };

  const handleExportData = async () => {
    if (!user) return;
    
    try {
      // Fetch all user data
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      const { data: plantsData } = await supabase
        .from('user_plants')
        .select('*')
        .eq('user_id', user.id);
      
      const exportData = {
        profile: profileData,
        plants: plantsData,
        exportDate: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'plantona-data-export.json';
      link.click();
      
      toast({
        title: "Data exported",
        description: "Your data has been downloaded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export failed",
        description: "Could not export your data.",
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Settings">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout title="Settings">
      <Tabs 
        defaultValue="appearance" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full mb-6 flex flex-wrap h-auto p-1 bg-muted">
          <TabsTrigger value="appearance" className="flex-1 py-2">Appearance</TabsTrigger>
          <TabsTrigger value="profile" className="flex-1 py-2">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1 py-2">Notifications</TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1 py-2">Privacy</TabsTrigger>
          <TabsTrigger value="support" className="flex-1 py-2">Support</TabsTrigger>
        </TabsList>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <SettingsSection title="Appearance & Display" icon={<Sun className="w-5 h-5" />}>
            <SettingItem 
              icon={<Moon className="w-4 h-4" />} 
              title="Theme Mode"
              description="Choose your preferred app theme"
            >
              <Select 
                value={theme} 
                onValueChange={handleThemeChange}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
            
            <SettingItem 
              icon={<Type className="w-4 h-4" />} 
              title="Font Size"
              description="Adjust text size for better readability"
            >
              <Select 
                value={preferences.font_size} 
                onValueChange={(v) => {
                  setPreferences(prev => ({ ...prev, font_size: v }));
                  savePreferences({ ...preferences, font_size: v });
                }}
              >
                <SelectTrigger className="w-28">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
            
            <SettingItem 
              icon={<Languages className="w-4 h-4" />} 
              title="Language"
              description="Choose your preferred language"
            >
              <Select 
                value={preferences.language} 
                onValueChange={(v) => {
                  setPreferences(prev => ({ ...prev, language: v }));
                  savePreferences({ ...preferences, language: v });
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
            
            <SettingItem 
              icon={<DollarSign className="w-4 h-4" />} 
              title="Currency"
              description="Select your preferred currency"
            >
              <Select 
                value={preferences.currency} 
                onValueChange={(v) => {
                  setPreferences(prev => ({ ...prev, currency: v }));
                  savePreferences({ ...preferences, currency: v });
                }}
              >
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
          </SettingsSection>
        </TabsContent>
        
        {/* Profile Settings */}
        <TabsContent value="profile">
          <SettingsSection title="Profile Information" icon={<User className="w-5 h-5" />}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={profile.first_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={profile.last_name}
                    onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={profile.phone_number}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone_number: e.target.value }))}
                  placeholder="+91 98765 43210"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input 
                  id="bio" 
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  value={profile.address_line}
                  onChange={(e) => setProfile(prev => ({ ...prev, address_line: e.target.value }))}
                  placeholder="123 Garden Street"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={profile.city}
                    onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Mumbai"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input 
                    id="state" 
                    value={profile.state}
                    onChange={(e) => setProfile(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="Maharashtra"
                  />
                </div>
              </div>
              
              <Button onClick={saveProfile} disabled={saving}>
                {saving ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </SettingsSection>
        </TabsContent>
        
        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <SettingsSection title="Notifications & Alerts" icon={<Bell className="w-5 h-5" />}>
            <SettingItem 
              icon={<Mail className="w-4 h-4" />} 
              title="Email Notifications"
              description="Receive updates via email"
            >
              <Switch 
                checked={preferences.email_notifications}
                onCheckedChange={(checked) => {
                  setPreferences(prev => ({ ...prev, email_notifications: checked }));
                  savePreferences({ ...preferences, email_notifications: checked });
                }}
              />
            </SettingItem>
            
            <SettingItem 
              icon={<Bell className="w-4 h-4" />} 
              title="Push Notifications"
              description="Receive push notifications on your device"
            >
              <Switch 
                checked={preferences.push_notifications}
                onCheckedChange={(checked) => {
                  setPreferences(prev => ({ ...prev, push_notifications: checked }));
                  savePreferences({ ...preferences, push_notifications: checked });
                }}
              />
            </SettingItem>
            
            <SettingItem 
              icon={<Droplets className="w-4 h-4" />} 
              title="Plant Care Reminders"
              description="Get reminded about watering and care tasks"
            >
              <Switch defaultChecked />
            </SettingItem>
            
            <SettingItem 
              icon={<Cloud className="w-4 h-4" />} 
              title="Weather Alerts"
              description="Receive alerts based on local weather"
            >
              <Switch defaultChecked />
            </SettingItem>
            
            <SettingItem 
              icon={<MessageSquare className="w-4 h-4" />} 
              title="Community Updates"
              description="Get notified about community activity"
            >
              <Switch defaultChecked />
            </SettingItem>
          </SettingsSection>
        </TabsContent>
        
        {/* Privacy Settings */}
        <TabsContent value="privacy">
          <SettingsSection title="Privacy & Security" icon={<Lock className="w-5 h-5" />}>
            <SettingItem 
              icon={<Lock className="w-4 h-4" />} 
              title="Account Privacy"
              description="Control who can see your garden and activity"
            >
              <Select 
                value={preferences.account_visibility}
                onValueChange={(v) => {
                  setPreferences(prev => ({ ...prev, account_visibility: v }));
                  savePreferences({ ...preferences, account_visibility: v });
                }}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </SettingItem>
            
            <SettingItem 
              icon={<MapPin className="w-4 h-4" />} 
              title="Location Services"
              description="Allow GPS for weather-based recommendations"
            >
              <Switch defaultChecked />
            </SettingItem>
            
            <SettingItem 
              icon={<Download className="w-4 h-4" />} 
              title="Export Your Data"
              description="Download all your plant care data"
            >
              <Button variant="outline" size="sm" onClick={handleExportData}>
                Export Data
              </Button>
            </SettingItem>
            
            <SettingItem 
              icon={<BarChart4 className="w-4 h-4" />} 
              title="Delete Account"
              description="Permanently delete your account and all data"
            >
              <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                Delete Account
              </Button>
            </SettingItem>
          </SettingsSection>
        </TabsContent>
        
        {/* Support Settings */}
        <TabsContent value="support">
          <SettingsSection title="Support & Help" icon={<HelpCircle className="w-5 h-5" />}>
            <SettingItem 
              icon={<HelpCircle className="w-4 h-4" />} 
              title="Help Center"
              description="Get help with common questions"
            >
              <Button variant="outline" size="sm" onClick={() => navigate('/help')}>
                View Help
              </Button>
            </SettingItem>
            
            <SettingItem 
              icon={<MessageCircle className="w-4 h-4" />} 
              title="Send Feedback"
              description="Help us improve the app"
            >
              <Button variant="outline" size="sm" onClick={() => navigate('/rate')}>
                Send Feedback
              </Button>
            </SettingItem>
            
            <SettingItem 
              icon={<Flag className="w-4 h-4" />} 
              title="Report a Bug"
              description="Let us know about any issues"
            >
              <Button variant="outline" size="sm" onClick={() => navigate('/help')}>
                Report Bug
              </Button>
            </SettingItem>
            
            <SettingItem 
              icon={<FlaskConical className="w-4 h-4" />} 
              title="Beta Features"
              description="Try experimental features"
            >
              <Switch />
            </SettingItem>
          </SettingsSection>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
