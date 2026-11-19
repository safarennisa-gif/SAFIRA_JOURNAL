
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


// ==========================================
// RENDER HALAMAN DASHBOARD UTAMA
// ==========================================

function renderDashboard() {
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
                    aria-label="Buka menu profil Safira"
                    aria-haspopup="true"
                    aria-expanded="false"
                    aria-controls="profile-dropdown"
                    onclick="toggleProfileDropdown()"
                    class="relative z-50 flex items-center gap-3 rounded-full px-2 py-1 transition-colors hover:bg-white/40"
                >
                    <span class="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#E9D5FF] shadow-sm">
                        <img src="aset/avatar.png" alt="Foto profil Safira" class="h-full w-full object-cover">
                    </span>

                    <span class="flex items-center gap-1.5 text-[15px] font-bold text-[#1E1B4B] sm:text-[16px]">
                        Safira
                        <i id="profile-dropdown-icon" class="fa-solid fa-chevron-down text-xs text-[#1E1B4B] transition-transform"></i>
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
                    class="absolute right-0 top-14 z-50 hidden w-[min(320px,calc(100vw-32px))] origin-top-right overflow-hidden rounded-3xl border border-purple-100 bg-white shadow-xl"
                >
                    <div class="flex items-center gap-4 border-b border-gray-100 p-5">
                        <img src="aset/avatar.png" alt="" class="h-14 w-14 shrink-0 rounded-full border-2 border-purple-100 bg-[#E9D5FF] object-cover shadow-sm">

                        <div class="min-w-0">
                            <h4 class="font-bold text-gray-900 text-lg">Safira</h4>
                            <p class="text-xs font-medium text-gray-500">Mahasiswa &bull; Semester 3</p>
                            <p class="mt-1 truncate text-[11px] text-gray-400">safira@example.com</p>
                        </div>
                    </div>

                    <div class="p-3">
                        <button
                            type="button"
                            role="menuitem"
                            onclick="closeProfileDropdown(); navigate('profil')"
                            class="flex w-full items-center justify-between rounded-xl px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-brand-purple"
                        >
                            <span class="flex items-center gap-3">
                                <i class="fa-regular fa-user text-lg"></i>
                                <span>Lihat Profil</span>
                            </span>
                            <i class="fa-solid fa-chevron-right text-xs text-gray-400"></i>
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
                        Halo, Safira!
                    </h3>

                    <p class="mb-5 text-[14px] font-medium text-[#1E1B4B]/85 sm:text-[17px]">
                        Siap menata langkah belajarmu hari ini?
                    </p>

                    <div class="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onclick="navigate('tambahTugas')"
                            class="inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-[#1D63DC] px-4 py-2.5 text-[13px] font-bold text-white shadow-md shadow-blue-400/30 transition-all hover:bg-blue-700 sm:px-6 sm:text-[14px]"
                        >
                            <i class="fa-solid fa-plus text-base"></i>
                            Tambah Tugas
                        </button>

                        <button
                            type="button"
                            onclick="navigate('tambahCatatan')"
                            class="inline-flex min-h-11 items-center gap-2.5 rounded-xl border-[1.5px] border-[#1D63DC]/60 bg-white/60 px-4 py-2.5 text-[13px] font-bold text-[#1D63DC] shadow-sm transition-all hover:bg-white sm:px-6 sm:text-[14px]"
                        >
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

            <!-- Total Catatan -->
            <div class="bg-[#FBE8EE]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/ranting-bunga.png" alt="" class="absolute top-1.5 right-2 w-10 opacity-85 pointer-events-none transform rotate-12">
                <img src="aset/bintang.png" alt="" class="absolute top-2.5 right-12 w-2.5 h-2.5 opacity-60 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#F9D8E4] rounded-2xl flex items-center justify-center text-[#1E1B4B] text-2xl shrink-0 z-10">
                    <i class="fa-solid fa-book-open"></i>
                </div>

                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Total Catatan</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">12</h4>
                </div>

                <i class="fa-solid fa-book-open absolute bottom-3 right-5 text-[44px] text-[#E11D48]/10 pointer-events-none z-0"></i>
            </div>

            <!-- Tugas Aktif -->
            <div class="bg-[#EBF3FE]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/kilauan.png" alt="" class="absolute top-2 right-3 w-5 h-5 opacity-75 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#DCE8FD] rounded-2xl flex items-center justify-center text-[#1D63DC] text-2xl shrink-0 z-10">
                    <i class="fa-regular fa-square-check"></i>
                </div>

                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Tugas Aktif</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">4</h4>
                </div>

                <i class="fa-regular fa-file-lines absolute bottom-3 right-5 text-[44px] text-[#1D63DC]/15 pointer-events-none z-0"></i>
            </div>

            <!-- Tugas Selesai -->
            <div class="bg-[#EBF9F1]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/ranting-bunga.png" alt="" class="absolute top-1.5 right-2 w-10 opacity-85 pointer-events-none transform rotate-12">
                <img src="aset/bintang.png" alt="" class="absolute top-2.5 right-12 w-2.5 h-2.5 opacity-60 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#D3F3E0] rounded-2xl flex items-center justify-center text-[#15803D] text-2xl shrink-0 z-10">
                    <i class="fa-regular fa-circle-check"></i>
                </div>

                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Tugas Selesai</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">8</h4>
                </div>

                <i class="fa-regular fa-circle-check absolute bottom-3 right-5 text-[44px] text-[#15803D]/15 pointer-events-none z-0"></i>
            </div>

            <!-- Kelas Hari Ini -->
            <div class="bg-[#F6EEFD]/85 backdrop-blur-sm border border-white rounded-[24px] px-5 py-4 flex items-center gap-4 shadow-sm relative overflow-hidden">
                <img src="aset/tulip-mini.png" alt="" class="absolute top-1.5 right-1.5 w-11 opacity-85 pointer-events-none">
                <img src="aset/ranting-bunga.png" alt="" class="absolute -bottom-1 left-1.5 w-8 opacity-60 pointer-events-none transform -rotate-45">
                <img src="aset/bintang.png" alt="" class="absolute bottom-2 left-8 w-2.5 h-2.5 opacity-70 pointer-events-none">

                <div class="w-14 h-14 p-3.5 bg-[#EAD8FA] rounded-2xl flex items-center justify-center text-[#1E1B4B] text-2xl shrink-0 z-10">
                    <i class="fa-regular fa-calendar-days"></i>
                </div>

                <div class="z-10">
                    <p class="text-[13px] font-bold text-[#1E1B4B] mb-0.5">Kelas Hari Ini</p>
                    <h4 class="text-[34px] font-black text-[#1E1B4B] leading-none">2</h4>
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
                        <!-- Item 1 -->
                        <div class="flex flex-col justify-between gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center bg-[#FFF5F6] border border-pink-100/80 border-l-[6px] border-l-[#EF4444] shadow-sm">
                            <div class="flex min-w-0 items-center gap-3 sm:gap-4">
                                <div class="w-11 h-11 rounded-xl bg-[#FFE4E6] flex items-center justify-center text-[#EF4444] shrink-0">
                                    <i class="fa-regular fa-file-lines text-lg"></i>
                                </div>
                                <div class="min-w-0">
                                    <h4 class="break-words font-bold text-[#1E1B4B] text-[14px] sm:text-[15px]">Rancangan Website</h4>
                                    <p class="mt-0.5 break-words text-[12px] font-medium text-[#1E1B4B]/65 sm:text-[13px]">Desain Web <span class="mx-1">&bull;</span> 14 Okt</p>
                                </div>
                            </div>

                            <div class="flex w-full flex-col items-center sm:w-[110px] sm:min-w-[110px]">
                                <span class="w-full py-1 px-3 bg-[#EF4444] text-white text-[12px] font-bold rounded-full flex items-center justify-center gap-1.5 shadow-sm">
                                    <i class="fa-regular fa-clock"></i> Besok
                                </span>
                                <span class="text-[12px] text-[#1E1B4B]/70 font-medium mt-1">Dikerjakan</span>
                            </div>
                        </div>

                        <!-- Item 2 -->
                        <div class="flex flex-col justify-between gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center bg-[#FFFDF9] border border-orange-100/80 border-l-[6px] border-l-[#F97316] shadow-sm">
                            <div class="flex min-w-0 items-center gap-3 sm:gap-4">
                                <div class="w-11 h-11 rounded-xl bg-[#FFEDD5] flex items-center justify-center text-[#F97316] shrink-0">
                                    <i class="fa-regular fa-file-lines text-lg"></i>
                                </div>
                                <div class="min-w-0">
                                    <h4 class="break-words font-bold text-[#1E1B4B] text-[14px] sm:text-[15px]">Ringkasan Memori</h4>
                                    <p class="mt-0.5 break-words text-[12px] font-medium text-[#1E1B4B]/65 sm:text-[13px]">Psikologi Kognitif <span class="mx-1">&bull;</span> 15 Okt</p>
                                </div>
                            </div>

                            <div class="flex w-full flex-col items-center sm:w-[110px] sm:min-w-[110px]">
                                <span class="w-full py-1 px-3 bg-[#EA580C] text-white text-[12px] font-bold rounded-full flex items-center justify-center gap-1.5 shadow-sm">
                                    <i class="fa-regular fa-clock"></i> 2 hari lagi
                                </span>
                                <span class="text-[12px] text-[#1E1B4B]/70 font-medium mt-1">Belum Mulai</span>
                            </div>
                        </div>

                        <!-- Item 3 -->
                        <div class="flex flex-col justify-between gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center bg-[#FFFDF9] border border-orange-100/80 border-l-[6px] border-l-[#F97316] shadow-sm">
                            <div class="flex min-w-0 items-center gap-3 sm:gap-4">
                                <div class="w-11 h-11 rounded-xl bg-[#FFEDD5] flex items-center justify-center text-[#F97316] shrink-0">
                                    <i class="fa-regular fa-file-lines text-lg"></i>
                                </div>
                                <div class="min-w-0">
                                    <h4 class="break-words font-bold text-[#1E1B4B] text-[14px] sm:text-[15px]">Analisis Kasus</h4>
                                    <p class="mt-0.5 break-words text-[12px] font-medium text-[#1E1B4B]/65 sm:text-[13px]">Strategi Pemecahan Masalah <span class="mx-1">&bull;</span> 16 Okt</p>
                                </div>
                            </div>

                            <div class="flex w-full flex-col items-center sm:w-[110px] sm:min-w-[110px]">
                                <span class="w-full py-1 px-3 bg-[#EA580C] text-white text-[12px] font-bold rounded-full flex items-center justify-center gap-1.5 shadow-sm">
                                    <i class="fa-regular fa-clock"></i> 3 hari lagi
                                </span>
                                <span class="text-[12px] text-[#1E1B4B]/70 font-medium mt-1">Belum Mulai</span>
                            </div>
                        </div>
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
                        <div class="flex items-center justify-between py-3 px-2 hover:bg-white/50 rounded-xl transition-all cursor-pointer group">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-xl bg-[#E0E7FF]/80 flex items-center justify-center text-[#4F46E5] shrink-0">
                                    <i class="fa-solid fa-book-open text-lg"></i>
                                </div>
                                <div class="min-w-0">
                                    <h4 class="break-words font-bold text-[#1E1B4B] text-[14px] sm:text-[15px]">Dasar HTML & CSS</h4>
                                    <p class="mt-0.5 break-words text-[12px] font-medium text-[#1E1B4B]/65 sm:text-[13px]">Desain Web <span class="mx-1">&bull;</span> 12 Okt</p>
                                </div>
                            </div>
                            <i class="fa-solid fa-chevron-right text-[#1E1B4B]/50 group-hover:text-[#1D63DC] text-xs pr-3"></i>
                        </div>

                        <div class="flex items-center justify-between py-3 px-2 hover:bg-white/50 rounded-xl transition-all cursor-pointer group">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-xl bg-[#FFE4E6]/80 flex items-center justify-center text-[#E11D48] shrink-0">
                                    <i class="fa-solid fa-book-open text-lg"></i>
                                </div>
                                <div class="min-w-0">
                                    <h4 class="break-words font-bold text-[#1E1B4B] text-[14px] sm:text-[15px]">Memori dan Perhatian</h4>
                                    <p class="mt-0.5 break-words text-[12px] font-medium text-[#1E1B4B]/65 sm:text-[13px]">Psikologi Kognitif <span class="mx-1">&bull;</span> 11 Okt</p>
                                </div>
                            </div>
                            <i class="fa-solid fa-chevron-right text-[#1E1B4B]/50 group-hover:text-[#1D63DC] text-xs pr-3"></i>
                        </div>
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
                        <div class="flex flex-col items-start gap-3 py-3 sm:flex-row sm:items-center sm:gap-4">
                            <div class="flex items-center gap-2 px-3.5 py-2.5 bg-[#FFE4E6]/90 text-[#1E1B4B] rounded-xl font-bold text-[12px] shrink-0">
                                <i class="fa-regular fa-clock text-[#E11D48] text-sm"></i>
                                <span>08.00 – 09.40</span>
                            </div>

                            <div>
                                <h4 class="font-bold text-[#1E1B4B] text-[15px]">Psikologi Kognitif</h4>
                                <p class="text-[13px] text-[#1E1B4B]/65 mt-0.5 flex items-center gap-1.5 font-medium">
                                    <i class="fa-solid fa-location-dot text-[#7E22CE]/60 text-xs"></i>
                                    Ruang B.203
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-col items-start gap-3 py-3 sm:flex-row sm:items-center sm:gap-4">
                            <div class="flex items-center gap-2 px-3.5 py-2.5 bg-[#E0E7FF]/90 text-[#1E1B4B] rounded-xl font-bold text-[12px] shrink-0">
                                <i class="fa-regular fa-clock text-[#1E1B4B] text-sm"></i>
                                <span>13.00 – 14.40</span>
                            </div>

                            <div>
                                <h4 class="font-bold text-[#1E1B4B] text-[15px]">Desain Web</h4>
                                <p class="text-[13px] text-[#1E1B4B]/65 mt-0.5 flex items-center gap-1.5 font-medium">
                                    <i class="fa-solid fa-location-dot text-[#7E22CE]/60 text-xs"></i>
                                    Lab Komputer
                                </p>
                            </div>
                        </div>
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
                            <h2 class="text-[46px] font-black text-[#1E1B4B] leading-none mb-3 tracking-tight">67%</h2>

                            <div class="w-full bg-[#D1D5DB]/80 rounded-full h-3.5 mb-2 overflow-hidden">
                                <div class="bg-[#1D63DC] h-3.5 rounded-full" style="width: 67%"></div>
                            </div>

                            <p class="text-[13px] text-[#1E1B4B]/75 font-medium">8 dari 12 tugas selesai</p>
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
                        <!-- Target 1 -->
                        <div class="flex items-center gap-3 py-2.5">
                            <div class="w-10 h-10 rounded-xl bg-[#E0E7FF]/80 flex items-center justify-center text-[#4F46E5] shrink-0">
                                <i class="fa-solid fa-book-open text-sm"></i>
                            </div>

                            <div class="flex-1 min-w-0">
                                <h4 class="text-[13px] font-bold text-[#1E1B4B] truncate">Kuasai Dasar HTML & CSS</h4>
                                <p class="text-[11px] text-[#1E1B4B]/65 font-medium">2 dari 3 langkah</p>
                            </div>

                            <div class="flex items-center gap-2.5 shrink-0">
                                <div class="w-24 bg-[#D1D5DB]/80 rounded-full h-2.5 overflow-hidden">
                                    <div class="bg-[#1D63DC] h-2.5 rounded-full" style="width: 67%"></div>
                                </div>
                                <span class="text-[13px] font-bold text-[#1E1B4B] w-9 text-right">67%</span>
                            </div>
                        </div>

                        <!-- Target 2 -->
                        <div class="flex items-center gap-3 py-2.5">
                            <div class="w-10 h-10 rounded-xl bg-[#FFE4E6]/80 flex items-center justify-center text-[#E11D48] shrink-0">
                                <i class="fa-solid fa-book-open text-sm"></i>
                            </div>

                            <div class="flex-1 min-w-0">
                                <h4 class="text-[13px] font-bold text-[#1E1B4B] truncate">Pahami Proses Memori</h4>
                                <p class="text-[11px] text-[#1E1B4B]/65 font-medium">1 dari 3 langkah</p>
                            </div>

                            <div class="flex items-center gap-2.5 shrink-0">
                                <div class="w-24 bg-[#D1D5DB]/80 rounded-full h-2.5 overflow-hidden">
                                    <div class="bg-[#D96B82] h-2.5 rounded-full" style="width: 33%"></div>
                                </div>
                                <span class="text-[13px] font-bold text-[#1E1B4B] w-9 text-right">33%</span>
                            </div>
                        </div>

                        <!-- Target 3 -->
                        <div class="flex items-center gap-3 py-2.5">
                            <div class="w-10 h-10 rounded-xl bg-[#DCFCE7]/90 flex items-center justify-center text-[#15803D] shrink-0">
                                <i class="fa-solid fa-book-open text-sm"></i>
                            </div>

                            <div class="flex-1 min-w-0">
                                <h4 class="text-[13px] font-bold text-[#1E1B4B] truncate">Latihan Analisis Kasus</h4>
                                <p class="text-[11px] text-[#1E1B4B]/65 font-medium">3 dari 3 langkah</p>
                            </div>

                            <div class="flex items-center gap-2.5 shrink-0">
                                <div class="w-24 bg-[#D1D5DB]/80 rounded-full h-2.5 overflow-hidden">
                                    <div class="bg-[#16A34A] h-2.5 rounded-full" style="width: 100%"></div>
                                </div>
                                <span class="text-[13px] font-bold text-[#1E1B4B] w-9 text-right">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

window.renderDashboard = renderDashboard;
