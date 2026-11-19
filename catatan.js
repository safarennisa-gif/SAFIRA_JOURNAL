// ============================================================
// SAFIRA ACADEMIC JOURNAL
// CATATAN AKADEMIK - FINAL UI VERSION (FIREBASE READY)
// ============================================================


// ============================================================
// 1. STATE MANAGEMENT & DATA CATATAN
// ============================================================

let daftarCatatan = [
    {
        judul: "Dasar HTML & CSS",
        matkul: "Desain Web",
        matkul_val: "1",
        isi: "Struktur halaman HTML dan dasar CSS untuk mengatur tampilan website.",
        tanggal: "12 Okt 2026",
        warna: "pink",
        timestamp: new Date(2026, 9, 12).getTime()
    },
    {
        judul: "Memori dan Perhatian",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        isi: "Ringkasan proses penyimpanan informasi dan pemusatan perhatian.",
        tanggal: "11 Okt 2026",
        warna: "indigo",
        timestamp: new Date(2026, 9, 11).getTime()
    },
    {
        judul: "Langkah Pemecahan Masalah",
        matkul: "Strategi Pemecahan Masalah",
        matkul_val: "3",
        isi: "Memahami masalah, menyusun rencana, dan mengevaluasi hasil.",
        tanggal: "10 Okt 2026",
        warna: "orange",
        timestamp: new Date(2026, 9, 10).getTime()
    },
    {
        judul: "Layout dengan Flexbox",
        matkul: "Desain Web",
        matkul_val: "1",
        isi: "Mengatur posisi elemen, jarak, dan perataan pada halaman web.",
        tanggal: "9 Okt 2026",
        warna: "indigo",
        timestamp: new Date(2026, 9, 9).getTime()
    },
    {
        judul: "Persepsi dan Pengolahan Informasi",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        isi: "Catatan tentang cara memahami dan mengolah informasi dari lingkungan.",
        tanggal: "8 Okt 2026",
        warna: "pink",
        timestamp: new Date(2026, 9, 8).getTime()
    },
    {
        judul: "Evaluasi Solusi",
        matkul: "Strategi Pemecahan Masalah",
        matkul_val: "3",
        isi: "Membandingkan alternatif dan menilai kesesuaian solusi yang dipilih.",
        tanggal: "7 Okt 2026",
        warna: "orange",
        timestamp: new Date(2026, 9, 7).getTime()
    }
];

// Variabel pelacak mode
let editIndexCatatan = -1;
let lihatIndexCatatan = -1;
let sortMode = "terbaru";
let hapusIndexCatatan = -1;

// State pencarian, filter, dan pagination.
let kataKunciCatatan = "";
let filterMatkulCatatan = "Semua Mata Kuliah";
let halamanCatatan = 1;
const CATATAN_PER_HALAMAN = 6;


// ============================================================
// 2. HELPER & KONFIGURASI DESAIN
// ============================================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        if (char === "&") return "&";
        if (char === "<") return "&lt;";
        if (char === ">") return "&gt;";
        if (char === '"') return "&quot;";
        return "&#39;";
    });
}

const colorStyles = {
    pink: {
        bg: "bg-[#FCEAF4]",
        border: "border-[#F5D4E7]",
        badgeBg: "bg-[#FAD7E8]",
        badgeText: "text-[#9B244F]",
        decor: "tulip-mini.png"
    },
    indigo: {
        bg: "bg-[#F0EAFE]",
        border: "border-[#DED1F5]",
        badgeBg: "bg-[#E7D9FB]",
        badgeText: "text-[#4C2A86]",
        decor: "lavender.png"
    },
    orange: {
        bg: "bg-[#FFF0E7]",
        border: "border-[#F7DCCB]",
        badgeBg: "bg-[#FFE2D0]",
        badgeText: "text-[#963B16]",
        decor: "kilauan.png"
    },
    blue: {
        bg: "bg-[#EAF3FF]",
        border: "border-[#D5E5FA]",
        badgeBg: "bg-[#DCEBFF]",
        badgeText: "text-[#2456A6]",
        decor: "bunga-tangkai.png"
    }
};

function dapatkanWarnaMatkul(val) {
    if (val === "1") return "pink";
    if (val === "2") return "indigo";
    if (val === "3") return "orange";
    return "blue";
}


// ============================================================
// 3. HEADER & PROFILE DROPDOWN
// ============================================================

function renderHeaderCatatan() {
    const profil = typeof safiraProfileData !== "undefined"
        ? safiraProfileData
        : { full_name: "Safira", email: "safira@example.com", semester: "3" };

    const nama = escapeHTML(profil.full_name || "Safira");
    const email = escapeHTML(profil.email || "safira@example.com");
    const semester = escapeHTML(profil.semester || "3");

    return `
        <header class="relative z-30 mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="flex items-center gap-2 text-[29px] font-black leading-tight tracking-[-0.04em] text-[#24104F] sm:text-[36px]">
                Catatan Akademik
                <img src="aset/bintang.png" class="h-6 w-6 object-contain opacity-80 sm:h-7 sm:w-7" alt="">
            </h2>

            <div class="relative flex items-center justify-between gap-3 sm:justify-end sm:gap-5">
                <span class="hidden whitespace-nowrap border-r border-[#CDBBEA] pr-5 text-[13px] font-medium text-[#24104F] sm:block sm:text-[15px]">
                    Selasa, 13 Oktober 2026
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
                    <img src="aset/avatar.png" alt="Foto profil ${nama}" class="h-10 w-10 shrink-0 rounded-full border-2 border-[#D9C3F5] bg-[#E9D5FF] object-cover shadow-sm sm:h-11 sm:w-11">
                    <span class="flex max-w-[150px] items-center gap-1.5 truncate text-[14px] font-bold text-[#24104F] sm:text-[15px]">
                        <span class="truncate">${nama}</span>
                        <i id="profile-dropdown-icon" class="fa-solid fa-chevron-down shrink-0 text-[11px] text-[#5D4A86] transition-transform"></i>
                    </span>
                </button>

                <div id="profile-dropdown-overlay" onclick="closeProfileDropdown()" class="fixed inset-0 z-40 hidden" aria-hidden="true"></div>

                <div id="profile-dropdown" role="menu" class="absolute right-0 top-14 z-50 hidden w-[min(320px,calc(100vw-32px))] origin-top-right overflow-hidden rounded-3xl border border-[#E9DDF7] bg-[#FFFCFF] shadow-xl">
                    <div class="flex items-center gap-4 border-b border-[#F0E7F8] p-5 sm:p-6">
                        <img src="aset/avatar.png" alt="" class="h-14 w-14 shrink-0 rounded-full border-2 border-[#E5D4F7] bg-[#E9D5FF] object-cover shadow-sm">
                        <div class="min-w-0">
                            <h4 class="truncate text-lg font-bold text-[#2A1854]">${nama}</h4>
                            <p class="text-xs font-medium text-[#74658F]">Mahasiswa • Semester ${semester}</p>
                            <p class="mt-1 truncate text-[11px] text-[#9587AD]">${email}</p>
                        </div>
                    </div>

                    <div class="p-3">
                        <button type="button" role="menuitem" onclick="closeProfileDropdown(); navigate('profil')" class="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-[#49376D] transition-colors hover:bg-[#F5EEFC]">
                            <span class="flex items-center gap-3"><i class="fa-regular fa-user text-lg"></i><span>Lihat Profil</span></span>
                            <i class="fa-solid fa-chevron-right text-xs text-[#9A8AB4]"></i>
                        </button>
                        <button type="button" role="menuitem" onclick="closeProfileDropdown(); logout()" class="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-50">
                            <i class="fa-solid fa-arrow-right-from-bracket text-lg"></i><span>Keluar</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}


// ============================================================
// 4. CONTROLLER & PENGURUTAN CATATAN
// ============================================================

window.toggleProfileDropdown = function () {
    const dropdown = document.getElementById("profile-dropdown");
    const icon = document.getElementById("profile-dropdown-icon");
    const overlay = document.getElementById("profile-dropdown-overlay");
    const trigger = document.getElementById("profile-dropdown-trigger");

    if (!dropdown) return;

    const shouldOpen = dropdown.classList.contains("hidden");
    dropdown.classList.toggle("hidden", !shouldOpen);
    if (overlay) overlay.classList.toggle("hidden", !shouldOpen);

    if (icon) {
        icon.classList.toggle("fa-chevron-down", !shouldOpen);
        icon.classList.toggle("fa-chevron-up", shouldOpen);
    }

    if (trigger) trigger.setAttribute("aria-expanded", String(shouldOpen));
};

window.closeProfileDropdown = function () {
    const dropdown = document.getElementById("profile-dropdown");
    const icon = document.getElementById("profile-dropdown-icon");
    const overlay = document.getElementById("profile-dropdown-overlay");
    const trigger = document.getElementById("profile-dropdown-trigger");

    if (dropdown) dropdown.classList.add("hidden");
    if (overlay) overlay.classList.add("hidden");
    if (icon) {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
    if (trigger) trigger.setAttribute("aria-expanded", "false");
};

function urutkanCatatan(data = daftarCatatan) {
    const sortedData = [...data];

    if (sortMode === "terbaru") {
        sortedData.sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
    } else if (sortMode === "terlama") {
        sortedData.sort((a, b) => Number(a.timestamp || 0) - Number(b.timestamp || 0));
    } else if (sortMode === "az") {
        sortedData.sort((a, b) => String(a.judul).localeCompare(String(b.judul), "id"));
    } else if (sortMode === "za") {
        sortedData.sort((a, b) => String(b.judul).localeCompare(String(a.judul), "id"));
    }

    return sortedData;
}

function dapatkanCatatanTerfilter() {
    const query = kataKunciCatatan.trim().toLocaleLowerCase("id-ID");

    const hasil = daftarCatatan.filter((catatan) => {
        const sesuaiMatkul = filterMatkulCatatan === "Semua Mata Kuliah"
            || catatan.matkul === filterMatkulCatatan;

        const teksCari = `${catatan.judul || ""} ${catatan.isi || ""} ${catatan.matkul || ""}`
            .toLocaleLowerCase("id-ID");

        return sesuaiMatkul && (!query || teksCari.includes(query));
    });

    return urutkanCatatan(hasil);
}

window.ubahPencarianCatatan = function (value) {
    const inputLama = document.getElementById("input-cari-catatan");
    const posisiKursor = inputLama && typeof inputLama.selectionStart === "number"
        ? inputLama.selectionStart
        : String(value || "").length;

    kataKunciCatatan = String(value || "");
    halamanCatatan = 1;
    if (typeof window.navigate === "function") window.navigate("catatan");

    const inputBaru = document.getElementById("input-cari-catatan");
    if (inputBaru) {
        inputBaru.focus();
        try {
            inputBaru.setSelectionRange(posisiKursor, posisiKursor);
        } catch (_) {}
    }
};

window.ubahFilterMatkulCatatan = function (selectElement) {
    if (!selectElement) return;
    filterMatkulCatatan = selectElement.value || "Semua Mata Kuliah";
    halamanCatatan = 1;
    if (typeof window.navigate === "function") window.navigate("catatan");
};

window.resetFilterCatatan = function () {
    kataKunciCatatan = "";
    filterMatkulCatatan = "Semua Mata Kuliah";
    halamanCatatan = 1;
    if (typeof window.navigate === "function") window.navigate("catatan");
};

window.ubahHalamanCatatan = function (halaman) {
    const data = dapatkanCatatanTerfilter();
    const jumlahHalaman = Math.max(1, Math.ceil(data.length / CATATAN_PER_HALAMAN));
    halamanCatatan = Math.min(Math.max(1, Number(halaman) || 1), jumlahHalaman);
    if (typeof window.navigate === "function") window.navigate("catatan");
};

window.ubahUrutanCatatan = function (selectElement) {
    if (!selectElement) return;
    sortMode = selectElement.value || "terbaru";
    halamanCatatan = 1;
    if (typeof window.navigate === "function") window.navigate("catatan");
};

window.bukaTambahCatatan = function () {
    editIndexCatatan = -1;
    lihatIndexCatatan = -1;
    if (typeof window.navigate === "function") window.navigate("tambahCatatan");
};

window.bukaEditCatatan = function (index) {
    if (!Number.isInteger(index) || !daftarCatatan[index]) return;
    editIndexCatatan = index;
    lihatIndexCatatan = -1;
    if (typeof window.navigate === "function") window.navigate("tambahCatatan");
};

window.bukaLihatCatatan = function (index) {
    if (!Number.isInteger(index) || !daftarCatatan[index]) return;
    lihatIndexCatatan = index;
    if (typeof window.navigate === "function") window.navigate("lihatCatatan");
};


// ============================================================
// 5. LOGIKA HAPUS CATATAN
// ============================================================

window.bukaPopupHapus = function (index) {
    if (!Number.isInteger(index) || !daftarCatatan[index]) return;
    hapusIndexCatatan = index;
    if (typeof window.navigate === "function") window.navigate("catatan");
};

window.tutupPopupHapus = function () {
    hapusIndexCatatan = -1;
    if (typeof window.navigate === "function") window.navigate("catatan");
};

window.aksiKonfirmasiHapus = function () {
    if (hapusIndexCatatan > -1 && hapusIndexCatatan < daftarCatatan.length) {
        daftarCatatan.splice(hapusIndexCatatan, 1);
        hapusIndexCatatan = -1;
        const totalHalaman = Math.max(1, Math.ceil(dapatkanCatatanTerfilter().length / CATATAN_PER_HALAMAN));
        halamanCatatan = Math.min(halamanCatatan, totalHalaman);
        if (typeof window.navigate === "function") window.navigate("catatan");
    }
};


// ============================================================
// 6. LOGIKA SIMPAN CATATAN
// ============================================================

window.aksiSimpanCatatan = function () {
    const inputJudul = document.getElementById("input-judul-catatan");
    const matkulSelect = document.getElementById("input-matkul-catatan");
    const inputIsi = document.getElementById("input-isi-catatan");

    if (!inputJudul || !matkulSelect || !inputIsi) return;

    const judul = inputJudul.value.trim();
    const matkul_val = matkulSelect.value;
    const matkul = (matkulSelect.options[matkulSelect.selectedIndex]?.text || "").trim();
    const isi = inputIsi.value.trim();

    if (!judul || !matkul_val || !isi) {
        alert("Mohon isi Judul, Mata Kuliah, dan Isi Catatan sebelum menyimpan!");
        if (!judul) inputJudul.focus();
        else if (!matkul_val) matkulSelect.focus();
        else inputIsi.focus();
        return;
    }

    const today = new Date();
    const tglOptions = {
        day: "numeric",
        month: "short",
        year: "numeric"
    };

    const catatanBaru = {
        judul: judul,
        matkul: matkul,
        matkul_val: matkul_val,
        isi: isi,
        tanggal: today.toLocaleDateString("id-ID", tglOptions),
        warna: dapatkanWarnaMatkul(matkul_val),
        timestamp: today.getTime()
    };

    if (editIndexCatatan === -1) {
        daftarCatatan.unshift(catatanBaru);
    } else if (daftarCatatan[editIndexCatatan]) {
        catatanBaru.timestamp = daftarCatatan[editIndexCatatan].timestamp;
        daftarCatatan[editIndexCatatan] = catatanBaru;
    }

    editIndexCatatan = -1;
    lihatIndexCatatan = -1;
    halamanCatatan = 1;

    if (typeof window.navigate === "function") window.navigate("catatan");
};


// ============================================================
// 7. RENDER HALAMAN DAFTAR CATATAN
// ============================================================

function renderPaginationCatatan(totalItems, totalPages, startItem, endItem) {
    if (totalItems === 0) return "";

    let buttons = `
        <button type="button" onclick="ubahHalamanCatatan(${halamanCatatan - 1})" ${halamanCatatan <= 1 ? "disabled" : ""}
            aria-label="Halaman sebelumnya"
            class="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[#DCCDEB] bg-white/65 text-[#493A6C] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">
            <i class="fa-solid fa-chevron-left text-xs"></i>
        </button>
    `;

    for (let page = 1; page <= totalPages; page++) {
        const active = page === halamanCatatan;
        buttons += `
            <button type="button" onclick="ubahHalamanCatatan(${page})" aria-label="Halaman ${page}" ${active ? 'aria-current="page"' : ""}
                class="flex h-10 min-w-10 items-center justify-center rounded-[11px] px-3 text-[13px] font-bold transition-colors ${active ? "bg-[#0864F7] text-white shadow-sm shadow-blue-500/20" : "border border-[#DCCDEB] bg-white/65 text-[#493A6C] hover:bg-white"}">
                ${page}
            </button>
        `;
    }

    buttons += `
        <button type="button" onclick="ubahHalamanCatatan(${halamanCatatan + 1})" ${halamanCatatan >= totalPages ? "disabled" : ""}
            aria-label="Halaman berikutnya"
            class="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[#DCCDEB] bg-white/65 text-[#493A6C] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40">
            <i class="fa-solid fa-chevron-right text-xs"></i>
        </button>
    `;

    return `
        <div class="mb-4 mt-2 flex flex-col items-center justify-between gap-3 border-t border-[#DCCDEB]/80 pt-4 sm:flex-row">
            <p class="text-center text-[13px] font-medium text-[#493A6C] sm:text-left">
                Menampilkan ${startItem}–${endItem} dari ${totalItems} catatan
            </p>
            <div class="flex max-w-full flex-wrap justify-center gap-2" aria-label="Navigasi halaman">
                ${buttons}
            </div>
        </div>
    `;
}

function renderCatatan() {
    const dataTerfilter = dapatkanCatatanTerfilter();
    const totalItems = dataTerfilter.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / CATATAN_PER_HALAMAN));
    halamanCatatan = Math.min(Math.max(1, halamanCatatan), totalPages);

    const startIndex = (halamanCatatan - 1) * CATATAN_PER_HALAMAN;
    const dataDitampilkan = dataTerfilter.slice(startIndex, startIndex + CATATAN_PER_HALAMAN);
    const startItem = totalItems ? startIndex + 1 : 0;
    const endItem = Math.min(startIndex + CATATAN_PER_HALAMAN, totalItems);

    let kartuCatatanHTML = "";

    if (dataDitampilkan.length === 0) {
        const belumAdaCatatan = daftarCatatan.length === 0;
        kartuCatatanHTML = `
            <div class="col-span-1 md:col-span-2 2xl:col-span-3 flex min-h-[250px] flex-col items-center justify-center rounded-[20px] border border-[#E6D8F4] bg-white/45 px-6 py-12 text-center">
                <img src="aset/buku-8.png" class="mb-3 h-24 w-28 object-contain" alt="Ilustrasi buku catatan">
                <p class="text-lg font-bold text-[#3B2866]">${belumAdaCatatan ? "Belum ada catatan." : "Catatan tidak ditemukan."}</p>
                <p class="mt-1 max-w-md text-sm text-[#786A96]">
                    ${belumAdaCatatan ? "Tambahkan catatan pertamamu untuk mulai menyimpan materi kuliah." : "Coba ubah kata kunci pencarian atau pilih mata kuliah lainnya."}
                </p>
                ${!belumAdaCatatan ? `<button type="button" onclick="resetFilterCatatan()" class="mt-4 rounded-xl border border-[#D8C8F4] bg-white px-4 py-2 text-sm font-bold text-[#5A3C8B] hover:bg-[#F8F2FF]">Reset pencarian dan filter</button>` : ""}
            </div>
        `;
    } else {
        dataDitampilkan.forEach((catatan) => {
            const indexAsli = daftarCatatan.indexOf(catatan);
            const style = colorStyles[catatan.warna] || colorStyles.blue;

            kartuCatatanHTML += `
                <article class="relative flex min-h-[235px] min-w-0 flex-col justify-between overflow-hidden rounded-[19px] border ${style.border} ${style.bg} p-5 shadow-[0_3px_14px_rgba(74,42,111,0.035)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_rgba(74,42,111,0.09)] sm:p-6">
                    <img src="aset/${style.decor}" class="pointer-events-none absolute right-3 top-3 h-12 w-[58px] object-contain opacity-90" alt="">

                    <div class="relative z-10 min-w-0">
                        <span class="mb-3.5 inline-flex max-w-full items-center gap-2 rounded-full ${style.badgeBg} px-3 py-1.5 text-[12px] font-bold ${style.badgeText} sm:text-[13px]">
                            <i class="fa-solid fa-book-open shrink-0 text-[14px]"></i>
                            <span class="truncate">${escapeHTML(catatan.matkul)}</span>
                        </span>

                        <h4 class="mb-1.5 break-words pr-10 text-[17px] font-extrabold leading-snug text-[#24104F] sm:text-[18px]">
                            ${escapeHTML(catatan.judul)}
                        </h4>

                        <p class="mb-3 line-clamp-3 break-words text-[14px] leading-[1.5] text-[#51456E]">
                            ${escapeHTML(catatan.isi)}
                        </p>

                        <p class="text-[12px] font-medium text-[#74678F] sm:text-[13px]">
                            ${escapeHTML(catatan.tanggal)}
                        </p>
                    </div>

                    <div class="relative z-10 mt-4 grid grid-cols-3 items-center border-t border-[#DCCDEB]/80 pt-3 text-[12px] font-bold sm:text-[13px]">
                        <button type="button" aria-label="Buka catatan ${escapeHTML(catatan.judul)}" onclick="bukaLihatCatatan(${indexAsli})" class="flex items-center justify-start gap-1.5 text-[#075EF0] transition-colors hover:text-blue-800 sm:gap-2">
                            Buka <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </button>
                        <button type="button" aria-label="Edit catatan ${escapeHTML(catatan.judul)}" onclick="bukaEditCatatan(${indexAsli})" class="flex items-center justify-center gap-1.5 border-l border-[#D9C9E8] text-[#28164F] transition-colors hover:text-[#6443A0] sm:gap-2">
                            <i class="fa-solid fa-pen text-[11px]"></i> Edit
                        </button>
                        <button type="button" aria-label="Hapus catatan ${escapeHTML(catatan.judul)}" onclick="bukaPopupHapus(${indexAsli})" class="flex items-center justify-center gap-1.5 border-l border-[#D9C9E8] text-[#E32636] transition-colors hover:text-red-700 sm:gap-2">
                            <i class="fa-regular fa-trash-can text-[12px]"></i> Hapus
                        </button>
                    </div>
                </article>
            `;
        });
    }

    let html = `
        <div class="relative w-full min-w-0">
            ${renderHeaderCatatan()}

            <section class="relative mb-5 flex min-h-[150px] items-center justify-between gap-4 overflow-hidden rounded-[18px] border border-white/70 bg-gradient-to-r from-[#EBCBF8] via-[#E9C8F5] to-[#DCCDF7] px-5 py-6 shadow-[0_5px_18px_rgba(105,64,148,0.06)] sm:px-7 md:px-10">
                <img src="aset/bunga-pojok.png" class="pointer-events-none absolute -left-1 -top-1 h-[90px] w-[86px] object-contain opacity-90" alt="">
                <img src="aset/bunga-pink.png" class="pointer-events-none absolute right-3 top-0 h-[54px] w-[78px] object-contain opacity-90" alt="">
                <img src="aset/bintang.png" class="pointer-events-none absolute left-[48%] top-3 h-7 w-7 object-contain opacity-80" alt="">
                <img src="aset/kilauan.png" class="pointer-events-none absolute bottom-4 left-[4%] h-8 w-8 object-contain opacity-80" alt="">
                <img src="aset/kilauan.png" class="pointer-events-none absolute right-[34%] top-1/2 h-7 w-7 -translate-y-1/2 object-contain opacity-70" alt="">

                <div class="relative z-10 ml-1 max-w-[720px] sm:ml-0">
                    <h3 class="mb-1 text-[25px] font-extrabold leading-tight tracking-[-0.025em] text-[#24104F] sm:text-[32px] md:text-[36px]">
                        Ruang untuk setiap ide.
                    </h3>
                    <p class="text-[14px] font-medium leading-relaxed text-[#49356F] sm:text-[17px] md:text-[20px]">
                        Simpan, temukan, dan pelajari kembali catatan kuliahmu.
                    </p>
                </div>

                <div class="relative z-10 hidden h-[130px] w-[230px] shrink-0 self-stretch sm:block md:w-[280px]">
                    <img src="aset/buku-5.png" class="absolute bottom-[-25px] right-0 h-[175px] w-full object-contain object-bottom" alt="Ilustrasi buku dan alat tulis">
                </div>
            </section>

            <!-- Pencarian, filter, dan tambah catatan -->
            <div class="mb-5 grid grid-cols-1 gap-3.5 xl:grid-cols-[minmax(0,1fr)_minmax(220px,290px)_auto]">
                <div class="relative min-w-0">
                    <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-[17px] text-[#291B51]"></i>
                    <input
                        id="input-cari-catatan"
                        type="search"
                        value="${escapeHTML(kataKunciCatatan)}"
                        oninput="ubahPencarianCatatan(this.value)"
                        aria-label="Cari catatan berdasarkan judul, isi, atau mata kuliah"
                        placeholder="Cari judul, isi, atau mata kuliah..."
                        class="h-[54px] w-full rounded-[13px] border border-[#DCCCF0] bg-white/65 pl-12 pr-5 text-[14px] font-medium text-[#33245B] shadow-[0_2px_8px_rgba(69,43,102,0.025)] outline-none transition-all placeholder:text-[#82749F] focus:border-[#A88BD5] focus:bg-white focus:ring-2 focus:ring-[#E9DDF8] sm:text-[15px]"
                    >
                </div>

                <div class="relative min-w-0">
                    <select
                        id="filter-matkul-catatan"
                        onchange="ubahFilterMatkulCatatan(this)"
                        aria-label="Filter berdasarkan mata kuliah"
                        class="h-[54px] w-full cursor-pointer appearance-none rounded-[13px] border border-[#DCCCF0] bg-white/65 px-5 pr-12 text-[14px] font-bold text-[#24104F] outline-none transition-all focus:border-[#A88BD5] focus:bg-white focus:ring-2 focus:ring-[#E9DDF8] sm:text-[15px]"
                    >
                        <option value="Semua Mata Kuliah" ${filterMatkulCatatan === "Semua Mata Kuliah" ? "selected" : ""}>Semua Mata Kuliah</option>
                        <option value="Desain Web" ${filterMatkulCatatan === "Desain Web" ? "selected" : ""}>Desain Web</option>
                        <option value="Psikologi Kognitif" ${filterMatkulCatatan === "Psikologi Kognitif" ? "selected" : ""}>Psikologi Kognitif</option>
                        <option value="Strategi Pemecahan Masalah" ${filterMatkulCatatan === "Strategi Pemecahan Masalah" ? "selected" : ""}>Strategi Pemecahan Masalah</option>
                    </select>
                    <i class="fa-solid fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs text-[#24104F]"></i>
                </div>

                <button type="button" onclick="bukaTambahCatatan()" class="inline-flex h-[54px] items-center justify-center gap-3 whitespace-nowrap rounded-[13px] bg-[#0864F7] px-6 text-[14px] font-bold text-white shadow-[0_5px_12px_rgba(8,100,247,0.18)] transition-all hover:-translate-y-0.5 hover:bg-[#0756D8] sm:text-[15px]">
                    <i class="fa-solid fa-plus text-[19px]"></i> Tambah Catatan
                </button>
            </div>

            <!-- Ringkasan dan pengurutan -->
            <div class="mb-3 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                <p class="text-[13px] font-medium text-[#33245B] sm:text-[15px]">
                    ${totalItems} catatan ditemukan <span class="text-[#8A7AA8]">dari ${daftarCatatan.length} catatan tersimpan</span>
                </p>

                <div class="relative shrink-0">
                    <select onchange="ubahUrutanCatatan(this)" aria-label="Urutkan catatan" class="h-[40px] cursor-pointer appearance-none rounded-[12px] border border-[#DCCCF0] bg-white/65 pl-4 pr-10 text-[13px] font-medium text-[#33245B] outline-none transition-colors focus:border-[#A88BD5] sm:text-[14px]">
                        <option value="terbaru" ${sortMode === "terbaru" ? "selected" : ""}>Terbaru</option>
                        <option value="terlama" ${sortMode === "terlama" ? "selected" : ""}>Terlama</option>
                        <option value="az" ${sortMode === "az" ? "selected" : ""}>A–Z (Judul)</option>
                        <option value="za" ${sortMode === "za" ? "selected" : ""}>Z–A (Judul)</option>
                    </select>
                    <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#33245B]"></i>
                </div>
            </div>

            <!-- Kartu catatan -->
            <div class="mb-5 grid grid-cols-1 gap-3.5 md:grid-cols-2 md:gap-4 2xl:grid-cols-3">
                ${kartuCatatanHTML}
            </div>

            ${renderPaginationCatatan(totalItems, totalPages, startItem, endItem)}
        </div>
    `;

    if (hapusIndexCatatan > -1 && daftarCatatan[hapusIndexCatatan]) {
        const catatanTarget = daftarCatatan[hapusIndexCatatan];
        html += `
            <div class="fixed inset-0 z-[100] flex items-center justify-center bg-[#21133D]/55 p-4 backdrop-blur-sm" role="presentation">
                <section role="dialog" aria-modal="true" aria-labelledby="hapus-catatan-title" class="relative w-full max-w-md overflow-hidden rounded-[24px] border border-white bg-gradient-to-br from-[#FFFAFF] to-[#F7EEFF] p-6 shadow-2xl sm:p-8">
                    <img src="aset/bunga-pink.png" class="pointer-events-none absolute -right-1 -top-1 w-20 opacity-70" alt="">
                    <button type="button" onclick="tutupPopupHapus()" aria-label="Tutup dialog" class="absolute right-4 top-4 z-10 text-[#8D7BA8] transition-colors hover:text-[#49356F]"><i class="fa-solid fa-xmark text-xl"></i></button>
                    <div class="relative z-10 mb-5 flex justify-center">
                        <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#FDE8EF] text-2xl text-[#E32655]"><i class="fa-regular fa-trash-can"></i></div>
                    </div>
                    <div class="relative z-10 mb-6 text-center">
                        <h3 id="hapus-catatan-title" class="mb-2 text-2xl font-extrabold text-[#2A1854]">Hapus catatan ini?</h3>
                        <p class="mb-4 text-[#74658F]">Kamu akan menghapus catatan:</p>
                        <div class="mb-4 rounded-xl border border-[#DED1F5] bg-[#F0EAFE] p-4">
                            <h4 class="mb-1 break-words text-lg font-extrabold text-[#2A1854]">${escapeHTML(catatanTarget.judul)}</h4>
                            <p class="text-sm font-medium text-[#74658F]">${escapeHTML(catatanTarget.matkul)}</p>
                        </div>
                        <p class="text-sm font-medium text-[#88799F]">Catatan yang dihapus tidak dapat dikembalikan.</p>
                    </div>
                    <div class="relative z-10 flex flex-col-reverse gap-3 sm:flex-row">
                        <button type="button" onclick="tutupPopupHapus()" class="min-h-11 flex-1 rounded-xl border border-[#BDA9DE] px-4 py-3 font-bold text-[#49356F] transition-colors hover:bg-[#F0EAFE]">Batal</button>
                        <button type="button" onclick="aksiKonfirmasiHapus()" class="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#E32655] px-4 py-3 font-bold text-white shadow-md shadow-red-200/50 transition-colors hover:bg-[#C91C47]"><i class="fa-regular fa-trash-can"></i> Hapus Catatan</button>
                    </div>
                </section>
            </div>
        `;
    }

    return html;
}


// ============================================================
// 8. RENDER HALAMAN LIHAT CATATAN
// ============================================================

function renderLihatCatatan() {
    if (lihatIndexCatatan < 0 || !daftarCatatan[lihatIndexCatatan]) {
        return renderCatatan();
    }

    const data = daftarCatatan[lihatIndexCatatan];
    const style = colorStyles[data.warna] || colorStyles.blue;

    return `
        <div class="relative">
            ${renderHeaderCatatan()}

            <button
                onclick="navigate('catatan')"
                class="flex items-center gap-3 text-[#0864F7] font-semibold mb-6 hover:text-blue-800 transition-colors text-[15px]"
            >
                <i class="fa-solid fa-arrow-left text-lg"></i>
                Kembali ke Catatan
            </button>

            <article class="bg-gradient-to-br from-[#F8EFFF] via-[#F9F0FF] to-[#FCEAF6] rounded-[17px] p-6 md:p-8 border border-white/90 shadow-[0_7px_24px_rgba(92,57,133,0.06)] min-h-[65vh] relative overflow-hidden">
                <img src="aset/bunga-pojok.png" class="absolute top-0 right-0 w-28 opacity-35 object-contain pointer-events-none" alt="">
                <img src="aset/ranting-bunga.png" class="absolute bottom-0 left-0 w-32 opacity-35 object-contain pointer-events-none" alt="">
                <img src="aset/kilauan.png" class="absolute top-7 left-[48%] w-7 opacity-70 object-contain pointer-events-none" alt="">

                <div class="border-b border-[#DCCDEB] pb-6 mb-7 relative z-10">
                    <div class="flex flex-wrap justify-between items-center gap-3 mb-4">
                        <span class="inline-flex items-center gap-2 px-3 py-1.5 ${style.badgeBg} ${style.badgeText} rounded-full text-[13px] font-bold">
                            <i class="fa-solid fa-book-open"></i>
                            ${escapeHTML(data.matkul)}
                        </span>

                        <button
                            onclick="bukaEditCatatan(${lihatIndexCatatan})"
                            class="bg-[#E9DDFC] hover:bg-[#DDCBF7] text-[#422477] px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors text-[14px]"
                        >
                            <i class="fa-solid fa-pen text-xs"></i>
                            Edit Catatan
                        </button>
                    </div>

                    <h1 class="text-[29px] md:text-[36px] font-extrabold text-[#24104F] mb-3 leading-tight">
                        ${escapeHTML(data.judul)}
                    </h1>

                    <p class="text-[14px] text-[#786A96] font-medium flex items-center gap-2">
                        <i class="fa-regular fa-clock"></i>
                        Ditulis pada: ${escapeHTML(data.tanggal)}
                    </p>
                </div>

                <div class="text-[#352657] text-[15px] md:text-[16px] leading-[1.9] whitespace-pre-wrap font-medium relative z-10">
                    ${escapeHTML(data.isi)}
                </div>

                <img src="aset/buku-2.png" class="absolute bottom-5 right-5 w-24 opacity-20 object-contain pointer-events-none" alt="">
            </article>
        </div>
    `;
}


// ============================================================
// 9. RENDER HALAMAN TAMBAH & EDIT CATATAN
// ============================================================

function renderTambahCatatan() {
    let judulVal = "";
    let matkulVal = "";
    let isiVal = "";

    let judulHalaman = "Tambah Catatan";
    let deskripsiHalaman = "Tuliskan ide dan materi kuliahmu di sini.";
    let teksTombolSimpan = "Simpan Catatan";
    let teksBawahKiri = "Catatan tersimpan setelah kamu menekan Simpan.";
    let tanggalPembaruan = "";

    if (editIndexCatatan >= 0 && daftarCatatan[editIndexCatatan]) {
        judulHalaman = "Edit Catatan";
        deskripsiHalaman = "Perbarui catatanmu agar tetap lengkap dan mudah dipahami.";
        teksTombolSimpan = "Simpan Perubahan";
        teksBawahKiri = "Perubahan tersimpan setelah kamu menekan Simpan.";

        judulVal = daftarCatatan[editIndexCatatan].judul;
        matkulVal = daftarCatatan[editIndexCatatan].matkul_val;
        isiVal = daftarCatatan[editIndexCatatan].isi;
        tanggalPembaruan = daftarCatatan[editIndexCatatan].tanggal;
    }

    return `
        <div class="relative pb-2">
            ${renderHeaderCatatan()}

            <img src="aset/bunga-pojok.png" class="absolute top-[62px] left-[-12px] w-[76px] h-[72px] object-contain opacity-65 pointer-events-none" alt="">
            <img src="aset/ranting-sudut.png" class="absolute top-[58px] right-[-8px] w-[92px] h-[84px] object-contain opacity-65 pointer-events-none" alt="">

            <button
                onclick="editIndexCatatan = -1; navigate('catatan')"
                class="relative z-10 flex items-center gap-3 text-[#0864F7] font-semibold mb-6 hover:text-blue-800 transition-colors text-[15px]"
            >
                <i class="fa-solid fa-arrow-left text-lg"></i>
                Kembali ke Catatan
            </button>

            <section class="bg-gradient-to-br from-[#F8EEFF] via-[#F9F0FF] to-[#FCEAF7] rounded-[17px] border border-white/90 shadow-[0_7px_24px_rgba(92,57,133,0.055)] px-5 md:px-6 pt-5 md:pt-6 pb-5 relative overflow-hidden min-h-[min(760px,calc(100vh-190px))]">
                <img src="aset/bunga-pojok.png" class="absolute top-0 left-0 w-[88px] h-[78px] object-contain opacity-60 pointer-events-none" alt="">
                <img src="aset/ranting-sudut.png" class="absolute top-0 right-[25%] w-[82px] h-[70px] object-contain opacity-55 pointer-events-none" alt="">
                <img src="aset/kilauan.png" class="absolute top-5 right-[31%] w-7 h-7 object-contain opacity-70 pointer-events-none" alt="">
                <img src="aset/bunga-tangkai.png" class="absolute bottom-0 right-0 w-[78px] h-[110px] object-contain opacity-30 pointer-events-none" alt="">

                <div class="relative z-10 flex items-center justify-between gap-5 pb-5 md:pb-6 border-b border-[#DCCDEB]/90">
                    <div class="flex items-center gap-4 md:gap-5 min-w-0">
                        <div class="w-[78px] h-[70px] md:w-[100px] md:h-[72px] rounded-[19px] bg-[#EADDFC] flex items-center justify-center relative shrink-0">
                            <img src="aset/buku-6.png" class="w-[65px] h-[58px] object-contain" alt="Ilustrasi buku terbuka">
                            <span class="absolute right-[13px] bottom-[12px] w-7 h-7 rounded-full bg-[#EADDFC] flex items-center justify-center text-[#31146B]">
                                <i class="fa-solid fa-pen text-[18px]"></i>
                            </span>
                        </div>

                        <div class="min-w-0">
                            <h3 class="text-[27px] md:text-[38px] leading-tight font-extrabold tracking-[-0.03em] text-[#24104F] mb-1">
                                ${judulHalaman}
                            </h3>
                            <p class="text-[#786A96] text-[14px] md:text-[18px] font-medium leading-snug">
                                ${deskripsiHalaman}
                            </p>
                        </div>
                    </div>

                    <div class="relative z-10 hidden md:block w-[225px] lg:w-[270px] h-[108px] shrink-0 mr-1">
                        <img src="aset/buku-5.png" class="absolute right-0 bottom-[-14px] w-full h-[132px] object-contain object-bottom" alt="Ilustrasi buku, bunga, dan alat tulis">
                    </div>
                </div>

                <div class="relative z-10 flex flex-col pt-6">
                    <div class="grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-5 md:gap-6 mb-6">
                        <div>
                            <label for="input-judul-catatan" class="block text-[15px] md:text-[16px] font-bold text-[#24104F] mb-2.5">
                                Judul Catatan <span class="text-red-500">*</span>
                            </label>
                            <input
                                id="input-judul-catatan"
                                type="text"
                                required
                                maxlength="120"
                                value="${escapeHTML(judulVal)}"
                                placeholder="Masukkan judul catatan"
                                class="w-full h-[53px] px-5 rounded-[12px] border border-[#D8C8EF] focus:outline-none focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 bg-white/35 text-[15px] md:text-[16px] text-[#28194F] placeholder:text-[#877AA4] transition-all font-medium"
                            >
                        </div>

                        <div>
                            <label for="input-matkul-catatan" class="block text-[15px] md:text-[16px] font-bold text-[#24104F] mb-2.5">
                                Mata Kuliah <span class="text-red-500">*</span>
                            </label>
                            <div class="relative">
                                <select
                                    id="input-matkul-catatan"
                                    required
                                    class="appearance-none w-full h-[53px] px-5 pr-12 rounded-[12px] border border-[#D8C8EF] bg-white/35 focus:outline-none focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 text-[#28194F] text-[15px] md:text-[16px] cursor-pointer transition-all font-medium"
                                >
                                    <option value="" disabled ${matkulVal === "" ? "selected" : ""}>Pilih mata kuliah</option>
                                    <option value="1" ${matkulVal === "1" ? "selected" : ""}>Desain Web</option>
                                    <option value="2" ${matkulVal === "2" ? "selected" : ""}>Psikologi Kognitif</option>
                                    <option value="3" ${matkulVal === "3" ? "selected" : ""}>Strategi Pemecahan Masalah</option>
                                </select>
                                <i class="fa-solid fa-chevron-down absolute right-5 top-1/2 -translate-y-1/2 text-[#24104F] text-sm pointer-events-none"></i>
                            </div>
                        </div>
                    </div>

                    <div class="flex flex-col mb-4">
                        <label for="input-isi-catatan" class="block text-[15px] md:text-[16px] font-bold text-[#24104F] mb-2.5">
                            Isi Catatan <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            id="input-isi-catatan"
                            required
                            placeholder="Mulai tulis catatanmu di sini..."
                            class="w-full h-[285px] md:h-[304px] px-5 py-4 rounded-[12px] border border-[#D8C8EF] focus:outline-none focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 bg-white/30 text-[15px] md:text-[16px] text-[#28194F] placeholder:text-[#877AA4] resize-y transition-all font-medium leading-[1.55]"
                        >${escapeHTML(isiVal)}</textarea>
                    </div>

                    <div class="flex justify-between items-center gap-4 mb-5">
                        <p class="text-[13px] md:text-[14px] text-[#796B98] font-medium">* Wajib diisi</p>
                        ${tanggalPembaruan ? `<p class="text-[13px] md:text-[14px] text-[#796B98] font-medium">Terakhir diperbarui: ${escapeHTML(tanggalPembaruan)}</p>` : ""}
                    </div>

                    <div class="flex flex-col md:flex-row justify-between items-center pt-5 border-t border-[#DCCDEB]/90 gap-4 mt-auto">
                        <p class="text-[13px] md:text-[14px] text-[#786A96] font-medium">${teksBawahKiri}</p>

                        <div class="flex gap-3 md:gap-4 w-full md:w-auto">
                            <button
                                onclick="editIndexCatatan = -1; navigate('catatan')"
                                class="flex-1 md:flex-none min-w-[116px] px-7 py-3 rounded-[12px] border-[1.5px] border-[#0864F7] text-[#0864F7] font-semibold hover:bg-blue-50/70 transition-colors text-[14px] md:text-[15px]"
                            >
                                Batal
                            </button>

                            <button
                                onclick="aksiSimpanCatatan()"
                                class="flex-1 md:flex-none px-7 py-3 rounded-[12px] bg-[#0864F7] hover:bg-[#0756D8] text-white font-semibold flex items-center justify-center gap-3 transition-colors shadow-[0_5px_12px_rgba(8,100,247,0.18)] text-[14px] md:text-[15px] whitespace-nowrap"
                            >
                                <i class="fa-solid fa-check text-[17px]"></i>
                                ${teksTombolSimpan}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div class="relative flex justify-between items-center pt-5">
                <p class="text-[#65468F] text-[14px] font-medium">Sedikit demi sedikit, jadi berarti.</p>
                <img src="aset/ranting-bunga.png" class="absolute right-0 -bottom-3 w-[105px] h-[58px] object-contain object-right-bottom opacity-80 pointer-events-none" alt="">
            </div>
        </div>
    `;
}

// ============================================================
// AKHIR CATATAN.JS
// ============================================================