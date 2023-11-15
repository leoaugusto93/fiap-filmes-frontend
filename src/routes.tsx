import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movie from "./pages/Movie";
import Form from "./pages/Movie/Form";
import Detail from "./pages/Movie/Detail";
import NotFound from "./pages/NotFound";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/filmes" element={<Movie />} />
            <Route path="/filmes/:id" element={<Detail />} />
            <Route path="/filmes/cadastro" element={<Form />} />
            <Route path="/filmes/cadastro/:id" element={<Form />} />
        </Routes>
    )
}
export default AppRoutes;