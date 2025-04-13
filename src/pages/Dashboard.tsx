
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Award, 
  ArrowRight, 
  BarChart4,
  Trophy
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TokenDisplay from "@/components/TokenDisplay";
import ProgressCircle from "@/components/ProgressCircle";
import QuizCard from "@/components/QuizCard";
import LeaderboardCard from "@/components/LeaderboardCard";

// Mock data
import { quizzes } from "@/data/quizzes";

// Mock leaderboard data
const leaderboardUsers = [
  { id: "1", username: "cryptomaster", xp: 8750, tokens: 145.5, rank: 1 },
  { id: "2", username: "web3learner", xp: 7200, tokens: 120, rank: 2 },
  { id: "3", username: "blockchain_guru", xp: 6800, tokens: 113.3, rank: 3 },
  { id: "4", username: "token_hunter", xp: 6200, tokens: 103.3, rank: 4 },
  { id: "5", username: "crypto_newbie", xp: 5500, tokens: 91.7, rank: 5 },
];

// Feature cards data
const featureCards = [
  {
    title: "Quizzes",
    description: "Complete quizzes to earn tokens and XP",
    icon: BookOpen,
    color: "bg-blue-100 text-blue-600",
    link: "/quizzes"
  },
  {
    title: "Rewards",
    description: "View and manage your earned rewards",
    icon: Award,
    color: "bg-amber-100 text-amber-600",
    link: "/rewards"
  },
  {
    title: "Leaderboard",
    description: "See where you rank among other learners",
    icon: BarChart4,
    color: "bg-green-100 text-green-600",
    link: "/leaderboard"
  }
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [recommendedQuizzes, setRecommendedQuizzes] = useState<any[]>([]);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData);
        
        // Get quizzes that the user hasn't completed
        const completedQuizIds = parsedUserData.completedQuizzes || [];
        const notCompletedQuizzes = quizzes.filter(
          (quiz) => !completedQuizIds.includes(quiz.id)
        );
        
        // Get up to 3 recommended quizzes
        setRecommendedQuizzes(notCompletedQuizzes.slice(0, 3));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  if (!user) {
    return <div className="text-center p-8">Loading...</div>;
  }

  // Calculate level based on XP (1000 XP per level)
  const level = Math.floor(user.xp / 1000) + 1;
  const xpForCurrentLevel = user.xp % 1000;
  const xpProgress = (xpForCurrentLevel / 1000) * 100;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user.username}!</h1>
          <p className="text-muted-foreground">Here's your learning dashboard</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-sm text-muted-foreground">Your balance</span>
            <TokenDisplay amount={user.tokens} size="lg" />
          </div>
        </div>
      </div>
      
      {/* XP and Level Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ProgressCircle progress={xpProgress} size={120}>
              <div className="mt-2 text-sm">Level {level}</div>
            </ProgressCircle>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">Your Progress</h3>
              <p className="text-muted-foreground mb-4">
                {xpForCurrentLevel} / 1000 XP to next level
              </p>
              
              <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                <div
                  className="bg-brand-purple h-full"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-2">
                <span className="text-sm text-muted-foreground">Level {level}</span>
                <span className="text-sm text-muted-foreground">Level {level + 1}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featureCards.map((card, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mb-4`}>
                <card.icon size={24} />
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground mb-4">{card.description}</p>
              
              <Link to={card.link}>
                <Button variant="outline" className="w-full">
                  <span>Explore</span>
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Achievement Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="text-brand-amber" />
            <span>Recent Achievements</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user.completedQuizzes && user.completedQuizzes.length > 0 ? (
            <div className="space-y-4">
              <p className="text-lg">You've completed {user.completedQuizzes.length} quizzes!</p>
              {/* Achievement items would go here */}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No achievements yet. Start completing quizzes to earn achievements!</p>
              <Link to="/quizzes">
                <Button>Start a Quiz</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Recommended Quizzes and Leaderboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedQuizzes.length > 0 ? (
              recommendedQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  id={quiz.id}
                  title={quiz.title}
                  description={quiz.description}
                  difficulty={quiz.difficulty}
                  timeLimit={quiz.timeLimit}
                  questionsCount={quiz.questions.length}
                  reward={quiz.reward}
                  progress={0}
                />
              ))
            ) : (
              <div className="col-span-2 bg-muted p-8 rounded-lg text-center">
                <p className="text-muted-foreground mb-4">
                  You've completed all available quizzes!
                </p>
                <p className="text-muted-foreground">
                  Check back soon for new learning content.
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/quizzes">
              <Button variant="outline">View All Quizzes</Button>
            </Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
          <LeaderboardCard users={leaderboardUsers} className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
