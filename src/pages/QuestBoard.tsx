import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { QuestBoard as QuestBoardComponent } from "@/components/QuestBoard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const QuestBoardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold text-primary">Quest Board</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search quests..." 
                    className="w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quest
                </Button>
              </div>
            </div>
          </header>
          
          <div className="p-6">
            {/* Quest Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Quests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </CardContent>
              </Card>
              
              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">3</div>
                  <p className="text-xs text-muted-foreground">+170 EXP earned</p>
                </CardContent>
              </Card>
              
              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">68%</div>
                  <Progress value={68} className="mt-2 h-2" />
                </CardContent>
              </Card>
              
              <Card className="quest-card glow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total EXP</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-rank-s">3,990</div>
                  <p className="text-xs text-muted-foreground">This week</p>
                </CardContent>
              </Card>
            </div>

            {/* Quest Board Component */}
            <QuestBoardComponent />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default QuestBoardPage;