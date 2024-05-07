import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Brand.css"
import { addBrand, deleteBrand, getBrands } from "../../services/brandService"

export const Brands = () => {
  const [allBrands, setAllBrands] = useState([])
  const [brandName, setBrandName] = useState("")

  const navigate = useNavigate()

  const render = async () => {
    getBrands().then((brandArr) => {
      setAllBrands(brandArr)
    })
  }

  useEffect(() => {
    render()
  }, [])

  const handleBrandChange = (event) => {
    setBrandName(event.target.value)
  }

  const handleDelete = async (brandId) => {
    await deleteBrand(brandId)
    render()
  }

  const handleAddBrand = async () => {
    if (brandName) {
      const newBrand = {
        name: brandName,
      }
      addBrand(newBrand)
      render()
    } else {
      alert("Please fill in all fields before adding a brand.")
    }
  }

  return (
    <div className="brand-form-container">
      <h2>New Brand</h2>
      <div>
        <form>
          <div>
            <label>Name: </label>
            <input type="text" placeholder="ex: Gucci" value={brandName} onChange={handleBrandChange} />
          </div>

          <button className="brand-form-button" onClick={handleAddBrand}>
            Add New Brand
          </button>
        </form>
      </div>
      <div>
        <h4>Existing Brands:</h4>
        {allBrands.map((brand) => {
          return (
            <div className="brand" key={brand.id}>
              {brand.name}
              <i className="fa-solid fa-trash-can trash-icon" onClick={() => handleDelete(brand.id)}></i>
            </div>
          )
        })}
      </div>
    </div>
  )
}
