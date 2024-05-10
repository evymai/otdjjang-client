import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Fitcheck.css"
import { getOutfitPhotos } from "../../services/outfitPhotoService"
import moment from 'moment'

export const Fitcheck = () => {
  const [allOutfitPhotos, setAllOutfitPhotos] = useState([])

  const navigate = useNavigate()

  const render = async () => {
    await getOutfitPhotos().then((OutfitPhotosArr) => {
      setAllOutfitPhotos(OutfitPhotosArr)
    })
  }

  useEffect(() => {
    render()
  }, [])

  return (
    <div className="fitcheck-view">
      <h2>Fitcheck Gallery</h2>
      <div className="fitcheck-container">
        {allOutfitPhotos.map((fitcheck) => {
          return (
            <div className="fitcheck-card" key={fitcheck.id}>
              <div>
                <img src={fitcheck.image} alt={Fitcheck} />
              </div>
              <div>{moment(fitcheck.worn_on).format("MMM D, YYYY")}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
