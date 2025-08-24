import { PlayerStats } from "./PlayerStats";
import { QuestBoard } from "./QuestBoard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Flame, 
  Clock, 
  Calendar, 
  TrendingUp,
  Play,
  Pause
} from "lucide-react";

export const HunterDashboard = () => {
  const playerData = {
    playerLevel: 42,
    playerExp: 2150,
    playerExpToNext: 2500,
    classLevel: 28,
    classExp: 1840,
    classExpToNext: 2000,
    rank: 'S',
    className: 'Elite Knight',
    streak: 12
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Welcome back, Shadow Hunter
        </h1>
        <p className="text-muted-foreground text-lg">
          Continue your journey to become the ultimate AI/ML master
        </p>
      </div>

      {/* Player Stats */}
      <PlayerStats {...playerData} />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Focus Timer */}
        <Card className="quest-card glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Focus Timer
            </CardTitle>
            <CardDescription>
              Start a focused study session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-mono text-primary">25:00</div>
              <Button className="w-full" variant="default">
                <Play className="h-4 w-4 mr-2" />
                Start Session
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Progress */}
        <Card className="quest-card glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Today's Progress
            </CardTitle>
            <CardDescription>
              Quests completed today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-accent">3/8</div>
              <div className="text-sm text-muted-foreground">
                +170 EXP earned
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Tracker */}
        <Card className="quest-card glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-destructive" />
              Current Streak
            </CardTitle>
            <CardDescription>
              Keep the momentum going!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-2xl font-bold text-destructive">12 days</div>
              <Badge variant="secondary" className="w-full justify-center">
                <Calendar className="h-3 w-3 mr-1" />
                Streak Bonus Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quest Board */}
      <QuestBoard />

      {/* Recent Activity */}
      <Card className="quest-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest achievements and progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-green-400" />
                </div>
                <span className="text-sm">Completed "Wake up at 7 AM" quest</span>
              </div>
              <Badge variant="secondary">+20 EXP</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm">Reached 12-day streak milestone</span>
              </div>
              <Badge variant="secondary">+50 EXP</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Flame className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-sm">Started "Python Variables" learning quest</span>
              </div>
              <Badge variant="secondary">In Progress</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};