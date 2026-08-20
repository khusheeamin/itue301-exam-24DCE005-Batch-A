import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function BooksPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadBooks() {
            try {
                const response = await fetch(`${API_URL}/api/v1/books`);
                if (!response.ok) throw new Error('Could not load the library collection.');
                setData(await response.json());
            } catch (requestError) {
                setError(requestError.message);
            } finally {
                setLoading(false);
            }
        }
        loadBooks();
    }, []);

    return (
        <section className="content-section">
            <div className="section-heading">
                <div><p className="eyebrow">The collection</p><h1>Books on the shelf</h1></div>
                <p className="section-note">Fresh data from the library service</p>
            </div>
            {loading && <p className="status-message">Loading books...</p>}
            {error && <p className="status-message error-message">{error}</p>}
            {!loading && !error && (
                <div className="books-grid">
                    {data.map((book) => <BookCard key={book._id || book.isbn} {...book} />)}
                </div>
            )}
        </section>
    );
}
