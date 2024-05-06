import { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { IDetailsResponse, getDetailsMovies, IMovieResponse, getRecommended } from "../../services";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { MovieCard } from "../../components/MovieCard";


const Show = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<IDetailsResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovieResponse[]>([]);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>("");

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavorites = [...favs, id]
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavorites = [...favs];
        newFavorites = newFavorites.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const goBack = () => {
        navigate(-1);
    }

    const getDetails = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            await getDetailsMovies(movieId)
                .then((res) => {
                    if (res && res.data) {
                        console.log(res.data, "res");
                        setMovie(res.data);
                    }
                })
                .catch((err) => {
                    console.log(err, "err")
                });
            setLoading(false);
        }

    }

    const getRec = async () => {
        const movieId = id ? parseInt(id) : undefined;
        if (movieId) {
            await getRecommended(movieId)
                .then((res) => {
                    if (res && res.data) {
                        console.log(res.data, "res");
                        setMovies(res.data.results);
                    }
                })
                .catch((err) => {
                    console.log(err, "err");
                });
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const favs = localStorage.getItem('favorites') || "";
        setFavorites(favs);

        
        if (favs.includes(String(id))) {
            setIsFavorite(true);
        }
        
        getDetails();
        getRec();
    }, [id])


    return (
        <div className='block pl-7'>
            <div className="my-4 mx-44 shadow-2xl rounded-3xl bg-blue-100">
                <div className="p-8">
                    <div className="flex">
                        <div className="min-w-[20%] min-h-[20%] max-w-[20%] max-h-[20%]">
                            <img className="rounded-3xl" src={IMAGE_SOURCE + movie?.poster_path} alt="poster"></img>
                            <div className="flex mt-2 space-x-2">
                                <button className="bg-blue-950 text-white rounded-3xl px-4 py-2 flex-1 text-center" onClick={goBack}>
                                    Go Back
                                    <div className="flex items-center justify-center w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;">
                                            <path fill="currentColor" d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
                                        </svg>
                                    </div>
                                </button>
                                {isFavorite ? (
                                    <button className="bg-red-500 text-white rounded-3xl px-4 py-2 flex items-center justify-center text-center hover:bg-red-700 hover:text-white" onClick={removeFavorite}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart-broken" className="svg-inline--fa fa-heart-broken fa-w-16 my-icons w-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M473.7 73.8l-2.4-2.5c-46-47-118-51.7-169.6-14.8L336 159.9l-96 64 48 128-144-144 96-64-28.6-86.5C159.7 19.6 87 24 40.7 71.4l-2.4 2.4C-10.4 123.6-12.5 202.9 31 256l212.1 218.6c7.1 7.3 18.6 7.3 25.7 0L481 255.9c43.5-53 41.4-132.3-7.3-182.1z"></path>
                                        </svg>
                                        Remove Favorite
                                    </button>
                                
                                ) : (
                                    <button className="bg-blue-950 text-white rounded-3xl px-4 py-2 flex items-center justify-center text-center hover:bg-yellow-300 hover:text-black" onClick={addFavorite}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="heart" className="svg-inline--fa fa-heart fa-w-16 my-icons w-4 mr-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                                        </svg>
                                        Add Favorite
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col min-h-full px-10 justify-between">
                            <div className="flex flex-col justify-center flex-grow">
                                
                                <div className="font-bold text-3xl pb-4">
                                    {movie?.title} ({movie?.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'})
                                </div>
                                <div className="text-sm text-gray-500">
                                    <span className="inline-flex items-center text-base text-left mr-3.5 pr-3.5 leading-5 font-medium">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="clock" className="svg-inline--fa fa-clock fa-w-16 h-5 w-5 mr-2 text-gray-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path fill="currentColor" d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
                                        </svg>
                                        {movie?.runtime} min
                                    </span>
                                    <span className="inline-flex items-center text-base text-left mr-3.5 pr-3.5 leading-5 font-medium">
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" className="svg-inline--fa fa-star fa-w-18 h-5 w-5 mr-2 text-gray-500" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                            <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                        </svg>
                                        Rating: {movie?.vote_average}
                                    </span>
                                </div>

                                <p>{movie?.overview}</p>
                                <div className="flex mt-4">
                                    {movie?.genres.map((genre, index) => (
                                        <span key={index} className="bg-green-500 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                                            {genre.name}
                                        </span>
                                    ))}
                            </div>
                        </div>



                            
                            <div className="flex justify-center items-center flex-grow">
                                <a href={`https://www.imdb.com/title/${movie?.imdb_id}`}>
                                    
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex overflow-x-auto flex-nowrap space-x-4">
                <div className="flex flex-wrap -mx-4">
                    <div className="relative w-full px-4 md:w-9/12">
                        <h2 className="text-2xl font-semibold text-gray-800 mt-5 text-left ml-7 uppercase">Recommended Titles</h2>
                    </div>
                        <div className="flex overflow-x-auto flex-nowrap space-x-4">
                            {movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movieId={movie.id}
                                        posterPath={movie.poster_path}
                                        title={movie.title}
                                        voteAverage={movie.vote_average}
                                        genreId={movie.genre_ids[0]}
                                    />
                                ))}
                        </div>
                </div>
            </div>
        
        </div>
        
    );
};

export default Show;
