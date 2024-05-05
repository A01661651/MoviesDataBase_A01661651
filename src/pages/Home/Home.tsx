import Popular from "../Popular/Popular";
import TopRated from "../Top Rated/TopRated";
import NowPlaying from "../Now Playing/NowPlaying";

const Home = () => {
    return (
        <div className="bg-gray-200 w-full mx-auto mb-2.5 pl-4">
            <div className="h-[460px] p-0 leading-relaxed relative min-h-0 border-0 text-base font-inherit align-baseline mb-12 flex overflow-x-auto">
                <div className="flex overflow-x-auto flex-nowrap space-x-4">
                <Popular showButtonsP={false} showListTypeP={false} showListTypePF={true} />

                </div>
                <div className="absolute top-4 right-4 text-xs shadow-md transition-all duration-400 ease-in-out">
                    <a
                        href="/popular"
                        className="font-mono border border-red-600 text-white py-2 px-4 inline-flex font-semibold rounded bg-red-600"
                    >
                        View All
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            className="inline-block w-[14px] h-4 overflow-visible align-[-0.125em]"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                        >
                            <path
                                fill="currentColor"
                                d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901 .04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                            ></path>
                        </svg>
                    </a>
                </div>
            </div>

            <div className="h-[460px] p-0 leading-relaxed relative min-h-0 border-0 text-base font-inherit align-baseline mb-12">
                <div className="overflow-x-scroll w-full">
                    <div className="m-0 p-0 relative leading-7 flex overflow-x-auto snap-x snap-mandatory scroll-smooth flex-nowrap space-x-4">
                        <TopRated showButtonsTR={false} showListTypeTR={false} showListTypeTRF={true} />
                    </div>
                    <div className="absolute top-4 right-4 text-xs shadow-md transition-all duration-400 ease-in-out">
                        <a
                            href="/top_rated"
                            className="font-mono border border-red-600 text-white py-2 px-4 inline-flex font-semibold rounded bg-red-600"
                        >
                            View All
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                className="inline-block w-[14px] h-4 overflow-visible align-[-0.125em]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901 .04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                            ></path>
                        </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="h-[460px] p-0 leading-relaxed relative min-h-0 border-0 text-base font-inherit align-baseline mb-12">
                <div className="overflow-x-scroll w-full">
                    <div className="m-0 p-0 relative leading-7 flex overflow-x-auto snap-x snap-mandatory scroll-smooth flex-nowrap space-x-4">
                        <NowPlaying showButtonsNP={false} showListTypeNP={false} showListTypeNPF={true} />
                    </div>
                    <div className="absolute top-4 right-4 text-xs shadow-md transition-all duration-400 ease-in-out">
                        <a
                            href="/upcoming"
                            className="font-mono border border-red-600 text-white py-2 px-4 inline-flex font-semibold rounded bg-red-600"
                        >
                            View All
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                className="inline-block w-[14px] h-4 overflow-visible align-[-0.125em]"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901 .04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                                ></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
