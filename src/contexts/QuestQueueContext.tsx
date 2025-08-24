import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Very Hard' | 'Extreme';
  exp: number;
  type: 'lifestyle' | 'aiml';
  category: string;
  timeEstimate: string;
  priority?: number;
}

interface QuestQueueContextType {
  questQueue: Quest[];
  currentQuest: Quest | null;
  addQuestToQueue: (quest: Quest) => void;
  removeQuestFromQueue: (questId: string) => void;
  completeCurrentQuest: () => void;
  moveQuestToNext: () => void;
  reorderQuests: (activeId: string, overId: string) => void;
}

const QuestQueueContext = createContext<QuestQueueContextType | undefined>(undefined);

export const useQuestQueue = () => {
  const context = useContext(QuestQueueContext);
  if (!context) {
    throw new Error('useQuestQueue must be used within a QuestQueueProvider');
  }
  return context;
};

interface QuestQueueProviderProps {
  children: ReactNode;
}

const getDifficultyPriority = (difficulty: string): number => {
  const priorities = {
    'Easy': 1,
    'Normal': 2,
    'Hard': 3,
    'Very Hard': 4,
    'Extreme': 5
  };
  return priorities[difficulty as keyof typeof priorities] || 1;
};

export const QuestQueueProvider: React.FC<QuestQueueProviderProps> = ({ children }) => {
  const [questQueue, setQuestQueue] = useState<Quest[]>([]);
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);

  const addQuestToQueue = (quest: Quest) => {
    const questWithPriority = { 
      ...quest, 
      priority: quest.priority || getDifficultyPriority(quest.difficulty) 
    };
    
    setQuestQueue(prev => {
      const exists = prev.find(q => q.id === quest.id);
      if (exists) return prev;
      
      const newQueue = [...prev, questWithPriority];
      return newQueue.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    });

    // Set as current quest if none is active
    if (!currentQuest && questQueue.length === 0) {
      setCurrentQuest(questWithPriority);
    }
  };

  const removeQuestFromQueue = (questId: string) => {
    setQuestQueue(prev => prev.filter(q => q.id !== questId));
    
    if (currentQuest?.id === questId) {
      moveQuestToNext();
    }
  };

  const completeCurrentQuest = () => {
    if (currentQuest) {
      // Remove completed quest from queue
      setQuestQueue(prev => prev.filter(q => q.id !== currentQuest.id));
      moveQuestToNext();
    }
  };

  const moveQuestToNext = () => {
    const sortedQueue = questQueue.sort((a, b) => (b.priority || 0) - (a.priority || 0));
    const nextQuest = sortedQueue[0] || null;
    setCurrentQuest(nextQuest);
    
    if (nextQuest) {
      setQuestQueue(prev => prev.filter(q => q.id !== nextQuest.id));
    }
  };

  const reorderQuests = (activeId: string, overId: string) => {
    setQuestQueue(prev => {
      const activeIndex = prev.findIndex(quest => quest.id === activeId);
      const overIndex = prev.findIndex(quest => quest.id === overId);
      
      if (activeIndex === -1 || overIndex === -1) return prev;
      
      const newQueue = [...prev];
      const [reorderedItem] = newQueue.splice(activeIndex, 1);
      newQueue.splice(overIndex, 0, reorderedItem);
      
      return newQueue;
    });
  };

  return (
    <QuestQueueContext.Provider value={{
      questQueue,
      currentQuest,
      addQuestToQueue,
      removeQuestFromQueue,
      completeCurrentQuest,
      moveQuestToNext,
      reorderQuests
    }}>
      {children}
    </QuestQueueContext.Provider>
  );
};