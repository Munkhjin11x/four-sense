/**
 * Token utilities for handling localStorage with expiration
 */

interface TokenData {
  token: string;
  expiresAt: number;
}

/**
 * Set token in localStorage with expiration duration
 * @param token - The token to store
 * @param durationInHours - Duration in hours (default: 24 hours)
 */
export const setTokenWithExpiration = (
  token: string,
  durationInHours: number = 24
): void => {
  const now = Date.now();
  const expiresAt = now + durationInHours * 60 * 60 * 1000; // Convert hours to milliseconds

  const tokenData: TokenData = {
    token,
    expiresAt,
  };

  localStorage.setItem("token", JSON.stringify(tokenData));
};

/**
 * Get token from localStorage if it hasn't expired
 * @returns The token if valid, null if expired or doesn't exist
 */
export const getValidToken = (): string | null => {
  try {
    const storedData = localStorage.getItem("token");

    if (!storedData) {
      return null;
    }

    const tokenData: TokenData = JSON.parse(storedData);
    const now = Date.now();

    // Check if token has expired
    if (now > tokenData.expiresAt) {
      // Token expired, remove it
      localStorage.removeItem("token");
      return null;
    }

    return tokenData.token;
  } catch (error) {
    console.error("Error parsing token data:", error);
    // If there's an error parsing, remove the corrupted data
    localStorage.removeItem("token");
    return null;
  }
};

/**
 * Remove token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem("token");
};

/**
 * Check if token exists and is valid
 */
export const isTokenValid = (): boolean => {
  return getValidToken() !== null;
};

/**
 * Get token expiration time in milliseconds
 * @returns Expiration timestamp or null if no valid token
 */
export const getTokenExpiration = (): number | null => {
  try {
    const storedData = localStorage.getItem("token");

    if (!storedData) {
      return null;
    }

    const tokenData: TokenData = JSON.parse(storedData);
    return tokenData.expiresAt;
  } catch (error) {
    console.error("Error getting token expiration:", error);
    return null;
  }
};

/**
 * Get remaining time until token expires
 * @returns Remaining time in milliseconds, or 0 if expired/invalid
 */
export const getTokenTimeRemaining = (): number => {
  const expiration = getTokenExpiration();

  if (!expiration) {
    return 0;
  }

  const remaining = expiration - Date.now();
  return Math.max(0, remaining);
};
