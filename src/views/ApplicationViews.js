import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { NavBar } from "../components/nav/NavBar"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { ArticleList } from "../components/articles/ArticleList"
import Home from "./Home"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
      </Route>
    </Routes>
  )
}
