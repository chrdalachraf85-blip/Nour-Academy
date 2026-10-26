import "./style.css";



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

const cartPanel = document.querySelector("#cart");
const cartToggle = document.querySelector("#cartToggle");
const cartClose = document.querySelector("#cartClose");
const cartOverlay = document.querySelector("#cartOverlay");

cartToggle.addEventListener("click", () => {
  cartPanel.classList.remove("translate-x-full");
  cartOverlay.classList.remove("hidden");
});

function closeCart() {
  cartPanel.classList.add("translate-x-full");
  cartOverlay.classList.add("hidden");
}

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
          class="min-h-11 rounded-lg px-3 text-sm text-red-600 hover:bg-red-50"
        >
          Retirer
        </button>

      </div>
    `).join("");
  }

  let total = 0;

  for (const course of cart) {
    total = total + course.price;
  }

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

    if (course.places === 0) {
      courseButton.textContent = "Complet";
    } else {
      courseButton.textContent = "Ajouter";
    }
  }

  renderCart();
});

const form = document.querySelector("#form");

checkoutButton.addEventListener("click", () => {
  closeCart();

  if (cart.length === 0) return;

  form.innerHTML = `
  <div id="formOverlay"
     class="fixed inset-0 bg-black/50 z-40">
</div>
    <div class="flex fixed inset-2 sm:inset-4 md:inset-y-6 md:inset-x-10 lg:inset-y-10 lg:inset-x-40 z-50 rounded-xl bg-bg overflow-hidden">
      <div class="lg:w-1/2 h-full hidden md:hidden lg:block">
        <img src="src/assets/form-side-pic.webp" class="w-full h-full object-cover rounded-l-xl" alt="a side picture of a child studying" loading="lazy">
      </div>

      <button type="button" id="closeFormButton" aria-label="Fermer le formulaire" class="absolute right-3 top-3 rounded-lg px-3 py-2 text-xl text-red-600">X</button>

      <div class="lg:w-1/2 w-full p-6 overflow-auto">
        <form  class="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full" action="" method="POST">
          <legend class="w-full text-center text-[2rem] font-bold text-primary col-span-full">Registration</legend>

          <p class="font-extrabold bg-accent rounded-2xl text-center col-span-full">Informations du parent</p>

          <div>
            <label for="name" class="text-center text-secondary">Nom complet du parent <span class="text-red-600">*</span></label>
            <input type="text" id="name" required name="parent-name" class="border-2 rounded-xl p-1 border-border w-full focus:border-primary-hover focus:outline-1 focus:outline-primary-hover" placeholder="Nom complete">
          </div>

          <div>
            <label for="number" class="text-center text-secondary">Numéro de téléphone <span class="text-red-600">*</span></label>
            <input type="tel" id="number" required name="parent-number" class="border-2 rounded-xl p-1 border-border w-full focus:border-primary-hover focus:outline-1 focus:outline-primary-hover" placeholder="+212 6 12 34 56 78">
            <p id="phoneError" class="hidden text-sm text-red-600 mt-1">Veuillez entrer un numéro marocain valide.</p>
          </div>

          <div class="col-span-full">
            <label for="email" class="text-center text-secondary">Adresse email <span class="text-red-600">*</span></label>
            <input type="email" id="email" required name="parent-email" class="border-2 rounded-xl p-1 border-border w-full focus:border-primary-hover focus:outline-1 focus:outline-primary-hover" placeholder="exemple@email.com">
          </div>

          <p class="font-extrabold bg-accent rounded-2xl text-center col-span-full">Renseignement de l'élève</p>

          <div>
            <label for="namekid" class="text-center text-secondary">Nom d'élève <span class="text-red-600">*</span></label>
            <input type="text" id="namekid" required name="kid-name" class="border-2 rounded-xl p-1 border-border w-full focus:border-primary-hover focus:outline-1 focus:outline-primary-hover" placeholder="Nom complete">
          </div>

          <div>
            <label for="level" class="text-center text-secondary">Niveau scolaire de l'élève <span class="text-red-600">*</span></label>
            <select name="kid-level" id="level" required class="border-2 rounded-xl p-1 border-border w-full focus:border-primary-hover focus:outline-1 focus:outline-primary-hover">
              <option value="">Choisir le niveau</option>
              <option value="Primaire">Primaire</option>
              <option value="Collège">Collège</option>
              <option value="Lycée">Lycée</option>
              <option value="1re Bac">1re Bac</option>
              <option value="2e Bac">2e Bac</option>
            </select>
          </div>

          <p class="font-extrabold bg-accent rounded-2xl text-center col-span-full">Sécurité du compte</p>

          <div>
            <label for="password" class="text-center text-secondary">Mot de passe <span class="text-red-600">*</span></label>
            <input type="password" name="form-security" minlength="8" required id="password" class="border-2 rounded-xl p-1 border-border w-full focus:border-primary-hover focus:outline-1 focus:outline-primary-hover">
            <p id="passwordError" class="hidden text-sm text-red-600 mt-1">Au moins 8 caractères, une majuscule et un symbole.</p>
          </div>

          <div>
            <label for="passwordcheck" class="text-center text-secondary">Confirmer le mot de passe <span class="text-red-600">*</span></label>
            <input type="password" name="form-security-check" minlength="8" required id="passwordcheck" class="border-2 rounded-xl p-1 border-border w-full focus:border-primary-hover focus:outline-1 focus:outline-primary-hover">
            <p id="passwordCheckError" class="hidden text-sm text-red-600 mt-1">Les deux mots de passe ne correspondent pas.</p>
          </div>

          <div class="col-span-full">
            <label for="acceptTerms" class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="acceptTerms" required class="h-5 w-5 shrink-0 accent-primary cursor-pointer">
              <span>J'accepte les conditions d'utilisation.</span>
            </label>

            <p id="termsError" class="hidden text-sm text-red-600 mt-1">
              Vous devez accepter les conditions d'utilisation.
            </p>
          </div>

          <div class="col-span-full mt-3 flex items-center justify-end gap-2">
            <button type="button" id="cancelForm" class="shrink-0 rounded-lg border border-border px-3 py-2 text-xs md:text-sm">Annuler</button>
            <button type="submit" class="shrink-0 rounded-lg bg-primary px-3 py-2 text-xs sm:text-sm font-bold text-white">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  `;

  const closeFormButton = form.querySelector("#closeFormButton");
  const cancelForm = form.querySelector("#cancelForm");

  cancelForm.addEventListener("click", () => {
    form.innerHTML = "";
  });

  closeFormButton.addEventListener("click", () => {
    form.innerHTML = "";
  });

  const registrationForm = form.querySelector("form");
  const phoneInput = registrationForm.querySelector("#number");
  const passwordInput = registrationForm.querySelector("#password");
  const passwordCheckInput = registrationForm.querySelector("#passwordcheck");

  const phoneError = registrationForm.querySelector("#phoneError");
  const passwordError = registrationForm.querySelector("#passwordError");
  const passwordCheckError = registrationForm.querySelector("#passwordCheckError");
  const termsError = registrationForm.querySelector("#termsError");
  const acceptTerms = registrationForm.querySelector("#acceptTerms");

  const passwordPattern = /^(?=.*[A-Z])(?=.*[^\w\s]).{8,}$/;

  passwordInput.addEventListener("input", () => {
    if (passwordInput.value === "" || passwordPattern.test(passwordInput.value)) {
      passwordError.classList.add("hidden");
    } else {
      passwordError.classList.remove("hidden");
    }
  });

  acceptTerms.addEventListener("change", () => {
    if (acceptTerms.checked) {
      termsError.classList.add("hidden");
    }
  });

  registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const checknumber = phoneInput.value.split("")
    let result = ""
    for(let character of checknumber){
      if(character !== " "){
        result += character
      }
    }
    
    const moroccanPhonePattern = /^(?:\+212|0)[5-7]\d{8}$/;
    const phoneIsValid = moroccanPhonePattern.test(result);

    if (phoneIsValid) {
      phoneError.classList.add("hidden");
    } else {
      phoneError.classList.remove("hidden");
      phoneInput.focus();
      return
    }

    const passwordIsValid = passwordPattern.test(passwordInput.value);
    passwordError.classList.toggle("hidden", passwordIsValid);

    if (!passwordIsValid) {
      passwordInput.focus();
      return;
    }

    const passwordsMatch = passwordInput.value === passwordCheckInput.value;
    passwordCheckError.classList.toggle("hidden", passwordsMatch);

    if (!passwordsMatch) {
      passwordCheckInput.focus();
      return;
    }

    termsError.classList.toggle("hidden", acceptTerms.checked);

    if (!acceptTerms.checked) {
      acceptTerms.focus();
      return;
    }

    

    cart = [];
    renderCart();

    form.innerHTML = `
      <div class="fixed inset-4 z-50 flex items-center justify-center rounded-xl bg-bg p-6 text-center shadow-xl">
        <div>
          <p class="mb-3 text-xl font-bold text-primary">Vérification terminée !</p>
          <p class="mb-4">Les informations sont valides.</p>
          <button type="button" id="closeSuccessMessage" class="rounded-xl bg-primary px-4 py-2 text-white">Fermer</button>
        </div>
      </div>
    `;

    document.querySelector("#closeSuccessMessage").addEventListener("click", () => {
      form.innerHTML = "";
    });
  });
});

renderCourses(courses);
renderCart();
