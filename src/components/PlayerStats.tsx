import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Target, Star } from "lucide-react";

interface PlayerStatsProps {
  playerLevel: number;
  playerExp: number;
  playerExpToNext: number;
  classLevel: number;
  classExp: number;
  classExpToNext: number;
  rank: string;
  className: string;
  streak: number;
}

export const PlayerStats = ({
  playerLevel,
  playerExp,
  playerExpToNext,
  classLevel,
  classExp,
  classExpToNext,
  rank,
  className,
  streak
}: PlayerStatsProps) => {
  const getRankColor = (rank: string) => {
    const colors: Record<string, string> = {
      'E': 'text-rank-e',
      'D': 'text-rank-d', 
      'C': 'text-rank-c',
      'B': 'text-rank-b',
      'A': 'text-rank-a',
      'S': 'text-rank-s',
      'SS': 'text-rank-ss',
      'SSS': 'text-rank-sss',
      'Monarch': 'text-rank-monarch'
    };
    return colors[rank] || 'text-foreground';
  };

  const playerExpPercent = (playerExp / playerExpToNext) * 100;
  const classExpPercent = (classExp / classExpToNext) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Player Level Card */}
      <Card className="quest-card glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Player Level</CardTitle>
          <Trophy className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{playerLevel}</div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>EXP: {playerExp}</span>
              <span>Next: {playerExpToNext}</span>
            </div>
            <Progress value={playerExpPercent} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Rank Card */}
      <Card className="quest-card glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Hunter Rank</CardTitle>
          <Star className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getRankColor(rank)}`}>
            {rank}
          </div>
          <Badge variant="secondary" className="mt-2">
            {className}
          </Badge>
        </CardContent>
      </Card>

      {/* Class Level Card */}
      <Card className="quest-card glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Class Level</CardTitle>
          <Zap className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{classLevel}</div>
          <div className="mt-2">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>EXP: {classExp}</span>
              <span>Next: {classExpToNext}</span>
            </div>
            <Progress value={classExpPercent} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Streak Card */}
      <Card className="quest-card glow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
          <Target className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{streak}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Days consecutive
          </p>
        </CardContent>
      </Card>
    </div>
  );
};