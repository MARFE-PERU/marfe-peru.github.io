const galleries = {
  "vestido-negro": {
    title: "Vestido Negro",
    images: [
      "images/productos/vestido-negro-01.png",
      "images/productos/vestido-negro-02.png",
      "images/productos/vestido-negro-03.png"
    ],
    alts: ["Vestido Negro, detalle posterior", "Vestido Negro, vista completa", "Vestido Negro, vista lateral"]
  },
  "vestido-rose": {
    title: "Vestido Rosé",
    images: [
      "images/productos/vestido-rose-01.png",
      "images/productos/vestido-rose-02.png"
    ],
    alts: ["Vestido Rosé, vista frontal", "Vestido Rosé, composición de vistas"]
  },
  "noche-de-zafiro": {
    title: "Noche de Zafiro",
    images: ["images/productos/noche-de-zafiro.png"],
    alts: ["Vestido Noche de Zafiro"]
  },
  "vestido-escarlata": {
    title: "Vestido Escarlata",
    images: ["images/productos/vestido-escarlata.png"],
    alts: ["Vestido Escarlata"]
  }
};

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCount = document.getElementById("lightboxCount");
let currentGallery = null;
let currentIndex = 0;

function showImage() {
  if (!currentGallery) return;
  const gallery = galleries[currentGallery];
  lightboxImage.src = gallery.images[currentIndex];
  lightboxImage.alt = gallery.alts[currentIndex];
  lightboxTitle.textContent = gallery.title;
  lightboxCount.textContent = `${currentIndex + 1} / ${gallery.images.length}`;
}
function openGallery(name) {
  if (!galleries[name]) return;
  currentGallery = name;
  currentIndex = 0;
  showImage();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeGallery() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function moveImage(direction) {
  if (!currentGallery) return;
  const length = galleries[currentGallery].images.length;
  currentIndex = (currentIndex + direction + length) % length;
  showImage();
}

document.querySelectorAll("[data-gallery]").forEach(button => {
  button.addEventListener("click", () => openGallery(button.dataset.gallery));
});
document.getElementById("lightboxClose").addEventListener("click", closeGallery);
document.getElementById("prevImage").addEventListener("click", () => moveImage(-1));
document.getElementById("nextImage").addEventListener("click", () => moveImage(1));
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeGallery();
});
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") moveImage(-1);
  if (event.key === "ArrowRight") moveImage(1);
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
