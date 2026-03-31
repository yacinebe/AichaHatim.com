import { useState } from "react";

// Load all photos from public/pictures
const modules = import.meta.glob("/public/pictures/*.{jpg,JPG,jpeg,JPEG,png,PNG}", { eager: true, query: "?url", import: "default" });
const photos = Object.entries(modules).length
  ? Object.entries(modules).map(([path, url]) => ({ path, url, name: path.split("/").pop() }))
  : [
      "IMG_4586.JPG","IMG_4587.JPG","IMG_4589.JPG","IMG_4591.JPG","IMG_4592.JPG",
      "IMG_4593.JPG","IMG_4594 2.JPG","IMG_4594.JPG","IMG_4595 2.JPG","IMG_4595.JPG",
      "IMG_4596.JPG","IMG_4597 2.JPG","IMG_4597.JPG","IMG_4599.JPG","IMG_4600.JPG",
      "IMG_4601.JPG","IMG_4602.JPG","IMG_4603.JPG","IMG_4604.JPG","IMG_4605.JPG",
      "IMG_4606.JPG","IMG_4607.JPG","IMG_4608.JPG","IMG_4609.JPG","IMG_4610.JPG",
      "IMG_4611.JPG","IMG_4612.JPG","IMG_4613.JPG","IMG_4618.JPG",
    ].map((name) => ({ path: name, url: `/pictures/${name}`, name }));

const SLOTS = [
  { key: "hero", label: "Photo Hero (accueil)", aspect: "4/5", width: 320 },
  { key: "about_home", label: "Photo À propos (accueil)", aspect: "3/4", width: 280 },
  { key: "about_page", label: "Photo page À propos", aspect: "3/4", width: 280 },
];

export default function PhotoPicker() {
  const [selected, setSelected] = useState({});
  const [activeSlot, setActiveSlot] = useState("hero");
  const [preview, setPreview] = useState(null);

  const pick = (photo) => {
    setSelected((prev) => ({ ...prev, [activeSlot]: photo }));
  };

  const currentSlot = SLOTS.find((s) => s.key === activeSlot);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", color: "var(--primary)", marginBottom: "0.5rem" }}>
          Sélecteur de photos
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
          Cliquez sur une photo pour la sélectionner pour chaque emplacement.
        </p>

        {/* Slot selector */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {SLOTS.map((s) => (
            <button
              key={s.key}
              className={`btn btn-sm ${activeSlot === s.key ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setActiveSlot(s.key)}
            >
              {s.label}
              {selected[s.key] && <span style={{ marginLeft: "0.4rem", color: activeSlot === s.key ? "rgba(255,255,255,0.7)" : "var(--accent)" }}>✓</span>}
            </button>
          ))}
        </div>

        {/* Selected previews */}
        {Object.keys(selected).length > 0 && (
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1.5rem", marginBottom: "2rem" }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1rem", color: "var(--primary)" }}>Sélection actuelle</h3>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-start" }}>
              {SLOTS.map((s) => selected[s.key] && (
                <div key={s.key} style={{ display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }}>
                  <img
                    src={selected[s.key].url}
                    alt={s.label}
                    style={{ width: s.width * 0.4, aspectRatio: s.aspect, objectFit: "cover", borderRadius: "var(--radius-sm)" }}
                  />
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", textAlign: "center" }}>{s.label}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--accent)", fontFamily: "monospace" }}>{selected[s.key].name}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.25rem", padding: "1rem", background: "var(--surface-2)", borderRadius: "var(--radius-sm)" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                Noms des fichiers sélectionnés (à copier dans l'admin) :
              </p>
              {SLOTS.map((s) => selected[s.key] && (
                <p key={s.key} style={{ fontSize: "0.82rem", fontFamily: "monospace" }}>
                  <strong>{s.label} :</strong> {selected[s.key].name}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div style={{ background: "rgba(201,169,110,0.1)", border: "1px solid var(--accent)", borderRadius: "var(--radius)", padding: "1rem", marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
            <strong style={{ color: "var(--primary)" }}>Emplacement actif :</strong> {currentSlot?.label} —
            Cliquez sur une photo ci-dessous pour la choisir. Survolez pour agrandir.
          </p>
        </div>

        {/* Photo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {photos.map((photo) => {
            const isSelected = selected[activeSlot]?.name === photo.name;
            return (
              <div
                key={photo.path}
                onClick={() => pick(photo)}
                style={{
                  cursor: "pointer",
                  border: isSelected ? "3px solid var(--accent)" : "3px solid transparent",
                  borderRadius: "var(--radius)",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  boxShadow: isSelected ? "0 0 0 2px var(--accent)" : "0 2px 8px rgba(0,0,0,0.08)",
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = isSelected ? "0 0 0 2px var(--accent)" : "0 2px 8px rgba(0,0,0,0.08)"; }}
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  style={{ width: "100%", aspectRatio: currentSlot?.aspect ?? "4/5", objectFit: "cover", display: "block" }}
                />
                {isSelected && (
                  <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", background: "var(--accent)", color: "#fff", borderRadius: "50%", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.9rem" }}>
                    ✓
                  </div>
                )}
                <div style={{ padding: "0.5rem 0.75rem", background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
                  <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{photo.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full preview modal */}
        {preview && (
          <div
            onClick={() => setPreview(null)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", cursor: "zoom-out" }}
          >
            <img src={preview.url} alt={preview.name} style={{ maxHeight: "90vh", maxWidth: "90vw", objectFit: "contain", borderRadius: "var(--radius)" }} />
          </div>
        )}
      </div>
    </div>
  );
}
