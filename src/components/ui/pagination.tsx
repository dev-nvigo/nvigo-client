"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { BiDotsHorizontalRounded } from "react-icons/bi";

interface PaginationProps {
    totalPages: number;
    basePath: string;
    scrollBehavior?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, basePath, scrollBehavior = false }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const changePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        if (newPage === 1) {
            params.delete("page");
        } else {
            params.set("page", newPage.toString());
        }
        router.push(`${basePath}?${params.toString()}`, { scroll: scrollBehavior });
    };

    return (
        <div className="flex justify-center items-center mt-6 gap-2 text-sm font-inter">
            {/* Previous Button */}
            <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 flex items-center gap-1 rounded-md 
                    ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-200 transition-transform transform hover:scale-105"}`}
            >
                <span className="text-lg">←</span> Previous
            </button>

            {/* First Page Button */}
            <button
                onClick={() => changePage(1)}
                className={`px-3 py-2 rounded-md ${currentPage === 1
                    ? "bg-gray-900 text-white"
                    : "bg-gray-200 hover:bg-gray-300"} transition-transform transform hover:scale-105`}
            >
                1
            </button>

            {/* Ellipsis before middle pages */}
            {currentPage > 3 && totalPages > 3 && (
                <span className="flex items-center justify-center w-8 h-8 text-gray-500">
                    <BiDotsHorizontalRounded className="w-5 h-5" />
                </span>
            )}

            {/* Middle Pages */}
            {[...Array(totalPages)]
                .map((_, index) => index + 1)
                .filter(page => page !== 1 && page !== totalPages && (page >= currentPage - 1 && page <= currentPage + 1))
                .map(page => (
                    <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`px-3 py-2 rounded-md ${currentPage === page
                            ? "bg-gray-900 text-white"
                            : "bg-gray-200 hover:bg-gray-300"} transition-transform transform hover:scale-105`}
                    >
                        {page}
                    </button>
                ))}

            {/* Ellipsis after middle pages */}
            {currentPage < totalPages - 2 && totalPages > 3 && (
                <span className="flex items-center justify-center w-8 h-8 text-gray-500">
                    <BiDotsHorizontalRounded className="w-5 h-5" />
                </span>
            )}

            {/* Last Page Button */}
            {totalPages > 1 && (
                <button
                    onClick={() => changePage(totalPages)}
                    className={`px-3 py-2 rounded-md ${currentPage === totalPages
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 hover:bg-gray-300"} transition-transform transform hover:scale-105`}
                >
                    {totalPages}
                </button>
            )}

            {/* Next Button */}
            <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 flex items-center gap-1 rounded-md 
                    ${currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-200 transition-transform transform hover:scale-105"}`}
            >
                Next <span className="text-lg">→</span>
            </button>
        </div>
    );
};

export default Pagination;
