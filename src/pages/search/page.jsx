import { lazy } from "react";
const SearchComponent = lazy(() => import("../../components/search/component"));

const SearchPage = () => {
    return (
        <div style={{minHeight: "90vh"}}>
            <SearchComponent />
        </div>
    )
}

export default SearchPage;