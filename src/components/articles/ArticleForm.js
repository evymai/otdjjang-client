import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ArticleForm.css"
import { getBrands } from "../../services/brandService"
import { getTypes } from "../../services/typeService"
import { addArticle } from "../../services/articleService"

export const NewArticleForm = () => {
  const [allBrands, setAllBrands] = useState([])
  const [allTypes, setAllTypes] = useState([])
  const [articleName, setArticleName] = useState("")
  const [articleBrandId, setArticleBrandId] = useState("")
  const [articleTypeId, setArticleTypeId] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    getBrands().then((brandsArr) => setAllBrands(brandsArr))
    getTypes().then((typesArr) => setAllTypes(typesArr))
  }, [])

  const handleArticleChange = (event) => {
    setArticleName(event.target.value)
  }
  const handleBrandChange = (event) => {
    setArticleBrandId(event.target.value)
  }
  const handleTypeChange = (event) => {
    setArticleTypeId(event.target.value)
  }

  const handleAddArticle = async (event) => {
    event.preventDefault() 

    if (articleName && articleBrandId && articleTypeId) {
      const newArticle = {
        name: articleName,
        brand_id: articleBrandId,
        type_id: articleTypeId,
        image_url: null,
      }
      try {
        await addArticle(newArticle)
        navigate(`/articles`)
      } catch (error) {
        console.error("Error adding article:", error)
        alert("An error occurred while adding the article. Please try again later.")
      }
    } else {
      alert("Please fill in all fields before adding an article.")
    }
  }

  return (
    <div className="article-form-container">
      <h2>New Article</h2>

      <form>
        <div>
          <label>Name: </label>
          <input type="text" placeholder="ex: Floral Print Dress" value={articleName} onChange={handleArticleChange} />
        </div>
        <div className="dropdown-container">
          <select id="brand-dropdown" className="dropdown" onChange={handleBrandChange}>
            <option className="brand" value="0">
              Select a brand...
            </option>
            {allBrands.map((brand) => {
              return (
                <option className="brand" value={brand.id} key={brand.id}>
                  {brand.name}
                </option>
              )
            })}
          </select>
        </div>
        <div className="dropdown-container">
          <select id="type-dropdown" className="dropdown" onChange={handleTypeChange}>
            <option className="type" value="0">
              Select a type...
            </option>
            {allTypes.map((type) => {
              return (
                <option className="type" value={type.id} key={type.id}>
                  {type.name}
                </option>
              )
            })}
          </select>
        </div>
        <button className="Article-form-button" onClick={handleAddArticle}>
          Add New Article
        </button>
      </form>
    </div>
  )
}
