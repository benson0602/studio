import { achievementsData } from "@/lib/data";
import { BadgeCard } from "@/components/achievements/badge-card";

export default function AchievementsPage() {
  const earnedCount = achievementsData.filter(a => a.isEarned).length;
  const totalCount = achievementsData.length;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">
          You&apos;ve earned {earnedCount} of {totalCount} badges. Keep up the great work!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {achievementsData.map((achievement) => (
          <BadgeCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
