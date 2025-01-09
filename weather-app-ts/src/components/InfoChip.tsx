import deleteIconPath from "../assets/delete.svg";
import searchIconPath from "../assets/search.svg";
import RoundedButton from "./RoundedButton";

interface IInfoChip {
  header: string;
  extraInfo: string;
  onDelete?: () => void;
  onViewDetails?: () => void;
}

function InfoChip({ header, extraInfo, onDelete, onViewDetails }: IInfoChip) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white bg-opacity-40 md:min-w-72 text-sm text-black shadow-md p-2">
      <div className="md:flex md:justify-between w-full pr-2">
        <div className="flex justify-start text-sm">{header}</div>
        <div className="flex justify-start text-[10px] md:text-sm">
          {extraInfo}
        </div>
      </div>
      <div className="flex space-x-2">
        <RoundedButton onClick={onDelete}>
          <img
            src={deleteIconPath}
            alt={`Delete ${header} temperature history`}
          />
        </RoundedButton>
        <RoundedButton onClick={onViewDetails}>
          <img src={searchIconPath} alt={`Search ${header} temperature`} />
        </RoundedButton>
      </div>
    </div>
  );
}

export default InfoChip;
