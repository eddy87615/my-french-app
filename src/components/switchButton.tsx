import "./switchButton.css";

const sheetName = ["名詞", "動詞", "連接詞", "限定詞", "代詞", "副詞", "介詞"];
interface SwitchProps {
  activeSheet: string;
  setActiveSheet: (sheet: string) => void;
}

export default function SwitchButton({
  activeSheet,
  setActiveSheet,
}: SwitchProps) {
  return (
    <>
      <div className="switch__button__wrapper">
        {sheetName.map((name) => (
          <button
            key={name}
            onClick={() => setActiveSheet(name)}
            className="switch__button"
          >
            {name}
          </button>
        ))}
      </div>
      <h2>{activeSheet}</h2>
    </>
  );
}
