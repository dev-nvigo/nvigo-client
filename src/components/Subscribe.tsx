"use client";

import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { HOME } from "@/components/ConstantLinks";
import { event } from "@/lib/gtag";

interface SubscribeProps {
    isHero?: boolean;
    isNewsletter?: boolean;
}

const Subscribe: React.FC<SubscribeProps> = ({ isHero = false, isNewsletter = false }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [fieldsInteracted, setFieldsInteracted] = useState(new Set<string>());

    const headerFont = isHero ? "text-center !font-circular-book text-c-white-700 mt-5 md:mt-10 text-xl sm:text-xl md:text-3xl" : "!font-circular text-black text-xl sm:text-xl md:text-3xl";
    const inputFormat = (isHero || isNewsletter) ? "hidden md:block" : "";
    const divFormat = (isHero || isNewsletter) ? "flex flex-col items-center md:block" : "";
    const paraText = isHero ? "..." : "- with all the features and services you need!";

    const router = useRouter();
    const divClass = isNewsletter ? "max-w-5xl w-full mx-auto py-14 px-8 bg-[#16B57F] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center" : "p-2 bg-[#16B57F] rounded-full shadow-lg mt-4 w-fit md:w-auto";

    // Reusable event tracking function
    const trackEvent = (action: string, label: string, value: number = 1) => {
        console.log("Tracking event", action, label);
        
        event({
            action: action,
            category: "Subscription",
            label: label,
            value: value,
        });
    };

    // Open the modal when Subscribe is clicked
    const handleSubscribeClick = () => {
        trackEvent("click", "Subscribe Button");
        setShowPopup(true);
        setMessage('');
    };

    // Track field focus
    const handleFieldFocus = (field: string) => {
        if (!fieldsInteracted.has(field)) {
            setFieldsInteracted(prev => new Set(prev).add(field));  // Ensure it's only tracked once
            trackEvent("focus", `${field} Field Focused`);
        }
    };

    // Track field completion (when user starts typing)
    const handleFieldCompletion = (field: string, value: string) => {
        if (value && !fieldsInteracted.has(field)) {
            setFieldsInteracted(prev => new Set(prev).add(field));  // Ensure completion is tracked
            trackEvent("complete", `${field} Field Completed`);
        }
    };

    // Handle final submission to API
    const handleFinalSubmit = async () => {
        setLoading(true);
        setMessage('');

        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, first_name: firstName, last_name: lastName }),
        });

        const data = await response.json();
        setLoading(false);

        if (response.ok) {
            trackEvent("submit", "Form Submitted - Success");
            setMessage('Successfully subscribed!');

            setTimeout(() => {
                setShowPopup(false);
                setEmail('');
                setFirstName('');
                setLastName('');
                router.push(HOME);
            }, 2000);
        } else {
            trackEvent("submit", "Form Submitted - Failure");
            setMessage(data.error || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (showPopup) {
            document.body.style.overflow = 'hidden'; // Disable scrolling
        } else {
            document.body.style.overflow = ''; // Restore scrolling
        }

        return () => {
            document.body.style.overflow = ''; // Clean up on component unmount
        };
    }, [showPopup]);

    return (
        <div className={divFormat}>
            {!isNewsletter && <h1 className={`mt-4 ${headerFont}`}>
                We&apos;re Almost Ready to Launch! 🚀
            </h1>}

            {/* Content */}
            {(!isHero && !isNewsletter) && <>
                <p className="mt-3 text-xs sm:text-xs md:text-sm !font-circular-book text-c-white-800 max-w-2xl">
                    Very soon, <span className="!font-circular font-bold">NviGo</span> will be fully live {paraText}
                </p>
                <p className="text-xs sm:text-xs md:text-sm !font-circular-book text-c-white-800">
                    In the meantime, stay tuned and get ready for something exciting. 🎉
                </p>
            </>}

            <div className={divClass}>
                <div className="flex flex-col gap-4 items-center justify-center text-center">
                    {isNewsletter && <h2 className="text-white text-xl md:text-3xl font-bold leading-tight !font-circular">
                        Join Our Newsletter - Your Study Abroad Insider!
                    </h2>}
                    {isNewsletter && <p className="text-white text-sm md:text-base !font-circular-book max-w-xl">
                        Get expert tips, exclusive deals, and the latest updates on student life, career opportunities, and essential services—straight to your inbox!
                    </p>}
                    <div
                        className="flex items-center justify-center rounded-full p-2 w-fit md:w-full max-w-lg bg-white/40"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => handleFieldFocus("Email")}
                            onBlur={() => handleFieldCompletion("Email", email)}
                            className={`flex-1 bg-transparent text-black placeholder-black px-4 py-2 outline-none !font-circular-med text-sm opacity-50 autofill:bg-transparent autofill:text-black ${inputFormat}`}
                            style={{
                                opacity: 0.5,
                                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                                WebkitTextFillColor: "#000",
                            }}
                        />

                        <button
                            onClick={handleSubscribeClick}
                            className="flex items-center gap-2 bg-white !text-[#2F5B50] !font-circular-med px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105 text-sm"
                        >
                            Subscribe
                            <Image
                                src="/svgs/subscribe.svg"
                                alt="Subscribe Icon"
                                width={20}
                                height={20}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Popup Modal for Name Input */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity animate-fadeIn z-50">
                    <div className="bg-white/80 p-8 rounded-xl shadow-2xl text-center w-[90vw] max-w-md transform transition-all scale-95 hover:scale-100">
                        <h2 className="text-[#232536] text-lg !font-circular font-bold">Subscribe to receive Updates</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                handleFieldCompletion("Email - Popup", e.target.value);
                            }}
                            onFocus={() => handleFieldFocus("Email - Popup")}
                            className="block w-full p-3 mt-4 border border-gray-300 !font-circular-med rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                handleFieldCompletion("First Name - Popup", e.target.value);
                            }}
                            onFocus={() => handleFieldFocus("First Name - Popup")}
                            className="block w-full p-3 mt-2 border border-gray-300 !font-circular-med rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                handleFieldCompletion("Last Name - Popup", e.target.value);
                            }}
                            onFocus={() => handleFieldFocus("Last Name - Popup")}
                            className="block w-full p-3 mt-2 border border-gray-300 !font-circular-med rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                        />

                        <button
                            onClick={handleFinalSubmit}
                            disabled={loading}
                            className="w-full p-3 mt-4 text-white bg-green-600 !font-circular-med rounded-md hover:bg-green-700 transition-all focus:ring-2 focus:ring-green-500"
                        >
                            {loading ? 'Subscribing...' : 'Submit'}
                        </button>

                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-3 text-gray-500 hover:text-gray-800 underline !font-circular-med text-sm transition-colors"
                        >
                            Cancel
                        </button>

                        {message && <p className="mt-4 text-green-600 font-medium animate-pulse">{message}</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Subscribe;
