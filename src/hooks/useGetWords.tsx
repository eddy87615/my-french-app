import { useEffect, useState, useCallback } from "react";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
const DEFAULT_ITEMS_PER_PAGE = 50; // 每頁顯示 50 筆

interface Word {
  french: string;
  chinese: string;
  type: string;
  gender: string;
  phonetic: string;
  example1_fr: string;
  example1_cn: string;
  example2_fr: string;
  example2_cn: string;
  example3_fr: string;
  example3_cn: string;
  notes: string;
}
interface FetchResult {
  words: Word[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalWords: number;
  setCurrentPage: (page: number) => void;
  setActiveSheet: (sheet: string) => void; // 用來切換單字類型的函式
  activeSheet: string;
}
/**
 * Custom Hook: 負責從 Google Sheets API 獲取指定工作表的單字，並處理分頁邏輯。
 * @param initialSheetName 應用程式啟動時預設載入的工作表名稱（例如 '連接詞'）
 */
export const useFetchWords = (initialSheetName: string): FetchResult => {
  const [activeSheet, setActiveSheet] = useState(initialSheetName);
  const [currentPage, setCurrentPage] = useState(1);

  // 資料狀態
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 總數狀態
  const [totalWords, setTotalWords] = useState(0);
  const totalPages = Math.ceil(totalWords / DEFAULT_ITEMS_PER_PAGE);

  // ------------------------------------------------
  // 步驟 A: 獲取總單字數量 (只需要在切換工作表時執行一次)
  // ------------------------------------------------
  useEffect(() => {
    // 檢查是否所有必要的變數都已存在
    if (!API_KEY || !SHEET_ID || !activeSheet) return;

    // 請求整個 A 欄來確定總行數 (非常輕量的請求)
    const fetchTotalCount = async () => {
      // 請求整個 A 欄: [sheetName]!A:A
      const countUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${activeSheet}!A:A?key=${API_KEY}`;

      try {
        const response = await fetch(countUrl);
        if (!response.ok) {
          throw new Error(`無法取得總數。狀態碼: ${response.status}`);
        }
        const data = await response.json();

        // 總單字數 = 陣列長度 - 1 (扣除標題列)
        // 如果 data.values 存在，長度就是總行數
        const count = data.values ? data.values.length - 1 : 0;

        setTotalWords(count);

        // 【重要】重設頁碼：切換工作表時，應回到第 1 頁
        setCurrentPage(1);
      } catch (err) {
        console.error("Fetch total count error:", err);
        setError("無法連接 Google Sheets，請檢查網路或 API 設定。");
        setTotalWords(0);
      }
    };

    fetchTotalCount();
  }, [activeSheet]); // 只有當 activeSheet 改變時才執行

  // ------------------------------------------------
  // 步驟 B: 獲取當前頁面的單字資料 (在頁碼或工作表切換時執行)
  // ------------------------------------------------
  useEffect(() => {
    if (totalWords === 0 || !activeSheet) {
      if (totalWords === 0 && !isLoading) return; // 避免在沒有資料時無限循環
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    // 1. 計算 Range
    const startRow = (currentPage - 1) * DEFAULT_ITEMS_PER_PAGE + 2; // +2 因為 A1 是標題
    const endRow = currentPage * DEFAULT_ITEMS_PER_PAGE + 1;

    // 2. 組裝 URL
    const range = `${activeSheet}!A${startRow}:N${endRow}`;
    const pageUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

    const fetchPageData = async () => {
      try {
        const response = await fetch(pageUrl);
        if (!response.ok) {
          throw new Error("網路請求失敗");
        }
        const data = await response.json();

        // 處理資料
        const wordData: Word[] =
          data.values?.map((row: string[]) => ({
            french: row[0] || "",
            chinese: row[1] || "",
            type: row[2] || "",
            gender: row[3] || "",
            phonetic: row[4] || "",
            level: row[5] || "",
            example1_fr: row[6] || "",
            example1_cn: row[7] || "",
            example2_fr: row[8] || "",
            example2_cn: row[9] || "",
            example3_fr: row[10] || "",
            example3_cn: row[11] || "",
            conjugation: row[12] || "",
            notes: row[13] || "",
          })) || [];

        setWords(wordData);
        setIsLoading(false);
      } catch (err) {
        console.error("Fetch page data error:", err);
        setError(`載入第 ${currentPage} 頁數據失敗: ${(err as Error).message}`);
        setIsLoading(false);
        setWords([]); // 清空數據
      }
    };

    fetchPageData();
  }, [activeSheet, currentPage, totalWords]); // 依賴項：工作表、頁碼、總數

  // ------------------------------------------------
  // 步驟 C: 返回給組件的資料和控制函式
  // ------------------------------------------------
  return {
    words,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalWords,
    setCurrentPage,
    setActiveSheet,
    activeSheet,
  };
};
