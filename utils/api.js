import { API_URL, STRAPI_URL } from "./utils";

export const fetchDataFromApi = async (endpoints) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer " + STRAPI_URL,
    },
  };

  const res = await fetch(`${API_URL}${endpoints}`, options);
  const data = await res.json();
  return data;
};

export const makePaymentMethod = async (endpoints, payload) => {
  const res = await fetch(`${API_URL}${endpoints}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + STRAPI_URL,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};
