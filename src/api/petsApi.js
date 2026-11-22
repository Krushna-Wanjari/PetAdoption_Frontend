import axiosClient from "./axiosClient";

/**
 * Pets API — talks to the Spring Boot PetController.
 *
 * Endpoints:
 *   GET    /api/pets                  -> PetResponse[]  (public, optional
 *                                        ?status= | ?species= | ?q= filters)
 *   GET    /api/pets/{id}             -> PetResponse     (public)
 *   POST   /api/pets                  -> PetResponse     (ADMIN)
 *   PUT    /api/pets/{id}             -> PetResponse     (ADMIN)
 *   PATCH  /api/pets/{id}/status      -> PetResponse     (ADMIN)
 *   DELETE /api/pets/{id}             -> string          (ADMIN)
 *   GET    /api/pets/{id}/images      -> PetImageResponse[] (public)
 *   POST   /api/pets/{id}/images      -> PetImageResponse (ADMIN, multipart)
 *
 * PetResponse fields consumed by the UI:
 *   id, name, species, breed, age, gender, status, description,
 *   imageUrl, imageUrls[], city, weight, color, vaccinated, sterilized,
 *   reasonForRehoming, ownerName, ownerPhone, createdAt
 *
 * Field-name differences between the API and src/petDataList.js are reconciled
 * in normalizePet() inside src/hooks/usePets.js.
 */

/** Backend enum -> display label. */
export const STATUS_LABELS = {
  AVAILABLE: "Available",
  PENDING: "Pending",
  ADOPTED: "Adopted",
};

export const GENDER_LABELS = {
  MALE: "Male",
  FEMALE: "Female",
};

export function getAllPets() {
  return axiosClient.get("/pets").then((res) => res.data);
}

export function getPetsBySpecies(species) {
  return axiosClient
    .get("/pets", { params: { species } })
    .then((res) => res.data);
}

export function getPetsByStatus(status) {
  return axiosClient
    .get("/pets", { params: { status } })
    .then((res) => res.data);
}

export function searchPets(query) {
  return axiosClient
    .get("/pets", { params: { q: query } })
    .then((res) => res.data);
}

export function getPetById(id) {
  return axiosClient.get(`/pets/${id}`).then((res) => res.data);
}

export function getPetGalleryImages(id) {
  return axiosClient.get(`/pets/${id}/images`).then((res) => res.data);
}

export function deletePet(petId) {
  return axiosClient.delete(`/pets/${petId}`).then((res) => res.data);
}

export function updatePet(petId, data) {
  return axiosClient.put(`/pets/${petId}`, data).then((res) => res.data);
}

export function updatePetStatus(petId, status) {
  return axiosClient
    .patch(`/pets/${petId}/status`, null, { params: { status } })
    .then((res) => res.data);
}

/**
 * Creates a pet listing as JSON (matches backend PetRequest).
 * @param {Object} petData - { name, species, breed, age, gender, description,
 *                             city, weight, color, vaccinated, sterilized,
 *                             reasonForRehoming, ownerName, ownerPhone }
 */
export function createPetListing(petData) {
  return axiosClient.post("/pets", petData).then((res) => res.data);
}

/**
 * Uploads a photo into a pet's gallery (multipart/form-data).
 * @param {number} petId
 * @param {File} file
 */
export function uploadPetImage(petId, file) {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient
    .post(`/pets/${petId}/images`, formData, {
      // Let the browser set multipart/form-data with its own boundary. Passing
      // "Content-Type: application/json" here (the axios instance default)
      // makes the server try to parse the body as JSON and reject the upload.
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

/** Replaces a pet's main photo (multipart/form-data). */
export function setPetMainImage(petId, file) {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient
    .post(`/pets/${petId}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
}

// ---------------------------------------------------------------- adoptions

/**
 * POST /api/adoptions
 * Body: { petId, message }
 * Returns AdoptionResponseDto: { requestId, userId, userName, petId, petName,
 *                                 status, message, createdAt }
 */
export function requestAdoption(petId, message = "") {
  return axiosClient
    .post("/adoptions", { petId, message })
    .then((res) => res.data);
}

/** GET /api/adoptions/my — the signed-in user's own requests. */
export function getMyAdoptions() {
  return axiosClient.get("/adoptions/my").then((res) => res.data);
}

export async function getMyPets() {
  const response = await axiosClient.get("/pets/mine");
  return response.data;
}

export async function updatePetListing(id, payload) {
  const response = await axiosClient.put(`/pets/${id}`, payload);
  return response.data;
}

export async function deletePetListing(id) {
  const response = await axiosClient.delete(`/pets/${id}`);
  return response.data;
}

export async function getReceivedAdoptions() {
  const response = await axiosClient.get("/adoptions/received");
  return response.data;
}

export async function approveAdoption(requestId) {
  const response = await axiosClient.put(`/adoptions/${requestId}/approve`);
  return response.data;
}

export async function rejectAdoption(requestId) {
  const response = await axiosClient.put(`/adoptions/${requestId}/reject`);
  return response.data;
}

// ---------------------------------------------------------------- users

/** GET /api/users/me — live profile for the signed-in user. */
export function getCurrentUser() {
  return axiosClient.get("/users/me").then((res) => res.data);
}
