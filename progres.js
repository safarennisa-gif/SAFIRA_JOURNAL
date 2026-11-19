
// ============================================================
// SAFIRA — PROGRES BELAJAR
// Revisi tampilan: Dashboard, Tambah Target, dan Edit Target
// Struktur aset tetap menggunakan folder: aset/
// ============================================================


// ------------------------------------------------------------
// 1. DATA TARGET BELAJAR
// ------------------------------------------------------------

let daftarTarget = [
    {
        nama: "Kuasai Dasar HTML & CSS",
        matkul: "Desain Web",
        matkul_val: "1",
        tema: "biru",
        langkah: [
            { teks: "Pelajari struktur HTML", selesai: true },
            { teks: "Latihan selector CSS", selesai: true },
            { teks: "Buat halaman sederhana", selesai: false }
        ]
    },
    {
        nama: "Pahami Proses Memori",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        tema: "pink",
        langkah: [
            { teks: "Baca materi memori", selesai: true },
            { teks: "Buat ringkasan", selesai: false },
            { teks: "Kerjakan latihan", selesai: false }
        ]
    },
    {
        nama: "Latihan Analisis Kasus",
        matkul: "Strategi Pemecahan Masalah",
        matkul_val: "3",
        tema: "hijau",
        langkah: [
            { teks: "Identifikasi masalah", selesai: true },
            { teks: "Bandingkan alternatif", selesai: true },
            { teks: "Evaluasi solusi", selesai: true }
        ]
    }
];

let editIndexTarget = -1;
let tempLangkah = [];
let hapusIndexTarget = -1;


// ------------------------------------------------------------
// 2. KONFIGURASI ASET
// ------------------------------------------------------------

const PROGRES_ASSETS = {
    avatar: "aset/avatar.png",
    hero: "aset/pastel-girl-3.png",
    bukuHeader: "aset/buku-header.png",
    bukuKecil: "aset/buku-4.png",
    notebook: "aset/buku-8.png",
    bungaPink: "aset/bunga-pink.png",
    bungaPojok: "aset/bunga-pojok.png",
    bungaTangkai: "aset/bunga-tangkai.png",
    tangkai: "aset/tangkai-sidebar.png",
    ranting: "aset/ranting-bunga.png",
    rantingSudut: "aset/ranting-sudut.png",
    bintang: "aset/bintang.png",
    kilauan: "aset/kilauan.png",
    rangkaian: "aset/rangkaian-1.png"
};


// ------------------------------------------------------------
// 3. HELPER UMUM
// ------------------------------------------------------------

function escapeHTMLProgres(value) {
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

function navigasiProgres(route) {
    if (typeof window.navigate === "function") {
        window.navigate(route);
        return;
    }

    if (typeof navigate === "function") {
        navigate(route);
        return;
    }

    console.warn("Fungsi navigate() belum tersedia.");
}

function temaDariMatkul(matkulVal) {
    if (matkulVal === "2") return "pink";
    if (matkulVal === "3") return "hijau";

    return "biru";
}

function informasiTemaTarget(tema) {
    const temaMap = {
        biru: {
            card: "bg-gradient-to-br from-[#F0F3FF] via-[#F0F0FF] to-[#E8E5FF]",
            border: "border-[#D9D5FF]",
            badge: "bg-[#E2DFFF] text-[#4223B8]",
            accent: "text-[#4322B8]",
            progressBg: "bg-[#D8D8F3]",
            progressFill: "bg-[#1767F8]",
            check: "bg-[#1767F8] border-[#1767F8]",
            decor: PROGRES_ASSETS.ranting
        },

        pink: {
            card: "bg-gradient-to-br from-[#FDEBF4] via-[#FCEAF5] to-[#F9E1F0]",
            border: "border-[#F6D8E9]",
            badge: "bg-[#FBD6E8] text-[#B42B70]",
            accent: "text-[#B42B70]",
            progressBg: "bg-[#F1CFE1]",
            progressFill: "bg-[#E65D9A]",
            check: "bg-[#1767F8] border-[#1767F8]",
            decor: PROGRES_ASSETS.bungaPink
        },

        hijau: {
            card: "bg-gradient-to-br from-[#EAF8EE] via-[#E9F8EE] to-[#DFF4E6]",
            border: "border-[#CDEBD6]",
            badge: "bg-[#D4F2DE] text-[#087A38]",
            accent: "text-[#087A38]",
            progressBg: "bg-[#CBE8D4]",
            progressFill: "bg-[#19A957]",
            check: "bg-[#159B4C] border-[#159B4C]",
            decor: PROGRES_ASSETS.tangkai
        }
    };

    return temaMap[tema] || temaMap.biru;
}


// ------------------------------------------------------------
// 4. HEADER HALAMAN
// ------------------------------------------------------------

function renderHeaderProgres() {
    return `
        <header class="relative z-30 mb-4 flex flex-wrap items-center justify-between gap-4">

            <h2 class="text-[29px] font-black tracking-[-0.045em] text-[#211044] sm:text-[36px]">
                Progres Belajar
            </h2>

            <div class="relative flex items-center gap-3 sm:gap-5">

                <span class="hidden border-r border-[#D9C9EA] pr-5 text-[13px] font-medium text-[#38245E] sm:block sm:text-[15px]">
                    Selasa, 13 Oktober 2026
                </span>

                <button
                    type="button"
                    onclick="toggleProfileDropdown()"
                    class="flex items-center gap-3 rounded-full p-1 transition-colors hover:bg-white/40"
                    aria-label="Buka menu profil"
                >
                    <img
                        src="${PROGRES_ASSETS.avatar}"
                        alt="Foto profil Safira"
                        class="h-11 w-11 rounded-full border-2 border-white object-cover shadow-sm sm:h-12 sm:w-12"
                    >

                    <span class="text-[14px] font-extrabold text-[#211044] sm:text-[15px]">
                        Safira
                    </span>

                    <i id="profile-dropdown-icon" class="fa-solid fa-chevron-down text-[11px] text-[#38245E] transition-transform"></i>
                </button>

                <div
                    id="profile-dropdown-overlay"
                    onclick="closeProfileDropdown()"
                    class="fixed inset-0 z-40 hidden"
                ></div>

                <div
                    id="profile-dropdown"
                    class="absolute right-0 top-[58px] z-50 hidden w-[290px] overflow-hidden rounded-[22px] border border-[#E9DDF8] bg-white shadow-[0_15px_45px_rgba(51,28,91,.16)]"
                >
                    <div class="flex items-center gap-4 border-b border-[#F0EAF7] p-5">

                        <img
                            src="${PROGRES_ASSETS.avatar}"
                            alt="Foto profil Safira"
                            class="h-14 w-14 rounded-full border-2 border-[#E8D9FF] object-cover"
                        >

                        <div>
                            <h4 class="text-[17px] font-extrabold text-[#211044]">
                                Safira
                            </h4>

                            <p class="text-[12px] font-medium text-[#77669F]">
                                Mahasiswa · Semester 3
                            </p>
                        </div>

                    </div>

                    <div class="p-3">

                        <button
                            type="button"
                            onclick="closeProfileDropdown(); navigate('profil')"
                            class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[14px] font-semibold text-[#38245E] transition-colors hover:bg-[#F5F0FF]"
                        >
                            <span class="flex items-center gap-3">
                                <i class="fa-regular fa-user text-[17px]"></i>
                                Lihat Profil
                            </span>

                            <i class="fa-solid fa-chevron-right text-[11px] text-[#9A8BB5]"></i>
                        </button>

                        <button
                            type="button"
                            onclick="keluarDariMenuProgres()"
                            class="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-semibold text-red-500 transition-colors hover:bg-red-50"
                        >
                            <i class="fa-solid fa-arrow-right-from-bracket text-[17px]"></i>
                            Keluar
                        </button>

                    </div>
                </div>

            </div>

        </header>
    `;
}


// ------------------------------------------------------------
// 5. DROPDOWN PROFIL
// ------------------------------------------------------------

window.toggleProfileDropdown = window.toggleProfileDropdown || function() {

    const dropdown = document.getElementById("profile-dropdown");
    const overlay = document.getElementById("profile-dropdown-overlay");
    const icon = document.getElementById("profile-dropdown-icon");

    if (!dropdown || !overlay) return;

    const sedangTerbuka = !dropdown.classList.contains("hidden");

    dropdown.classList.toggle("hidden", sedangTerbuka);
    overlay.classList.toggle("hidden", sedangTerbuka);

    if (icon) {
        icon.classList.toggle("rotate-180", !sedangTerbuka);
    }
};

window.closeProfileDropdown = window.closeProfileDropdown || function() {

    const dropdown = document.getElementById("profile-dropdown");
    const overlay = document.getElementById("profile-dropdown-overlay");
    const icon = document.getElementById("profile-dropdown-icon");

    if (dropdown) dropdown.classList.add("hidden");
    if (overlay) overlay.classList.add("hidden");
    if (icon) icon.classList.remove("rotate-180");

};

window.keluarDariMenuProgres = function() {

    window.closeProfileDropdown();

    if (typeof window.logout === "function") {
        window.logout();
    } else if (typeof window.navigate === "function") {
        window.navigate("login");
    }

};


// ------------------------------------------------------------
// 6. BANNER UTAMA PROGRES
// ------------------------------------------------------------

function renderBannerProgres() {
    return `
        <section class="relative mb-4 flex min-h-[178px] items-center overflow-hidden rounded-[22px] border border-white/90 bg-gradient-to-r from-[#F4E7FF] via-[#F9E4F6] to-[#FADDF0] px-6 py-7 shadow-[0_3px_14px_rgba(112,73,153,.05)] sm:min-h-[185px] sm:px-9 lg:px-10">

            <img
                src="${PROGRES_ASSETS.bungaTangkai}"
                alt=""
                class="pointer-events-none absolute -left-2 -top-3 z-10 h-24 w-28 object-contain opacity-90 sm:h-32 sm:w-36"
            >

            <img
                src="${PROGRES_ASSETS.kilauan}"
                alt=""
                class="pointer-events-none absolute right-[30%] top-5 z-10 h-9 w-9 object-contain opacity-90"
            >

            <div class="relative z-20 max-w-[650px] pb-1 pl-1 sm:pl-3">

                <h1 class="mb-2 text-[28px] font-black leading-tight tracking-[-0.045em] text-[#211044] sm:text-[36px] lg:text-[42px]">
                    Setiap langkah kecil berarti.
                </h1>

                <p class="text-[15px] font-medium leading-relaxed text-[#66518F] sm:text-[19px] lg:text-[21px]">
                    Lihat tugas yang selesai dan kemajuan target belajarmu.
                </p>

            </div>

            <div class="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-full w-[43%] items-end justify-center md:flex">

                <img
                    src="${PROGRES_ASSETS.hero}"
                    alt="Ilustrasi karakter SAFIRA sedang belajar"
                    class="h-[118%] w-full object-contain object-bottom"
                >

            </div>

            <img
                src="${PROGRES_ASSETS.bintang}"
                alt=""
                class="pointer-events-none absolute right-[4%] top-7 z-10 h-8 w-8 object-contain"
            >

        </section>
    `;
}


// ------------------------------------------------------------
// 7. KARTU RINGKASAN
// ------------------------------------------------------------

function renderRingkasanProgres(targetTercapai, totalTarget) {

    // Data tugas diambil dari modul tugas.js agar ringkasan selalu sinkron.
    // Script tugas.js dimuat lebih dahulu oleh index.html.
    const dataTugas =
        typeof daftarTugas !== "undefined" && Array.isArray(daftarTugas)
            ? daftarTugas
            : [];

    const jumlahTugas = dataTugas.length;

    const jumlahTugasSelesai = dataTugas.filter(
        item => item.status === "Selesai"
    ).length;

    const persentaseTugas = jumlahTugas > 0
        ? Math.round((jumlahTugasSelesai / jumlahTugas) * 100)
        : 0;

    const keteranganTugas = jumlahTugas > 0
        ? `${jumlahTugasSelesai} dari ${jumlahTugas} tugas selesai`
        : "Belum ada tugas yang tercatat.";

    return `
        <section class="mb-6 grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_1fr]">

            <!-- Progres tugas -->

            <div class="relative flex min-h-[160px] items-center gap-5 overflow-hidden rounded-[22px] border border-white/90 bg-gradient-to-br from-[#F1F1FF] to-[#EAE9FF] p-5 shadow-sm sm:gap-7 sm:p-6">

                <div class="relative z-10 flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-[19px] border border-[#DDE4FF] bg-[#E3E9FF] text-[31px] text-[#0864F7] sm:h-[82px] sm:w-[82px]">
                    <i class="fa-regular fa-rectangle-list"></i>
                </div>

                <div class="relative z-10 min-w-0 flex-1">

                    <div class="mb-1 flex flex-wrap items-center justify-between gap-2">

                        <p class="text-[16px] font-extrabold text-[#211044] sm:text-[18px]">
                            Progres Tugas
                        </p>

                        <button
                            type="button"
                            onclick="navigate('tugas')"
                            class="inline-flex items-center gap-2 text-[13px] font-bold text-[#0864F7] transition-colors hover:text-blue-800 sm:text-[15px]"
                        >
                            Lihat Tugas
                            <i class="fa-solid fa-chevron-right text-[11px]"></i>
                        </button>

                    </div>

                    <h3 class="mb-1 text-[42px] font-black leading-none tracking-[-0.05em] text-[#211044] sm:text-[48px]">
                        ${persentaseTugas}%
                    </h3>

                    <div
                        class="mb-2.5 h-[12px] w-full overflow-hidden rounded-full bg-[#D6D9F1]"
                        role="progressbar"
                        aria-label="Progres penyelesaian tugas"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        aria-valuenow="${persentaseTugas}"
                    >
                        <div
                            class="h-full rounded-full bg-[#1767F8] transition-all duration-500"
                            style="width: ${persentaseTugas}%"
                        ></div>
                    </div>

                    <p class="text-[13px] font-medium text-[#66518F] sm:text-[14px]">
                        ${keteranganTugas}
                    </p>

                </div>

                <img
                    src="${PROGRES_ASSETS.bukuKecil}"
                    alt=""
                    class="pointer-events-none absolute -bottom-8 -right-5 h-24 w-24 object-contain opacity-[0.12]"
                >

            </div>


            <!-- Target tercapai -->

            <div class="relative flex min-h-[160px] items-center gap-5 overflow-hidden rounded-[22px] border border-white/90 bg-gradient-to-br from-[#FDEBF4] to-[#FBE3F0] p-5 shadow-sm sm:gap-7 sm:p-6">

                <div class="relative z-10 flex h-[74px] w-[74px] shrink-0 items-center justify-center rounded-[19px] border border-[#F9D7E8] bg-[#FCE0ED] text-[35px] text-[#B83E7D] sm:h-[82px] sm:w-[82px]">
                    <i class="fa-solid fa-bullseye"></i>
                </div>

                <div class="relative z-10 min-w-0">

                    <p class="mb-1 text-[16px] font-extrabold text-[#211044] sm:text-[18px]">
                        Target Tercapai
                    </p>

                    <h3 class="mb-1 text-[37px] font-black leading-none tracking-[-0.05em] text-[#211044] sm:text-[46px]">
                        ${targetTercapai} dari ${totalTarget}
                    </h3>

                    <p class="mt-2 text-[13px] font-medium text-[#66518F] sm:text-[14px]">
                        Target belajar yang sudah selesai.
                    </p>

                </div>

                <img
                    src="${PROGRES_ASSETS.bungaPink}"
                    alt=""
                    class="pointer-events-none absolute -right-2 -top-2 h-24 w-24 object-contain opacity-80"
                >

            </div>

        </section>
    `;
}

// ------------------------------------------------------------
// 8. KARTU TARGET BELAJAR
// ------------------------------------------------------------

function renderKartuTarget(target, index) {

    const tema = informasiTemaTarget(target.tema);

    const totalLangkah = target.langkah.length;

    const langkahSelesai = target.langkah.filter(
        item => item.selesai
    ).length;

    const persentase = totalLangkah === 0
        ? 0
        : Math.round((langkahSelesai / totalLangkah) * 100);

    const namaTarget = escapeHTMLProgres(target.nama);
    const namaMatkul = escapeHTMLProgres(target.matkul);

    let langkahHTML = "";

    target.langkah.forEach((langkah, langkahIndex) => {

        const teksLangkah = escapeHTMLProgres(langkah.teks);
        const sudahSelesai = Boolean(langkah.selesai);

        langkahHTML += `
            <button
                type="button"
                onclick="toggleLangkahUtama(${index}, ${langkahIndex})"
                aria-pressed="${sudahSelesai}"
                class="group flex w-full items-start gap-3 rounded-lg py-1 text-left transition-colors hover:bg-white/35"
            >

                <span class="mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px] border-2 ${sudahSelesai ? tema.check + " text-white" : "border-[#8C84A8] bg-white/90 text-transparent"} shadow-sm">
                    <i class="fa-solid fa-check text-[11px]"></i>
                </span>

                <span class="text-[13px] font-medium leading-relaxed ${sudahSelesai ? "text-[#51466D]" : "text-[#38245E]"} sm:text-[14px]">
                    ${teksLangkah}
                </span>

            </button>
        `;
    });


    return `
        <article class="relative flex min-h-[340px] flex-col overflow-hidden rounded-[22px] border ${tema.border} ${tema.card} p-5 shadow-[0_4px_14px_rgba(75,48,113,.04)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(75,48,113,.10)] sm:p-6">

            <img
                src="${tema.decor}"
                alt=""
                class="pointer-events-none absolute right-3 top-2 z-0 h-[58px] w-[58px] object-contain opacity-65"
            >

            <div class="relative z-10 mb-3 flex items-start justify-between gap-2 pr-5">

                <span class="inline-flex max-w-[85%] items-center gap-2 rounded-full border border-white/70 ${tema.badge} px-3 py-1.5 text-[11px] font-extrabold shadow-sm sm:text-[12px]">

                    <i class="fa-solid fa-book-open text-[13px]"></i>

                    <span class="truncate">
                        ${namaMatkul}
                    </span>

                </span>

                <button
                    type="button"
                    onclick="bukaEditTarget(${index})"
                    aria-label="Edit ${namaTarget}"
                    class="relative z-20 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#5B4B7C] transition-colors hover:bg-white/70 hover:text-[#0864F7]"
                >
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>

            </div>

            <h3 class="relative z-10 mb-3 min-h-[27px] text-[17px] font-black leading-snug tracking-[-0.025em] text-[#211044] sm:text-[19px]">
                ${namaTarget}
            </h3>

            <div class="relative z-10 mb-2 flex items-end justify-between gap-3">

                <span class="text-[12px] font-medium text-[#665A83] sm:text-[13px]">
                    ${langkahSelesai} dari ${totalLangkah} langkah
                </span>

                <span class="text-[14px] font-black ${persentase === 100 ? "text-green-700" : "text-[#211044]"} sm:text-[16px]">
                    ${persentase}%
                </span>

            </div>

            <div class="relative z-10 mb-2 h-[10px] w-full overflow-hidden rounded-full ${tema.progressBg}">

                <div
                    class="h-full rounded-full ${tema.progressFill} transition-all duration-500"
                    style="width: ${persentase}%"
                ></div>

            </div>

            ${persentase === 100 ? `
                <p class="relative z-10 mb-2 text-[12px] font-bold text-green-700">
                    Tercapai
                </p>
            ` : `<div class="mb-2 h-[14px]"></div>`}

            <div class="relative z-10 mb-4 flex-1 space-y-1 border-b border-black/10 pb-3">
                ${langkahHTML}
            </div>

            <div class="relative z-10 mt-auto flex items-center justify-center gap-6 pt-1 text-[14px] font-bold">

                <button
                    type="button"
                    onclick="bukaEditTarget(${index})"
                    class="inline-flex items-center gap-2 text-[#0864F7] transition-colors hover:text-blue-800"
                >
                    <i class="fa-solid fa-pen text-[13px]"></i>
                    Edit
                </button>

                <span class="h-5 w-px bg-black/10"></span>

                <button
                    type="button"
                    onclick="bukaPopupHapusTarget(${index})"
                    class="inline-flex items-center gap-2 text-red-500 transition-colors hover:text-red-700"
                >
                    <i class="fa-regular fa-trash-can text-[15px]"></i>
                    Hapus
                </button>

            </div>

        </article>
    `;
}


// ------------------------------------------------------------
// 9. MODAL KONFIRMASI HAPUS TARGET
// ------------------------------------------------------------

function renderModalHapusTarget() {

    if (hapusIndexTarget < 0 || !daftarTarget[hapusIndexTarget]) {
        return "";
    }

    const target = daftarTarget[hapusIndexTarget];

    const selesai = target.langkah.filter(
        item => item.selesai
    ).length;

    return `
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-[#211044]/55 p-4 backdrop-blur-sm">

            <div class="relative w-full max-w-[430px] rounded-[26px] border border-[#F0E5FA] bg-gradient-to-br from-white to-[#FBF4FF] p-7 shadow-[0_25px_70px_rgba(31,14,63,.25)] sm:p-8">

                <button
                    type="button"
                    onclick="tutupPopupHapusTarget()"
                    aria-label="Tutup dialog"
                    class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#88789F] transition-colors hover:bg-[#F3EAFB] hover:text-[#211044]"
                >
                    <i class="fa-solid fa-xmark text-[18px]"></i>
                </button>

                <div class="mb-5 flex justify-center">

                    <div class="flex h-[68px] w-[68px] items-center justify-center rounded-[22px] border border-red-100 bg-red-50 text-[29px] text-red-500">
                        <i class="fa-regular fa-trash-can"></i>
                    </div>

                </div>

                <div class="mb-6 text-center">

                    <h3 class="mb-2 text-[23px] font-black text-[#211044]">
                        Hapus target belajar ini?
                    </h3>

                    <p class="mb-4 text-[14px] font-medium text-[#76678F]">
                        Kamu akan menghapus target:
                    </p>

                    <div class="mb-4 rounded-[16px] border border-[#E5D9FA] bg-[#F4EEFF] p-4">

                        <h4 class="text-[17px] font-extrabold leading-snug text-[#321B68]">
                            ${escapeHTMLProgres(target.nama)}
                        </h4>

                        <p class="mt-1 text-[13px] font-semibold text-[#76678F]">
                            ${escapeHTMLProgres(target.matkul)}
                        </p>

                        <p class="mt-1 text-[12px] font-medium text-[#76678F]">
                            ${selesai} dari ${target.langkah.length} langkah selesai
                        </p>

                    </div>

                    <p class="text-[12px] font-medium leading-relaxed text-[#8A7C9E]">
                        Target beserta seluruh langkahnya akan dihapus. Tindakan ini tidak dapat dibatalkan.
                    </p>

                </div>

                <div class="flex flex-col-reverse gap-3 sm:flex-row">

                    <button
                        type="button"
                        onclick="tutupPopupHapusTarget()"
                        class="min-h-[48px] flex-1 rounded-[13px] border border-[#D8C8F4] bg-white px-4 text-[14px] font-bold text-[#513A7B] transition-colors hover:bg-[#F7F2FF]"
                    >
                        Batal
                    </button>

                    <button
                        type="button"
                        onclick="aksiKonfirmasiHapusTarget()"
                        class="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-[13px] bg-red-500 px-4 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-red-600"
                    >
                        <i class="fa-regular fa-trash-can"></i>
                        Hapus Target
                    </button>

                </div>

            </div>

        </div>
    `;
}


// ------------------------------------------------------------
// 10. RENDER HALAMAN UTAMA PROGRES BELAJAR
// ------------------------------------------------------------

function renderProgres() {

    const totalTarget = daftarTarget.length;

    let targetTercapai = 0;

    daftarTarget.forEach(target => {

        const totalLangkah = target.langkah.length;

        const selesai = target.langkah.filter(
            item => item.selesai
        ).length;

        if (totalLangkah > 0 && selesai === totalLangkah) {
            targetTercapai++;
        }

    });


    let targetCardsHTML = daftarTarget.map((target, index) => {

        return renderKartuTarget(target, index);

    }).join("");


    if (daftarTarget.length === 0) {

        targetCardsHTML = `
            <div class="col-span-full flex min-h-[230px] flex-col items-center justify-center rounded-[22px] border border-dashed border-[#D8C8F4] bg-white/60 px-6 py-10 text-center">

                <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0E9FF] text-[27px] text-[#7654C8]">
                    <i class="fa-solid fa-bullseye"></i>
                </div>

                <h4 class="mb-2 text-[18px] font-extrabold text-[#211044]">
                    Belum ada target belajar
                </h4>

                <p class="mb-5 text-[13px] font-medium text-[#76678F]">
                    Tambahkan target pertama untuk mulai menyusun langkah belajarmu.
                </p>

                <button
                    type="button"
                    onclick="bukaTambahTarget()"
                    class="rounded-xl bg-[#0864F7] px-5 py-3 text-[14px] font-bold text-white hover:bg-blue-700"
                >
                    <i class="fa-solid fa-plus mr-2"></i>
                    Tambah Target
                </button>

            </div>
        `;
    }


    return `
        <div class="w-full min-w-0 text-[#211044]">

            ${renderHeaderProgres()}

            ${renderBannerProgres()}

            ${renderRingkasanProgres(targetTercapai, totalTarget)}


            <!-- Judul dan tombol tambah -->

            <section class="mb-4 flex flex-wrap items-center justify-between gap-3">

                <h3 class="text-[26px] font-black tracking-[-0.04em] text-[#211044] sm:text-[30px]">
                    Target Belajar
                </h3>

                <button
                    type="button"
                    onclick="bukaTambahTarget()"
                    class="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-[13px] bg-[#0864F7] px-5 text-[14px] font-bold text-white shadow-[0_5px_14px_rgba(8,100,247,.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8]"
                >
                    <i class="fa-solid fa-plus text-[17px]"></i>
                    Tambah Target
                </button>

            </section>


            <!-- Daftar target -->

            <section class="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">

                ${targetCardsHTML}

            </section>


            <!-- Keterangan -->

            <section class="relative flex items-center gap-4 overflow-hidden rounded-[17px] border border-[#C9D7FF] bg-gradient-to-r from-[#EFF3FF] to-[#F4EFFF] px-5 py-3.5 shadow-sm">

                <div class="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#0864F7] text-[18px] text-white shadow-sm">
                    <i class="fa-solid fa-check"></i>
                </div>

                <p class="relative z-10 text-[13px] font-medium leading-relaxed text-[#493875] sm:text-[14px]">
                    Centang langkah yang selesai. Progres target akan diperbarui otomatis.
                </p>

            </section>


            <!-- Dekorasi bagian bawah -->

            <div class="pointer-events-none relative mt-3 flex min-h-[38px] items-center justify-between overflow-hidden">

                <p class="relative z-10 text-[13px] font-semibold text-[#5E35B1] sm:text-[14px]">
                    Sedikit demi sedikit, jadi berarti.
                </p>

                <img
                    src="${PROGRES_ASSETS.rangkaian}"
                    alt=""
                    class="absolute bottom-[-18px] right-[10%] h-[65px] w-[230px] object-contain opacity-80 sm:right-[18%]"
                >

                <img
                    src="${PROGRES_ASSETS.bukuKecil}"
                    alt=""
                    class="pointer-events-none absolute bottom-[-12px] right-0 h-[55px] w-[65px] object-contain opacity-80"
                >

            </div>


            ${renderModalHapusTarget()}

        </div>
    `;
}


// ------------------------------------------------------------
// 11. CONTROLLER TAMBAH / EDIT TARGET
// ------------------------------------------------------------

window.bukaTambahTarget = function() {

    editIndexTarget = -1;
    hapusIndexTarget = -1;

    tempLangkah = [
        { teks: "", selesai: false },
        { teks: "", selesai: false },
        { teks: "", selesai: false }
    ];

    navigasiProgres("tambahTarget");

};


window.bukaEditTarget = function(index) {

    if (!daftarTarget[index]) return;

    editIndexTarget = index;
    hapusIndexTarget = -1;

    tempLangkah = JSON.parse(
        JSON.stringify(daftarTarget[index].langkah)
    );

    navigasiProgres("tambahTarget");

};


window.bukaPopupHapusTarget = function(index) {

    if (!daftarTarget[index]) return;

    hapusIndexTarget = index;

    navigasiProgres("progres");

};


window.tutupPopupHapusTarget = function() {

    hapusIndexTarget = -1;

    navigasiProgres("progres");

};


window.aksiKonfirmasiHapusTarget = function() {

    if (
        hapusIndexTarget > -1 &&
        hapusIndexTarget < daftarTarget.length
    ) {
        daftarTarget.splice(hapusIndexTarget, 1);
    }

    hapusIndexTarget = -1;

    navigasiProgres("progres");

};


window.toggleLangkahUtama = function(targetIndex, langkahIndex) {

    if (
        !daftarTarget[targetIndex] ||
        !daftarTarget[targetIndex].langkah[langkahIndex]
    ) {
        return;
    }

    daftarTarget[targetIndex].langkah[langkahIndex].selesai =
        !daftarTarget[targetIndex].langkah[langkahIndex].selesai;

    navigasiProgres("progres");

};


// ------------------------------------------------------------
// 12. KONTROL LANGKAH DINAMIS PADA FORM
// ------------------------------------------------------------

window.simpanStateLangkahDariDOM = function() {

    const container = document.getElementById(
        "container-langkah-belajar"
    );

    if (!container) return;

    const inputs = container.querySelectorAll(
        ".input-langkah-teks"
    );

    inputs.forEach((input, index) => {

        if (tempLangkah[index]) {
            tempLangkah[index].teks = input.value;
        }

    });

};


window.tambahLangkahBaru = function() {

    window.simpanStateLangkahDariDOM();

    tempLangkah.push({
        teks: "",
        selesai: false
    });

    window.renderUlangContainerLangkah();

    const inputs = document.querySelectorAll(
        "#container-langkah-belajar .input-langkah-teks"
    );

    const inputTerakhir = inputs[inputs.length - 1];

    if (inputTerakhir) {
        inputTerakhir.focus();
    }

};


window.hapusLangkah = function(index) {

    window.simpanStateLangkahDariDOM();

    if (tempLangkah.length <= 1) {

        alert("Minimal harus ada 1 langkah belajar.");

        return;
    }

    tempLangkah.splice(index, 1);

    window.renderUlangContainerLangkah();

};


window.toggleStatusLangkah = function(index) {

    window.simpanStateLangkahDariDOM();

    if (!tempLangkah[index]) return;

    tempLangkah[index].selesai =
        !tempLangkah[index].selesai;

    window.renderUlangContainerLangkah();

};


// ------------------------------------------------------------
// 13. GENERATOR HTML LANGKAH BELAJAR
// ------------------------------------------------------------

function generateHTMLDaftarLangkah() {

    if (!Array.isArray(tempLangkah) || tempLangkah.length === 0) {

        tempLangkah = [
            { teks: "", selesai: false }
        ];

    }

    let html = "";

    const isEditMode = editIndexTarget >= 0;


    tempLangkah.forEach((item, index) => {

        const teks = escapeHTMLProgres(item.teks);

        const selesai = Boolean(item.selesai);

        let tombolStatus = "";


        if (isEditMode) {

            tombolStatus = `
                <button
                    type="button"
                    onclick="toggleStatusLangkah(${index})"
                    aria-pressed="${selesai}"
                    class="mr-2 inline-flex h-[32px] min-w-[105px] shrink-0 items-center justify-center rounded-full px-3 text-[12px] font-bold transition-colors ${selesai ? "bg-[#C9EFCB] text-[#087A25] hover:bg-[#B7E9BC]" : "bg-[#E9DFFF] text-[#3921A2] hover:bg-[#DED0FF]"}"
                >
                    ${selesai ? "Selesai" : "Belum selesai"}
                </button>
            `;

        }


        html += `
            <div class="mb-3 flex w-full items-center gap-2.5 sm:gap-3">

                <div class="flex h-[48px] w-[54px] shrink-0 items-center justify-center rounded-[12px] border border-[#E4D8FF] bg-[#E9E0FF] text-[21px] font-black text-[#3B1E9E] sm:w-[62px]">
                    ${index + 1}
                </div>


                <div class="flex min-w-0 flex-1 items-center overflow-hidden rounded-[12px] border-[1.5px] border-[#D9C9F8] bg-white/55 transition-colors focus-within:border-[#9676E0] focus-within:bg-white">

                    <input
                        type="text"
                        class="input-langkah-teks h-[48px] min-w-0 flex-1 bg-transparent px-4 text-[14px] font-medium text-[#24104F] outline-none placeholder:text-[#9486B4] sm:text-[15px]"
                        value="${teks}"
                        placeholder="Tulis langkah belajar..."
                        aria-label="Langkah belajar ${index + 1}"
                    >

                    ${tombolStatus}

                </div>


                <button
                    type="button"
                    onclick="hapusLangkah(${index})"
                    aria-label="Hapus langkah ${index + 1}"
                    class="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] border-[1.5px] border-red-500 bg-white/50 text-[18px] text-red-500 transition-colors hover:bg-red-50"
                >
                    <i class="fa-regular fa-trash-can"></i>
                </button>

            </div>
        `;

    });

    return html;

}


window.renderUlangContainerLangkah = function() {

    const container = document.getElementById(
        "container-langkah-belajar"
    );

    if (container) {

        container.innerHTML = generateHTMLDaftarLangkah();

    }

};


// ------------------------------------------------------------
// 14. SIMPAN TARGET
// ------------------------------------------------------------

window.aksiSimpanTarget = function() {

    window.simpanStateLangkahDariDOM();


    const inputNama = document.getElementById(
        "input-nama-target"
    );

    const matkulSelect = document.getElementById(
        "input-matkul-target"
    );

    if (!inputNama || !matkulSelect) return;


    const nama = inputNama.value.trim();

    const matkulVal = matkulSelect.value;

    const matkul =
        matkulSelect.options[matkulSelect.selectedIndex]?.text || "";


    if (!nama || !matkulVal) {

        alert("Mohon lengkapi Nama Target dan Mata Kuliah!");

        if (!nama) {
            inputNama.focus();
        } else {
            matkulSelect.focus();
        }

        return;
    }


    const langkahValid = tempLangkah

        .filter(item => item.teks.trim() !== "")

        .map(item => ({
            teks: item.teks.trim(),
            selesai: Boolean(item.selesai)
        }));


    if (langkahValid.length === 0) {

        alert("Mohon masukkan minimal 1 langkah belajar!");

        const inputLangkah = document.querySelector(
            "#container-langkah-belajar .input-langkah-teks"
        );

        if (inputLangkah) {
            inputLangkah.focus();
        }

        return;
    }


    const dataBaru = {
        nama: nama,
        matkul: matkul,
        matkul_val: matkulVal,
        tema: temaDariMatkul(matkulVal),
        langkah: langkahValid
    };


    if (editIndexTarget === -1) {

        daftarTarget.push(dataBaru);

    } else if (daftarTarget[editIndexTarget]) {

        daftarTarget[editIndexTarget] = dataBaru;

    } else {

        alert(
            "Target yang akan diedit tidak ditemukan. Silakan buka kembali halaman target."
        );

        navigasiProgres("progres");

        return;
    }


    editIndexTarget = -1;

    tempLangkah = [];

    navigasiProgres("progres");

};


// ------------------------------------------------------------
// 15. HEADER FORM TAMBAH / EDIT
// ------------------------------------------------------------

function renderHeaderFormTarget(judul, subtitle) {

    return `
        <div class="relative mb-5 flex min-h-[112px] items-center justify-between gap-4 overflow-hidden border-b border-[#E3D5F7] pb-5">

            <div class="relative z-10 flex min-w-0 items-center gap-4 sm:gap-5">

                <div class="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[19px] border border-[#E4D9FF] bg-[#E9E0FF] text-[34px] text-[#39209E] sm:h-[76px] sm:w-[76px]">
                    <i class="fa-solid fa-bullseye"></i>
                </div>

                <div class="min-w-0">

                    <h3 class="mb-1 text-[25px] font-black leading-tight tracking-[-0.04em] text-[#211044] sm:text-[33px]">
                        ${escapeHTMLProgres(judul)}
                    </h3>

                    <p class="text-[14px] font-medium leading-relaxed text-[#7967A4] sm:text-[18px]">
                        ${escapeHTMLProgres(subtitle)}
                    </p>

                </div>

            </div>


            <img
                src="${PROGRES_ASSETS.bukuHeader}"
                alt="Ilustrasi perlengkapan belajar"
                class="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[125px] w-[235px] object-contain sm:block"
            >

            <img
                src="${PROGRES_ASSETS.kilauan}"
                alt=""
                class="pointer-events-none absolute right-[24%] top-1 z-0 h-8 w-8 object-contain opacity-80"
            >

        </div>
    `;

}


// ------------------------------------------------------------
// 16. RENDER FORM TAMBAH / EDIT TARGET
// ------------------------------------------------------------

function renderTambahTarget() {

    const isEdit =
        editIndexTarget >= 0 &&
        Boolean(daftarTarget[editIndexTarget]);


    if (!Array.isArray(tempLangkah) || tempLangkah.length === 0) {

        tempLangkah = isEdit

            ? JSON.parse(
                JSON.stringify(daftarTarget[editIndexTarget].langkah)
            )

            : [
                { teks: "", selesai: false },
                { teks: "", selesai: false },
                { teks: "", selesai: false }
            ];

    }


    let namaVal = "";
    let matkulVal = "";

    let judulHalaman = "Tambah Target Belajar";

    let subtitleHalaman =
        "Pecah tujuan belajarmu menjadi langkah kecil.";

    let tombolText = "Simpan Target";


    if (isEdit) {

        const data = daftarTarget[editIndexTarget];

        namaVal = data.nama;

        matkulVal = data.matkul_val;

        judulHalaman = "Edit Target Belajar";

        subtitleHalaman =
            "Perbarui tujuan dan langkah belajarmu.";

        tombolText = "Simpan Perubahan";

    }


    const namaEscaped = escapeHTMLProgres(namaVal);


    return `
        <div class="w-full min-w-0 text-[#211044]">


            ${renderHeaderProgres()}


            <!-- Navigasi kembali -->

            <button
                type="button"
                onclick="batalFormTarget()"
                class="mb-5 inline-flex items-center gap-3 text-[14px] font-semibold text-[#0864F7] transition-colors hover:text-blue-800 sm:text-[16px]"
            >
                <i class="fa-solid fa-arrow-left text-[18px]"></i>
                Kembali ke Progres Belajar
            </button>


            <!-- Kartu form -->

            <section class="relative overflow-hidden rounded-[20px] border-[1.5px] border-white bg-gradient-to-br from-[#F8F2FF] via-[#F9EEFC] to-[#FCE9F6] p-5 shadow-[0_4px_18px_rgba(105,72,145,.06)] sm:rounded-[22px] sm:p-6 lg:p-7">


                ${renderHeaderFormTarget(judulHalaman, subtitleHalaman)}


                <div class="relative z-10">


                    <!-- Nama target dan mata kuliah -->

                    <div class="mb-6 grid grid-cols-1 gap-5 md:grid-cols-[1.55fr_1fr] md:gap-6">


                        <div>

                            <label
                                for="input-nama-target"
                                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                            >
                                Nama Target
                                <span class="text-red-500">*</span>
                            </label>

                            <input
                                id="input-nama-target"
                                type="text"
                                value="${namaEscaped}"
                                placeholder="Contoh: Memahami dasar HTML dan CSS"
                                class="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 text-[14px] font-medium text-[#24104F] outline-none transition-all placeholder:text-[#9284B2] focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:h-[53px] sm:text-[16px]"
                                required
                            >

                        </div>


                        <div>

                            <label
                                for="input-matkul-target"
                                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                            >
                                Mata Kuliah
                                <span class="text-red-500">*</span>
                            </label>

                            <div class="relative">

                                <select
                                    id="input-matkul-target"
                                    required
                                    class="h-[52px] w-full cursor-pointer appearance-none rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 pr-11 text-[14px] font-medium text-[#24104F] outline-none transition-all focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:h-[53px] sm:text-[16px]"
                                >

                                    <option
                                        value=""
                                        disabled
                                        ${matkulVal === "" ? "selected" : ""}
                                    >
                                        Pilih mata kuliah
                                    </option>

                                    <option
                                        value="1"
                                        ${matkulVal === "1" ? "selected" : ""}
                                    >
                                        Desain Web
                                    </option>

                                    <option
                                        value="2"
                                        ${matkulVal === "2" ? "selected" : ""}
                                    >
                                        Psikologi Kognitif
                                    </option>

                                    <option
                                        value="3"
                                        ${matkulVal === "3" ? "selected" : ""}
                                    >
                                        Strategi Pemecahan Masalah
                                    </option>

                                </select>

                                <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#24104F]"></i>

                            </div>

                        </div>

                    </div>


                    <!-- Langkah belajar -->

                    <div class="mb-4">

                        <h4 class="mb-1 text-[14px] font-extrabold text-[#211044] sm:text-[16px]">
                            Langkah Belajar
                            <span class="text-red-500">*</span>
                        </h4>

                        <p class="mb-4 text-[13px] font-medium text-[#7967A4] sm:text-[15px]">

                            ${isEdit
                                ? "Ubah langkah belajar atau tambahkan langkah baru."
                                : "Tambahkan minimal satu langkah yang ingin kamu selesaikan."}

                        </p>


                        <div
                            id="container-langkah-belajar"
                            class="mb-3"
                        >
                            ${generateHTMLDaftarLangkah()}
                        </div>


                        <button
                            type="button"
                            onclick="tambahLangkahBaru()"
                            class="inline-flex min-h-[48px] items-center justify-center gap-3 rounded-[12px] border-[1.5px] border-[#0864F7] bg-white/65 px-5 text-[14px] font-bold text-[#0864F7] transition-colors hover:bg-[#EDF3FF] sm:text-[15px]"
                        >
                            <i class="fa-solid fa-plus text-[17px]"></i>
                            Tambah Langkah
                        </button>

                    </div>


                    <!-- Keterangan progres -->

                    <div class="mb-4 mt-3 flex items-center gap-4 rounded-[13px] border border-[#E4D8FF] bg-gradient-to-r from-[#EDE5FF] to-[#EBD9FF] px-4 py-3">

                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#9A7BE8] text-[18px] text-white">
                            <i class="fa-solid fa-chart-simple"></i>
                        </div>

                        <p class="text-[13px] font-semibold leading-relaxed text-[#4C2AA5] sm:text-[14px]">

                            ${isEdit
                                ? "Status langkah tetap tersimpan saat teks diubah."
                                : "Progres dihitung otomatis dari langkah yang selesai."}

                        </p>

                    </div>


                    <!-- Keterangan wajib dan tanggal -->

                    <div class="mb-4 flex flex-wrap items-center justify-between gap-2 text-[12px] font-medium text-[#8171AC] sm:text-[14px]">

                        <p>* Wajib diisi</p>

                        ${isEdit
                            ? "<p>Terakhir diperbarui: 13 Okt 2026</p>"
                            : ""}

                    </div>


                    <!-- Footer form -->

                    <div class="flex flex-col gap-4 border-t border-[#DDCFF0] pt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-5">

                        <p class="text-[13px] font-medium leading-relaxed text-[#7967A4] sm:text-[15px]">

                            ${isEdit
                                ? "Perubahan tersimpan setelah kamu menekan Simpan."
                                : "Target tersimpan setelah kamu menekan Simpan."}

                        </p>


                        <div class="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row sm:items-center">


                            <button
                                type="button"
                                onclick="batalFormTarget()"
                                class="min-h-[49px] rounded-[12px] border-[1.5px] border-[#0864F7] bg-white/65 px-7 text-[14px] font-bold text-[#0864F7] transition-colors hover:bg-[#EDF3FF] sm:min-w-[125px] sm:text-[15px]"
                            >
                                Batal
                            </button>


                            <button
                                type="button"
                                onclick="aksiSimpanTarget()"
                                class="inline-flex min-h-[49px] items-center justify-center gap-3 rounded-[12px] bg-[#0864F7] px-6 text-[14px] font-bold text-white shadow-[0_5px_14px_rgba(8,100,247,.20)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8] sm:min-w-[225px] sm:text-[15px]"
                            >
                                <i class="fa-solid fa-check text-[18px]"></i>
                                ${tombolText}
                            </button>


                        </div>

                    </div>

                </div>

            </section>


            <!-- Footer dekoratif -->

            <div class="relative mt-3 flex min-h-[43px] items-center justify-between overflow-hidden">

                <p class="relative z-10 text-[13px] font-semibold text-[#5E35B1] sm:text-[14px]">
                    Sedikit demi sedikit, jadi berarti.
                </p>

                <img
                    src="${PROGRES_ASSETS.rangkaian}"
                    alt=""
                    class="pointer-events-none absolute bottom-[-24px] right-[7%] h-[78px] w-[260px] object-contain opacity-85"
                >

                <img
                    src="${PROGRES_ASSETS.notebook}"
                    alt=""
                    class="pointer-events-none absolute bottom-[-17px] right-0 h-[65px] w-[85px] object-contain opacity-85"
                >

            </div>

        </div>
    `;
}


// ------------------------------------------------------------
// 17. BATAL FORM
// ------------------------------------------------------------

window.batalFormTarget = function() {

    editIndexTarget = -1;

    tempLangkah = [];

    navigasiProgres("progres");

};


// ------------------------------------------------------------
// 18. EKSPOR FUNGSI UNTUK ROUTER APLIKASI
// ------------------------------------------------------------

window.renderProgres = renderProgres;

window.renderTambahTarget = renderTambahTarget;

window.generateHTMLDaftarLangkah = generateHTMLDaftarLangkah;


// ============================================================
// AKHIR FILE PROGRES.JS
// ============================================================
