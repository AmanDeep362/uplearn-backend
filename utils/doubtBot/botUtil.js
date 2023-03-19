const axios = require("axios");

// API KEYS For Rapid API
const RAPID_API_KEY = "a2c6754f15msh7fbc3a77f87af08p135901jsn8c82bc01a4a0";
const RAPID_API_HOST = "google-search3.p.rapidapi.com";

// returns the URL for searching with all options and parameters set
function doubtBotUrl(queryString) {
  const url = `https://google-search3.p.rapidapi.com/api/v1/search/q=${queryString}`;
  const options = {
    method: "GET",
    url: url,
    headers: {
      "X-User-Agent": "desktop",
      "X-Proxy-Location": "IN",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
  };
  return options;
}

// Returns all the results for the given query
/*
    return Type : Array of Objects
    [
        {
            title            : "title",
            link             : "link",
            description      : "description",
            additional_links : [Array],
            cite             : [Object]
        }
    ]
*/
async function doubtBotData(query) {
  const options = doubtBotUrl(query);
  try {
    const response = await axios(options);
    return response.data.results;
  }
  catch (error) {
    return [];
  }
}

module.exports = doubtBotData;
