const API_KEY = process.env.REACT_APP_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
  console.warn('Missing OMDb API key. Set REACT_APP_OMDB_API_KEY in .env');
}

const buildUrl = (params) => {
  const query = new URLSearchParams({ apikey: API_KEY, ...params });
  return `${BASE_URL}?${query.toString()}`;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!data || data.Response === 'False') {
    throw new Error(data.Error || 'Unexpected API error');
  }
  return data;
};

export const searchMovies = async (searchTerm) => {
  if (!searchTerm) {
    return [];
  }

  const response = await fetch(buildUrl({ s: searchTerm.trim(), type: 'movie' }));
  const data = await handleResponse(response);
  return data.Search || [];
};

export const getMovieById = async (imdbID) => {
  if (!imdbID) {
    throw new Error('Missing movie identifier');
  }

  const response = await fetch(buildUrl({ i: imdbID, plot: 'full' }));
  return handleResponse(response);
};
