import { useState, Dispatch, SetStateAction, useEffect, useRef } from "react";
import searchIconPath from "../assets/search.svg";
import classNames from "classnames";

interface ISearchBar {
  label: string;
  handleSearch: () => void;
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  options: string[];
  errorMsg?: string;
  isSearchDisabled?: boolean;
}

function SearchBar({
  label,
  handleSearch,
  searchTerm,
  setSearchTerm,
  options,
  // errorMsg,
  isSearchDisabled,
}: ISearchBar) {
  const [showOptions, setShowOptions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [widthOfOptionsDropdown, setWidthOfOptionsDropdown] = useState(
    inputRef.current?.offsetWidth
  );
  useEffect(() => {
    if (inputRef?.current?.offsetWidth)
      setWidthOfOptionsDropdown(inputRef.current?.offsetWidth);
  });

  return (
    <div className="flex w-full space-x-2">
      <div className="w-full">
        <div className="bg-opacity-20 rounded-lg bg-white pt-1 px-2 shadow-md">
          <div className="text-[10px]">{label}</div>
          <input
            ref={inputRef}
            className="w-full focus:border-none focus:outline-none bg-white bg-opacity-0 relative top-[-2px]"
            type="text"
            onChange={(e) => {
              const newSearchTerm = e.target.value;
              setSearchTerm(newSearchTerm);
              setShowOptions(!!newSearchTerm);
            }}
            value={searchTerm}
          />
        </div>

        {showOptions && (
          <div className="overflow-auto">
            <div className="grid grid-cols-1 divide-y max-h-40 overflow-auto text-sm px-2 z-10 absolute top-[64px] bg-[#BCA6E8] shadow-md rounded-lg">
              {options.length > 0 ? (
                options.map((optionText) => (
                  <div
                    key={`searchbar-option-${optionText}`}
                    className="hover:cursor-pointer py-1"
                    style={{ width: `${widthOfOptionsDropdown}px` }}
                    onClick={() => {
                      setSearchTerm(optionText);
                      setShowOptions(false);
                    }}
                  >
                    {optionText}
                  </div>
                ))
              ) : (
                <div
                  className="py-1"
                  style={{ width: `${widthOfOptionsDropdown}px` }}
                >
                  No matching country name...
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <button
        disabled={isSearchDisabled}
        className={classNames(
          "flex justify-center items-center bg-[#6C40BF] rounded-lg size-10 text-white shadow-md",
          {
            "opacity-60": isSearchDisabled,
          }
        )}
        type="button"
        onClick={() => {
          setShowOptions(false);
          handleSearch();
          setSearchTerm("");
        }}
      >
        <img src={searchIconPath} alt={`Check country's temperature`} />
      </button>
    </div>
  );
}
export default SearchBar;
