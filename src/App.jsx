import { Route, Routes } from "react-router-dom";
import BoardContainer from "./components/BoardContainer";
import Navbar from "./components/Navbar";
import Lists from "./components/Lists";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BoardContainer />} />
        <Route path="/:id" element={<Lists />} />
      </Routes>
    </>
  );
}

export default App;
