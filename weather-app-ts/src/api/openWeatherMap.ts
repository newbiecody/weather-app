const apiKey = import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY;
const GET_WEATHER_BASE_URI = "https://api.openweathermap.org/data/2.5/weather?";
export const getWeatherData = async (lat: string, lon: string) => {
  try {
    const getWeatherResponse = await fetch(
      GET_WEATHER_BASE_URI +
        new URLSearchParams({
          lat: lat,
          lon: lon,
          appid: apiKey,
        }).toString()
    );
    if (!getWeatherResponse.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await getWeatherResponse.json();
    return result;
  } catch (e) {
    return null;
  }
};

const GET_GEO_BASE_URI = "http://api.openweathermap.org/geo/1.0/direct?";
export const getGeoDataByCountryName = async (countryName: string) => {
  try {
    const getGeoResponse = await fetch(
      GET_GEO_BASE_URI +
        new URLSearchParams({
          q: countryName,
          appid: apiKey,
        }).toString()
    );

    if (!getGeoResponse.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await getGeoResponse.json();
    return result;
  } catch (err) {
    return null;
  }
};

export const getWeatherByCountryName = async (countryName: string) => {
  const geoData = await getGeoDataByCountryName(countryName);
  if (geoData) {
    const { lat, lon } = geoData[0];
    const weatherData = await getWeatherData(lat, lon);
    if (weatherData) {
      return { ...weatherData, lat, lon };
    } else {
      return null;
    }
  } else {
    return null;
  }
};
