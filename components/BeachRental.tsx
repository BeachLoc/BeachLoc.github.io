import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";

const lockers = [
  { id: 1, name: "Locker 1", lat: 48.8566, lng: 2.3522 },
  { id: 2, name: "Locker 2", lat: 48.857, lng: 2.353 },
  // Ajoute ici les 12 autres lockers avec leurs coordonnées GPS
];

export default function BeachRental() {
  const [user, setUser] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const handleLogin = () => {
    // Simule une connexion utilisateur
    setUser({ name: "Utilisateur" });
  };

  const handleReserve = (locker) => {
    // Simule la génération d'un QR Code pour une réservation
    const generatedQr = `QR-${locker.id}-${Date.now()}`;
    setQrCode(generatedQr);
    alert(`Réservation confirmée ! Votre QR code : ${generatedQr}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Location de Matériel de Plage</h1>
      {!user ? (
        <Button onClick={handleLogin}>Se connecter</Button>
      ) : (
        <p>Bienvenue, {user.name}!</p>
      )}
      <MapContainer center={[48.8566, 2.3522]} zoom={14} className="h-96 w-full mt-4">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {lockers.map((locker) => (
          <Marker key={locker.id} position={[locker.lat, locker.lng]}>
            <Popup>
              {locker.name} <br />
              <Button onClick={() => handleReserve(locker)}>Réserver</Button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {qrCode && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <p>Votre QR Code : {qrCode}</p>
        </div>
      )}
    </div>
  );
}
