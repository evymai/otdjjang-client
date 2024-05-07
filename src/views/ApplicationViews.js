import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import { NavBar } from "../components/nav/NavBar"
import { ArticleList } from "../components/articles/ArticleList"
import Home from "./Home"
import { NewArticleForm } from "../components/articles/ArticleForm"
import { UserArticles } from "../components/articles/UserArticle"
import { OutfitList } from "../components/outfits/OutfitList"
import { NewOutfitForm } from "../components/outfits/OutfitForm"
import { OutfitDetails } from "../components/outfits/OutfitDetails"

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
        <Route path="articles" element={<ArticleList />} />
        <Route path="newClothes" element={<NewArticleForm />} />
        <Route path="userArticles" element={<UserArticles />} />
        <Route path="newOutfit" element={<NewOutfitForm />} />
        <Route path="outfits">
          <Route index element={<OutfitList />} />
          <Route path=":outfitId" element={<OutfitDetails />} />
        </Route>
      </Route>
    </Routes>
  )
}
