import GridItem from "./GridItem";

const gridItems = [
    { src: "/svgs/image1.svg", alt: "Traveler", bgColor: "#569DDF", scale: "" },
    { src: "/svgs/image2.svg", alt: "Car", bgColor: "#FF9A9E", scale: "scale-125" },
    { src: "/svgs/image3.svg", alt: "Seated Person", bgColor: "#D7D3E4", scale: "" },
    { src: "/svgs/image4.svg", alt: "Sitting Person", bgColor: "#FE6B64", scale: "" },
    { src: "/svgs/image5.svg", alt: "BBQ", bgColor: "#C2785D", scale: "scale-115" },
    { src: "/svgs/image6.svg", alt: "Bank Card", bgColor: "#61C986", scale: "" },
    { src: "/svgs/image7.svg", alt: "Headphones", bgColor: "#FFC107", scale: "scale-120" },
    { src: "/svgs/image8.svg", alt: "Phone", bgColor: "#A7F2ED", scale: "" },
    { src: "/svgs/image9.svg", alt: "Lamp", bgColor: "#FDB900", scale: "" },
];

const ImageGrid = () => {
    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4 w-[90vw] h-[90vw] md:w-[30vw] md:h-[30vw] mt-5 md:mt-0">
            {gridItems.map((item, index) => (
                <GridItem key={index} {...item} />
            ))}
        </div>
    );
};

export default ImageGrid;
