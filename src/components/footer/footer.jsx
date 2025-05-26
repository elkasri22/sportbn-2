import "./style.css";
import { Link } from "react-router-dom";

const FooterComponent = () => {
    return (
        <footer className="bg-sport-card mt-12 py-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                        <img
                            src="https://raw.githubusercontent.com/elkasri22/sportbn/refs/heads/main/SportBN%20logo%20offic.webp"
                            width="70px"
                            height="70px"
                            loading="lazy"
                            alt="LiveSport Now"
                            style={{minHeight: "70px", minWidth: "70px"}}
                        />
                    </div>
                    <div className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} LiveSport. All rights reserved.
                    </div>
                </div>
            </div>
            <div className="flex justify-center" style={{alignItems: "center", gap: "20px", marginTop: "10px"}}>
                <Link to="/privacy-policy" className="text-gray-400 text-sm link-privacy" style={{fontSize: "15px"}}>Privacy Policy</Link>
                <Link to="/terms" style={{fontSize: "15px"}} className="link-terms">Terms & Conditions</Link>
            </div>
        </footer>
    )
};

export default FooterComponent;
