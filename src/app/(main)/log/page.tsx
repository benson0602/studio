import { mockWorkout } from "@/lib/data";
import { LogExerciseItem } from "@/components/log/log-exercise-item";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LogPage() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Log Today&apos;s Workout</h1>
        <p className="text-muted-foreground">Record your performance and get feedback from the AI coach.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Session: Push Day</CardTitle>
          <CardDescription>Complete each exercise and log your results.</CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {mockWorkout.map((exercise) => (
          <LogExerciseItem key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}
