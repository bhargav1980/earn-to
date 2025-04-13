
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ArrowRight, Timer, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import TokenDisplay from "@/components/TokenDisplay";

// Import mock data
import { quizzes } from "@/data/quizzes";

type Answer = {
  questionIndex: number;
  selectedOption: number;
  correct: boolean;
};

const Quiz = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Initialize quiz data
  useEffect(() => {
    // Get quiz data
    const quizData = quizzes.find((q) => q.id === id);
    
    if (quizData) {
      setQuiz(quizData);
      setTimeLeft(quizData.timeLimit * 60); // Convert minutes to seconds
    }
    
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
    
    setLoading(false);
  }, [id]);
  
  // Timer effect
  useEffect(() => {
    if (!quiz || showResult || quizSubmitted || timeLeft <= 0) return;
    
    const timer = setTimeout(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-submit quiz when time runs out
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, quiz, showResult, quizSubmitted]);
  
  // Handle option selection
  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null) return; // Prevent changing answer after selection
    setSelectedOption(optionIndex);
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (selectedOption === null) return;
    
    // Record answer
    const currentQuestionData = quiz.questions[currentQuestion];
    const isCorrect = selectedOption === currentQuestionData.correctOption;
    
    setAnswers([
      ...answers,
      {
        questionIndex: currentQuestion,
        selectedOption,
        correct: isCorrect,
      },
    ]);
    
    // Move to next question or show results
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      handleSubmitQuiz();
    }
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  
  // Handle quiz submission
  const handleSubmitQuiz = () => {
    if (quizSubmitted) return;
    
    setQuizSubmitted(true);
    
    // Calculate score
    const correctAnswers = answers.filter((a) => a.correct).length;
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Calculate earned tokens (partial rewards based on score)
    const earnedTokens = (score / 100) * quiz.reward;
    
    // Update user data
    if (user) {
      const updatedUser = { ...user };
      
      // Add XP (10 XP per correct answer)
      updatedUser.xp = (updatedUser.xp || 0) + correctAnswers * 10;
      
      // Add tokens
      updatedUser.tokens = (updatedUser.tokens || 0) + earnedTokens;
      
      // Mark quiz as completed if score is at least 70%
      if (score >= 70) {
        updatedUser.completedQuizzes = [
          ...(updatedUser.completedQuizzes || []),
          quiz.id,
        ];
      }
      
      // Update quiz progress
      updatedUser.quizProgress = {
        ...(updatedUser.quizProgress || {}),
        [quiz.id]: {
          score,
          completedAt: new Date().toISOString(),
          answeredQuestions: answers,
        },
      };
      
      // Save updated user data
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
    
    setShowResult(true);
  };
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (!quiz) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Quiz Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The quiz you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate("/quizzes")}>
          Back to Quizzes
        </Button>
      </div>
    );
  }
  
  // Show results screen
  if (showResult) {
    const correctAnswers = answers.filter((a) => a.correct).length;
    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const isPassing = score >= 70;
    const earnedTokens = (score / 100) * quiz.reward;
    
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Card className="overflow-hidden">
          <div className={`${isPassing ? "bg-green-500" : "bg-red-500"} p-6 text-white text-center`}>
            <h1 className="text-2xl font-bold mb-2">Quiz Completed!</h1>
            <p>
              {isPassing
                ? "Great job! You've passed the quiz."
                : "Nice try! You can retake the quiz to improve your score."}
            </p>
          </div>
          
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="text-5xl font-bold mb-2">{score}%</div>
              <p className="text-muted-foreground">
                {correctAnswers} out of {totalQuestions} correct
              </p>
            </div>
            
            <div className="bg-muted p-6 rounded-lg mb-8">
              <div className="flex justify-between mb-2">
                <span>Your score</span>
                <span className="font-bold">{score}%</span>
              </div>
              <Progress value={score} className="h-3 mb-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">XP Earned</p>
                  <p className="text-xl font-bold">{correctAnswers * 10} XP</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Tokens Earned</p>
                  <TokenDisplay amount={earnedTokens} size="lg" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                onClick={() => navigate(`/quiz/${id}`)}
              >
                Retake Quiz
              </Button>
              <Button onClick={() => navigate("/quizzes")}>
                Back to Quizzes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Current question data
  const currentQuestionData = quiz.questions[currentQuestion];
  
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
        
        {/* Quiz progress bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Timer size={16} className="mr-1" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>
        <Progress
          value={((currentQuestion + 1) / quiz.questions.length) * 100}
          className="h-2"
        />
      </div>
      
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestionData.text}
          </h2>
          
          <div className="space-y-4">
            {currentQuestionData.options.map((option: string, index: number) => (
              <div
                key={index}
                className={`quiz-option ${
                  selectedOption === index ? "selected" : ""
                } ${
                  selectedOption === index
                    ? index === currentQuestionData.correctOption
                      ? "correct"
                      : "incorrect"
                    : ""
                }`}
                onClick={() => handleOptionSelect(index)}
              >
                <div className="flex-1">
                  <p>{option}</p>
                </div>
                
                {selectedOption === index && (
                  <div className="absolute right-4">
                    {index === currentQuestionData.correctOption ? (
                      <CheckCircle className="text-green-500 h-6 w-6" />
                    ) : (
                      <XCircle className="text-red-500 h-6 w-6" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentQuestion < quiz.questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Submit Quiz"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
