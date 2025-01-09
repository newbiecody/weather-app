// Obtained from https://openweathermap.org/weather-conditions.
// TODO: Further update data and to use if there are more image assets for weather conditions
export const WEATHER_CONDITIONS_MAP: Record<string, number[]> = {
  thunderstorm: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  drizzle: [300, 301, 302, 310, 311, 312, 313, 314, 321],
  rain: [500, 501, 502, 503, 504, 511, 520, 521, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  atmostphere: [701, 711, 721, 731, 741, 751, 761, 771, 781],
  clear: [800],
  clouds: [801, 802, 803, 804],
};
