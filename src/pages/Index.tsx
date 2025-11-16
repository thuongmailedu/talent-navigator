import { Users, TrendingUp, Target, AlertTriangle, Award, Heart } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { AlertItem, AlertLevel } from "@/components/dashboard/AlertItem";
import { NineBoxGrid } from "@/components/dashboard/NineBoxGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line } from "recharts";

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
    title: "Hoàn thành kế hoạch kế nhiệm",
    value: "73%",
    subtitle: "vị trí trọng yếu",
    trend: { value: 8, isPositive: true },
    icon: Award,
    variant: "default" as const,
  },
  {
    title: "Tỷ lệ nghỉ việc nhân tài",
    value: "4.2%",
    subtitle: "6 tháng qua",
    trend: { value: 2, isPositive: false },
    icon: AlertTriangle,
    variant: "warning" as const,
  },
  {
    title: "Kỹ năng thiếu hụt",
    value: "12",
    subtitle: "cần đào tạo",
    trend: { value: 3, isPositive: false },
    icon: TrendingUp,
    variant: "warning" as const,
  },
  {
    title: "Mức độ gắn kết",
    value: "8.1/10",
    subtitle: "eNPS score",
    trend: { value: 0.5, isPositive: true },
    icon: Heart,
    variant: "success" as const,
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

const talentPoolData = [
  { dept: "IT", count: 15 },
  { dept: "Sale", count: 12 },
  { dept: "Marketing", count: 8 },
  { dept: "HR", count: 5 },
  { dept: "Finance", count: 7 },
];

const nineBoxEmployees = [
  { id: "1", name: "Nguyễn Văn A", performance: 3, potential: 3 },
  { id: "2", name: "Trần Thị B", performance: 3, potential: 3 },
  { id: "3", name: "Lê Văn C", performance: 2, potential: 3 },
  { id: "4", name: "Phạm Thị D", performance: 3, potential: 2 },
  { id: "5", name: "Hoàng Văn E", performance: 2, potential: 2 },
  { id: "6", name: "Đỗ Thị F", performance: 1, potential: 3 },
  { id: "7", name: "Vũ Văn G", performance: 1, potential: 2 },
  { id: "8", name: "Bùi Thị H", performance: 1, potential: 1 },
  { id: "9", name: "Mai Văn I", performance: 2, potential: 1 },
  { id: "10", name: "Cao Thị K", performance: 3, potential: 1 },
];

const alerts = [
  {
    name: "Nguyễn Văn An",
    position: "Senior Developer",
    department: "IT",
    level: "high" as AlertLevel,
    reasons: ["eNPS thấp (3/10)", "KPI giảm 2 kỳ liên tiếp", "Không tham gia đào tạo 6 tháng"],
  },
  {
    name: "Trần Thị Bình",
    position: "Marketing Manager",
    department: "Marketing",
    level: "high" as AlertLevel,
    reasons: ["Hiệu suất giảm 15%", "Đã được headhunt", "Lương thấp hơn thị trường 20%"],
  },
  {
    name: "Lê Văn Cường",
    position: "Sales Leader",
    department: "Sales",
    level: "medium" as AlertLevel,
    reasons: ["Không đạt KPI 1 quý", "Yêu cầu chuyển phòng ban"],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Quản trị Tài năng</h1>
          <p className="text-muted-foreground">
            Tổng quan về tình trạng nhân sự và các chỉ số quan trọng
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {kpiData.map((kpi, index) => (
            <KPICard key={index} {...kpi} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Skill Gap Radar */}
          <Card>
            <CardHeader>
              <CardTitle>Phân tích khoảng trống kỹ năng</CardTitle>
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
              <CardTitle>Xu hướng hiệu suất</CardTitle>
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

          {/* Talent Pool by Department */}
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ Talent Pool theo phòng ban</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={talentPoolData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dept" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Alerts Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Cảnh báo rủi ro (3)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert, index) => (
                <AlertItem key={index} {...alert} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Nine Box Grid */}
        <NineBoxGrid employees={nineBoxEmployees} />
      </div>
    </div>
  );
};

export default Index;
