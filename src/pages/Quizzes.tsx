
import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import QuizCard from "@/components/QuizCard";

// Import mock data
import { quizzes } from "@/data/quizzes";

const Quizzes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    let result = [...quizzes];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply difficulty filter
    if (difficultyFilter !== "all") {
      result = result.filter((quiz) => quiz.difficulty === difficultyFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      const completedQuizIds = user.completedQuizzes || [];
      const inProgressQuizIds = Object.keys(user.quizProgress || {});

      if (statusFilter === "completed") {
        result = result.filter((quiz) => completedQuizIds.includes(quiz.id));
      } else if (statusFilter === "in-progress") {
        result = result.filter(
          (quiz) =>
            inProgressQuizIds.includes(quiz.id) &&
            !completedQuizIds.includes(quiz.id)
        );
      } else if (statusFilter === "not-started") {
        result = result.filter(
          (quiz) =>
            !inProgressQuizIds.includes(quiz.id) &&
            !completedQuizIds.includes(quiz.id)
        );
      }
    }

    setFilteredQuizzes(result);
  }, [searchTerm, difficultyFilter, statusFilter, user]);

  // Calculate progress for each quiz
  const getQuizProgress = (quizId: string) => {
    if (!user) return 0;
    
    const userProgress = user.quizProgress || {};
    const completedQuizzes = user.completedQuizzes || [];
    
    if (completedQuizzes.includes(quizId)) {
      return 100;
    }
    
    if (userProgress[quizId]) {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz) {
        return Math.round((userProgress[quizId].answeredQuestions.length / quiz.questions.length) * 100);
      }
    }
    
    return 0;
  };

  const isQuizCompleted = (quizId: string) => {
    if (!user) return false;
    const completedQuizzes = user.completedQuizzes || [];
    return completedQuizzes.includes(quizId);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Available Quizzes</h1>
        <p className="text-muted-foreground">
          Complete quizzes to earn tokens and increase your knowledge
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-muted p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2">
            <Label htmlFor="search" className="mb-2 block">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search quizzes..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <div>
            <Label htmlFor="difficulty" className="mb-2 block">Difficulty</Label>
            <Select
              value={difficultyFilter}
              onValueChange={setDifficultyFilter}
            >
              <SelectTrigger id="difficulty">
                <SelectValue placeholder="All difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All difficulties</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div>
            <Label htmlFor="status" className="mb-2 block">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="not-started">Not Started</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quizzes Grid */}
      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              id={quiz.id}
              title={quiz.title}
              description={quiz.description}
              difficulty={quiz.difficulty}
              timeLimit={quiz.timeLimit}
              questionsCount={quiz.questions.length}
              reward={quiz.reward}
              progress={getQuizProgress(quiz.id)}
              completed={isQuizCompleted(quiz.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-muted p-12 rounded-lg text-center">
          <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No quizzes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
