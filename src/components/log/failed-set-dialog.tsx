"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ShieldAlert, Zap } from "lucide-react";
import { useState } from "react";

import type { AdjustPlanAfterFailedSetsOutput } from "@/ai/flows/adjust-plan-after-failed-sets";
import type { Exercise } from "@/lib/types";
import { adjustPlanAfterFailedSets } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema = z.object({
  actualReps: z.coerce.number().int().min(0),
  numberOfFailedSets: z.coerce.number().int().min(1),
  feedback: z.string().optional(),
});

type FailedSetDialogProps = {
  exercise: Exercise;
};

export function FailedSetDialog({ exercise }: FailedSetDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adjustment, setAdjustment] = useState<AdjustPlanAfterFailedSetsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actualReps: exercise.reps - 1,
      numberOfFailedSets: 1,
      feedback: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAdjustment(null);
    const result = await adjustPlanAfterFailedSets({
      exerciseName: exercise.name,
      weightUsed: exercise.weight || 0,
      targetReps: exercise.reps,
      ...values,
    });

    if (result.success && result.adjustment) {
      setAdjustment(result.adjustment);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
    setIsLoading(false);
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
      setAdjustment(null);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Log Failure</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Failed Set</DialogTitle>
          <DialogDescription>
            Tell us about the failed set for &quot;{exercise.name}&quot; to get an adjustment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!adjustment ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <p className="text-sm text-muted-foreground">Target: {exercise.sets} sets of {exercise.reps} reps at {exercise.weight}kg</p>
                <FormField
                  control={form.control}
                  name="actualReps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Actual Reps Completed</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numberOfFailedSets"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Failed Sets</FormLabel>
                      <FormControl><Input type="number" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Optional Feedback</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., 'Felt a pinch in my shoulder'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Get Adjustment
                </Button>
              </form>
            </Form>
          ) : (
            <div className="space-y-4">
                <Alert>
                    <Zap className="h-4 w-4" />
                    <AlertTitle>AI Coach Adjustment</AlertTitle>
                    <AlertDescription>
                        {adjustment.explanation}
                    </AlertDescription>
                </Alert>
                 <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-destructive">{adjustment.suggestedWeightChange} kg</p>
                        <p className="text-xs text-muted-foreground">Weight Change</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold text-destructive">{adjustment.suggestedRepChange}</p>
                        <p className="text-xs text-muted-foreground">Rep Change</p>
                    </div>
                </div>
              <Button onClick={() => setAdjustment(null)} className="w-full">
                OK
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
