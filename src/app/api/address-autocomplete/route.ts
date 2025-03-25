import { NextResponse } from "next/server"

const LOCATIONIQ_API_KEY = process.env.LOCATIONIQ_API_KEY

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get("query")
    const country = searchParams.get("country")

    if (!query || !country) {
        return NextResponse.json({ message: "Missing query or country" }, { status: 400 })
    }

    const url = `https://api.locationiq.com/v1/autocomplete?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(
        query
    )}&limit=15&countrycodes=${country.toLowerCase()}&normalizecity=1&dedupe=1&format=json`

    console.log(url);
    
    try {
        const res = await fetch(url)
        const data = await res.json()

        if (!Array.isArray(data)) {
            console.error("LocationIQ error:", data)
            return NextResponse.json({ suggestions: [] })
        }

        const suggestions = data.map((item) => ({
            fullAddress: item.display_name,
            city: item.address.city || item.address.town || item.address.village || "",
            state: item.address.state || "",
            postalCode: item.address.postcode || "",
        }))

        return NextResponse.json({ suggestions })
    } catch (err) {
        console.error("LocationIQ request failed", err)
        return NextResponse.json({ suggestions: [] }, { status: 500 })
    }
}
