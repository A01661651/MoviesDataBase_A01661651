import { useEffect, useState } from "react";
import { IDetailsResponse, getDetailsMovies } from "../../services";
import { MovieCard } from "../../components/MovieCard";

const Favorites = () => {
    const [loading, setLoading] = useState<boolean>(true); 
    const [shows, setShows] = useState<IDetailsResponse[]>([]);
    const favorites: string = localStorage.getItem("favorites") || "";
    const [originalShows, setOriginalShows] = useState<IDetailsResponse[]>([]);  
    const [activeButton, setActiveButton] = useState<string>('');
    
    const runGetFavorites = async () => {
        if (favorites.length) {
            const favoritesArray = JSON.parse(favorites);
            const newShows = await Promise.all(
                favoritesArray.map(async (favoriteId: number) => {
                    return getDetailsMovies(favoriteId)
                        .then((res) => {
                            if (res && res.data) {
                                return res.data;
                            }
                            return null; 
                        }).catch((err) => {
                            console.log(err, "err");
                            return null; 
                        });
                })
            ).then(results => results.filter(movie => movie !== null)); 
            setShows(newShows);
        }
        setLoading(false); 
    };

    useEffect(() => {
        runGetFavorites();
    }, []);

    const sortByName = () => {
        if (activeButton === 'name') {
            setActiveButton('');
            runGetFavorites();
        } else {
            const sorted = [...shows].sort((a, b) => a.title.localeCompare(b.title));
            setShows(sorted);
            setActiveButton('name');
        }
    };
    
    const sortByRating = () => {
        if (activeButton === 'rating') {
            setActiveButton('');  
            runGetFavorites();
        } else {
        const sorted = [...shows].sort((a, b) => b.vote_average - a.vote_average);
        setShows(sorted);
        setActiveButton('rating');
        }
    };

    const clearFavorites = () => {
        if (window.confirm("Are you sure you want to remove all favorites?")) {
            localStorage.removeItem("favorites");
            setShows([]);
            setOriginalShows([])
            //runGetFavorites();
        }
    };
    
    

    return (
        <div className='block pl-7'>
            <div className="flex flex-wrap -mx-4">
                <div className="relative w-full px-4 md:w-9/12 mt-9">
                    <h2 className="text-2xl font-semibold text-gray-800 mt-5 text-left ml-7 uppercase">My Favorites</h2>
                </div>
                <div className="relative w-full px-4 md:w-3/12 mt-4">
                    <div className="flex justify-between items-center w-full px-4 md:w-9/12">
                        <button onClick={clearFavorites} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2">
                            Clear All Favorites
                        <div className="flex items-center justify-center w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fa fa-trash text-red-500 text-xl">
                                <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                            </svg>
                        </div>
                        </button>
                    </div>
                    <button onClick={sortByName} className={`bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded transition-all duration-300 hover:bg-red-700 mr-2 mb-2 cursor-pointer ${activeButton === 'name' ? 'bg-orange-500' : ''}`}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-alpha-down" className="svg-inline--fa fa-sort-alpha-down fa-w-14 w-4 inline mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm240-64H288a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h56l-61.26 70.45A32 32 0 0 0 272 446.37V464a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16h-56l61.26-70.45A32 32 0 0 0 432 321.63V304a16 16 0 0 0-16-16zm31.06-85.38l-59.27-160A16 16 0 0 0 372.72 32h-41.44a16 16 0 0 0-15.07 10.62l-59.27 160A16 16 0 0 0 272 224h24.83a16 16 0 0 0 15.23-11.08l4.42-12.92h71l4.41 12.92A16 16 0 0 0 407.16 224H432a16 16 0 0 0 15.06-21.38zM335.61 144L352 96l16.39 48z"></path>
                        </svg>
                        Sort By Name
                    </button>
                    <button onClick={sortByRating} className={`bg-blue-600 text-white px-2 py-1 text-xs font-medium rounded transition-all duration-300 hover:bg-red-700 mr-2 mb-2 cursor-pointer ${activeButton === 'rating' ? 'bg-orange-500' : ''}`}>
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-numeric-down-alt" className="svg-inline--fa fa-sort-numeric-down-alt fa-w-14 w-4 inline mr-1" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="currentColor" d="M176 352h-48V48a16 16 0 0 0-16-16H80a16 16 0 0 0-16 16v304H16c-14.19 0-21.36 17.24-11.29 27.31l80 96a16 16 0 0 0 22.62 0l80-96C197.35 369.26 190.22 352 176 352zm224 64h-16V304a16 16 0 0 0-16-16h-48a16 16 0 0 0-14.29 8.83l-16 32A16 16 0 0 0 304 352h16v64h-16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h96a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zM330.17 34.91a79 79 0 0 0-55 54.17c-14.27 51.05 21.19 97.77 68.83 102.53a84.07 84.07 0 0 1-20.85 12.91c-7.57 3.4-10.8 12.47-8.18 20.34l9.9 20c2.87 8.63 12.53 13.49 20.9 9.91 58-24.77 86.25-61.61 86.25-132V112c-.02-51.21-48.4-91.34-101.85-77.09zM352 132a20 20 0 1 1 20-20 a20 20 0 0 1-20 20z"></path>
                        </svg>
                        Sort By Rating
                    </button>
                </div>
                <div className="w-screen flex flex-col justify-center items-start mt-10">
                    {loading && <div>Loading...</div>}
                    {!loading && shows.length === 0 && (
                        <div className="text-center">
                            <p>Oops... it seems this is empty. Explore more movies and add them to your favorites!</p>
                        </div>
                    )}
                    <div className="flex flex-row flex-wrap justify-center items-start m-2">
                        {shows.map((movie: IDetailsResponse) => (
                            <MovieCard
                                key={movie.id}
                                movieId={movie.id}
                                posterPath={movie.poster_path}
                                title={movie.title}
                                voteAverage={movie.vote_average}
                                genreId={movie.genres[0].id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}    

export default Favorites;
