import ky from "ky";

export const api = ky.create({
  prefixUrl: "https://ask-me-anything-bljf.onrender.com",
});
