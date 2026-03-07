interface IVariantsButton {
  attribute: string;
}
export default function VariantsButton({ attribute }: IVariantsButton) {
  return (
    <button
      className="py-2 px-4 rounded-full w-fit items-center bg-black/10 h-fit my-1"
      aria-label="Drecease quantity"
    >
      {attribute}
    </button>
  );
}
