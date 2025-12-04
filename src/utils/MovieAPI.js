// utils/MovieAPI.js
const API_KEY = '7eebfa655e8121c4d4f4a72a37399a3b';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieAPI = {
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('API error');
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    },

    async getMoviesByDate(year, month, day) {
        const date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_date.gte=${date}&primary_release_date.lte=${date}`;
        
        const data = await this.fetchData(url);
        
        if (data?.results?.length > 0) {
            return data.results.slice(0, 10);
        }
        
        return [
            { 
                id: 1, 
                title: "Sample Movie", 
                release_date: date, 
                vote_average: 7.5,
                vote_count: 1500,
                overview: "A sample movie for demonstration."
            }
        ];
    },

    async getPopularMovies() {
        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`;
        const data = await this.fetchData(url);
        
        if (data?.results) {
            return data.results.slice(0, 8);
        }
        
        return [
            { 
                id: 1, 
                title: "Popular Movie", 
                release_date: "2024-01-01", 
                vote_average: 8.0,
                vote_count: 5000,
                overview: "A popular movie for demonstration."
            }
        ];
    },

    getPosterUrl(path) {
        return path 
            ? `https://image.tmdb.org/t/p/w500${path}`
            : 'https://via.placeholder.com/300x450?text=No+Poster';
    },

    getIMDBLink(imdbId) {
        return imdbId ? `https://www.imdb.com/title/${imdbId}` : '#';
    }
};

export default MovieAPI;