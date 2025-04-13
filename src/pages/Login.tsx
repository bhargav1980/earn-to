
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import TokenDisplay from "@/components/TokenDisplay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    // Check if there's a user in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field when user types
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would be server authentication
      // For demo purposes, we're just checking if user exists in localStorage
      if (userData && userData.email === formData.email) {
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.username}!`,
        });
        
        navigate("/dashboard");
      } else {
        // For demo purposes, let's create a mock user if one doesn't exist
        const mockUser = {
          id: Math.random().toString(36).substring(2, 11),
          username: "demouser",
          email: formData.email,
          xp: 350,
          tokens: 7.5,
          completedQuizzes: [],
          quizProgress: {},
          createdAt: new Date().toISOString(),
        };
        
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("isLoggedIn", "true");
        
        toast({
          title: "Login successful",
          description: "Welcome to your demo account!",
        });
        
        navigate("/dashboard");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Log in to continue your learning journey
            </p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              {userData && (
                <div className="bg-muted p-4 rounded-md mb-6 text-center">
                  <p className="font-medium mb-2">Welcome back, {userData.username}!</p>
                  <div className="flex justify-center gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground">XP</p>
                      <p className="font-bold">{userData.xp}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tokens</p>
                      <TokenDisplay amount={userData.tokens} />
                    </div>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email address"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-brand-purple hover:underline transition-all"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-red-500" : ""}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
                
                <div className="text-center mt-2">
                  <Link
                    to="/"
                    className="text-sm text-muted-foreground hover:text-foreground transition-all"
                  >
                    Go back to home page
                  </Link>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-brand-purple hover:underline transition-all"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
