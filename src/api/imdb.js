// Временное решение - используем TMDB API для получения фильмов
// Позже можно добавить прокси для IMDB

const TMDB_API_KEY = '7eebfa655e8121c4d4f4a72a37399a3b'; // Замените на свой
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const IMDB_BASE_URL = 'https://www.imdb.com/title';

export class MovieAPI {
    constructor() {
        this.apiKey = TMDB_API_KEY;
    }

    // Получить фильмы по дате релиза
    async getMoviesByDate(year, month, day) {
        const date = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/discover/movie?api_key=${this.apiKey}&sort_by=popularity.desc&primary_release_date.gte=${date}&primary_release_date.lte=${date}`
            );
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error('Error fetching movies:', error);
            return [];
        }
    }

    // Получить популярные фильмы (для демо)
    async getPopularMovies() {
        try {
            const response = await fetch(
                `${TMDB_BASE_URL}/movie/popular?api_key=${this.apiKey}`
            );
            const data = await response.json();
            return data.results.slice(0, 20) || [];
        } catch (error) {
            console.error('Error fetching popular movies:', error);
            // Возвращаем демо-данные если API не работает
            return this.getDemoMovies();
        }
    }

    // Демо-данные на случай если API недоступно
    getDemoMovies() {
        return [
            {
                id: 1,
                title: "Inception",
                release_date: "2024-03-15",
                poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
                vote_average: 8.3,
                imdb_id: "tt1375666"
            },
            {
                id: 2,
                title: "The Dark Knight",
                release_date: "2024-03-10",
                poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                vote_average: 9.0,
                imdb_id: "tt0468569"
            },
            {
                id: 3,
                title: "Interstellar",
                release_date: "2024-03-05",
                poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
                vote_average: 8.6,
                imdb_id: "tt0816692"
            },
            {
                id: 4,
                title: "Parasite",
                release_date: "2024-03-20",
                poster_path: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
                vote_average: 8.6,
                imdb_id: "tt6751668"
            },
            {
                id: 5,
                title: "The Shawshank Redemption",
                release_date: "2024-03-25",
                poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
                vote_average: 8.7,
                imdb_id: "tt0111161"
            }
        ];
    }

    // Генерация IMDB ссылки
    getIMDBLink(imdbId) {
        return imdbId ? `${IMDB_BASE_URL}/${imdbId}` : 'https://www.imdb.com/';
    }
}