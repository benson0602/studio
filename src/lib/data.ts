import type { Achievement, Exercise } from "@/lib/types";
import { Award, Medal, Star, Trophy, Zap } from "lucide-react";

export const achievementsData: Achievement[] = [
  {
    id: "1",
    title: "First Workout",
    description: "Completed your first workout session.",
    icon: Star,
    isEarned: true,
  },
  {
    id: "2",
    title: "Consistent Lifter",
    description: "Completed 10 workout sessions.",
    icon: Medal,
    isEarned: true,
  },
  {
    id: "3",
    title: "New PR!",
    description: "Achieved a new Personal Record in any exercise.",
    icon: Trophy,
    isEarned: true,
  },
  {
    id: "4",
    title: "Volume Master",
    description: "Lifted a total of 10,000 kg.",
    icon: Award,
    isEarned: false,
  },
  {
    id: "5",
    title: "Workout Streak",
    description: "Train for 7 consecutive days.",
    icon: Zap,
    isEarned: false,
  },
  {
    id: "6",
    title: "Century Club",
    description: "Completed 100 workout sessions.",
    icon: Trophy,
    isEarned: false,
  },
];

export const strengthTrendData = [
  { date: "Jan", "Bench Press": 60, "Squat": 80, "Deadlift": 100 },
  { date: "Feb", "Bench Press": 62, "Squat": 85, "Deadlift": 105 },
  { date: "Mar", "Bench Press": 65, "Squat": 90, "Deadlift": 110 },
  { date: "Apr", "Bench Press": 68, "Squat": 95, "Deadlift": 115 },
  { date: "May", "Bench Press": 70, "Squat": 100, "Deadlift": 120 },
  { date: "Jun", "Bench Press": 72, "Squat": 102, "Deadlift": 125 },
];

export const volumeTrendData = [
  { week: "W1", volume: 3500 },
  { week: "W2", volume: 3800 },
  { week: "W3", volume: 3700 },
  { week: "W4", volume: 4100 },
  { week: "W5", volume: 4300 },
  { week: "W6", volume: 4000 },
];

export const personalRecordsData = [
    { exercise: "Bench Press", value: "72kg x 8" },
    { exercise: "Squat", value: "102kg x 5" },
    { exercise: "Deadlift", value: "125kg x 5" },
    { exercise: "Overhead Press", value: "40kg x 10" },
];

export const mockWorkout: Exercise[] = [
  { id: "ex1", name: "Bench Press", sets: 3, reps: 8, weight: 70 },
  { id: "ex2", name: "Squat", sets: 3, reps: 5, weight: 100 },
  { id: "ex3", name: "Bent Over Row", sets: 4, reps: 10, weight: 50 },
  { id: "ex4", name: "Lateral Raises", sets: 3, reps: 12, weight: 10 },
];
