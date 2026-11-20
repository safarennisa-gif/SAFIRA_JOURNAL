// ==========================================
// LOGIKA DROPDOWN PROFIL
// ==========================================

window.toggleProfileDropdown = function() {
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

window.closeProfileDropdown = function() {
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

function escapeHTMLDashboard(value) {
    return String(value ?? "").replace(/[&<>"']/g, function (char) {
        if (char === "&") return "&amp;";
        if (char === "<") return "&lt;";
        if (char === ">") return "&gt;";
        if (char === '"') return "&quot;";
        return "&#39;";
    });
}

// ==========================================
// RENDER HALAMAN DASHBOARD UTAMA (DINAMIS)
// ==========================================

function renderDashboard() {
    // 1. Ambil data Profil
    const profil = typeof safiraProfileData !== "undefined"
        ? safiraProfileData
        : { full_name: "Safira", email: "safira@example.com", semester: "3" };

    const nama = escapeHTMLDashboard(profil.full_name || "Safira");
    const namaDepan = escapeHTMLDashboard((profil.full_name || "Safira").split(" ")[0]);
    const email = escapeHTMLDashboard(profil.email || "safira@example.com");
    const semester = escapeHTMLDashboard(profil.semester || "3");

    // 2. Ambil data Catatan
    const dataCatatan = typeof daftarCatatan !== "undefined" && Array.isArray(daftarCatatan) ? daftarCatatan : [];
    const totalCatatan = dataCatatan.length;
    const catatanTerbaru = [...dataCatatan]
        .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0))
        .slice(0, 3);

    // 3. Ambil data Tugas
    const dataTugas = typeof daftarTugas !== "undefined" && Array.isArray(daftarTugas) ? daftarTugas : [];
    const totalTugas = dataTugas.length;
    const tugasSelesai = dataTugas.filter((t) => t.status === "Selesai").length;
    const tugasAktif = totalTugas - tugasSelesai;
    const persenTugas = totalTugas > 0 ? Math.round((tugasSelesai / totalTugas) * 100) : 0;

    const deadlineTerdekat = dataTugas
        .filter((t) => t.status !== "Selesai")
        .sort((a, b) => new Date(`${a.deadline || "9999-12-31"}T${a.jam || "23:59"}`) - new Date(`${b.deadline || "9999-12-31"}T${b.jam || "23:59"}`))
        .slice(0, 3);

    // 4. Ambil data Jadwal Hari Ini
    const dataJadwal = typeof daftarJadwal !== "undefined" && Array.isArray(daftarJadwal) ? daftarJadwal : [];
    const hariIni = new Date().toLocaleDateString("id-ID", { weekday: "long" });
    const semesterAktif = typeof filterSemester !== "undefined" ? filterSemester : `Semester ${semester}`;
    const jadwalHariIni = dataJadwal
        .filter((j) => j.hari === hariIni && j.semester === semesterAktif)
        .sort((a, b) => (a.jamMulai || "").localeCompare(b.jamMulai || ""));

    // 5. Ambil data Target Belajar
    const dataTarget = typeof daftarTarget !== "undefined" && Array.isArray(daftarTarget) ? daftarTarget : [];

    // --- HTML: Deadline Terdekat ---
    const deadlineHTML = deadlineTerdekat.length === 0
        ? `<p class="py-6 text-center text-sm font-medium text-[#1E1B4B]/60">Semua tugas sudah selesai atau belum ada tugas aktif.</p>`
        : deadlineTerdekat.map((item) => {
            const info = typeof getDeadlineInfoTugas === "function"
                ? getDeadlineInfoTugas(item.deadline, item.status)
                : { label: item.deadline || "-" };
            const tglSingkat = typeof formatTanggalIndoTugas === "function"
                ? formatTanggalIndoTugas(item.deadline)
                : (item.deadline || "-");
            const isMendesak = info.label === "Hari ini" || info.label === "Besok" || info.label === "Terlewati";
            const borderClass = isMendesak ? "bg-[#FFF5F6] border-pink-100/80 border-l-[#EF4444]" : "bg-[#FFFDF9] border-orange-100/80 border-l-[#F97316]";
            const iconClass = isMendesak ? "bg-[#FFE4E6] text-[#EF4444]" : "bg-[#FFEDD5] text-[#F97316]";
            const badgeClass = isMendesak ? "bg-[#EF4444]" : "bg-[#EA580C]";

            return `
                <div onclick="navigate('tugas')" class="cursor-pointer flex flex-col justify-between gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center border border-l-[6px] shadow-sm transition-transform hover:-translate-y-0.5 ${borderClass}">
                    <div class="flex min-w-0 items-center gap-3 sm:gap-4">
                        <div class="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconClass}">
                            <i class="fa-regular fa-file-lines text-lg"></i>
                        </div>
                        <div class="min-w-0">
                            <h4 class="break-words font-bold text-[#1E1B4B] text-[14px] sm:text-[15px]">${escapeHTMLDashboard(item.judul)}</h4>
                            <p class="mt-0.5 break-words text-[12px] font-medium text-[#1E1B4B]/65 sm:text-[13px]">${escapeHTMLDashboard(item.matkul)} <span class="mx-1">•</span> ${escapeHTMLDashboard(tglSingkat)}</p>
                        </div>
                    </div>
                    <div class="flex w-full flex-col items-center sm:w-[115px] sm:min-w-[115px]">
                        <span class="w-full py-1 px-3 ${badgeClass} text-white text-[12px] font-bold rounded-full flex items-center justify-center gap-1.5 shadow-sm">
                            <i class="fa-regular fa-clock"></i> ${escapeHTMLDashboard(info.label || "-")}
                        </span>
                        <span class="text-[12px] text-[#1E1B4B]/70 font-medium mt-1">${escapeHTMLDashboard(item.status)}</span>
                    </div>
                </div>
            `;
        }).join("");

    // --- HTML: Catatan Terbaru ---
    const catatanHTML = catatanTerbaru.length === 0
        ? `<p class="py-6 text-center text-sm font-medium text-[#1E1B4B]/60">Belum ada catatan tersimpan.</p>`
        : catatanTerbaru.map((item, idx) => {
            const indexAsli = dataCatatan.indexOf(item);
            const iconBg = idx % 2 === 0 ? "bg-[#E0E7FF]/80 text-[#4F46E5]" : "bg-[#FFE4E6]/80 text-[#E11D48]";
            return `
                <div onclick="bukaLihatCatatan(${indexAsli})" class="flex items-center justify-between py-3 px-2 hover:bg-white/50 rounded-xl transition-all cursor-pointer group">
                    <div class="flex items-center gap-4 min-w-0">
                        <div class="w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0">
                            <i class="fa-solid fa-book-open text-lg"></i>
                        </div>
                        <div class="min-w-0">
                            <h4 class="break-words font-bold text-[#1E1B4B] text-[14px] sm:text-[15px]">${escapeHTMLDashboard(item.judul)}</h4>
                            <p class="mt-0.5 break-words text-[12px] font-medium text-[#1E1B4B]/65 sm:text-[13px]">${escapeHTMLDashboard(item.matkul)} <span class="mx-1">•</span> ${escapeHTMLDashboard(item.tanggal)}</p>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-right text-[#1E1B4B]/50 group-hover:text-[#1D63DC] text-xs pr-3"></i>
                </div>
            `;
        }).join("");

    // --- HTML: Jadwal Hari Ini ---
    const jadwalHTML = jadwalHariIni.length === 0
        ? `<p class="py-6 text-center text-sm font-medium text-[#1E1B4B]/60">Tidak ada kelas terjadwal hari ${escapeHTMLDashboard(hariIni)}.</p>`
        : jadwalHariIni.map((item, idx) => {
            const badgeBg = idx % 2 === 0 ? "bg-[#FFE4E6]/90" : "bg-[#E0E7FF]/90";
            const iconColor = idx % 2 === 0 ? "text-[#E11D48]" : "text-[#1E1B4B]";
            return `
                <div class="flex flex-col items-start gap-3 py-3 sm:flex-row sm:items-center sm:gap-4">
                    <div class="flex items-center gap-2 px-3.5 py-2.5 ${badgeBg} text-[#1E1B4B] rounded-xl font-bold text-[12px] shrink-0">
                        <i class="fa-regular fa-clock ${iconColor} text-sm"></i>
                        <span>${escapeHTMLDashboard(item.jamMulai)} – ${escapeHTMLDashboard(item.jamSelesai)}</span>
                    </div>
                    <div>
                        <h4 class="font-bold text-[#1E1B4B] text-[15px]">${escapeHTMLDashboard(item.matkul)}</h4>
                        <p class="text-[13px] text-[#1E1B4B]/65 mt-0.5 flex items-center gap-1.5 font-medium">
                            <i class="fa-solid fa-location-dot text-[#7E22CE]/60 text-xs"></i>
                            Ruang ${escapeHTMLDashboard(item.ruang)}
                        </p>
                    </div>
                </div>
            `;
        }).join("");

    // --- HTML: Review Target Belajar ---
    const targetHTML = dataTarget.length === 0
        ? `<p class="py-6 text-center text-sm font-medium text-[#1E1B4B]/60">Belum ada target belajar.</p>`
        : dataTarget.slice(0, 3).map((target) => {
            const langkah = Array.isArray(target.langkah) ? target.langkah : [];
            const selesai = langkah.filter((l) => l.selesai).length;
            const persen = langkah.length > 0 ? Math.round((selesai / langkah.length) * 100) : 0;

            const warna = target.tema === "pink"
                ? { box: "bg-[#FFE4E6]/80 text-[#E11D48]", bar: "bg-[#D96B82]" }
                : target.tema === "hijau"
                    ? { box: "bg-[#DCFCE7]/90 text-[#15803D]", bar: "bg-[#16A34A]" }
                    : { box: "bg-[#E0E7FF]/80 text-[#4F46E5]", bar: "bg-[#1D63DC]" };

            return `
                <div onclick="navigate('progres')" class="cursor-pointer flex items-center gap-3 py-2.5 hover:bg-white/40 rounded-xl px-1 transition-colors">
                    <div class="w-10 h-10 rounded-xl ${warna.box} flex items-center justify-center shrink-0">
                        <i class="fa-solid fa-book-open text-sm"></i>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h4 class="text-[13px] font-bold text-[#1E1B4B] truncate">${escapeHTMLDashboard(target.nama)}</h4>
                        <p class="text-[11px] text-[#1E1B4B]/65 font-medium">${selesai} dari ${langkah.length} langkah</p>
                    </div>
                    <div class="flex items-center gap-2.5 shrink-0">
                        <div class="w-24 bg-[#D1D5DB]/80 rounded-full h-2.5 overflow-hidden">
                            <div class="${warna.bar} h-2.5 rounded-full" style="width: ${persen}%"></div>
                        </div>
                        <span class="text-[13px] font-bold text-[#1E1B4B] w-9 text-right">${persen}%</span>
                    </div>
                </div>
            `;
        }).join("");

    return `
        <img src="aset/ranting-sudut.png" alt="" class="absolute -top-2 -right-2 w-24 opacity-85 pointer-events-none z-0 transform -scale-x-100">
        <img src="aset/ranting-sudut.png" alt="" class="absolute -bottom-2 -right-2 w-28 opacity-90 pointer-events-none z-0 transform rotate-180">

        <!-- Header -->
        <header class="relative z-20 mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 class="text-[30px] font-black tracking-tight text-[#1E1B4B] sm:text-[32px]">Dashboard</h2>

            <div class="relative flex items-center gap-3 sm:gap-5 sm:pr-4">
                <span class="hidden text-[13px] font-medium text-[#1E1B4B] sm:inline sm:text-[15px]">
                    Selasa, 13 Oktober 2026
                </span>

                <div class="hidden h-6 w-[1.5px] bg-[#1E1B4B]/15 sm:block"></div>

                <button
                    id="profile-dropdown-trigger"
                    type="button"
                    aria-label="Buka menu profil ${nama}"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="profile-dropdown"
                    onclick="toggleProfileDropdown()"
                    class="relative z-50 flex items-center gap-3 rounded-full px-2 py-1 transition-colors hover:bg-white/40"
                >
                    <span class="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#E9D5FF] shadow-sm">
                        <img src="aset/avatar.png" alt="Foto profil ${nama}" class="h-full w-full object-cover">
                    </span>

                    <span class="flex max-w-[150px] items-center gap-1.5 truncate text-[15px] font-bold text-[#1E1B4B] sm:text-[16px]">
                        <span class="truncate">${nama}</span>
                        <i id="profile-dropdown-icon" class="fa-solid fa-chevron-down text-xs text-[#1E1B4B] transition-transform"></i>
                    </span>
                </button>

                <div id="profile-dropdown-overlay" onclick="closeProfileDropdown()" class="fixed inset-0 z-40 hidden" aria-hidden="true"></div>

                <div id="profile-dropdown" role="menu" class="absolute right-0 top-14 z-50 hidden w-[min(320px,calc(100vw-32px))] origin-top-right overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl">
                    <div class="flex items-center gap-4 border-b border-gray-100 p-5">
                        <img src="aset/avatar.png" alt="" class="h-14 w-14 shrink-0 rounded-full border-2 border-purple-100 bg-[#E9D5FF] object-cover shadow-sm">

                        <div class="min-w-0">
                            <h4 class="truncate font-bold text-gray-900 text-lg">${nama}</h4>
                            <p class="text-xs font-medium text-gray-500">Mahasiswa • Semester ${semester}</p>
                            <p class="mt-1 truncate text-[11px] text-gray-400">${email}</p>
                        </div>
                    </div>

                    <div class="p-3">
                        <button type="button" role="menuitem" onclick="closeProfileDropdown(); navigate('profil')" class="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-purple">
                            <span class="flex items-center gap-3">
                                <i class="fa-regular fa-user text-lg"></i>
                                <span>Lihat Profil</span>
                            </span>
                            <i class="fa-solid fa-chevron-right text-xs text-gray-400"></i>
                        </button>

                        <button type="button" role="menuitem" onclick="closeProfileDropdown(); logout()" class="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-red-500 transition-colors hover:bg-red-50">
                            <i class="fa-solid fa-arrow-right-from-bracket text-lg"></i>
                            <span>Keluar</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero -->
        <div class="relative mb-6">
            <img src="aset/bunga-tangkai.png" alt="" class="absolute -top-6 left-[31%] w-16 opacity-95 pointer-events-none z-20 transform rotate-[65deg]">

            <section class="hero-gradient relative flex min-h-[190px] items-center justify-between overflow-hidden rounded-[24px] border border-white/80 px-5 py-6 shadow-sm sm:min-h-[215px] sm:rounded-[28px] sm:px-8 sm:py-7 lg:px-10">
                <img src="aset/bunga-pojok.png" alt="" class="absolute -top-1 -left-1 w-28 opacity-95 pointer-events-none z-0 transform -scale-y-100">
                <img src="aset/bunga-pojok.png" alt="" class="absolute -bottom-1 -left-1 w-24 opacity-95 pointer-events-none z-0">
                <img src="aset/bunga-pink.png" alt="" class="absolute -top-1 left-[53%] w-32 opacity-95 pointer-events-none z-10 transform rotate-[10deg]">
                <img src="aset/bunga-pink.png" alt="" class="absolute -bottom-1 left-[44%] w-32 opacity-95 pointer-events-none z-20">
                <img src="aset/kilauan.png" alt="" class="absolute top-6 left-[41%] w-6 h-6 opacity-75 pointer-events-none z-0">
                <img src="aset/bintang.png" alt="" class="absolute top-8 left-[46.5%] w-4 h-4 opacity-80 pointer-events-none z-0">
                <img src="aset/bintang.png" alt="" class="absolute top-16 left-[57%] w-3 h-3 opacity-70 pointer-events-none z-0">
                <img src="aset/hati-koral.png" alt="" class="absolute top-[42%] left-[51%] w-6 h-6 opacity-75 pointer-events-none z-0 transform -rotate-12">
                <img src="aset/hati-koral.png" alt="" class="absolute bottom-12 left-[55%] w-4 h-4 opacity-70 pointer-events-none z-0 transform rotate-12">
                <img src="aset/bintang.png" alt="" class="absolute bottom-7 left-[52.5%] w-3.5 h-3.5 opacity-75 pointer-events-none z-0">
                <img src="aset/kilauan.png" alt="" class="absolute bottom-14 left-[48%] w-4 h-4 opacity-50 pointer-events-none z-0">

                <div class="relative z-10 max-w-lg py-1 pl-1">
                    <h3 class="mb-1 text-[29px] font-black leading-tight tracking-tight text-[#1E1B4B] sm:text-[34px] lg:text-[40px]">
                        Halo, ${namaDepan}!
                    </h3>

                    <p class="mb-5 text-[14px] font-medium text-[#1E1B4B]/85 sm:text-[17px]">
                        Siap menata langkah belajarmu hari ini?
                    </p>

                    <div class="flex flex-wrap gap-3">
                        <button type="button" onclick="bukaTambahTugas()" class="inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-[#1D63DC] px-4 py-2.5 text-[13px] font-bold text-white shadow-md shadow-blue-400/30 transition-all hover:bg-blue-700 sm:px-6 sm:text-[14px]">
                            <i class="fa-solid fa-plus text-base"></i>
                            Tambah Tugas
                        </button>

                        <button type="button" onclick="bukaTambahCatatan()" class="inline-flex min-h-11 items-center gap-2.5 rounded-xl border-[1.5px] border-[#1D63DC]/60 bg-white/60 px-4 py-2.5 text-[13px] font-bold text-[#1D63DC] shadow-sm transition-all hover:bg-white sm:px-6 sm:text-[14px]">
                            <i class="fa-solid fa-plus text-base"></i>
                            Tulis Catatan
                        </button>
                    </div>
                </div>

                <div class="hidden lg:flex items-end justify-end absolute right-0 bottom-0 w-[50%] h-full z-10 pointer-events-none">
                    <img src="aset/pastel-girl-5.png" alt="Ilustrasi Safira" class="w-full h-full object-contain object-right-bottom">
                </div>
            </section>
        </div>

        <!-- Statistik -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6 relative z-10">
            <div onclick="navigate('catatan')" class="cursor-pointer bg-[#FBE8EE]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/ranting-bunga.png" alt="" class="absolute top-1.5 right-2 w-10 opacity-85 pointer-events-none transform rotate-12">
                <img src="aset/bintang.png" alt="" class="absolute top-2.5 right-12 w-2.5 h-2.5 opacity-60 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#F9D8E4] rounded-2xl flex items-center justify-center text-[#1E1B4B] text-2xl shrink-0 z-10">
                    <i class="fa-solid fa-book-open"></i>
                </div>
                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Total Catatan</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">${totalCatatan}</h4>
                </div>
                <i class="fa-solid fa-book-open absolute bottom-3 right-5 text-[44px] text-[#E11D48]/10 pointer-events-none z-0"></i>
            </div>

            <div onclick="navigate('tugas')" class="cursor-pointer bg-[#EBF3FE]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/kilauan.png" alt="" class="absolute top-2 right-3 w-5 h-5 opacity-75 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#DCE8FD] rounded-2xl flex items-center justify-center text-[#1D63DC] text-2xl shrink-0 z-10">
                    <i class="fa-regular fa-square-check"></i>
                </div>
                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Tugas Aktif</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">${tugasAktif}</h4>
                </div>
                <i class="fa-regular fa-file-lines absolute bottom-3 right-5 text-[44px] text-[#1D63DC]/15 pointer-events-none z-0"></i>
            </div>

            <div onclick="navigate('tugas')" class="cursor-pointer bg-[#EBF9F1]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/ranting-bunga.png" alt="" class="absolute top-1.5 right-2 w-10 opacity-85 pointer-events-none transform rotate-12">
                <img src="aset/bintang.png" alt="" class="absolute top-2.5 right-12 w-2.5 h-2.5 opacity-60 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#D3F3E0] rounded-2xl flex items-center justify-center text-[#15803D] text-2xl shrink-0 z-10">
                    <i class="fa-regular fa-circle-check"></i>
                </div>
                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Tugas Selesai</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">${tugasSelesai}</h4>
                </div>
                <i class="fa-regular fa-circle-check absolute bottom-3 right-5 text-[44px] text-[#15803D]/15 pointer-events-none z-0"></i>
            </div>

            <div onclick="navigate('jadwal')" class="cursor-pointer bg-[#F6EEFD]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/tulip-mini.png" alt="" class="absolute top-1.5 right-1.5 w-11 opacity-85 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#EAD8FA] rounded-2xl flex items-center justify-center text-[#1E1B4B] text-2xl shrink-0 z-10">
                    <i class="fa-regular fa-calendar-days"></i>
                </div>
                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Kelas Hari Ini</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">${jadwalHariIni.length}</h4>
                </div>
                <i class="fa-regular fa-calendar-days absolute bottom-3 right-5 text-[44px] text-[#7E22CE]/15 pointer-events-none z-0"></i>
            </div>
        </section>

        <!-- Main Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            <!-- KOLOM KIRI -->
            <div class="lg:col-span-7 space-y-6">
                <!-- Deadline Terdekat -->
                <div class="relative overflow-hidden rounded-[22px] border border-white bg-white/75 p-4 shadow-sm backdrop-blur-md sm:rounded-[28px] sm:p-6">
                    <img src="aset/kilauan.png" alt="" class="absolute top-4 left-2 w-4 h-4 opacity-70 pointer-events-none">
                    <img src="aset/kilauan.png" alt="" class="absolute top-3 right-3 w-4 h-4 opacity-60 pointer-events-none">
                    <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-3 w-3 h-3 opacity-70 pointer-events-none">
                    <img src="aset/lavender.png" alt="" class="absolute bottom-1 right-2 w-11 opacity-80 pointer-events-none">

                    <div class="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <h3 class="text-[20px] font-black text-[#1E1B4B]">Deadline Terdekat</h3>
                            <img src="aset/bunga-tangkai.png" alt="" class="w-11 opacity-90 pointer-events-none transform rotate-[65deg] -mt-1">
                            <img src="aset/tulip-mini.png" alt="" class="w-8 opacity-75 pointer-events-none -ml-3 -mt-2">
                        </div>
                        <a href="javascript:void(0)" onclick="navigate('tugas')" class="text-[13px] font-bold text-[#1D63DC] hover:underline flex items-center gap-1.5">
                            Lihat Semua <i class="fa-solid fa-chevron-right text-[10px]"></i>
                        </a>
                    </div>

                    <div class="space-y-3 relative z-10">
                        ${deadlineHTML}
                    </div>
                </div>

                <!-- Catatan Terbaru -->
                <div class="relative overflow-hidden rounded-[22px] border border-white bg-white/75 p-4 shadow-sm backdrop-blur-md sm:rounded-[28px] sm:p-6">
                    <img src="aset/bintang.png" alt="" class="absolute top-4 left-2.5 w-3 h-3 opacity-70 pointer-events-none">
                    <img src="aset/bintang.png" alt="" class="absolute top-4 right-36 w-3 h-3 opacity-70 pointer-events-none">
                    <img src="aset/kilauan.png" alt="" class="absolute top-5 right-28 w-4 h-4 opacity-70 pointer-events-none">
                    <img src="aset/bintang.png" alt="" class="absolute bottom-2.5 left-3 w-3 h-3 opacity-75 pointer-events-none">
                    <img src="aset/bunga-tangkai.png" alt="" class="absolute -bottom-2 right-3 w-12 opacity-85 pointer-events-none transform rotate-[55deg]">

                    <div class="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <h3 class="text-[20px] font-black text-[#1E1B4B]">Catatan Terbaru</h3>
                            <img src="aset/bunga-tangkai.png" alt="" class="w-11 opacity-90 pointer-events-none transform rotate-[65deg] -mt-1">
                            <img src="aset/bintang.png" alt="" class="w-2.5 h-2.5 opacity-65 pointer-events-none -ml-1 -mt-2">
                        </div>
                        <a href="javascript:void(0)" onclick="navigate('catatan')" class="text-[13px] font-bold text-[#1D63DC] hover:underline flex items-center gap-1.5">
                            Lihat Semua <i class="fa-solid fa-chevron-right text-[10px]"></i>
                        </a>
                    </div>

                    <div class="divide-y divide-gray-200/60 relative z-10">
                        ${catatanHTML}
                    </div>
                </div>
            </div>

            <!-- KOLOM KANAN -->
            <div class="lg:col-span-5 space-y-6">
                <!-- Jadwal Hari Ini -->
                <div class="relative overflow-hidden rounded-[22px] border border-white bg-white/75 p-4 shadow-sm backdrop-blur-md sm:rounded-[28px] sm:p-6">
                    <img src="aset/bintang.png" alt="" class="absolute top-3 right-2.5 w-3 h-3 opacity-60 pointer-events-none">
                    <img src="aset/tulip-mini.png" alt="" class="absolute bottom-1.5 left-2 w-10 opacity-75 pointer-events-none">
                    <img src="aset/tulip-mini.png" alt="" class="absolute bottom-1 right-1 w-14 opacity-90 pointer-events-none">

                    <div class="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <h3 class="text-[20px] font-black text-[#1E1B4B]">Jadwal Hari Ini</h3>
                            <img src="aset/bunga-tangkai.png" alt="" class="w-10 opacity-90 pointer-events-none transform rotate-[65deg] -mt-1">
                            <img src="aset/bintang.png" alt="" class="w-2.5 h-2.5 opacity-70 pointer-events-none -ml-1 -mt-2">
                        </div>
                        <a href="javascript:void(0)" onclick="navigate('jadwal')" class="text-[13px] font-bold text-[#1D63DC] hover:underline flex items-center gap-1.5">
                            Lihat Jadwal <i class="fa-solid fa-chevron-right text-[10px]"></i>
                        </a>
                    </div>

                    <div class="divide-y divide-gray-200/60 relative z-10">
                        ${jadwalHTML}
                    </div>
                </div>

                <!-- Progres Tugas -->
                <div class="relative overflow-hidden rounded-[22px] border border-white bg-white/75 p-4 shadow-sm backdrop-blur-md sm:rounded-[28px] sm:p-6">
                    <img src="aset/bintang.png" alt="" class="absolute top-3 right-2.5 w-3 h-3 opacity-60 pointer-events-none">
                    <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-3 w-3 h-3 opacity-75 pointer-events-none">
                    <img src="aset/lavender.png" alt="" class="absolute bottom-1 right-2 w-10 opacity-85 pointer-events-none">

                    <div class="relative z-10 mb-2 flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <h3 class="text-[20px] font-black text-[#1E1B4B]">Progres Tugas</h3>
                            <img src="aset/bunga-tangkai.png" alt="" class="w-10 opacity-90 pointer-events-none transform rotate-[65deg] -mt-1">
                            <img src="aset/bintang.png" alt="" class="w-2.5 h-2.5 opacity-70 pointer-events-none -ml-1 -mt-2">
                        </div>
                        <a href="javascript:void(0)" onclick="navigate('progres')" class="text-[13px] font-bold text-[#1D63DC] hover:underline flex items-center gap-1.5">
                            Lihat Progres <i class="fa-solid fa-chevron-right text-[10px]"></i>
                        </a>
                    </div>

                    <div class="relative z-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div class="w-full pr-0 sm:w-[70%] sm:pr-2">
                            <h2 class="text-[46px] font-black text-[#1E1B4B] leading-none mb-3 tracking-tight">${persenTugas}%</h2>
                            <div class="w-full bg-[#D1D5DB]/80 rounded-full h-3.5 mb-2 overflow-hidden">
                                <div class="bg-[#1D63DC] h-3.5 rounded-full transition-all duration-500" style="width: ${persenTugas}%"></div>
                            </div>
                            <p class="text-[13px] text-[#1E1B4B]/75 font-medium">${tugasSelesai} dari ${totalTugas} tugas selesai</p>
                        </div>
                        <div class="hidden w-[30%] justify-end sm:flex">
                            <img src="aset/buku-3.png" alt="Tumpukan Buku" class="w-28 object-contain transform translate-y-1">
                        </div>
                    </div>
                </div>

                <!-- Review Target Belajar -->
                <div class="relative overflow-hidden rounded-[22px] border border-white bg-white/75 p-4 shadow-sm backdrop-blur-md sm:rounded-[28px] sm:p-6">
                    <img src="aset/bintang.png" alt="" class="absolute top-4 left-2 w-3 h-3 opacity-70 pointer-events-none">
                    <img src="aset/bintang.png" alt="" class="absolute top-3 right-2.5 w-3 h-3 opacity-60 pointer-events-none">
                    <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-3 w-3 h-3 opacity-75 pointer-events-none">
                    <img src="aset/lavender.png" alt="" class="absolute bottom-1 right-2 w-10 opacity-85 pointer-events-none">

                    <div class="relative z-10 mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div class="flex items-center gap-1.5">
                            <h3 class="text-[20px] font-black text-[#1E1B4B]">Review Target Belajar</h3>
                            <img src="aset/bunga-tangkai.png" alt="" class="w-10 opacity-90 pointer-events-none transform rotate-[65deg] -mt-1">
                            <img src="aset/bintang.png" alt="" class="w-2.5 h-2.5 opacity-70 pointer-events-none -ml-1 -mt-2">
                        </div>
                        <a href="javascript:void(0)" onclick="navigate('progres')" class="text-[13px] font-bold text-[#1D63DC] hover:underline flex items-center gap-1.5 shrink-0">
                            Lihat Semua <i class="fa-solid fa-chevron-right text-[10px]"></i>
                        </a>
                    </div>

                    <div class="divide-y divide-gray-200/60 relative z-10">
                        ${targetHTML}
                    </div>
                </div>
                </div>
            window.addEventListener("safira:matkul-save", () => {
            simpanSemuaDataKeCloud();
            });
                </div>
    `;
}

window.renderDashboard = renderDashboard;