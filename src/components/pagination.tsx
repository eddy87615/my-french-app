interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalWords: number;
  setCurrentPage: (page: number) => void;
  isLoading: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalWords,
  setCurrentPage,
  isLoading,
}: PaginationProps) {
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1 || isLoading}
        onClick={() => {
          setCurrentPage(currentPage - 1);
          window.scrollTo(0, 0); // 換頁後自動回到最上面
        }}
      >
        上一頁
      </button>

      <span>
        {" "}
        第 {currentPage} 頁 / 共 {totalPages} 頁 (總計 {totalWords} 筆){" "}
      </span>

      <button
        disabled={currentPage === totalPages || isLoading}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          window.scrollTo(0, 0);
        }}
      >
        下一頁
      </button>
    </div>
  );
}
