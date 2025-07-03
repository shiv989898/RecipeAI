"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface InstructionStepProps {
  step: number;
  text: string;
}

export function InstructionStep({ step, text }: InstructionStepProps) {
  const [completed, setCompleted] = useState(false);
  const id = useId();

  return (
    <div className="flex items-start space-x-3 py-2 rounded-md transition-colors hover:bg-secondary/50">
      <Checkbox 
        id={id} 
        checked={completed} 
        onCheckedChange={(checked) => setCompleted(!!checked)} 
        className="mt-1 size-5"
      />
      <Label 
        htmlFor={id} 
        className={cn(
            "text-base leading-relaxed cursor-pointer transition-colors", 
            completed && "line-through text-muted-foreground"
        )}
      >
        {text}
      </Label>
    </div>
  );
}
