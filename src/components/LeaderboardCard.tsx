
import { Crown, Trophy, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TokenDisplay from "./TokenDisplay";

type LeaderboardUser = {
  id: string;
  username: string;
  xp: number;
  tokens: number;
  rank: number;
};

type LeaderboardCardProps = {
  users: LeaderboardUser[];
  className?: string;
};

const LeaderboardCard = ({ users, className = "" }: LeaderboardCardProps) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={20} />;
      case 2:
        return <Trophy className="text-gray-400" size={20} />;
      case 3:
        return <Medal className="text-amber-700" size={20} />;
      default:
        return <span className="text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-0">
        <div className="bg-brand-purple p-4">
          <h3 className="text-white font-bold text-lg">Leaderboard</h3>
        </div>
        <div className="p-4">
          <ul className="divide-y divide-border">
            {users.map((user) => (
              <li key={user.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(user.rank)}
                  </div>
                  <div>
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-muted-foreground">{user.xp} XP</p>
                  </div>
                </div>
                <TokenDisplay amount={user.tokens} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
