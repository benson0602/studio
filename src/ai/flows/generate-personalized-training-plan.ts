'use server';

/**
 * @fileOverview Generates a personalized basic training plan based on user input.
 *
 * - generatePersonalizedTrainingPlan - A function that generates a personalized training plan.
 * - TrainingPlanInput - The input type for the generatePersonalizedTrainingPlan function.
 * - TrainingPlanOutput - The return type for the generatePersonalizedTrainingPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TrainingPlanInputSchema = z.object({
  experienceLevel: z
    .enum(['beginner', 'intermediate', 'advanced'])
    .describe('The user\u0027s weightlifting experience level.'),
  goals: z
    .enum(['strength', 'hypertrophy'])
    .describe('The user\u0027s primary training goal.'),
  weeklyTrainingDays: z
    .number()
    .int()
    .min(1)
    .max(7)
    .describe('The number of days per week the user can train.'),
  equipmentLimitations: z
    .string()
    .describe(
      'Any equipment limitations the user has (e.g., limited access to machines, only dumbbells available).' + 
      ' If no limitations, specify \"none\".'
    ),
});

export type TrainingPlanInput = z.infer<typeof TrainingPlanInputSchema>;

const TrainingPlanOutputSchema = z.object({
  trainingPlan: z.string().describe('A personalized basic training plan.'),
});

export type TrainingPlanOutput = z.infer<typeof TrainingPlanOutputSchema>;

export async function generatePersonalizedTrainingPlan(
  input: TrainingPlanInput
): Promise<TrainingPlanOutput> {
  return generatePersonalizedTrainingPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedTrainingPlanPrompt',
  input: {schema: TrainingPlanInputSchema},
  output: {schema: TrainingPlanOutputSchema},
  prompt: `You are an expert personal trainer. Generate a personalized basic training plan based on the user's input.

Experience Level: {{{experienceLevel}}}
Goals: {{{goals}}}
Weekly Training Days: {{{weeklyTrainingDays}}}
Equipment Limitations: {{{equipmentLimitations}}}

The training plan should be clear, concise, and easy to follow.  It should include specific exercises, sets, and reps.
Consider all inputs and provide a safe and effective plan.`,
});

const generatePersonalizedTrainingPlanFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedTrainingPlanFlow',
    inputSchema: TrainingPlanInputSchema,
    outputSchema: TrainingPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
