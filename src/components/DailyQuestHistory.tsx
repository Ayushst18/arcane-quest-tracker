import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { useQuestTracking } from "@/contexts/QuestTrackingContext";
import { format } from 'date-fns';

interface DailyQuestHistoryProps {
  selectedDate: Date;
}

export const DailyQuestHistory: React.FC<DailyQuestHistoryProps> = ({ selectedDate }) => {
  const { getDailyRecord } = useQuestTracking();
  const record = getDailyRecord(selectedDate);

  if (!record) {
    return (
      <Card className="quest-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            {format(selectedDate, 'MMM dd, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No quests tracked for this date
          </p>
        </CardContent>
      </Card>
    );
  }

  const completedQuests = record.quests.filter(q => q.completed);
  const incompleteQuests = record.quests.filter(q => !q.completed);
  const lifestyleIncomplete = incompleteQuests.filter(q => q.quest.type === 'lifestyle');

  return (
    <Card className="quest-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            {format(selectedDate, 'MMM dd, yyyy')}
          </div>
          <div className="flex items-center gap-2">
            {record.netExp >= 0 ? (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{record.netExp} EXP
              </Badge>
            ) : (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                <TrendingDown className="h-3 w-3 mr-1" />
                {record.netExp} EXP
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* EXP Summary */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/50">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">+{record.totalExpGained}</div>
            <div className="text-xs text-muted-foreground">Gained</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">
              {record.totalExpLost < 0 ? record.totalExpLost : record.totalExpLost > 0 ? `-${record.totalExpLost}` : '0'}
            </div>
            <div className="text-xs text-muted-foreground">Lost</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${record.netExp >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {record.netExp >= 0 ? '+' : ''}{record.netExp}
            </div>
            <div className="text-xs text-muted-foreground">Net</div>
          </div>
        </div>

        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-green-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Completed Quests ({completedQuests.length})
            </h4>
            <div className="space-y-2">
              {completedQuests.map((questStatus, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <div>
                      <span className="text-sm font-medium">{questStatus.quest.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {questStatus.quest.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {questStatus.quest.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    +{questStatus.expGained} EXP
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Incomplete Lifestyle Quests (with EXP loss) */}
        {lifestyleIncomplete.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-red-400 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Incomplete Lifestyle Quests ({lifestyleIncomplete.length})
            </h4>
            <div className="space-y-2">
              {lifestyleIncomplete.map((questStatus, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-3">
                    <XCircle className="h-4 w-4 text-red-400" />
                    <div>
                      <span className="text-sm font-medium">{questStatus.quest.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {questStatus.quest.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {questStatus.quest.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {questStatus.expLost < 0 && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      {questStatus.expLost} EXP
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Incomplete Quests (no penalty) */}
        {incompleteQuests.filter(q => q.quest.type !== 'lifestyle').length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Other Incomplete Quests
            </h4>
            <div className="space-y-2">
              {incompleteQuests.filter(q => q.quest.type !== 'lifestyle').map((questStatus, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-sm font-medium">{questStatus.quest.title}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {questStatus.quest.difficulty}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {questStatus.quest.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    No Penalty
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
