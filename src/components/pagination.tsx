import "./pagination.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
        className="pagination__button"
      >
        <IoIosArrowBack />
      </button>

      <span className="pagination__pages">
        {" "}
        {currentPage}/{totalPages}(總計 {totalWords} 筆){" "}
      </span>

      <button
        disabled={currentPage === totalPages || isLoading}
        onClick={() => {
          setCurrentPage(currentPage + 1);
          window.scrollTo(0, 0);
        }}
        className="pagination__button"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}
