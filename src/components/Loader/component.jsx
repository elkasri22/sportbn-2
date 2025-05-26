

const Loader = ({height_screen="100vh"}) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-sport-dark h-screen" style={{ height: height_screen }}>
            <div className="text-center space-y-4">
                <img
                    src="https://raw.githubusercontent.com/elkasri22/sportbn/refs/heads/main/SportBN%20logo%20offic.webp"
                    width="70px"
                    loading="lazy"
                    alt="LiveSport Now"
                    className="h-16 mx-auto animate-pulse-soft"
                    style={{ minHeight: "70px", minWidth: "70px" }}
                />
                <p className="text-gray-400 animate-pulse">Loading live matches...</p>
            </div>
        </div>
    )
}

export default Loader;
