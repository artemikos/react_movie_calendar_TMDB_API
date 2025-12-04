// components/MovieList/MovieList.js
import MovieCard from '../MovieCard/MovieCard';
import MovieAPI from '../../utils/MovieAPI';
import './MovieList.css';

function MovieList({ movies, selectedDate }) {
    if (movies.length === 0) {
        return (
            <div className="movie-list-empty">
                <p>No movies found</p>
                <p>Try selecting a different date</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return 'Popular Movies';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="movie-list">
            <div className="movie-list-header">
                <h2>{selectedDate ? `Movies on ${formatDate(selectedDate)}` : 'Popular Movies'}</h2>
                <span className="movie-count">{movies.length} movies</span>
            </div>
            
            <div className="movie-list-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}

export default MovieList;