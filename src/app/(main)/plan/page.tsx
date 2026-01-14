"use client";

import { useState } from "react";
import { PlanGeneratorForm } from "@/components/plan/plan-generator-form";
import { TrainingPlanDisplay } from "@/components/plan/training-plan-display";
import { AnimatePresence, motion } from "framer-motion";

export default function PlanPage() {
  const [trainingPlan, setTrainingPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanGenerated = (plan: string) => {
    setTrainingPlan(plan);
    setIsLoading(false);
  };

  const handleReset = () => {
    setTrainingPlan(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {!trainingPlan ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PlanGeneratorForm
              onPlanGenerated={handlePlanGenerated}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="plan"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TrainingPlanDisplay plan={trainingPlan} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
