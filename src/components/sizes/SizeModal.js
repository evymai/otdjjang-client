import React, { useEffect, useState } from "react"
import { getSizes } from "../../services/sizeService"
import "./SizeModal.css"

const SizeModal = ({ articleId, onClose, onAddToWardrobe }) => {
  const [selectedSize, setSelectedSize] = useState("")
  const [sizes, setSizes] = useState([])

  useEffect(() => {
    getSizes().then((sizeArr) => {
      setSizes(sizeArr)
    })
  }, [])

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value)
  }

  const handleAddToWardrobeClick = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to wardrobe.")
      return
    }
    onAddToWardrobe(articleId, selectedSize)
    onClose()
  }

  return (
    <div className="size-modal">
      <div className="size-modal-content">
        <i className="fa-solid fa-xmark close" onClick={onClose}></i>

        <h2>Select Size</h2>
        <select value={selectedSize} onChange={handleSizeChange}>
          <option value="">Select Size...</option>
          {sizes.map((size) => (
            <option key={size.id} value={size.id}>
              {size.size}
            </option>
          ))}
        </select>
        <button onClick={handleAddToWardrobeClick}>Add to wardrobe</button>
      </div>
    </div>
  )
}

export default SizeModal
