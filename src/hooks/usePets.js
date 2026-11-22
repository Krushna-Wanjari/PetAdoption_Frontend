import { useEffect, useState } from "react";
import {
  getAllPets,
  getPetById,
  getPetGalleryImages,
  STATUS_LABELS,
  GENDER_LABELS,
} from "../api/petsApi";
import mockPets from "../petDataList";

/**
 * Normalizes a pet from either the real backend (PetResponse) or the local
 * sample data (petDataList.js) into the single shape the UI renders from.
 *
 * This is the one place that reconciles the two conventions:
 *  - the backend sends SCREAMING_CASE enums (AVAILABLE / MALE),
 *  - the sample data uses Title Case ("Available" / "Male").
 * Components only ever read `statusLabel` / `genderLabel`, so they never have
 * to care which source a card came from.
 */
function normalizePet(raw, source) {
  const isMock = source === "mock";

  // The main photo wins when present; gallery photos fill in behind it.
  // Previously only imageUrls was read, so a pet whose photo only lived in the
  // gallery and a pet with a main photo were handled inconsistently.
  const images = [
    ...(raw.imageUrl ? [raw.imageUrl] : []),
    ...(Array.isArray(raw.imageUrls) ? raw.imageUrls : []),
    ...(isMock && raw.image ? [raw.image] : []),
  ].filter(Boolean);

  const uniqueImages = [...new Set(images)];

  // "Golden Retriever • 2 yrs" for API pets; sample data already ships composed.
  const breedLine = isMock
    ? raw.breed
    : [raw.breed, raw.age ? `${raw.age} yrs` : null].filter(Boolean).join(" • ");

  const status = raw.status ?? "AVAILABLE";

  return {
    id: raw.id,
    name: raw.name,
    species: raw.species ?? "",
    breed: isMock ? raw.breed?.split(" • ")[0] ?? raw.breed : raw.breed ?? "",
    breedLine,
    age: raw.age ?? "",
    gender: raw.gender ?? "",
    genderLabel: GENDER_LABELS[String(raw.gender ?? "").toUpperCase()] ?? raw.gender ?? "",
    weight: raw.weight ?? "",
    color: raw.color ?? "",
    city: raw.city ?? "",
    vaccinated: Boolean(raw.vaccinated),
    sterilized: Boolean(raw.sterilized),
    description: raw.description ?? "",
    reasonForRehoming: raw.reasonForRehoming ?? "",
    status,
    statusLabel: STATUS_LABELS[String(status).toUpperCase()] ?? status,
    isAdopted: String(status).toUpperCase() === "ADOPTED",
    isPending: String(status).toUpperCase() === "PENDING",
    image: uniqueImages[0] ?? null,
    images: uniqueImages,
    owner: {
      name: raw.ownerName ?? raw.owner?.name ?? "",
      phone: raw.ownerPhone ?? raw.owner?.phone ?? "",
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
      } catch (error) {
        // Keep the demo usable when the API is unreachable, but make the real
        // failure visible instead of silently swapping in sample data.
        if (cancelled) return;
        console.error("usePets: falling back to sample data -", error?.message);
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
        const normalized = normalizePet(data, "api");

        // The pet payload already carries its gallery; only fetch separately
        // when that came back empty, so the extra request is skipped normally.
        if (normalized.images.length === 0) {
          try {
            const gallery = await getPetGalleryImages(id);
            if (!cancelled && gallery.length > 0) {
              const galleryUrls = gallery.map((img) => img.imageUrl).filter(Boolean);
              normalized.images = [...new Set([normalized.image, ...galleryUrls].filter(Boolean))];
              normalized.image = normalized.images[0] ?? null;
            }
          } catch {
            // Gallery endpoint unavailable - the pet still renders.
          }
        }

        setPet(normalized);
        setIsFallback(false);
      } catch (error) {
        if (cancelled) return;
        console.error(`usePet(${id}): falling back to sample data -`, error?.message);
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
