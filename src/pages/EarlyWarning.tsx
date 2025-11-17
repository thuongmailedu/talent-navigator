import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { AlertTriangle, TrendingDown, UserX, Users, MessageSquare, Calendar, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskAlert {
  id: string;
  name: string;
  position: string;
  department: string;
  riskType: "attrition" | "performance" | "succession";
  riskLevel: "high" | "medium" | "low";
  reasons: string[];
  actions: string[];
}

const riskAlerts: RiskAlert[] = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    position: "Senior Developer",
    department: "IT",
    riskType: "attrition",
    riskLevel: "high",
    reasons: [
      "eNPS thấp (3/10)",
      "KPI giảm 2 kỳ liên tiếp",
      "Không tham gia đào tạo 6 tháng",
      "Nhận offer từ đối thủ",
    ],
    actions: ["Gặp 1:1 ngay", "Đề xuất tăng lương", "Review career path"],
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    position: "Marketing Manager",
    department: "Marketing",
    riskType: "attrition",
    riskLevel: "high",
    reasons: [
      "Hiệu suất giảm 15%",
      "Lương thấp hơn thị trường 20%",
      "Yêu cầu chuyển công việc nhiều lần",
    ],
    actions: ["Coaching session", "Salary review", "Gửi khảo sát"],
  },
  {
    id: "3",
    name: "Lê Văn Cường",
    position: "Sales Leader",
    department: "Sales",
    riskType: "performance",
    riskLevel: "medium",
    reasons: [
      "Không đạt KPI 1 quý",
      "Feedback tiêu cực từ team",
      "Tỷ lệ hoàn thành giảm 25%",
    ],
    actions: ["PIP (Performance Improvement Plan)", "Mentoring", "Đào tạo kỹ năng"],
  },
  {
    id: "4",
    name: "Phạm Thị Dung",
    position: "Tech Lead",
    department: "IT",
    riskType: "performance",
    riskLevel: "high",
    reasons: [
      "KPI giảm 3 kỳ liên tiếp",
      "Không hoàn thành objectives",
      "Team performance xuống thấp",
    ],
    actions: ["Đánh giá lại vị trí", "1-on-1 coaching", "Action plan 30 ngày"],
  },
  {
    id: "5",
    name: "Hoàng Văn E",
    position: "Product Manager",
    department: "Product",
    riskType: "succession",
    riskLevel: "medium",
    reasons: [
      "Là ứng viên kế nhiệm cho CPO",
      "Chưa hoàn thành 60% IDP",
      "Thiếu kỹ năng leadership",
    ],
    actions: ["Accelerate training", "Assign mentor", "Stretch assignments"],
  },
];

const EarlyWarning = () => {
  const getRiskConfig = (level: string) => {
    const configs = {
      high: {
        color: "bg-destructive/10 text-destructive border-destructive/20",
        label: "Cao",
        icon: AlertTriangle,
      },
      medium: {
        color: "bg-warning/10 text-warning border-warning/20",
        label: "Trung bình",
        icon: TrendingDown,
      },
      low: {
        color: "bg-muted text-muted-foreground border-border",
        label: "Thấp",
        icon: MessageSquare,
      },
    };
    return configs[level as keyof typeof configs];
  };

  const getRiskTypeConfig = (type: string) => {
    const configs = {
      attrition: { label: "Rủi ro nghỉ việc", icon: UserX, color: "text-destructive" },
      performance: { label: "Hiệu suất thấp", icon: TrendingDown, color: "text-warning" },
      succession: { label: "Kế nhiệm", icon: Users, color: "text-primary" },
    };
    return configs[type as keyof typeof configs];
  };

  const filterByType = (type: string) => {
    return riskAlerts.filter((alert) => alert.riskType === type);
  };

  const AlertCard = ({ alert }: { alert: RiskAlert }) => {
    const riskConfig = getRiskConfig(alert.riskLevel);
    const typeConfig = getRiskTypeConfig(alert.riskType);
    const Icon = riskConfig.icon;
    const TypeIcon = typeConfig.icon;
    const initials = alert.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return (
      <Card className="transition-all hover:shadow-md border-l-4" 
            style={{ borderLeftColor: alert.riskLevel === "high" ? "hsl(var(--destructive))" : alert.riskLevel === "medium" ? "hsl(var(--warning))" : "hsl(var(--muted-foreground))" }}>
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{alert.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {alert.position} • {alert.department}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className={cn(typeConfig.color, "border-current/20")}>
                      <TypeIcon className="mr-1 h-3 w-3" />
                      {typeConfig.label}
                    </Badge>
                    <Badge variant="outline" className={riskConfig.color}>
                      <Icon className="mr-1 h-3 w-3" />
                      Rủi ro {riskConfig.label}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Lý do cảnh báo:</p>
                <div className="space-y-1">
                  {alert.reasons.map((reason, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-destructive mt-0.5">•</span>
                      <span className="text-muted-foreground">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Hành động đề xuất:</p>
                <div className="flex flex-wrap gap-2">
                  {alert.actions.map((action, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {action}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="default">
                  <Calendar className="mr-2 h-4 w-4" />
                  Đặt lịch 1:1
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Gửi khảo sát
                </Button>
                <Button size="sm" variant="outline">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Đào tạo
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const highRiskCount = riskAlerts.filter((a) => a.riskLevel === "high").length;
  const mediumRiskCount = riskAlerts.filter((a) => a.riskLevel === "medium").length;

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-warning" />
              Hệ thống Cảnh báo Sớm Rủi ro
            </h1>
            <p className="text-muted-foreground">
              Phát hiện và quản lý rủi ro về nhân tài, hiệu suất và kế nhiệm
            </p>
          </div>
          <FilterPanel />
        </div>

        {/* Summary Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rủi ro Cao</p>
                  <p className="text-3xl font-bold">{highRiskCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-warning/10">
                  <TrendingDown className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rủi ro Trung bình</p>
                  <p className="text-3xl font-bold">{mediumRiskCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng cảnh báo</p>
                  <p className="text-3xl font-bold">{riskAlerts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts by Type */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              Tất cả ({riskAlerts.length})
            </TabsTrigger>
            <TabsTrigger value="attrition">
              Rủi ro nghỉ việc ({filterByType("attrition").length})
            </TabsTrigger>
            <TabsTrigger value="performance">
              Hiệu suất thấp ({filterByType("performance").length})
            </TabsTrigger>
            <TabsTrigger value="succession">
              Kế nhiệm ({filterByType("succession").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {riskAlerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="attrition" className="space-y-4 mt-6">
            {filterByType("attrition").map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4 mt-6">
            {filterByType("performance").map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>

          <TabsContent value="succession" className="space-y-4 mt-6">
            {filterByType("succession").map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EarlyWarning;
