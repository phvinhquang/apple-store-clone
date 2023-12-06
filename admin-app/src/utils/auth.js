// export const tokenLoader = function () {
//   const token = sessionStorage.getItem("token") ?? "";

//   return token;
// };

// export const emailLoader = function () {
//   const email = sessionStorage.getItem("email") ?? "";

//   return email;
// };

export const serverUrl = "http://localhost:5000/";

export const getTokenDuration = function () {
  const storedExpiryDate = sessionStorage.getItem("tokenExpiryDate");
  const expiryDate = new Date(storedExpiryDate);
  const now = new Date();
  const duration = expiryDate.getTime() - now.getTime();

  return duration;
};

export const getToken = function () {
  const token = sessionStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};
