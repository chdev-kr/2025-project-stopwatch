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
    // clearInterval: "setInterval 반복 실행 멈춰!"
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
      <h1>Time passed: {(secondsPassed / 1000).toFixed(3)}</h1>
      <button onClick={handleStart} disabled={isRunning}>
        Start
      </button>
      <button onClick={handleStop} disabled={!isRunning}>
        Stop
      </button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleLap} disabled={!isRunning}>
        Lap
      </button>
      <p>상태: {isRunning ? "⏱️ 실행 중" : "⏸️ 정지"}</p>
      <p>시작 횟수: {startCount}회</p>
      <p>일시정지 횟수: {stopCount}회</p>

      <div>
        <h2>Lap Times</h2>
        {laps.map((lap, index) => (
          <p key={index}>
            Lap {laps.length - index} : {(lap / 1000).toFixed(3)}초
          </p>
        ))}
      </div>
    </>
  );
}
