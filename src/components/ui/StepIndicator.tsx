import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && index <= currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Step circle */}
              <motion.button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  "relative flex flex-col items-center",
                  isClickable && "cursor-pointer"
                )}
                whileHover={isClickable ? { scale: 1.05 } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted || isCurrent ? 'hsl(var(--accent))' : 'hsl(var(--muted))',
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                    isCompleted || isCurrent ? "text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </motion.div>

                {/* Step label */}
                <div className="absolute top-14 whitespace-nowrap text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-muted-foreground hidden md:block mt-0.5">
                    {step.description}
                  </p>
                </div>

                {/* Current step indicator */}
                {isCurrent && (
                  <motion.div
                    layoutId="currentStep"
                    className="absolute -inset-1 rounded-full border-2 border-accent"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4 h-0.5 bg-muted relative">
                  <motion.div
                    initial={false}
                    animate={{
                      width: isCompleted ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-y-0 left-0 bg-accent"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
