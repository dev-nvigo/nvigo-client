'use client';

import React from 'react';

interface StepIndicatorProps {
    step: number;
    totalSteps: number;
    title: string;
    subtitle: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ step, totalSteps, title, subtitle }) => {
    const steps = Array.from({ length: totalSteps });

    return (
        <div className="w-full text-center space-y-4 !font-circular-book mt-5">
            {/* Step Count */}
            <div className="text-[#9C9AA5] text-xs md:text-sm font-medium">
                {step} / {totalSteps}
            </div>

            {/* Title */}
            <h2 className="text-[#26203B] text-xl md:text-2xl font-semibold">
                {title}
            </h2>

            {/* Subtitle */}
            <p className="text-[#9C9AA5] text-sm md:text-base">
                {subtitle}
            </p>

            {/* Progress Bar */}
            <div className="flex justify-center gap-3 pt-2">
                {steps.map((_, index) => (
                    <div
                        key={index}
                        className={`h-3 md:h-4 w-12 md:w-24 rounded-md transition-all duration-300 ease-in-out
              ${index < step ? 'bg-c-blue-100' : 'bg-[#D7D7D7]'}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepIndicator;
