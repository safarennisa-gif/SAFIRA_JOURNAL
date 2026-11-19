
// ============================================================
// SAFIRA — HALAMAN PROFIL
// Revisi desain mengikuti referensi SAFIRA.
// Struktur aset tetap menggunakan folder: aset/
// ============================================================


// ------------------------------------------------------------
// 1. KONFIGURASI ASET
// ------------------------------------------------------------

const PROFIL_ASSETS = {
    logo: "aset/buku-2.png",
    avatar: "aset/avatar.png",
    hero: "aset/pastel-girl-3.png",

    books: "aset/buku-header.png",
    booksSmall: "aset/buku-1.png",
    notebook: "aset/buku-8.png",

    flowerCorner: "aset/bunga-pojok.png",
    flowerPink: "aset/bunga-pink.png",
    flowerStem: "aset/bunga-tangkai.png",

    branch: "aset/ranting-bunga.png",
    branchCorner: "aset/ranting-sudut.png",
    sidebarStem: "aset/tangkai-sidebar.png",

    sparkle: "aset/bintang.png",
    sparkles: "aset/kilauan.png",
    floralLine: "aset/rangkaian-1.png",
    heart: "aset/hati-koral.png"
};


// Data profil frontend.
let safiraProfileData = {
    full_name: "Safira",
    email: "safira@example.com",
    program_studi: "",
    semester: "3"
};


// ------------------------------------------------------------
// 2. HELPER
// ------------------------------------------------------------

function escapeHTMLProfil(value) {
    return String(value ?? "").replace(/[&<>"']/g, function(char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];
    });
}


// ------------------------------------------------------------
// 3. KOMPONEN INPUT FORM
// ------------------------------------------------------------

function renderProfilInput({
    id,
    label,
    name,
    type = "text",
    value = "",
    placeholder = "",
    help = "",
    required = true
}) {
    const requiredAttribute = required ? "required" : "";

    return `
        <div class="min-w-0">

            <label
                for="${escapeHTMLProfil(id)}"
                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
            >
                ${escapeHTMLProfil(label)}
            </label>

            <input
                type="${escapeHTMLProfil(type)}"
                id="${escapeHTMLProfil(id)}"
                name="${escapeHTMLProfil(name)}"
                value="${escapeHTMLProfil(value)}"
                placeholder="${escapeHTMLProfil(placeholder)}"
                ${requiredAttribute}
                class="h-[58px] w-full rounded-[13px] border-[1.5px] border-[#D5C5FA] bg-white/60 px-5 text-[15px] font-medium text-[#24104F] outline-none transition-all placeholder:text-[#9688B8] focus:border-[#9474D9] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:h-[67px] sm:text-[17px]"
            >

            ${help ? `
                <p class="mt-2 text-[12px] font-medium text-[#77669F] sm:text-[14px]">
                    ${escapeHTMLProfil(help)}
                </p>
            ` : ""}

        </div>
    `;
}


// ------------------------------------------------------------
// 4. HEADER HALAMAN PROFIL
// ------------------------------------------------------------

function renderProfilHeader() {
    return `
        <header class="relative z-30 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <h2 class="text-[30px] font-black tracking-[-0.04em] text-[#211044] sm:text-[38px]">
                Profil
            </h2>

            <div class="relative flex items-center gap-3 sm:gap-5">

                <span class="hidden border-r border-[#D7C6EA] pr-5 text-[13px] font-medium text-[#38245E] sm:inline sm:text-[15px]">
                    Selasa, 13 Oktober 2026
                </span>

                <button
                    id="profile-dropdown-trigger"
                    type="button"
                    aria-label="Buka menu profil Safira"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="profile-dropdown"
                    onclick="toggleProfileDropdown()"
                    class="relative z-50 flex items-center gap-3 rounded-full px-2 py-1 transition-colors hover:bg-white/40"
                >

                    <img
                        src="${PROFIL_ASSETS.avatar}"
                        alt="Foto profil Safira"
                        class="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm sm:h-11 sm:w-11"
                    >

                    <span class="flex items-center gap-1.5 text-[14px] font-extrabold text-[#211044] sm:text-[15px]">

                        <span data-safira-profile-name>
                            ${escapeHTMLProfil(safiraProfileData.full_name)}
                        </span>

                        <i id="profile-dropdown-icon" class="fa-solid fa-chevron-down text-[11px] text-[#38245E]"></i>

                    </span>

                </button>


                <!-- Overlay -->

                <div
                    id="profile-dropdown-overlay"
                    onclick="closeProfileDropdown()"
                    class="fixed inset-0 z-40 hidden"
                    aria-hidden="true"
                ></div>


                <!-- Dropdown -->

                <div
                    id="profile-dropdown"
                    role="menu"
                    class="absolute right-0 top-14 z-50 hidden w-[min(320px,calc(100vw-32px))] origin-top-right overflow-hidden rounded-3xl border border-[#E9DDF7] bg-white shadow-xl"
                >

                    <div class="flex items-center gap-4 border-b border-[#F0E7F8] p-5">

                        <img
                            src="${PROFIL_ASSETS.avatar}"
                            alt=""
                            class="h-14 w-14 shrink-0 rounded-full border-2 border-purple-100 object-cover shadow-sm"
                        >

                        <div class="min-w-0">

                            <h4 data-safira-profile-name class="truncate text-lg font-bold text-[#211044]">
                                ${escapeHTMLProfil(safiraProfileData.full_name)}
                            </h4>

                            <p class="text-xs font-medium text-[#74658F]">
                                Mahasiswa &bull; Semester
                                <span data-safira-profile-semester>
                                    ${escapeHTMLProfil(safiraProfileData.semester)}
                                </span>
                            </p>

                            <p data-safira-profile-email class="mt-1 truncate text-[11px] text-[#9587AD]">
                                ${escapeHTMLProfil(safiraProfileData.email)}
                            </p>

                        </div>

                    </div>


                    <div class="p-3">

                        <button
                            type="button"
                            role="menuitem"
                            onclick="closeProfileDropdown(); navigate('profil')"
                            class="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-[#49376D] transition-colors hover:bg-[#F5EEFC]"
                        >

                            <span class="flex items-center gap-3">
                                <i class="fa-regular fa-user text-lg"></i>
                                <span>Lihat Profil</span>
                            </span>

                            <i class="fa-solid fa-chevron-right text-xs text-[#9A8AB4]"></i>

                        </button>


                        <button
                            type="button"
                            role="menuitem"
                            onclick="closeProfileDropdown(); showLanding()"
                            class="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-50"
                        >

                            <i class="fa-solid fa-arrow-right-from-bracket text-lg"></i>
                            <span>Keluar</span>

                        </button>

                    </div>

                </div>

            </div>

        </header>
    `;
}


// ------------------------------------------------------------
// 5. BANNER UTAMA PROFIL
// ------------------------------------------------------------

function renderProfilHero() {
    return `
        <section class="relative mb-4 flex min-h-[180px] items-center overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-r from-[#FCE5F5] via-[#EADCFD] to-[#E5D9FC] px-6 py-7 shadow-sm sm:min-h-[200px] sm:px-9 lg:px-10">

            <!-- Dekorasi kiri -->

            <img
                src="${PROFIL_ASSETS.flowerCorner}"
                alt=""
                class="pointer-events-none absolute -left-2 -top-2 z-10 h-24 w-24 object-contain sm:h-32 sm:w-32"
            >

            <img
                src="${PROFIL_ASSETS.sparkle}"
                alt=""
                class="pointer-events-none absolute left-[10%] top-4 z-10 h-8 w-8 object-contain"
            >


            <!-- Dekorasi kanan -->

            <img
                src="${PROFIL_ASSETS.branchCorner}"
                alt=""
                class="pointer-events-none absolute right-0 top-0 z-10 h-24 w-24 rotate-90 object-contain sm:h-32 sm:w-32"
            >

            <img
                src="${PROFIL_ASSETS.sparkles}"
                alt=""
                class="pointer-events-none absolute right-[27%] top-7 z-10 h-9 w-9 object-contain"
            >


            <!-- Teks -->

            <div class="relative z-20 max-w-[720px]">

                <h1 class="mb-2 text-[28px] font-black leading-tight tracking-[-0.04em] text-[#211044] sm:text-[36px] lg:text-[42px]">
                    Kenali dirimu, susun langkahmu.
                </h1>

                <p class="text-[15px] font-medium leading-relaxed text-[#66518F] sm:text-[20px] lg:text-[22px]">
                    Perbarui informasi akun dan identitas akademikmu.
                </p>

            </div>


            <!-- Ilustrasi karakter -->

            <div class="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-full w-[43%] items-end justify-center lg:flex">

                <img
                    src="${PROFIL_ASSETS.hero}"
                    alt="Ilustrasi karakter SAFIRA"
                    class="h-[115%] w-full object-contain object-bottom"
                >

            </div>

        </section>
    `;
}


// ------------------------------------------------------------
// 6. KARTU RINGKASAN PROFIL
// ------------------------------------------------------------

function renderProfilCard() {
    return `
        <section class="relative flex min-h-[520px] flex-col items-center justify-between overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br from-[#FDEAF2] via-[#FCE8F3] to-[#F5E5FA] p-6 shadow-sm sm:p-7">

            <!-- Dekorasi sudut -->

            <img
                src="${PROFIL_ASSETS.flowerCorner}"
                alt=""
                class="pointer-events-none absolute -left-2 -top-2 h-24 w-24 object-contain opacity-90"
            >

            <img
                src="${PROFIL_ASSETS.branchCorner}"
                alt=""
                class="pointer-events-none absolute -right-2 -top-2 h-24 w-24 rotate-90 object-contain opacity-90"
            >

            <img
                src="${PROFIL_ASSETS.sparkle}"
                alt=""
                class="pointer-events-none absolute right-[22%] top-5 h-7 w-7 object-contain"
            >


            <!-- Informasi utama -->

            <div class="relative z-10 flex w-full flex-col items-center text-center">

                <!-- Foto profil -->

                <div class="mb-3 h-[185px] w-[185px] overflow-hidden rounded-full border-[4px] border-white bg-[#E4D8FF] shadow-[0_5px_18px_rgba(92,59,143,.14)] sm:h-[205px] sm:w-[205px]">

                    <img
                        src="${PROFIL_ASSETS.avatar}"
                        alt="Foto profil Safira"
                        class="h-full w-full object-cover"
                    >

                </div>


                <!-- Nama -->

                <h3
                    id="profil-card-name"
                    class="mb-0.5 text-[31px] font-black tracking-[-0.04em] text-[#211044] sm:text-[36px]"
                >
                    ${escapeHTMLProfil(safiraProfileData.full_name)}
                </h3>

                <p class="mb-2 text-[17px] font-medium text-[#38245E]">
                    Mahasiswa
                </p>


                <!-- Semester -->

                <span
                    id="profil-card-semester"
                    class="rounded-full border border-[#DCCBFF] bg-[#E5D9FF] px-7 py-1.5 text-[13px] font-extrabold text-[#38245E]"
                >
                    Semester ${escapeHTMLProfil(safiraProfileData.semester)}
                </span>

            </div>


            <!-- Informasi email -->

            <div class="relative z-10 mt-5 w-full border-t border-[#E7CCE5] pt-4">

                <div class="mb-3 flex items-center gap-4">

                    <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#FFD8E5] bg-[#FFE7EE] text-[21px] text-[#D94761]">
                        <i class="fa-regular fa-envelope"></i>
                    </div>

                    <p
                        id="profil-card-email"
                        class="min-w-0 truncate text-[14px] font-semibold text-[#24104F] sm:text-[15px]"
                    >
                        ${escapeHTMLProfil(safiraProfileData.email)}
                    </p>

                </div>

                <p class="max-w-[280px] text-[13px] font-medium leading-relaxed text-[#75618F]">
                    Profil ini digunakan untuk sapaan dan informasi akunmu.
                </p>

            </div>


            <!-- Dekorasi buku -->

            <img
                src="${PROFIL_ASSETS.books}"
                alt=""
                class="pointer-events-none absolute -bottom-5 -right-3 z-0 h-[125px] w-[145px] object-contain opacity-90"
            >

        </section>
    `;
}


// ------------------------------------------------------------
// 7. FORM INFORMASI PROFIL
// ------------------------------------------------------------

function renderProfilForm() {
    return `
        <section class="relative flex min-h-[520px] flex-col overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br from-[#F5EFFF] via-[#F4EDFF] to-[#F0E9FF] p-6 shadow-sm sm:p-7 lg:p-8">

            <!-- Dekorasi kanan -->

            <img
                src="${PROFIL_ASSETS.branchCorner}"
                alt=""
                class="pointer-events-none absolute -right-1 top-0 z-0 h-28 w-28 rotate-90 object-contain opacity-85 sm:h-32 sm:w-32"
            >

            <img
                src="${PROFIL_ASSETS.sparkle}"
                alt=""
                class="pointer-events-none absolute right-[15%] top-5 z-0 h-8 w-8 object-contain"
            >


            <!-- Judul -->

            <div class="relative z-10 mb-6">

                <h3 class="mb-1 text-[25px] font-black tracking-[-0.035em] text-[#211044] sm:text-[29px]">
                    Informasi Profil
                </h3>

                <p class="text-[14px] font-medium text-[#66518F] sm:text-[17px]">
                    Sesuaikan data di bawah ini dengan dirimu.
                </p>

            </div>


            <!-- Form -->

            <form
                id="safira-profile-form"
                onsubmit="window.safiraSaveProfile(event)"
                class="relative z-10 flex flex-1 flex-col"
            >

                <div class="mb-8 grid grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">

                    ${renderProfilInput({
                        id: "profil-nama",
                        name: "full_name",
                        label: "Nama Lengkap",
                        value: safiraProfileData.full_name,
                        placeholder: "Masukkan nama lengkap"
                    })}


                    ${renderProfilInput({
                        id: "profil-email",
                        name: "email",
                        label: "Email",
                        type: "email",
                        value: safiraProfileData.email,
                        placeholder: "Masukkan email",
                        help: "Email digunakan untuk masuk ke akun."
                    })}


                    ${renderProfilInput({
                        id: "profil-program",
                        name: "program_studi",
                        label: "Program Studi",
                        placeholder: "Masukkan program studi",
                        value: safiraProfileData.program_studi,
                        required: false
                    })}


                    <!-- Semester -->

                    <div class="min-w-0">

                        <label
                            for="profil-semester"
                            class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                        >
                            Semester
                        </label>

                        <div class="relative">

                            <select
                                id="profil-semester"
                                name="semester"
                                class="h-[58px] w-full cursor-pointer appearance-none rounded-[13px] border-[1.5px] border-[#D5C5FA] bg-white/60 px-5 pr-12 text-[15px] font-medium text-[#24104F] outline-none transition-all focus:border-[#9474D9] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:h-[67px] sm:text-[17px]"
                            >
                                <option value="1" ${safiraProfileData.semester === "1" ? "selected" : ""}>Semester 1</option>
                                <option value="2" ${safiraProfileData.semester === "2" ? "selected" : ""}>Semester 2</option>
                                <option value="3" ${safiraProfileData.semester === "3" ? "selected" : ""}>Semester 3</option>
                                <option value="4" ${safiraProfileData.semester === "4" ? "selected" : ""}>Semester 4</option>
                                <option value="5" ${safiraProfileData.semester === "5" ? "selected" : ""}>Semester 5</option>
                                <option value="6" ${safiraProfileData.semester === "6" ? "selected" : ""}>Semester 6</option>
                                <option value="7" ${safiraProfileData.semester === "7" ? "selected" : ""}>Semester 7</option>
                                <option value="8" ${safiraProfileData.semester === "8" ? "selected" : ""}>Semester 8</option>
                            </select>

                            <i class="fa-solid fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[17px] text-[#705B9D]"></i>

                        </div>

                    </div>

                </div>


                <!-- Feedback -->

                <div
                    id="safira-profile-feedback"
                    role="status"
                    aria-live="polite"
                    class="mb-4 hidden rounded-xl border border-[#DCCBFF] bg-white/70 px-4 py-3 text-[13px] font-medium leading-relaxed text-[#59427E]"
                ></div>


                <!-- Tombol aksi -->

                <div class="mt-auto flex flex-col-reverse items-stretch justify-end gap-3 border-t border-[#DCCBEA] pt-5 sm:flex-row sm:items-center">

                    <button
                        type="button"
                        onclick="window.safiraResetProfile()"
                        class="min-h-[52px] rounded-[13px] border-[1.5px] border-[#0864F7] bg-white/70 px-8 text-[15px] font-bold text-[#0864F7] transition-colors hover:bg-white sm:min-w-[125px]"
                    >
                        Batal
                    </button>


                    <button
                        type="submit"
                        class="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-[13px] border border-[#0864F7] bg-[#0864F7] px-7 text-[15px] font-bold text-white shadow-[0_5px_12px_rgba(8,100,247,.17)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8] sm:min-w-[235px]"
                    >
                        <i class="fa-solid fa-check text-[18px]"></i>
                        Simpan Perubahan
                    </button>

                </div>

            </form>

        </section>
    `;
}


// ------------------------------------------------------------
// 8. BANNER MOTIVASI BAWAH
// ------------------------------------------------------------

function renderProfilMotivation() {
    return `
        <section class="relative mt-4 flex min-h-[80px] items-center justify-between gap-4 overflow-hidden rounded-[20px] border border-white/80 bg-gradient-to-r from-[#FCE7F1] via-[#F9E9F9] to-[#F5E6FF] px-5 py-4 shadow-sm sm:px-7">

            <div class="relative z-10 flex min-w-0 items-center gap-4">

                <div class="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-[#F6D6E9] bg-[#FFE1EE]">

                    <img
                        src="${PROFIL_ASSETS.logo}"
                        alt=""
                        class="h-10 w-11 object-contain"
                    >

                </div>

                <p class="text-[13px] font-semibold leading-relaxed text-[#38245E] sm:text-[15px]">
                    Langkah kecil yang konsisten membuat perjalanan belajarmu lebih berarti.
                </p>

            </div>

            <img
                src="${PROFIL_ASSETS.sparkles}"
                alt=""
                class="pointer-events-none absolute -right-1 top-1/2 h-16 w-24 -translate-y-1/2 rotate-90 object-contain opacity-90 sm:right-3"
            >

        </section>
    `;
}


// ------------------------------------------------------------
// 9. FUNGSI UTAMA RENDER PROFIL
// ------------------------------------------------------------

function renderProfil() {
    return `
        <div class="w-full min-w-0 font-sans text-[#211044]">

            ${renderProfilHeader()}

            ${renderProfilHero()}

            <div class="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,2.1fr)]">

                ${renderProfilCard()}

                ${renderProfilForm()}

            </div>

            ${renderProfilMotivation()}

        </div>
    `;
}


// ------------------------------------------------------------
// 10. FUNGSI PEMBARUAN DATA PROFIL
// ------------------------------------------------------------

function perbaruiRingkasanProfil() {
    const nameElement = document.getElementById("profil-card-name");
    const emailElement = document.getElementById("profil-card-email");
    const semesterElement = document.getElementById("profil-card-semester");

    if (nameElement) {
        nameElement.textContent = safiraProfileData.full_name;
    }

    if (emailElement) {
        emailElement.textContent = safiraProfileData.email;
    }

    if (semesterElement) {
        semesterElement.textContent = "Semester " + safiraProfileData.semester;
    }

    document.querySelectorAll("[data-safira-profile-name]").forEach((element) => {
        element.textContent = safiraProfileData.full_name;
    });

    document.querySelectorAll("[data-safira-profile-email]").forEach((element) => {
        element.textContent = safiraProfileData.email;
    });

    document.querySelectorAll("[data-safira-profile-semester]").forEach((element) => {
        element.textContent = safiraProfileData.semester;
    });
}


// ------------------------------------------------------------
// 11. FUNGSI SIMPAN PROFIL
// ------------------------------------------------------------

window.safiraSaveProfile = function(event) {
    event.preventDefault();

    const form = document.getElementById("safira-profile-form");

    if (!form || !form.reportValidity()) return;

    const formData = new FormData(form);

    safiraProfileData = {
        full_name: String(formData.get("full_name") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        program_studi: String(formData.get("program_studi") || "").trim(),
        semester: String(formData.get("semester") || "3")
    };

    perbaruiRingkasanProfil();

    const feedback = document.getElementById("safira-profile-feedback");

    if (feedback) {
        feedback.textContent =
            "Perubahan profil diperbarui pada tampilan. Penyimpanan permanen memerlukan integrasi API.";

        feedback.classList.remove("hidden");
    }

    window.dispatchEvent(
        new CustomEvent("safira:profile-save", {
            detail: { ...safiraProfileData }
        })
    );
};


// ------------------------------------------------------------
// 12. FUNGSI BATAL / RESET FORM
// ------------------------------------------------------------

window.safiraResetProfile = function() {
    const form = document.getElementById("safira-profile-form");

    if (!form) return;

    form.elements.namedItem("full_name").value = safiraProfileData.full_name;
    form.elements.namedItem("email").value = safiraProfileData.email;
    form.elements.namedItem("program_studi").value = safiraProfileData.program_studi;
    form.elements.namedItem("semester").value = safiraProfileData.semester;

    perbaruiRingkasanProfil();

    const feedback = document.getElementById("safira-profile-feedback");

    if (feedback) {
        feedback.textContent = "";
        feedback.classList.add("hidden");
    }
};


// ------------------------------------------------------------
// 13. EKSPOR FUNGSI
// ------------------------------------------------------------

window.renderProfil = renderProfil;


// ============================================================
// AKHIR FILE PROFIL.JS
// ============================================================
