export const getJwt = (): string => {
  return localStorage.getItem("jwt") || "";
};
