import { fetchWithResponse, fetchWithoutResponse, fetchWithoutStatus } from "./fetcher"

export const getTypes = async () => {
  return await fetchWithResponse("types", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const getTypeById = async (id) => {
  return await fetchWithResponse(`types/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}



