interface IRoundedButton {
  text: string;
  onClick?: () => {};
}

function RoundedButton({ text, onClick }: IRoundedButton) {
  return (
    <button
      type="button"
      className="rounded-full shadow-md size-[34px] bg-white"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default RoundedButton;
