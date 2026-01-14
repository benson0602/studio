import { Dumbbell, Repeat, Weight } from "lucide-react";
import type { Exercise } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressiveOverloadDialog } from "./progressive-overload-dialog";
import { FailedSetDialog } from "./failed-set-dialog";

type LogExerciseItemProps = {
  exercise: Exercise;
};

export function LogExerciseItem({ exercise }: LogExerciseItemProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Dumbbell className="text-primary"/>
            {exercise.name}
        </CardTitle>
        <div className="flex items-center gap-2">
            <ProgressiveOverloadDialog exercise={exercise} />
            <FailedSetDialog exercise={exercise} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                <span>{exercise.sets} sets</span>
            </div>
            <div className="flex items-center gap-2">
                <Repeat className="h-4 w-4" />
                <span>{exercise.reps} reps</span>
            </div>
            {exercise.weight && (
                <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4" />
                    <span>{exercise.weight} kg</span>
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
