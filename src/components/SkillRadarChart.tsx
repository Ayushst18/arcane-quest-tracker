import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface SkillData {
  skill: string;
  level: number;
  maxLevel: number;
}

interface SkillRadarChartProps {
  data: SkillData[];
}

export const SkillRadarChart = ({ data }: SkillRadarChartProps) => {
  const chartData = data.map(item => ({
    subject: item.skill,
    A: item.level,
    fullMark: item.maxLevel
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid 
          gridType="polygon"
          stroke="hsl(var(--border))"
        />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ 
            fontSize: 12, 
            fill: 'hsl(var(--foreground))',
            fontWeight: 500
          }}
          className="text-xs"
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ 
            fontSize: 10, 
            fill: 'hsl(var(--muted-foreground))'
          }}
          axisLine={false}
        />
        <Radar
          name="Current Level"
          dataKey="A"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          strokeWidth={2}
          dot={{ 
            r: 4, 
            fill: 'hsl(var(--primary))',
            strokeWidth: 2,
            stroke: 'hsl(var(--background))'
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};