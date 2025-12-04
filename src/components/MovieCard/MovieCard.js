// components/MovieCard/MovieCard.js
import MovieAPI from '../../utils/MovieAPI';
import './MovieCard.css';

function MovieCard({ movie }) {
    const handleClick = () => {
        if (movie.imdb_id) {
            window.open(MovieAPI.getIMDBLink(movie.imdb_id), '_blank');
        } else {
            const searchQuery = encodeURIComponent(movie.title);
            window.open(`https://www.imdb.com/find?q=${searchQuery}`, '_blank');
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'Coming soon';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatVotes = (count) => {
        if (!count) return 'No votes';
        if (count >= 1000000) return `${(count/1000000).toFixed(1)}M votes`;
        if (count >= 1000) return `${(count/1000).toFixed(1)}K votes`;
        return `${count} votes`;
    };

    return (
        <div className="movie-card" onClick={handleClick}>
            <div className="movie-card-poster">
                <img 
                    src={MovieAPI.getPosterUrl(movie.poster_path)} 
                    alt={movie.title}
                    loading="lazy"
                />
                {movie.vote_average > 0 && (
                    <div className="movie-card-rating">
                        <div className="rating-score">★ {movie.vote_average.toFixed(1)}</div>
                        <div className="rating-votes">{formatVotes(movie.vote_count)}</div>
                    </div>
                )}
            </div>
            
            <div className="movie-card-info">
                <h3 className="movie-card-title">{movie.title}</h3>
                <p className="movie-card-date">📅 {formatDate(movie.release_date)}</p>
                {movie.overview && (
                    <p className="movie-card-description">
                        {movie.overview.substring(0, 100)}...
                    </p>
                )}
                <div className="movie-card-action">View on IMDB →</div>
            </div>
        </div>
    );
}

export default MovieCard;