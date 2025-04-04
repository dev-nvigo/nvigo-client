import Image from "next/image";

interface GridItemProps {
    src: string;
    alt: string;
    bgColor: string;
    scale: string;
}

const GridItem: React.FC<GridItemProps> = ({ src, alt, bgColor, scale }) => {
    return (
        <div
            className="relative flex items-center justify-center aspect-square rounded-xl"
            style={{ backgroundColor: bgColor }}
        >
            <Image
                src={src}
                alt={alt}
                width={100}
                height={100}
                className={`max-w-[70%] max-h-[70%] object-contain ${scale ? scale : ""}`}
            />
        </div>
    );
};


export default GridItem;


