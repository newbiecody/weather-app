import { useEffect, useMemo, useState } from "react";
import InfoChip from "../components/InfoChip";
import SearchBar from "../components/SearchBar";
import countryList from "../data/countryList.json";
import { getWeatherByCountryName } from "../api/openWeatherMap";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  convertPosixTimestampToHumanReadable,
  isWithinSameDay,
  kelvinToDegrees,
} from "../utils";
import cloudImagePath from "../assets/cloud.png";
import sunImagePath from "../assets/sun.png";

type IWeatherDataLocalStorage = Record<
  string,
  {
    temp: number;
    tempHigh: number;
    tempLow: number;
    country: string;
    weatherType: string;
    humidity: number;
    timestamp: number;
    lat: number;
    lon: number;
  }
>;

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const options = !!searchTerm
    ? countryList
        .filter((countryData) =>
          countryData.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase().trim())
        )
        .map((countryData) => countryData.name.common)
    : [];

  const [storedWeatherData, setStoredWeatherData] =
    useLocalStorage<IWeatherDataLocalStorage>(
      "weather",
      {} as IWeatherDataLocalStorage
    );

  const checkCountryWeather = async (countryName: string) => {
    const weatherData = await getWeatherByCountryName(countryName);
    if (weatherData) {
      const {
        weather,
        main: { temp, temp_min, temp_max, humidity },
        dt,
        lat,
        lon,
      } = weatherData;
      setStoredWeatherData((prev) => ({
        ...prev,
        [countryName]: {
          temp: temp,
          tempHigh: temp_max,
          tempLow: temp_min,
          country: countryName,
          weatherType: weather[0]?.main ?? "",
          humidity: humidity,
          timestamp: dt,
          lat: lat,
          lon: lon,
        },
      }));
    }
  };
  const latestWeatherDataEntry = useMemo(() => {
    const weatherDataEntries = Object.values(storedWeatherData);
    return weatherDataEntries[weatherDataEntries.length - 1];
  }, [storedWeatherData]);

  useEffect(() => {
    const checkIsWeatherDataUpdated = async () => {
      if (latestWeatherDataEntry) {
        const currentDate = new Date().getTime();
        const latestEntryDate = latestWeatherDataEntry.timestamp * 1000;

        if (!isWithinSameDay(currentDate, latestEntryDate)) {
          await checkCountryWeather(latestWeatherDataEntry.country);
        }
      }
    };
    checkIsWeatherDataUpdated();
  }, []);

  const isSearchDisabled = useMemo(() => {
    if (!searchTerm) return true;

    const searchTextLowerCase = searchTerm.toLowerCase();
    return (
      options.length !== 1 ||
      (!options.find(
        (option) => option.toLowerCase() === searchTextLowerCase
      ) &&
        options[0].toLowerCase() !== searchTextLowerCase)
    );
  }, [options, searchTerm]);

  const weatherImageSrc = () => {
    // Only provide 2 types due to lack of image assets
    if (latestWeatherDataEntry.weatherType === "Clouds") {
      return cloudImagePath;
    }
    if (latestWeatherDataEntry.weatherType === "Clear") {
      return sunImagePath;
    }
    return undefined;
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-16 w-80 md:w-[700px]">
        <SearchBar
          isSearchDisabled={isSearchDisabled}
          label="Country"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          options={options}
          handleSearch={async () => {
            await checkCountryWeather(searchTerm);
          }}
        />
        <div className="flex flex-col space-y-2 bg-opacity-20 bg-white border border-white border-opacity-50 rounded-[20px] shadow-lg p-4">
          {!!latestWeatherDataEntry && (
            <div className="flex justify-between">
              <div className="align-bottom">
                <div className="font-bold">Today's Weather</div>
                <div className="text-3xl md:text-5xl text-[#6C40BF] font-bold">
                  {kelvinToDegrees(latestWeatherDataEntry.temp)}&deg;C
                </div>
                <div>
                  H: {kelvinToDegrees(latestWeatherDataEntry.tempHigh)}&deg;C L:{" "}
                  {kelvinToDegrees(latestWeatherDataEntry.tempLow)}&deg;C
                </div>
                <div className="font-bold text-[#666666]">
                  {latestWeatherDataEntry.country}
                </div>
              </div>
              <div className="flex flex-col text-[#666666] text-sm text-right justify-end">
                <img className="absolute size-40 top-14" src={weatherImageSrc()}></img>
                <div>{latestWeatherDataEntry.weatherType}</div>
                <div>Humidity: {latestWeatherDataEntry.humidity}%</div>
                <div>
                  {convertPosixTimestampToHumanReadable(
                    latestWeatherDataEntry.timestamp
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col space-y-2 bg-white bg-opacity-20 border-opacity-40 rounded-2xl p-4">
            <div>
              {Object.entries(storedWeatherData).length > 0
                ? "Search History"
                : "No results..."}
            </div>
            {Object.entries(storedWeatherData)
              .reverse()
              .map(([countryName, weatherData]) => (
                <InfoChip
                  key={`${weatherData.timestamp}-${countryName}`}
                  header={countryName}
                  extraInfo={convertPosixTimestampToHumanReadable(
                    weatherData.timestamp
                  )}
                  onDelete={() => {
                    setStoredWeatherData((prev) => {
                      let prevData = { ...prev };
                      delete prevData[countryName];
                      return prevData;
                    });
                  }}
                  onViewDetails={async () => {
                    await checkCountryWeather(countryName);
                  }}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
