// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

import Home from "./pages/Home.jsx";
import VideoPage from "./pages/VideoPage.jsx";
import Shorts from "./pages/Shorts.jsx";
import Playlist from "./pages/Playlist.jsx";
import History from "./pages/History.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="flex pt-16">
        <Sidebar />

        <main className="flex-1 ml-0 md:ml-56 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
