import "./style.css";
import { useEffect } from "react";
import MetaData from "../../components/Helmet/component";

const TermsAndConditions = () => {

    const content = `
        Last Updated: 2025 April 10, 10:08
        Welcome to sportbn. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our website to browse and follow matches across various sports, including football, basketball, tennis, hockey, and American football.
        By accessing or using our website, you agree to the terms of this Privacy Policy. If you disagree, please do not use our services.

        1. Information We Collect
        We may collect the following types of information:
        Personal Information: When you register, subscribe, or contact us, we may collect your email address.
        Usage Data: We track your interactions with our website (e.g., pages visited, matches viewed) for analytics.

        2. How We Use Your Information
        We use your data for the following purposes:
        To provide and personalize our services.
        To communicate with you (e.g., updates, newsletters).
        To analyze website traffic and improve performance.
        To comply with legal obligations.

        3. Cookies & Tracking Technologies
        We use cookies and similar technologies to enhance your browsing experience. You can manage cookie preferences in your browser settings.

        4. Data Sharing & Disclosure
        We do not sell your personal information. However, we may share data with:
        Service Providers: Trusted third parties who assist in website operations.
        Legal Authorities: If required by law or to protect our rights.

        5. Data Security
        We implement industry-standard security measures to protect your data. However, no method is 100% secure, and we cannot guarantee absolute security.

        6. Your Rights
        Depending on your location, you may have the right to:
        Access, correct, or delete your personal data.
        Opt out of marketing communications.
        Restrict or object to data processing.
        
        7. Third-Party Links
        Our website may contain links to third-party sites (e.g., sports leagues and betting platforms). We are not responsible for their privacy practices.
        
        8. Children’s Privacy
        Our services are not intended for users under [Age, e.g., 13 or 16]. We do not knowingly collect data from children.
        
        9. Changes to This Policy
        We may periodically update this Privacy Policy. The latest version will be posted on our website with the revised date.
    `;
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="container" style={{ marginTop: "6rem", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <MetaData title="sportbn | Terms and Conditions" des="LiveSport is a platform that provides live streaming of football, basketball and tennis matches." />
            <h1 className="fw-bold m-0">Terms and Conditions</h1>
            <p className="content-terms" style={{ whiteSpace: 'pre-line' }}>
                {content}
            </p>
        </div>
    )
}

export default TermsAndConditions;