import React from 'react';
import Image from 'next/image';
import { FaGoogle, FaApple, FaMicrosoft } from 'react-icons/fa';


const AuthFooter: React.FC = () => {
    return (
        <div className="flex flex-col items-center space-y-6">
            {/* Divider with OR */}
            <div className="flex items-center space-x-2">
                <div className="w-16 h-px bg-gray-300"></div>
                <span className="text-gray-500 !font-circular-book">OR</span>
                <div className="w-16 h-px bg-gray-300"></div>
            </div>

            {/* Social Sign-in Buttons */}
            <div className="flex space-x-4">
                {/* Google Button */}
                <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                    <FaGoogle size={16} />
                </button>

                {/* Apple Button */}
                <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                    <FaApple size={16} />
                </button>

                {/* Microsoft Button */}
                <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-md hover:bg-gray-100"
                >
                    <FaMicrosoft size={16} />
                </button>
            </div>

            {/* Terms & Privacy Text */}
            <p className="text-center text-sm text-gray-500 max-w-md !font-circular-book">
                By signing up to create an account I accept Company’s{' '}
                <a
                    href="#"
                    className="text-c-blue-100 hover:text-c-blue-200-h"
                >
                    Terms of use
                </a>{' '}
                &{' '}
                <a
                    href="#"
                    className="text-c-blue-100 hover:text-c-blue-200-h"
                >
                    Privacy Policy
                </a>.
            </p>
        </div>
    );
};

export default AuthFooter;
