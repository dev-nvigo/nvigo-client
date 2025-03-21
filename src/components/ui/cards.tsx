"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import { COMINGSOON } from "@/components/ConstantLinks";


interface CardProps {
    frame: string;
    title: string;
    description: string;
    image?: string;
    service?: {
        name: string;
        color: string;
    };
    rating?: number;
    author?: {
        avatar: string;
        name: string;
    };
}

interface CardsProps {
    cards: CardProps[];
    className?: string;
    cardClassName?: string;
}

const Cards: React.FC<CardsProps> = ({ cards, className = "", cardClassName = "" }) => {
    const router = useRouter();

    return (
        <div className={`${className}`}>
            {cards.map((card, index) => (
                <div
                    key={index}
                    onClick={() => router.push(COMINGSOON)}
                    className={`cursor-pointer rounded-xl overflow-hidden shadow-md relative flex flex-col flex-grow border-black border-[0.5px] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-opacity-90 ${cardClassName}`}
                >
                    <div className="relative w-full aspect-[16/9]">
                        <Image
                            src={card.frame}
                            alt={`${card.title} frame`}
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                        {card.service && (
                            <div
                                className="absolute top-3 right-3 px-3 py-1 rounded-lg inline-flex justify-start items-start"
                                style={{ backgroundColor: card.service.color }}
                            >
                                <span className="text-black text-sm !font-circular-book font-bold uppercase tracking-wide">
                                    {card.service.name}
                                </span>
                            </div>
                        )}

                        {card.image && <div className="absolute inset-0 flex items-center justify-center">
                            <Image
                                src={card.image}
                                alt={card.title}
                                width={0}
                                height={0}
                                sizes="40vw"
                                className="w-[60%] h-auto object-contain"
                                priority
                            />
                        </div>}
                    </div>

                    <div className="bg-[#2F2E43] text-white py-4 px-5 flex flex-col h-full justify-between">
                        <h3 className="text-sm leading-tight !font-circular font-bold break-words whitespace-normal">{card.title}</h3>
                        <p className="text-xs text-c-white-400 py-2 !font-circular-book break-words whitespace-normal">{card.description}</p>

                        {card.rating !== undefined && (
                            <div className="flex gap-1 py-2">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span key={index} className="text-yellow-400 text-lg">
                                        {index < (card.rating ?? 0) ? <FaStar /> : <FaRegStar className="text-gray-500" />}
                                    </span>
                                ))}
                            </div>
                        )}

                        {card.author && <div className="flex items-center gap-2">
                            <div className="w-1/8 max-w-[2rem] aspect-square rounded-full overflow-hidden bg-gray-800">
                                <Image
                                    src={card.author.avatar}
                                    alt={card.author.name}
                                    layout="responsive"
                                    width={1}
                                    height={1}
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-[#5C5C76] text-xs !font-circular-med">
                                {card.author.name}
                            </div>
                        </div>}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default Cards;
