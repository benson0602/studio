"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generatePersonalizedTrainingPlan } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  experienceLevel: z.enum(["beginner", "intermediate", "advanced"], {
    required_error: "Please select your experience level.",
  }),
  goals: z.enum(["strength", "hypertrophy"], {
    required_error: "Please select your primary goal.",
  }),
  weeklyTrainingDays: z.coerce
    .number({ required_error: "Please enter a number." })
    .int()
    .min(1, "You must train at least 1 day a week.")
    .max(7, "You cannot train more than 7 days a week."),
  equipmentLimitations: z
    .string()
    .min(1, "Please specify your equipment or type 'none'.")
    .default("none"),
});

type PlanGeneratorFormProps = {
  onPlanGenerated: (plan: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
};

export function PlanGeneratorForm({ onPlanGenerated, setIsLoading, isLoading }: PlanGeneratorFormProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        weeklyTrainingDays: 3,
        equipmentLimitations: 'none'
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await generatePersonalizedTrainingPlan(values);
    if (result.success && result.plan) {
      onPlanGenerated(result.plan);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "An unknown error occurred.",
      });
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Training Plan</CardTitle>
        <CardDescription>
          Answer a few questions to generate a personalized plan powered by AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Goal</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your main goal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="strength">Strength (Lift Heavier)</SelectItem>
                        <SelectItem value="hypertrophy">Hypertrophy (Build Muscle)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weeklyTrainingDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Training Days Per Week</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 3" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="equipmentLimitations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipment Limitations</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., dumbbells only, no machines" {...field} />
                    </FormControl>
                    <FormDescription>
                      If you have a full gym, just type &quot;none&quot;.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Plan
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
