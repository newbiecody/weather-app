// import { ReactComponent  as DeleteIcon } from "../assets/delete.svg";
// import { ReactComponent  as SearchIcon } from "../assets/search.svg";

import RoundedButton from "./RoundedButton";

interface IInfoChip {
  header: string;
  extraInfo: string;
  onDelete?: () => void;
  onViewDetails?: () => void;
}

function InfoChip({ header, extraInfo }: IInfoChip) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white bg-opacity-40 min-w-72 text-sm text-black shadow-md p-2">
      <div className="md:flex md:justify-between w-full pr-2">
        <div className="flex justify-start">{header}</div>
        <div className="flex justify-start">{extraInfo}</div>
      </div>
      <div className="flex space-x-2">
        <RoundedButton text="Deet" />
        <RoundedButton text="Del" />
      </div>
    </div>
  );
}

export default InfoChip;
