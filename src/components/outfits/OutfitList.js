import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Outfit.css"
import { addOutfit, deleteOutfit, getOutfits } from "../../services/outfitService"

export const OutfitList = () => {
  const [allOutfits, setAllOutfits] = useState([])
  const [selectedOutfitId, setSelectedOutfitId] = useState(null)
  const navigate = useNavigate()

  const render = async () => {
    getOutfits().then((outfitsArr) => {
      setAllOutfits(outfitsArr)
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
      <h2>Clothes</h2>
      <div className="options-container">
        <button onClick={() => navigate(`/newOutfit`)}>Add New Outfit</button>
      </div>
      <div className="outfit-container">
        {allOutfits.map((outfit) => {
          return (
            <div className="outfit-card" key={outfit.id}>
              {/* <div className="outfit-img-container">
                <img src={outfit.image} alt={`${outfit.name}`} />
              </div> */}
              <div>{outfit.name}</div>
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
