import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <section className="hero-section">
            <div className="hero-copy">
                <p className="eyebrow">Depstar · Faculty of Technology and Engineering</p>
                <h1>A quieter way to find your next <em>good read.</em></h1>
                <p className="hero-description">Browse the college collection, check availability, and keep borrowing simple.</p>
                <div className="hero-actions">
                    <Link className="primary-button" to="/books">Explore the collection <span>→</span></Link>
                    <Link className="text-link" to="/borrow">Start a borrowing request</Link>
                </div>
            </div>
            <div className="hero-stat">
                <strong>01</strong>
                <span>Library desk<br />open today</span>
            </div>
        </section>
    );
}
