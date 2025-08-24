import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Crown, 
  Zap, 
  Star, 
  RefreshCw, 
  TrendingUp,
  Flame,
  Trophy,
  Shield,
  Sword
} from "lucide-react";

const PrestigePage = () => {
  const currentLevel = 42;
  const prestigeRequirement = 100;
  const currentPrestige = 0;
  const canPrestige = currentLevel >= prestigeRequirement;

  const prestigeBenefits = [
    {
      icon: Zap,
      title: "EXP Multiplier",
      description: "Gain 10% more EXP from all quests",
      current: "1.0x",
      next: "1.1x"
    },
    {
      icon: Star,
      title: "Prestige Stars",
      description: "Unlock exclusive prestige ranks",
      current: "0 ⭐",
      next: "1 ⭐"
    },
    {
      icon: Crown,
      title: "Elite Status",
      description: "Access to exclusive prestige quests",
      current: "None",
      next: "Elite Hunter"
    },
    {
      icon: Flame,
      title: "Streak Bonus",
      description: "Enhanced streak multipliers",
      current: "+10 EXP",
      next: "+15 EXP"
    }
  ];

  const prestigeRanks = [
    { stars: 1, title: "Prestige Hunter", color: "text-blue-400", requirement: "First Prestige" },
    { stars: 2, title: "Elite Veteran", color: "text-purple-400", requirement: "2nd Prestige" },
    { stars: 3, title: "Shadow Legend", color: "text-orange-400", requirement: "3rd Prestige" },
    { stars: 5, title: "Transcendent", color: "text-pink-400", requirement: "5th Prestige" },
    { stars: 10, title: "Eternal Hunter", color: "text-cyan-400", requirement: "10th Prestige" },
  ];

  const prestigeQuests = [
    {
      title: "Legendary Titan Project",
      description: "Build an advanced AI system that surpasses human capabilities",
      exp: 5000,
      difficulty: "Legendary",
      requirement: "Prestige 1+"
    },
    {
      title: "Shadow Realm Training",
      description: "Complete 100 focus sessions without breaking streak",
      exp: 3000,
      difficulty: "Epic",
      requirement: "Prestige 1+"
    },
    {
      title: "Monarch's Challenge",
      description: "Reach level 200 while maintaining perfect consistency",
      exp: 10000,
      difficulty: "Mythic",
      requirement: "Prestige 3+"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'Epic': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Legendary': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Mythic': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
    };
    return colors[difficulty] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold text-primary">Prestige System</h1>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                <Crown className="h-3 w-3 mr-1" />
                Prestige {currentPrestige}
              </Badge>
            </div>
          </header>
          
          <div className="p-6 space-y-8">
            {/* Prestige Overview */}
            <Card className={`quest-card ${canPrestige ? 'glow-intense' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5 text-primary" />
                  Prestige Ascension
                </CardTitle>
                <CardDescription>
                  Reset your level to gain permanent bonuses and unlock elite content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Current Level</span>
                        <span className="font-semibold text-primary">{currentLevel}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Prestige Requirement</span>
                        <span className="font-semibold">{prestigeRequirement}</span>
                      </div>
                      <Progress 
                        value={(currentLevel / prestigeRequirement) * 100} 
                        className="h-3"
                      />
                    </div>
                    
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <h4 className="font-semibold mb-2">What happens when you prestige?</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Level resets to 1</li>
                        <li>• Keep all achievements and unlocks</li>
                        <li>• Gain permanent EXP multiplier</li>
                        <li>• Unlock prestige-exclusive content</li>
                        <li>• Earn prestige stars and titles</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Prestige Rewards</h4>
                    {prestigeBenefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card border">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium text-sm">{benefit.title}</p>
                              <p className="text-xs text-muted-foreground">{benefit.description}</p>
                            </div>
                          </div>
                          <div className="text-right text-xs">
                            <div className="text-muted-foreground">{benefit.current}</div>
                            <div className="text-primary">→ {benefit.next}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    size="lg" 
                    disabled={!canPrestige}
                    className={canPrestige ? "bg-gradient-primary glow" : ""}
                  >
                    <Crown className="h-5 w-5 mr-2" />
                    {canPrestige ? "Ascend to Prestige 1" : `Reach Level ${prestigeRequirement} to Prestige`}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Prestige Ranks */}
              <Card className="quest-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-accent" />
                    Prestige Ranks
                  </CardTitle>
                  <CardDescription>
                    Exclusive titles and recognition for dedicated hunters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prestigeRanks.map((rank, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${
                          currentPrestige >= rank.stars ? 'bg-card glow' : 'bg-muted/30 opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              currentPrestige >= rank.stars 
                                ? 'bg-primary/20 border border-primary/30' 
                                : 'bg-muted'
                            }`}>
                              <Crown className={`h-5 w-5 ${
                                currentPrestige >= rank.stars ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div>
                              <h3 className={`font-semibold ${rank.color}`}>{rank.title}</h3>
                              <p className="text-sm text-muted-foreground">{rank.requirement}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg">{"⭐".repeat(rank.stars)}</div>
                            <Badge variant={currentPrestige >= rank.stars ? "default" : "secondary"}>
                              {currentPrestige >= rank.stars ? "Unlocked" : "Locked"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Prestige Quests */}
              <Card className="quest-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sword className="h-5 w-5 text-destructive" />
                    Prestige Quests
                  </CardTitle>
                  <CardDescription>
                    Exclusive high-difficulty challenges for prestige hunters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prestigeQuests.map((quest, index) => (
                      <div 
                        key={index} 
                        className={`p-4 rounded-lg border ${
                          currentPrestige >= 1 ? 'bg-card' : 'bg-muted/30 opacity-60'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{quest.title}</h3>
                              <p className="text-sm text-muted-foreground">{quest.description}</p>
                            </div>
                            <div className="text-right space-y-1">
                              <Badge className={getDifficultyColor(quest.difficulty)}>
                                {quest.difficulty}
                              </Badge>
                              <p className="text-xs text-muted-foreground">+{quest.exp.toLocaleString()} EXP</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline">
                              {quest.requirement}
                            </Badge>
                            <Button 
                              size="sm" 
                              disabled={currentPrestige < 1}
                              variant={currentPrestige >= 1 ? "default" : "secondary"}
                            >
                              {currentPrestige >= 1 ? "Start Quest" : "Locked"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Prestige Hall of Fame */}
            <Card className="quest-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-rank-monarch" />
                  Hall of Legends
                </CardTitle>
                <CardDescription>
                  Elite hunters who have achieved multiple prestiges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-primary/10 border border-primary/30">
                    <div className="text-center space-y-2">
                      <Shield className="h-8 w-8 mx-auto text-primary" />
                      <h3 className="font-semibold text-cyan-400">Shadow Monarch</h3>
                      <p className="text-sm text-muted-foreground">10⭐ Eternal Hunter</p>
                      <Badge className="bg-cyan-500/20 text-cyan-400">
                        Most Prestigious
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-center space-y-2">
                      <Crown className="h-8 w-8 mx-auto text-orange-400" />
                      <h3 className="font-semibold text-orange-400">Iron Hunter</h3>
                      <p className="text-sm text-muted-foreground">5⭐ Transcendent</p>
                      <Badge className="bg-orange-500/20 text-orange-400">
                        Rising Legend
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border">
                    <div className="text-center space-y-2">
                      <Star className="h-8 w-8 mx-auto text-purple-400" />
                      <h3 className="font-semibold text-purple-400">Code Ninja</h3>
                      <p className="text-sm text-muted-foreground">3⭐ Shadow Legend</p>
                      <Badge className="bg-purple-500/20 text-purple-400">
                        Elite Veteran
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PrestigePage;