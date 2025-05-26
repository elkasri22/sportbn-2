import { lazy } from "react";
import WatchPageHook from "../../hooks/WatchPageHook";
const WatchPart = lazy(() => import("../../components/watch/WatchPart"));

const PageWatchNow = () => {

    const { url } = WatchPageHook();

    return (
        <div className="container watch-now">
            <WatchPart />
        </div>
    )
};

export default PageWatchNow;