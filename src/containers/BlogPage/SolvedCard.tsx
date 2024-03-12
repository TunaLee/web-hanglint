import React, {FC, useEffect, useState} from "react";
import ChallengeDetail from "../PageChallenge/ChallengeDetail";

export interface SolvedProps {
  id?: string;
  answer?: string;
}

const SolvedCard: FC<SolvedProps> = (data) => {
  return (
    <div
      className={`nc-Card12 group relative flex flex-col h-full`}
      data-nc-id="Card12"
    >
      <ChallengeDetail id={data.id} answer={data.answer}/>
    </div>
  );
};

export default SolvedCard;
