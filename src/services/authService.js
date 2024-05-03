import { createWithResponse, fetchWithResponse, fetchWithoutResponse } from "./fetcher"

export function login(user) {
  return fetchWithResponse("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export function register(user) {
  return createWithResponse("register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

export const editUserInfo = async (user) => {
  return await fetchWithoutResponse(`users/${user.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}
