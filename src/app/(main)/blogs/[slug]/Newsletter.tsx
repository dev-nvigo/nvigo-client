export default function Newsletter() {
    return (
        <div className="flex flex-col justify-end">
            <section className="max-w-5xl w-full mx-auto py-14 px-8 bg-[#16B57F] rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
                {/* Text Content */}
                <div className="flex flex-col gap-4 items-center justify-center text-center w-full">
                    <h2 className="text-white text-xl md:text-3xl font-bold leading-tight !font-circular">
                        Join Our Newsletter - Your Study Abroad Insider!
                    </h2>
                    <p className="text-white text-sm md:text-base !font-circular-book max-w-xl">
                        Get expert tips, exclusive deals, and the latest updates on student life, career opportunities, and essential services—straight to your inbox!
                    </p>

                    <div
                        className="flex items-center rounded-full p-2 w-full max-w-lg mt-3"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                    >
                        {/* Input Field */}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 bg-transparent text-black placeholder-black px-4 py-2 outline-none !font-circular-med"
                            style={{ opacity: 0.5 }}
                        />

                        {/* Subscribe Button */}
                        <button className="flex items-center gap-2 bg-white !text-[#2F5B50] !font-circular-med px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105">
                            Subscribe
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-5 h-5">
                                <path d="M15.854 0.146a.5.5 0 0 0-.527-.093l-15 6.5a.5.5 0 0 0 .08.94l5.4 1.543 1.543 5.4a.5.5 0 0 0 .94.08l6.5-15a.5.5 0 0 0-.093-.527zM6.21 8.79l3.48-3.48L4.219 6.5l1.991 2.29zm1.54 1.54l2.29 1.991-1.19-5.472-3.48 3.48 2.38 2.38z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
