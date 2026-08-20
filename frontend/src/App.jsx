import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BorrowPage from './pages/BorrowPage';

export default function App() {
    return (
        <div className="app-shell">
            <Navigation />
            <main className="page-wrap">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/books" element={<BooksPage />} />
                    <Route path="/borrow" element={<BorrowPage />} />
                </Routes>
            </main>
        </div>
    );
}
