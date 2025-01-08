interface IInfoChip {
    header: string;
    extraInfo: string;
    onDelete?: () => void;
    onViewDetails?: () => void;
}
declare function InfoChip({ header, extraInfo, }: IInfoChip): import("react").JSX.Element;
export default InfoChip;
