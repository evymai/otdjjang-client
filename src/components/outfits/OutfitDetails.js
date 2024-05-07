import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Outfit.css"
import { getFullOutfitArticlesById, getOutfitById } from "../../services/outfitService"

export const OutfitDetails = () => {
  const { outfitId } = useParams()
  const [outfit, setOutfit] = useState([])
  const [outfitName, setOutfitName] = useState("")

  const render = () => {
    getFullOutfitArticlesById(outfitId).then((outfit) => {
      setOutfit(outfit)
    })
    getOutfitById(outfitId).then((outfit) => {
      setOutfitName(outfit.name)
    })
  }

  useEffect(() => {
    render()
  }, [outfitId])

  return (
    <div className="outfit-details-container">
      <div className="outfit-details" key={outfitId}>
        <div className="outfit-info">
          <h2>{outfitName}</h2>
        </div>
        <div className="outfit-articles-containeer">
          {outfit.map((outfitArticle) => {
            return (
              <div className="outfit-articles" key={outfitArticle.id}>
                <img
                  src={outfitArticle.user_article.article.image_url}
                  alt={`${outfitArticle.user_article.article.name}`}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="fitcheck-img-container">
        {/* <img
            src={Outfit.image}
            alt={`${Outfit.name}`}
            key={Outfit.id}
          /> */}
      </div>
    </div>
  )
}
