
import { useState, useEffect } from "react";
import { Search, Trophy, Medal, Award, Star, Users, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import TokenDisplay from "@/components/TokenDisplay";

// Mock leaderboard data
const generateLeaderboardUsers = (count: number) => {
  const names = [
    "cryptomaster", "web3learner", "blockchain_guru", "token_hunter",
    "crypto_newbie", "aptoslover", "defi_wizard", "nft_collector",
    "crypto_queen", "hodler", "satoshi_fan", "eth_maxi", "aptos_dev",
    "move_coder", "chain_builder", "validator_pro", "genesis_miner",
    "block_explorer", "hash_master", "wallet_wizard"
  ];
  
  return Array.from({ length: count }).map((_, i) => {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomXp = Math.floor(Math.random() * 10000) + 1000;
    const randomTokens = +(Math.random() * 200).toFixed(2);
    
    return {
      id: `user-${i + 1}`,
      username: names[randomNameIndex] + Math.floor(Math.random() * 100),
      xp: randomXp,
      tokens: randomTokens,
      rank: i + 1,
    };
  });
};

type LeaderboardUser = {
  id: string;
  username: string;
  xp: number;
  tokens: number;
  rank: number;
};

const Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allTimeLeaderboard, setAllTimeLeaderboard] = useState<LeaderboardUser[]>([]);
  const [weeklyLeaderboard, setWeeklyLeaderboard] = useState<LeaderboardUser[]>([]);
  const [filteredLeaderboard, setFilteredLeaderboard] = useState<LeaderboardUser[]>([]);
  const [activeTab, setActiveTab] = useState("all-time");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userRank, setUserRank] = useState<LeaderboardUser | null>(null);
  
  useEffect(() => {
    // Generate mock leaderboard data
    const allTime = generateLeaderboardUsers(50);
    const weekly = generateLeaderboardUsers(30);
    
    // Sort by XP (descending)
    allTime.sort((a, b) => b.xp - a.xp);
    weekly.sort((a, b) => b.xp - a.xp);
    
    // Update ranks
    allTime.forEach((user, index) => {
      user.rank = index + 1;
    });
    
    weekly.forEach((user, index) => {
      user.rank = index + 1;
    });
    
    setAllTimeLeaderboard(allTime);
    setWeeklyLeaderboard(weekly);
    setFilteredLeaderboard(allTime);
    
    // Get current user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);
        
        // Create a mock rank for the current user
        const userIndex = Math.floor(Math.random() * 20) + 10; // Random rank between 10-30
        setUserRank({
          id: user.id,
          username: user.username,
          xp: user.xp,
          tokens: user.tokens,
          rank: userIndex + 1,
        });
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);
  
  // Handle tab change
  useEffect(() => {
    if (activeTab === "all-time") {
      setFilteredLeaderboard(
        searchTerm
          ? allTimeLeaderboard.filter((user) =>
              user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : allTimeLeaderboard
      );
    } else {
      setFilteredLeaderboard(
        searchTerm
          ? weeklyLeaderboard.filter((user) =>
              user.username.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : weeklyLeaderboard
      );
    }
  }, [activeTab, searchTerm, allTimeLeaderboard, weeklyLeaderboard]);
  
  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
          <Trophy className="text-yellow-500 h-4 w-4" />
        </div>
      );
    } else if (rank === 2) {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Medal className="text-gray-400 h-4 w-4" />
        </div>
      );
    } else if (rank === 3) {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
          <Award className="text-amber-700 h-4 w-4" />
        </div>
      );
    } else if (rank <= 10) {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Star className="text-blue-500 h-4 w-4" />
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
          <User className="text-muted-foreground h-4 w-4" />
        </div>
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          See how you rank against other learners on our platform
        </p>
      </div>
      
      {/* User's Rank Card */}
      {userRank && (
        <Card className="bg-brand-purple text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold">Your Ranking</h2>
                  <p className="text-white/80">Keep learning to climb the leaderboard!</p>
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 flex flex-col md:flex-row items-center gap-6">
                <div className="text-center">
                  <p className="text-white/80">Rank</p>
                  <p className="text-3xl font-bold">#{userRank.rank}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-white/80">XP</p>
                  <p className="text-3xl font-bold">{userRank.xp}</p>
                </div>
                
                <div className="text-center">
                  <p className="text-white/80">Tokens</p>
                  <TokenDisplay amount={userRank.tokens} size="lg" className="text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Leaderboard Content */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="text-brand-amber" />
              <span>Top Learners</span>
            </CardTitle>
            
            <div className="w-full md:w-64">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs
            defaultValue="all-time"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="all-time">All Time</TabsTrigger>
              <TabsTrigger value="weekly">This Week</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-time" className="space-y-0">
              <LeaderboardTable
                users={filteredLeaderboard}
                getRankIcon={getRankIcon}
                currentUsername={currentUser?.username}
              />
            </TabsContent>
            
            <TabsContent value="weekly" className="space-y-0">
              <LeaderboardTable
                users={filteredLeaderboard}
                getRankIcon={getRankIcon}
                currentUsername={currentUser?.username}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

type LeaderboardTableProps = {
  users: LeaderboardUser[];
  getRankIcon: (rank: number) => JSX.Element;
  currentUsername: string | undefined;
};

const LeaderboardTable = ({ users, getRankIcon, currentUsername }: LeaderboardTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No results found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium">Rank</th>
            <th className="text-left py-3 px-4 font-medium">User</th>
            <th className="text-left py-3 px-4 font-medium">XP</th>
            <th className="text-left py-3 px-4 font-medium">Tokens</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className={`border-b ${
                user.username === currentUsername
                  ? "bg-accent"
                  : "hover:bg-muted/50"
              }`}
            >
              <td className="py-4 px-4">
                <div className="flex items-center">
                  {getRankIcon(user.rank)}
                  <span className="ml-2 font-medium">#{user.rank}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="font-medium">{user.username}</span>
                  {user.username === currentUsername && (
                    <span className="text-xs bg-brand-purple text-white px-2 py-1 rounded">
                      You
                    </span>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">{user.xp.toLocaleString()}</td>
              <td className="py-4 px-4">
                <TokenDisplay amount={user.tokens} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
