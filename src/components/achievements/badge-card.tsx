import { cn } from "@/lib/utils";
import type { Achievement } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

type BadgeCardProps = {
  achievement: Achievement;
};

export function BadgeCard({ achievement }: BadgeCardProps) {
  const Icon = achievement.icon;
  return (
    <Card
      className={cn(
        "transition-all",
        achievement.isEarned
          ? "border-primary/50 bg-primary/5"
          : "bg-muted/50"
      )}
    >
      <CardHeader className="relative">
        <div
          className={cn(
            "flex items-center justify-center h-16 w-16 rounded-lg mb-4",
            achievement.isEarned
              ? "bg-primary text-primary-foreground"
              : "bg-muted-foreground/20 text-muted-foreground"
          )}
        >
          <Icon className="h-8 w-8" />
        </div>
        <CardTitle>{achievement.title}</CardTitle>
        <CardDescription>{achievement.description}</CardDescription>
        {achievement.isEarned && (
            <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                <span>Earned</span>
            </div>
        )}
      </CardHeader>
    </Card>
  );
}
