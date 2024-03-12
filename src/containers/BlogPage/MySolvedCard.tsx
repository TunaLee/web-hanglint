import React, {FC, useEffect, useState} from "react";
import {Button, Card, Input, Switch} from "antd";
import {CheckCircleTwoTone, CloseCircleTwoTone} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import useCustomAxios from "../../utils/axios";

export interface MySolvedCardProps {
  id?: string;
  created: string;
  isSolved?: boolean;
  isExposure?: boolean;
  description?: string;
  answer?: string;
}

const MySolvedCard: FC<MySolvedCardProps> = (data) => {
  const [description, setDescription] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>();
  const [isExposure, setIsExposure] = useState<boolean>(false)
  const customAxios = useCustomAxios()
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(e.target.value)
  };

  const handleSubmitClick = async () => {
        await customAxios.patch(`solving/${data.id}`, {
          description: description
        })
    window.location.reload();
  }
  const handleEditClick = async () => {
    setIsEdit(true)
  }

  const handleIsExposure = async () => {
    await customAxios.patch(`solving/${data.id}`, {
      isExposure : isExposure
    })
    setIsExposure(!isExposure)
  }

  useEffect(() => {
    setDescription(data.description);
    setIsEdit(!Boolean(data.description));
  }, [data]);
  return (
    <Card className={`nc-Card13 relative flex m-3`} data-nc-id="MySolvedCard">
      <div className="flex flex-col h-full py-2"
           style={{
             width: window.innerWidth <= 500 ? 300 : 500
           }}>

        <h2 className={`nc-card-title block text-base m-5`} style={{ fontSize: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {data.isSolved ? (
                <CheckCircleTwoTone twoToneColor="#52c41a" rev={undefined} style={{ marginRight: '5px' }} />
            ) : (
                <CloseCircleTwoTone twoToneColor="#eb2f96" rev={undefined} style={{ marginRight: '5px' }} />
            )}
          </div>
          <span>Your answer: {data.answer}</span>
        </h2>
        <span className="">
          {
            isEdit ? (
              <TextArea
                  showCount
                  maxLength={1000}
                  onChange={onChange}
                  placeholder="Your solution description"
                  value={description}
                  style={{
                    height: 120,
                    resize: 'none',
                    width: '100%'
                  }}
              />
            ) : (
                <Card >
                  {data.description}
                </Card>            )
          }
        </span>
        <span style={{ fontSize: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
          <div className="mt-auto hidden sm:block">
            {moment(data.created).format('YYYY-MM-DD')}
          </div>
          <div>
            {
              isEdit ? (
                  <Button
                      onClick={handleSubmitClick}
                      shape="round"
                  >
                    Save
                  </Button>
              ) : (
                  <div>
                    <span style={{marginRight: '10px'}}>Exposure</span>
                    <Switch value={isExposure} onChange={handleIsExposure} style={{marginRight: '10px'}} />
                    <Button
                        onClick={handleEditClick}
                        shape="round"
                    >
                      Edit
                    </Button>
                  </div>
              )
            }
          </div>
        </span>
      </div>
    </Card>

  );
};

export default MySolvedCard;
