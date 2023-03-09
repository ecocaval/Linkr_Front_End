import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import { NotFound } from "./pages/NotFound";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<LoginPage />}/>
                <Route path="/signup" element={<RegisterPage />}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}