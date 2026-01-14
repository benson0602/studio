'use server';
/**
 * @fileOverview Adjusts the training plan based on failed sets.
 *
 * - adjustPlanAfterFailedSets - A function that adjusts the training plan based on user-reported failed sets.
 * - AdjustPlanAfterFailedSetsInput - The input type for the adjustPlanAfterFailedSets function.
 * - AdjustPlanAfterFailedSetsOutput - The return type for the adjustPlanAfterFailedSets function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustPlanAfterFailedSetsInputSchema = z.object({
  exerciseName: z.string().describe('The name of the exercise for which sets failed.'),
  weightUsed: z.number().describe('The weight used for the failed sets in kilograms.'),
  targetReps: z.number().describe('The target number of repetitions for the sets.'),
  actualReps: z.number().describe('The actual number of repetitions completed in the failed sets.'),
  numberOfFailedSets: z.number().describe('The number of sets where the target repetitions were not achieved.'),
  feedback: z.string().optional().describe('Optional user feedback on the difficulty of the exercise.'),
});
export type AdjustPlanAfterFailedSetsInput = z.infer<typeof AdjustPlanAfterFailedSetsInputSchema>;

const AdjustPlanAfterFailedSetsOutputSchema = z.object({
  suggestedWeightChange: z.number().describe('The suggested weight adjustment for the next workout (in kilograms).'),
  suggestedRepChange: z.number().describe('The suggested repetition adjustment for the next workout.'),
  explanation: z.string().describe('Explanation for the suggested adjustments.'),
});
export type AdjustPlanAfterFailedSetsOutput = z.infer<typeof AdjustPlanAfterFailedSetsOutputSchema>;

export async function adjustPlanAfterFailedSets(
  input: AdjustPlanAfterFailedSetsInput
): Promise<AdjustPlanAfterFailedSetsOutput> {
  return adjustPlanAfterFailedSetsFlow(input);
}

const adjustPlanAfterFailedSetsPrompt = ai.definePrompt({
  name: 'adjustPlanAfterFailedSetsPrompt',
  input: {schema: AdjustPlanAfterFailedSetsInputSchema},
  output: {schema: AdjustPlanAfterFailedSetsOutputSchema},
  prompt: `You are an expert strength training coach. A user has reported failing to complete sets for the exercise "{{exerciseName}}".

  Here is the information about their failed sets:
  - Weight used: {{weightUsed}} kg
  - Target reps: {{targetReps}}
  - Actual reps completed: {{actualReps}}
  - Number of failed sets: {{numberOfFailedSets}}
  {{#if feedback}}
  - User feedback: {{feedback}}
  {{/if}}

  Based on this information, provide the following adjustments for their next workout:
  1.  suggestedWeightChange: A numerical value (in kilograms) indicating how much to increase or decrease the weight. If you think the weight should stay the same, return 0.
  2.  suggestedRepChange: A numerical value indicating how much to increase or decrease the target repetitions. If you think the reps should stay the same, return 0.
  3.  explanation: A short explanation justifying the suggested adjustments.

  Ensure the adjustments are safe and effective, considering the user's failure and any provided feedback.

  Output in JSON format.
  `,
});

const adjustPlanAfterFailedSetsFlow = ai.defineFlow(
  {
    name: 'adjustPlanAfterFailedSetsFlow',
    inputSchema: AdjustPlanAfterFailedSetsInputSchema,
    outputSchema: AdjustPlanAfterFailedSetsOutputSchema,
  },
  async input => {
    const {output} = await adjustPlanAfterFailedSetsPrompt(input);
    return output!;
  }
);
