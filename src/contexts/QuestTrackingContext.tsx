import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { format, isToday, startOfDay, differenceInHours } from 'date-fns';

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Normal' | 'Hard' | 'Very Hard' | 'Extreme';
  exp: number;
  type: 'lifestyle' | 'aiml';
  category: string;
  timeEstimate?: string;
}

interface DailyQuestStatus {
  questId: string;
  quest: Quest;
  completed: boolean;
  completedAt?: Date;
  expGained: number;
  expLost: number;
}

interface DailyRecord {
  date: string; // YYYY-MM-DD format
  quests: DailyQuestStatus[];
  totalExpGained: number;
  totalExpLost: number;
  netExp: number;
  lifestyleQuestsAssigned: Quest[];
}

interface QuestTrackingContextType {
  dailyRecords: Record<string, DailyRecord>;
  assignLifestyleQuests: (quests: Quest[], date?: Date) => void;
  completeQuest: (questId: string, date?: Date) => void;
  getDailyRecord: (date: Date) => DailyRecord | null;
  processEndOfDay: (date: Date) => void;
  getLifestyleQuestsPenalty: () => Quest[];
}

const QuestTrackingContext = createContext<QuestTrackingContextType | undefined>(undefined);

export const useQuestTracking = () => {
  const context = useContext(QuestTrackingContext);
  if (!context) {
    throw new Error('useQuestTracking must be used within a QuestTrackingProvider');
  }
  return context;
};

const getExpByDifficulty = (difficulty: string): number => {
  const expValues = {
    'Easy': 20,
    'Normal': 50,
    'Hard': 100,
    'Very Hard': 200,
    'Extreme': 400
  };
  return expValues[difficulty as keyof typeof expValues] || 20;
};

const getExpPenalty = (difficulty: string): number => {
  const expValues = {
    'Easy': -10,
    'Normal': -25,
    'Hard': -50,
    'Very Hard': -100,
    'Extreme': -200
  };
  return expValues[difficulty as keyof typeof expValues] || -10;
};

// Sample lifestyle quests that should be assigned daily
const defaultLifestyleQuests: Quest[] = [
  {
    id: 'wake7am',
    title: 'Wake up at 7 AM',
    description: 'Start your day early and maintain a consistent sleep schedule',
    difficulty: 'Easy',
    exp: 20,
    type: 'lifestyle',
    category: 'Daily',
    timeEstimate: '5 min'
  },
  {
    id: 'gym-workout',
    title: 'Complete Daily Workout',
    description: 'Complete your scheduled workout routine',
    difficulty: 'Normal',
    exp: 50,
    type: 'lifestyle',
    category: 'Fitness',
    timeEstimate: '45 min'
  },
  {
    id: 'drink-water',
    title: 'Drink 6L Water',
    description: 'Stay hydrated throughout the day',
    difficulty: 'Easy',
    exp: 20,
    type: 'lifestyle',
    category: 'Health',
    timeEstimate: '2 min'
  },
  {
    id: 'healthy-meal',
    title: 'Eat Healthy Meals',
    description: 'Maintain a balanced diet with nutritious meals',
    difficulty: 'Normal',
    exp: 30,
    type: 'lifestyle',
    category: 'Nutrition',
    timeEstimate: '30 min'
  },
  {
    id: 'meditation',
    title: 'Daily Meditation',
    description: 'Practice mindfulness and mental clarity',
    difficulty: 'Easy',
    exp: 25,
    type: 'lifestyle',
    category: 'Mental Health',
    timeEstimate: '15 min'
  }
];

export const QuestTrackingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dailyRecords, setDailyRecords] = useState<Record<string, DailyRecord>>({});

  // Auto-assign lifestyle quests for today if not already assigned
  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (!dailyRecords[today]) {
      assignLifestyleQuests(defaultLifestyleQuests, new Date());
    }
  }, [dailyRecords]);

  const assignLifestyleQuests = (quests: Quest[], date: Date = new Date()) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    
    setDailyRecords(prev => ({
      ...prev,
      [dateKey]: {
        date: dateKey,
        quests: quests.filter(q => q.type === 'lifestyle').map(quest => ({
          questId: quest.id,
          quest,
          completed: false,
          expGained: 0,
          expLost: 0
        })),
        totalExpGained: 0,
        totalExpLost: 0,
        netExp: 0,
        lifestyleQuestsAssigned: quests.filter(q => q.type === 'lifestyle')
      }
    }));
  };

  const completeQuest = (questId: string, date: Date = new Date()) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    
    setDailyRecords(prev => {
      const record = prev[dateKey];
      if (!record) return prev;

      const updatedQuests = record.quests.map(questStatus => {
        if (questStatus.questId === questId && !questStatus.completed) {
          const expGained = getExpByDifficulty(questStatus.quest.difficulty);
          return {
            ...questStatus,
            completed: true,
            completedAt: new Date(),
            expGained
          };
        }
        return questStatus;
      });

      const totalExpGained = updatedQuests.reduce((sum, q) => sum + q.expGained, 0);
      const totalExpLost = updatedQuests.reduce((sum, q) => sum + q.expLost, 0);

      return {
        ...prev,
        [dateKey]: {
          ...record,
          quests: updatedQuests,
          totalExpGained,
          totalExpLost,
          netExp: totalExpGained + totalExpLost
        }
      };
    });
  };

  const processEndOfDay = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    
    setDailyRecords(prev => {
      const record = prev[dateKey];
      if (!record) return prev;

      const updatedQuests = record.quests.map(questStatus => {
        if (!questStatus.completed && questStatus.quest.type === 'lifestyle') {
          const expLost = getExpPenalty(questStatus.quest.difficulty);
          return {
            ...questStatus,
            expLost
          };
        }
        return questStatus;
      });

      const totalExpGained = updatedQuests.reduce((sum, q) => sum + q.expGained, 0);
      const totalExpLost = updatedQuests.reduce((sum, q) => sum + q.expLost, 0);

      return {
        ...prev,
        [dateKey]: {
          ...record,
          quests: updatedQuests,
          totalExpGained,
          totalExpLost,
          netExp: totalExpGained + totalExpLost
        }
      };
    });
  };

  const getDailyRecord = (date: Date): DailyRecord | null => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return dailyRecords[dateKey] || null;
  };

  const getLifestyleQuestsPenalty = (): Quest[] => {
    return defaultLifestyleQuests;
  };

  // Auto-process end of day for past dates
  useEffect(() => {
    const now = new Date();
    Object.keys(dailyRecords).forEach(dateKey => {
      const date = new Date(dateKey);
      const hoursAgo = differenceInHours(now, date);
      
      // If it's more than 24 hours ago and hasn't been processed
      if (hoursAgo >= 24 && !isToday(date)) {
        const record = dailyRecords[dateKey];
        const hasUnprocessedIncomplete = record.quests.some(
          q => !q.completed && q.quest.type === 'lifestyle' && q.expLost === 0
        );
        
        if (hasUnprocessedIncomplete) {
          processEndOfDay(date);
        }
      }
    });
  }, [dailyRecords]);

  return (
    <QuestTrackingContext.Provider value={{
      dailyRecords,
      assignLifestyleQuests,
      completeQuest,
      getDailyRecord,
      processEndOfDay,
      getLifestyleQuestsPenalty
    }}>
      {children}
    </QuestTrackingContext.Provider>
  );
};