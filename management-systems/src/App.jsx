// Импорт компонентов маршрутизации из react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Импорт пользовательских компонентов и страниц
import Header from "./components/Header/Header";
import Boards from "./pages/Boards/Boards";
import Board from "./pages/Board/Board";
import Issues from "./pages/Issues/Issues";
import NotFound from "./pages/NotFound/NotFound";

// Контекст для управления задачами
import { TaskProvider } from "./components/TaskContext/TaskContext";

function App() {
  return (
    <>
      {/* Оборачиваем приложение в провайдер контекста для управления задачами */}
      <TaskProvider>
        {/* Оборачиваем маршруты в компонент маршрутизатора */}
        <Router>
          {/* Общий заголовок (навигация) */}
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
