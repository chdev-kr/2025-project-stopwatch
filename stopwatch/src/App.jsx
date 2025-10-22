import StopWatch from "./StopWatch";
import CanvasThree from "./Components/CanvasThree.jsx";
import "./App.style.css";

function App() {
  return (
    <>
      <CanvasThree isActive={false} />
      <StopWatch />
    </>
  );
}

export default App;
