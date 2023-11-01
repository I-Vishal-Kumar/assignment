import Categoryquestions from "./COMPONENTS/Categoryquestions";
import Header from "./COMPONENTS/Header";
import { Routes, Route } from "react-router-dom";

import Createforms from "./COMPONENTS/Createforms";
import Passage from "./COMPONENTS/Passage";
import Previewpage from "./COMPONENTS/Previewpage";
function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/preview" element={<Previewpage />}></Route>
          <Route path="/passage" element={<Passage />}></Route>
          <Route path="/" element={<Createforms />}></Route>
          <Route path="/catagory" element={<Categoryquestions />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
