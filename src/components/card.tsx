import "./card.css";

interface CardProps {
  words: any[]; // 這裡的類型可以根據你的 Word 介面調整
  isLoading: boolean;
  error: string | null;
}

export default function Card({ words, isLoading }: CardProps) {
  return (
    <>
      {isLoading ? (
        <p>載入中...</p>
      ) : (
        <div className="card__wrapper">
          {words.map((word, index) => (
            <div className="card__box" key={index}>
              <h3>{word.french}</h3>
              {word.gender === "-" ? (
                ""
              ) : (
                <p
                  className={`card__gender${
                    word.gender === "m"
                      ? "--m"
                      : word.gender === "m/f"
                      ? "--mf"
                      : "--f"
                  }`}
                >
                  {word.gender}
                </p>
              )}
              <p>{word.phonetic}</p>
              <p>{word.chinese}</p>
              <ul className="card__example__box">
                <div className="card__example">
                  <li>{word.example1_fr}</li>
                  <li>{word.example1_cn}</li>
                </div>
                <div className="card__example">
                  <li>{word.example2_fr}</li>
                  <li>{word.example2_cn}</li>
                </div>
                <div className="card__example">
                  <li>{word.example3_fr}</li>
                  <li>{word.example3_cn}</li>
                </div>
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
