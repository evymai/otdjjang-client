import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import moment from "moment"
import { getFullOutfitArticlesById, getOutfitById } from "../../services/outfitService"
import { addOutfitPhoto, getOutfitPhotoByOutfitId } from "../../services/outfitPhotoService"
import UploadModal from "./UploadModal"
import "./OutfitDetails.css"

export const OutfitDetails = () => {
  const { outfitId } = useParams()
  const [outfit, setOutfit] = useState([])
  const [outfitName, setOutfitName] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [outfitPhoto, setOutfitPhoto] = useState(null)

  const render = () => {
    getFullOutfitArticlesById(outfitId).then((outfit) => {
      setOutfit(outfit)
    })
    getOutfitById(outfitId).then((outfit) => {
      setOutfitName(outfit.name)
    })
    getOutfitPhotoByOutfitId(outfitId).then((fitcheck) => {
      setOutfitPhoto(fitcheck)
    })
  }

  useEffect(() => {
    render()
  }, [outfitId])

  const handleUploadClick = () => {
    setShowUploadModal(true)
  }

  const handleUpload = async (imageFile) => {
    const formData = new FormData()
    formData.append("image", imageFile)
    formData.append("outfit_id", outfitId)

    try {
      const response = await addOutfitPhoto(formData)
      setOutfitPhoto(response.data)
      render()
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseModal = () => {
    setShowUploadModal(false)
  }

  return (
    <div className="outfit-details-container">
      <div className="outfit-details" key={outfitId}>
        <div className="outfit-info">
          <h2>{outfitName}</h2>
        </div>
        <div className="outfit-articles-container">
          {outfit.map((outfitArticle) => {
            return (
              <div className="outfit-articles" key={outfitArticle.id}>
                <div>{outfitArticle.user_article.article.name}</div>
                <img
                  src={`http://localhost:8000/${outfitArticle.user_article.article.image}`}
                  alt={outfitArticle.user_article.article.name}
                />
              </div>
            )
          })}
        </div>
      </div>

      {outfitPhoto ? (
        <div className="fitcheck-img-container">
          <h3>Fitcheck</h3>
          <div>Worn on {moment(outfitPhoto.worn_on).format("MMM D, YYYY")}</div>
          <img src={outfitPhoto.image} alt={outfitName} />
        </div>
      ) : (
        <div className="fitcheck-img-container">
          <h3>Fitcheck</h3>
          <button onClick={handleUploadClick}>Add Fitcheck</button>
        </div>
      )}

      {showUploadModal && <UploadModal onClose={handleCloseModal} onUpload={handleUpload} />}
    </div>
  )
}
