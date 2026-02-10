import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://ipinfo.io/json");
    if (!res.ok) throw new Error("Failed to fetch IP location");
    const data = await res.json();

    const region = data.region;
    const lastSpace = region.lastIndexOf(" ");

    return NextResponse.json({
      state: lastSpace === -1 ? region : region.substring(0, lastSpace),
      city: data.city,
      country: data.country,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to get location" }, { status: 500 });
  }
}