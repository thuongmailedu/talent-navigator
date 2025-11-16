import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  performance: number; // 1-3
  potential: number; // 1-3
}

interface NineBoxGridProps {
  employees: Employee[];
}

export function NineBoxGrid({ employees }: NineBoxGridProps) {
  const getGridPosition = (performance: number, potential: number) => {
    return { x: performance - 1, y: 3 - potential };
  };

  const getCellLabel = (x: number, y: number) => {
    const labels = [
      ["Tài năng tiềm năng", "Tài năng cốt lõi", "Tài năng xuất sắc"],
      ["Tiềm năng đầu tư", "Đóng góp ổn định", "Hiệu suất cao"],
      ["Cần cải thiện", "Đóng góp thấp", "Sai vị trí"],
    ];
    return labels[y]?.[x] || "";
  };

  const getCellColor = (x: number, y: number) => {
    if (y === 0) {
      if (x === 2) return "bg-success/20 border-success/40";
      if (x === 1) return "bg-success/10 border-success/30";
      return "bg-primary/10 border-primary/30";
    }
    if (y === 1) {
      if (x === 2) return "bg-primary/10 border-primary/30";
      return "bg-muted border-border";
    }
    if (x === 0) return "bg-destructive/10 border-destructive/30";
    return "bg-warning/10 border-warning/30";
  };

  const getEmployeesInCell = (x: number, y: number) => {
    return employees.filter((emp) => {
      const pos = getGridPosition(emp.performance, emp.potential);
      return pos.x === x && pos.y === y;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ma trận 9 ô - Hiệu suất & Tiềm năng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {/* Y-axis label */}
          <div className="flex items-center gap-4">
            <div className="w-20 text-right text-sm font-medium text-muted-foreground">
              Tiềm năng
            </div>
            <div className="flex-1" />
          </div>

          {/* Grid */}
          <div className="flex gap-4">
            <div className="flex w-20 flex-col justify-around py-2">
              <div className="text-center text-xs text-muted-foreground">Cao</div>
              <div className="text-center text-xs text-muted-foreground">TB</div>
              <div className="text-center text-xs text-muted-foreground">Thấp</div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => {
                  const cellEmployees = getEmployeesInCell(col, row);
                  return (
                    <div
                      key={`${row}-${col}`}
                      className={cn(
                        "border rounded-lg p-3 min-h-[120px] transition-all hover:shadow-sm",
                        getCellColor(col, row)
                      )}
                    >
                      <div className="text-xs font-medium mb-2">{getCellLabel(col, row)}</div>
                      <div className="flex flex-wrap gap-1">
                        {cellEmployees.slice(0, 5).map((emp) => (
                          <div
                            key={emp.id}
                            className="text-xs bg-background/80 px-2 py-1 rounded"
                            title={emp.name}
                          >
                            {emp.name.split(" ").slice(-1)[0]}
                          </div>
                        ))}
                        {cellEmployees.length > 5 && (
                          <div className="text-xs bg-background/80 px-2 py-1 rounded">
                            +{cellEmployees.length - 5}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* X-axis label */}
          <div className="flex items-center gap-4 pt-2">
            <div className="w-20" />
            <div className="flex-1 grid grid-cols-3 gap-2">
              <div className="text-center text-xs text-muted-foreground">Thấp</div>
              <div className="text-center text-xs text-muted-foreground">Trung bình</div>
              <div className="text-center text-xs text-muted-foreground">Cao</div>
            </div>
          </div>
          <div className="flex items-center justify-center pt-1">
            <div className="text-sm font-medium text-muted-foreground">Hiệu suất</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
