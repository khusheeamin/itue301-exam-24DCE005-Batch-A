export default function BookCard({ title, author, category, available }) {
    return (
        <article className="book-card">
            <div className="book-card-topline">
                <span className="category-label">{category}</span>
                <span className={`availability ${available ? 'is-available' : 'is-unavailable'}`}>
                    {available ? 'Available' : 'Not Available'}
                </span>
            </div>
            <h3>{title}</h3>
            <p className="book-author">{author}</p>
        </article>
    );
}
