/* ============================================================
   SAFIRA ACADEMIC JOURNAL — MODUL WAKTU REAL-TIME
   Menampilkan tanggal & jam live (berjalan setiap detik)
   di seluruh halaman tanpa mengubah banyak file modul.
   ============================================================ */

(function () {
    "use strict";

    // ========================================================
    // 1. KONFIGURASI
    // ========================================================
    const CONFIG = {
        locale: "id-ID",
        tampilkanDetik: true,
        // Ubah ke false jika ingin perhitungan deadline tugas
        // tetap menggunakan tanggal dummy (13 Okt 2026) untuk demo.
        sinkronDeadlineTugas: true
    };

    let clockIntervalId = null;

    // ========================================================
    // 2. HELPER FORMAT WAKTU REAL-TIME (LOKAL DEVICE)
    // ========================================================
    const SafiraTime = {
        getSekarang: function () {
            return new Date();
        },

        // Contoh: "Jumat, 20 November 2026"
        getTanggalLengkap: function (date = new Date()) {
            try {
                return date.toLocaleDateString(CONFIG.locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                });
            } catch (error) {
                console.error("Gagal memformat tanggal lengkap:", error);
                return date.toDateString();
            }
        },

        // Contoh: "Jumat, 20 November"
        getTanggalSingkat: function (date = new Date()) {
            try {
                return date.toLocaleDateString(CONFIG.locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long"
                });
            } catch (error) {
                console.error("Gagal memformat tanggal singkat:", error);
                return date.toDateString();
            }
        },

        // Contoh: "20 Nov 2026"
        getTanggalPendek: function (date = new Date()) {
            try {
                return date.toLocaleDateString(CONFIG.locale, {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                });
            } catch (error) {
                console.error("Gagal memformat tanggal pendek:", error);
                return date.toDateString();
            }
        },

        // Contoh: "Jumat"
        getNamaHariIni: function (date = new Date()) {
            try {
                return date.toLocaleDateString(CONFIG.locale, {
                    weekday: "long"
                });
            } catch (error) {
                console.error("Gagal mengambil nama hari:", error);
                return "Senin";
            }
        },

        // Contoh: "2026-11-20" (menggunakan zona waktu lokal, bukan UTC)
        getTanggalISO: function (date = new Date()) {
            const tahun = date.getFullYear();
            const bulan = String(date.getMonth() + 1).padStart(2, "0");
            const tanggal = String(date.getDate()).padStart(2, "0");
            return `${tahun}-${bulan}-${tanggal}`;
        },

        // Contoh: "00:08:15"
        getJamRealtime: function (date = new Date()) {
            try {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                const detik = String(date.getSeconds()).padStart(2, "0");
                return CONFIG.tampilkanDetik
                    ? `${jam}:${menit}:${detik}`
                    : `${jam}:${menit}`;
            } catch (error) {
                console.error("Gagal memformat jam:", error);
                return "00:00:00";
            }
        }
    };

    // Ekspos ke window agar bisa dipakai di modul lain jika dibutuhkan
    window.SafiraTime = SafiraTime;

    // ========================================================
    // 3. DETEKSI & SINKRONISASI ELEMEN TANGGAL DI DOM
    // ========================================================

    // Regex untuk mengenali teks tanggal bawaan yang masih statis
    const REGEX_TANGGAL_LENGKAP = /^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s+\d{1,2}\s+[A-Za-z]+\s+\d{4}$/i;
    const REGEX_TANGGAL_SINGKAT = /^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s+\d{1,2}\s+[A-Za-z]+$/i;

    function tandaiElemenWaktu() {
        try {
            const appContent = document.getElementById("app-content");
            if (!appContent) return;

            // 1. Cari span tanggal pada <header> di setiap halaman
            const headerSpans = appContent.querySelectorAll("header span");
            headerSpans.forEach((span) => {
                if (span.dataset.safiraClock === "header") return;

                const teks = span.textContent.trim();
                if (REGEX_TANGGAL_LENGKAP.test(teks)) {
                    span.dataset.safiraClock = "header";
                    span.setAttribute("aria-live", "off");
                }
            });

            // 2. Cari teks tanggal singkat pada panel "Jadwal Hari Ini"
            const paragraphs = appContent.querySelectorAll("p");
            paragraphs.forEach((p) => {
                if (p.dataset.safiraClock === "short-date") return;

                const teks = p.textContent.trim();
                if (REGEX_TANGGAL_SINGKAT.test(teks)) {
                    p.dataset.safiraClock = "short-date";
                }
            });
        } catch (error) {
            console.error("Gagal menandai elemen waktu SAFIRA:", error);
        }
    }

    function perbaruiTampilanWaktu() {
        try {
            const sekarang = SafiraTime.getSekarang();
            const tanggalLengkap = SafiraTime.getTanggalLengkap(sekarang);
            const tanggalSingkat = SafiraTime.getTanggalSingkat(sekarang);
            const jamLive = SafiraTime.getJamRealtime(sekarang);

            // Perbarui tanggal & jam di header
            document.querySelectorAll('[data-safira-clock="header"]').forEach((el) => {
                el.innerHTML = `
                    <span class="inline-flex items-center gap-2.5">
                        <span>${tanggalLengkap}</span>
                        <span class="inline-flex items-center gap-1.5 rounded-full border border-[#DCCBFF] bg-white/75 px-2.5 py-0.5 text-[12px] font-extrabold tabular-nums text-[#4C2A86] shadow-sm sm:text-[13px]">
                            <i class="fa-regular fa-clock text-[11px] text-[#0864F7]"></i>
                            <span>${jamLive}</span>
                        </span>
                    </span>
                `;
            });

            // Perbarui tanggal singkat (misal di panel Jadwal Hari Ini)
            document.querySelectorAll('[data-safira-clock="short-date"]').forEach((el) => {
                el.textContent = tanggalSingkat;
            });
        } catch (error) {
            console.error("Gagal memperbarui tampilan waktu:", error);
        }
    }

    function mulaiJamRealtime() {
        tandaiElemenWaktu();
        perbaruiTampilanWaktu();

        if (clockIntervalId !== null) {
            clearInterval(clockIntervalId);
        }

        clockIntervalId = setInterval(perbaruiTampilanWaktu, 1000);
    }

    // ========================================================
    // 4. SINKRONISASI MODUL TUGAS (DEADLINE REAL-TIME)
    // ========================================================
    function hubungkanModulTugas() {
        if (!CONFIG.sinkronDeadlineTugas) return;

        try {
            // Perbarui tanggal header & pembaruan pada tugas.js
            if (typeof window.formatTanggalHeaderTugas === "function") {
                window.formatTanggalHeaderTugas = function () {
                    return SafiraTime.getTanggalLengkap();
                };
            }

            if (typeof window.formatTanggalPembaruanTugas === "function") {
                window.formatTanggalPembaruanTugas = function () {
                    return SafiraTime.getTanggalPendek();
                };
            }

            // Override perhitungan sisa hari deadline agar mengacu pada hari ini
            if (typeof window.getDeadlineInfoTugas === "function" && typeof window.parseTanggalLokalTugas === "function") {
                window.getDeadlineInfoTugas = function (dateStr, status) {
                    const defaultInfo = {
                        label: "",
                        badge: "",
                        dateClass: "text-[#554477]",
                        barClass: "bg-[#CBBBE8]",
                        rowClass: "bg-white/70",
                        iconBoxClass: "bg-[#F0EAFE] text-[#5B3A91]"
                    };

                    if (!dateStr) return defaultInfo;

                    const target = window.parseTanggalLokalTugas(dateStr);
                    const today = window.parseTanggalLokalTugas(SafiraTime.getTanggalISO());

                    if (!target || !today) return defaultInfo;

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
                };
            }
        } catch (error) {
            console.error("Gagal menyinkronkan modul tugas dengan waktu real-time:", error);
        }
    }

    // ========================================================
    // 5. INISIALISASI & EVENT LISTENER
    // ========================================================
    hubungkanModulTugas();

    // Setiap kali halaman berpindah (Dashboard, Catatan, Tugas, Jadwal, Progres, Profil)
    window.addEventListener("safira:pagechange", function () {
        mulaiJamRealtime();
    });

    // Saat dokumen selesai dimuat
    window.addEventListener("DOMContentLoaded", function () {
        mulaiJamRealtime();
    });
})();