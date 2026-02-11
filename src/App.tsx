import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Garden from "./pages/Garden";
import PlantProfile from "./components/garden/PlantProfile";
import PlantSearch from "./pages/PlantSearch";
import PlantInfoPage from "./components/search/PlantInfoPage";
import Settings from "./pages/Settings";
import UserProfile from "./pages/UserProfile";
import Shop from "./pages/Shop";
import PlantRecommendation from "./pages/PlantRecommendation";
import DiseaseDetection from "./pages/DiseaseDetection";
import Notifications from "./pages/Notifications";
import RateApp from "./pages/RateApp";
import Help from "./pages/Help";
import Invite from "./pages/Invite";
import Premium from "./pages/Premium";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPlants from "./pages/admin/AdminPlants";
import AdminCommunity from "./pages/admin/AdminCommunity";
import AdminProducts from "./pages/admin/AdminProducts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /> </ProtectedRoute>} />
              <Route path="/community" element={<ProtectedRoute><Community /> </ProtectedRoute>} />
              <Route path="/garden" element={<ProtectedRoute><Garden /> </ProtectedRoute>} />
              <Route path="/plant/:id" element={<ProtectedRoute><PlantProfile /> </ProtectedRoute>} />
              <Route path="/plant-search" element={<ProtectedRoute><PlantSearch /> </ProtectedRoute>} />
              <Route path="/plant-info/:id" element={<ProtectedRoute><PlantInfoPage /> </ProtectedRoute>} />
              <Route path="/plant-recommendation" element={<ProtectedRoute><PlantRecommendation /> </ProtectedRoute>}/>
              <Route path="/disease-detection" element={<ProtectedRoute><DiseaseDetection /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /> </ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /> </ProtectedRoute>} />
              <Route path="/shop" element={<ProtectedRoute><Shop /> </ProtectedRoute>} />
              <Route path="/shop/:id" element={<ProtectedRoute><Shop /> </ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/rate" element={<ProtectedRoute><RateApp /></ProtectedRoute>} />
              <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
              <Route path="/invite" element={<ProtectedRoute><Invite /></ProtectedRoute>} />
              <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/plants" element={<AdminPlants />} />
              <Route path="/admin/community" element={<AdminCommunity />} />
              <Route path="/admin/products" element={<AdminProducts />} />
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
