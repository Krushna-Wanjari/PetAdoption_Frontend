import axiosClient from "./axiosClient";

/**
 * Pets API — talks to your Spring Boot PetController.
 *
 * ASSUMED endpoints (adjust the paths below if your controller mappings
 * differ):
 *   GET  /api/pets           -> PetResponse[]   (all pets, public)
 *   GET  /api/pets/{id}      -> PetResponse     (one pet, public)
 *   POST /api/pets           -> PetResponse     (create listing, auth required, multipart)
 *
 * ASSUMED PetResponse shape (adjust the mapping in normalizePet(), in
 * src/hooks/usePets.js, if your DTO uses different field names):
 *   {
 *     id, name, species, breed, age, gender, weight, color, city,
 *     vaccinated, sterilized, description, status,
 *     imageUrls: string[],
 *     ownerName, ownerEmail, ownerPhone
 *   }
 *
 * Until these match your real backend, every page that uses this API
 * (Home, Pets, PetDetails) quietly falls back to the local sample data
 * in src/petDataList.js — see usePets.js — so the UI never looks broken
 * while you're wiring the backend up.
 */

export function getAllPets() {
  return axiosClient.get("/pets").then((res) => res.data);
}

export function getPetById(id) {
  return axiosClient.get(`/pets/${id}`).then((res) => res.data);
}

/**
 * @param {FormData} formData - pet fields + an "images" file field
 * (append multiple files under the same "images" key for a multi-file
 * upload; Spring's MultipartFile[] binding expects that).
 */
export function createPetListing(formData) {
  return axiosClient
    .post("/pets", formData, {
      headers: {
        // axiosClient's default Content-Type is "application/json" — we
        // have to clear it here so the browser sets its own
        // "multipart/form-data; boundary=..." header instead. If we leave
        // "application/json" (or set "multipart/form-data" ourselves
        // without a boundary) the request body won't parse on the server.
        "Content-Type": undefined,
      },
    })
    .then((res) => res.data);
}
