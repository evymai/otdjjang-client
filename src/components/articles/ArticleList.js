import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  addUserArticle,
  deleteArticle,
  deleteUserArticle,
  getArticles,
  getUserArticles,
} from "../../services/articleService"
import "./Article.css"
import SizeModal from "../sizes/SizeModal"

export const ArticleList = ({ userId }) => {
  const [allArticles, setAllArticles] = useState([])
  const [userArticles, setUserArticles] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState("")

  const navigate = useNavigate()

  const render = async () => {
    await getArticles().then((articlesArr) => {
      setAllArticles(articlesArr)
    })
    await getUserArticles().then((userArticlesArr) => {
      setUserArticles(userArticlesArr)
    })
  }

  const handleDelete = async (articleId) => {
    await deleteArticle(articleId)
    render()
  }

  const handleRemoveFromWardrobe = async (articleId) => {
    const matchingUserArticle = userArticles.find((userArticle) => userArticle.article.id === articleId)
    const userArticleId = matchingUserArticle ? matchingUserArticle.id : null
    await deleteUserArticle(userArticleId)
    render()
  }

  const handleAddToWardrobe = async (currentArticleId) => {
    const matchingArticle = allArticles.find((article) => article.id === currentArticleId)
    setSelectedArticleId(currentArticleId)
    setShowModal(true)
  }

  const handleAddToWardrobeConfirm = async (articleId, sizeId) => {
    const newUserArticle = {
      article_id: articleId,
      size_id: sizeId,
    }
    await addUserArticle(newUserArticle)
    setShowModal(false)
    render()
  }

  useEffect(() => {
    render()
  }, [])

  return (
    <div className="article-view">
      <h2>Clothes</h2>
      <div className="options-container">
        <button onClick={() => navigate(`/newClothes`)}>Add New Clothes</button>
      </div>
      <div className="article-container">
        {allArticles.map((article) => {
          const isInWardrobe = userArticles.some((userArticle) => userArticle.article.id === article.id)
          return (
            <div className="article-card" key={article.id}>
              <div className="article-img-container">
                <img src={article.image} alt={`${article.name}`} />
              </div>
              <div>{article.name}</div>
              <div>{article.brand.name}</div>
              <div>{article.type.type}</div>
              {isInWardrobe ? (
                <div className="icon">
                  <i
                    className="fa-regular fa-circle-check"
                    id="hoverState"
                    onClick={() => handleRemoveFromWardrobe(article.id)}
                  ></i>
                  <i className="fa-solid fa-circle-check" onClick={() => handleRemoveFromWardrobe(article.id)}></i>
                </div>
              ) : (
                <div className="icon">
                  <i className="fa-regular fa-circle-check" onClick={() => handleAddToWardrobe(article.id)}></i>
                  <i
                    className="fa-solid fa-circle-check"
                    id="hoverState"
                    onClick={() => handleAddToWardrobe(article.id)}
                  ></i>
                </div>
              )}
              {parseInt(article.creator) === parseInt(userId) && (
                <div className="edit-icon">
                  <i className="fa-solid fa-pen-to-square" onClick={() => navigate(`/articles/${article.id}`)}></i>
                </div>
              )}
              {parseInt(article.creator) === parseInt(userId) && (
                <div className="trash-icon">
                  <i className="fa-solid fa-trash-can" onClick={() => handleDelete(article.id)}></i>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {showModal && (
        <SizeModal
          articleId={selectedArticleId}
          onClose={() => setShowModal(false)}
          onAddToWardrobe={handleAddToWardrobeConfirm}
        />
      )}
    </div>
  )
}
