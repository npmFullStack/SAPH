import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './pages/Index';
import Home from "@/pages/Home";
import LearnMore from "@/pages/LearnMore";
import Pricing from "@/pages/Pricing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import ProtectedLayout from "@/components/ProtectedLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Index />} />
                <Route path="/learn-more" element={<LearnMore />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                {/* Protected routes with layout */}
                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/home" element={<Home />} />
                    {/* Add more protected routes here */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;