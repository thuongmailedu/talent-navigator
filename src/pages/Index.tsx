import { Users, TrendingUp, Target, AlertTriangle, Award, Heart, UserCheck } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

// Mock data
const kpiData = [
  {
    title: "Nhân tài trong Talent Pool",
    value: "47",
    subtitle: "từ 350 nhân viên",
    trend: { value: 12, isPositive: true },
    icon: Users,
    variant: "default" as const,
  },
  {
    title: "Đạt KPI",
    value: "82%",
    subtitle: "quý hiện tại",
    trend: { value: 5, isPositive: true },
    icon: Target,
    variant: "success" as const,
  },
  {
    title: "Tình trạng kế nhiệm",
    value: "15/18",
    subtitle: "vị trí có kế nhiệm",
    trend: { value: 8, isPositive: true },
    icon: UserCheck,
    variant: "default" as const,
  },
  {
    title: "Điểm gắn kết",
    value: "8.1/10",
    subtitle: "eNPS score",
    trend: { value: 0.5, isPositive: true },
    icon: Heart,
    variant: "success" as const,
  },
  {
    title: "Tỷ lệ nghỉ việc High Potential",
    value: "4.2%",
    subtitle: "6 tháng qua",
    trend: { value: 2, isPositive: false },
    icon: AlertTriangle,
    variant: "warning" as const,
  },
];

const skillGapData = [
  { skill: "AI/ML", current: 65, required: 90 },
  { skill: "Data Analytics", current: 75, required: 85 },
  { skill: "Cloud", current: 70, required: 95 },
  { skill: "Leadership", current: 80, required: 90 },
  { skill: "Agile", current: 85, required: 90 },
];

const performanceTrendData = [
  { month: "T1", score: 75 },
  { month: "T2", score: 78 },
  { month: "T3", score: 76 },
  { month: "T4", score: 82 },
  { month: "T5", score: 85 },
  { month: "T6", score: 84 },
];

const topTalents = [
  { name: "Nguyễn Văn A", position: "Senior Developer", department: "IT", score: 9.2 },
  { name: "Trần Thị B", position: "Marketing Manager", department: "Marketing", score: 8.9 },
  { name: "Lê Văn C", position: "Product Manager", department: "Product", score: 8.7 },
  { name: "Phạm Thị D", position: "Sales Leader", department: "Sales", score: 8.5 },
  { name: "Hoàng Văn E", position: "Tech Lead", department: "IT", score: 8.3 },
];

const criticalPositions = [
  { position: "Giám đốc Kỹ thuật", department: "IT", successors: 0, status: "critical" },
  { position: "Giám đốc Marketing", department: "Marketing", successors: 1, status: "warning" },
  { position: "Trưởng phòng Sản phẩm", department: "Product", successors: 0, status: "critical" },
  { position: "CFO", department: "Finance", successors: 2, status: "ready" },
  { position: "Giám đốc Nhân sự", department: "HR", successors: 1, status: "warning" },
];

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard Quản trị Tài năng</h1>
            <p className="text-muted-foreground">
              Tổng quan về tình trạng nhân sự và các chỉ số quan trọng
            </p>
          </div>
          <FilterPanel />
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skill Gap Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Khoảng trống kỹ năng</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillGapData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Năng lực hiện tại" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.5} />
                  <Radar name="Năng lực yêu cầu" dataKey="required" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng hiệu suất tổng thể</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Lists Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top 5 High Potential */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Top 5 Nhân viên Tiềm năng (HiPo)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTalents.map((talent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold">{talent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {talent.position} • {talent.department}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      {talent.score}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Critical Positions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Top 5 Vị trí Thiếu Kế nhiệm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalPositions.map((pos, index) => {
                  const statusConfig = {
                    critical: { color: "bg-destructive/10 text-destructive border-destructive/20", label: "Chưa có" },
                    warning: { color: "bg-warning/10 text-warning border-warning/20", label: "Thiếu" },
                    ready: { color: "bg-success/10 text-success border-success/20", label: "Đủ" },
                  };
                  const config = statusConfig[pos.status as keyof typeof statusConfig];
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div>
                        <p className="font-semibold">{pos.position}</p>
                        <p className="text-sm text-muted-foreground">{pos.department}</p>
                      </div>
                      <Badge variant="outline" className={config.color}>
                        {pos.successors} kế nhiệm • {config.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
