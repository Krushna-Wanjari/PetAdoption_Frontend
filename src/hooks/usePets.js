import { useEffect, useState } from "react";
import { getAllPets, getPetById } from "../api/petsApi";
import mockPets from "../petDataList";

/**
 * Normalizes a pet object from either the real backend (PetResponse) or
 * the local sample data (petDataList.js) into one consistent shape the
 * UI can rely on. This is the one place to edit if your backend's field
 * names don't match the ASSUMED shape documented in api/petsApi.js.
 */
function normalizePet(raw, source) {
  const isMock = source === "mock";

  const images = isMock
    ? [raw.image]
    : raw.imageUrls?.length
    ? raw.imageUrls
    : raw.image
    ? [raw.image]
    : [];

  return {
    id: raw.id,
    name: raw.name,
    species: raw.species ?? "",
    breed: isMock
      ? raw.breed
      : [raw.breed, raw.age ? `${raw.age} yrs` : null].filter(Boolean).join(" • "),
    age: raw.age ?? "",
    gender: raw.gender ?? "",
    weight: raw.weight ?? "",
    color: raw.color ?? "",
    city: raw.city ?? "",
    vaccinated: !!raw.vaccinated,
    sterilized: !!raw.sterilized,
    description: raw.description ?? "",
    status: raw.status ?? "Available",
    image: images[0] ?? null,
    images,
    owner: {
      name: raw.ownerName ?? raw.owner?.name ?? "",
      phone: raw.ownerPhone ?? raw.owner?.phone ?? "",
      email: raw.ownerEmail ?? raw.owner?.email ?? "",
    },
  };
}

/** All pets, for the Home and Pets pages. */
export function usePets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getAllPets();
        if (cancelled) return;
        setPets(data.map((p) => normalizePet(p, "api")));
        setIsFallback(false);
      } catch {
        // Backend not up yet, or the endpoint isn't ready — fall back to
        // sample data so the page still demos well.
        if (cancelled) return;
        setPets(mockPets.map((p) => normalizePet(p, "mock")));
        setIsFallback(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { pets, loading, isFallback };
}

/** A single pet by id, for PetDetails. */
export function usePet(id) {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setNotFound(false);

      try {
        const data = await getPetById(id);
        if (cancelled) return;
        setPet(normalizePet(data, "api"));
        setIsFallback(false);
      } catch {
        if (cancelled) return;
        const fallback = mockPets.find((p) => String(p.id) === String(id));
        if (fallback) {
          setPet(normalizePet(fallback, "mock"));
          setIsFallback(true);
        } else {
          setPet(null);
          setNotFound(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return { pet, loading, notFound, isFallback };
}
