import React from "react";
import {Checkbox, Radio, RadioChangeEvent, Space} from "antd";
import "./choice.scss"

interface choiceProps {
    currentPage: any,
    choices: choiceData[] | undefined
    answer?: string,
    setAnswer: React.Dispatch<React.SetStateAction<string>>;
}
interface choiceData {
    id: string;
    choice?: string;
    isImage: boolean;
    imageUrl?: string;}
const Choice:React.FC<choiceProps> = (data) => {



    const handleCheckboxChange = (checkedValue: RadioChangeEvent) => {
        data.setAnswer(checkedValue.target.value)
    };
    return(
        <div className="checkbox-group-container">
            <Radio.Group
                value={data.answer}
                onChange={handleCheckboxChange}
            >
                <Space direction={"vertical"}>
                    {data.choices?.map((choice) => (
                        <div className="choice-container" key={choice.choice}>
                            { choice.isImage ? (
                                <Radio value={choice.id}>{<img className={"choice-img"} src={choice.imageUrl}/> }</Radio>
                            ): (
                                <Radio value={choice.id}>{choice.choice}</Radio>
                                )
                            }
                        </div>
                    ))}
                </Space>
            </Radio.Group>
        </div>
    )
}

export default Choice