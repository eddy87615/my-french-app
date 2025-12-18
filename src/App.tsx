import { useFetchWords } from "./hooks/useGetWords";
import Card from "./components/card";
import Pagination from "./components/pagination";
import SwitchButton from "./components/switchButton";
import "./App.css";

function App() {
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
  } = useFetchWords("名詞");

  return (
    <>
      <h1>EDDY的法文單字書</h1>
      <SwitchButton activeSheet={activeSheet} setActiveSheet={setActiveSheet} />
      <Card words={words} isLoading={isLoading} error={error} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalWords={totalWords}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
