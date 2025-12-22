import "./card.css";
import { AiOutlineSound } from "react-icons/ai";
import Loading from "./loading";

interface CardProps {
  words: any[]; // 這裡的類型可以根據你的 Word 介面調整
  isLoading: boolean;
  error: string | null;
}

function speakFrench(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  speechSynthesis.speak(utterance);
}

export default function Card({ words, isLoading }: CardProps) {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="card__wrapper">
          {words.map((word, index) => (
            <div className="card__box" key={index}>
              <div className="card__title__wrapper">
                <h3 className="card__title">{word.french}</h3>
                <button
                  className="card__speak__btn"
                  onClick={() => speakFrench(word.french)}
                  aria-label="發音"
                >
                  <AiOutlineSound />
                </button>
              </div>
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
              {word.notes && <p className="card__notes">{word.notes}</p>}
              <ul className="card__example__box">
                {[
                  { fr: word.example1_fr, cn: word.example1_cn },
                  { fr: word.example2_fr, cn: word.example2_cn },
                  { fr: word.example3_fr, cn: word.example3_cn },
                ]
                  .filter((example) => example.fr || example.cn)
                  .map((example, idx) => (
                    <div className="card__example" key={idx}>
                      <div className="example__french">
                        <li>{example.fr}</li>
                        {example.fr && (
                          <button
                            className="card__speak__btn"
                            onClick={() => speakFrench(example.fr)}
                            aria-label="發音"
                          >
                            <AiOutlineSound />
                          </button>
                        )}
                      </div>
                      <li>{example.cn}</li>
                    </div>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
