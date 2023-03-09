import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { NotFound } from "./pages/NotFound";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/signin" element={<LoginPage />}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}