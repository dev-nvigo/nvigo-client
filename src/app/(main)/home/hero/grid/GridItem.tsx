import Image from "next/image";
import TrackerLink from "@/components/TrackerLink";

interface GridItemProps {
    src: string;
    alt: string;
    bgColor: string;
    scale: string;
    slug: string;
}

const GridItem: React.FC<GridItemProps> = ({ src, alt, bgColor, scale, slug }) => {
    return (
        <TrackerLink
            className="relative flex items-center justify-center aspect-square rounded-xl"
            style={{ backgroundColor: bgColor }}
            href={`/services?service=${slug}`}
            action="card-click" label={slug} category="Services"
        >
            <Image
                src={src}
                alt={alt}
                width={100}
                height={100}
                className={`max-w-[70%] max-h-[70%] object-contain ${scale ? scale : ""}`}
            />
        </TrackerLink>
    );
};


export default GridItem;


