import { IMovieCard } from "./types";
import { Pill } from "../Pill";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import genresData from '../../constants/genres.json';
import './MovieCard.css'
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";
import { ROUTES } from "../../routes/constants";

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAverage,
    posterPath
}) => {
    const navigate = useNavigate();
    const poster = IMAGE_SOURCE + posterPath;

    const getGenre = (id: number): string => {
        const genre = genresData.genres.find((genre) => genre.id === id);
        return genre?.name || 'Unknown';
    }

    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, { state: { name: movieName }});
    }

    return (
        <div 
            className="show-box cursor-pointer"
            onClick={() => {
                navigateMovies(movieId, title)
            }}
        >
            <div className="min-w-[100%] overflow-hidden ml-0 bg-[#2f3238] float-none">
                <img className="h-[370px] relative max-w-none min-w-[100%] overflow-hidden transition-transform duration-1000 ease-in-out hover:scale-110" src={poster} alt="poster"/>
                <div className="info">
                    <div className="text-white pt-[15px] pr-[10px] pb-[15px] pl-[10px] w-[100%] align-middle">
                        <div>
                            <Pill title={getGenre(genreId)} color="red"></Pill>
                        </div>
                        <p className="block text-[19px] font-bold leading-[27px] mt-[10px] w-[100%]">{title}</p>
                        <p className="mr-[10px] text-[13px] font-medium table uppercase leading-[20px] w-[100%]">* {voteAverage} / 10</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MovieCard;

