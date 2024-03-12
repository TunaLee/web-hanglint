import React, {FC, useEffect, useState} from "react";
import CommonLayout from "./CommonLayout";
import { Helmet } from "react-helmet-async";
import {useCookies} from "react-cookie";
import axios from "axios";
import {Avatar, Card, List} from "antd";
import 'styles/my_account.scss'
import {CrownOutlined} from "@ant-design/icons";

export interface AccountPageProps {
  className?: string;
}
export interface SolvedData {
    testName: string;
    questionName: string;
    testId: number;
    questionId: number;
}

export interface UserData {
  username: string;
  nationalityName: string;
  nationalityImageUrl?: string;
  totalSolved: number;
  correctSolved: number;
  rank?:number;
}
const AccountPage: FC<AccountPageProps> = ({ className = "" }) => {
    const [cookies, setCookies, removeCookies] = useCookies(['token'])
    const [userData, setUserData] = useState<UserData>()
    const [usersData, setUsersData] = useState<UserData[]>()
  useEffect(() => {
    const fetchData = async () => {
      const response =
          await axios.get(
              `http://localhost:8000/api/v1/user/me`, {
                headers:{
                  Authorization: `Token ${cookies.token}`
                }
              });
      setUserData(response.data.data)

        const solvingResponse =
            await axios.get(
                `http://localhost:8000/api/v1/user`, {
                    params:{
                        page_size: 10
                    }
                }
            )
        setUsersData(solvingResponse.data.data)
    };
    fetchData();
  }, []);
  return (
    <div className={`nc-AccountPage ${className}`} data-nc-id="AccountPage">
      <Helmet>
        <title>Account || HanGlint ecommerce React Template</title>
      </Helmet>
      <CommonLayout username={userData?.username} nationalityName={userData?.nationalityName} nationalityImageUrl={userData?.nationalityImageUrl} rank={userData?.rank}>
          <div className="flex justify-center space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar text-center">
              <Card hoverable={true} className="solved-card">
                  <div>Total Solved</div>
                  <div className="solved-number">{userData?.totalSolved}</div>
              </Card>
              <Card className="solved-card">
                  <div>Correct</div>
                  <div className="solved-number">{userData?.correctSolved}</div>
              </Card>
              <Card className="solved-card">
                  <div>Incorrect</div>
                  <div>{userData ? userData.totalSolved - userData.correctSolved : 0}</div>
              </Card>
          </div>
          <hr className="border-slate-200 dark:border-slate-700 mt-16"></hr>
          <h2 className="mt-16 text-3xl xl:text-4xl font-semibold">
              <CrownOutlined rev={undefined} />
              Ranking
          </h2>
          <List
              itemLayout="horizontal"
              dataSource={usersData}
              renderItem={(item, index) => (
                  <List.Item>
                      <h5 className={"mr-5"}>{`${index+1}. `}</h5>
                      <List.Item.Meta
                          avatar={<Avatar src={item.nationalityImageUrl} />}
                          title={item.username}
                          description={`Solved count : ${item.correctSolved}`}
                      />
                  </List.Item>
              )}
          />
      </CommonLayout>
    </div>
  );
};

export default AccountPage;
