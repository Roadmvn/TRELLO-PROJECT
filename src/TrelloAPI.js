// TrelloAPI.js

const fetch = require("node-fetch");

const API_KEY = process.env.API_KEY;
const API_TOKEN = process.env.API_TOKEN;

/**
 * Base URL for Trello API
 */
const baseURL = "https://api.trello.com/1";

/**
 * Fetch wrapper to include authentication in every request
 * @param {string} url - The URL path, excluding the base Trello URL
 * @param {Object} options - Fetch options including method, headers, etc.
 * @returns {Promise<Response>} The fetch promise
 */
const fetchWithAuth = async (url, options = {}) => {
  // Ensure the URL starts with '/'
  if (!url.startsWith("/")) {
    url = "/" + url;
  }

  const urlWithAuth = `${baseURL}${url}?key=${API_KEY}&token=${API_TOKEN}`;

  return fetch(urlWithAuth, {
    ...options,
    headers: {
      ...options.headers,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

module.exports = { fetchWithAuth };
