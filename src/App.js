import { useState, useEffect } from 'react';
import Calendar from './components/Calendar/Calendar';
import MovieList from './components/MovieList/MovieList';
import MovieAPI from './utils/MovieAPI';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        loadPopularMovies();
    }, []);

    const loadPopularMovies = async () => {
        setLoading(true);
        const data = await MovieAPI.getPopularMovies();
        setMovies(data);
        setSelectedDate(null);
        setLoading(false);
    };

    const handleDateSelect = async (dateString) => {
        setSelectedDate(dateString);
        setLoading(true);
        
        const [year, month, day] = dateString.split('-');
        const data = await MovieAPI.getMoviesByDate(year, month, day);
        
        setMovies(data);
        setLoading(false);
    };

    return (
        <div className="app">
            <header className="header">
                <h1>🎬 Movie Calendar</h1>
                <p>Click a date to see releases</p>
            </header>

            <div className="main-container">
                <div className="left-panel">
                    <Calendar onDateSelect={handleDateSelect} />
                    <button className="btn-popular" onClick={loadPopularMovies}>
                        Popular Movies
                    </button>
                </div>

                <div className="right-panel">
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : (
                        <MovieList movies={movies} selectedDate={selectedDate} />
                    )}
                </div>
            </div>

            <footer className="footer">
                <p>Made with TMDB API</p>
            </footer>
        </div>
    );
}

export default App;