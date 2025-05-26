import "./style.css";
import { lazy, useMemo } from "react";
import LogicSearch from "../../hooks/search";
import { BsBarChart } from "react-icons/bs";
const LiveMatch = lazy(() => import("../matches/LiveMatch"));
const MetaData = lazy(() => import("../Helmet/component"))

const SearchComponent = () => {

    const { search, filteredMatches, loading } = LogicSearch();

    const renderedContent = useMemo(() => {

        if (search && filteredMatches.length) {
            return (
                <div className="container search-part pt-4">
                    <MetaData title={`sportbn | Search: ${search.replaceAll("+", " ")}`} des="Search on Sportify, find matches, teams and leagues"/>
                    <div className="head">
                        <h1 className="fw-semibold m-0">Search: {search.replaceAll("+", " ")}</h1>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-5">
                        {filteredMatches.map((match, index) => (
                            <LiveMatch
                                key={match._id}
                                {...match}
                                // Delay animation for staggered effect
                                style={{ animationDelay: `${index * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="flex flex-col items-center justify-center py-12 text-center" style={{minHeight: "500px"}}>
                    <BsBarChart size={48} className="text-gray-500 mb-4" />
                    <h3 className="text-gray-300 text-lg font-medium mb-2">No matches found</h3>
                    <p className="text-gray-500">There are no <small className="m-0 text-decoration-underline">{search.replaceAll("+", " ")}</small> matches available at the moment.</p>
                </div>
            )
        }

    }, [search, filteredMatches, loading]);

    return renderedContent;
};

export default SearchComponent;