import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LoginPage from "./src/pages/LoginPage";

export default () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<LoginPage />}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}