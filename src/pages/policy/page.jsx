import "./style.css";
import { useEffect } from "react";
import MetaData from "../../components/Helmet/component";

const PrivacyPolicy = () => {

    const content = `
        Last Updated: 2025 April 10, 10:34 
        Welcome to sportbn. Please read these Terms and Conditions carefully before using our website, which provides live score updates, match information, and sports content covering football (soccer), basketball, tennis, hockey, and American football.
        By accessing or using the Site, you agree to comply with these Terms. If you do not agree, please refrain from using the Site.
        
        1. Acceptance of Terms
        The Site is available to users aged 16 years or older (or the legal age in your country).
        You are responsible for all activities conducted through your account (if applicable).
        
        2. Services Provided
        The Site offers:
        Live scores (e.g., football live matches, NBA basketball scores, Wimbledon tennis updates).
        Statistics, league standings (e.g., CBA standings, NHL results).
        Links or information about match broadcasts (e.g., free NFL streaming options).
        Analytical content (e.g., news on Grigor Dimitrov, Shanghai Sharks updates).
        Note:
        We do not guarantee 100% accuracy of live data, as delays or errors may occur.
        Some streaming links may direct you to third-party platforms, for which we are not responsible.
        
        3. Usage Restrictions
        You are prohibited from:
        Using the Site for illegal or fraudulent purposes.
        Republishing our content without permission (e.g., match schedules, analyses).
        Using bots or automated tools to scrape data.
        Impersonating any person or entity (e.g., claiming to represent Buducnost Basketball).
        
        4. Accounts and Users
        If you create an account, your information must be accurate and up to date.
        We reserve the right to suspend accounts that violate these Terms.
        You are responsible for safeguarding your password.
        
        5. Intellectual Property Rights
        All content (text, logos, designs) is owned by us or our partners.
        Sharing links with attribution is permitted, but copying content without permission is prohibited.
        
        6. Disclaimer of Liability
        We are not liable for any damages resulting from Site use (e.g., data loss, score inaccuracies).
        The service is provided "as is," with no guarantee of uninterrupted availability.
        Some links may direct you to third-party sites (e.g., betting platforms, streaming services), whose terms we do not control.
        
        7. Modifications to Terms
        We reserve the right to modify these Terms at any time. Updates will be posted on the Site or communicated via email.
        
        8. Governing Law
        These Terms are governed by the laws of [Country/Region, e.g., UAE or Saudi Arabia]. Any disputes will be resolved in the courts of [City/Country].
    `;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container" style={{ marginTop: "6rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <MetaData title="sportbn | Privacy Policy" des="sportbn is a platform that provides live score updates, match information, and sports content covering football, basketball, tennis, hockey, and American football."/>
            <h1 className="fw-bold m-0">Privacy Policy</h1>
            <p className="content-policy" style={{ whiteSpace: 'pre-line' }}>
                {content}
            </p>
        </div>
    )
}

export default PrivacyPolicy;