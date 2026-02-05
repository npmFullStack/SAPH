// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Index";
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
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/learn-more" element={<LearnMore />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/signin" element={<Login />} />
                <Route path="/signup" element={<Register />} />

                {/* Protected Routes */}
                <Route element={<ProtectedLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Add more protected routes here */}
                    {/* <Route path="/books" element={<Books />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/profile" element={<Profile />} />
                    ... etc */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
