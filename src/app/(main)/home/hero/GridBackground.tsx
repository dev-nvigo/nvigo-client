const GridBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <div
                className="absolute inset-0 grid
                grid-cols-[repeat(auto-fill,minmax(6vw,1fr))]
                grid-rows-[repeat(auto-fill,minmax(6vw,1fr))]
                md:grid-cols-[repeat(auto-fill,minmax(3vw,1fr))]
                md:grid-rows-[repeat(auto-fill,minmax(3vw,1fr))]
                bg-[length:4vw_4vw]
                md:bg-[length:2vw_2vw]
                bg-[linear-gradient(to_right,rgba(86,157,223,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(86,157,223,0.1)_1px,transparent_1px)] 
                md:bg-[linear-gradient(to_right,rgba(86,157,223,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(86,157,223,0.3)_1px,transparent_1px)]"
            />

            <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-white via-white/70 to-transparent" />
        </div>
    );
};

export default GridBackground;
