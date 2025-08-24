import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GripVertical, ChevronRight, X } from 'lucide-react';

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

interface DraggableQuestItemProps {
  quest: Quest;
  index: number;
  onRemove: (questId: string) => void;
}

export const DraggableQuestItem: React.FC<DraggableQuestItemProps> = ({ 
  quest, 
  index, 
  onRemove 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: quest.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg bg-muted/50 border transition-all hover:bg-muted/70 ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
      >
        <GripVertical className="h-4 w-4" />
      </div>
      
      <span className="text-sm font-medium text-muted-foreground min-w-[1.5rem] text-center">
        {index + 1}
      </span>
      
      <ChevronRight className="h-3 w-3 text-muted-foreground" />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{quest.title}</p>
        <p className="text-xs text-muted-foreground">{quest.timeEstimate}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          +{quest.exp} EXP
        </Badge>
        
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
          onClick={() => onRemove(quest.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};