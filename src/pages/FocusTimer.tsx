import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuestQueue } from "@/contexts/QuestQueueContext";
import { useToast } from "@/hooks/use-toast";
import { DraggableQuestItem } from "@/components/DraggableQuestItem";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Play, Pause, Square, RotateCcw, Clock, Target, Zap, List } from "lucide-react";

const FocusTimerPage = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("25");
  const [completedSessions, setCompletedSessions] = useState(3);
  const { currentQuest, questQueue, completeCurrentQuest, removeQuestFromQueue, reorderQuests } = useQuestQueue();
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderQuests(active.id as string, over.id as string);
    }
  };

  // Auto-set timer duration based on current quest's time estimate
  useEffect(() => {
    if (currentQuest?.timeEstimate && !isRunning) {
      const timeMatch = currentQuest.timeEstimate.match(/(\d+)\s*(min|hour)/i);
      if (timeMatch) {
        const duration = parseInt(timeMatch[1]);
        const unit = timeMatch[2].toLowerCase();
        const minutes = unit === 'hour' ? duration * 60 : duration;
        setSelectedDuration(minutes.toString());
        setTimeLeft(minutes * 60);
      }
    }
  }, [currentQuest, isRunning]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setCompletedSessions(prev => prev + 1);
      
      // Complete current quest and move to next
      if (currentQuest) {
        completeCurrentQuest();
        toast({
          title: "Quest Completed! 🎉",
          description: `You earned +${currentQuest.exp} EXP for completing "${currentQuest.title}"`,
        });
      }
      
      // Reset timer for next quest or default
      const nextDuration = parseInt(selectedDuration) * 60;
      setTimeLeft(nextDuration);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, selectedDuration, currentQuest, completeCurrentQuest, toast]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(parseInt(selectedDuration) * 60);
  };
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(parseInt(selectedDuration) * 60);
  };

  const handleDurationChange = (value: string) => {
    setSelectedDuration(value);
    setTimeLeft(parseInt(value) * 60);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((parseInt(selectedDuration) * 60 - timeLeft) / (parseInt(selectedDuration) * 60)) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Normal': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Hard': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Very Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Extreme': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold text-primary">Focus Timer</h1>
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                Pomodoro Technique
              </Badge>
            </div>
          </header>
          
          <div className="p-6 max-w-4xl mx-auto">
            {/* Current Quest */}
            <Card className="quest-card glow mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Current Quest
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentQuest ? (
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{currentQuest.title}</h3>
                      <p className="text-muted-foreground">{currentQuest.category} • +{currentQuest.exp} EXP</p>
                      <p className="text-sm text-muted-foreground mt-1">{currentQuest.description}</p>
                    </div>
                    <Badge className={getDifficultyColor(currentQuest.difficulty)}>
                      {currentQuest.difficulty}
                    </Badge>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No quest selected</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Go to Quest Board to start your first quest
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quest Queue */}
            {questQueue.length > 0 && (
              <Card className="quest-card glow mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <List className="h-5 w-5 text-accent" />
                    Quest Queue ({questQueue.length})
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop to reorder your quest priorities
                  </p>
                </CardHeader>
                <CardContent>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext 
                      items={questQueue.map(q => q.id)} 
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="space-y-2">
                        {questQueue.map((quest, index) => (
                          <DraggableQuestItem
                            key={quest.id}
                            quest={quest}
                            index={index}
                            onRemove={removeQuestFromQueue}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Timer */}
              <Card className="quest-card glow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Focus Timer
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  {/* Timer Display */}
                  <div className="relative">
                    <div className="text-6xl font-mono font-bold text-primary mb-4">
                      {formatTime(timeLeft)}
                    </div>
                    <Progress value={progress} className="h-3 mb-6" />
                  </div>

                  {/* Duration Selector */}
                  <div className="space-y-4">
                    <Select value={selectedDuration} onValueChange={handleDurationChange}>
                      <SelectTrigger className="w-48 mx-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="25">25 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center gap-4">
                    {!isRunning ? (
                      <Button size="lg" onClick={handleStart} className="px-8">
                        <Play className="h-5 w-5 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button size="lg" onClick={handlePause} variant="secondary" className="px-8">
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}
                    
                    <Button size="lg" onClick={handleStop} variant="destructive">
                      <Square className="h-5 w-5 mr-2" />
                      Stop
                    </Button>
                    
                    <Button size="lg" onClick={handleReset} variant="outline">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Session Stats */}
              <div className="space-y-6">
                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-accent" />
                      Today's Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-accent mb-2">{completedSessions}</div>
                    <p className="text-muted-foreground">Completed sessions</p>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-3 rounded-full ${
                            i < completedSessions ? 'bg-accent' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Goal: 8 sessions</p>
                  </CardContent>
                </Card>

                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle>Session Rewards</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Base EXP</span>
                      <Badge variant="secondary">+25 EXP</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Streak Bonus</span>
                      <Badge variant="secondary">+10 EXP</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quest Completion</span>
                      <Badge className="bg-primary/20 text-primary">+50 EXP</Badge>
                    </div>
                    <hr className="border-border" />
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Potential</span>
                      <Badge className="bg-gradient-primary">+85 EXP</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="quest-card glow">
                  <CardHeader>
                    <CardTitle>Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>• Take a 5-minute break between sessions</p>
                    <p>• Stay hydrated during focus time</p>
                    <p>• Turn off notifications for better focus</p>
                    <p>• Streak bonuses increase with consistency</p>
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

export default FocusTimerPage;