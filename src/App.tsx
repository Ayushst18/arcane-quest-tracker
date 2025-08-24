import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QuestQueueProvider } from "@/contexts/QuestQueueContext";
import { QuestTrackingProvider } from "@/contexts/QuestTrackingContext";
import Index from "./pages/Index";
import QuestBoard from "./pages/QuestBoard";
import FocusTimer from "./pages/FocusTimer";
import Stats from "./pages/Stats";
import Calendar from "./pages/Calendar";
import Achievements from "./pages/Achievements";

import Prestige from "./pages/Prestige";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <QuestTrackingProvider>
      <QuestQueueProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quests" element={<QuestBoard />} />
            <Route path="/timer" element={<FocusTimer />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/achievements" element={<Achievements />} />
            
            <Route path="/prestige" element={<Prestige />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </QuestQueueProvider>
    </QuestTrackingProvider>
  </QueryClientProvider>
);

export default App;
