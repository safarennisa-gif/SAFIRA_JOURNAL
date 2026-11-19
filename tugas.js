
// ============================================================
// SAFIRA ACADEMIC JOURNAL — MODUL TUGAS
// Revisi UI: Daftar Tugas, Tambah Tugas, dan Edit Tugas
// Struktur aset tetap menggunakan folder: aset/
// ============================================================


// ============================================================
// 1. KONFIGURASI ASET DAN DATA
// ============================================================

const TUGAS_ASSETS = {
    avatar: "aset/avatar.png",
    banner: "aset/buku-5.png",
    formIllustration: "aset/buku-5.png",
    formIcon: "aset/buku-6.png",
    flowerCorner: "aset/bunga-pojok.png",
    flowerPink: "aset/bunga-pink.png",
    flowerStem: "aset/bunga-tangkai.png",
    branch: "aset/ranting-bunga.png",
    branchCorner: "aset/ranting-sudut.png",
    sparkle: "aset/kilauan.png"
};

// Tanggal acuan mengikuti tanggal pada desain referensi.
// Ubah nilai ini jika ingin menggunakan tanggal operasional aktual.
const TUGAS_TANGGAL_ACUAN = "2026-10-13";
const TUGAS_PER_HALAMAN = 5;

let daftarTugas = [
    {
        judul: "Rancangan Website",
        matkul: "Desain Web",
        matkul_val: "1",
        deadline: "2026-10-14",
        jam: "23:59",
        status: "Dikerjakan",
        deskripsi: "Membuat wireframe dan mockup visual website jurnal akademik."
    },
    {
        judul: "Ringkasan Memori",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        deadline: "2026-10-15",
        jam: "23:59",
        status: "Belum Mulai",
        deskripsi: "Membuat ringkasan bab 4 tentang proses memori jangka pendek dan panjang."
    },
    {
        judul: "Analisis Kasus",
        matkul: "Strategi Pemecahan Masalah",
        matkul_val: "3",
        deadline: "2026-10-16",
        jam: "23:59",
        status: "Belum Mulai",
        deskripsi: "Menganalisis studi kasus 2 dan menentukan langkah pemecahan masalah."
    },
    {
        judul: "Latihan Layout CSS",
        matkul: "Desain Web",
        matkul_val: "1",
        deadline: "2026-10-20",
        jam: "23:59",
        status: "Dikerjakan",
        deskripsi: "Mengerjakan latihan Grid dan Flexbox pada modul 3."
    },
    {
        judul: "Rangkuman Persepsi",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        deadline: "2026-10-12",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Menyusun rangkuman materi persepsi visual."
    },
    {
        judul: "Latihan Form HTML",
        matkul: "Desain Web",
        matkul_val: "1",
        deadline: "2026-10-21",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Membuat formulir pendaftaran sederhana menggunakan elemen HTML."
    },
    {
        judul: "Review Materi Atensi",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        deadline: "2026-10-22",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Mempelajari kembali materi atensi dan faktor yang memengaruhinya."
    },
    {
        judul: "Studi Kasus Kelompok",
        matkul: "Strategi Pemecahan Masalah",
        matkul_val: "3",
        deadline: "2026-10-23",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Menyelesaikan analisis studi kasus bersama kelompok."
    },
    {
        judul: "Praktik CSS Responsive",
        matkul: "Desain Web",
        matkul_val: "1",
        deadline: "2026-10-24",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Menerapkan media query agar halaman dapat menyesuaikan ukuran layar."
    },
    {
        judul: "Kuis Proses Kognitif",
        matkul: "Psikologi Kognitif",
        matkul_val: "2",
        deadline: "2026-10-25",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Mengerjakan kuis evaluasi proses kognitif."
    },
    {
        judul: "Rencana Pemecahan Masalah",
        matkul: "Strategi Pemecahan Masalah",
        matkul_val: "3",
        deadline: "2026-10-26",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Menyusun tahapan penyelesaian masalah secara sistematis."
    },
    {
        judul: "Proyek Mini Website",
        matkul: "Desain Web",
        matkul_val: "1",
        deadline: "2026-10-27",
        jam: "23:59",
        status: "Selesai",
        deskripsi: "Menyelesaikan proyek mini website sesuai instruksi perkuliahan."
    }
];

// State halaman dan form.
let editIndexTugas = -1;
let hapusIndexTugas = -1;
let filterStatusMode = "Semua Status";
let filterMatkulMode = "Semua Mata Kuliah";
let sortDeadlineMode = "terdekat";
let kataKunciTugas = "";
let halamanTugas = 1;


// ============================================================
// 2. HELPER
// ============================================================

function escapeHTMLTugas(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

function parseTanggalLokalTugas(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return null;

    const bagian = dateStr.split("-").map(Number);
    if (bagian.length !== 3 || bagian.some(Number.isNaN)) return null;

    const [tahun, bulan, tanggal] = bagian;
    return new Date(tahun, bulan - 1, tanggal);
}

function formatTanggalIndoTugas(dateStr) {
    if (!dateStr) return "-";

    const date = parseTanggalLokalTugas(dateStr);
    if (!date || Number.isNaN(date.getTime())) return dateStr;

    return date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

function formatTanggalHeaderTugas() {
    const date = parseTanggalLokalTugas(TUGAS_TANGGAL_ACUAN);
    if (!date) return "";

    return date.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

function formatTanggalPembaruanTugas() {
    return formatTanggalIndoTugas(TUGAS_TANGGAL_ACUAN);
}

function getMataKuliahTugas(value) {
    const daftar = {
        "1": "Desain Web",
        "2": "Psikologi Kognitif",
        "3": "Strategi Pemecahan Masalah"
    };

    return daftar[String(value)] || "Mata Kuliah";
}

function getDeadlineInfoTugas(dateStr, status) {
    if (!dateStr) {
        return {
            label: "",
            badge: "",
            dateClass: "text-[#554477]",
            barClass: "bg-[#CBBBE8]",
            rowClass: "bg-white/70",
            iconBoxClass: "bg-[#F0EAFE] text-[#5B3A91]"
        };
    }

    const target = parseTanggalLokalTugas(dateStr);
    const today = parseTanggalLokalTugas(TUGAS_TANGGAL_ACUAN);

    if (!target || !today) {
        return {
            label: "",
            badge: "",
            dateClass: "text-[#554477]",
            barClass: "bg-[#CBBBE8]",
            rowClass: "bg-white/70",
            iconBoxClass: "bg-[#F0EAFE] text-[#5B3A91]"
        };
    }

    const diffDays = Math.round((target.getTime() - today.getTime()) / 86400000);

    if (status === "Selesai") {
        return {
            label: "Selesai",
            badge: "",
            dateClass: "text-[#176B2B]",
            barClass: "bg-[#27C34A]",
            rowClass: "bg-[#EAF8EC]",
            iconBoxClass: "bg-[#D7F3DC] text-[#168334]"
        };
    }

    if (diffDays < 0) {
        return {
            label: "Terlewati",
            badge: `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#991B1B] px-3 py-1.5 text-[12px] font-bold text-white"><i class="fa-solid fa-triangle-exclamation"></i> Terlewati</span>`,
            dateClass: "text-[#991B1B]",
            barClass: "bg-[#991B1B]",
            rowClass: "bg-[#FFF0F0]",
            iconBoxClass: "bg-[#FDE0E0] text-[#B91C1C]"
        };
    }

    if (diffDays === 0) {
        return {
            label: "Hari ini",
            badge: `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#E92335] px-3 py-1.5 text-[12px] font-bold text-white"><i class="fa-regular fa-clock"></i> Hari ini</span>`,
            dateClass: "text-[#E92335]",
            barClass: "bg-[#E92335]",
            rowClass: "bg-[#FFF0F1]",
            iconBoxClass: "bg-[#FFE0E3] text-[#E92335]"
        };
    }

    if (diffDays === 1) {
        return {
            label: "Besok",
            badge: `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#EF3038] px-3 py-1.5 text-[12px] font-bold text-white"><i class="fa-regular fa-clock"></i> Besok</span>`,
            dateClass: "text-[#D92332]",
            barClass: "bg-[#EF3038]",
            rowClass: "bg-[#FFF0F1]",
            iconBoxClass: "bg-[#FFE0E3] text-[#E92335]"
        };
    }

    if (diffDays >= 2 && diffDays <= 3) {
        return {
            label: `${diffDays} hari lagi`,
            badge: `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F07816] px-3 py-1.5 text-[12px] font-bold text-white"><i class="fa-regular fa-clock"></i> ${diffDays} hari lagi</span>`,
            dateClass: "text-[#E45B13]",
            barClass: "bg-[#F07816]",
            rowClass: "bg-[#FFF4E9]",
            iconBoxClass: "bg-[#FFE7D2] text-[#E66B19]"
        };
    }

    if (diffDays >= 4 && diffDays <= 7) {
        return {
            label: `${diffDays} hari lagi`,
            badge: `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#F5C542] px-3 py-1.5 text-[12px] font-bold text-[#674B00]"><i class="fa-regular fa-clock"></i> ${diffDays} hari lagi</span>`,
            dateClass: "text-[#8A6500]",
            barClass: "bg-[#F5C542]",
            rowClass: "bg-[#FFFAE9]",
            iconBoxClass: "bg-[#FFF1C2] text-[#A77A00]"
        };
    }

    return {
        label: `${diffDays} hari lagi`,
        badge: `<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[#F2E3A8] bg-[#FFF8D9] px-3 py-1.5 text-[12px] font-bold text-[#846400]"><i class="fa-regular fa-clock"></i> ${diffDays} hari lagi</span>`,
        dateClass: "text-[#66578A]",
        barClass: "bg-[#E7D99C]",
        rowClass: "bg-white/75",
        iconBoxClass: "bg-[#F0EAFE] text-[#5B3A91]"
    };
}

function getStatusStyleTugas(status) {
    if (status === "Dikerjakan") {
        return {
            wrapper: "bg-[#E3EBFF] text-[#0759E8] border-[#D1DFFF]",
            icon: `<i class="fa-regular fa-clock"></i>`
        };
    }

    if (status === "Selesai") {
        return {
            wrapper: "bg-[#DDF5E1] text-[#147A2E] border-[#C8EBCF]",
            icon: `<i class="fa-regular fa-circle-check"></i>`
        };
    }

    return {
        wrapper: "bg-[#EEE8FC] text-[#39245F] border-[#E0D5F5]",
        icon: `<i class="fa-regular fa-circle"></i>`
    };
}

function getDataTugasTerfilter() {
    let data = [...daftarTugas];

    if (kataKunciTugas.trim()) {
        const keyword = kataKunciTugas.trim().toLowerCase();
        data = data.filter(item =>
            String(item.judul || "").toLowerCase().includes(keyword) ||
            String(item.matkul || "").toLowerCase().includes(keyword) ||
            String(item.deskripsi || "").toLowerCase().includes(keyword)
        );
    }

    if (filterMatkulMode !== "Semua Mata Kuliah") {
        data = data.filter(item => item.matkul === filterMatkulMode);
    }

    if (filterStatusMode !== "Semua Status") {
        data = data.filter(item => item.status === filterStatusMode);
    }

    data.sort((a, b) => {
        const dateA = new Date(`${a.deadline || "9999-12-31"}T${a.jam || "23:59"}`);
        const dateB = new Date(`${b.deadline || "9999-12-31"}T${b.jam || "23:59"}`);
        return sortDeadlineMode === "terdekat" ? dateA - dateB : dateB - dateA;
    });

    return data;
}


// ============================================================
// 3. HEADER DAN DROPDOWN PROFIL
// ============================================================

function renderHeaderTugas() {
    return `
        <header class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-[32px] font-extrabold leading-tight tracking-[-0.03em] text-[#24104F] md:text-[40px]">
                Tugas
            </h2>

            <div class="relative flex items-center gap-4 md:gap-6">
                <span class="whitespace-nowrap text-[14px] font-medium text-[#24104F] md:text-[16px]">
                    ${escapeHTMLTugas(formatTanggalHeaderTugas())}
                </span>

                <span class="hidden h-8 w-px bg-[#CDBBEA] sm:block"></span>

                <button type="button" onclick="toggleProfileDropdownTugas()" class="relative z-[52] flex items-center gap-3 rounded-full p-1 transition-colors hover:bg-white/30">
                    <img src="${TUGAS_ASSETS.avatar}" alt="Foto profil Safira" class="h-10 w-10 rounded-full border-2 border-[#D9C3F5] object-cover shadow-sm">
                    <span class="font-bold text-[#24104F]">
                        Safira
                        <i id="profile-dropdown-tugas-icon" class="fa-solid fa-chevron-down ml-1 text-xs text-[#5D4A86] transition-transform"></i>
                    </span>
                </button>

                <div id="profile-dropdown-tugas-overlay" onclick="closeProfileDropdownTugas()" class="fixed inset-0 z-50 hidden"></div>

                <div id="profile-dropdown-tugas" class="absolute right-0 top-14 z-[53] hidden w-72 origin-top-right overflow-hidden rounded-3xl border border-[#E9DDF7] bg-[#FFFCFF] shadow-xl transition-all md:w-80">
                    <div class="flex items-center gap-4 border-b border-[#F0E7F8] p-6">
                        <img src="${TUGAS_ASSETS.avatar}" alt="Foto profil Safira" class="h-14 w-14 rounded-full border-2 border-[#E5D4F7] object-cover shadow-sm">
                        <div>
                            <h4 class="text-lg font-bold text-[#2A1854]">Safira</h4>
                            <p class="text-xs font-medium text-[#74658F]">Mahasiswa &bull; Semester 3</p>
                            <p class="mt-1 text-[11px] text-[#9587AD]">safira@example.com</p>
                        </div>
                    </div>
                    <div class="p-3">
                        <button onclick="closeProfileDropdownTugas(); navigate('profil')" class="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-[#49376D] transition-colors hover:bg-[#F5EEFC]">
                            <span class="flex items-center gap-3"><i class="fa-regular fa-user text-lg"></i><span>Lihat Profil</span></span>
                            <i class="fa-solid fa-chevron-right text-xs text-[#9A8AB4]"></i>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    `;
}

window.toggleProfileDropdownTugas = function () {
    const dropdown = document.getElementById("profile-dropdown-tugas");
    const overlay = document.getElementById("profile-dropdown-tugas-overlay");
    const icon = document.getElementById("profile-dropdown-tugas-icon");
    if (!dropdown) return;

    const shouldOpen = dropdown.classList.contains("hidden");
    dropdown.classList.toggle("hidden", !shouldOpen);
    if (overlay) overlay.classList.toggle("hidden", !shouldOpen);
    if (icon) {
        icon.classList.toggle("fa-chevron-down", !shouldOpen);
        icon.classList.toggle("fa-chevron-up", shouldOpen);
    }
};

window.closeProfileDropdownTugas = function () {
    const dropdown = document.getElementById("profile-dropdown-tugas");
    const overlay = document.getElementById("profile-dropdown-tugas-overlay");
    const icon = document.getElementById("profile-dropdown-tugas-icon");
    if (dropdown) dropdown.classList.add("hidden");
    if (overlay) overlay.classList.add("hidden");
    if (icon) {
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
    }
};


// ============================================================
// 4. CONTROLLER FILTER, SORT, PAGINATION, DAN NAVIGASI
// ============================================================

window.ubahPencarianTugas = function (value) {
    const inputLama = document.getElementById("input-cari-tugas");
    const posisiKursor = inputLama ? inputLama.selectionStart : String(value).length;

    kataKunciTugas = value;
    halamanTugas = 1;
    navigate("tugas");

    const inputBaru = document.getElementById("input-cari-tugas");
    if (inputBaru) {
        inputBaru.focus();
        const posisi = Math.min(posisiKursor ?? inputBaru.value.length, inputBaru.value.length);
        inputBaru.setSelectionRange(posisi, posisi);
    }
};

window.ubahFilterMatkulTugas = function (selectElement) {
    filterMatkulMode = selectElement.value;
    halamanTugas = 1;
    navigate("tugas");
};

window.ubahFilterStatus = function (selectElement) {
    filterStatusMode = selectElement.value;
    halamanTugas = 1;
    navigate("tugas");
};

window.ubahSortDeadline = function (selectElement) {
    sortDeadlineMode = selectElement.value;
    halamanTugas = 1;
    navigate("tugas");
};

window.ubahHalamanTugas = function (page) {
    const data = getDataTugasTerfilter();
    const totalHalaman = Math.max(1, Math.ceil(data.length / TUGAS_PER_HALAMAN));
    halamanTugas = Math.min(Math.max(1, Number(page) || 1), totalHalaman);
    navigate("tugas");
};

window.bukaTambahTugas = function () {
    editIndexTugas = -1;
    navigate("tambahTugas");
};

window.bukaEditTugas = function (index) {
    if (!daftarTugas[index]) return;
    editIndexTugas = index;
    navigate("tambahTugas");
};

window.batalFormTugas = function () {
    editIndexTugas = -1;
    navigate("tugas");
};


// ============================================================
// 5. CONTROLLER STATUS DAN HAPUS
// ============================================================

window.gantiStatusTugas = function (index, newStatus) {
    const statusValid = ["Belum Mulai", "Dikerjakan", "Selesai"];
    if (!daftarTugas[index] || !statusValid.includes(newStatus)) return;

    daftarTugas[index].status = newStatus;
    daftarTugas[index].updatedAt = formatTanggalPembaruanTugas();
    navigate("tugas");
};

window.bukaPopupHapusTugas = function (index) {
    if (!daftarTugas[index]) return;
    hapusIndexTugas = index;
    navigate("tugas");
};

window.tutupPopupHapusTugas = function () {
    hapusIndexTugas = -1;
    navigate("tugas");
};

window.aksiKonfirmasiHapusTugas = function () {
    if (hapusIndexTugas < 0 || hapusIndexTugas >= daftarTugas.length) return;

    daftarTugas.splice(hapusIndexTugas, 1);
    hapusIndexTugas = -1;

    const jumlahData = getDataTugasTerfilter().length;
    const totalHalaman = Math.max(1, Math.ceil(jumlahData / TUGAS_PER_HALAMAN));
    halamanTugas = Math.min(halamanTugas, totalHalaman);

    navigate("tugas");
};


// ============================================================
// 6. SIMPAN TUGAS BARU ATAU PERUBAHAN
// ============================================================

window.aksiSimpanTugas = function () {
    const inputJudul = document.getElementById("input-judul-tugas");
    const matkulSelect = document.getElementById("input-matkul-tugas");
    const inputDeadline = document.getElementById("input-tgl-tugas");
    const inputJam = document.getElementById("input-jam-tugas");
    const inputStatus = document.getElementById("input-status-tugas");
    const inputDeskripsi = document.getElementById("input-deskripsi-tugas");

    if (!inputJudul || !matkulSelect || !inputDeadline || !inputStatus || !inputDeskripsi) return;

    const judul = inputJudul.value.trim();
    const matkul_val = matkulSelect.value;
    const matkul = matkulSelect.options[matkulSelect.selectedIndex]?.text || "";
    const deadline = inputDeadline.value;
    const jam = inputJam?.value || "23:59";
    const status = inputStatus.value;
    const deskripsi = inputDeskripsi.value.trim();

    if (!judul || !matkul_val || !deadline || !status) {
        alert("Mohon lengkapi semua kolom wajib yang bertanda (*).");
        return;
    }

    const statusValid = ["Belum Mulai", "Dikerjakan", "Selesai"];
    if (!statusValid.includes(status)) {
        alert("Status tugas tidak valid.");
        return;
    }

    const dataBaru = {
        judul,
        matkul,
        matkul_val,
        deadline,
        jam,
        status,
        deskripsi,
        updatedAt: formatTanggalPembaruanTugas()
    };

    if (editIndexTugas === -1) {
        daftarTugas.unshift(dataBaru);
    } else if (daftarTugas[editIndexTugas]) {
        const dataLama = daftarTugas[editIndexTugas];
        daftarTugas[editIndexTugas] = {
            ...dataLama,
            ...dataBaru
        };
    }

    editIndexTugas = -1;
    halamanTugas = 1;
    kataKunciTugas = "";
    filterMatkulMode = "Semua Mata Kuliah";
    filterStatusMode = "Semua Status";
    navigate("tugas");
};


// ============================================================
// 7. RENDER BARIS TABEL TUGAS
// ============================================================

function renderBarisTugas(item) {
    const indexAsli = daftarTugas.indexOf(item);
    const deadlineInfo = getDeadlineInfoTugas(item.deadline, item.status);
    const statusStyle = getStatusStyleTugas(item.status);
    const isSelesai = item.status === "Selesai";

    return `
        <div class="relative grid min-w-[1050px] grid-cols-[minmax(270px,1.55fr)_minmax(180px,1.05fr)_minmax(220px,1.2fr)_minmax(180px,1fr)_100px] items-center gap-3 overflow-hidden rounded-[15px] border border-white/80 px-4 py-3 ${deadlineInfo.rowClass} transition-colors hover:brightness-[0.99]">
            <span class="absolute bottom-2.5 left-0 top-2.5 w-[6px] rounded-r-full ${isSelesai ? "bg-[#27C34A]" : deadlineInfo.barClass}"></span>

            <div class="flex min-w-0 items-center gap-3 pl-2">
                <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${deadlineInfo.iconBoxClass}">
                    <i class="fa-regular fa-file-lines text-[19px]"></i>
                </div>
                <span class="truncate text-[15px] font-extrabold text-[#24104F]">
                    ${escapeHTMLTugas(item.judul)}
                </span>
            </div>

            <div class="min-w-0 border-l border-[#DCCDEB]/70 pl-4 text-[14px] font-medium text-[#39285F]">
                <span class="line-clamp-2">${escapeHTMLTugas(item.matkul)}</span>
            </div>

            <div class="flex min-w-0 items-center gap-2 border-l border-[#DCCDEB]/70 pl-4">
                <span class="whitespace-nowrap text-[14px] font-semibold ${deadlineInfo.dateClass}">
                    ${escapeHTMLTugas(formatTanggalIndoTugas(item.deadline))}
                </span>
                ${!isSelesai ? deadlineInfo.badge : ""}
            </div>

            <div class="border-l border-[#DCCDEB]/70 pl-4">
                <div class="relative w-full max-w-[185px]">
                    <select onchange="gantiStatusTugas(${indexAsli}, this.value)" aria-label="Ubah status ${escapeHTMLTugas(item.judul)}" class="w-full appearance-none rounded-[10px] border px-3 py-2.5 pr-9 text-[13px] font-semibold outline-none transition-colors ${statusStyle.wrapper}">
                        <option value="Belum Mulai" ${item.status === "Belum Mulai" ? "selected" : ""}>Belum Mulai</option>
                        <option value="Dikerjakan" ${item.status === "Dikerjakan" ? "selected" : ""}>Dikerjakan</option>
                        <option value="Selesai" ${item.status === "Selesai" ? "selected" : ""}>Selesai</option>
                    </select>
                    <i class="fa-solid fa-chevron-down pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] opacity-70"></i>
                </div>
            </div>

            <div class="flex items-center justify-center gap-4 border-l border-[#DCCDEB]/70 pl-3">
                <button type="button" onclick="bukaEditTugas(${indexAsli})" title="Edit tugas" aria-label="Edit tugas" class="text-[21px] text-[#0864F7] transition-colors hover:text-[#064BB5]">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" onclick="bukaPopupHapusTugas(${indexAsli})" title="Hapus tugas" aria-label="Hapus tugas" class="text-[21px] text-[#E32636] transition-colors hover:text-[#B91C2C]">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
    `;
}


// ============================================================
// 8. RENDER PAGINATION
// ============================================================

function renderPaginationTugas(totalData, totalHalaman, mulai, selesai) {
    const pages = [];
    const maxButtons = 3;
    let start = Math.max(1, halamanTugas - 1);
    let end = Math.min(totalHalaman, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
        start = Math.max(1, end - maxButtons + 1);
    }

    for (let page = start; page <= end; page++) {
        pages.push(`
            <button type="button" onclick="ubahHalamanTugas(${page})" aria-label="Halaman ${page}" aria-current="${halamanTugas === page ? "page" : "false"}" class="flex h-10 min-w-10 items-center justify-center rounded-[11px] border px-3 font-bold transition-colors ${halamanTugas === page ? "border-[#0864F7] bg-[#0864F7] text-white shadow-sm shadow-blue-500/20" : "border-[#DCCDEB] bg-white/60 text-[#33245B] hover:bg-white"}">
                ${page}
            </button>
        `);
    }

    return `
        <div class="mt-4 flex flex-col items-center justify-between gap-4 border-t border-[#E5D9F0] pt-4 sm:flex-row">
            <p class="text-[13px] font-medium text-[#493A6C] md:text-[14px]">
                Menampilkan ${totalData ? `${mulai}–${selesai}` : "0"} dari ${totalData} tugas
            </p>

            <div class="flex items-center gap-2">
                <button type="button" onclick="ubahHalamanTugas(${halamanTugas - 1})" ${halamanTugas <= 1 ? "disabled" : ""} aria-label="Halaman sebelumnya" class="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[#DCCDEB] bg-white/60 text-[#695A8A] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-45">
                    <i class="fa-solid fa-chevron-left text-xs"></i>
                </button>

                ${pages.join("")}

                <button type="button" onclick="ubahHalamanTugas(${halamanTugas + 1})" ${halamanTugas >= totalHalaman ? "disabled" : ""} aria-label="Halaman berikutnya" class="flex h-10 w-10 items-center justify-center rounded-[11px] border border-[#DCCDEB] bg-white/60 text-[#695A8A] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-45">
                    <i class="fa-solid fa-chevron-right text-xs"></i>
                </button>
            </div>
        </div>
    `;
}


// ============================================================
// 9. RENDER POPUP HAPUS
// ============================================================

function renderPopupHapusTugas() {
    if (hapusIndexTugas < 0 || !daftarTugas[hapusIndexTugas]) return "";

    const tugasTarget = daftarTugas[hapusIndexTugas];

    return `
        <div class="fixed inset-0 z-[100] flex items-center justify-center bg-[#21133D]/55 p-4 backdrop-blur-sm">
            <div class="relative w-full max-w-md overflow-hidden rounded-[24px] border border-white bg-gradient-to-br from-[#FFFAFF] to-[#F7EEFF] p-7 shadow-2xl md:p-8">
                <img src="${TUGAS_ASSETS.flowerPink}" alt="" class="pointer-events-none absolute -right-1 -top-1 w-20 opacity-65">

                <button type="button" onclick="tutupPopupHapusTugas()" aria-label="Tutup popup" class="absolute right-4 top-4 z-10 text-[#8D7BA8] transition-colors hover:text-[#49356F]">
                    <i class="fa-solid fa-xmark text-xl"></i>
                </button>

                <div class="relative z-10 mb-5 flex justify-center">
                    <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#FDE8EF] text-2xl text-[#E32655]">
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                </div>

                <div class="relative z-10 mb-6 text-center">
                    <h3 class="mb-2 text-2xl font-extrabold text-[#2A1854]">Hapus tugas ini?</h3>
                    <p class="mb-4 text-[#74658F]">Kamu akan menghapus tugas:</p>

                    <div class="mb-4 rounded-xl border border-[#DED1F5] bg-[#F0EAFE] p-4">
                        <h4 class="mb-1 text-lg font-extrabold text-[#2A1854]">${escapeHTMLTugas(tugasTarget.judul)}</h4>
                        <p class="text-sm font-medium text-[#74658F]">${escapeHTMLTugas(tugasTarget.matkul)}</p>
                        <p class="mt-1 text-sm font-medium text-[#74658F]">Deadline: ${escapeHTMLTugas(formatTanggalIndoTugas(tugasTarget.deadline))}, ${escapeHTMLTugas(tugasTarget.jam || "23:59")}</p>
                    </div>

                    <p class="text-sm font-medium text-[#88799F]">Tugas yang dihapus tidak dapat dikembalikan.</p>
                </div>

                <div class="relative z-10 flex gap-3">
                    <button type="button" onclick="tutupPopupHapusTugas()" class="flex-1 rounded-xl border border-[#BDA9DE] px-4 py-3 font-bold text-[#49356F] transition-colors hover:bg-[#F0EAFE]">Batal</button>
                    <button type="button" onclick="aksiKonfirmasiHapusTugas()" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#E32655] px-4 py-3 font-bold text-white shadow-md shadow-red-200/50 transition-colors hover:bg-[#C91C47]">
                        <i class="fa-regular fa-trash-can"></i> Hapus Tugas
                    </button>
                </div>
            </div>
        </div>
    `;
}


// ============================================================
// 10. RENDER HALAMAN DAFTAR TUGAS
// ============================================================

function renderTugas() {
    const totalTugas = daftarTugas.length;
    const tugasSelesai = daftarTugas.filter(item => item.status === "Selesai").length;
    const tugasAktif = totalTugas - tugasSelesai;

    const dataTerfilter = getDataTugasTerfilter();
    const totalHalaman = Math.max(1, Math.ceil(dataTerfilter.length / TUGAS_PER_HALAMAN));
    halamanTugas = Math.min(Math.max(1, halamanTugas), totalHalaman);

    const awalIndex = (halamanTugas - 1) * TUGAS_PER_HALAMAN;
    const dataHalaman = dataTerfilter.slice(awalIndex, awalIndex + TUGAS_PER_HALAMAN);
    const mulai = dataHalaman.length ? awalIndex + 1 : 0;
    const selesai = awalIndex + dataHalaman.length;

    const rowsHTML = dataHalaman.length
        ? dataHalaman.map(renderBarisTugas).join("")
        : `
            <div class="flex min-h-[220px] min-w-[1050px] flex-col items-center justify-center rounded-b-xl bg-white/60 px-6 py-12 text-center">
                <i class="fa-solid fa-clipboard-list mb-3 text-4xl text-[#C6B8DC]"></i>
                <p class="font-bold text-[#49376D]">Tidak ada tugas yang sesuai.</p>
                <p class="mt-1 text-sm text-[#8A7AA5]">Coba ubah kata kunci atau filter yang digunakan.</p>
            </div>
        `;

    let html = `
        <div class="relative">
            ${renderHeaderTugas()}

            <!-- BANNER UTAMA -->
            <section class="relative mb-3.5 flex min-h-[145px] items-center overflow-hidden rounded-[18px] border border-white/80 bg-gradient-to-r from-[#EBCBF8] via-[#E9C8F5] to-[#DCCDF7] px-6 py-6 shadow-[0_5px_18px_rgba(105,64,148,0.06)] md:px-9">
                <img src="${TUGAS_ASSETS.flowerCorner}" alt="" class="pointer-events-none absolute -left-1 -top-1 w-[76px] object-contain opacity-90">
                <img src="${TUGAS_ASSETS.flowerPink}" alt="" class="pointer-events-none absolute right-2 top-0 w-[72px] object-contain opacity-85">
                <img src="${TUGAS_ASSETS.sparkle}" alt="" class="pointer-events-none absolute left-[53%] top-4 h-7 w-7 object-contain opacity-80">
                <img src="${TUGAS_ASSETS.sparkle}" alt="" class="pointer-events-none absolute bottom-4 left-[47%] h-6 w-6 object-contain opacity-70">

                <div class="relative z-10 max-w-[68%] md:max-w-[70%]">
                    <h3 class="mb-1 text-[25px] font-extrabold leading-tight tracking-[-0.025em] text-[#24104F] md:text-[35px]">
                        Satu per satu, tugasmu terselesaikan.
                    </h3>
                    <p class="text-[15px] font-medium text-[#49356F] md:text-[20px]">
                        Atur deadline dan pantau setiap langkah pengerjaanmu.
                    </p>
                </div>

                <div class="pointer-events-none absolute bottom-[-22px] right-2 z-10 hidden h-[170px] w-[38%] md:block">
                    <img src="${TUGAS_ASSETS.banner}" alt="Ilustrasi buku dan perlengkapan belajar" class="h-full w-full object-contain object-bottom">
                </div>
            </section>

            <!-- STATISTIK -->
            <section class="mb-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
                <div class="relative flex min-h-[105px] items-center justify-between overflow-hidden rounded-[17px] border border-[#F4D7E7] bg-gradient-to-r from-[#FCE5F0] to-[#FBEAF3] px-5 py-4">
                    <div class="relative z-10 flex items-center gap-4">
                        <div class="flex h-[68px] w-[68px] items-center justify-center rounded-[15px] bg-[#FAD5E6] text-[31px] text-[#9B2454]"><i class="fa-solid fa-book-open"></i></div>
                        <div>
                            <p class="mb-0.5 text-[14px] font-bold text-[#38245E]">Total Tugas</p>
                            <h4 class="text-[34px] font-extrabold leading-none text-[#24104F]">${totalTugas}</h4>
                        </div>
                    </div>
                    <i class="fa-solid fa-book-open absolute -bottom-1 right-4 text-[58px] text-[#EFAFCF]/50"></i>
                </div>

                <div class="relative flex min-h-[105px] items-center justify-between overflow-hidden rounded-[17px] border border-[#D5E4FA] bg-gradient-to-r from-[#E4EEFF] to-[#DCE8FF] px-5 py-4">
                    <div class="relative z-10 flex items-center gap-4">
                        <div class="flex h-[68px] w-[68px] items-center justify-center rounded-[15px] bg-[#D0E0FF] text-[31px] text-[#0759E8]"><i class="fa-regular fa-square-check"></i></div>
                        <div>
                            <p class="mb-0.5 text-[14px] font-bold text-[#38245E]">Tugas Aktif</p>
                            <h4 class="text-[34px] font-extrabold leading-none text-[#24104F]">${tugasAktif}</h4>
                        </div>
                    </div>
                    <i class="fa-regular fa-rectangle-list absolute -bottom-1 right-4 text-[58px] text-[#91B5F5]/45"></i>
                </div>

                <div class="relative flex min-h-[105px] items-center justify-between overflow-hidden rounded-[17px] border border-[#D5EBD8] bg-gradient-to-r from-[#E4F7E7] to-[#DDF4E0] px-5 py-4">
                    <div class="relative z-10 flex items-center gap-4">
                        <div class="flex h-[68px] w-[68px] items-center justify-center rounded-[15px] bg-[#D0F0D5] text-[31px] text-[#168334]"><i class="fa-regular fa-circle-check"></i></div>
                        <div>
                            <p class="mb-0.5 text-[14px] font-bold text-[#38245E]">Tugas Selesai</p>
                            <h4 class="text-[34px] font-extrabold leading-none text-[#24104F]">${tugasSelesai}</h4>
                        </div>
                    </div>
                    <i class="fa-regular fa-circle-check absolute -bottom-1 right-4 text-[58px] text-[#9CD8A7]/45"></i>
                    <img src="${TUGAS_ASSETS.flowerPink}" alt="" class="pointer-events-none absolute -right-1 -top-1 w-12 opacity-55">
                </div>
            </section>

            <!-- TOOLBAR PENCARIAN DAN FILTER -->
            <section class="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-[minmax(220px,1.35fr)_minmax(190px,.9fr)_minmax(190px,.95fr)_240px]">
                <div class="relative">
                    <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-[19px] text-[#291B51]"></i>
                    <input id="input-cari-tugas" type="text" value="${escapeHTMLTugas(kataKunciTugas)}" oninput="ubahPencarianTugas(this.value)" placeholder="Cari tugas..." class="h-[52px] w-full rounded-[13px] border border-[#DCCCF0] bg-white/65 pl-12 pr-4 text-[14px] font-medium text-[#33245B] shadow-[0_2px_8px_rgba(69,43,102,0.025)] outline-none transition-all placeholder:text-[#82749F] focus:border-[#A88BD5]">
                </div>

                <div class="relative">
                    <select onchange="ubahFilterMatkulTugas(this)" class="h-[52px] w-full cursor-pointer appearance-none rounded-[13px] border border-[#DCCCF0] bg-white/65 px-4 pr-10 text-[14px] font-semibold text-[#33245B] outline-none focus:border-[#A88BD5]">
                        <option value="Semua Mata Kuliah" ${filterMatkulMode === "Semua Mata Kuliah" ? "selected" : ""}>Semua Mata Kuliah</option>
                        <option value="Desain Web" ${filterMatkulMode === "Desain Web" ? "selected" : ""}>Desain Web</option>
                        <option value="Psikologi Kognitif" ${filterMatkulMode === "Psikologi Kognitif" ? "selected" : ""}>Psikologi Kognitif</option>
                        <option value="Strategi Pemecahan Masalah" ${filterMatkulMode === "Strategi Pemecahan Masalah" ? "selected" : ""}>Strategi Pemecahan Masalah</option>
                    </select>
                    <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#33245B]"></i>
                </div>

                <div class="relative">
                    <select onchange="ubahFilterStatus(this)" class="h-[52px] w-full cursor-pointer appearance-none rounded-[13px] border border-[#DCCCF0] bg-white/65 px-4 pr-10 text-[14px] font-semibold text-[#33245B] outline-none focus:border-[#A88BD5]">
                        <option value="Semua Status" ${filterStatusMode === "Semua Status" ? "selected" : ""}>Semua Status</option>
                        <option value="Belum Mulai" ${filterStatusMode === "Belum Mulai" ? "selected" : ""}>Belum Mulai</option>
                        <option value="Dikerjakan" ${filterStatusMode === "Dikerjakan" ? "selected" : ""}>Dikerjakan</option>
                        <option value="Selesai" ${filterStatusMode === "Selesai" ? "selected" : ""}>Selesai</option>
                    </select>
                    <i class="fa-solid fa-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#33245B]"></i>
                </div>

                <button type="button" onclick="bukaTambahTugas()" class="flex h-[52px] items-center justify-center gap-3 whitespace-nowrap rounded-[13px] bg-[#0864F7] px-5 text-[15px] font-bold text-white shadow-[0_5px_12px_rgba(8,100,247,0.18)] transition-all hover:bg-[#0756D8]">
                    <i class="fa-solid fa-plus text-[20px]"></i> Tambah Tugas
                </button>
            </section>

            <!-- TABEL DAFTAR TUGAS -->
            <section class="mb-3.5 rounded-[19px] border border-[#E5D9F0] bg-white/55 p-3.5 shadow-[0_5px_20px_rgba(92,57,133,0.045)] md:p-4">
                <div class="mb-3 flex items-center justify-between gap-4 px-1.5">
                    <div class="flex items-center gap-3">
                        <h3 class="text-[22px] font-extrabold text-[#24104F] md:text-[25px]">Daftar Tugas</h3>
                        <img src="${TUGAS_ASSETS.branch}" alt="" class="hidden h-8 w-16 object-contain sm:block">
                    </div>

                    <div class="relative shrink-0 text-[13px] font-semibold text-[#0864F7] md:text-[14px]">
                        <select onchange="ubahSortDeadline(this)" class="cursor-pointer appearance-none bg-transparent pr-7 outline-none">
                            <option value="terdekat" ${sortDeadlineMode === "terdekat" ? "selected" : ""}>Deadline terdekat</option>
                            <option value="terlama" ${sortDeadlineMode === "terlama" ? "selected" : ""}>Deadline terlama</option>
                        </select>
                        <i class="fa-solid fa-arrow-down-wide-short pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"></i>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <div class="min-w-[1050px]">
                        <div class="grid grid-cols-[minmax(270px,1.55fr)_minmax(180px,1.05fr)_minmax(220px,1.2fr)_minmax(180px,1fr)_100px] items-center gap-3 rounded-t-[13px] border border-[#E5D9F0] bg-[#F0EAFE]/90 px-4 py-3 text-[14px] font-extrabold text-[#24104F]">
                            <div class="pl-2">Tugas</div>
                            <div class="border-l border-[#DCCDEB] pl-4">Mata Kuliah</div>
                            <div class="border-l border-[#DCCDEB] pl-4">Deadline</div>
                            <div class="border-l border-[#DCCDEB] pl-4">Status</div>
                            <div class="border-l border-[#DCCDEB] pl-3 text-center">Aksi</div>
                        </div>

                        <div class="space-y-1.5 pt-1">
                            ${rowsHTML}
                        </div>
                    </div>
                </div>

                ${renderPaginationTugas(dataTerfilter.length, totalHalaman, mulai, selesai)}
            </section>

            <!-- LEGENDA -->
            <section class="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-[15px] border border-[#F0D7E9] bg-[#FCEAF4]/75 px-5 py-3 text-[12px] font-medium text-[#33245B] md:text-[13px]">
                <span class="flex items-center gap-2"><span class="h-3.5 w-3.5 rounded-full bg-[#E92335]"></span><span><b class="text-[#D92332]">Merah:</b> hari ini / besok</span></span>
                <span class="flex items-center gap-2"><span class="h-3.5 w-3.5 rounded-full bg-[#F07816]"></span><span><b class="text-[#E45B13]">Oranye:</b> 2–3 hari lagi</span></span>
                <span class="flex items-center gap-2"><i class="fa-solid fa-pen text-[17px] text-[#0864F7]"></i> Edit</span>
                <span class="flex items-center gap-2"><i class="fa-regular fa-trash-can text-[17px] text-[#E32636]"></i> Hapus</span>
            </section>

            <!-- FOOTER -->
            <div class="relative flex items-center justify-between overflow-hidden pb-1 pt-5">
                <p class="text-[14px] font-medium text-[#65468F]">Sedikit demi sedikit, jadi berarti.</p>
                <img src="${TUGAS_ASSETS.branch}" alt="" class="pointer-events-none absolute -bottom-3 right-0 h-[54px] w-[150px] object-contain object-right opacity-90">
                <img src="${TUGAS_ASSETS.sparkle}" alt="" class="pointer-events-none absolute bottom-1 right-[28%] h-5 w-5 object-contain opacity-70">
            </div>
        </div>

        ${renderPopupHapusTugas()}
    `;

    return html;
}


// ============================================================
// 11. RENDER FORM TAMBAH / EDIT TUGAS
// ============================================================

function renderTambahTugas() {
    let judulVal = "";
    let matkulVal = "";
    let deadlineVal = "";
    let jamVal = "23:59";
    let statusVal = "Belum Mulai";
    let deskripsiVal = "";
    let judulHalaman = "Tambah Tugas";
    let deskripsiHeader = "Atur tugas dan tenggat agar belajarmu lebih terarah.";
    let teksSimpan = "Simpan Tugas";
    let teksFooter = "Tugas tersimpan setelah kamu menekan Simpan.";
    let tanggalPembaruan = "";
    const modeEdit = editIndexTugas >= 0 && Boolean(daftarTugas[editIndexTugas]);

    if (modeEdit) {
        const item = daftarTugas[editIndexTugas];
        judulHalaman = "Edit Tugas";
        deskripsiHeader = "Perbarui detail tugas dan pantau pengerjaannya.";
        teksSimpan = "Simpan Perubahan";
        teksFooter = "Perubahan tersimpan setelah kamu menekan Simpan.";

        judulVal = item.judul || "";
        matkulVal = item.matkul_val || "";
        deadlineVal = item.deadline || "";
        jamVal = item.jam || "23:59";
        statusVal = item.status || "Belum Mulai";
        deskripsiVal = item.deskripsi || "";
        tanggalPembaruan = item.updatedAt || formatTanggalPembaruanTugas();
    }

    return `
        <div class="relative">
            ${renderHeaderTugas()}

            <!-- TOMBOL KEMBALI -->
            <button type="button" onclick="batalFormTugas()" class="mb-6 flex items-center gap-3 text-[15px] font-semibold text-[#0864F7] transition-colors hover:text-[#064BB5]">
                <i class="fa-solid fa-arrow-left text-lg"></i>
                Kembali ke Tugas
            </button>

            <!-- PANEL FORM -->
            <section class="relative min-h-[min(760px,calc(100vh-190px))] overflow-hidden rounded-[17px] border border-white/90 bg-gradient-to-br from-[#F8EEFF] via-[#F9F0FF] to-[#FCEAF7] px-5 pb-5 pt-5 shadow-[0_7px_24px_rgba(92,57,133,0.055)] md:px-6 md:pt-6">
                <img src="${TUGAS_ASSETS.flowerCorner}" alt="" class="pointer-events-none absolute left-0 top-0 h-[82px] w-[90px] object-contain opacity-65">
                <img src="${TUGAS_ASSETS.sparkle}" alt="" class="pointer-events-none absolute right-[34%] top-5 h-7 w-7 object-contain opacity-70">
                <img src="${TUGAS_ASSETS.flowerPink}" alt="" class="pointer-events-none absolute right-4 top-4 h-14 w-14 object-contain opacity-65">

                <!-- HEADER FORM -->
                <div class="relative z-10 flex items-center justify-between gap-5 border-b border-[#DCCDEB]/90 pb-5 md:pb-6">
                    <div class="flex min-w-0 items-center gap-4 md:gap-5">
                        <div class="relative flex h-[70px] w-[78px] shrink-0 items-center justify-center rounded-[19px] bg-[#EADDFC] md:h-[76px] md:w-[96px]">
                            <i class="fa-regular fa-calendar-check text-[43px] text-[#2A155F]"></i>
                        </div>
                        <div class="min-w-0">
                            <h3 class="mb-1 text-[27px] font-extrabold leading-tight tracking-[-0.03em] text-[#24104F] md:text-[38px]">${judulHalaman}</h3>
                            <p class="text-[14px] font-medium leading-snug text-[#786A96] md:text-[18px]">${deskripsiHeader}</p>
                        </div>
                    </div>

                    <div class="pointer-events-none relative z-10 hidden h-[112px] w-[34%] shrink-0 md:block lg:w-[36%]">
                        <img src="${TUGAS_ASSETS.formIllustration}" alt="Ilustrasi buku dan perlengkapan tugas" class="absolute bottom-[-25px] right-0 h-[145px] w-full object-contain object-bottom">
                    </div>
                </div>

                <!-- FORM ISIAN -->
                <div class="relative z-10 flex flex-col pt-6">
                    <!-- Judul dan Mata Kuliah -->
                    <div class="mb-6 grid grid-cols-1 gap-5 md:grid-cols-[1.25fr_.75fr] md:gap-6">
                        <div>
                            <label for="input-judul-tugas" class="mb-2.5 block text-[15px] font-bold text-[#24104F] md:text-[16px]">Judul Tugas <span class="text-red-500">*</span></label>
                            <input id="input-judul-tugas" type="text" maxlength="150" value="${escapeHTMLTugas(judulVal)}" placeholder="Masukkan judul tugas" class="h-[53px] w-full rounded-[12px] border border-[#D8C8EF] bg-white/35 px-5 text-[15px] font-medium text-[#28194F] outline-none transition-all placeholder:text-[#877AA4] focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 md:text-[16px]">
                        </div>

                        <div>
                            <label for="input-matkul-tugas" class="mb-2.5 block text-[15px] font-bold text-[#24104F] md:text-[16px]">Mata Kuliah <span class="text-red-500">*</span></label>
                            <div class="relative">
                                <select id="input-matkul-tugas" class="h-[53px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#D8C8EF] bg-white/35 px-5 pr-12 text-[15px] font-medium text-[#28194F] outline-none transition-all focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 md:text-[16px]">
                                    <option value="" disabled ${matkulVal === "" ? "selected" : ""}>Pilih mata kuliah</option>
                                    <option value="1" ${matkulVal === "1" ? "selected" : ""}>Desain Web</option>
                                    <option value="2" ${matkulVal === "2" ? "selected" : ""}>Psikologi Kognitif</option>
                                    <option value="3" ${matkulVal === "3" ? "selected" : ""}>Strategi Pemecahan Masalah</option>
                                </select>
                                <i class="fa-solid fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#24104F]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Deadline, Jam, Status -->
                    <div class="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                        <div>
                            <label for="input-tgl-tugas" class="mb-2.5 block text-[15px] font-bold text-[#24104F] md:text-[16px]">Tanggal Deadline <span class="text-red-500">*</span></label>
                            <div class="relative">
                                <input id="input-tgl-tugas" type="date" value="${escapeHTMLTugas(deadlineVal)}" class="h-[53px] w-full rounded-[12px] border border-[#D8C8EF] bg-white/35 px-5 text-[15px] font-medium text-[#28194F] outline-none transition-all focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 md:text-[16px]">
                            </div>
                        </div>

                        <div>
                            <label for="input-jam-tugas" class="mb-2.5 block text-[15px] font-bold text-[#24104F] md:text-[16px]">Jam Deadline</label>
                            <div class="relative">
                                <input id="input-jam-tugas" type="time" value="${escapeHTMLTugas(jamVal)}" class="h-[53px] w-full rounded-[12px] border border-[#D8C8EF] bg-white/35 px-5 text-[15px] font-medium text-[#28194F] outline-none transition-all focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 md:text-[16px]">
                            </div>
                            <p class="mt-1.5 text-[13px] font-medium text-[#796B98]">Default pukul 23:59</p>
                        </div>

                        <div>
                            <label for="input-status-tugas" class="mb-2.5 block text-[15px] font-bold text-[#24104F] md:text-[16px]">Status <span class="text-red-500">*</span></label>
                            <div class="relative">
                                <select id="input-status-tugas" class="h-[53px] w-full cursor-pointer appearance-none rounded-[12px] border border-[#D8C8EF] bg-white/35 px-5 pr-12 text-[15px] font-medium text-[#28194F] outline-none transition-all focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 md:text-[16px]">
                                    <option value="Belum Mulai" ${statusVal === "Belum Mulai" ? "selected" : ""}>Belum Mulai</option>
                                    <option value="Dikerjakan" ${statusVal === "Dikerjakan" ? "selected" : ""}>Dikerjakan</option>
                                    <option value="Selesai" ${statusVal === "Selesai" ? "selected" : ""}>Selesai</option>
                                </select>
                                <i class="fa-solid fa-chevron-down pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#24104F]"></i>
                            </div>
                        </div>
                    </div>

                    <!-- Deskripsi -->
                    <div class="mb-3 flex flex-col">
                        <label for="input-deskripsi-tugas" class="mb-2.5 block text-[15px] font-bold text-[#24104F] md:text-[16px]">Deskripsi Tugas (opsional)</label>
                        <textarea id="input-deskripsi-tugas" maxlength="5000" placeholder="Tuliskan detail atau instruksi tugas di sini..." class="h-[160px] w-full resize-y rounded-[12px] border border-[#D8C8EF] bg-white/30 px-5 py-4 text-[15px] font-medium leading-[1.55] text-[#28194F] outline-none transition-all placeholder:text-[#877AA4] focus:border-[#9D7DCE] focus:ring-2 focus:ring-[#DCCAF7]/60 md:h-[178px] md:text-[16px]">${escapeHTMLTugas(deskripsiVal)}</textarea>
                    </div>

                    <!-- Keterangan wajib dan pembaruan -->
                    <div class="mb-5 flex flex-wrap items-center justify-between gap-2">
                        <p class="text-[13px] font-medium text-[#796B98] md:text-[14px]">* Wajib diisi</p>
                        ${modeEdit ? `<p class="text-[13px] font-medium text-[#796B98] md:text-[14px]">Terakhir diperbarui: ${escapeHTMLTugas(tanggalPembaruan)}</p>` : ""}
                    </div>

                    <!-- FOOTER FORM -->
                    <div class="mt-auto flex flex-col items-center justify-between gap-4 border-t border-[#DCCDEB]/90 pt-5 md:flex-row">
                        <p class="text-center text-[13px] font-medium text-[#786A96] md:text-left md:text-[14px]">${teksFooter}</p>
                        <div class="flex w-full gap-3 md:w-auto md:gap-4">
                            <button type="button" onclick="batalFormTugas()" class="flex-1 rounded-[12px] border-[1.5px] border-[#0864F7] px-7 py-3 text-[14px] font-semibold text-[#0864F7] transition-colors hover:bg-blue-50/70 md:flex-none md:text-[15px]">Batal</button>
                            <button type="button" onclick="aksiSimpanTugas()" class="inline-flex flex-1 items-center justify-center gap-3 whitespace-nowrap rounded-[12px] bg-[#0864F7] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_5px_12px_rgba(8,100,247,0.18)] transition-colors hover:bg-[#0756D8] md:flex-none md:text-[15px]">
                                <i class="fa-solid fa-check text-[17px]"></i> ${teksSimpan}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- FOOTER HALAMAN -->
            <div class="relative flex items-center justify-between overflow-hidden pt-5">
                <p class="text-[14px] font-medium text-[#65468F]">Sedikit demi sedikit, jadi berarti.</p>
                <img src="${TUGAS_ASSETS.branch}" alt="" class="pointer-events-none absolute -bottom-3 right-0 h-[58px] w-[150px] object-contain object-right-bottom opacity-85">
                <img src="${TUGAS_ASSETS.sparkle}" alt="" class="pointer-events-none absolute bottom-1 right-[27%] h-5 w-5 object-contain opacity-70">
            </div>
        </div>
    `;
}


// ============================================================
// 12. EKSPOR FUNGSI RENDER UNTUK ROUTER APLIKASI
// ============================================================

window.renderTugas = renderTugas;
window.renderTambahTugas = renderTambahTugas;

// ============================================================
// AKHIR MODUL TUGAS.JS
// ============================================================
