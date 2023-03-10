import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage"
import Home from "./pages/Home"
import HashtagPage from "./pages/HashtagPage"
import UserPage from "./pages/UserPage"
import { NotFound } from "./pages/NotFound";

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/sign-up" element={<RegisterPage />}/>
                <Route path="/timeline" element={<Home />}/>
                <Route path="/hashtag/:hashtag" element={<HashtagPage />}/>
                <Route path="/user/:id" element={<UserPage />}/>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    )
}