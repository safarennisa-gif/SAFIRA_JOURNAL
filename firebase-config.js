// ============================================================
// SAFIRA — INTEGRASI FIREBASE AUTH & FIRESTORE DATABASE
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyAVACLfJ2Y8shVGF0PU0U-qjtmbB2ri4jE",
  authDomain: "safira-journal.firebaseapp.com",
  projectId: "safira-journal",
  storageBucket: "safira-journal.firebasestorage.app",
  messagingSenderId: "256578888027",
  appId: "1:256578888027:web:8d189028deffc458063a7e",
  measurementId: "G-XBM8HE5D5C"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let currentUserUid = null;
let sedangMemuatData = false;

// ------------------------------------------------------------
// 1. SIMPAN & MUAT DATA KE FIRESTORE (users/{uid})
// ------------------------------------------------------------

async function simpanSemuaDataKeCloud() {
    if (!currentUserUid || sedangMemuatData) return;

    try {
        await db.collection("users").doc(currentUserUid).set({
            profil: typeof safiraProfileData !== "undefined" ? safiraProfileData : {},
            catatan: typeof daftarCatatan !== "undefined" ? daftarCatatan : [],
            tugas: typeof daftarTugas !== "undefined" ? daftarTugas : [],
            jadwal: typeof daftarJadwal !== "undefined" ? daftarJadwal : [],
            target: typeof daftarTarget !== "undefined" ? daftarTarget : [],
            matkul: typeof daftarMataKuliah !== "undefined" ? daftarMataKuliah : [],
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log("Data SAFIRA berhasil tersimpan ke Firestore.");
    } catch (error) {
        console.error("Gagal menyimpan ke Firestore:", error);
        alert("Gagal menyimpan ke database Firebase: " + error.message);
    }
}

async function muatDataDariCloud(user) {
    sedangMemuatData = true;
    currentUserUid = user.uid;

    try {
        const docRef = db.collection("users").doc(user.uid);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();

            if (data.profil && typeof safiraProfileData !== "undefined") {
                Object.assign(safiraProfileData, data.profil);
            }
            if (Array.isArray(data.catatan) && typeof daftarCatatan !== "undefined") {
                daftarCatatan.splice(0, daftarCatatan.length, ...data.catatan);
            }
            if (Array.isArray(data.tugas) && typeof daftarTugas !== "undefined") {
                daftarTugas.splice(0, daftarTugas.length, ...data.tugas);
            }
            if (Array.isArray(data.jadwal) && typeof daftarJadwal !== "undefined") {
                daftarJadwal.splice(0, daftarJadwal.length, ...data.jadwal);
            }
            if (Array.isArray(data.target) && typeof daftarTarget !== "undefined") {
                daftarTarget.splice(0, daftarTarget.length, ...data.target);
            }
            if (Array.isArray(data.matkul) && typeof daftarMataKuliah !== "undefined") {
                daftarMataKuliah.splice(0, daftarMataKuliah.length, ...data.matkul);
            }
        } else {
            // Akun baru: sinkronkan nama & email lalu simpan data awal
            if (typeof safiraProfileData !== "undefined") {
                safiraProfileData.full_name = user.displayName || safiraProfileData.full_name;
                safiraProfileData.email = user.email || safiraProfileData.email;
            }
            sedangMemuatData = false;
            await simpanSemuaDataKeCloud();
        }
    } catch (error) {
        console.error("Gagal memuat data dari Firestore:", error);
    } finally {
        sedangMemuatData = false;
    }
}

// ------------------------------------------------------------
// 2. OTENTIKASI (LOGIN, DAFTAR, LOGOUT)
// ------------------------------------------------------------

window.handleSafiraAuthSubmit = async function (event, mode = "login") {
    if (event) event.preventDefault();
    const form = event?.currentTarget;
    if (!form || !form.checkValidity()) {
        form?.reportValidity();
        return false;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const teksAsli = submitBtn ? submitBtn.innerHTML : "";
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Memproses...`;
    }

    try {
        if (mode === "daftar") {
            const nama = document.getElementById("safira-register-name")?.value.trim();
            const email = document.getElementById("safira-register-email")?.value.trim();
            const password = document.getElementById("safira-register-password")?.value;
            const confirm = document.getElementById("safira-register-password-confirm")?.value;

            if (password !== confirm) {
                alert("Konfirmasi kata sandi belum sama.");
                return false;
            }
            if (password.length < 6) {
                alert("Kata sandi minimal 6 karakter.");
                return false;
            }

            const cred = await auth.createUserWithEmailAndPassword(email, password);
            await cred.user.updateProfile({ displayName: nama });

            if (typeof safiraProfileData !== "undefined") {
                safiraProfileData.full_name = nama;
                safiraProfileData.email = email;
            }
        } else {
            const email = document.getElementById("safira-login-email")?.value.trim();
            const password = document.getElementById("safira-login-password")?.value;
            await auth.signInWithEmailAndPassword(email, password);
        }
    } catch (error) {
        const pesanError = {
            "auth/email-already-in-use": "Email ini sudah terdaftar. Silakan masuk.",
            "auth/invalid-email": "Format email tidak valid.",
            "auth/weak-password": "Kata sandi terlalu lemah (minimal 6 karakter).",
            "auth/user-not-found": "Akun tidak ditemukan.",
            "auth/wrong-password": "Kata sandi salah.",
            "auth/invalid-credential": "Email atau kata sandi salah."
        };
        alert(pesanError[error.code] || "Gagal memproses akun: " + error.message);
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = teksAsli;
        }
    }

    return false;
};

// Login / Daftar menggunakan akun Google
window.handleSafiraGoogleLogin = async function (button) {
    const teksAsli = button ? button.innerHTML : "";
    if (button) {
        button.disabled = true;
        button.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Menghubungkan ke Google...`;
    }

    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        await auth.signInWithPopup(provider);
        // Setelah berhasil, auth.onAuthStateChanged otomatis memuat data & membuka dashboard
    } catch (error) {
        if (error.code !== "auth/popup-closed-by-user" && error.code !== "auth/cancelled-popup-request") {
            const pesanError = {
                "auth/popup-blocked": "Popup diblokir browser. Izinkan popup untuk masuk dengan Google.",
                "auth/unauthorized-domain": "Domain ini belum diizinkan di Firebase Console (Authorized domains)."
            };
            alert(pesanError[error.code] || "Gagal masuk dengan Google: " + error.message);
        }
    } finally {
        if (button) {
            button.disabled = false;
            button.innerHTML = teksAsli;
        }
    }
};

// Hubungkan tombol Keluar dengan Firebase SignOut
const showLandingAsli = window.showLanding;
window.logout = async function () {
    await auth.signOut();
    currentUserUid = null;
    if (typeof showLandingAsli === "function") showLandingAsli();
};

// Pantau sesi login otomatis saat halaman dibuka / di-refresh
auth.onAuthStateChanged(async (user) => {
    if (user) {
        await muatDataDariCloud(user);
        if (typeof window.doLogin === "function") {
            window.doLogin();
        }
    } else {
        currentUserUid = null;
        if (typeof showLandingAsli === "function") {
            showLandingAsli();
        }
    }
});

// ------------------------------------------------------------
// 3. SINKRONISASI OTOMATIS SETIAP ADA PERUBAHAN DATA
// ------------------------------------------------------------

function bungkusDenganSync(namaFungsi) {
    const fungsiAsli = window[namaFungsi];
    if (typeof fungsiAsli !== "function") return;

    window[namaFungsi] = function (...args) {
        const hasil = fungsiAsli.apply(this, args);
        simpanSemuaDataKeCloud();
        return hasil;
    };
}

// Otomatis simpan ke Firestore saat fungsi CRUD dipanggil
[
    "aksiSimpanCatatan",
    "aksiKonfirmasiHapus",
    "aksiSimpanTugas",
    "gantiStatusTugas",
    "aksiKonfirmasiHapusTugas",
    "aksiSimpanJadwal",
    "aksiKonfirmasiHapusJadwal",
    "aksiSimpanTarget",
    "aksiKonfirmasiHapusTarget",
    "toggleLangkahUtama"
].forEach(bungkusDenganSync);

// Sinkronkan saat profil disimpan (event dari profil.js)
window.addEventListener("safira:profile-save", () => {
    simpanSemuaDataKeCloud();
    const feedback = document.getElementById("safira-profile-feedback");
    if (feedback) {
        feedback.textContent = "Perubahan profil berhasil disimpan ke cloud.";
    }
});

window.addEventListener("safira:matkul-save", () => {
    simpanSemuaDataKeCloud();
});