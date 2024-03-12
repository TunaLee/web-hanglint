import React from "react";
import Choice from "./Choice";
import Answer from "./Answer";

interface QuestionProps {
    questionData: QuestionData | undefined
    answer?: string
    setAnswer: React.Dispatch<React.SetStateAction<string>>
}
interface QuestionData {
    questionNo?: number,
    questionText?: string,
    isMultipleChoice?: boolean,
    isImage?: boolean,
    imageUrl?: string,
    choiceData?: ChoiceData[],
}
interface ChoiceData {
    id: string;
    choice?: string;
    isImage: boolean;
    imageUrl?: string;
}


const Question:React.FC<QuestionProps> = ( data: QuestionProps) => {
    const questionData = data.questionData
    return(
        <div>
            {questionData?.isMultipleChoice ? (
                <Choice
                    choices={questionData.choiceData}
                    currentPage={questionData.questionNo}
                    answer={data.answer}
                    setAnswer={data.setAnswer}
                />
            ) : (
                <Answer/>
            )
            }
        </div>
    )
}

export default Question