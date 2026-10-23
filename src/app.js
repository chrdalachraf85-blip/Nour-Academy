
import "./style.css";

/* 1. COURSES DATA*/

const courses = [
  {
    id: 1,
    title: "Mathématiques — 2e Bac",
    subject: "Mathématiques",
    level: "2e Bac",
    description: "Préparation au baccalauréat.",
    schedule: "Lun. & Mer. · 17:00",
    price: 450,
    places: 5
  },
  {
    id: 2,
    title: "Physique-Chimie — 2e Bac",
    subject: "Physique-Chimie",
    level: "2e Bac",
    description: "Préparation aux examens.",
    schedule: "Mar. & Jeu. · 18:00",
    price: 450,
    places: 3
  },
  {
    id: 3,
    title: "Français — Collège",
    subject: "Français",
    level: "Collège",
    description: "Grammaire et compréhension écrite.",
    schedule: "Mer. & Sam. · 16:00",
    price: 300,
    places: 8
  },
  {
    id: 4,
    title: "Anglais — Initiation",
    subject: "Anglais",
    level: "Primaire",
    description: "Vocabulaire et communication.",
    schedule: "Lun. & Ven. · 15:00",
    price: 250,
    places: 0
  },
  {
    id: 5,
    title: "Arabe — Primaire",
    subject: "Arabe",
    level: "Primaire",
    description: "Lecture, écriture et grammaire.",
    schedule: "Mar. & Jeu. · 15:00",
    price: 250,
    places: 6
  },
  {
    id: 6,
    title: "Espagnol — Débutant",
    subject: "Espagnol",
    level: "Lycée",
    description: "Les bases de la langue espagnole.",
    schedule: "Lun. & Mer. · 16:00",
    price: 300,
    places: 4
  },
  {
    id: 7,
    title: "Informatique — Initiation",
    subject: "Informatique",
    level: "Collège",
    description: "Découverte de l'informatique.",
    schedule: "Mer. & Sam. · 14:00",
    price: 350,
    places: 7
  },
  {
    id: 8,
    title: "SVT — 1re Bac",
    subject: "SVT",
    level: "1re Bac",
    description: "Comprendre les notions essentielles.",
    schedule: "Mar. & Ven. · 17:00",
    price: 350,
    places: 5
  },
  {
    id: 9,
    title: "Mathématiques — Collège",
    subject: "Mathématiques",
    level: "Collège",
    description: "Exercices et renforcement des acquis.",
    schedule: "Lun. & Jeu. · 16:00",
    price: 300,
    places: 9
  },
  {
    id: 10,
    title: "Comptabilité — Lycée",
    subject: "Comptabilité",
    level: "Lycée",
    description: "Les bases de la comptabilité.",
    schedule: "Mer. & Sam. · 17:00",
    price: 400,
    places: 4
  },
  {
    id: 11,
    title: "Renforcement scolaire",
    subject: "Renforcement scolaire",
    level: "Primaire",
    description: "Accompagnement dans les matières principales.",
    schedule: "Mar. & Sam. · 10:00",
    price: 300,
    places: 10
  },
  {
    id: 12,
    title: "Préparation aux examens",
    subject: "Préparation examens",
    level: "1re Bac",
    description: "Révision et entraînement aux examens.",
    schedule: "Lun. & Ven. · 18:00",
    price: 400,
    places: 2
  }
];

const courseGrid = document.querySelector("#courseGrid");
const searchInput = document.querySelector("#searchInput");
const levelFilter = document.querySelector("#levelFilter");
const subjectFilter = document.querySelector("#subjectFilter");
const resultCount = document.querySelector("#resultCount");

const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const checkoutButton = document.querySelector("#checkoutButton");

/* ADDED: Select the elements needed to control the cart popup */
const cartPanel = document.querySelector("#cart");
const cartToggle = document.querySelector("#cartToggle");
const cartClose = document.querySelector("#cartClose");
const cartOverlay = document.querySelector("#cartOverlay");

/* ADDED: Open the cart when the cart icon is clicked */
cartToggle.addEventListener("click", () => {
  cartPanel.classList.remove("translate-x-full");
  cartOverlay.classList.remove("hidden");
});

/* ADDED: Close the cart and hide the overlay */
function closeCart() {
  cartPanel.classList.add("translate-x-full");
  cartOverlay.classList.add("hidden");
}

/* ADDED: Allow closing the cart with the close button or overlay */
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

let cart = [];

function renderCourses(courseList) {
  resultCount.textContent =
    `${courseList.length} cours trouvé${courseList.length > 1 ? "s" : ""}`;

  if (courseList.length === 0) {
    courseGrid.innerHTML = `
      <p class="col-span-full rounded-xl border border-border p-6 text-center text-text-secondary">
        Aucun cours trouvé.
      </p>
    `;
    return;
  }

  courseGrid.innerHTML = courseList.map(course => `
    <article class="rounded-2xl border border-border bg-surface p-5">

      <p class="text-sm text-primary">
        ${course.subject} · ${course.level}
      </p>

      <h2 class="my-3 text-xl font-bold">
        ${course.title}
      </h2>

      <p class="text-sm text-text-secondary">
        ${course.description}
      </p>

      <p class="my-4 text-sm">
        ${course.schedule}
      </p>

      <p class="text-sm ${
        course.places === 0
          ? "font-semibold text-red-600"
          : "text-text"
      }">
        ${
          course.places === 0
            ? "Complet"
            : `${course.places} places restantes`
        }
      </p>

      <div class="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">

        <p class="font-bold text-primary">
          ${course.price} MAD / mois
        </p>

        <button
          type="button"
          data-course-id="${course.id}"
          ${course.places === 0 ? "disabled" : ""}
          class="min-h-11 rounded-xl px-4 ${
            course.places === 0
              ? "cursor-not-allowed bg-gray-200 text-gray-500"
              : "bg-primary text-white"
          }"
        >
          ${course.places === 0 ? "Complet" : "Ajouter"}
        </button>

      </div>
    </article>
  `).join("");
}

function filterCourses() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedLevel = levelFilter.value;
  const selectedSubject = subjectFilter.value;

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm) ||
      course.subject.toLowerCase().includes(searchTerm) ||
      course.level.toLowerCase().includes(searchTerm);

    const matchesLevel =
      selectedLevel === "" || course.level === selectedLevel;

    const matchesSubject =
      selectedSubject === "" || course.subject === selectedSubject;

    return matchesSearch && matchesLevel && matchesSubject;
  });

  renderCourses(filteredCourses);
}

searchInput.addEventListener("input", filterCourses);
levelFilter.addEventListener("change", filterCourses);
subjectFilter.addEventListener("change", filterCourses);

courseGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-course-id]");

  if (!button || button.disabled) return;

  const courseId = Number(button.dataset.courseId);

  const selectedCourse = courses.find(course => course.id === courseId);

  if (!selectedCourse) return;

  const alreadyInCart = cart.some(course => course.id === courseId);

  if (alreadyInCart) {
    button.textContent = "Déjà ajouté";
    return;
  }

  cart.push(selectedCourse);

  renderCart();
});

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="text-text-secondary">
        Votre panier est vide.
      </p>
    `;
  } else {
    cartItems.innerHTML = cart.map(course => `
      <div class="mb-4 flex items-start justify-between gap-3">

        <div class="min-w-0">
          <h3 class="font-semibold">
            ${course.title}
          </h3>

          <p class="mt-1 text-sm text-text-secondary">
            ${course.price} MAD / mois
          </p>
        </div>

        <button
          type="button"
          data-remove-id="${course.id}"
          aria-label="Retirer ${course.title} du panier"
          class="min-h-11 shrink-0 rounded-lg px-3 text-sm text-red-600 hover:bg-red-50"
        >
          Retirer
        </button>

      </div>
    `).join("");
  }

  const total = cart.reduce((sum, course) => sum + course.price, 0);

  cartTotal.textContent = `${total} MAD`;

  if (cart.length === 0) {
    checkoutButton.disabled = true;
  } else {
    checkoutButton.disabled = false;
  }
}

cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-remove-id]");

  if (!button) return;

  const courseId = Number(button.dataset.removeId);

  cart = cart.filter(course => course.id !== courseId);

  const courseButton = courseGrid.querySelector(
    `[data-course-id="${courseId}"]`
  );

  if (courseButton) {
    const course = courses.find(course => course.id === courseId);

    courseButton.textContent =
      course.places === 0 ? "Complet" : "Ajouter";
  }

  renderCart();
});

checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) return;

  /* CHANGED: Removed the incorrect catalogue variable line that caused an error. */
  alert("Votre panier est prêt. La prochaine étape est l'inscription.");

  /* ADDED: Close the cart popup after checkout on small screens. */
  closeCart();
});

renderCourses(courses);
renderCart();
