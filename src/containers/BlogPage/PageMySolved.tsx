import React, {FC, useEffect, useState} from "react";
import MySolvedCard from "./MySolvedCard";
import SolvedCard from "./SolvedCard";
import useCustomAxios from "utils/axios";
import {useParams} from "react-router-dom";


export interface SolvingData {
    id?: string;
    created: string;
    isSolved?: boolean;
    isExposure?: boolean;
    description?: string;
    answer?: string;
}
const PageMySolved: React.FC = () => {
    const customAxios = useCustomAxios()
    const { id: paramId } = useParams<{ id: string }>();
    const [solvingData, setSolvingData] = useState<SolvingData[]>([])
    const [isLoad, setIsLoad] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response =
                    await customAxios.get(`solving`, {
                        params: {
                            question: paramId
                        }
                    });
                setSolvingData(response.data.data)
                setIsLoad(true)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
  return (
    <div className="nc-SectionMagazine5">
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {isLoad ? (
              <SolvedCard id={paramId} answer={solvingData[0].answer}/>
          ):(
              <></>
          )
          }
        <div className="grid gap-6 md:gap-8">
          {solvingData.map((item, index) => (
            <MySolvedCard
                id={item.id}
                isSolved={item.isSolved}
                isExposure={item.isExposure}
                answer={item.answer}
                created={item.created}
                description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageMySolved;
