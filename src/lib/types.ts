import type { LucideIcon } from "lucide-react";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  isEarned: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
};
