import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function BorrowPage() {
    const [memberName, setMemberName] = useState('');
    const [bookTitle, setBookTitle] = useState('');
    const [borrowDate, setBorrowDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setSubmitted(false);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/v1/borrowings/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ memberName, bookTitle, borrowDate, returnDate })
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Could not save borrowing request.');
            setSubmitted(true);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="content-section borrow-layout">
            <div className="section-heading"><div><p className="eyebrow">Library desk</p><h1>Borrow a book</h1></div></div>
            <form className="borrow-form" onSubmit={handleSubmit}>
                <label>Member name<input required value={memberName} onChange={(event) => setMemberName(event.target.value)} placeholder="Your full name" /></label>
                <label>Book title<input required value={bookTitle} onChange={(event) => setBookTitle(event.target.value)} placeholder="Book you want to borrow" /></label>
                <div className="form-row"><label>Borrow date<input required type="date" value={borrowDate} onChange={(event) => setBorrowDate(event.target.value)} /></label><label>Return date<input required type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} /></label></div>
                <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Submit request'} {!saving && <span>→</span>}</button>
                {submitted && <p className="success-message">Request noted for {memberName}: {bookTitle}.</p>}
                {error && <p className="status-message error-message">{error}</p>}
            </form>
        </section>
    );
}
