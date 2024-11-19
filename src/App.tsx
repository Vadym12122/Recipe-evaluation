import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllRecipesPage from "./pages/AllRecipesPage/AllRecipesPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage";
import Navbar from "./components/Navbar/Navbar";

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<AllRecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
    </Router>
);

export default App;
