import GridItem from "./GridItem";
import { gridData } from "@/data/heroItems";

const ImageGrid = () => {
    return (
        <div className="hidden md:grid grid-cols-3 grid-rows-3 gap-4 w-[90vw] h-[90vw] md:w-[30vw] md:h-[30vw] mt-5 md:mt-0">
            {gridData.map((item, index) => (
                <GridItem key={index} {...item} />
            ))}
        </div>
    );
};

export default ImageGrid;
