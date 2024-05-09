import {
  createWithResponse,
  fetchWithResIgnoreError,
  fetchWithResponse,
  fetchWithoutResponse,
  fetchWithoutStatus,
} from "./fetcher"

export const getOutfitPhotos = async () => {
  return await fetchWithResponse("outfitphotos", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const deleteOutfitPhoto = async (id) => {
  return await fetchWithoutResponse(`outfitphotos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const addOutfitPhoto = async (formData) => {
  return await createWithResponse(`outfitphotos`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: formData,
  })
}

export const getOutfitPhotoByOutfitId = async (outfitId) => {
  return await fetchWithResIgnoreError(`outfitphotos/${outfitId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}
