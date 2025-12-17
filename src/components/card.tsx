import { useFetchWords } from "../hooks/useGetWords";
import SwitchButton from "./switchButton";

export default function Card() {
  const {
    words,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalWords,
    setCurrentPage,
    setActiveSheet,
  } = useFetchWords("連接詞");

  return (
    <>
      <SwitchButton />
      {isLoading && <p>載入中...</p>}
      <div>
        {words.map((word, index) => (
          <ul key={index}>
            <li>{word.french}</li>
            <li>{word.chinese}</li>
            <li>
              <ul>
                <li>{word.example1_fr}</li>
                <li>{word.example1_cn}</li>
                <li>{word.example2_fr}</li>
                <li>{word.example2_cn}</li>
                <li>{word.example3_fr}</li>
                <li>{word.example3_cn}</li>
              </ul>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
}
