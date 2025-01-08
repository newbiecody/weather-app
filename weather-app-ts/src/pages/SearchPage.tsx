import { useMemo, useState } from "react";
import InfoChip from "../components/InfoChip";
import SearchBar from "../components/SearchBar";
import countryList from "../data/countryList.json";
import { getWeatherByCountryName } from "../api/openWeatherMap";
import useLocalStorage from "../hooks/useLocalStorage";
import {
  convertPosixTimestampToHumanReadable,
  kelvinToDegrees,
} from "../utils";

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

  const latestWeatherDataEntry = useMemo(() => {
    const weatherDataEntries = Object.values(storedWeatherData);
    return weatherDataEntries[weatherDataEntries.length - 1];
  }, [storedWeatherData]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col space-y-2 w-80 md:w-[700px]">
        <SearchBar
          label="Country"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          options={options}
          handleSearch={async () => {
            const weatherData = await getWeatherByCountryName(searchTerm);
            if (weatherData) {
              const {
                weather: { main },
                main: { temp, temp_min, temp_max, humidity },
                dt,
              } = weatherData;
              setStoredWeatherData((prev) => ({
                ...prev,
                [searchTerm]: {
                  temp: temp,
                  tempHigh: temp_max,
                  tempLow: temp_min,
                  country: searchTerm,
                  weatherType: main,
                  humidity: humidity,
                  timestamp: dt,
                },
              }));
            }
          }}
        />
        <div className="bg-opacity-20 bg-white border border-white border-opacity-50 rounded-[20px] shadow-sm">
          {!!latestWeatherDataEntry && (
            <div className="flex justify-between">
              <div className="align-bottom">
                <div className="font-bold">Today's Weather</div>
                <div className="text-5xl text-[#6C40BF] font-bold">
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
          <div className="flex flex-col space-y-2 bg-white bg-opacity-20 border-opacity-40  rounded-2xl p-4">
            <div>Search History</div>
            {Object.entries(storedWeatherData).map(
              ([countryName, weatherData]) => (
                <InfoChip
                  key={`${weatherData.timestamp}-${countryName}`}
                  header={countryName}
                  extraInfo={convertPosixTimestampToHumanReadable(
                    weatherData.timestamp
                  )}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
