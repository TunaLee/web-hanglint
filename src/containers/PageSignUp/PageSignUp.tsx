import React, {FC, useEffect, useState} from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet-async";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import {Link, useNavigate} from "react-router-dom";
import {Alert, Button, message, Space} from "antd";
import {CheckCircleTwoTone} from "@ant-design/icons";
import axios from "axios";
import Select from "../../shared/Select/Select";
import ButtonSecondary from "../../shared/Button/ButtonSecondary";
import {useCookies} from "react-cookie";

export interface PageSignUpProps {
  className?: string;
}
export interface NationalityDatas {
  id: number;
  engName: string;
  imageUrl: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [cookies, setCookies] = useCookies(['token'])
  const [name, setName] = useState('')
  const [nationalitiesData, setNationalitiesData] = useState<NationalityDatas[]>()
  const [nationality, setNationality] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isDuplicatedEmail, setIsDuplicatedEmail] = useState(true)
  const [isFirst,setIsFirst] = useState(true)
  useEffect(() => {
    if(cookies.token)
      navigate('/')
    const fetchData = async () => {
      const response =
          await axios.get(
              `http://localhost:8000/api/v1/nationality`, {
                params:{
                  page_size:300
                }
              });
      setNationalitiesData(response.data.data);
    };
    fetchData();
  }, []);
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsDuplicatedEmail(true)
    setIsFirst(true)
    setEmail(e.target.value);
    setIsValidEmail(validateEmail(e.target.value))
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);

  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }
  const handleNationalityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNationality(e.target.value);
  }
  const handleCheckEmail = async () => {
    try {
      await axios.get(`http://localhost:8000/api/v1/user/validate_email`, {
        params: {
          email: email
        }
      });
      setIsDuplicatedEmail(false)
      setIsFirst(false)
    } catch (error) {
      setIsFirst(false)
    }
  };

  const validatePassword = (password: string): boolean => {
    const hasLength = password.length >= 8;
    const hasLowerCase = /[A-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasLength && hasLowerCase && hasNumber;
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  const signUpSubmit = async () => {
    try {
      await axios.post(`http://localhost:8000/api/v1/user/signup`, {
        username: name,
        email: email,
        password: password,
        nationality: nationality
      });
      navigate('/login');
    } catch (error) {
    }
  };

  const ableSubmit = () => {
    return !isFirst && isValidEmail && passwordsMatch &&validatePassword(password) && nationality.length !== 0 && name.length !== 0
  }
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || HanGlint React Template</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          SignUp
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {/*{loginSocials.map((item, index) => (*/}
            {/*  <a*/}
            {/*    key={index}*/}
            {/*    href={item.href}*/}
            {/*    className=" flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"*/}
            {/*  >*/}
            {/*    <img*/}
            {/*      className="flex-shrink-0"*/}
            {/*      src={item.icon}*/}
            {/*      alt={item.name}*/}
            {/*    />*/}
            {/*    <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">*/}
            {/*      {item.name}*/}
            {/*    </h3>*/}
            {/*  </a>*/}
            {/*))}*/}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              {/*OR*/}
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                User name
              </span>
              <Input
                  value={name}
                  onChange={handleNameChange}
              />
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <div style={{ flex: '1', marginRight: '10px' }}>
                  <Input
                      type="email"
                      placeholder="example@example.com"
                      className={isValidEmail ? '' : 'invalid'}
                      value={email}
                      onChange={handleEmailChange}
                      style={{ width: '100%' }}
                  />
                  {!isValidEmail && <span className="text-red-600">Invalid Email Format</span>}
                </div>
                { isDuplicatedEmail ? (
                    <div>
                      <ButtonSecondary href={'/signup'} onClick={handleCheckEmail}>Check</ButtonSecondary>
                    </div>

                ) : (
                    <Space>
                      <CheckCircleTwoTone twoToneColor="#52c41a" rev={undefined} />
                    </Space>
                )
                }
              </div>
              {isDuplicatedEmail && !isFirst && <span className="text-red-600">Already Existed Email!</span>}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="password" className="mt-1" value={password} onChange={handlePasswordChange}/>
              { password.length !== 0 && !validatePassword(password) && <span className="text-red-600">Password must contain a minimum of 8 characters including uppercase, lowercase letters, and numbers. </span>}
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password Confirm
              </span>
              <Input type="password" className="mt-1" value={confirmPassword} onChange={handleConfirmPasswordChange} />
              {confirmPassword.length !==0 && !passwordsMatch && <span className="text-red-600">Passwords do not match</span>}
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Nationality
              </span>
              <Select className="mt-1.5" defaultValue={'default'} value={nationality} onChange={handleNationalityChange}>
                <option value={'default'}>---------------</option>
                {nationalitiesData?.map((data) => (
                    <option key={data.id} value={data.id}>
                      {data.engName}
                    </option>
                ))}
              </Select>
            </label>
            <Button size={"large"} shape={"round"} disabled={!ableSubmit()} onClick={signUpSubmit}>Continue</Button>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link className="text-green-600" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
