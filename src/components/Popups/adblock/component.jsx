import React, { useState, useEffect } from 'react';
import './style.css';

const ShowPopupAdblock = () => {
    const [adBlockDetected, setAdBlockDetected] = useState(false);

    useEffect(() => {
        // Method 1: Check for the presence of common ad elements
        const detectAdBlock = () => {
            // Create a bait element that adblock would typically hide
            const testAd = document.createElement('div');
            testAd.innerHTML = '&nbsp;';
            testAd.className = 'adsbox';
            document.body.appendChild(testAd);

            // Give the adblocker a moment to hide the element
            setTimeout(() => {
                // If the element is hidden (height is 0), adblock is likely active
                const isBlocked = testAd.offsetHeight === 0;
                setAdBlockDetected(isBlocked);

                // Clean up the test element
                document.body.removeChild(testAd);

                // If first method didn't detect, try a second approach
                if (!isBlocked) {
                    detectAdBlockFallback();
                }
            }, 100);
        };

        // Method 2: Try to load a fake ad script
        const detectAdBlockFallback = () => {
            const testScript = document.createElement('script');
            testScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
            testScript.onerror = () => setAdBlockDetected(true);
            testScript.onload = () => document.body.removeChild(testScript);
            document.body.appendChild(testScript);
        };

        detectAdBlock();

        // Clean up function
        return () => {
            const testAd = document.querySelector('.adsbox');
            if (testAd) {
                document.body.removeChild(testAd);
            }
        };
    }, []);

    return (
        adBlockDetected && (
            <div className="adblock-overlay">
                <div className="adblock-content">
                    <h3 className="adblock-title">🛑 Adblock Detected</h3>
                    <p className="adblock-message">
                        We notice you're using an ad blocker. Our free live scores and streaming service rely on non-intrusive ads to keep the platform running.
                    </p>
                    <div className="adblock-benefits">
                        <p>
                            <strong>By disabling adblock, you'll get:</strong>
                        </p>
                        <ul className="adblock-list">
                            <li>✅ Uninterrupted live match streams (Football, NBA, Tennis, etc.)</li>
                            <li>✅ Faster loading times for scores and stats</li>
                            <li>✅ Access to exclusive match highlights</li>
                            <li>✅ Priority support during big games</li>
                        </ul>
                    </div>
                    <p className="adblock-request">
                        Help us keep SportBN free for everyone! Please whitelist us in your ad blocker or disable it for our site.
                    </p>
                </div>
            </div>
        )
    );
};

export default ShowPopupAdblock;
