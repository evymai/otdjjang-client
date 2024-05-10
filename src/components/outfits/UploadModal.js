import React, { useState } from "react"
import "./UploadModal.css"

const UploadModal = ({ onClose, onUpload }) => {
  const [imageFile, setImageFile] = useState(null)

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0])
  }

  const handleSubmit = () => {
    if (imageFile) {
      onUpload(imageFile)
      onClose()
    } else {
      alert("Please select an image file before uploading.")
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <i className="fa-solid fa-xmark close" onClick={onClose}></i>
        <h2>Upload Fitcheck Image</h2>
        <input type="file" id="fileInput" onChange={handleFileChange} />
        <button onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  )
}

export default UploadModal