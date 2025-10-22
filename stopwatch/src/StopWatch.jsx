import { useState, useRef, useEffect } from "react";

export default function Stopwatch() {
  // 시작한 시간
  // - 값이 바뀌어도 화면을 다시 그릴 필요 없음 (단순 계산용)
  // - .current로 값에 접근: startTime.current
  const startTime = useRef(0);

  // 인터벌함수의 id
  const intervalId = useRef(null);

  // secondsPassed: 지금까지 지난 시간 (밀리초 단위)
  // useState(0)을 쓰는 이유:
  // - 이 값이 바뀌면 화면의 시간 표시도 바뀌어야 하니까!
  // - setSecondsPassed()로 값을 바꾸면 React가 화면을 자동으로 다시 그림
  const [secondsPassed, setSecondsPassed] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stopCount, setStopCount] = useState(0);
  const [startCount, setStartCount] = useState(0);
  const [showDescription, setShowDescription] = useState(false); // 설명 표시 상태

  function handleStart() {
    setIsRunning(true);
    // 10시 10분 5초 시작버튼을 누름. 10초가 지나서 stop 버튼을 누름. --> 10시 10분 15초

    // 30초 뒤에 다시 타이머를 시작합니다. 현재 시간은 --> 10시 10분 45초

    startTime.current = Date.now() - secondsPassed;
    // setNow(Date.now());

    intervalId.current = setInterval(() => {
      // setNow(Date.now());
      // if (startTime.current !== null && now !== null) {
      setSecondsPassed(Date.now() - startTime.current); // 기본 단위가 밀리세컨드이기 때문에 초단위로 표현하기 위해서 1000을 나눕니다.
      // }
    }, 10);
    setStartCount((prev) => prev + 1);
  }

  function handleStop() {
    setIsRunning(false);
    // clearInterval: "setInterval 반복 실행 멈추기"
    // intervalId.current에 저장된 ID를 가진 setInterval을 정지시킴
    clearInterval(intervalId.current);
    setStopCount((prev) => prev + 1);
  }

  // let secondsPassed = 0;

  function handleReset() {
    setIsRunning(false);
    clearInterval(intervalId.current);
    setSecondsPassed(0);
    setLaps([]);
    setStopCount(0);
  }

  function handleLap() {
    // [...laps, secondsPassed]: 기존 배열(...laps)에 새 값(secondsPassed) 추가
    // ...: spread 연산자 - 배열을 펼쳐줌
    // 예시: [1000, 2000] → [1000, 2000, 3000]
    setLaps([secondsPassed, ...laps]);
  }

  // 설명 표시/숨김 토글 함수
  function toggleDescription() {
    setShowDescription(!showDescription);
  }

  useEffect(() => {
    if (isRunning) {
      document.title = `${(secondsPassed / 1000).toFixed(1)}초 - Stopwatch`;
    } else {
      // 정지 중일 때: 원래 제목으로
      document.title = "Stopwatch";
    }

    return () => {
      document.title = `Stopwatch`;
    };
  }, [isRunning, secondsPassed]);

  return (
    <>
      <div className="title-container">
        <h2>주더지 스톱워치</h2>
        <button className="help-button" onClick={toggleDescription}>
          <span>?</span>
        </button>
      </div>
      {showDescription && (
        <section className="section_group description-box">
          <p className="describe">
            '주더지'란? <br></br> ‘민주’와 ‘두더지’를 합쳐 만든 이름으로,
            민주님께서 공유해주신 3D 모델과 폰트에 대한 감사의 마음을
            담았습니다.
          </p>
        </section>
      )}
      <section className="section_group">
        <h3 className="time">{(secondsPassed / 1000).toFixed(3)}초</h3>
        <div className="btns">
          {isRunning ? (
            <button onClick={handleStop}>중지</button>
          ) : (
            <button onClick={handleStart}>시작</button>
          )}
          <button onClick={handleReset}>리셋</button>
          <button onClick={handleLap} disabled={!isRunning}>
            Lap
          </button>
        </div>
      </section>
      <section className="section_group">
        <h3>대시보드</h3>
        <p>[상태 확인]: {isRunning ? "실행 중" : "정지"}</p>
        <div className="count">
          <p className="count_number">시작 횟수: {startCount}회</p>
          <p className="count_number">일시정지 횟수: {stopCount}회</p>
        </div>
      </section>
      <section className="section_group">
        <div>
          <h3>Lap Times</h3>
          {laps.map((lap, index) => (
            <p key={index}>
              Lap {laps.length - index} : {(lap / 1000).toFixed(3)}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
