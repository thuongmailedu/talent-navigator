import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, TrendingDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export type AlertLevel = "high" | "medium" | "low";

interface AlertItemProps {
  name: string;
  position: string;
  department: string;
  level: AlertLevel;
  reasons: string[];
  avatar?: string;
}

export function AlertItem({ name, position, department, level, reasons }: AlertItemProps) {
  const levelConfig = {
    high: {
      color: "bg-destructive/10 text-destructive border-destructive/20",
      label: "Cao",
      icon: AlertCircle,
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

  const config = levelConfig[level];
  const Icon = config.icon;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Card className="transition-all hover:shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{name}</h4>
                <p className="text-sm text-muted-foreground">
                  {position} • {department}
                </p>
              </div>
              <Badge variant="outline" className={cn("shrink-0", config.color)}>
                <Icon className="mr-1 h-3 w-3" />
                {config.label}
              </Badge>
            </div>

            <div className="mt-3 space-y-1">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{reason}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline">
                Gặp 1:1
              </Button>
              <Button size="sm" variant="outline">
                Gửi khảo sát
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
