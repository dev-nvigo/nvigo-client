type AuthHeaderProps = {
    current: "login" | "signup";
    onChange: (view: "login" | "signup") => void;
};

const AuthHeader: React.FC<AuthHeaderProps> = ({ current, onChange }) => {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="flex gap-2 bg-white border border-c-blue-100 rounded-xl p-1 w-[60%]">
                <button
                    onClick={() => onChange("signup")}
                    className={`flex-1 text-base !font-satoshi-med py-2 px-6 rounded-xl 
              ${current === "signup" ? 'bg-c-blue-100 text-white' : 'bg-transparent text-c-white-700'} 
              hover:bg-[#3B9EDC] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
                >
                    Sign Up
                </button>

                <button
                    onClick={() => onChange("login")}
                    className={`flex-1 text-base !font-satoshi py-2 px-6 rounded-xl 
              ${current === "login" ? 'bg-c-blue-100 text-white' : 'bg-transparent text-c-white-700'} 
              hover:bg-[#3B9EDC] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default AuthHeader;
