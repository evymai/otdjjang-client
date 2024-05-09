import { useEffect, useState } from "react"
import { deleteUserArticle, getUserArticles } from "../../services/articleService"
import "./Article.css"

export const UserArticles = () => {
  const [userArticles, setUserArticles] = useState([])
  const [allArticles, setAllArticles] = useState([])

  const render = () => {
    getUserArticles().then((userArticlesArr) => {
      setUserArticles(userArticlesArr)
    })
  }

  useEffect(() => {
    render()
  }, [])

  const handleRemoveFromWardrobe = async (userArticleId) => {
    await deleteUserArticle(userArticleId)
    render()
  }

  return (
    <div className="article-view">
      <h2>My Otjang</h2>

      <div className="article-container">
        {userArticles.map((userArticle) => {
          return (
            <div className="article-card" key={userArticle.id}>
              <img
                src={userArticle.article.image}
                alt={`${userArticle.article.name}`}
                key={userArticle.article.id}
              />
              <div className="article-name">{userArticle.article.name}</div>
              <div>{userArticle.article.brand.name}</div>
              <div>{userArticle.article.type.name}</div>
              <div>{userArticle.size?.size}</div>

              <div className="owned-icons icon">
                <i className="fa-solid fa-star" onClick={() => handleRemoveFromWardrobe(userArticle.id)}></i>
                <i
                  className="fa-regular fa-star"
                  id="hoverState"
                  onClick={() => handleRemoveFromWardrobe(userArticle.id)}
                ></i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
