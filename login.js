
// ============================================================
// SAFIRA — AUTHENTICATION & PUBLIC PAGES
// Revisi tampilan: Landing, Fitur, Login, dan Daftar
// Seluruh aset menggunakan folder: aset/
// ============================================================


// ------------------------------------------------------------
// 1. KONFIGURASI ASET
// ------------------------------------------------------------

const SAFIRA_AUTH_ASSETS = {
    logo: "aset/buku-2.png",
    logoAlt: "aset/buku-6.png",

    landingHero: "aset/pastel-girl-4.png",
    featureHero: "aset/pastel-girl-5.png",
    loginHero: "aset/pastel-girl-3.png",
    registerHero: "aset/pastel-girl-1.png",

    books: "aset/buku-header.png",
    booksSmall: "aset/buku-5.png",
    notebook: "aset/buku-8.png",
    calendar: "aset/kalender.png",
    checklist: "aset/HJK.png",

    flowerCorner: "aset/bunga-pojok.png",
    flowerPink: "aset/bunga-pink.png",
    flowerStem: "aset/bunga-tangkai.png",
    branch: "aset/ranting-bunga.png",
    branchCorner: "aset/ranting-sudut.png",
    lavender: "aset/lavender.png",
    sidebarStem: "aset/tangkai-sidebar.png",
    tulip: "aset/tulip-mini.png",

    sparkles: "aset/kilauan.png",
    star: "aset/bintang.png",
    hearts: "aset/rangkaian-hati.png",
    floralLine: "aset/rangkaian-1.png",
    coralHeart: "aset/hati-koral.png"
};


// ------------------------------------------------------------
// 2. HELPER KOMPONEN VISUAL
// ------------------------------------------------------------

function renderSafiraLogo(size = "normal") {
    const imageSize = size === "large"
        ? "h-[66px] w-[78px]"
        : "h-[48px] w-[58px]";

    const textSize = size === "large"
        ? "text-[30px] md:text-[34px]"
        : "text-[24px] md:text-[28px]";

    return `
        <div class="inline-flex items-center gap-2.5">

            <img
                src="${SAFIRA_AUTH_ASSETS.logo}"
                alt="Logo SAFIRA"
                class="${imageSize} object-contain"
            >

            <span class="${textSize} font-black tracking-[-0.035em] text-[#211044]">
                SAFIRA
            </span>

        </div>
    `;
}


// ------------------------------------------------------------
// NAVIGASI PUBLIC PAGE
// ------------------------------------------------------------

function renderSafiraPublicNav(active = "landing") {
    return `
        <nav class="relative z-30 flex items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-14 xl:px-16">

            <button
                type="button"
                onclick="switchAuthView('landing')"
                aria-label="Kembali ke Beranda SAFIRA"
                class="shrink-0"
            >
                ${renderSafiraLogo()}
            </button>

            <div class="flex items-center gap-3 sm:gap-5 lg:gap-8">

                <div class="hidden items-center gap-6 text-[15px] font-bold md:flex lg:gap-8">

                    <button
                        type="button"
                        onclick="switchAuthView('landing')"
                        class="relative py-2 transition-colors ${
                            active === "landing"
                                ? "text-[#0864F7] after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-14 after:-translate-x-1/2 after:rounded-full after:bg-[#0864F7]"
                                : "text-[#24104F] hover:text-[#0864F7]"
                        }"
                    >
                        Beranda
                    </button>

                    <button
                        type="button"
                        onclick="switchAuthView('fitur')"
                        class="relative py-2 transition-colors ${
                            active === "fitur"
                                ? "text-[#0864F7] after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-14 after:-translate-x-1/2 after:rounded-full after:after:bg-[#0864F7]"
                                : "text-[#24104F] hover:text-[#0864F7]"
                        }"
                    >
                        Fitur
                    </button>

                </div>

                <span class="hidden h-8 w-px bg-[#CDBBEA] md:block"></span>

                <div class="flex items-center gap-2 sm:gap-3">

                    <button
                        type="button"
                        onclick="switchAuthView('login')"
                        class="rounded-[13px] border-[1.5px] border-[#0864F7] bg-white/55 px-4 py-2.5 text-[13px] font-bold text-[#0864F7] transition-colors hover:bg-white sm:px-7 sm:text-[15px]"
                    >
                        Masuk
                    </button>

                    <button
                        type="button"
                        onclick="switchAuthView('daftar')"
                        class="rounded-[13px] border-[1.5px] border-[#0864F7] bg-[#0864F7] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-colors hover:bg-[#0756D8] sm:px-7 sm:text-[15px]"
                    >
                        Daftar
                    </button>

                </div>

            </div>

        </nav>
    `;
}


// ------------------------------------------------------------
// HEADER LOGIN DAN DAFTAR
// ------------------------------------------------------------

function renderSafiraAuthHeader() {
    return `
        <header class="relative z-20 mb-4 flex items-center justify-between gap-4 px-1 sm:px-3">

            <button
                type="button"
                onclick="switchAuthView('landing')"
                aria-label="Kembali ke Beranda SAFIRA"
                class="shrink-0"
            >
                ${renderSafiraLogo()}
            </button>

            <button
                type="button"
                onclick="switchAuthView('landing')"
                class="inline-flex items-center gap-2 whitespace-nowrap rounded-full px-2 py-2 text-[13px] font-semibold text-[#0864F7] transition-colors hover:bg-white/40 sm:px-3 sm:text-[15px]"
            >
                <i class="fa-solid fa-arrow-left text-lg"></i>
                <span>Kembali ke Beranda</span>
            </button>

        </header>
    `;
}


// ------------------------------------------------------------
// FOOTER
// ------------------------------------------------------------

function renderSafiraFooter(showCenter = false) {
    return `
        <footer class="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#DCC8EA] px-2 pt-3 text-[12px] font-medium text-[#66518C] sm:text-[13px]">

            <p>&copy; 2026 SAFIRA</p>

            ${showCenter ? `
                <img
                    src="${SAFIRA_AUTH_ASSETS.floralLine}"
                    alt=""
                    class="mx-auto hidden h-10 w-[240px] object-contain md:block"
                >
            ` : ""}

            <p class="ml-auto">
                Sedikit demi sedikit, jadi berarti.
            </p>

        </footer>
    `;
}


// ------------------------------------------------------------
// DEKORASI GLOBAL
// ------------------------------------------------------------

function renderSafiraOuterDecorations() {
    return `
        <!-- pojok kiri atas: diperbesar dan diposisikan lebih pas -->
        <img
            src="${SAFIRA_AUTH_ASSETS.flowerCorner}"
            alt=""
            class="pointer-events-none absolute left-0 top-3 z-0 h-40 w-36 rotate-[85deg] object-contain opacity-95 sm:left-2 sm:top-4 sm:h-48 sm:w-44 lg:h-52 lg:w-48"
        >

        <!-- pojok kanan atas -->
        <img
            src="${SAFIRA_AUTH_ASSETS.branchCorner}"
            alt=""
            class="pointer-events-none absolute -right-2 top-0 z-0 h-32 w-28 rotate-[85deg] object-contain opacity-90 sm:h-36 sm:w-32 lg:h-40 lg:w-36"
        >

        <!-- pojok kiri bawah -->
        <img
            src="${SAFIRA_AUTH_ASSETS.flowerPink}"
            alt=""
            class="pointer-events-none absolute -bottom-3 -left-2 z-0 h-32 w-32 rotate-[-10deg] object-contain opacity-90 sm:h-36 sm:w-36"
        >

        <!-- pojok kanan bawah -->
        <img
            src="${SAFIRA_AUTH_ASSETS.branchCorner}"
            alt=""
            class="pointer-events-none absolute -bottom-4 -right-0 z-0 h-32 w-28 rotate-[180deg] object-contain opacity-90 sm:h-36 sm:w-32"
        >
    `;
}

// ------------------------------------------------------------
// KOMPONEN INPUT FORM
// ------------------------------------------------------------

function renderSafiraAuthInput({
    id,
    label,
    type = "text",
    placeholder,
    icon,
    autocomplete = "off",
    toggle = false,
    required = true,
    name = ""
}) {
    return `
        <div class="w-full">

            <label
                for="${id}"
                class="mb-2 block text-[14px] font-bold text-[#24104F] sm:text-[15px]"
            >
                ${label}
            </label>

            <div class="relative">

                <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-[21px] text-[#5F4A8D]">
                    <i class="${icon}"></i>
                </span>

                <input
                    id="${id}"
                    name="${name || id}"
                    type="${type}"
                    ${required ? "required" : ""}
                    autocomplete="${autocomplete}"
                    placeholder="${placeholder}"
                    class="h-[58px] w-full rounded-[13px] border-[1.5px] border-[#D7C6ED] bg-white/55 pl-[64px] ${
                        toggle ? "pr-[62px]" : "pr-5"
                    } text-[15px] font-medium text-[#2B1A52] outline-none transition-all placeholder:text-[#8878A8] focus:border-[#9675C9] focus:bg-white/80 focus:ring-2 focus:ring-[#DCCAF7]/60 sm:h-[66px] sm:text-[16px]"
                >

                ${toggle ? `
                    <button
                        type="button"
                        onclick="toggleAuthPassword('${id}', this)"
                        aria-label="Tampilkan atau sembunyikan kata sandi"
                        class="absolute inset-y-0 right-0 flex w-[58px] items-center justify-center text-[21px] text-[#67528F] transition-colors hover:text-[#24104F]"
                    >
                        <i class="fa-solid fa-eye"></i>
                    </button>
                ` : ""}

            </div>

        </div>
    `;
}


// ------------------------------------------------------------
// 3. TOGGLE VISIBILITAS PASSWORD
// ------------------------------------------------------------

window.toggleAuthPassword = function (inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button ? button.querySelector("i") : null;

    if (!input) return;

    const showPassword = input.type === "password";

    input.type = showPassword ? "text" : "password";

    if (icon) {
        icon.classList.toggle("fa-eye", !showPassword);
        icon.classList.toggle("fa-eye-slash", showPassword);
    }
};


// ------------------------------------------------------------
// 4. HALAMAN LANDING PAGE
// ------------------------------------------------------------

function renderSafiraLanding() {
    return `
        <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F7E6FF] via-[#F1DFFF] to-[#FCE5F1] font-sans text-[#24104F]">

            ${renderSafiraOuterDecorations()}

            ${renderSafiraPublicNav("landing")}

            <!-- HERO -->
            <main class="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-7 px-5 pb-8 pt-5 sm:px-8 lg:grid-cols-[.82fr_1.18fr] lg:gap-8 lg:px-14 lg:pb-10 lg:pt-3 xl:px-16">

                <section class="relative z-10 order-2 max-w-[650px] lg:order-1">

                    <span class="mb-5 inline-flex items-center rounded-full border border-[#D9BDF5] bg-[#DCC4FA]/80 px-5 py-2 text-[13px] font-semibold text-[#62469A] sm:text-[15px]">
                        Digital Academic Journal &amp; Personal Planner
                    </span>

                    <h1 class="mb-5 text-[42px] font-black leading-[1.08] tracking-[-0.045em] text-[#211044] sm:text-[52px] lg:text-[56px] xl:text-[64px]">
                        Catat langkahmu.<br>
                        Atur waktumu.<br>
                        <span class="text-[#0864F7]">Raih tujuanmu.</span>
                    </h1>

                    <p class="mb-7 max-w-[590px] text-[16px] font-medium leading-relaxed text-[#6E5B97] sm:text-[19px] lg:text-[20px]">
                        Kelola catatan, tugas, jadwal, dan target belajar dalam satu ruang yang nyaman.
                    </p>

                    <div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                        <button
                            type="button"
                            onclick="switchAuthView('daftar')"
                            class="inline-flex min-h-[58px] items-center justify-center gap-4 rounded-[15px] bg-[#0864F7] px-8 text-[16px] font-bold text-white shadow-[0_8px_18px_rgba(8,100,247,.2)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8] sm:min-w-[245px] sm:text-[18px]"
                        >
                            Mulai Sekarang
                            <i class="fa-solid fa-arrow-right text-lg"></i>
                        </button>

                        <button
                            type="button"
                            onclick="switchAuthView('fitur')"
                            class="inline-flex min-h-[58px] items-center justify-center rounded-[15px] border-[1.5px] border-[#0864F7] bg-white/35 px-8 text-[16px] font-bold text-[#0864F7] transition-colors hover:bg-white/70 sm:min-w-[205px] sm:text-[17px]"
                        >
                            Jelajahi Fitur
                        </button>

                    </div>

                    <p class="text-[14px] font-medium text-[#79679F] sm:text-[15px]">
                        Teman untuk perjalanan akademikmu.
                    </p>

                    <img
                        src="${SAFIRA_AUTH_ASSETS.hearts}"
                        alt=""
                        class="pointer-events-none absolute -bottom-20 left-12 hidden h-12 w-44 object-contain opacity-80 lg:block"
                    >

                </section>


                <!-- ILUSTRASI HERO -->
                <section class="relative order-1 min-h-[290px] overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br from-[#E9D9FF] via-[#E9E0FF] to-[#F9E9F5] shadow-[0_12px_32px_rgba(98,65,145,.09)] sm:min-h-[390px] lg:order-2 lg:min-h-[485px] lg:rounded-[38px]">

                    <!-- dekorasi kiri atas -->
                    <img
                        src="${SAFIRA_AUTH_ASSETS.flowerPink}"
                        alt=""
                        class="pointer-events-none absolute left-3 top-4 z-20 h-24 w-28 rotate-[-180deg] object-contain sm:left-5 sm:top-5 sm:h-32 sm:w-36"
                    >

                    <!-- dekorasi pojok kanan bawah -->
                    <img
                        src="${SAFIRA_AUTH_ASSETS.branchCorner}"
                        alt=""
                        class="pointer-events-none absolute -right-3 bottom-0 z-20 h-28 w-24 rotate-180 object-contain sm:h-36 sm:w-32"
                    >

                    <!-- dekorasi tengah atas: diramaikan -->
                    <img
                        src="${SAFIRA_AUTH_ASSETS.branch}"
                        alt=""
                        class="pointer-events-none absolute left-[32%] top-[10%] z-20 h-16 w-24 rotate-[8deg] object-contain opacity-90 sm:h-20 sm:w-28"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.flowerPink}"
                        alt=""
                        class="pointer-events-none absolute left-[40%] top-[8%] z-20 h-14 w-20 rotate-[5deg] object-contain opacity-95 sm:h-18 sm:w-24"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.sparkles}"
                        alt=""
                        class="pointer-events-none absolute left-[48%] top-[14%] z-20 h-8 w-8 object-contain opacity-90 sm:h-10 sm:w-10"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.star}"
                        alt=""
                        class="pointer-events-none absolute left-[52%] top-[20%] z-20 h-7 w-7 object-contain opacity-90 sm:h-9 sm:w-9"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.sparkles}"
                        alt=""
                        class="pointer-events-none absolute left-[58%] top-[9%] z-20 h-7 w-7 rotate-[12deg] object-contain opacity-80 sm:h-8 sm:w-8"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.tulip}"
                        alt=""
                        class="pointer-events-none absolute left-[62%] top-[18%] z-20 h-10 w-10 rotate-[-8deg] object-contain opacity-90 sm:h-12 sm:w-12"
                    >

                    <!-- dekorasi tambahan kanan atas -->
                    <img
                        src="${SAFIRA_AUTH_ASSETS.sparkles}"
                        alt=""
                        class="pointer-events-none absolute right-[17%] top-[12%] z-20 h-10 w-10 object-contain opacity-90"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.star}"
                        alt=""
                        class="pointer-events-none absolute right-[28%] top-[18%] z-20 h-7 w-7 object-contain opacity-85"
                    >

                    <div class="absolute right-5 top-5 z-20 hidden max-w-[130px] rotate-[5deg] rounded-sm bg-[#FFF1D9] px-3 py-3 text-center text-[12px] font-semibold leading-relaxed text-[#49366E] shadow-md sm:block lg:right-7 lg:top-7">
                        Langkah kecil hari ini untuk masa depan yang besar. ♡
                        <span class="absolute -top-2 left-1/2 h-4 w-9 -translate-x-1/2 rotate-[-4deg] bg-[#F6A8C0]/90"></span>
                    </div>
                    <img
                        src="${SAFIRA_AUTH_ASSETS.landingHero}"
                        alt="Ilustrasi mahasiswi sedang belajar dan menulis catatan"
                        class="absolute inset-0 z-10 h-full w-full object-contain object-bottom"
                    >

                    <div class="absolute bottom-[44%] left-4 z-20 hidden max-w-[245px] -rotate-[2deg] rounded-[17px] border border-white/80 bg-white/85 p-3 shadow-lg backdrop-blur-sm sm:block lg:left-5 lg:max-w-[285px]">

                        <div class="flex items-center gap-3">

                            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFE1E7] text-lg text-[#E32655]">
                                <i class="fa-regular fa-file-lines"></i>
                            </span>

                            <div class="min-w-0">
                                <p class="truncate text-[12px] font-extrabold text-[#24104F] sm:text-[13px]">
                                    Rancangan Website
                                </p>

                                <p class="mt-0.5 text-[11px] font-medium text-[#74658F]">
                                    Desain Web
                                </p>
                            </div>

                            <span class="ml-auto whitespace-nowrap rounded-full bg-[#E92335] px-2.5 py-1 text-[10px] font-bold text-white">
                                <i class="fa-regular fa-clock mr-1"></i>Besok
                            </span>

                        </div>

                    </div>

                </section>

            </main>


            <!-- JUDUL FITUR -->
            <section class="relative z-10 mx-auto max-w-[1600px] px-5 pb-5 sm:px-8 lg:px-14 xl:px-16">

                <div class="mb-5 flex items-center justify-center gap-3 text-center sm:gap-5">

                    <img
                        src="${SAFIRA_AUTH_ASSETS.sparkles}"
                        alt=""
                        class="h-8 w-8 object-contain sm:h-10 sm:w-10"
                    >

                    <h2 class="text-[23px] font-black leading-tight tracking-[-0.03em] text-[#24104F] sm:text-[30px] lg:text-[35px]">
                        Semua kebutuhan belajarmu, lebih tertata
                    </h2>

                    <img
                        src="${SAFIRA_AUTH_ASSETS.notebook}"
                        alt=""
                        class="hidden h-14 w-14 object-contain sm:block"
                    >

                </div>


                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <!-- CATATAN -->
                    <article class="relative min-h-[170px] overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br from-[#FFE8F1] to-[#FCEAF5] p-5 shadow-sm">

                        <img
                            src="${SAFIRA_AUTH_ASSETS.branch}"
                            alt=""
                            class="pointer-events-none absolute -right-1 -top-2 h-20 w-24 object-contain opacity-75"
                        >

                        <div class="mb-3 flex h-16 w-16 items-center justify-center rounded-[17px] bg-[#FFD6E7] text-[30px] text-[#7A1647]">
                            <i class="fa-solid fa-book-open"></i>
                        </div>

                        <h3 class="mb-1 text-[17px] font-extrabold text-[#24104F]">
                            Catatan Akademik
                        </h3>

                        <p class="max-w-[280px] text-[14px] font-medium leading-relaxed text-[#75618F]">
                            Simpan dan temukan catatan kuliah dengan mudah.
                        </p>

                    </article>


                    <!-- TUGAS -->
                    <article class="relative min-h-[170px] overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br from-[#E5EEFF] to-[#E9F0FF] p-5 shadow-sm">

                        <img
                            src="${SAFIRA_AUTH_ASSETS.lavender}"
                            alt=""
                            class="pointer-events-none absolute -right-1 -top-2 h-20 w-24 object-contain opacity-75"
                        >

                        <div class="mb-3 flex h-16 w-16 items-center justify-center rounded-[17px] bg-[#D3E3FF] text-[30px] text-[#0864F7]">
                            <i class="fa-regular fa-square-check"></i>
                        </div>

                        <h3 class="mb-1 text-[17px] font-extrabold text-[#24104F]">
                            Tugas &amp; Deadline
                        </h3>

                        <p class="max-w-[280px] text-[14px] font-medium leading-relaxed text-[#75618F]">
                            Atur tugas dan kenali deadline yang semakin dekat.
                        </p>

                    </article>


                    <!-- JADWAL -->
                    <article class="relative min-h-[170px] overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br from-[#E8F8EA] to-[#E7F7F0] p-5 shadow-sm">

                        <img
                            src="${SAFIRA_AUTH_ASSETS.flowerPink}"
                            alt=""
                            class="pointer-events-none absolute -right-1 -top-1 h-20 w-24 object-contain opacity-75"
                        >

                        <div class="mb-3 flex h-16 w-16 items-center justify-center rounded-[17px] bg-[#D1F0D7] text-[30px] text-[#168334]">
                            <i class="fa-regular fa-calendar-check"></i>
                        </div>

                        <h3 class="mb-1 text-[17px] font-extrabold text-[#24104F]">
                            Jadwal Kuliah
                        </h3>

                        <p class="max-w-[280px] text-[14px] font-medium leading-relaxed text-[#75618F]">
                            Susun jadwal harian dan semester agar lebih teratur.
                        </p>

                    </article>


                    <!-- PROGRES -->
                    <article class="relative min-h-[170px] overflow-hidden rounded-[22px] border border-white/80 bg-gradient-to-br from-[#F0E6FF] to-[#F4EAFE] p-5 shadow-sm">

                        <img
                            src="${SAFIRA_AUTH_ASSETS.branchCorner}"
                            alt=""
                            class="pointer-events-none absolute -right-2 -top-1 h-20 w-24 rotate-90 object-contain opacity-75"
                        >

                        <div class="mb-3 flex h-16 w-16 items-center justify-center rounded-[17px] bg-[#E3D2FF] text-[30px] text-[#4D278D]">
                            <i class="fa-solid fa-chart-simple"></i>
                        </div>

                        <h3 class="mb-1 text-[17px] font-extrabold text-[#24104F]">
                            Progres Belajar
                        </h3>

                        <p class="max-w-[280px] text-[14px] font-medium leading-relaxed text-[#75618F]">
                            Pantau tugas selesai dan pencapaian targetmu.
                        </p>

                    </article>

                </div>

            </section>

            ${renderSafiraFooter(true)}

        </div>
    `;
}


// ------------------------------------------------------------
// 5. HALAMAN JELAJAHI FITUR
// ------------------------------------------------------------

function renderSafiraFitur() {
    return `
        <div class="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#F8E8FF] via-[#F1E1FF] to-[#FBE9F4] font-sans text-[#24104F]">

            ${renderSafiraOuterDecorations()}

            ${renderSafiraPublicNav("fitur")}


            <!-- BREADCRUMB -->
            <div class="relative z-10 mx-auto mb-4 max-w-[1600px] px-5 text-[13px] font-semibold sm:px-8 sm:text-[14px] lg:px-14 xl:px-16">

                <button
                    type="button"
                    onclick="switchAuthView('landing')"
                    class="text-[#0864F7] hover:underline"
                >
                    Beranda
                </button>

                <span class="mx-2 text-[#A899BD]">/</span>

                <span class="text-[#24104F]">
                    Jelajahi Fitur
                </span>

            </div>


            <!-- HERO FITUR -->
            <section class="relative z-10 mx-5 mb-4 grid min-h-[230px] max-w-[1600px] grid-cols-1 items-center overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-r from-[#E6D9FF] via-[#E9E4FF] to-[#F5E7FA] px-6 py-7 shadow-sm sm:mx-8 sm:min-h-[270px] sm:px-10 lg:mx-auto lg:grid-cols-[1fr_.95fr] lg:rounded-[34px] lg:px-14 lg:py-8 xl:mx-14 xl:max-w-none xl:px-16">

                <div class="relative z-20 max-w-[650px]">

                    <span class="mb-4 inline-flex rounded-full bg-[#D7C0FA] px-5 py-2 text-[11px] font-extrabold uppercase tracking-wide text-[#60439A] sm:text-[12px]">
                        Kenali Fitur SAFIRA
                    </span>

                    <h1 class="mb-3 text-[34px] font-black leading-[1.08] tracking-[-0.04em] text-[#211044] sm:text-[42px] lg:text-[48px] xl:text-[52px]">
                        Belajar lebih terarah,<br>mulai dari sini.
                    </h1>

                    <p class="max-w-[620px] text-[14px] font-medium leading-relaxed text-[#6F5D98] sm:text-[17px]">
                        Kenali fitur untuk mengatur catatan, tugas, jadwal, dan target belajarmu.
                    </p>

                </div>

                <div class="relative hidden h-[225px] lg:block lg:h-[255px]">

                    <img
                        src="${SAFIRA_AUTH_ASSETS.featureHero}"
                        alt="Ilustrasi mahasiswi sedang belajar"
                        class="absolute bottom-[-32px] right-0 h-[290px] w-full object-contain object-bottom xl:h-[320px]"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.star}"
                        alt=""
                        class="absolute left-[8%] top-[25%] h-9 w-9 object-contain"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.flowerPink}"
                        alt=""
                        class="absolute -right-2 bottom-2 h-20 w-24 object-contain"
                    >

                </div>

                <img
                    src="${SAFIRA_AUTH_ASSETS.sparkles}"
                    alt=""
                    class="pointer-events-none absolute right-[40%] top-5 h-8 w-8 object-contain lg:hidden"
                >

            </section>


            <!-- BANNER PREVIEW -->
            <div class="relative z-10 mx-5 mb-4 flex items-center gap-4 rounded-[17px] border border-[#DED1F5] bg-[#EDE5FF]/85 px-5 py-4 text-[#49366E] sm:mx-8 lg:mx-auto lg:max-w-[1600px] lg:px-7 xl:mx-14 xl:max-w-none">

                <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCCBFA] text-[20px] text-[#38205F]">
                    <i class="fa-solid fa-lock"></i>
                </span>

                <p class="text-[13px] leading-relaxed sm:text-[15px]">
                    <strong class="font-extrabold text-[#24104F]">
                        Kamu sedang melihat pratinjau fitur.
                    </strong>
                    Masuk atau daftar terlebih dahulu untuk menggunakan fitur SAFIRA.
                </p>

            </div>


            <!-- GRID FITUR -->
            <section class="relative z-10 mx-5 mb-5 grid grid-cols-1 gap-4 sm:mx-8 lg:mx-auto lg:max-w-[1600px] lg:grid-cols-2 lg:gap-5 xl:mx-14 xl:max-w-none">


                <!-- CATATAN AKADEMIK -->
                <article class="relative overflow-hidden rounded-[24px] border border-[#F5DDE9] bg-gradient-to-br from-[#FCEAF2] to-[#FCEFF7] p-5 shadow-sm sm:p-6">

                    <div class="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-[.9fr_1.1fr] sm:items-center">

                        <div>

                            <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#FFD8E8] text-[26px] text-[#7A1647]">
                                <i class="fa-solid fa-book-open"></i>
                            </div>

                            <h2 class="mb-2 text-[20px] font-extrabold text-[#24104F]">
                                Catatan Akademik
                            </h2>

                            <p class="max-w-[240px] text-[14px] font-medium leading-relaxed text-[#74618F]">
                                Simpan dan temukan catatan kuliah dengan mudah.
                            </p>

                        </div>


                        <div class="relative flex min-h-[130px] flex-col items-end justify-center gap-2 border-l-0 pl-0 sm:border-l sm:border-[#DDCBEA] sm:pl-5">

                            <span class="mb-1 mr-2 text-[11px] font-bold text-[#74618F]">
                                Contoh tampilan
                            </span>

                            <div class="flex w-full max-w-[250px] items-center gap-3 rounded-[13px] border border-white bg-white/85 p-3 shadow-sm">

                                <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFE2E8] text-[#E45A72]">
                                    <i class="fa-solid fa-align-left"></i>
                                </span>

                                <div>
                                    <p class="text-[12px] font-extrabold text-[#24104F]">
                                        Ringkasan Materi
                                    </p>

                                    <div class="mt-1.5 h-1.5 w-20 rounded-full bg-[#E7DFF0]"></div>
                                </div>

                            </div>

                            <div class="flex w-full max-w-[250px] items-center gap-3 rounded-[13px] border border-white bg-white p-3 shadow-md">

                                <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E1EDFF] text-[#0864F7]">
                                    <i class="fa-regular fa-file-lines"></i>
                                </span>

                                <div>
                                    <p class="text-[12px] font-extrabold text-[#24104F]">
                                        Catatan Kuliah
                                    </p>

                                    <div class="mt-1.5 h-1.5 w-16 rounded-full bg-[#E7DFF0]"></div>
                                    <div class="mt-1 h-1.5 w-24 rounded-full bg-[#E7DFF0]"></div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="relative z-10 mt-5 flex items-center gap-2 border-t border-[#EBCBD9] pt-3 text-[13px] font-semibold text-[#66518C]">
                        <i class="fa-solid fa-lock"></i>
                        Masuk untuk menggunakan
                    </div>

                    <img
                        src="${SAFIRA_AUTH_ASSETS.branch}"
                        alt=""
                        class="pointer-events-none absolute -right-1 -top-2 h-20 w-24 object-contain opacity-65"
                    >

                </article>


                <!-- TUGAS & DEADLINE -->
                <article class="relative overflow-hidden rounded-[24px] border border-[#D9E5FA] bg-gradient-to-br from-[#EAF1FF] to-[#E9F0FF] p-5 shadow-sm sm:p-6">

                    <div class="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-[.9fr_1.1fr] sm:items-center">

                        <div>

                            <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#D5E4FF] text-[26px] text-[#0864F7]">
                                <i class="fa-regular fa-square-check"></i>
                            </div>

                            <h2 class="mb-2 text-[20px] font-extrabold text-[#24104F]">
                                Tugas &amp; Deadline
                            </h2>

                            <p class="max-w-[240px] text-[14px] font-medium leading-relaxed text-[#74618F]">
                                Atur tugas dan pantau tenggat pengumpulan.
                            </p>

                        </div>


                        <div class="relative flex min-h-[130px] flex-col items-end justify-center gap-2 border-l-0 pl-0 sm:border-l sm:border-[#D1DDF2] sm:pl-5">

                            <span class="mb-1 mr-2 text-[11px] font-bold text-[#74618F]">
                                Contoh tampilan
                            </span>

                            <div class="flex w-full max-w-[270px] items-center justify-between gap-2 rounded-[13px] border border-white bg-white p-3 shadow-sm">

                                <div class="flex min-w-0 items-center gap-2">
                                    <span class="h-4 w-4 shrink-0 rounded border-2 border-[#B9B0CA]"></span>

                                    <p class="truncate text-[12px] font-extrabold text-[#24104F]">
                                        Tugas Presentasi
                                    </p>
                                </div>

                                <span class="whitespace-nowrap rounded-full bg-[#FFE1E3] px-2 py-1 text-[10px] font-extrabold text-[#D92332]">
                                    <i class="fa-regular fa-clock mr-1"></i>Besok
                                </span>

                            </div>

                            <div class="flex w-full max-w-[270px] items-center justify-between gap-2 rounded-[13px] border border-white bg-white p-3 shadow-sm">

                                <div class="flex min-w-0 items-center gap-2">
                                    <span class="h-4 w-4 shrink-0 rounded border-2 border-[#B9B0CA]"></span>

                                    <p class="truncate text-[12px] font-extrabold text-[#24104F]">
                                        Laporan Praktikum
                                    </p>
                                </div>

                                <span class="whitespace-nowrap rounded-full bg-[#E1EDFF] px-2 py-1 text-[10px] font-extrabold text-[#0864F7]">
                                    <i class="fa-regular fa-clock mr-1"></i>3 hari lagi
                                </span>

                            </div>

                        </div>

                    </div>

                    <div class="relative z-10 mt-5 flex items-center gap-2 border-t border-[#D3DFF3] pt-3 text-[13px] font-semibold text-[#66518C]">
                        <i class="fa-solid fa-lock"></i>
                        Masuk untuk menggunakan
                    </div>

                    <img
                        src="${SAFIRA_AUTH_ASSETS.lavender}"
                        alt=""
                        class="pointer-events-none absolute -right-1 -top-2 h-20 w-24 object-contain opacity-65"
                    >

                </article>


                <!-- JADWAL KULIAH -->
                <article class="relative overflow-hidden rounded-[24px] border border-[#D9EEDF] bg-gradient-to-br from-[#EAF8EC] to-[#E8F7F0] p-5 shadow-sm sm:p-6">

                    <div class="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-[.9fr_1.1fr] sm:items-center">

                        <div>

                            <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#D2F0D9] text-[26px] text-[#168334]">
                                <i class="fa-regular fa-calendar-check"></i>
                            </div>

                            <h2 class="mb-2 text-[20px] font-extrabold text-[#24104F]">
                                Jadwal Kuliah
                            </h2>

                            <p class="max-w-[240px] text-[14px] font-medium leading-relaxed text-[#74618F]">
                                Susun jadwal harian dan semester agar lebih teratur.
                            </p>

                        </div>


                        <div class="relative flex min-h-[130px] flex-col items-end justify-center gap-2 border-l-0 pl-0 sm:border-l sm:border-[#CFE5D4] sm:pl-5">

                            <span class="mb-1 mr-2 text-[11px] font-bold text-[#74618F]">
                                Contoh tampilan
                            </span>

                            <div class="w-full max-w-[270px] overflow-hidden rounded-[14px] bg-[#E0D2FF] p-1.5 shadow-sm">

                                <p class="px-3 py-1.5 text-[13px] font-extrabold text-[#24104F]">
                                    Senin
                                </p>

                                <div class="flex items-center gap-2 rounded-[10px] bg-white px-3 py-3">

                                    <span class="h-2 w-2 rounded-full bg-[#16A34A]"></span>

                                    <p class="text-[12px] font-extrabold text-[#24104F]">
                                        09.00
                                        <span class="mx-1 text-[#B3A7C7]">•</span>
                                        Metode Penelitian
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="relative z-10 mt-5 flex items-center gap-2 border-t border-[#CFE5D4] pt-3 text-[13px] font-semibold text-[#66518C]">
                        <i class="fa-solid fa-lock"></i>
                        Masuk untuk menggunakan
                    </div>

                    <img
                        src="${SAFIRA_AUTH_ASSETS.flowerPink}"
                        alt=""
                        class="pointer-events-none absolute -right-1 -top-2 h-20 w-24 object-contain opacity-65"
                    >

                </article>


                <!-- PROGRES BELAJAR -->
                <article class="relative overflow-hidden rounded-[24px] border border-[#E5D9F5] bg-gradient-to-br from-[#F1E9FF] to-[#F2EAFE] p-5 shadow-sm sm:p-6">

                    <div class="relative z-10 grid grid-cols-1 gap-5 sm:grid-cols-[.9fr_1.1fr] sm:items-center">

                        <div>

                            <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#E3D3FF] text-[26px] text-[#4D278D]">
                                <i class="fa-solid fa-chart-simple"></i>
                            </div>

                            <h2 class="mb-2 text-[20px] font-extrabold text-[#24104F]">
                                Progres Belajar
                            </h2>

                            <p class="max-w-[240px] text-[14px] font-medium leading-relaxed text-[#74618F]">
                                Pantau tugas selesai dan pencapaian target belajar.
                            </p>

                        </div>


                        <div class="relative flex min-h-[130px] flex-col items-end justify-center gap-2 border-l-0 pl-0 sm:border-l sm:border-[#DDD0EF] sm:pl-5">

                            <span class="mb-1 mr-2 text-[11px] font-bold text-[#74618F]">
                                Contoh tampilan
                            </span>

                            <div class="w-full max-w-[270px] rounded-[14px] border border-white bg-white p-4 shadow-sm">

                                <div class="mb-3 flex items-end justify-between">

                                    <p class="text-[12px] font-extrabold text-[#24104F]">
                                        Target Belajar
                                    </p>

                                    <p class="text-[13px] font-black text-[#24104F]">
                                        60%
                                    </p>

                                </div>

                                <div class="h-3 overflow-hidden rounded-full bg-[#DDD9F5]">
                                    <div class="h-full w-[60%] rounded-full bg-[#0864F7]"></div>
                                </div>

                            </div>

                        </div>

                    </div>

                    <div class="relative z-10 mt-5 flex items-center gap-2 border-t border-[#DDD0EF] pt-3 text-[13px] font-semibold text-[#66518C]">
                        <i class="fa-solid fa-lock"></i>
                        Masuk untuk menggunakan
                    </div>

                    <img
                        src="${SAFIRA_AUTH_ASSETS.branchCorner}"
                        alt=""
                        class="pointer-events-none absolute -right-2 -top-2 h-20 w-24 rotate-90 object-contain opacity-65"
                    >

                </article>

            </section>


            <!-- CTA -->
            <section class="relative z-10 mx-5 mb-6 overflow-hidden rounded-[25px] border border-white/80 bg-gradient-to-r from-[#EDE3FF] via-[#F4EAFE] to-[#FCEAF4] px-5 py-7 text-center shadow-sm sm:mx-8 sm:px-8 lg:mx-auto lg:max-w-[1600px] lg:py-8 xl:mx-14 xl:max-w-none">

                <img
                    src="${SAFIRA_AUTH_ASSETS.sparkles}"
                    alt=""
                    class="pointer-events-none absolute left-[27%] top-4 h-9 w-9 object-contain"
                >

                <img
                    src="${SAFIRA_AUTH_ASSETS.sparkles}"
                    alt=""
                    class="pointer-events-none absolute right-[27%] top-4 h-9 w-9 object-contain"
                >

                <img
                    src="${SAFIRA_AUTH_ASSETS.tulip}"
                    alt=""
                    class="pointer-events-none absolute bottom-2 right-[12%] h-14 w-14 object-contain"
                >

                <h2 class="mb-2 text-[24px] font-black tracking-[-0.03em] text-[#24104F] sm:text-[30px]">
                    Siap menata perjalanan belajarmu?
                </h2>

                <p class="mb-5 text-[13px] font-medium text-[#74618F] sm:text-[15px]">
                    Masuk ke akunmu atau daftar untuk mulai menggunakan semua fitur.
                </p>

                <div class="flex flex-col justify-center gap-3 sm:flex-row">

                    <button
                        type="button"
                        onclick="switchAuthView('login')"
                        class="min-h-[46px] rounded-[12px] bg-[#0864F7] px-12 text-[14px] font-bold text-white transition-colors hover:bg-[#0756D8]"
                    >
                        Masuk
                    </button>

                    <button
                        type="button"
                        onclick="switchAuthView('daftar')"
                        class="min-h-[46px] rounded-[12px] border-[1.5px] border-[#0864F7] bg-white/60 px-10 text-[14px] font-bold text-[#0864F7] transition-colors hover:bg-white"
                    >
                        Daftar Akun
                    </button>

                </div>

            </section>

            ${renderSafiraFooter(false)}

        </div>
    `;
}


// ------------------------------------------------------------
// 6. VALIDASI FORM LOGIN DAN DAFTAR
// ------------------------------------------------------------

window.handleSafiraAuthSubmit = function (event, mode = "login") {
    if (event) event.preventDefault();

    const form = event && event.currentTarget
        ? event.currentTarget
        : null;

    if (!form) return false;

    // Validasi bawaan browser: kolom wajib dan format email.
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    // Form daftar juga harus memastikan kedua kata sandi sama.
    if (mode === "daftar") {
        const passwordInput = document.getElementById("safira-register-password");
        const confirmationInput = document.getElementById("safira-register-password-confirm");

        if (!passwordInput || !confirmationInput) return false;

        confirmationInput.setCustomValidity("");

        if (passwordInput.value !== confirmationInput.value) {
            confirmationInput.setCustomValidity("Konfirmasi kata sandi belum sama.");
            confirmationInput.reportValidity();

            confirmationInput.addEventListener("input", function () {
                confirmationInput.setCustomValidity("");
            }, { once: true });

            return false;
        }
    }

    // Pertahankan alur autentikasi yang sudah dipakai index.html.
    // Pada prototipe saat ini, doLogin() mengalihkan tampilan ke dashboard.
    if (typeof window.doLogin === "function") {
        window.doLogin();
        return true;
    }

    console.error("Fungsi doLogin() belum tersedia. Periksa integrasi index.html.");
    return false;
};


// ------------------------------------------------------------
// 7. TEMPLATE HALAMAN LOGIN DAN DAFTAR
// ------------------------------------------------------------

function renderSafiraAuthPage(mode = "login") {

    const isRegister = mode === "daftar";

    const headingLeft = isRegister
        ? "Mulai perjalanan<br>belajarmu!"
        : "Selamat datang<br>kembali!";

    const subheadingLeft = isRegister
        ? "Satu ruang untuk mencatat,<br>merencanakan, dan berkembang."
        : "Langkah kecil hari ini,<br>untuk tujuan yang lebih besar.";

    const heroImage = isRegister
        ? SAFIRA_AUTH_ASSETS.registerHero
        : SAFIRA_AUTH_ASSETS.loginHero;

    const formHeading = isRegister
        ? "Buat Akun SAFIRA"
        : "Masuk ke SAFIRA";

    const formSubtitle = isRegister
        ? "Daftar dan mulai menata kegiatan belajarmu."
        : "Lanjutkan perjalanan belajarmu di sini.";

    const submitLabel = isRegister ? "Daftar" : "Masuk";

    const bottomPrompt = isRegister
        ? `Sudah punya akun?
            <button
                type="button"
                onclick="switchAuthView('login')"
                class="font-bold text-[#0864F7] underline underline-offset-2 hover:text-[#064BB5]"
            >
                Masuk sekarang
            </button>`
        : `Belum punya akun?
            <button
                type="button"
                onclick="switchAuthView('daftar')"
                class="font-bold text-[#0864F7] underline underline-offset-2 hover:text-[#064BB5]"
            >
                Daftar sekarang
            </button>`;

    const formId = isRegister
        ? "safira-register-form"
        : "safira-login-form";


    return `
        <div class="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-[#F9E9F7] via-[#F7E0F5] to-[#FBE6F1] px-4 py-4 font-sans text-[#24104F] sm:px-6 sm:py-5 lg:px-[4.3vw]">

            ${renderSafiraOuterDecorations()}

            ${renderSafiraAuthHeader()}


            <!-- PANEL UTAMA -->
            <main class="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 overflow-hidden rounded-[24px] border border-white/80 bg-white/40 shadow-[0_12px_35px_rgba(91,54,130,.08)] lg:min-h-[730px] lg:grid-cols-2 lg:rounded-[30px]">


                <!-- PANEL KIRI / ILUSTRASI -->
                <section class="relative flex min-h-[340px] flex-col overflow-hidden bg-gradient-to-br from-[#DCC4FA] via-[#D7BDF7] to-[#CDB0F0] px-7 pb-0 pt-8 sm:min-h-[400px] sm:px-10 sm:pt-10 lg:min-h-[730px] lg:px-14 lg:pt-16">

                    <img
                        src="${SAFIRA_AUTH_ASSETS.flowerCorner}"
                        alt=""
                        class="pointer-events-none absolute -left-2 -top-2 z-20 h-28 w-28 object-contain opacity-90 sm:h-36 sm:w-36"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.branchCorner}"
                        alt=""
                        class="pointer-events-none absolute -right-3 -top-1 z-20 h-28 w-28 rotate-[85deg] object-contain opacity-90 sm:h-36 sm:w-36"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.star}"
                        alt=""
                        class="pointer-events-none absolute right-[17%] top-[38%] z-20 h-9 w-9 object-contain"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.sparkles}"
                        alt=""
                        class="pointer-events-none absolute left-[8%] top-[47%] z-20 h-10 w-10 object-contain"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.coralHeart}"
                        alt=""
                        class="pointer-events-none absolute right-[8%] top-[47%] z-20 h-10 w-10 rotate-12 object-contain opacity-90"
                    >


                    <div class="relative z-10 max-w-[570px]">

                        <h1 class="mb-3 text-[37px] font-black leading-[1.08] tracking-[-0.045em] text-[#211044] sm:text-[46px] lg:text-[54px] xl:text-[60px]">
                            ${headingLeft}
                        </h1>

                        <p class="text-[17px] font-medium leading-[1.45] text-[#38235F] sm:text-[21px] lg:text-[24px]">
                            ${subheadingLeft}
                        </p>

                    </div>


                    <div class="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex h-[62%] items-end justify-center sm:h-[66%] lg:h-[61%]">

                        <img
                            src="${heroImage}"
                            alt="Ilustrasi mahasiswi SAFIRA sedang belajar"
                            class="h-full w-full object-contain object-bottom"
                        >

                    </div>


                    <img
                        src="${SAFIRA_AUTH_ASSETS.flowerStem}"
                        alt=""
                        class="pointer-events-none absolute bottom-8 left-1 z-20 hidden h-36 w-20 object-contain opacity-70 lg:block"
                    >

                </section>


                <!-- PANEL KANAN / FORM -->
                <section class="relative flex min-h-[610px] flex-col justify-center overflow-hidden bg-gradient-to-br from-[#FFF9FF] via-[#F9EFFB] to-[#F5E7FA] px-6 py-9 sm:px-10 lg:min-h-[730px] lg:px-12 xl:px-14">

                    <img
                        src="${SAFIRA_AUTH_ASSETS.flowerPink}"
                        alt=""
                        class="pointer-events-none absolute -left-3 top-1 z-0 h-24 w-28 rotate-[-18deg] object-contain opacity-70 sm:h-28 sm:w-32"
                    >

                    <img
                        src="${SAFIRA_AUTH_ASSETS.branchCorner}"
                        alt=""
                        class="pointer-events-none absolute -right-3 top-0 z-0 h-28 w-28 rotate-[80deg] object-contain opacity-70 sm:h-32 sm:w-32"
                    >


                    <div class="relative z-10 mx-auto w-full max-w-[600px]">


                        <!-- LOGO DAN JUDUL FORM -->
                        <div class="mb-7 text-center sm:mb-8">

                            <img
                                src="${SAFIRA_AUTH_ASSETS.logo}"
                                alt=""
                                class="mx-auto mb-2 h-[72px] w-[92px] object-contain sm:h-[80px] sm:w-[105px]"
                            >

                            <h2 class="text-[31px] font-black leading-tight tracking-[-0.035em] text-[#211044] sm:text-[39px] lg:text-[42px]">
                                ${formHeading}
                            </h2>

                            <p class="mt-2 text-[14px] font-medium text-[#6E5A96] sm:text-[17px]">
                                ${formSubtitle}
                            </p>

                        </div>


                        <!-- FORM -->
                        <form
                            id="${formId}"
                            onsubmit="handleSafiraAuthSubmit(event, '${isRegister ? "daftar" : "login"}')"
                            class="space-y-4 sm:space-y-5"
                        >

                            ${
                                isRegister
                                    ? renderSafiraAuthInput({
                                        id: "safira-register-name",
                                        name: "name",
                                        label: "Nama Lengkap",
                                        type: "text",
                                        placeholder: "Masukkan nama lengkap",
                                        icon: "fa-regular fa-user",
                                        autocomplete: "name"
                                    })
                                    : ""
                            }


                            ${renderSafiraAuthInput({
                                id: isRegister
                                    ? "safira-register-email"
                                    : "safira-login-email",
                                name: "email",
                                label: "Email",
                                type: "email",
                                placeholder: "Masukkan email kamu",
                                icon: "fa-regular fa-envelope",
                                autocomplete: "email"
                            })}


                            ${renderSafiraAuthInput({
                                id: isRegister
                                    ? "safira-register-password"
                                    : "safira-login-password",
                                name: "password",
                                label: "Kata Sandi",
                                type: "password",
                                placeholder: isRegister
                                    ? "Buat kata sandi"
                                    : "Masukkan kata sandi",
                                icon: "fa-solid fa-lock",
                                autocomplete: isRegister
                                    ? "new-password"
                                    : "current-password",
                                toggle: true
                            })}


                            ${
                                isRegister
                                    ? renderSafiraAuthInput({
                                        id: "safira-register-password-confirm",
                                        name: "password_confirmation",
                                        label: "Konfirmasi Kata Sandi",
                                        type: "password",
                                        placeholder: "Ulangi kata sandi",
                                        icon: "fa-solid fa-lock",
                                        autocomplete: "new-password",
                                        toggle: true
                                    })
                                    : ""
                            }


                            <button
                                type="submit"
                                class="mt-2 inline-flex min-h-[58px] w-full items-center justify-center gap-4 rounded-[14px] bg-[#0864F7] px-5 text-[17px] font-bold text-white shadow-[0_7px_16px_rgba(8,100,247,.17)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8] sm:min-h-[64px] sm:text-[19px]"
                            >
                                ${submitLabel}
                                <i class="fa-solid fa-arrow-right text-[21px]"></i>
                            </button>

                        </form>

                        <!-- PEMBATAS -->
                        <div class="my-5 flex items-center gap-4">
                            <div class="h-px flex-1 bg-[#DCCBEA]"></div>
                            <span class="text-[13px] font-semibold text-[#79679F]">atau</span>
                            <div class="h-px flex-1 bg-[#DCCBEA]"></div>
                        </div>

                        <!-- TOMBOL MASUK DENGAN GOOGLE -->
                        <button
                            type="button"
                            onclick="handleSafiraGoogleLogin(this)"
                            class="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[14px] border-[1.5px] border-[#D7C6ED] bg-white/85 px-5 text-[15px] font-bold text-[#24104F] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white sm:min-h-[60px] sm:text-[16px]"
                        >
                            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <span>${isRegister ? "Daftar dengan Google" : "Masuk dengan Google"}</span>
                        </button>


                        <!-- LINK ANTAR HALAMAN -->
                        <p class="mt-6 text-center text-[14px] font-medium text-[#6F5C94] sm:mt-7 sm:text-[16px]">
                            ${bottomPrompt}
                        </p>


                        ${
                            !isRegister
                                ? `
                                    <div class="my-6 h-px w-full bg-[#DCCBEA]"></div>

                                    <p class="text-center text-[13px] font-medium text-[#74618F] sm:text-[15px]">
                                        Catatan, tugas, dan jadwalmu dalam satu tempat.
                                    </p>
                                `
                                : ""
                        }

                    </div>

                </section>

            </main>


            ${renderSafiraFooter(true)}

        </div>
    `;
}


// ------------------------------------------------------------
// 8. FUNGSI UTAMA YANG DIPANGGIL ROUTER
// ------------------------------------------------------------

function renderLogin(viewMode = "landing") {

    if (viewMode === "landing") {
        return renderSafiraLanding();
    }

    if (viewMode === "fitur") {
        return renderSafiraFitur();
    }

    if (viewMode === "login") {
        return renderSafiraAuthPage("login");
    }

    if (viewMode === "daftar") {
        return renderSafiraAuthPage("daftar");
    }

    // Mode tidak dikenal diarahkan ke landing page.
    return renderSafiraLanding();
}


// Ekspos fungsi render ke window agar dapat dipanggil router aplikasi.
window.renderLogin = renderLogin;


// ============================================================
// AKHIR FILE LOGIN.JS
// ============================================================
