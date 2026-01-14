import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PRTracker } from "@/components/dashboard/pr-tracker";
import { StrengthTrendChart } from "@/components/dashboard/strength-trend-chart";
import { VolumeChart } from "@/components/dashboard/volume-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Ready to crush your goals? Start by generating a new plan or logging today&apos;s workout.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link href="/plan">
                  Generate New Plan <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/log">Log a Workout</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly Summary</CardTitle>
            <CardDescription>A quick look at your week.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Workouts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">12,100</p>
              <p className="text-sm text-muted-foreground">Volume (kg)</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <StrengthTrendChart />
        <VolumeChart />
      </div>

      <PRTracker />
    </div>
  );
}
