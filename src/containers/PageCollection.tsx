import React, {FC, useEffect, useState} from "react";
import { Helmet } from "react-helmet-async";
import TabFilters from "./TabFilters";
import {useCookies} from "react-cookie";
import {List, Table, TableProps, Tag} from "antd";
import {Link} from "react-router-dom";
import useCustomAxios from "../utils/axios";
import {CheckCircleTwoTone, CheckOutlined, CloseCircleTwoTone, LoadingOutlined, XOutlined} from "@ant-design/icons";

export interface PageCollectionProps {
  className?: string;
}
interface QuestionListData {
  id: number,
  testName: string,
  attemptCount: number,
  correctCount: number,
  category: string,
  difficulty: number,
}
interface DataType {
  id: number;
  name: string;
  category: string;
  difficulty: number;
  rate: number;
}

const columns = [
  {
    title: 'Number',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Test Name',
    dataIndex: 'testName',
    key: 'testName',
    render: (text: string, record: any) => <Link to={`/challenge/${record.id}`}>{text}</Link>,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (text:string) => <Tag>{text}</Tag>
  },
  {
    title: 'Difficulty',
    dataIndex: 'difficulty',
    key: 'difficulty',
  },
  {
    title: 'Attempt count',
    key: 'attemptCount',
    dataIndex: 'attemptCount',
  },
  {
    title: 'Correct count',
    key: 'correctCount',
    dataIndex: 'correctCount',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (status: string) => (
        <span>
          {status === 'WRONG' ? <CloseCircleTwoTone twoToneColor="#eb2f96" rev={undefined} />  : null}
          {status === 'SOLVED' ?  <CheckCircleTwoTone twoToneColor="#52c41a" rev={undefined} />  : null}
        </span>
    ),
  },
];

const PageCollection: FC<PageCollectionProps> = ({ className = "" }) => {
  const [page, setPage] = useState(1)
  const [cookies, setCookies] = useCookies(['token'])
  const [questionList, setQuestionList] =useState<QuestionListData[]>()
  const [category, setCategory] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<string[]>([])
  const [solved, setSolved] = useState<string[]>([])
  const [status, setStatus] = useState('')
  const customAxios = useCustomAxios()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =
            await customAxios.get(
                'question', {
                  params: {
                    page: page,
                    page_size: 10,
                    difficulty: difficulty.join(','),
                    category: category.join(','),
                    solved: solved.join(','),
                    status: status
                  },                }
            )
        setQuestionList(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };
    fetchData();
  }, [category, difficulty, solved, page]);
  return (
    <div
      className={`nc-PageCollection ${className}`}
      data-nc-id="PageCollection"
    >
      <Helmet>
        <title>Collection || HanGlint Ecommerce Template</title>
      </Helmet>

      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
        <div className="space-y-10 lg:space-y-14">
          {/* HEADING */}
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Challenge
            </h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
              Take questions from different categories and levels of difficulty!
            </span>
          </div>

          <hr className="border-slate-200 dark:border-slate-700" />
          <main>
            {/* TABS FILTER */}
            <TabFilters
                category={category}
                difficulty={difficulty}
                solved={solved}
                setCategory={setCategory}
                setDifficulty={setDifficulty}
                setSolved={setSolved}

            />

            {/* LOOP ITEMS */}
            <Table
                className={"mt-16"}
                dataSource={questionList}
                columns={columns}
            />
          </main>
        </div>

        {/* === SECTION 5 === */}
        <hr className="border-slate-200 dark:border-slate-700" />
      </div>
    </div>
  );
};

export default PageCollection;
