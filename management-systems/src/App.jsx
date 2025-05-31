import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Boards from "./pages/boards";
import Board from "./pages/Board";
import Issues from "./pages/issues";
import NotFound from "./pages/notFound";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/boards" element={<Boards />} />
          <Route path="/boards/:id" element={<Board />} />
          <Route path="/issues" element={<Issues />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
