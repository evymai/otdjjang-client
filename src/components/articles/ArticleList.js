import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { deleteArticle, getArticles } from "../../services/articleService"
import "./Article.css"

export const ArticleList = ({ currentUser }) => {
  const [allArticles, setArticles] = useState([])
  const navigate = useNavigate()

  const render = () => {
    getArticles().then((articlesArr) => {
      console.log(articlesArr)
      setArticles(articlesArr)
    })
  }

  const handleDelete = async (articleId) => {
    await deleteArticle(articleId)
    render()
  }

  useEffect(() => {
    render()
  }, [])

  return (
    <div className="article-view">
      <h2>Clothes</h2>
      <div className="options-container">
        <button
          onClick={() => {
            navigate(`/newClothes`)
          }}
        >
          New Clothes
        </button>
      </div>
      <div className="article-container">
        {allArticles.map((article) => (
          <div className="article-card" key={article.id}>
            <div className="article-img-container">
              <img src={article.image} alt={`${article.name}`} />
            </div>
            <div>{article.name}</div>
            <div>{article.brand.name}</div>
            <div>{article.type.type}</div>
            <div className="trash-icon">
              <i className="fa-solid fa-trash-can" onClick={() => handleDelete(article.id)}></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
