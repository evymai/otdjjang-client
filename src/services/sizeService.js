import { fetchWithResponse, fetchWithoutResponse, fetchWithoutStatus } from "./fetcher"

export const getSizes = async () => {
  return await fetchWithResponse("sizes", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const getSizeById = async (id) => {
  return await fetchWithResponse(`sizes/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}



