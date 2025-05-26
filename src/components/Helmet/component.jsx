import { Helmet } from "react-helmet";

const MetaData = ({ title, des, children }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title}</title>
            <meta name="description" content={des} />
            <link rel="canonical" href="https://sportbn.com"/>
            {children}
        </Helmet>
    );
};

export default MetaData;