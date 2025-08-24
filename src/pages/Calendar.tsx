import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DailyQuestHistory } from "@/components/DailyQuestHistory";
import { useQuestTracking } from "@/contexts/QuestTrackingContext";
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Flame, 
  Target, 
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown
} from "lucide-react";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { dailyRecords, getDailyRecord, completeQuest } = useQuestTracking();

  // Generate calendar data from tracking records
  const getCalendarData = () => {
    const questCompletionDays: { date: Date; count: number; exp: number; netExp: number }[] = [];
    const expGainDays: Date[] = [];
    const expLossDays: Date[] = [];
    
    Object.values(dailyRecords).forEach(record => {
      const date = new Date(record.date);
      const completedCount = record.quests.filter(q => q.completed).length;
      
      questCompletionDays.push({
        date,
        count: completedCount,
        exp: record.totalExpGained,
        netExp: record.netExp
      });
      
      if (record.netExp > 0) {
        expGainDays.push(date);
      } else if (record.netExp < 0) {
        expLossDays.push(date);
      }
    });
    
    return { questCompletionDays, expGainDays, expLossDays };
  };

  const { questCompletionDays, expGainDays, expLossDays } = getCalendarData();

  const upcomingDeadlines = [
    { title: "Complete Titanic Project", date: "Jan 25", priority: "high", exp: 200 },
    { title: "Linear Algebra Quiz", date: "Jan 27", priority: "medium", exp: 150 },
    { title: "Python Certification", date: "Feb 2", priority: "high", exp: 500 },
    { title: "Weekly Review", date: "Jan 28", priority: "low", exp: 50 },
  ];

  // Get today's quests from tracking
  const todaysRecord = getDailyRecord(new Date());
  const todaysQuests = todaysRecord?.quests.map(q => ({
    id: q.questId,
    title: q.quest.title,
    completed: q.completed,
    exp: q.quest.exp,
    expGained: q.expGained,
    expLost: q.expLost
  })) || [];

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      high: 'bg-red-500/20 text-red-400 border-red-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[priority] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold text-primary">Calendar & Deadlines</h1>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Deadline
              </Button>
            </div>
          </header>
          
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      Quest Calendar
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      modifiers={{
                        expGain: expGainDays,
                        expLoss: expLossDays,
                        completed: questCompletionDays.map(q => q.date)
                      }}
                      modifiersStyles={{
                        expGain: { 
                          backgroundColor: 'hsl(var(--primary))', 
                          color: 'white',
                          borderRadius: '50%'
                        },
                        expLoss: { 
                          backgroundColor: 'hsl(var(--destructive))', 
                          color: 'white',
                          borderRadius: '50%'
                        },
                        completed: { 
                          backgroundColor: 'hsl(var(--accent))', 
                          color: 'hsl(var(--accent-foreground))' 
                        }
                      }}
                    />
                  </CardContent>
                </Card>

                {/* Daily Quest History */}
                {selectedDate && <DailyQuestHistory selectedDate={selectedDate} />}

                {/* Today's Quick Actions */}
                <Card className="quest-card">
                  <CardHeader>
                    <CardTitle>Today's Quests - Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {todaysQuests.map((quest, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Button
                              variant={quest.completed ? "default" : "outline"}
                              size="sm"
                              className="w-8 h-8 p-0"
                              onClick={() => !quest.completed && completeQuest(quest.id)}
                              disabled={quest.completed}
                            >
                              {quest.completed && <CheckCircle2 className="h-4 w-4" />}
                            </Button>
                            <span className={quest.completed ? 'line-through text-muted-foreground' : ''}>
                              {quest.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {quest.completed ? (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                +{quest.expGained} EXP
                              </Badge>
                            ) : quest.expLost < 0 ? (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                <TrendingDown className="h-3 w-3 mr-1" />
                                {quest.expLost} EXP
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-primary/20 text-primary">
                                +{quest.exp} EXP
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Streak Info */}
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-destructive" />
                      Current Streak
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-destructive">12 days</div>
                      <p className="text-sm text-muted-foreground">Personal best: 28 days</p>
                      <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                        <p className="text-xs text-destructive">
                          🔥 Streak bonus: +10 EXP on all quests
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Deadlines */}
                <Card className="quest-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-accent" />
                      Upcoming Deadlines
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingDeadlines.map((deadline, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{deadline.title}</h4>
                              <p className="text-xs text-muted-foreground">{deadline.date}</p>
                            </div>
                            <Badge className={getPriorityColor(deadline.priority)}>
                              {deadline.priority}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                              +{deadline.exp} EXP
                            </Badge>
                          </div>
                          {index < upcomingDeadlines.length - 1 && <hr className="border-border" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Monthly Stats */}
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-primary" />
                      This Month
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {(() => {
                      const monthRecords = Object.values(dailyRecords).filter(record => {
                        const recordDate = new Date(record.date);
                        const currentMonth = new Date().getMonth();
                        return recordDate.getMonth() === currentMonth;
                      });
                      
                      const daysActive = monthRecords.length;
                      const totalCompleted = monthRecords.reduce((sum, record) => 
                        sum + record.quests.filter(q => q.completed).length, 0);
                      const totalExp = monthRecords.reduce((sum, record) => sum + record.netExp, 0);
                      const bestDay = Math.max(...monthRecords.map(r => r.netExp), 0);
                      
                      return (
                        <>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Days Active</span>
                            <span className="font-semibold text-primary">{daysActive}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Quests Completed</span>
                            <span className="font-semibold text-accent">{totalCompleted}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Total EXP</span>
                            <span className={`font-semibold ${totalExp >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {totalExp >= 0 ? '+' : ''}{totalExp}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Best Day</span>
                            <span className="font-semibold text-rank-s">+{bestDay} EXP</span>
                          </div>
                        </>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CalendarPage;