import { createWithResponse, fetchWithResponse, fetchWithoutResponse, fetchWithoutStatus } from "./fetcher"

export const getBrands = async () => {
  return await fetchWithResponse("brands", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const getBrandById = async (id) => {
  return await fetchWithResponse(`brands/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const deleteBrand = async (id) => {
  return await fetchWithoutResponse(`brands/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const addBrand = async (brand) => {
  return await createWithResponse(`brands`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brand),
  })
}

export const editBrand = async (id, brand) => {
  return await fetchWithoutResponse(`Brands/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brand),
  })
}
