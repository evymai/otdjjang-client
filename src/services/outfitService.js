import { createWithResponse, fetchWithResponse, fetchWithoutResponse, fetchWithoutStatus } from "./fetcher"

export const getOutfits = async () => {
  return await fetchWithResponse("outfits", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const deleteOutfit = async (id) => {
  return await fetchWithoutResponse(`outfits/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const addOutfit = async (outfit) => {
  return await createWithResponse(`outfits`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outfit),
  })
}

export const getOutfitById = async (outfitId) => {
  return await fetchWithResponse(`outfits/${outfitId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const getFullOutfitArticlesById = async (outfitId) => {
  return await fetchWithResponse(`outfitarticles/${outfitId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const addOutfitArticle = async (outfitArticle) => {
  return await createWithResponse(`outfitarticles`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(outfitArticle),
  })
}

export const deleteOutfitArticle = async (id) => {
  return await fetchWithoutResponse(`outfitarticles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}
