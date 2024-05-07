import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserArticles } from "../../services/articleService"
import { addOutfit, addOutfitArticle } from "../../services/outfitService"
import { getTypes } from "../../services/typeService"
import "./OutfitForm.css"

export const NewOutfitForm = () => {
  const [userArticles, setUserArticles] = useState([])
  const [currentOutfit, setCurrentOutfit] = useState({})
  const [types, setTypes] = useState([])
  const [outfitName, setOutfitName] = useState("")
  const [isNameEntered, setIsNameEntered] = useState(false)
  const [isButtonClicked, setIsButtonClicked] = useState(false)
  const [checkedUserArticles, setCheckedUserArticles] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getUserArticles().then((articlesArr) => {
      setUserArticles(articlesArr)
    })
    getTypes().then((typesArr) => {
      setTypes(typesArr)
    })
  }, [])

  const handleNameChange = (event) => {
    setOutfitName(event.target.value)
    setIsNameEntered(true)
  }

  const handleAddOutfit = async (event) => {
    event.preventDefault()
    if (outfitName) {
      const newOutfit = {
        name: outfitName,
      }
      await addOutfit(newOutfit).then((outfits) => {
        setCurrentOutfit(outfits)
        setIsButtonClicked(true)
      })
    }
  }

  const handleCheckboxChange = (event) => {
    const userArticleId = parseInt(event.target.value)
    if (event.target.checked) {
      setCheckedUserArticles([...checkedUserArticles, userArticleId])
    } else {
      setCheckedUserArticles(checkedUserArticles.filter((id) => id !== userArticleId))
    }
  }

  const handleCompleteOutfit = async (event) => {
    event.preventDefault()
    if (currentOutfit && checkedUserArticles.length > 0) {
      const promises = checkedUserArticles.map((userArticleId) =>
        addOutfitArticle({ outfit_id: currentOutfit.id, user_article_id: userArticleId })
      )

      await Promise.all(promises)
      navigate(`/outfits/${currentOutfit.id}`)
    }
  }

  return (
    <div>
      <h2>New Outfit</h2>
      <form>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="ex: Casual Summer Fit"
            value={outfitName}
            onChange={handleNameChange}
            disabled={isButtonClicked}
          />
        </div>
        <button
          className="outfit-form-button"
          onClick={(event) => handleAddOutfit(event)}
          disabled={!isNameEntered || isButtonClicked}
        >
          Add New Outfit
        </button>
      </form>
      <form>
        <div className="articles-container">
          {types.map((type) => (
            <div key={type.id}>
              <h3>{type.name}</h3>
              {userArticles
                .filter((userArticle) => userArticle.article.type.id === type.id)
                .map((userArticle) => (
                  <div key={userArticle.id}>
                    <input
                      type="checkbox"
                      id={`article-${userArticle.id}`}
                      value={userArticle.id}
                      checked={checkedUserArticles.includes(userArticle.id)}
                      onChange={(event) => handleCheckboxChange(event)}
                      disabled={!isButtonClicked}
                    />
                    <label htmlFor={`article-${userArticle.id}`}>
                      {userArticle.article.brand.name} {userArticle.article.name}
                    </label>
                  </div>
                ))}
            </div>
          ))}
        </div>

        <button
          className="article-form-button"
          onClick={handleCompleteOutfit}
          disabled={checkedUserArticles.length === 0}
        >
          Complete Outfit
        </button>
      </form>
    </div>
  )
}
