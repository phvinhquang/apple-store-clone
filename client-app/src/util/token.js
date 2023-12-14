export const getTokenDuration = function () {
  const storedExpiryDate = localStorage.getItem("tokenExpiryDate");
  const expiryDate = new Date(storedExpiryDate);
  const now = new Date();
  const duration = expiryDate.getTime() - now.getTime();

  return duration;
};

export const getToken = function () {
  const token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const getUserId = function () {
  const userId = localStorage.getItem("userId");

  return userId;
};
