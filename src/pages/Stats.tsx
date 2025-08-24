import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { PlayerStats } from "@/components/PlayerStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillRadarChart } from "@/components/SkillRadarChart";
import { MonthlyProgressChart } from "@/components/MonthlyProgressChart";
import { DailyProgressDonut } from "@/components/DailyProgressDonut";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target,
  Trophy,
  Flame,
  Clock,
  Zap,
  Brain,
  Code
} from "lucide-react";

const StatsPage = () => {
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

  const weeklyData = [
    { day: 'Mon', lifestyle: 120, aiml: 150, total: 270 },
    { day: 'Tue', lifestyle: 180, aiml: 100, total: 280 },
    { day: 'Wed', lifestyle: 90, aiml: 200, total: 290 },
    { day: 'Thu', lifestyle: 200, aiml: 150, total: 350 },
    { day: 'Fri', lifestyle: 150, aiml: 180, total: 330 },
    { day: 'Sat', lifestyle: 170, aiml: 120, total: 290 },
    { day: 'Sun', lifestyle: 100, aiml: 250, total: 350 },
  ];

  const skillData = [
    { skill: 'Programming', level: 85, maxLevel: 100 },
    { skill: 'Mathematics', level: 70, maxLevel: 100 },
    { skill: 'Statistics', level: 65, maxLevel: 100 },
    { skill: 'Machine Learning', level: 60, maxLevel: 100 },
    { skill: 'Deep Learning', level: 40, maxLevel: 100 },
    { skill: 'Gen AI', level: 45, maxLevel: 100 },
    { skill: 'Professional', level: 75, maxLevel: 100 },
  ];

  const monthlyData = [
    { month: 'Aug', lifestyle: 2400, aiml: 1800, total: 4200 },
    { month: 'Sep', lifestyle: 2800, aiml: 2200, total: 5000 },
    { month: 'Oct', lifestyle: 3200, aiml: 2800, total: 6000 },
    { month: 'Nov', lifestyle: 2900, aiml: 3100, total: 6000 },
    { month: 'Dec', lifestyle: 3400, aiml: 3600, total: 7000 },
    { month: 'Jan', lifestyle: 3100, aiml: 4200, total: 7300 },
  ];

  const dailyProgressData = [
    { name: 'Python Practice', value: 450, color: 'hsl(var(--primary))' },
    { name: 'Math Study', value: 320, color: 'hsl(var(--accent))' },
    { name: 'Fitness', value: 280, color: 'hsl(var(--destructive))' },
    { name: 'Reading', value: 180, color: 'hsl(142, 76%, 36%)' },
    { name: 'Projects', value: 220, color: 'hsl(47, 96%, 53%)' },
  ];

  const achievements = [
    { title: "First Steps", description: "Complete your first quest", unlocked: true, exp: 50 },
    { title: "Streak Master", description: "Maintain a 7-day streak", unlocked: true, exp: 100 },
    { title: "Python Novice", description: "Complete Python basics", unlocked: true, exp: 200 },
    { title: "AI Apprentice", description: "Reach Class Level 25", unlocked: true, exp: 300 },
    { title: "Hunter Elite", description: "Reach Rank A", unlocked: false, exp: 500 },
    { title: "Code Warrior", description: "Complete 5 ML projects", unlocked: false, exp: 1000 },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold text-primary">Statistics & Progress</h1>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <BarChart3 className="h-3 w-3 mr-1" />
                Analytics
              </Badge>
            </div>
          </header>
          
          <div className="p-6 space-y-8">
            {/* Player Stats Overview */}
            <PlayerStats {...playerData} />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-card">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Weekly Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="quest-card glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-primary" />
                        This Week
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">2,160 EXP</div>
                      <p className="text-sm text-muted-foreground">+15% from last week</p>
                      <Progress value={72} className="mt-2" />
                    </CardContent>
                  </Card>

                  <Card className="quest-card glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-accent" />
                        Quests Completed
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-accent">24</div>
                      <p className="text-sm text-muted-foreground">18 lifestyle, 6 AI/ML</p>
                    </CardContent>
                  </Card>

                  <Card className="quest-card glow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-destructive" />
                        Focus Time
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-destructive">18.5h</div>
                      <p className="text-sm text-muted-foreground">Across 42 sessions</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Daily Breakdown */}
                <Card className="quest-card">
                  <CardHeader>
                    <CardTitle>Weekly EXP Breakdown</CardTitle>
                    <CardDescription>
                      Your daily progress throughout the week
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {weeklyData.map((day) => (
                        <div key={day.day} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium">{day.day}</span>
                            <span className="text-muted-foreground">{day.total} EXP</span>
                          </div>
                          <div className="flex gap-1 h-2">
                            <div 
                              className="bg-primary rounded-sm" 
                              style={{ width: `${(day.lifestyle / day.total) * 100}%` }}
                            />
                            <div 
                              className="bg-accent rounded-sm" 
                              style={{ width: `${(day.aiml / day.total) * 100}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Lifestyle: {day.lifestyle}</span>
                            <span>AI/ML: {day.aiml}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                {/* Rank Progress */}
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle>Rank Progression</CardTitle>
                    <CardDescription>
                      Your journey through the hunter ranks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-rank-s font-bold">Current: S Rank</span>
                        <span className="text-muted-foreground">Level 42</span>
                      </div>
                      <Progress value={42} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Level 30 (S)</span>
                        <span>Level 60 (SS)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        18 more levels until SS Rank
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Skills Radar Chart */}
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      Skill Radar
                    </CardTitle>
                    <CardDescription>
                      Your comprehensive skill development across all areas
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkillRadarChart data={skillData} />
                  </CardContent>
                </Card>

                {/* Monthly Progress Trend */}
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-accent" />
                      Monthly Progress Trend
                    </CardTitle>
                    <CardDescription>
                      Your learning journey over the past 6 months
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MonthlyProgressChart data={monthlyData} />
                  </CardContent>
                </Card>

                {/* Daily Progress Breakdown */}
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-destructive" />
                      Today's Progress
                    </CardTitle>
                    <CardDescription>
                      Breakdown of your activities and achievements today
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DailyProgressDonut 
                      data={dailyProgressData} 
                      centerValue="1,450"
                      centerLabel="Total EXP"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid gap-4">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className={`quest-card ${achievement.unlocked ? 'glow' : 'opacity-60'}`}>
                      <CardContent className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            achievement.unlocked 
                              ? 'bg-primary/20 border border-primary/30' 
                              : 'bg-muted border border-muted-foreground/30'
                          }`}>
                            <Trophy className={`h-6 w-6 ${
                              achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{achievement.title}</h3>
                            <p className="text-sm text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={achievement.unlocked ? "default" : "secondary"}
                            className={achievement.unlocked ? "bg-primary/20 text-primary" : ""}
                          >
                            {achievement.unlocked ? "Unlocked" : "Locked"}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">+{achievement.exp} EXP</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="quest-card glow">
                    <CardHeader>
                      <CardTitle>Consistency Score</CardTitle>
                      <CardDescription>Based on daily activity</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-primary mb-2">94%</div>
                      <Progress value={94} className="mb-2" />
                      <p className="text-sm text-muted-foreground">Excellent consistency!</p>
                    </CardContent>
                  </Card>

                  <Card className="quest-card glow">
                    <CardHeader>
                      <CardTitle>Best Streak</CardTitle>
                      <CardDescription>Longest consecutive days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-destructive mb-2">28 days</div>
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-destructive" />
                        <span className="text-sm text-muted-foreground">Current: 12 days</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="quest-card">
                  <CardHeader>
                    <CardTitle>Monthly Trends</CardTitle>
                    <CardDescription>Your performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Average Daily EXP</span>
                        <span className="font-semibold text-primary">312 EXP</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Most Active Day</span>
                        <span className="font-semibold text-accent">Thursday</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Favorite Quest Type</span>
                        <span className="font-semibold text-destructive">Programming</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                        <span className="text-sm">Total Focus Time</span>
                        <span className="font-semibold text-rank-s">156 hours</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default StatsPage;