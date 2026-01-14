import { config } from 'dotenv';
config();

import '@/ai/flows/adjust-plan-after-failed-sets.ts';
import '@/ai/flows/suggest-progressive-overload.ts';
import '@/ai/flows/generate-personalized-training-plan.ts';