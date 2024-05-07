import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import "./ArticleForm.css"
import { getBrands } from "../../services/brandService"
import { getTypes } from "../../services/typeService"
import { editArticle, getArticleById } from "../../services/articleService"

export const EditArticleForm = () => {
  const { articleId } = useParams()
  const [allBrands, setAllBrands] = useState([])
  const [allTypes, setAllTypes] = useState([])
  const [articleName, setArticleName] = useState("")
  const [articleBrandId, setArticleBrandId] = useState("")
  const [articleTypeId, setArticleTypeId] = useState("")
  const [article, setArticle] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const articleData = await getArticleById(articleId)
        setArticle(articleData)
        setArticleName(articleData.name)
        setArticleBrandId(articleData.brand.id)
        setArticleTypeId(articleData.type.id)
      } catch (error) {
        console.error("Error fetching article:", error)
      }
    }
    fetchData()

    getBrands().then((brandsArr) => setAllBrands(brandsArr))
    getTypes().then((typesArr) => setAllTypes(typesArr))
  }, [articleId])

  const handleArticleChange = (event) => {
    setArticleName(event.target.value)
  }

  const handleBrandChange = (event) => {
    setArticleBrandId(event.target.value)
  }

  const handleTypeChange = (event) => {
    setArticleTypeId(event.target.value)
  }

  const handleEditArticle = async (event) => {
    event.preventDefault()

    if (articleId && articleName && articleBrandId && articleTypeId) {
      const updatedArticle = {
        name: articleName,
        brand: articleBrandId,
        type: articleTypeId,
        image_url: null,
      }
      try {
        await editArticle(articleId, updatedArticle)
        navigate(`/articles`)
      } catch (error) {
        console.error("Error updating article:", error)
        alert("An error occurred while updating the article. Please try again later.")
      }
    } else {
      alert("Please fill in all fields before updating the article.")
    }
  }

  if (!article) {
    return <div>No Article found...</div>
  }

  return (
    <div className="article-form-container">
      <h2>Edit Article</h2>
      <form>
        <div>
          <label>Name: </label>
          <input type="text" placeholder="ex: Floral Print Dress" value={articleName} onChange={handleArticleChange} />
        </div>
        <div className="dropdown-container">
          <select id="brand-dropdown" className="dropdown" value={articleBrandId} onChange={handleBrandChange}>
            <option value="">Select a brand...</option>
            {allBrands.map((brand) => (
              <option value={brand.id} key={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-container">
          <select id="type-dropdown" className="dropdown" value={articleTypeId} onChange={handleTypeChange}>
            <option value="">Select a type...</option>
            {allTypes.map((type) => (
              <option value={type.id} key={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <button className="article-form-button" onClick={handleEditArticle}>
          Save Changes
        </button>
      </form>
    </div>
  )
}
