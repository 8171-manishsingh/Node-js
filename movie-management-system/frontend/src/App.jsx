import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import AddMoviePage from "./pages/AddMoviePage";
import EditMoviePage from "./pages/EditMoviePage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen text-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetailsPage />} />
            <Route path="/movies/:id/edit" element={<EditMoviePage />} />
            <Route path="/add-movie" element={<AddMoviePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;