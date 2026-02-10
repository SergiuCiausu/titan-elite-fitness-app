export async function getUserLocation() {
    const res = await fetch("/api/user-location");
    const coordsData = await res.json();

    return coordsData;
}