import { Dumbbell } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <Dumbbell className="h-7 w-7 text-primary" />
      <h1 className="text-xl font-bold tracking-tight text-sidebar-foreground">
        Gym Progress
      </h1>
    </div>
  );
}
