import Image from "next/image";

interface Author { name: string; avatar: string; bio: string };
interface AuthorInfoProps { author: Author };

const AuthorInfo: React.FC<AuthorInfoProps> = ({ author }) => {
    return (
        <div className="bg-c-white-150 p-6 rounded-xl shadow-md max-w-md mx-auto">
            {/* Title */}
            <h3 className="text-c-white-900 text-lg !font-circular-med text-center mb-4">
                ABOUT THE AUTHOR
            </h3>

            {/* Author Image */}
            <div className="flex justify-center">
                <div className="w-1/2 max-w-[8rem] aspect-square rounded-full overflow-hidden bg-gray-800">
                    <Image
                        src={`/images/authors/${author.avatar}`}
                        alt={author.name}
                        layout="responsive"
                        width={1}
                        height={1}
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Author Name */}
            <h4 className="text-[#16B57F] text-lg text-center mt-4 !font-circular font-bold">
                {author.name.toUpperCase()}
            </h4>

            {/* Author Description */}
            <p className="text-c-white-800 text-sm !font-circular-book text-justify mt-2 leading-relaxed">
                {author.bio}
            </p>
        </div>
    );
};

export default AuthorInfo;

