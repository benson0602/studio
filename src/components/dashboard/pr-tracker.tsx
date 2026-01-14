import { Trophy } from "lucide-react";
import { personalRecordsData } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function PRTracker() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Records</CardTitle>
        <CardDescription>Your best lifts so far. Keep it up!</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {personalRecordsData.map((pr, index) => (
            <li key={pr.exercise}>
              <div className="flex items-center gap-4">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <div className="flex-1">
                  <p className="font-semibold">{pr.exercise}</p>
                </div>
                <p className="text-lg font-bold text-primary">{pr.value}</p>
              </div>
              {index < personalRecordsData.length - 1 && <Separator className="mt-4"/>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
