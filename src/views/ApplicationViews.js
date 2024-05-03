import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { NavBar } from "../components/nav/NavBar"
import { ArticleList } from "../components/articles/ArticleList"
import Home from "./Home"
import { NewArticleForm } from "../components/articles/ArticleForm"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/newClothes" element={<NewArticleForm />} />
      </Route>
    </Routes>
  )
}
