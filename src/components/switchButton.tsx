import { useFetchWords } from "../hooks/useGetWords";
const sheetName = ["連接詞", "限定詞", "代詞", "副詞", "介詞"];

export default function SwitchButton() {
  const {
    words,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalWords,
    setCurrentPage,
    setActiveSheet,
    activeSheet,
  } = useFetchWords("連接詞");

  const currentSheet =
    sheetName.find((name) => name === words[0]?.type) || "單字類型";

  return (
    <>
      <div className="sheet-tabs">
        {sheetName.map((name) => (
          <button key={name} onClick={() => setActiveSheet(name)}>
            {name}
          </button>
        ))}
      </div>
      <h2>{activeSheet}</h2>
    </>
  );
}
