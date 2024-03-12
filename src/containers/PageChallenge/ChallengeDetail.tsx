import React, {useEffect, useState} from "react";
import {Button, Card, Image} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import Question from "./Question";
import './challengeDetail.scss'
import useCustomAxios from "../../utils/axios";

interface ChallengeDetailData {
    id: number,
    questionNo: number,
    questionText: string,
    isMultipleChoice: boolean,
    isImage: boolean,
    isAudio: boolean,
    audioUrl?: string,
    imageUrl?: string,
    choiceData?: ChoiceData[],
}

interface ChoiceData {
    id: string;
    choice?: string;
    isImage: boolean;
    imageUrl?: string;
}
export interface PageChallengeDetailProps {
    id?: string;
    answer?: string;
}

const PageChallengeDetail:React.FC<PageChallengeDetailProps> = (data) => {

    const { id: propId, answer: propAnswer = '' } = data;
    const { id: paramId } = useParams<{ id: string }>();
    const id = propId || paramId
    const customAxios = useCustomAxios()
    const navigate = useNavigate()
    const [load, setLoad] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [answer, setAnswer] = useState<string>(propAnswer)
    const [challengeDetailData, setChallengeDetailData] = useState<ChallengeDetailData>();
    const [isSolved, setIsSolved] = useState<boolean>()
    useEffect(() => {
        const fetchData = async () => {
            const response =
                await customAxios.get(`question/${id}`)
            setLoad(false)
            setChallengeDetailData(response.data.data);
        };
        fetchData();
    }, []);

    const handleSubmitClick = async () => {
        const response =
            await customAxios.post("solving", {
                question: challengeDetailData?.id,
                answer: answer
            })

        setIsSolved(response.data.isSolved)
        navigate(`/my-solved/${id}`)
    }
    const isAnswer = !answer;
    return(
        <div>
            <Card
                className="card"
                loading={load}
                title={
                <div className="test">
                    CHALLENGE
                </div>}
            >
                <div>
                    <div className="title">
                        {`${currentPage}. ${challengeDetailData?.questionText}`}
                    </div>
                    {challengeDetailData?.isAudio && challengeDetailData.audioUrl && (
                        <audio src={challengeDetailData.audioUrl} controls autoPlay={true}/>
                    )}
                    {challengeDetailData?.isImage && challengeDetailData.imageUrl && (
                        <Image src={challengeDetailData.imageUrl} alt={'image error'}/>
                    )}
                </div>
                <Question
                    questionData={challengeDetailData}
                    answer={answer}
                    setAnswer={setAnswer}
                />
                    <Button
                        onClick={handleSubmitClick}
                        className="custom-button mx-auto my-auto"
                        disabled={isAnswer}
                        shape="round"
                    >
                        Submit
                    </Button>
            </Card>
        </div>
    )
}
export default PageChallengeDetail