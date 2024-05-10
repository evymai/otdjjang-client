import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { addOutfit, deleteOutfit, getOutfits } from "../../services/outfitService"
import "./Outfit.css"
import { getOutfitPhotos } from "../../services/outfitPhotoService"

export const OutfitList = () => {
  const [allOutfits, setAllOutfits] = useState([])
  const [fitchecks, setFitchecks] = useState([])
  const navigate = useNavigate()

  const render = async () => {
    getOutfits().then((outfitsArr) => {
      setAllOutfits(outfitsArr)
    })
    getOutfitPhotos().then((fitcheckArr) => {
      setFitchecks(fitcheckArr)
    })
  }

  const handleDelete = async (outfitId) => {
    await deleteOutfit(outfitId)
    render()
  }

  useEffect(() => {
    render()
  }, [])

  return (
    <div className="outfit-view">
      <h2>My Outfits</h2>
      <div className="new-button">
        <button onClick={() => navigate(`/newOutfit`)}>Add New Outfit</button>
      </div>
      <div className="outfit-container">
        {allOutfits.map((outfit) => {
          const matchingFitcheck = fitchecks.find((fitcheck) => fitcheck.outfit === outfit.id)
          const fitcheckImage = matchingFitcheck ? matchingFitcheck.image : null

          return (
            <div className="outfit-card" key={outfit.id}>
              <div className="outfit-img-container">
                {fitcheckImage && <img src={fitcheckImage} alt={`${outfit.name}`} />}
              </div>
              <Link to={`/outfits/${outfit.id}`}>
                <div>{outfit.name}</div>
              </Link>
              <div className="trash-icon">
                <i className="fa-solid fa-trash-can" onClick={() => handleDelete(outfit.id)}></i>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
