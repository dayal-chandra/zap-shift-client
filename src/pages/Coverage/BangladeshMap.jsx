import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import branches from "./branchesData"; // Put your full branches data in a separate file (optional)

// Fix leaflet default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Fly to District Hook
function FlyToOnSearch() {
  const map = useMap();

  useEffect(() => {
    const handleFly = (e) => {
      const searchTerm = e.detail.toLowerCase();
      const found = branches.find(
        (b) =>
          b.district.toLowerCase() === searchTerm ||
          b.city.toLowerCase() === searchTerm
      );
      if (found) {
        map.flyTo([found.latitude, found.longitude], 30, { duration: 1.5 });
      } else {
        alert("District not found!");
      }
    };

    window.addEventListener("flyToDistrict", handleFly);
    return () => window.removeEventListener("flyToDistrict", handleFly);
  }, [map]);

  return null;
}

export default function BangladeshMap() {
  useEffect(() => {
    import("leaflet/dist/leaflet.css");
  }, []);

  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={[23.685, 90.3563]}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full rounded-2xl shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {branches.map((branch, index) => (
          <Marker key={index} position={[branch.latitude, branch.longitude]}>
            <Popup>
              <div>
                <h2 className="font-bold">
                  {branch.city}, {branch.district}
                </h2>
                <p>
                  <strong>Region:</strong> {branch.region}
                </p>
                <p>
                  <strong>Covered Areas:</strong>{" "}
                  {branch.covered_area.join(", ")}
                </p>
                <a
                  href={branch.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Flowchart
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        <FlyToOnSearch />
      </MapContainer>
    </div>
  );
}
