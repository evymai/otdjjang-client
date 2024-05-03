import { fetchWithResponse, fetchWithoutResponse, fetchWithoutStatus } from "./fetcher"

export const getArticles = async () => {
  return await fetchWithResponse("articles", {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const getArticlesById = async (id) => {
  return await fetchWithResponse(`articles/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const deleteArticle = async (id) => {
  return await fetchWithoutResponse(`articles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
  })
}

export const addArticle = async (article) => {
  return await fetchWithResponse(`articles`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  })
}

export const editArticle = async (id, article) => {
  return await fetchWithoutResponse(`articles/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  })
}
