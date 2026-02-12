import { useState } from "react";
import {
  Menu,
  Settings,
  HelpCircle,
  LogOut,
  UserPlus,
  Star,
  Crown,
  Bell,
  ShoppingCart,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import NotificationBadge from "@/components/notifications/NotificationBadge";

const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-card shadow-sm z-50">
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between">
        {/* Mobile menu and Logo */}
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[240px] sm:w-[300px]"
            >
              <div className="flex flex-col gap-4 py-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                >
                  Home
                </Link>
                <Link
                  to="/community"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                >
                  Community & Learning
                </Link>
                <Link
                  to="/garden"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                >
                  My Garden
                </Link>
                <Link
                  to="/plant-search"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                >
                  Search Plant
                </Link>
                <Link
                  to="/plant-recommendation"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                >
                  Plant Recommendations
                </Link>
                <Link to="/disease-detection" className="px-4 py-2 hover:bg-muted rounded-md">Disease Detection</Link>
                <Link
                  to="/shop"
                  className="px-4 py-2 hover:bg-muted rounded-md"
                >
                  Shop
                </Link>

                <div className="border-t my-2 pt-2">
                  <div className="px-4 py-2 text-sm font-medium text-muted-foreground">
                    Account
                  </div>
                  <Link
                    to="/profile"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to="/settings"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/help"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Help</span>
                  </Link>
                  <Link
                    to="/invite"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Invite Gardeners</span>
                  </Link>
                  <Link
                    to="/rate"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                  >
                    <Star className="h-4 w-4" />
                    <span>Rate our App</span>
                  </Link>
                  <Link
                    to="/premium"
                    className="px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                  >
                    <Crown className="h-4 w-4" />
                    <span>Upgrade to Premium</span>
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="px-4 py-2 flex items-center gap-2 hover:bg-muted rounded-md"
                    >
                      <User className="h-4 w-4" />
                      <span>Log In</span>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link to="/" className="text-2xl font-bold">
            Plantona
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/dashboard"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            to="/community"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Community & Learning
          </Link>
          <Link
            to="/garden"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            My Garden
          </Link>
          <Link
            to="/plant-search"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Search Plant
          </Link>
          <Link
            to="/plant-recommendation"
            className="text-muted-foreground hover:text-primary transition-colors font-medium"
          >
            Recommendations
          </Link>
          <Link to="/disease-detection" className="text-muted-foreground hover:text-primary transition-colors font-medium">
            Disease Detection
          </Link>
        </div>

        {/* Right side elements */}
        <div className="flex items-center gap-4">
          {/* Notifications Badge */}
          {isAuthenticated && <NotificationBadge />}

          {/* Shopping Cart Link */}
          <Button variant="ghost" size="icon" asChild>
            <Link to="/shop">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shop</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            /* Profile Dropdown Menu when logged in */
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-card shadow-lg border"
              >
                <DropdownMenuLabel>
                  {user?.firstName ? `Hi, ${user.firstName}` : "My Account"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="flex items-center cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/help" className="flex items-center cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/invite" className="flex items-center cursor-pointer">
                    <UserPlus className="mr-2 h-4 w-4" />
                    <span>Invite Gardeners</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/rate" className="flex items-center cursor-pointer">
                    <Star className="mr-2 h-4 w-4" />
                    <span>Rate our App</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/premium" className="flex items-center cursor-pointer">
                    <Crown className="mr-2 h-4 w-4" />
                    <span>Upgrade to Premium</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* Login Button when logged out */
            <Button
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <Link to="/login">Log In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
