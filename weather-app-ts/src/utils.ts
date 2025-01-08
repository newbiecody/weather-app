export const kelvinToDegrees = (temp: number) => {
  return (temp - 273.15).toFixed(2);
};

export const convertPosixTimestampToHumanReadable = (timestamp: number) => {
  const dateObject = new Date(timestamp);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const isPm = hours >= 12;
  return `${day}-${month}-${year} ${hours % 12}:${minutes} ${
    isPm ? "pm" : "am"
  }`;
};
