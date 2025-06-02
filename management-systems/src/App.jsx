import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Boards from "./pages/boards";
import Board from "./pages/Board";
import Issues from "./pages/issues";
import NotFound from "./pages/notFound";
import "./App.css";
import { TaskProvider } from "./components/TaskContext";

function App() {
  return (
    <>
      <TaskProvider>
        <Router>
          <Header />

          {/* Определение маршрутов */}
          <Routes>
            {/* Страница со списком проектов */}
            <Route path="/boards" element={<Boards />} />
            {/* Страница отдельной доски с параметром id */}
            <Route path="/boards/:id" element={<Board />} />
            {/* Страница со всеми задачами */}
            <Route path="/issues" element={<Issues />} />
            {/* Роут для всех неизвестных путей (страница 404) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TaskProvider>
    </>
  );
}

export default App;
