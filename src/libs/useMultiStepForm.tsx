import React, { useState } from "react";

export const useMultiStepForm = (steps: React.ReactNode[]) => {
    const [index, setIndex] = useState(0);

    return {
        currentStep: steps[index],
        index,
        isFirst: index === 0,
        isLast: index === steps.length - 1,
        next: () => setIndex((i) => Math.min(i + 1, steps.length - 1)),
        back: () => setIndex((i) => Math.max(i - 1, 0)),
        goTo: (i: number) => setIndex(i)
    };
};
