import { ReactNode } from "react";

interface IRoundedButton {
  children: ReactNode;
  onClick?: () => void;
}

function RoundedButton({ children, onClick }: IRoundedButton) {
  return (
    <button
      type="button"
      className="flex justify-center items-center rounded-full shadow-md size-[34px] bg-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default RoundedButton;
