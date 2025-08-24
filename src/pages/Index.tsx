import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { HunterDashboard } from "@/components/HunterDashboard";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <main className="flex-1">
          <header className="h-16 border-b border-border bg-card/50 backdrop-blur flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-primary">Solo Leveling Tracker</h1>
            </div>
          </header>
          
          <div className="p-6">
            <HunterDashboard />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
