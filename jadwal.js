
/* ============================================================
   SAFIRA ACADEMIC JOURNAL
   JADWAL KULIAH
   Halaman: Jadwal, Tambah Jadwal, Edit Jadwal
   ============================================================ */


// ============================================================
// 1. STATE MANAGEMENT
// ============================================================

let daftarJadwal = [
    {
        hari: "Selasa",
        jamMulai: "08:00",
        jamSelesai: "09:40",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        ruang: "B.203",
        semester: "Semester 3"
    },
    {
        hari: "Selasa",
        jamMulai: "13:00",
        jamSelesai: "14:40",
        matkul: "Desain Web",
        matkul_val: "1",
        ruang: "Lab Komputer",
        semester: "Semester 3"
    },
    {
        hari: "Kamis",
        jamMulai: "09:50",
        jamSelesai: "11:30",
        matkul: "Strategi Pemecahan Masalah",
        matkul_val: "3",
        ruang: "B.201",
        semester: "Semester 3"
    },
    {
        hari: "Jumat",
        jamMulai: "08:00",
        jamSelesai: "09:40",
        matkul: "Desain Web",
        matkul_val: "1",
        ruang: "Lab Komputer",
        semester: "Semester 3"
    }
];

let editIndexJadwal = -1;
let hapusIndexJadwal = -1;
let filterSemester = "Semester 3";

const urutanHari = {
    "Senin": 1,
    "Selasa": 2,
    "Rabu": 3,
    "Kamis": 4,
    "Jumat": 5,
    "Sabtu": 6,
    "Minggu": 7
};


// ============================================================
// 2. KONFIGURASI HALAMAN
// ============================================================

const JADWAL_HARI_INI = "Selasa";

const JADWAL_TANGGAL = "Selasa, 13 Oktober 2026";

const JADWAL_TANGGAL_SINGKAT = "Selasa, 13 Oktober";


// ============================================================
// 3. KONFIGURASI ASET
// ============================================================

const ASET_JADWAL = {
    bungaPink: "aset/bunga-pink.png",
    bungaPojok: "aset/bunga-pojok.png",
    bungaTangkai: "aset/bunga-tangkai.png",
    kilauan: "aset/kilauan.png",
    kalender: "aset/kalender.png",
    hjk: "aset/list.png"
};


// ============================================================
// 4. DATA SEMESTER
// ============================================================

const daftarSemester = [
    {
        value: "Semester 1",
        label: "Semester 1 · Ganjil 2025/2026"
    },
    {
        value: "Semester 2",
        label: "Semester 2 · Genap 2025/2026"
    },
    {
        value: "Semester 3",
        label: "Semester 3 · Ganjil 2026/2027"
    },
    {
        value: "Semester 4",
        label: "Semester 4 · Genap 2026/2027"
    }
];

const daftarHari = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu"
];

const daftarMataKuliah = [
    {
        value: "1",
        nama: "Desain Web"
    },
    {
        value: "2",
        nama: "Psikologi Kognitif"
    },
    {
        value: "3",
        nama: "Strategi Pemecahan Masalah"
    }
];


// ============================================================
// 5. HELPER
// ============================================================

function escapeHTMLJadwal(value) {

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


function navigasiJadwal(route) {

    if (typeof window.navigate === "function") {

        window.navigate(route);

        return;

    }

    if (typeof navigate === "function") {

        navigate(route);

        return;

    }

    console.warn("Router aplikasi belum tersedia.");

}


function getLabelSemester(semester) {

    const data = daftarSemester.find(
        item => item.value === semester
    );

    return data ? data.label : semester;

}


function getJadwalTerurut(data) {

    return [...data].sort((a, b) => {

        if (urutanHari[a.hari] !== urutanHari[b.hari]) {

            return urutanHari[a.hari] - urutanHari[b.hari];

        }

        return a.jamMulai.localeCompare(b.jamMulai);

    });

}


// ============================================================
// 6. HEADER HALAMAN
// ============================================================

function renderHeaderJadwal() {
    const profil = typeof safiraProfileData !== "undefined"
        ? safiraProfileData
        : { full_name: "Safira", email: "safira@example.com", semester: "3" };

    const nama = escapeHTMLJadwal(profil.full_name || "Safira");
    const email = escapeHTMLJadwal(profil.email || "safira@example.com");
    const semester = escapeHTMLJadwal(profil.semester || "3");

    return `
        <header class="relative z-30 mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-[29px] font-black tracking-[-0.045em] text-[#211044] sm:text-[36px]">Jadwal</h2>

            <div class="relative flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
                <span class="hidden whitespace-nowrap border-r border-[#D9C9EA] pr-5 text-[13px] font-medium text-[#38245E] sm:block sm:text-[15px]">
                    ${JADWAL_TANGGAL}
                </span>

                <button
                    id="profile-dropdown-trigger"
                    type="button"
                    aria-label="Buka menu profil ${nama}"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="profile-dropdown"
                    onclick="toggleProfileDropdown()"
                    class="relative z-50 flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-white/40 sm:gap-3"
                >
                    <img src="aset/avatar.png" alt="Foto profil ${nama}" class="h-10 w-10 shrink-0 rounded-full border-2 border-white bg-[#E9D5FF] object-cover shadow-sm sm:h-11 sm:w-11">

                    <span class="flex max-w-[150px] items-center gap-1.5 truncate text-[14px] font-extrabold text-[#211044] sm:text-[15px]">
                        <span class="truncate">${nama}</span>
                        <i id="profile-dropdown-icon" class="fa-solid fa-chevron-down shrink-0 text-[11px] text-[#38245E] transition-transform"></i>
                    </span>
                </button>

                <div id="profile-dropdown-overlay" onclick="closeProfileDropdown()" class="fixed inset-0 z-40 hidden" aria-hidden="true"></div>

                <div id="profile-dropdown" role="menu" class="absolute right-0 top-14 z-50 hidden w-[min(320px,calc(100vw-32px))] origin-top-right overflow-hidden rounded-[22px] border border-[#E9DDF8] bg-white shadow-[0_15px_45px_rgba(51,28,91,.16)]">
                    <div class="flex items-center gap-4 border-b border-[#F0EAF7] p-5">
                        <img src="aset/avatar.png" alt="" class="h-14 w-14 shrink-0 rounded-full border-2 border-[#E8D9FF] bg-[#E9D5FF] object-cover">

                        <div class="min-w-0">
                            <h4 class="truncate text-[17px] font-extrabold text-[#211044]">${nama}</h4>
                            <p class="text-[12px] font-medium text-[#77669F]">Mahasiswa · Semester ${semester}</p>
                            <p class="mt-1 truncate text-[11px] text-[#9587AD]">${email}</p>
                        </div>
                    </div>

                    <div class="p-3">
                        <button type="button" role="menuitem" onclick="closeProfileDropdown(); navigate('profil')" class="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[14px] font-semibold text-[#38245E] transition-colors hover:bg-[#F5F0FF]">
                            <span class="flex items-center gap-3">
                                <i class="fa-regular fa-user text-[17px]"></i>
                                Lihat Profil
                            </span>
                            <i class="fa-solid fa-chevron-right text-[11px] text-[#9A8BB5]"></i>
                        </button>

                        <button type="button" role="menuitem" onclick="keluarDariMenuJadwal()" class="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[14px] font-semibold text-red-500 transition-colors hover:bg-red-50">
                            <i class="fa-solid fa-arrow-right-from-bracket text-[17px]"></i>
                            Keluar
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}


// Gunakan satu kontrak dropdown profil untuk seluruh halaman SAFIRA.
window.toggleProfileDropdownJadwal = function() {
    if (typeof window.toggleProfileDropdown === "function") {
        window.toggleProfileDropdown();
    }
};

window.closeProfileDropdownJadwal = function() {
    if (typeof window.closeProfileDropdown === "function") {
        window.closeProfileDropdown();
    }
};

window.keluarDariMenuJadwal = function() {
    window.closeProfileDropdownJadwal();

    if (typeof window.logout === "function") {
        window.logout();
    } else if (typeof window.showLanding === "function") {
        window.showLanding();
    } else {
        navigasiJadwal("login");
    }
};


// ============================================================
// 8. CONTROLLER FILTER SEMESTER
// ============================================================

window.ubahFilterSemester = function(selectElement) {

    if (!selectElement) return;

    filterSemester = selectElement.value;

    hapusIndexJadwal = -1;

    navigasiJadwal("jadwal");

};


// ============================================================
// 9. CONTROLLER TAMBAH JADWAL
// ============================================================

window.bukaTambahJadwal = function() {

    editIndexJadwal = -1;

    hapusIndexJadwal = -1;

    navigasiJadwal("tambahJadwal");

};


// ============================================================
// 10. CONTROLLER EDIT JADWAL
// ============================================================

window.bukaEditJadwal = function(index) {

    if (!daftarJadwal[index]) return;

    editIndexJadwal = index;

    hapusIndexJadwal = -1;

    navigasiJadwal("tambahJadwal");

};


// ============================================================
// 11. CONTROLLER HAPUS JADWAL
// ============================================================

window.bukaPopupHapusJadwal = function(index) {

    if (!daftarJadwal[index]) return;

    hapusIndexJadwal = index;

    navigasiJadwal("jadwal");

};


window.tutupPopupHapusJadwal = function() {

    hapusIndexJadwal = -1;

    navigasiJadwal("jadwal");

};


window.aksiKonfirmasiHapusJadwal = function() {

    if (
        hapusIndexJadwal < 0 ||
        !daftarJadwal[hapusIndexJadwal]
    ) {

        hapusIndexJadwal = -1;

        navigasiJadwal("jadwal");

        return;

    }

    daftarJadwal.splice(hapusIndexJadwal, 1);

    hapusIndexJadwal = -1;

    navigasiJadwal("jadwal");

};


// ============================================================
// 12. KOMPONEN BANNER UTAMA
// ============================================================

function renderBannerJadwal() {

    return `
        <section class="relative mb-5 flex min-h-[190px] items-center overflow-hidden rounded-[22px] border border-white/90 bg-gradient-to-r from-[#EDE1FF] via-[#F7E3F8] to-[#FADDF0] px-6 py-7 shadow-sm sm:min-h-[195px] sm:px-9 lg:px-10">

            <img
                src="${ASET_JADWAL.bungaPink}"
                alt=""
                class="pointer-events-none absolute -left-3 -top-5 z-10 h-28 w-32 object-contain opacity-90"
            >

            <img
                src="${ASET_JADWAL.kilauan}"
                alt=""
                class="pointer-events-none absolute left-[4%] bottom-5 z-10 h-7 w-7 object-contain opacity-80"
            >

            <div class="relative z-20 max-w-[730px] pl-2 sm:pl-3">
                <h1 class="mb-2 text-[27px] font-black leading-tight tracking-[-0.045em] text-[#211044] sm:text-[34px] lg:text-[41px]">
                    Rencanakan hari, nikmati prosesnya.
                </h1>

                <p class="text-[15px] font-medium leading-relaxed text-[#66518F] sm:text-[18px] lg:text-[21px]">
                    Susun jadwal kuliah agar kegiatanmu lebih teratur.
                </p>
            </div>

            <div class="pointer-events-none absolute bottom-0 right-0 z-10 hidden h-full w-[42%] items-end justify-center md:flex">
                <img
                    src="${ASET_JADWAL.hjk}"
                    alt=""
                    class="absolute left-[5%] top-[12%] h-14 w-14 object-contain opacity-80"
                >

                <img
                    src="${ASET_JADWAL.kalender}"
                    alt="Ilustrasi kalender"
                    class="h-[115%] w-full object-contain object-bottom"
                >
            </div>

            <img
                src="${ASET_JADWAL.bungaPojok}"
                alt=""
                class="pointer-events-none absolute right-0 top-0 z-10 h-28 w-24 object-contain opacity-80"
            >

        </section>
    `;

}


// ============================================================
// 13. KOMPONEN PILIH SEMESTER
// ============================================================

function renderFilterSemester() {

    let optionsHTML = "";

    daftarSemester.forEach(item => {

        optionsHTML += `
            <option
                value="${item.value}"
                ${filterSemester === item.value ? "selected" : ""}
            >
                ${item.label}
            </option>
        `;

    });


    return `
        <div class="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div class="flex flex-wrap items-center gap-3 sm:gap-4">

                <label
                    for="filter-semester-jadwal"
                    class="text-[15px] font-extrabold text-[#211044] sm:text-[16px]"
                >
                    Semester
                </label>

                <div class="relative w-full sm:w-[290px]">

                    <select
                        id="filter-semester-jadwal"
                        onchange="ubahFilterSemester(this)"
                        class="h-[50px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#D8C8F8] bg-white/80 px-4 pr-11 text-[13px] font-semibold text-[#24104F] shadow-sm outline-none transition-all focus:border-[#9676E0] focus:ring-2 focus:ring-[#DCCAF7]/50 sm:text-[14px]"
                    >

                        ${optionsHTML}

                    </select>

                    <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[13px] text-[#38245E]"></i>

                </div>

            </div>

            <button
                type="button"
                onclick="bukaTambahJadwal()"
                class="inline-flex min-h-[49px] items-center justify-center gap-3 rounded-[13px] bg-[#0864F7] px-6 text-[14px] font-bold text-white shadow-[0_5px_14px_rgba(8,100,247,.22)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8]"
            >
                <i class="fa-solid fa-plus text-[17px]"></i>
                Tambah Jadwal
            </button>

        </div>
    `;

}


// ============================================================
// 14. TABEL JADWAL MINGGUAN
// ============================================================

function renderTabelJadwal(dataDitampilkan) {

    if (dataDitampilkan.length === 0) {

        return `
            <tr>
                <td colspan="5" class="px-5 py-12 text-center">

                    <div class="flex flex-col items-center justify-center">

                        <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1EAFE] text-[24px] text-[#8B69CE]">
                            <i class="fa-regular fa-calendar-xmark"></i>
                        </div>

                        <h4 class="mb-1 text-[15px] font-extrabold text-[#38245E]">
                            Belum ada jadwal
                        </h4>

                        <p class="text-[13px] font-medium text-[#8A7AA8]">
                            Belum ada jadwal untuk semester ini.
                        </p>

                    </div>

                </td>
            </tr>
        `;

    }


    let html = "";

    dataDitampilkan.forEach((item, index) => {

        const indexAsli = daftarJadwal.indexOf(item);

        const isHariIni =
            item.hari === JADWAL_HARI_INI;


        html += `
            <tr class="border-b border-[#F0E8F8] bg-white transition-colors hover:bg-[#FCF5FA]">

                <!-- Hari -->

                <td class="whitespace-nowrap px-4 py-5 sm:px-5">

                    <div class="flex items-center gap-3">

                        ${isHariIni
                            ? `<span class="h-7 w-[5px] shrink-0 rounded-full bg-[#0864F7]"></span>`
                            : `<span class="h-7 w-[5px] shrink-0 rounded-full bg-transparent"></span>`
                        }

                        <span class="text-[13px] font-extrabold text-[#211044] sm:text-[14px]">
                            ${escapeHTMLJadwal(item.hari)}
                        </span>

                    </div>

                </td>


                <!-- Waktu -->

                <td class="whitespace-nowrap px-4 py-5 text-[13px] font-medium text-[#66518F] sm:px-5 sm:text-[14px]">

                    ${escapeHTMLJadwal(item.jamMulai)}
                    –
                    ${escapeHTMLJadwal(item.jamSelesai)}

                </td>


                <!-- Mata kuliah -->

                <td class="min-w-[170px] px-4 py-5 text-[13px] font-extrabold leading-snug text-[#211044] sm:px-5 sm:text-[14px]">

                    ${escapeHTMLJadwal(item.matkul)}

                </td>


                <!-- Ruangan -->

                <td class="whitespace-nowrap px-4 py-5 text-[13px] font-medium text-[#66518F] sm:px-5 sm:text-[14px]">

                    ${escapeHTMLJadwal(item.ruang)}

                </td>


                <!-- Aksi -->

                <td class="whitespace-nowrap px-4 py-5 text-center sm:px-5">

                    <div class="flex items-center justify-center gap-2">

                        <button
                            type="button"
                            onclick="bukaEditJadwal(${indexAsli})"
                            aria-label="Edit jadwal"
                            class="flex h-9 w-9 items-center justify-center rounded-[11px] border border-[#D9DFFF] bg-[#E8EBFF] text-[#0864F7] transition-colors hover:bg-[#D9E1FF]"
                        >

                            <i class="fa-solid fa-pen text-[13px]"></i>

                        </button>


                        <button
                            type="button"
                            onclick="bukaPopupHapusJadwal(${indexAsli})"
                            aria-label="Hapus jadwal"
                            class="flex h-9 w-9 items-center justify-center rounded-[11px] border border-[#FFD7E0] bg-[#FFE7EC] text-red-500 transition-colors hover:bg-[#FFD7E0]"
                        >

                            <i class="fa-regular fa-trash-can text-[14px]"></i>

                        </button>

                    </div>

                </td>

            </tr>
        `;

    });

    return html;

}


// ============================================================
// 15. KOMPONEN KARTU JADWAL HARI INI
// ============================================================

function renderKartuHariIni(data) {

    if (data.length === 0) {

        return `
            <div class="flex min-h-[190px] flex-col items-center justify-center rounded-[19px] border border-dashed border-[#E5D7F5] bg-white/65 px-5 py-8 text-center">

                <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F4E9FF] text-[24px] text-[#9673CF]">
                    <i class="fa-regular fa-calendar"></i>
                </div>

                <h4 class="mb-1 text-[15px] font-extrabold text-[#38245E]">
                    Tidak ada kelas hari ini
                </h4>

                <p class="text-[13px] font-medium text-[#8A7AA8]">
                    Waktunya istirahat dan mempersiapkan diri.
                </p>

            </div>
        `;

    }


    let html = "";

    data.forEach(item => {

        html += `
            <article class="mb-4 flex gap-4 rounded-[19px] border border-white/90 bg-gradient-to-br from-[#F0ECFF] to-[#E9E4FF] p-4 shadow-sm transition-transform hover:-translate-y-0.5 sm:p-5">

                <div class="flex h-[49px] w-[49px] shrink-0 items-center justify-center rounded-[13px] border border-[#F8D8E6] bg-[#FFEAF2] text-[21px] text-[#C34B78]">

                    <i class="fa-regular fa-clock"></i>

                </div>

                <div class="flex min-w-0 flex-col justify-center">

                    <span class="mb-1 text-[12px] font-extrabold text-[#38245E] sm:text-[13px]">
                        ${escapeHTMLJadwal(item.jamMulai)}
                        –
                        ${escapeHTMLJadwal(item.jamSelesai)}
                    </span>

                    <h4 class="text-[15px] font-black leading-snug text-[#211044] sm:text-[17px]">
                        ${escapeHTMLJadwal(item.matkul)}
                    </h4>

                    <p class="mt-2 flex items-center gap-2 text-[12px] font-medium text-[#66518F] sm:text-[13px]">
                        <i class="fa-solid fa-location-dot text-[#8A79AF]"></i>
                        Ruang ${escapeHTMLJadwal(item.ruang)}
                    </p>

                </div>

            </article>
        `;

    });

    return html;

}


// ============================================================
// 16. KOMPONEN PANEL JADWAL HARI INI
// ============================================================

function renderPanelHariIni(data) {

    return `
        <section class="relative flex flex-col overflow-hidden rounded-[23px] border border-white/90 bg-gradient-to-br from-[#FDEBF4] via-[#F9EAF9] to-[#F3E7FF] p-5 shadow-sm sm:p-6">

            <div class="relative z-10 mb-2 flex items-start justify-between gap-2">

                <div>

                    <h3 class="text-[21px] font-black tracking-[-0.035em] text-[#211044] sm:text-[23px]">
                        Jadwal Hari Ini
                    </h3>

                    <p class="mt-1 text-[13px] font-medium text-[#66518F] sm:text-[14px]">
                        ${JADWAL_TANGGAL_SINGKAT}
                    </p>

                </div>

                <span class="mt-1 rounded-full border border-[#D8DFFF] bg-[#E7EAFF] px-3 py-2 text-[12px] font-extrabold text-[#0864F7] sm:text-[13px]">
                    ${data.length} kelas
                </span>

            </div>

            <div class="relative z-10 mt-5 flex-1">
                ${renderKartuHariIni(data)}
            </div>

            <div class="relative z-10 mt-5 flex items-center justify-center gap-2">

                <p class="text-[14px] font-extrabold italic tracking-wide text-[#A66E87]">
                    Semangat belajar hari ini!
                </p>

                <img
                    src="${ASET_JADWAL.kilauan}"
                    alt=""
                    class="h-5 w-5 object-contain"
                >

            </div>

            <img
                src="${ASET_JADWAL.bungaPink}"
                alt=""
                class="pointer-events-none absolute -bottom-8 -left-7 z-0 h-32 w-32 object-contain opacity-75"
            >

            <img
                src="${ASET_JADWAL.bungaPojok}"
                alt=""
                class="pointer-events-none absolute -bottom-5 -right-5 z-0 h-28 w-28 object-contain opacity-75"
            >

        </section>
    `;

}


// ============================================================
// 17. KOMPONEN KETERANGAN BAWAH
// ============================================================

function renderInfoJadwal() {

    return `
        <section class="relative mb-5 mt-4 flex items-center gap-4 overflow-hidden rounded-[18px] border border-[#F3D9EB] bg-gradient-to-r from-[#FBEAF5] to-[#F4E8FF] px-5 py-4 shadow-sm">

            <div class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-[13px] border border-[#F6D9E8] bg-[#FFE6F0] text-[23px] text-[#B94A7E]">

                <i class="fa-solid fa-book-open"></i>

            </div>

            <div class="relative z-10 h-10 w-px bg-[#E6CBE1]"></div>

            <p class="relative z-10 text-[13px] font-medium leading-relaxed text-[#493875] sm:text-[14px]">

                Jadwal yang tersusun membantu kamu membagi waktu untuk kuliah dan belajar mandiri.

            </p>

        </section>
    `;

}


// ============================================================
// 18. MODAL KONFIRMASI HAPUS JADWAL
// ============================================================

function renderModalHapusJadwal() {

    if (
        hapusIndexJadwal < 0 ||
        !daftarJadwal[hapusIndexJadwal]
    ) {
        return "";
    }

    const target = daftarJadwal[hapusIndexJadwal];

    return `
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-[#211044]/55 p-4 backdrop-blur-sm">

            <div class="relative w-full max-w-[430px] rounded-[25px] border border-[#F0E5FA] bg-gradient-to-br from-white to-[#FBF4FF] p-7 shadow-[0_25px_70px_rgba(31,14,63,.25)] sm:p-8">

                <button
                    type="button"
                    onclick="tutupPopupHapusJadwal()"
                    aria-label="Tutup dialog"
                    class="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-[#88789F] transition-colors hover:bg-[#F3EAFB]"
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
                        Hapus jadwal ini?
                    </h3>

                    <p class="mb-4 text-[14px] font-medium text-[#76678F]">
                        Kamu akan menghapus jadwal:
                    </p>

                    <div class="mb-4 rounded-[16px] border border-[#E5D9FA] bg-[#F4EEFF] p-4">

                        <h4 class="text-[17px] font-extrabold leading-snug text-[#321B68]">
                            ${escapeHTMLJadwal(target.matkul)}
                        </h4>

                        <p class="mt-2 text-[13px] font-semibold text-[#76678F]">
                            ${escapeHTMLJadwal(target.hari)}
                            ·
                            ${escapeHTMLJadwal(target.jamMulai)}
                            –
                            ${escapeHTMLJadwal(target.jamSelesai)}
                        </p>

                        <p class="mt-1 text-[13px] font-medium text-[#76678F]">
                            Ruang ${escapeHTMLJadwal(target.ruang)}
                        </p>

                        <p class="mt-1 text-[12px] font-medium text-[#76678F]">
                            ${escapeHTMLJadwal(getLabelSemester(target.semester))}
                        </p>

                    </div>

                    <p class="text-[12px] font-medium leading-relaxed text-[#8A7C9E]">
                        Jadwal beserta pengaturannya akan dihapus.
                        Tindakan ini tidak dapat dibatalkan.
                    </p>

                </div>

                <div class="flex flex-col-reverse gap-3 sm:flex-row">

                    <button
                        type="button"
                        onclick="tutupPopupHapusJadwal()"
                        class="min-h-[48px] flex-1 rounded-[13px] border border-[#D8C8F4] bg-white px-4 text-[14px] font-bold text-[#513A7B] transition-colors hover:bg-[#F7F2FF]"
                    >
                        Batal
                    </button>

                    <button
                        type="button"
                        onclick="aksiKonfirmasiHapusJadwal()"
                        class="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-[13px] bg-red-500 px-4 text-[14px] font-bold text-white shadow-sm transition-colors hover:bg-red-600"
                    >
                        <i class="fa-regular fa-trash-can"></i>
                        Hapus Jadwal
                    </button>

                </div>

            </div>

        </div>
    `;
}


// ============================================================
// 19. RENDER HALAMAN UTAMA JADWAL
// ============================================================

function renderJadwal() {

    // Filter berdasarkan semester.
    const dataFilter = daftarJadwal.filter(
        item => item.semester === filterSemester
    );

    // Urutkan berdasarkan hari dan jam.
    const dataDitampilkan = getJadwalTerurut(dataFilter);

    // Data jadwal hari ini.
    const jadwalHariIni = dataDitampilkan.filter(
        item => item.hari === JADWAL_HARI_INI
    );

    // Susun tabel.
    const tabelHTML = renderTabelJadwal(dataDitampilkan);

    // Susun kartu jadwal hari ini.
    const panelHariIniHTML = renderPanelHariIni(jadwalHariIni);

    // Susun seluruh halaman.
    let html = `

        <div class="w-full min-w-0 text-[#211044]">

            ${renderHeaderJadwal()}

            ${renderBannerJadwal()}

            ${renderFilterSemester()}

            <!-- Layout utama -->

            <section class="mb-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.85fr_1fr] lg:gap-3 xl:gap-4">

                <!-- Jadwal mingguan -->

                <div class="relative min-w-0 overflow-hidden rounded-[23px] border border-white/90 bg-gradient-to-br from-[#F3ECFF] to-[#F8EAF8] p-3 shadow-sm sm:p-4">

                    <img
                        src="${ASET_JADWAL.bungaPojok}"
                        alt=""
                        class="pointer-events-none absolute right-2 top-1 z-0 h-24 w-24 object-contain opacity-70"
                    >

                    <div class="relative z-10 mb-4 px-2 pt-3 sm:px-3">

                        <h3 class="text-[22px] font-black tracking-[-0.035em] text-[#211044] sm:text-[24px]">
                            Jadwal Mingguan
                        </h3>

                        <p class="mt-1 text-[13px] font-medium text-[#66518F] sm:text-[14px]">
                            Jadwal rutin untuk semester yang dipilih.
                        </p>

                    </div>

                    <!-- Tabel -->

                    <p class="relative z-10 mb-2 px-2 text-[11px] font-medium text-[#8A7AA8] sm:hidden">
                        Geser tabel ke samping untuk melihat seluruh kolom.
                    </p>

                    <div class="relative z-10 overflow-hidden rounded-[18px] border border-white bg-white shadow-sm">

                        <div class="overflow-x-auto" role="region" aria-label="Tabel jadwal mingguan" tabindex="0">

                            <table class="w-full min-w-[660px] border-collapse text-left" aria-label="Jadwal kuliah mingguan">

                                <thead>

                                    <tr class="bg-[#EAE3FF] text-[13px] font-extrabold text-[#38245E]">

                                        <th class="px-4 py-4 sm:px-5">
                                            Hari
                                        </th>

                                        <th class="px-4 py-4 sm:px-5">
                                            Waktu
                                        </th>

                                        <th class="px-4 py-4 sm:px-5">
                                            Mata Kuliah
                                        </th>

                                        <th class="px-4 py-4 sm:px-5">
                                            Ruang
                                        </th>

                                        <th class="px-4 py-4 text-center sm:px-5">
                                            Aksi
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>
                                    ${tabelHTML}
                                </tbody>

                            </table>

                        </div>

                    </div>

                    <!-- Legenda -->

                    <div class="relative z-10 flex flex-wrap items-center gap-x-5 gap-y-3 px-3 pb-2 pt-5 text-[12px] font-semibold text-[#66518F] sm:gap-x-6 sm:text-[13px]">

                        <span class="flex items-center gap-2">
                            <span class="h-3.5 w-3.5 rounded-full bg-[#0864F7]"></span>
                            Hari ini
                        </span>

                        <span class="flex items-center gap-2">
                            <i class="fa-solid fa-pen text-[#0864F7]"></i>
                            Edit
                        </span>

                        <span class="flex items-center gap-2">
                            <i class="fa-regular fa-trash-can text-red-500"></i>
                            Hapus
                        </span>

                    </div>

                </div>

                <!-- Panel jadwal hari ini -->

                <div class="min-w-0">
                    ${panelHariIniHTML}
                </div>

            </section>

            <!-- Informasi bawah -->

            ${renderInfoJadwal()}

            <!-- Footer -->

            <div class="relative flex min-h-[38px] items-center justify-between overflow-hidden">

                <p class="relative z-10 text-[13px] font-semibold text-[#5E35B1] sm:text-[14px]">
                    Sedikit demi sedikit, jadi berarti.
                </p>

                <img
                    src="${ASET_JADWAL.bungaTangkai}"
                    alt=""
                    class="pointer-events-none absolute bottom-[-22px] right-[8%] h-[65px] w-[100px] object-contain opacity-75"
                >

            </div>

            <!-- Modal hapus -->

            ${renderModalHapusJadwal()}

        </div>

    `;

    return html;

}


// ============================================================
// 20. GENERATOR PILIHAN MATA KULIAH
// ============================================================

function renderOptionsMatkulJadwal(selectedValue) {

    let html = `
        <option value="" disabled ${!selectedValue ? "selected" : ""}>
            Pilih mata kuliah
        </option>
    `;

    daftarMataKuliah.forEach(item => {

        html += `
            <option
                value="${item.value}"
                ${selectedValue === item.value ? "selected" : ""}
            >
                ${item.nama}
            </option>
        `;

    });

    return html;

}


// ============================================================
// 21. GENERATOR PILIHAN SEMESTER FORM
// ============================================================

function renderOptionsSemesterJadwal(selectedValue) {

    let html = "";

    daftarSemester.forEach(item => {

        html += `
            <option
                value="${item.value}"
                ${selectedValue === item.value ? "selected" : ""}
            >
                ${item.label}
            </option>
        `;

    });

    return html;

}


// ============================================================
// 22. GENERATOR PILIHAN HARI
// ============================================================

function renderOptionsHariJadwal(selectedValue) {

    let html = `
        <option value="" disabled ${!selectedValue ? "selected" : ""}>
            Pilih hari
        </option>
    `;

    daftarHari.forEach(hari => {

        html += `
            <option
                value="${hari}"
                ${selectedValue === hari ? "selected" : ""}
            >
                ${hari}
            </option>
        `;

    });

    return html;

}


// ============================================================
// 23. BANNER FORM TAMBAH / EDIT
// ============================================================

function renderBannerFormJadwal(judul, subtitle) {

    return `
        <div class="relative mb-5 flex min-h-[115px] items-center justify-between gap-4 overflow-hidden border-b border-[#E3D5F7] pb-5">

            <div class="relative z-10 flex min-w-0 items-center gap-4 sm:gap-5">

                <div class="flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[19px] border border-[#E4D9FF] bg-[#E9E0FF] text-[34px] text-[#39209E] sm:h-[76px] sm:w-[76px]">
                    <i class="fa-regular fa-calendar"></i>
                </div>

                <div class="min-w-0">

                    <h3 class="mb-1 text-[25px] font-black leading-tight tracking-[-0.04em] text-[#211044] sm:text-[33px]">
                        ${escapeHTMLJadwal(judul)}
                    </h3>

                    <p class="text-[14px] font-medium leading-relaxed text-[#7967A4] sm:text-[17px]">
                        ${escapeHTMLJadwal(subtitle)}
                    </p>

                </div>

            </div>

            <img
                src="${ASET_JADWAL.hjk}"
                alt=""
                class="pointer-events-none absolute right-[17%] top-2 z-0 hidden h-12 w-12 object-contain opacity-75 sm:block"
            >

            <img
                src="${ASET_JADWAL.kalender}"
                alt="Ilustrasi kalender"
                class="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-[135px] w-[250px] object-contain object-bottom sm:block"
            >

        </div>
    `;

}


// ============================================================
// 24. FORM TAMBAH / EDIT JADWAL
// ============================================================

function renderTambahJadwal() {

    let matkulVal = "";
    let semesterVal = filterSemester || "Semester 3";
    let hariVal = "";
    let jamMulaiVal = "";
    let jamSelesaiVal = "";
    let ruangVal = "";

    let judulHalaman = "Tambah Jadwal";

    let subJudul =
        "Susun jadwal kuliah agar harimu lebih teratur.";

    let teksBawah =
        "Jadwal tersimpan setelah kamu menekan Simpan.";

    let teksTombol = "Simpan Jadwal";

    const isEdit =
        editIndexJadwal >= 0 &&
        Boolean(daftarJadwal[editIndexJadwal]);


    // Jika mode edit, ambil data sebelumnya.

    if (isEdit) {

        const data = daftarJadwal[editIndexJadwal];

        judulHalaman = "Edit Jadwal";

        subJudul =
            "Perbarui jadwal kuliah agar kegiatanmu tetap teratur.";

        teksBawah =
            "Perubahan tersimpan setelah kamu menekan Simpan.";

        teksTombol = "Simpan Perubahan";

        matkulVal = data.matkul_val;
        semesterVal = data.semester;
        hariVal = data.hari;
        jamMulaiVal = data.jamMulai;
        jamSelesaiVal = data.jamSelesai;
        ruangVal = data.ruang;

    }


    return `
        <div class="w-full min-w-0 text-[#211044]">

            <!-- Header halaman -->

            ${renderHeaderJadwal()}

            <!-- Tombol kembali -->

            <button
                type="button"
                onclick="batalFormJadwal()"
                class="mb-5 inline-flex items-center gap-3 text-[14px] font-semibold text-[#0864F7] transition-colors hover:text-blue-800 sm:text-[16px]"
            >
                <i class="fa-solid fa-arrow-left text-[18px]"></i>
                Kembali ke Jadwal
            </button>

            <!-- Container form -->

            <section class="relative overflow-hidden rounded-[20px] border-[1.5px] border-white bg-gradient-to-br from-[#F8F2FF] via-[#F9EEFC] to-[#FCE9F6] p-5 shadow-[0_4px_18px_rgba(105,72,145,.06)] sm:rounded-[22px] sm:p-6 lg:p-7">

                <!-- Banner -->

                ${renderBannerFormJadwal(judulHalaman, subJudul)}

                <div class="relative z-10">

                    <!-- Mata kuliah dan semester -->

                    <div class="mb-6 grid grid-cols-1 gap-5 md:grid-cols-[1.4fr_1fr] md:gap-6">

                        <!-- Mata kuliah -->

                        <div>

                            <label
                                for="input-matkul-jadwal"
                                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                            >
                                Mata Kuliah
                                <span class="text-red-500">*</span>
                            </label>

                            <div class="relative">

                                <select
                                    id="input-matkul-jadwal"
                                    required
                                    class="h-[52px] w-full cursor-pointer appearance-none rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 pr-11 text-[14px] font-medium text-[#24104F] outline-none transition-all focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:text-[16px]"
                                >
                                    ${renderOptionsMatkulJadwal(matkulVal)}
                                </select>

                                <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#24104F]"></i>

                            </div>

                        </div>

                        <!-- Semester -->

                        <div>

                            <label
                                for="input-semester-jadwal"
                                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                            >
                                Semester
                                <span class="text-red-500">*</span>
                            </label>

                            <div class="relative">

                                <select
                                    id="input-semester-jadwal"
                                    required
                                    class="h-[52px] w-full cursor-pointer appearance-none rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 pr-11 text-[14px] font-medium text-[#24104F] outline-none transition-all focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:text-[16px]"
                                >
                                    ${renderOptionsSemesterJadwal(semesterVal)}
                                </select>

                                <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#24104F]"></i>

                            </div>

                        </div>

                    </div>

                    <!-- Hari, jam mulai, jam selesai -->

                    <div class="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">

                        <!-- Hari -->

                        <div>

                            <label
                                for="input-hari-jadwal"
                                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                            >
                                Hari
                                <span class="text-red-500">*</span>
                            </label>

                            <div class="relative">

                                <select
                                    id="input-hari-jadwal"
                                    required
                                    class="h-[52px] w-full cursor-pointer appearance-none rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 pr-11 text-[14px] font-medium text-[#24104F] outline-none transition-all focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:text-[16px]"
                                >
                                    ${renderOptionsHariJadwal(hariVal)}
                                </select>

                                <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[15px] text-[#24104F]"></i>

                            </div>

                        </div>

                        <!-- Jam mulai -->

                        <div>

                            <label
                                for="input-jammulai-jadwal"
                                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                            >
                                Jam Mulai
                                <span class="text-red-500">*</span>
                            </label>

                            <div class="relative">

                                <input
                                    id="input-jammulai-jadwal"
                                    type="time"
                                    value="${escapeHTMLJadwal(jamMulaiVal)}"
                                    required
                                    class="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 pr-11 text-[14px] font-medium text-[#24104F] outline-none transition-all focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:text-[16px]"
                                >

                                <i class="fa-regular fa-clock pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[#38245E]"></i>

                            </div>

                        </div>

                        <!-- Jam selesai -->

                        <div>

                            <label
                                for="input-jamselesai-jadwal"
                                class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                            >
                                Jam Selesai
                                <span class="text-red-500">*</span>
                            </label>

                            <div class="relative">

                                <input
                                    id="input-jamselesai-jadwal"
                                    type="time"
                                    value="${escapeHTMLJadwal(jamSelesaiVal)}"
                                    required
                                    class="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 pr-11 text-[14px] font-medium text-[#24104F] outline-none transition-all focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:text-[16px]"
                                >

                                <i class="fa-regular fa-clock pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[18px] text-[#38245E]"></i>

                            </div>

                            <p class="mt-2 text-[12px] font-medium text-[#7967A4] sm:text-[13px]">
                                Jam selesai harus setelah jam mulai.
                            </p>

                        </div>

                    </div>

                    <!-- Ruangan -->

                    <div class="mb-6">

                        <label
                            for="input-ruang-jadwal"
                            class="mb-2 block text-[14px] font-extrabold text-[#211044] sm:text-[16px]"
                        >
                            Ruangan
                            <span class="text-red-500">*</span>
                        </label>

                        <input
                            id="input-ruang-jadwal"
                            type="text"
                            value="${escapeHTMLJadwal(ruangVal)}"
                            placeholder="Contoh: B.203 atau Lab Komputer"
                            required
                            class="h-[52px] w-full rounded-[12px] border-[1.5px] border-[#D8C8F8] bg-white/55 px-4 text-[14px] font-medium text-[#24104F] outline-none transition-all placeholder:text-[#9284B2] focus:border-[#9676E0] focus:bg-white focus:ring-2 focus:ring-[#DCCAF7]/50 sm:text-[16px]"
                        >

                    </div>

                    <!-- Informasi jadwal berulang -->

                    <div class="mb-5 flex items-center gap-4 rounded-[14px] border border-[#E8D6F4] bg-gradient-to-r from-[#F3E4FF] to-[#F8DDF3] px-4 py-4 sm:px-5">

                        <div class="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[13px] border border-[#EAD8F7] bg-[#EBD6F9] text-[26px] text-[#38209E]">
                            <i class="fa-solid fa-arrows-rotate"></i>
                        </div>

                        <p class="text-[13px] font-semibold leading-relaxed text-[#49308C] sm:text-[15px]">
                            Jadwal berulang setiap minggu pada semester yang dipilih.
                        </p>

                    </div>

                    <!-- Informasi wajib -->

                    <div class="mb-4 flex flex-wrap items-center justify-between gap-2 text-[12px] font-medium text-[#8171AC] sm:text-[14px]">

                        <p>* Wajib diisi</p>

                        ${isEdit
                            ? `<p>Terakhir diperbarui: 13 Okt 2026</p>`
                            : ""
                        }

                    </div>

                    <!-- Footer form -->

                    <div class="flex flex-col gap-4 border-t border-[#DDCFF0] pt-4 sm:flex-row sm:items-center sm:justify-between sm:pt-5">

                        <p class="text-[13px] font-medium leading-relaxed text-[#7967A4] sm:text-[15px]">
                            ${teksBawah}
                        </p>

                        <div class="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row sm:items-center">

                            <button
                                type="button"
                                onclick="batalFormJadwal()"
                                class="min-h-[49px] rounded-[12px] border-[1.5px] border-[#0864F7] bg-white/65 px-7 text-[14px] font-bold text-[#0864F7] transition-colors hover:bg-[#EDF3FF] sm:min-w-[125px] sm:text-[15px]"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onclick="aksiSimpanJadwal()"
                                class="inline-flex min-h-[49px] items-center justify-center gap-3 rounded-[12px] bg-[#0864F7] px-6 text-[14px] font-bold text-white shadow-[0_5px_14px_rgba(8,100,247,.20)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8] sm:min-w-[225px] sm:text-[15px]"
                            >
                                <i class="fa-solid fa-check text-[18px]"></i>
                                ${teksTombol}
                            </button>

                        </div>

                    </div>

                </div>

                <!-- Dekorasi -->

                <img
                    src="${ASET_JADWAL.bungaPojok}"
                    alt=""
                    class="pointer-events-none absolute -bottom-5 -right-5 h-32 w-32 object-contain opacity-40"
                >

            </section>

            <!-- Footer dekoratif -->

            <div class="relative mt-3 flex min-h-[42px] items-center justify-between overflow-hidden">

                <p class="relative z-10 text-[13px] font-semibold text-[#5E35B1] sm:text-[14px]">
                    Sedikit demi sedikit, jadi berarti.
                </p>

                <img
                    src="${ASET_JADWAL.bungaTangkai}"
                    alt=""
                    class="pointer-events-none absolute bottom-[-20px] right-[7%] h-[65px] w-[100px] object-contain opacity-80"
                >

            </div>

        </div>
    `;

}


// ============================================================
// 25. VALIDASI DAN SIMPAN JADWAL
// ============================================================

window.aksiSimpanJadwal = function() {

    // Ambil elemen formulir.

    const matkulSelect = document.getElementById(
        "input-matkul-jadwal"
    );

    const semesterSelect = document.getElementById(
        "input-semester-jadwal"
    );

    const hariSelect = document.getElementById(
        "input-hari-jadwal"
    );

    const jamMulaiInput = document.getElementById(
        "input-jammulai-jadwal"
    );

    const jamSelesaiInput = document.getElementById(
        "input-jamselesai-jadwal"
    );

    const ruangInput = document.getElementById(
        "input-ruang-jadwal"
    );


    // Pastikan seluruh elemen tersedia.

    if (
        !matkulSelect ||
        !semesterSelect ||
        !hariSelect ||
        !jamMulaiInput ||
        !jamSelesaiInput ||
        !ruangInput
    ) {

        console.error("Elemen form jadwal tidak ditemukan.");

        return;

    }


    // Ambil nilai.

    const matkulVal = matkulSelect.value;

    const matkul =
        matkulSelect.options[
            matkulSelect.selectedIndex
        ]?.textContent.trim() || "";

    const semester = semesterSelect.value;

    const hari = hariSelect.value;

    const jamMulai = jamMulaiInput.value;

    const jamSelesai = jamSelesaiInput.value;

    const ruang = ruangInput.value.trim();


    // Validasi kolom wajib.

    if (
        !matkulVal ||
        !semester ||
        !hari ||
        !jamMulai ||
        !jamSelesai ||
        !ruang
    ) {

        alert(
            "Mohon lengkapi semua kolom yang wajib diisi!"
        );

        return;

    }


    // Validasi jam.

    if (jamSelesai <= jamMulai) {

        alert(
            "Jam selesai harus setelah jam mulai!"
        );

        jamSelesaiInput.focus();

        return;

    }


    // Validasi bentrok jadwal.
    // Jadwal yang berbeda semester tidak dihitung bentrok.

    const jadwalBentrok = daftarJadwal.findIndex(
        (item, index) => {

            if (index === editIndexJadwal) {
                return false;
            }

            if (
                item.semester !== semester ||
                item.hari !== hari
            ) {
                return false;
            }

            return (
                jamMulai < item.jamSelesai &&
                jamSelesai > item.jamMulai
            );

        }
    );


    if (jadwalBentrok !== -1) {

        const bentrok = daftarJadwal[jadwalBentrok];

        alert(
            "Jadwal bentrok dengan " +
            bentrok.matkul +
            " pada pukul " +
            bentrok.jamMulai +
            "–" +
            bentrok.jamSelesai +
            ". Silakan pilih waktu lain."
        );

        jamMulaiInput.focus();

        return;

    }


    // Susun data.

    const dataBaru = {

        matkul: matkul,

        matkul_val: matkulVal,

        semester: semester,

        hari: hari,

        jamMulai: jamMulai,

        jamSelesai: jamSelesai,

        ruang: ruang

    };


    // Tambah data baru.

    if (editIndexJadwal === -1) {

        daftarJadwal.push(dataBaru);

    }

    // Perbarui data lama.

    else if (daftarJadwal[editIndexJadwal]) {

        daftarJadwal[editIndexJadwal] = dataBaru;

    }

    else {

        alert(
            "Data jadwal tidak ditemukan. Silakan buka kembali halaman jadwal."
        );

        editIndexJadwal = -1;

        navigasiJadwal("jadwal");

        return;

    }


    // Tampilkan semester tempat jadwal disimpan.

    filterSemester = semester;


    // Reset state.

    editIndexJadwal = -1;

    hapusIndexJadwal = -1;


    // Kembali ke halaman utama.

    navigasiJadwal("jadwal");

};


// ============================================================
// 26. BATAL FORM
// ============================================================

window.batalFormJadwal = function() {

    editIndexJadwal = -1;

    hapusIndexJadwal = -1;

    navigasiJadwal("jadwal");

};


// ============================================================
// 27. EKSPOR FUNGSI KE ROUTER APLIKASI
// ============================================================

window.renderJadwal = renderJadwal;

window.renderTambahJadwal = renderTambahJadwal;


// ============================================================
// SELESAI — JADWAL.JS
// ============================================================
