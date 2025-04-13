
import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  Edit,
  Camera
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import TokenDisplay from "@/components/TokenDisplay";
import ProgressCircle from "@/components/ProgressCircle";

const Profile = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        setFormData({
          username: parsedUserData.username,
          email: parsedUserData.email,
        });
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // Update user data
    if (user) {
      const updatedUser = {
        ...user,
        username: formData.username,
        email: formData.email,
      };
      
      // Save updated user data
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      setIsEditing(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return <div className="text-center p-8">Loading...</div>;
  }

  // Calculate level based on XP (1000 XP per level)
  const level = Math.floor(user.xp / 1000) + 1;
  const xpForCurrentLevel = user.xp % 1000;
  const xpProgress = (xpForCurrentLevel / 1000) * 100;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground">
          View and manage your profile information
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center overflow-hidden border-4 border-background">
                  <User size={64} className="text-muted-foreground" />
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full">
                  <Camera size={16} />
                </button>
              </div>
              
              <h2 className="text-2xl font-bold mb-1">{user.username}</h2>
              <p className="text-muted-foreground mb-4">{user.email}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <Award className="text-brand-amber" />
                <span>Level {level} Learner</span>
              </div>
              
              <div className="w-full bg-muted p-6 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>XP: {user.xp}</span>
                  <span className="text-sm text-muted-foreground">
                    {xpForCurrentLevel} / 1000 to Level {level + 1}
                  </span>
                </div>
                <div className="w-full bg-background h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-purple h-full"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
              
              <Separator className="my-6 w-full" />
              
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span className="text-sm">Joined</span>
                  </div>
                  <span className="text-sm">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-muted-foreground" />
                    <span className="text-sm">Completed Quizzes</span>
                  </div>
                  <span className="text-sm">
                    {user.completedQuizzes?.length || 0}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-muted-foreground" />
                    <span className="text-sm">Tokens Earned</span>
                  </div>
                  <TokenDisplay amount={user.tokens} size="sm" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Profile Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Information</CardTitle>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
              )}
            </CardHeader>
            
            <CardContent>
              {isEditing ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="flex gap-4 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          username: user.username,
                          email: user.email,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Username
                      </h3>
                      <p className="text-lg">{user.username}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">
                        Email
                      </h3>
                      <p className="text-lg">{user.email}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Progress Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="bg-muted">
                        <CardContent className="pt-6 flex flex-col items-center">
                          <ProgressCircle progress={user.completedQuizzes?.length ? 100 : 0}>
                            <span className="text-sm mt-1">Quizzes</span>
                          </ProgressCircle>
                          <p className="mt-4 font-semibold">
                            {user.completedQuizzes?.length || 0} Completed
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted">
                        <CardContent className="pt-6 flex flex-col items-center">
                          <ProgressCircle progress={xpProgress}>
                            <span className="text-sm mt-1">Level {level}</span>
                          </ProgressCircle>
                          <p className="mt-4 font-semibold">
                            {user.xp} XP Total
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted">
                        <CardContent className="pt-6 flex flex-col items-center">
                          <div className="mb-1">
                            <TokenDisplay amount={user.tokens} size="lg" />
                          </div>
                          <p className="mt-4 font-semibold">
                            Tokens Earned
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
