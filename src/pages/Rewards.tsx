
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  RefreshCw,
  CheckCircle,
  Clock,
  PiggyBank,
  Send,
  History,
  AlertCircle
} from "lucide-react";
import TokenDisplay from "@/components/TokenDisplay";
import { useToast } from "@/hooks/use-toast";

// Mock transaction history data
const generateMockTransactions = (count: number) => {
  const types = ["quiz_reward", "referral", "claim", "withdrawal"];
  const statuses = ["completed", "pending", "failed"];
  
  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const amount = +(Math.random() * 10).toFixed(2);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    return {
      id: `tx-${i}`,
      type,
      amount,
      status,
      date: date.toISOString(),
    };
  });
};

const Rewards = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    // Generate mock transactions
    setTransactions(generateMockTransactions(8));
  }, []);
  
  const handleClaimTokens = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      toast({
        title: "Tokens Claimed",
        description: "Your tokens have been successfully claimed to your Aptos wallet.",
      });
      
      setIsLoading(false);
    }, 2000);
  };
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "quiz_reward":
        return <CheckCircle className="text-green-500" />;
      case "referral":
        return <Send className="text-blue-500" />;
      case "claim":
        return <Wallet className="text-purple-500" />;
      case "withdrawal":
        return <PiggyBank className="text-amber-500" />;
      default:
        return <History className="text-gray-500" />;
    }
  };
  
  const getTransactionStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="text-green-500" size={16} />;
      case "pending":
        return <Clock className="text-amber-500" size={16} />;
      case "failed":
        return <AlertCircle className="text-red-500" size={16} />;
      default:
        return null;
    }
  };
  
  const formatTransactionType = (type: string) => {
    switch (type) {
      case "quiz_reward":
        return "Quiz Reward";
      case "referral":
        return "Referral Bonus";
      case "claim":
        return "Token Claim";
      case "withdrawal":
        return "Withdrawal";
      default:
        return type;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!user) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Token Rewards</h1>
        <p className="text-muted-foreground">
          Manage your earned tokens and track your rewards history
        </p>
      </div>
      
      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold mb-1">Available Balance</h2>
              <p className="text-white/80 mb-4">Your current token balance</p>
              <div className="flex items-center">
                <TokenDisplay amount={user.tokens} size="lg" className="text-white" />
              </div>
            </div>
            
            <div className="mt-6 md:mt-0">
              <Button
                className="bg-white text-purple-700 hover:bg-white/90"
                size="lg"
                onClick={handleClaimTokens}
                disabled={isLoading || user.tokens <= 0}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  <>
                    <Wallet className="mr-2 h-5 w-5" />
                    Claim Tokens
                  </>
                )}
              </Button>
              <p className="text-xs mt-2 text-white/80 text-center">
                Min. withdrawal: 5 APT
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <TokenDisplay amount={user.tokens + 15} size="lg" />
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <PiggyBank className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Claimed</p>
                <TokenDisplay amount={15} size="lg" />
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Send className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <TokenDisplay amount={user.tokens} size="lg" />
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Wallet className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Transactions History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2" />
            Transaction History
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Amount</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="mr-3">{getTransactionIcon(tx.type)}</div>
                        <span>{formatTransactionType(tx.type)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <TokenDisplay
                        amount={tx.amount}
                        className={
                          tx.type === "withdrawal" ? "text-red-500" : ""
                        }
                      />
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {formatDate(tx.date)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        {getTransactionStatusIcon(tx.status)}
                        <span className="ml-1 capitalize">{tx.status}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rewards;
