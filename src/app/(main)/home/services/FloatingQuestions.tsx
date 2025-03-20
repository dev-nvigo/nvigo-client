import React from "react";
import { questionsData } from "@/data/questions";


const FloatingQuestions = () => {
    return (
        <div className="hidden md:block relative w-full h-[55vh] md:max-w-[50%]">
            {questionsData.map((question, index) => (
                <div
                    key={index}
                    className="absolute bg-[#E6E7E1] shadow-md rounded-lg px-4 py-2 text-[#393953] text-sm w-[20vw] max-w-xs border"
                    style={{
                        left: question.left,
                        top: question.top,
                    }}
                >
                    <p className="!font-circular-med">{question.text}</p>
                    <p className="text-xs text-gray-600 !font-circular-med">- {question.author}</p>
                </div>
            ))}
        </div>
    );
};

export default FloatingQuestions;
