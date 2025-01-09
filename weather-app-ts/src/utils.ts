export const kelvinToDegrees = (temp: number) => {
  return (temp - 273.15).toFixed(2);
};

export const convertPosixTimestampToHumanReadable = (timestamp: number) => {
  const dateObject = new Date(timestamp * 1000);
  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const isPm = hours >= 12;
  return `${day}-${month}-${year} ${hours % 12}:${minutes} ${
    isPm ? "PM" : "AM"
  }`;
};

export const isWithinSameDay = (timestampOne: number, timestampTwo: number) => {
  const dateOne = new Date(timestampOne);
  const dateTwo = new Date(timestampTwo);

  const dayOne = dateOne.getDate();
  const monthOne = dateOne.getMonth();
  const yearOne = dateOne.getFullYear();

  const dayTwo = dateTwo.getDate();
  const monthTwo = dateTwo.getMonth();
  const yearTwo = dateTwo.getFullYear();

  return dayOne === dayTwo && monthOne === monthTwo && yearOne === yearTwo;
};
