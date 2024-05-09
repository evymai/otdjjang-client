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
import { Brands } from "../components/brands/Brand"
import { EditArticleForm } from "../components/articles/EditArticleForm"
import { Fitcheck } from "../components/fitchecks/Fitcheck"

export const ApplicationViews = () => {
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const userId = localStorage.getItem("userId")
    setUserId(userId)
  }, [])

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
        <Route path="articles">
          <Route index element={<ArticleList userId={userId} />} />
          <Route path=":articleId" element={<EditArticleForm userId={userId} />} />
        </Route>
        <Route path="newClothes" element={<NewArticleForm userId={userId} />} />
        <Route path="userArticles" element={<UserArticles />} />
        <Route path="newOutfit" element={<NewOutfitForm />} />
        <Route path="outfits">
          <Route index element={<OutfitList />} />
          <Route path=":outfitId" element={<OutfitDetails />} />
        </Route>
        <Route path="brands" element={<Brands />} />
        <Route path="fitcheck" element={<Fitcheck />} />
      </Route>
    </Routes>
  )
}
