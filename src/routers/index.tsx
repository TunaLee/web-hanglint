import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import Page404 from "containers/Page404/Page404";
import AccountPage from "containers/AccountPage/AccountPage";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageLogin from "containers/PageLogin/PageLogin";
import PageCollection from "containers/PageCollection";
import { Toaster } from "react-hot-toast";
import PageChallengeDetail from "../containers/PageChallenge/ChallengeDetail";
import PageMySolved from "containers/BlogPage/PageMySolved";

export const pages: Page[] = [
    { path: "/", component: PageHome },
    { path: "/challenge", component: PageCollection },
    { path: "/challenge/:id", component: PageChallengeDetail },
    { path: "/my-solved/:id", component: PageMySolved },

    //
    { path: "/account", component: AccountPage },

    { path: "/signup", component: PageSignUp },
    { path: "/login", component: PageLogin },
];

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <ScrollToTop />
      <Routes>
        {pages.map(({ component: Component, path }, index) => {
          return <Route key={index} element={<Component />} path={path} />;
        })}
        <Route element={<Page404 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MyRoutes;
