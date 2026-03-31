const API = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function req(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    credentials: "include",
    headers: opts.body instanceof FormData ? {} : { "Content-Type": "application/json" },
    ...opts,
  });
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) throw Object.assign(new Error(data?.error ?? `API ${res.status}`), { status: res.status });
  return data;
}

// Public
export const api = {
  getContent: (page) => req(`/content/${page}`),
  getTestimonials: () => req("/testimonials"),
  getFaq: () => req("/faq"),
  getEpisodes: () => req("/podcast/episodes"),
  getSocialLinks: () => req("/social-links"),
  subscribe: (email, source) => req("/subscribe", { method: "POST", body: JSON.stringify({ email, source }) }),
  getPublicResources: () => req("/resources/public"),

  // Client auth
  requestMagicLink: (email) => req("/auth/magic-link", { method: "POST", body: JSON.stringify({ email }) }),
  logout: () => req("/auth/logout", { method: "POST" }),
  getMe: () => req("/auth/me"),

  // Client area
  getResources: () => req("/resources"),
  getWorkbook: () => req("/workbook"),
  saveWorkbookResponses: (responses) => req("/workbook/responses", { method: "PUT", body: JSON.stringify(responses) }),
  getProducts: () => req("/products"),
  checkout: (product_id) => req("/checkout", { method: "POST", body: JSON.stringify({ product_id }) }),

  // Admin auth
  adminLogin: (password) => req("/admin/login", { method: "POST", body: JSON.stringify({ password }) }),
  adminLogout: () => req("/admin/logout", { method: "POST" }),
  adminMe: () => req("/admin/me"),

  // Admin CMS
  getAdminPage: (page) => req(`/admin/pages/${page}`),
  updateAdminPage: (page, data) => req(`/admin/pages/${page}`, { method: "PUT", body: JSON.stringify(data) }),

  getAdminTestimonials: () => req("/admin/testimonials"),
  createTestimonial: (data) => req("/admin/testimonials", { method: "POST", body: JSON.stringify(data) }),
  updateTestimonial: (id, data) => req(`/admin/testimonials/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteTestimonial: (id) => req(`/admin/testimonials/${id}`, { method: "DELETE" }),
  reorderTestimonials: (items) => req("/admin/testimonials/reorder", { method: "PATCH", body: JSON.stringify(items) }),

  getAdminFaq: () => req("/admin/faq"),
  createFaq: (data) => req("/admin/faq", { method: "POST", body: JSON.stringify(data) }),
  updateFaq: (id, data) => req(`/admin/faq/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteFaq: (id) => req(`/admin/faq/${id}`, { method: "DELETE" }),
  reorderFaq: (items) => req("/admin/faq/reorder", { method: "PATCH", body: JSON.stringify(items) }),

  getAdminPodcast: () => req("/admin/podcast"),
  createEpisode: (data) => req("/admin/podcast", { method: "POST", body: JSON.stringify(data) }),
  updateEpisode: (id, data) => req(`/admin/podcast/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteEpisode: (id) => req(`/admin/podcast/${id}`, { method: "DELETE" }),
  reorderEpisodes: (items) => req("/admin/podcast/reorder", { method: "PATCH", body: JSON.stringify(items) }),

  getAdminResources: () => req("/admin/resources"),
  createResource: (data) => req("/admin/resources", { method: "POST", body: JSON.stringify(data) }),
  uploadResource: (formData) => req("/admin/resources/upload", { method: "POST", body: formData }),
  updateResource: (id, data) => req(`/admin/resources/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteResource: (id) => req(`/admin/resources/${id}`, { method: "DELETE" }),

  getAdminProducts: () => req("/admin/products"),
  createProduct: (data) => req("/admin/products", { method: "POST", body: JSON.stringify(data) }),
  updateProduct: (id, data) => req(`/admin/products/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteProduct: (id) => req(`/admin/products/${id}`, { method: "DELETE" }),

  getAdminWorkbook: () => req("/admin/workbook"),
  createSection: (data) => req("/admin/workbook/sections", { method: "POST", body: JSON.stringify(data) }),
  updateSection: (id, data) => req(`/admin/workbook/sections/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteSection: (id) => req(`/admin/workbook/sections/${id}`, { method: "DELETE" }),
  createQuestion: (data) => req("/admin/workbook/questions", { method: "POST", body: JSON.stringify(data) }),
  updateQuestion: (id, data) => req(`/admin/workbook/questions/${id}`, { method: "PATCH", body: JSON.stringify(data) }),
  deleteQuestion: (id) => req(`/admin/workbook/questions/${id}`, { method: "DELETE" }),

  getAdminMedia: () => req("/admin/media"),
  uploadMedia: (formData) => req("/admin/media", { method: "POST", body: formData }),
  deleteMedia: (id) => req(`/admin/media/${id}`, { method: "DELETE" }),

  getAdminSocialLinks: () => req("/admin/social-links"),
  updateSocialLinks: (links) => req("/admin/social-links", { method: "PUT", body: JSON.stringify(links) }),

  getAdminClients: (search = "") => req(`/admin/clients${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  getAdminSubscribers: () => req("/admin/subscribers"),
};
