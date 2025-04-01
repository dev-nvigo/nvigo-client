export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const getOrdinal = (n: number): string => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${getOrdinal(day)} ${month}, ${year}`;
}


export const formatAddress = (address: {
    name: string
    house_number: string
    road: string
}) => {
    const { name, house_number, road } = address;

    // Create an array to hold the address components
    const formattedAddressParts = [];

    // Include house number, if available
    if (house_number) formattedAddressParts.push(house_number);
    if (road) formattedAddressParts.push(road);
    
    // Include 'name' if it’s not the same as 'road'
    if (name && name !== road) {
        formattedAddressParts.unshift(name);  // Add 'name' at the beginning if it's not the same as 'road'
    }

    // Join all components with commas and a space, ensuring no trailing or leading commas
    return formattedAddressParts.join(", ");
};
