"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { HOME } from "@/components/ConstantLinks";


interface SubscribeProps {
    isHero?: boolean;
}

const Subscribe: React.FC<SubscribeProps> = ({ isHero = false }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const headerFont = isHero ? "text-center !font-circular-book text-c-white-700 mt-5 md:mt-10 text-xl sm:text-xl md:text-3xl" : "!font-circular text-black text-xl sm:text-xl md:text-3xl";
    const inputFormat = isHero ? "hidden md:block" : "";
    const divFormat = isHero ? "flex flex-col items-center md:block" : "";
    const paraText = isHero ? "..." : "- with all the features and services you need!";

    const router = useRouter();

    // Open the modal when Subscribe is clicked
    const handleSubscribeClick = () => {
        setShowPopup(true);
        setMessage('');
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
            setMessage('Successfully subscribed!');

            setTimeout(() => {
                setShowPopup(false);
                setEmail('');
                setFirstName('');
                setLastName('');
                router.push(HOME);
            }, 2000);
        } else {
            setMessage(data.error || 'Something went wrong');
        }
    };

    return (
        <div className={divFormat}>
            <h1 className={`mt-4 ${headerFont}`}>
                We&apos;re Almost Ready to Launch! 🚀
            </h1>

            {/* Content */}
            {!isHero && <>
                <p className="mt-3 text-xs sm:text-xs md:text-sm !font-circular-book text-c-white-800 max-w-2xl">
                    Very soon, <span className="!font-circular font-bold">Nvigo</span> will be fully live {paraText}
                </p>
                <p className="text-xs sm:text-xs md:text-sm !font-circular-book text-c-white-800">
                    In the meantime, stay tuned and get ready for something exciting. 🎉
                </p>
            </>}


            <div className="p-2 bg-[#16B57F] rounded-full shadow-lg mt-4 w-fit md:w-auto">
                <div className="flex flex-row gap-4 items-center justify-center text-center">
                    <div
                        className="flex items-center rounded-full p-2 w-full max-w-lg bg-white/40"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity animate-fadeIn">
                    <div className="bg-white/80 p-8 rounded-xl shadow-2xl text-center w-[90vw] max-w-md transform transition-all scale-95 hover:scale-100">
                        <h2 className="text-[#232536] text-lg !font-circular font-bold">Subscribe to receive Updates</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full p-3 mt-4 border border-gray-300 !font-circular-med rounded-md bg-gray-100 text-gray-700 focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="block w-full p-3 mt-2 border border-gray-300 !font-circular-med rounded-md focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
