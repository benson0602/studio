
'use server';

import {
  generatePersonalizedTrainingPlan as genPlan,
  type TrainingPlanInput,
} from '@/ai/flows/generate-personalized-training-plan';
import {
  suggestProgressiveOverload as suggestOverload,
  type SuggestProgressiveOverloadInput,
} from '@/ai/flows/suggest-progressive-overload';
import {
  adjustPlanAfterFailedSets as adjustPlan,
  type AdjustPlanAfterFailedSetsInput,
} from '@/ai/flows/adjust-plan-after-failed-sets';

export async function generatePersonalizedTrainingPlan(input: TrainingPlanInput) {
  try {
    const result = await genPlan(input);
    return { success: true, plan: result.trainingPlan };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate training plan.' };
  }
}

export async function suggestProgressiveOverload(input: SuggestProgressiveOverloadInput) {
    try {
        const result = await suggestOverload(input);
        return { success: true, suggestion: result.suggestion };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to get suggestion.' };
    }
}

export async function adjustPlanAfterFailedSets(input: AdjustPlanAfterFailedSetsInput) {
    try {
        const result = await adjustPlan(input);
        return { success: true, adjustment: result };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to get adjustment.' };
    }
}
