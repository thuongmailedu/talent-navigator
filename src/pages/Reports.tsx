import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Brain, Target, Users, Download, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

// Mock data
const skillGapData = [
  { skill: "AI/ML", current: 65, required: 90, gap: 25, suggestion: "Đào tạo nâng cao" },
  { skill: "Data Analytics", current: 75, required: 85, gap: 10, suggestion: "Workshop thực hành" },
  { skill: "Cloud Architecture", current: 70, required: 95, gap: 25, suggestion: "Tuyển thêm chuyên gia" },
  { skill: "Leadership", current: 80, required: 90, gap: 10, suggestion: "Coaching 1-on-1" },
  { skill: "Agile Management", current: 85, required: 90, gap: 5, suggestion: "Đào tạo nội bộ" },
  { skill: "Product Strategy", current: 60, required: 85, gap: 25, suggestion: "Đào tạo + Tuyển dụng" },
];

const performanceData = [
  { name: "Nguyễn Văn A", department: "IT", position: "Senior Dev", kpi: 95, category: "Xuất sắc" },
  { name: "Trần Thị B", department: "Marketing", position: "Manager", kpi: 92, category: "Xuất sắc" },
  { name: "Lê Văn C", department: "Sales", position: "Leader", kpi: 88, category: "Đạt" },
  { name: "Phạm Thị D", department: "Product", position: "PM", kpi: 85, category: "Đạt" },
  { name: "Hoàng Văn E", department: "IT", position: "Tech Lead", kpi: 82, category: "Đạt" },
  { name: "Đỗ Thị F", department: "HR", position: "Specialist", kpi: 78, category: "Đạt" },
  { name: "Vũ Văn G", department: "Finance", position: "Analyst", kpi: 72, category: "Đạt" },
  { name: "Bùi Thị H", department: "Marketing", position: "Executive", kpi: 68, category: "Chưa đạt" },
  { name: "Mai Văn I", department: "Sales", position: "Executive", kpi: 65, category: "Chưa đạt" },
];

const performanceDistribution = [
  { category: "Xuất sắc (≥90)", count: 15, percentage: 18 },
  { category: "Đạt (70-89)", count: 58, percentage: 70 },
  { category: "Chưa đạt (<70)", count: 10, percentage: 12 },
];

const successionData = [
  {
    position: "Giám đốc Kỹ thuật",
    department: "IT",
    successors: [
      { name: "Nguyễn Văn A", readiness: "ready-now", status: "Sẵn sàng ngay" },
    ],
  },
  {
    position: "Giám đốc Marketing",
    department: "Marketing",
    successors: [
      { name: "Trần Thị B", readiness: "ready-soon", status: "Sẵn sàng 6-12 tháng" },
    ],
  },
  {
    position: "Trưởng phòng Sản phẩm",
    department: "Product",
    successors: [],
  },
  {
    position: "CFO",
    department: "Finance",
    successors: [
      { name: "Phạm Văn X", readiness: "ready-now", status: "Sẵn sàng ngay" },
      { name: "Lê Thị Y", readiness: "ready-soon", status: "Sẵn sàng 6-12 tháng" },
    ],
  },
  {
    position: "Giám đốc Nhân sự",
    department: "HR",
    successors: [
      { name: "Đỗ Thị F", readiness: "not-ready", status: "Cần phát triển thêm" },
    ],
  },
];

const Reports = () => {
  const getCategoryColor = (category: string) => {
    if (category === "Xuất sắc") return "bg-success/10 text-success border-success/20";
    if (category === "Đạt") return "bg-primary/10 text-primary border-primary/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  const getReadinessConfig = (readiness: string) => {
    const configs = {
      "ready-now": { color: "bg-success/10 text-success border-success/20", label: "Sẵn sàng ngay" },
      "ready-soon": { color: "bg-warning/10 text-warning border-warning/20", label: "Sẵn sàng 6-12 tháng" },
      "not-ready": { color: "bg-destructive/10 text-destructive border-destructive/20", label: "Cần phát triển" },
    };
    return configs[readiness as keyof typeof configs];
  };

  const getBarColor = (index: number) => {
    const colors = ["hsl(var(--success))", "hsl(var(--primary))", "hsl(var(--destructive))"];
    return colors[index];
  };

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Báo cáo & Phân tích</h1>
            <p className="text-muted-foreground">
              Phân tích chi tiết về năng lực, hiệu suất và kế nhiệm
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Bộ lọc
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Xuất báo cáo
            </Button>
          </div>
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              Khoảng trống Năng lực
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Hiệu suất Nhân viên
            </TabsTrigger>
            <TabsTrigger value="succession" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Tình trạng Kế nhiệm
            </TabsTrigger>
          </TabsList>

          {/* Skills Gap Report */}
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Phân tích Khoảng trống Kỹ năng</CardTitle>
                <CardDescription>
                  So sánh năng lực hiện tại với yêu cầu và đề xuất hành động
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillGapData.map((skill, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{skill.skill}</h4>
                        <p className="text-sm text-muted-foreground">
                          Khoảng cách: <span className="text-warning font-medium">{skill.gap}%</span>
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {skill.suggestion}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hiện tại: {skill.current}%</span>
                        <span className="text-muted-foreground">Yêu cầu: {skill.required}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={skill.required} className="h-3 bg-muted" />
                        <Progress 
                          value={skill.current} 
                          className="h-3 absolute top-0 left-0 bg-transparent [&>div]:bg-primary" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Report */}
          <TabsContent value="performance" className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-3">
              {performanceDistribution.map((dist, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">{dist.category}</p>
                      <p className="text-3xl font-bold">{dist.count}</p>
                      <p className="text-sm text-muted-foreground">{dist.percentage}% tổng số</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Phân bổ Hiệu suất</CardTitle>
                <CardDescription>Số lượng nhân viên theo từng mức hiệu suất</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={performanceDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Danh sách Chi tiết Hiệu suất</CardTitle>
                <CardDescription>Điểm KPI và xếp loại của từng nhân viên</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {performanceData.map((emp, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-semibold">{emp.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {emp.position} • {emp.department}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold">{emp.kpi}</p>
                          <p className="text-xs text-muted-foreground">KPI Score</p>
                        </div>
                        <Badge variant="outline" className={getCategoryColor(emp.category)}>
                          {emp.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Succession Report */}
          <TabsContent value="succession" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Báo cáo Tình trạng Kế nhiệm</CardTitle>
                <CardDescription>
                  Danh sách vị trí trọng yếu và mức độ sẵn sàng của ứng viên kế nhiệm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {successionData.map((item, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-card space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-lg">{item.position}</h4>
                        <p className="text-sm text-muted-foreground">{item.department}</p>
                      </div>
                      {item.successors.length === 0 && (
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          Chưa có kế nhiệm
                        </Badge>
                      )}
                    </div>

                    {item.successors.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Ứng viên kế nhiệm ({item.successors.length})
                        </p>
                        {item.successors.map((successor, idx) => {
                          const config = getReadinessConfig(successor.readiness);
                          return (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <p className="font-medium">{successor.name}</p>
                              <Badge variant="outline" className={config.color}>
                                {successor.status}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                        <p className="text-sm text-destructive">
                          ⚠️ Vị trí này cần xác định ứng viên kế nhiệm ngay
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;
