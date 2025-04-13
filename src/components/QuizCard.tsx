
import { BookOpen, Star, Timer, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TokenDisplay from "./TokenDisplay";

type QuizCardProps = {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeLimit: number; // in minutes
  questionsCount: number;
  reward: number;
  progress?: number; // 0-100
  completed?: boolean;
};

const QuizCard = ({
  id,
  title,
  description,
  difficulty,
  timeLimit,
  questionsCount,
  reward,
  progress = 0,
  completed = false,
}: QuizCardProps) => {
  const difficultyColors = {
    beginner: "bg-green-500",
    intermediate: "bg-brand-amber",
    advanced: "bg-red-500",
  };

  const difficultyStars = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };

  return (
    <Card className="h-full transition-all duration-200 hover:shadow-md flex flex-col overflow-hidden">
      <div className={`${difficultyColors[difficulty]} h-2`} />
      <CardContent className="flex-1 p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-muted-foreground">
            <BookOpen size={16} className="mr-1" />
            <span className="text-sm">{questionsCount} Questions</span>
          </div>
          
          <div className="flex items-center text-muted-foreground">
            <Timer size={16} className="mr-1" />
            <span className="text-sm">{timeLimit} mins</span>
          </div>
          
          <div className="flex items-center">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < difficultyStars[difficulty]
                      ? "text-brand-amber"
                      : "text-muted"
                  }
                  fill={
                    index < difficultyStars[difficulty]
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
          </div>
        </div>
        
        {/* Progress bar */}
        {progress > 0 && !completed && (
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden mb-4">
            <div
              className="bg-brand-purple h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {completed && (
          <div className="flex items-center text-green-500 mb-4">
            <Trophy size={16} className="mr-1" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
        
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">Reward:</span>
          <TokenDisplay amount={reward} size="sm" />
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Link to={`/quiz/${id}`} className="w-full">
          <Button className="w-full" variant={completed ? "outline" : "default"}>
            {completed ? "Review" : progress > 0 ? "Continue" : "Start Quiz"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
