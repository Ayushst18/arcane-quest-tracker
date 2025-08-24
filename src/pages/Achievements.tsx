import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Crown, 
  Flame, 
  Target, 
  Zap,
  Code,
  Brain,
  Dumbbell,
  Clock
} from "lucide-react";

const AchievementsPage = () => {
  const categories = {
    lifestyle: {
      icon: Target,
      color: "text-green-400",
      achievements: [
        { title: "Early Bird", description: "Wake up at 7 AM for 7 days straight", progress: 7, total: 7, unlocked: true, exp: 100, tier: "bronze" },
        { title: "Hydration Hero", description: "Drink 6L water for 30 days", progress: 12, total: 30, unlocked: false, exp: 300, tier: "silver" },
        { title: "Gym Warrior", description: "Complete 50 workout sessions", progress: 23, total: 50, unlocked: false, exp: 500, tier: "gold" },
        { title: "Streak Master", description: "Maintain a 30-day streak", progress: 12, total: 30, unlocked: false, exp: 1000, tier: "platinum" },
      ]
    },
    programming: {
      icon: Code,
      color: "text-blue-400",
      achievements: [
        { title: "Hello World", description: "Complete your first Python quest", progress: 1, total: 1, unlocked: true, exp: 50, tier: "bronze" },
        { title: "Syntax Master", description: "Complete all Python basics", progress: 8, total: 12, unlocked: false, exp: 200, tier: "silver" },
        { title: "Code Ninja", description: "Complete 5 programming projects", progress: 2, total: 5, unlocked: false, exp: 500, tier: "gold" },
        { title: "Algorithm Sage", description: "Master advanced data structures", progress: 0, total: 10, unlocked: false, exp: 800, tier: "platinum" },
      ]
    },
    ml: {
      icon: Brain,
      color: "text-purple-400",
      achievements: [
        { title: "ML Novice", description: "Complete your first ML project", progress: 1, total: 1, unlocked: true, exp: 100, tier: "bronze" },
        { title: "Data Wizard", description: "Complete 3 data science projects", progress: 1, total: 3, unlocked: false, exp: 300, tier: "silver" },
        { title: "Neural Network Architect", description: "Build 5 deep learning models", progress: 0, total: 5, unlocked: false, exp: 600, tier: "gold" },
        { title: "AI Master", description: "Complete advanced AI specialization", progress: 0, total: 1, unlocked: false, exp: 1500, tier: "diamond" },
      ]
    },
    focus: {
      icon: Clock,
      color: "text-orange-400",
      achievements: [
        { title: "Focused Mind", description: "Complete 10 focus sessions", progress: 15, total: 10, unlocked: true, exp: 75, tier: "bronze" },
        { title: "Concentration King", description: "Focus for 100 hours total", progress: 45, total: 100, unlocked: false, exp: 250, tier: "silver" },
        { title: "Deep Work Master", description: "Complete a 4-hour focus session", progress: 0, total: 1, unlocked: false, exp: 400, tier: "gold" },
        { title: "Meditation Monk", description: "Maintain focus streaks for 90 days", progress: 12, total: 90, unlocked: false, exp: 1000, tier: "diamond" },
      ]
    }
  };

  const milestones = [
    { title: "Hunter Awakening", description: "Reach Level 10", level: 10, unlocked: true, exp: 200 },
    { title: "Elite Recognition", description: "Reach Rank C", level: 25, unlocked: true, exp: 500 },
    { title: "Shadow Hunter", description: "Reach Rank B", level: 40, unlocked: true, exp: 800 },
    { title: "S-Rank Hunter", description: "Reach Rank A", level: 65, unlocked: false, exp: 1200 },
    { title: "National Power", description: "Reach Rank S", level: 100, unlocked: false, exp: 2000 },
    { title: "Sovereign", description: "Reach SS Rank", level: 150, unlocked: false, exp: 3000 },
    { title: "Monarch", description: "Reach SSS Rank", level: 200, unlocked: false, exp: 5000 },
  ];

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      bronze: "text-amber-600 bg-amber-500/20 border-amber-500/30",
      silver: "text-gray-400 bg-gray-500/20 border-gray-500/30",
      gold: "text-yellow-400 bg-yellow-500/20 border-yellow-500/30",
      platinum: "text-cyan-400 bg-cyan-500/20 border-cyan-500/30",
      diamond: "text-purple-400 bg-purple-500/20 border-purple-500/30"
    };
    return colors[tier] || colors.bronze;
  };

  const getTierIcon = (tier: string) => {
    const icons: Record<string, any> = {
      bronze: Trophy,
      silver: Star,
      gold: Crown,
      platinum: Zap,
      diamond: Flame
    };
    return icons[tier] || Trophy;
  };

  const totalAchievements = Object.values(categories).reduce((acc, cat) => acc + cat.achievements.length, 0) + milestones.length;
  const unlockedAchievements = Object.values(categories).reduce((acc, cat) => 
    acc + cat.achievements.filter(a => a.unlocked).length, 0) + milestones.filter(m => m.unlocked).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold text-primary">Achievements & Trophies</h1>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                {unlockedAchievements}/{totalAchievements} Unlocked
              </Badge>
            </div>
          </header>
          
          <div className="p-6 space-y-8">
            {/* Progress Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Achievement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">
                    {Math.round((unlockedAchievements / totalAchievements) * 100)}%
                  </div>
                  <Progress value={(unlockedAchievements / totalAchievements) * 100} className="mt-2 h-2" />
                </CardContent>
              </Card>

              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total EXP from Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">4,275</div>
                  <p className="text-xs text-muted-foreground">EXP earned</p>
                </CardContent>
              </Card>

              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Rarest Achievement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-400">Diamond</div>
                  <p className="text-xs text-muted-foreground">Highest tier unlocked</p>
                </CardContent>
              </Card>

              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Next Milestone</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">23</div>
                  <p className="text-xs text-muted-foreground">Levels to S-Rank</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card">
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
              </TabsList>

              <TabsContent value="categories" className="space-y-8">
                {Object.entries(categories).map(([key, category]) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={key} className="quest-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <IconComponent className={`h-5 w-5 ${category.color}`} />
                          {key.charAt(0).toUpperCase() + key.slice(1)} Achievements
                        </CardTitle>
                        <CardDescription>
                          {category.achievements.filter(a => a.unlocked).length} of {category.achievements.length} unlocked
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          {category.achievements.map((achievement, index) => {
                            const TierIcon = getTierIcon(achievement.tier);
                            return (
                              <div key={index} className={`p-4 rounded-lg border ${
                                achievement.unlocked ? 'bg-card glow' : 'bg-muted/30 opacity-60'
                              }`}>
                                <div className="flex items-start justify-between mb-2">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      achievement.unlocked ? getTierColor(achievement.tier) : 'bg-muted'
                                    }`}>
                                      <TierIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <h3 className="font-semibold">{achievement.title}</h3>
                                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <Badge 
                                      className={achievement.unlocked ? getTierColor(achievement.tier) : 'bg-muted'}
                                    >
                                      {achievement.tier}
                                    </Badge>
                                    <p className="text-xs text-muted-foreground mt-1">+{achievement.exp} EXP</p>
                                  </div>
                                </div>
                                {!achievement.unlocked && (
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span>Progress</span>
                                      <span>{achievement.progress}/{achievement.total}</span>
                                    </div>
                                    <Progress 
                                      value={(achievement.progress / achievement.total) * 100} 
                                      className="h-2" 
                                    />
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </TabsContent>

              <TabsContent value="milestones" className="space-y-6">
                <Card className="quest-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-rank-monarch" />
                      Hunter Rank Milestones
                    </CardTitle>
                    <CardDescription>
                      Major progression milestones in your hunter journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {milestones.map((milestone, index) => (
                        <div key={index} className={`p-4 rounded-lg border flex items-center justify-between ${
                          milestone.unlocked ? 'bg-card glow' : 'bg-muted/30 opacity-60'
                        }`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              milestone.unlocked 
                                ? 'bg-rank-s/20 border border-rank-s/30' 
                                : 'bg-muted border border-muted-foreground/30'
                            }`}>
                              <Crown className={`h-6 w-6 ${
                                milestone.unlocked ? 'text-rank-s' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold">{milestone.title}</h3>
                              <p className="text-sm text-muted-foreground">{milestone.description}</p>
                              <p className="text-xs text-muted-foreground">Required Level: {milestone.level}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={milestone.unlocked ? "default" : "secondary"}
                              className={milestone.unlocked ? "bg-rank-s/20 text-rank-s" : ""}
                            >
                              {milestone.unlocked ? "Achieved" : "Locked"}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">+{milestone.exp} EXP</p>
                          </div>
                        </div>
                      ))}
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

export default AchievementsPage;