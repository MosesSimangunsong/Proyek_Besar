# Modular Implementation Website Personal untuk Ines

## 1. Tujuan Modular Implementation

Dokumen ini menjadi panduan eksekusi kode secara bertahap bersama AI/Codex untuk membangun website personal untuk Ines.

Website ini adalah **private interactive scrapbook website** dengan dua role utama:

1. **Ines**
2. **Admin / Moses**

Website memiliki fitur utama untuk Ines:

- Login menggunakan kode `230624`
- Home scrapbook welcome
- Gallery foto
- Daily message random per hari
- Love Letter Generator berdasarkan mood
- Reply text dari Ines
- Favorites dan history
- Background music
- Animasi dan visual scrapbook romantis

Website juga memiliki fitur utama untuk Admin / Moses:

- Login menggunakan admin code
- Admin Dashboard
- Melihat reply dari Ines
- Mengelola foto galeri
- Mengelola lagu website
- Mengelola love letter
- Mengelola daily message

Implementasi harus dilakukan secara modular agar setiap fitur bisa dibuat, dites, dan diperbaiki satu per satu.

---

## 2. Prinsip Utama Implementasi

Selama implementasi, AI/Codex harus mengikuti prinsip berikut:

```text
1. Kerjakan satu phase sampai stabil sebelum masuk ke phase berikutnya.
2. Jangan langsung memasang semua library UI sekaligus.
3. Prioritaskan fitur inti terlebih dahulu, baru visual polish.
4. Website harus mendukung dua role: ines dan admin.
5. Login Ines menggunakan kode 230624.
6. Login Admin menggunakan admin code.
7. Role disimpan di localStorage untuk MVP awal.
8. Route harus dilindungi berdasarkan role.
9. Ines tidak boleh mengakses route admin.
10. Admin tidak perlu melihat navigasi Ines kecuali untuk preview.
11. Data konten tidak boleh hardcoded di dalam komponen UI.
12. Data lokal awal tetap boleh digunakan sebagai fallback.
13. Supabase digunakan untuk replies, photos, music, love letters, daily messages, favorites, dan history.
14. Semua logic Supabase harus berada di folder services.
15. Website harus mobile-first, terutama area Ines.
16. Admin area harus clean, rapi, dan fungsional.
17. Animasi harus halus, lembut, dan tidak berlebihan.
18. Background music tidak boleh autoplay sebelum user berinteraksi.
19. Jangan menambahkan dependency tanpa alasan jelas.
20. Setelah setiap phase selesai, berikan checklist testing.
3. Stack Final

Stack utama:

React
Vite
JavaScript
Tailwind CSS
Framer Motion / Motion
React Router
Supabase
Vercel

Library visual yang boleh digunakan secara selektif:

React Bits
Animate UI
Uiverse
Vengeance UI
Skiper UI

Library yang hanya dijadikan inspirasi visual:

Uilora
Animmaster Lib
4. Struktur Folder Target

Struktur folder yang disarankan:

src/
├── assets/
│   ├── images/
│   ├── audio/
│   └── textures/
│
├── components/
│   ├── common/
│   │   ├── AppLayout.jsx
│   │   ├── InesLayout.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── PageTransition.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── RoleRedirect.jsx
│   │   ├── MusicControl.jsx
│   │   ├── Toast.jsx
│   │   ├── EmptyState.jsx
│   │   ├── LoadingState.jsx
│   │   └── ConfirmDialog.jsx
│   │
│   ├── scrapbook/
│   │   ├── PolaroidCard.jsx
│   │   ├── ScrapbookCard.jsx
│   │   ├── WashiTape.jsx
│   │   ├── PaperNote.jsx
│   │   └── FloatingDecorations.jsx
│   │
│   ├── gallery/
│   │   ├── GalleryGrid.jsx
│   │   ├── GalleryFilter.jsx
│   │   ├── PhotoLightbox.jsx
│   │   └── GalleryPhotoCard.jsx
│   │
│   ├── letters/
│   │   ├── MoodSelector.jsx
│   │   ├── MoodCard.jsx
│   │   ├── LetterRenderer.jsx
│   │   ├── TypewriterLetter.jsx
│   │   ├── SoftFadeLetter.jsx
│   │   ├── StickyNoteLetter.jsx
│   │   ├── EnvelopeLetter.jsx
│   │   ├── GlowRomanticLetter.jsx
│   │   ├── ReplyForm.jsx
│   │   └── FavoriteButton.jsx
│   │
│   ├── daily/
│   │   ├── DailyMessageCard.jsx
│   │   └── DailyReplyForm.jsx
│   │
│   └── admin/
│       ├── AdminTopBar.jsx
│       ├── AdminNavigation.jsx
│       ├── AdminStatCard.jsx
│       ├── AdminSectionHeader.jsx
│       ├── AdminFormField.jsx
│       ├── AdminUploadField.jsx
│       ├── RepliesList.jsx
│       ├── ReplyCard.jsx
│       ├── PhotoForm.jsx
│       ├── PhotoList.jsx
│       ├── PhotoItemCard.jsx
│       ├── MusicForm.jsx
│       ├── MusicList.jsx
│       ├── MusicItemCard.jsx
│       ├── LetterForm.jsx
│       ├── LetterList.jsx
│       ├── LetterItemCard.jsx
│       ├── DailyMessageForm.jsx
│       ├── DailyMessageList.jsx
│       └── DailyMessageItemCard.jsx
│
├── data/
│   ├── loveLetters.js
│   ├── dailyMessages.js
│   ├── galleryPhotos.js
│   ├── moodConfig.js
│   ├── musicTracks.js
│   └── appCopy.js
│
├── hooks/
│   ├── useAuthGate.js
│   ├── useRoleGuard.js
│   ├── useDailyMessage.js
│   ├── useLetterPicker.js
│   ├── useLocalHistory.js
│   ├── useMusicPlayer.js
│   └── useToast.js
│
├── pages/
│   ├── UnlockPage.jsx
│   ├── HomePage.jsx
│   ├── GalleryPage.jsx
│   ├── DailyPage.jsx
│   ├── LettersPage.jsx
│   ├── SavedPage.jsx
│   │
│   └── admin/
│       ├── AdminDashboardPage.jsx
│       ├── AdminRepliesPage.jsx
│       ├── AdminPhotosPage.jsx
│       ├── AdminMusicPage.jsx
│       ├── AdminLettersPage.jsx
│       └── AdminDailyMessagesPage.jsx
│
├── services/
│   ├── supabaseClient.js
│   ├── repliesService.js
│   ├── favoritesService.js
│   ├── historyService.js
│   ├── photosService.js
│   ├── musicService.js
│   ├── lettersService.js
│   ├── dailyMessagesService.js
│   └── storageService.js
│
├── styles/
│   ├── globals.css
│   ├── tokens.css
│   ├── scrapbook.css
│   ├── admin.css
│   └── animations.css
│
├── utils/
│   ├── dateUtils.js
│   ├── randomUtils.js
│   ├── storageUtils.js
│   ├── validationUtils.js
│   ├── fileUtils.js
│   └── roleUtils.js
│
├── App.jsx
└── main.jsx
5. Route Target

Route yang digunakan:

/
├── /unlock
├── /home
├── /gallery
├── /daily
├── /letters
├── /saved
│
└── /admin
    ├── /admin
    ├── /admin/replies
    ├── /admin/photos
    ├── /admin/music
    ├── /admin/letters
    └── /admin/daily-messages

Keterangan:

/unlock                → Login code screen untuk Ines dan Admin
/home                  → Home scrapbook welcome untuk Ines
/gallery               → Gallery foto untuk Ines
/daily                 → Daily message untuk Ines
/letters               → Love Letter Generator untuk Ines
/saved                 → Favorites dan history untuk Ines

/admin                 → Admin Dashboard
/admin/replies         → Melihat reply dari Ines
/admin/photos          → Mengelola foto
/admin/music           → Mengelola lagu
/admin/letters         → Mengelola love letter
/admin/daily-messages  → Mengelola daily message

Route admin tidak boleh ditampilkan di navigasi utama Ines.

6. Environment Variables

Environment variables yang dibutuhkan:

VITE_INES_CODE=230624
VITE_ADMIN_CODE=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...

Catatan:

VITE_INES_CODE dan VITE_ADMIN_CODE hanya private gate ringan karena env dengan prefix VITE_ tetap masuk ke bundle frontend.
Untuk keamanan yang lebih kuat, admin dapat dikembangkan memakai Supabase Auth.
7. Implementation Roadmap

Implementasi dibagi menjadi beberapa phase:

Phase 0: Project Setup
Phase 1: Design Tokens dan Global Styling
Phase 2: Data Layer Lokal
Phase 3: Routing dan Role-Based Protected Route
Phase 4: Unlock / Login Code Screen dengan 2 Role
Phase 5: Supabase Setup dan Database Schema
Phase 6: Home Scrapbook Welcome untuk Ines
Phase 7: Background Music Control
Phase 8: Gallery Foto untuk Ines
Phase 9: Daily Message untuk Ines
Phase 10: Love Letter Generator untuk Ines
Phase 11: Reply Form dan Supabase Replies
Phase 12: Saved, Favorites, dan History
Phase 13: Admin Layout dan Admin Dashboard
Phase 14: Admin Replies Page
Phase 15: Admin Music Management
Phase 16: Admin Photos Management
Phase 17: Admin Love Letters Management
Phase 18: Admin Daily Messages Management
Phase 19: Visual Polish dengan Library UI
Phase 20: Responsive dan Accessibility Pass
Phase 21: Deployment ke Vercel
Phase 0 — Project Setup
Tujuan

Membuat fondasi project React + Vite agar siap dikembangkan.

Task
1. Buat project React dengan Vite.
2. Install Tailwind CSS.
3. Install React Router.
4. Install Framer Motion.
5. Install Supabase client.
6. Install icon library.
7. Bersihkan file bawaan Vite yang tidak dibutuhkan.
8. Pastikan project bisa berjalan di local.
Dependency Awal
npm create vite@latest ines-love-site -- --template react
cd ines-love-site
npm install
npm install react-router-dom framer-motion @supabase/supabase-js lucide-react clsx tailwind-merge
npm install tailwindcss @tailwindcss/vite
File yang Dibuat/Diubah
package.json
vite.config.js
src/main.jsx
src/App.jsx
src/styles/globals.css
Acceptance Criteria
1. Project berhasil dijalankan dengan npm run dev.
2. Halaman awal React tampil tanpa error.
3. Tailwind CSS aktif.
4. React Router siap digunakan.
5. Framer Motion berhasil diimport tanpa error.
6. Supabase package berhasil diinstall.
7. lucide-react berhasil diinstall.
Prompt untuk AI/Codex
Pahami bahwa saya sedang membangun website personal untuk pacar saya bernama Ines.

Website ini menggunakan:
- React + Vite
- Tailwind CSS
- React Router
- Framer Motion
- Supabase
- Vercel

Website memiliki 2 role:
1. Ines, login dengan kode 230624.
2. Admin/Moses, login dengan admin code.

Tugas kamu pada tahap ini hanya melakukan setup project. Jangan membuat fitur utama dulu.

Lakukan:
1. Setup React Router dasar.
2. Setup Tailwind CSS.
3. Install dependency utama.
4. Bersihkan file bawaan Vite yang tidak dibutuhkan.
5. Buat struktur folder awal sesuai modular implementation.
6. Pastikan project bisa berjalan dengan npm run dev.

Jangan membuat halaman love letter, gallery, admin, Supabase logic, atau animasi kompleks pada tahap ini.
Phase 1 — Design Tokens dan Global Styling
Tujuan

Menerapkan fondasi visual berdasarkan Design System terbaru yang mendukung area Ines dan area Admin.

Task
1. Buat file tokens.css.
2. Definisikan color tokens untuk Ines area.
3. Definisikan color tokens untuk Admin area.
4. Definisikan radius, shadow, spacing, duration, dan easing.
5. Import tokens ke globals.css.
6. Buat class utility dasar untuk body, page, card, button, input, dan admin card.
7. Buat admin.css untuk style dasar admin area.
File yang Dibuat/Diubah
src/styles/tokens.css
src/styles/globals.css
src/styles/scrapbook.css
src/styles/admin.css
src/styles/animations.css
src/main.jsx
Token Warna Utama
:root {
  --color-ivory: #FFF8EF;
  --color-cream: #F7EAD8;
  --color-warm-beige: #E8D3B9;
  --color-dusty-rose: #C98F8F;
  --color-soft-rose: #E7B8B8;
  --color-deep-brown: #4A2F25;
  --color-champagne-gold: #D6B56D;
  --color-soft-charcoal: #2F2926;
  --color-muted-brown: #7A5C4B;
  --color-paper: #FFFDF8;

  --color-admin-bg: #FBF4EA;
  --color-admin-surface: #FFFDF8;
  --color-admin-border: rgba(74, 47, 37, 0.12);
  --color-admin-muted: #8A6D5C;
  --color-success: #5F8A6B;
  --color-warning: #C89B4A;
  --color-danger: #B85C5C;

  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;
  --radius-full: 999px;

  --shadow-soft: 0 10px 30px rgba(74, 47, 37, 0.08);
  --shadow-paper: 0 8px 18px rgba(74, 47, 37, 0.10);
  --shadow-floating: 0 18px 50px rgba(74, 47, 37, 0.16);
  --shadow-glow: 0 0 30px rgba(214, 181, 109, 0.22);
  --shadow-admin: 0 10px 24px rgba(74, 47, 37, 0.06);
}
Acceptance Criteria
1. Body menggunakan background ivory/cream.
2. Warna teks utama deep brown.
3. Area admin punya class/style dasar sendiri.
4. File styling terpisah rapi.
5. Token CSS bisa digunakan oleh komponen lain.
6. Tidak ada styling acak di App.jsx.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 1: Design Tokens dan Global Styling.

Gunakan design system terbaru:
- Area Ines: scrapbook 60% + romantis elegan 40%.
- Area Admin: clean private admin + romantic minimal accent.
- Warna utama: ivory, cream, warm beige, dusty rose, deep brown, champagne gold.
- Website harus mobile-first.
- Area Ines tidak boleh terlihat seperti dashboard.
- Area Admin harus clean, rapi, dan fungsional.

Tugas kamu:
1. Buat src/styles/tokens.css.
2. Buat src/styles/globals.css.
3. Buat src/styles/scrapbook.css.
4. Buat src/styles/admin.css.
5. Buat src/styles/animations.css.
6. Import semua stylesheet global di main.jsx.
7. Terapkan style global untuk body, root, button dasar, card, input, dan admin card.

Jangan membuat fitur halaman dulu. Fokus hanya pada fondasi styling.
Phase 2 — Data Layer Lokal
Tujuan

Menyiapkan data lokal awal untuk fallback dan pengembangan UI sebelum semua data dipindahkan ke Supabase.

Task
1. Buat loveLetters.js.
2. Buat dailyMessages.js.
3. Buat galleryPhotos.js.
4. Buat moodConfig.js.
5. Buat musicTracks.js.
6. Buat appCopy.js.
7. Pastikan struktur data kompatibel dengan rencana Supabase.
File yang Dibuat
src/data/loveLetters.js
src/data/dailyMessages.js
src/data/galleryPhotos.js
src/data/moodConfig.js
src/data/musicTracks.js
src/data/appCopy.js
Struktur loveLetters.js
export const loveLetters = [
  {
    id: "kangen-001",
    mood: "kangen",
    title: "Kalau kamu lagi kangen aku",
    subtitle: "Read this slowly, sayang.",
    style: "typewriter",
    photo_url: "/images/letters/kangen-001.jpg",
    is_active: true,
    content: [
      "Hai, Nes.",
      "Kalau kamu lagi kangen aku, aku mau kamu tahu satu hal: aku juga sering kangen kamu di waktu-waktu yang bahkan tidak aku rencanakan.",
      "Kadang cuma karena hal kecil, tiba-tiba aku ingat kamu."
    ]
  }
];
Struktur moodConfig.js
export const moodConfig = [
  {
    id: "kangen",
    label: "Kangen",
    prompt: "Aku lagi kangen",
    style: "typewriter",
    description: "For the moments when you miss me a little extra."
  },
  {
    id: "sedih",
    label: "Sedih",
    prompt: "Aku lagi sedih",
    style: "soft-fade",
    description: "For the days when your heart feels heavy."
  },
  {
    id: "capek",
    label: "Capek / Butuh Semangat",
    prompt: "Aku capek hari ini",
    style: "sticky-note",
    description: "For the days when you need a soft place to rest."
  },
  {
    id: "marah",
    label: "Marah / Kesal",
    prompt: "Aku lagi kesal",
    style: "envelope",
    description: "For the moments when your heart needs gentleness."
  },
  {
    id: "romantis",
    label: "Random Romantis",
    prompt: "Surprise me with love",
    style: "glow-card",
    description: "For no reason, just love."
  }
];
Struktur galleryPhotos.js
export const galleryPhotos = [
  {
    id: "photo-001",
    title: "Sweet Memory",
    caption: "One of my favorite memories with you.",
    image_url: "/images/gallery/photo-001.jpg",
    category: "Sweet Memories",
    is_featured: true,
    is_active: true
  }
];
Struktur musicTracks.js
export const musicTracks = [
  {
    id: "music-001",
    title: "Our Little Song",
    artist: "For Ines",
    audio_url: "/audio/our-song.mp3",
    is_active: true
  }
];
Acceptance Criteria
1. Semua data konten berada di folder src/data.
2. Komponen UI belum berisi data hardcoded.
3. Minimal ada 5 love letters, masing-masing untuk satu mood.
4. Minimal ada 10 daily messages.
5. Minimal ada beberapa sample gallery photos.
6. Minimal ada 1 sample music track.
7. Data mudah ditambah tanpa mengubah komponen.
8. Nama field mendekati struktur Supabase.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 2: Data Layer Lokal.

Tugas kamu hanya membuat file data, belum membuat UI kompleks.

Buat file:
1. src/data/loveLetters.js
2. src/data/dailyMessages.js
3. src/data/galleryPhotos.js
4. src/data/moodConfig.js
5. src/data/musicTracks.js
6. src/data/appCopy.js

Isi loveLetters dengan minimal 5 surat awal untuk mood:
- kangen
- sedih
- capek
- marah
- romantis

Gunakan bahasa campuran Indonesia-Inggris yang natural. Panggilan untuk Ines boleh menggunakan:
- Ines pacar
- Ines
- Nes
- sayang
- cintaku
- kunneng

Pastikan field data sudah mendekati struktur Supabase:
- photo_url
- image_url
- audio_url
- is_active
- is_featured

Jangan membuat komponen UI pada tahap ini. Fokus pada struktur data yang rapi dan mudah dikembangkan.
Phase 3 — Routing dan Role-Based Protected Route
Tujuan

Membuat sistem routing dan proteksi route berdasarkan role ines dan admin.

Task
1. Setup BrowserRouter.
2. Buat route /unlock.
3. Buat route Ines:
   - /home
   - /gallery
   - /daily
   - /letters
   - /saved
4. Buat route Admin:
   - /admin
   - /admin/replies
   - /admin/photos
   - /admin/music
   - /admin/letters
   - /admin/daily-messages
5. Buat ProtectedRoute.
6. Buat RoleRedirect.
7. Buat hook useAuthGate.
8. Buat hook useRoleGuard jika perlu.
9. Buat placeholder untuk semua halaman.
File yang Dibuat/Diubah
src/App.jsx
src/components/common/ProtectedRoute.jsx
src/components/common/RoleRedirect.jsx
src/hooks/useAuthGate.js
src/hooks/useRoleGuard.js
src/pages/UnlockPage.jsx
src/pages/HomePage.jsx
src/pages/GalleryPage.jsx
src/pages/DailyPage.jsx
src/pages/LettersPage.jsx
src/pages/SavedPage.jsx
src/pages/admin/AdminDashboardPage.jsx
src/pages/admin/AdminRepliesPage.jsx
src/pages/admin/AdminPhotosPage.jsx
src/pages/admin/AdminMusicPage.jsx
src/pages/admin/AdminLettersPage.jsx
src/pages/admin/AdminDailyMessagesPage.jsx
Logika Role
Jika belum unlock:
- user diarahkan ke /unlock

Jika role = ines:
- user boleh membuka /home, /gallery, /daily, /letters, /saved
- user tidak boleh membuka /admin/*

Jika role = admin:
- user boleh membuka /admin/*
- user tidak diarahkan ke halaman Ines secara default
Acceptance Criteria
1. Semua route bisa dibuka sesuai role.
2. Route Ines terlindungi role ines.
3. Route Admin terlindungi role admin.
4. Jika belum login dan membuka /letters, user diarahkan ke /unlock.
5. Jika Ines membuka /admin, user diarahkan ke /home.
6. Jika Admin membuka /home, user diarahkan ke /admin.
7. Route admin tidak muncul di navigasi Ines.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 3: Routing dan Role-Based Protected Route.

Tugas kamu:
1. Setup React Router di App.jsx.
2. Buat halaman placeholder untuk area Ines:
   - UnlockPage
   - HomePage
   - GalleryPage
   - DailyPage
   - LettersPage
   - SavedPage
3. Buat halaman placeholder untuk area Admin:
   - AdminDashboardPage
   - AdminRepliesPage
   - AdminPhotosPage
   - AdminMusicPage
   - AdminLettersPage
   - AdminDailyMessagesPage
4. Buat ProtectedRoute yang menerima allowedRole.
5. Buat useAuthGate untuk menyimpan isUnlocked dan role di localStorage.
6. Jika user belum unlock, arahkan ke /unlock.
7. Jika role tidak sesuai, redirect ke halaman default role.

Jangan membuat UI final dulu. Gunakan placeholder sederhana tetapi rapi.
Phase 4 — Unlock / Login Code Screen dengan 2 Role
Tujuan

Membuat halaman pembuka private yang mendukung login sebagai Ines dan Admin.

Task
1. Buat UI UnlockPage.
2. Buat input login code.
3. Buat validasi kode Ines.
4. Buat validasi kode Admin.
5. Jika kode = 230624, login sebagai Ines.
6. Jika kode = admin code, login sebagai Admin.
7. Simpan isUnlocked dan role ke localStorage.
8. Redirect berdasarkan role.
9. Tampilkan pesan error manis jika salah.
File yang Dibuat/Diubah
src/pages/UnlockPage.jsx
src/hooks/useAuthGate.js
src/utils/validationUtils.js
src/utils/roleUtils.js
src/data/appCopy.js
Environment
VITE_INES_CODE=230624
VITE_ADMIN_CODE=...
Behavior
Input code = 230624
→ role = ines
→ redirect ke /home

Input code = VITE_ADMIN_CODE
→ role = admin
→ redirect ke /admin

Input code salah
→ tampil error
Copy
Title:
This place is only for you

Subtitle:
Enter the date only we know.

Button:
Unlock our little place

Error:
Hmm, not that one, sayang. Try again with your heart.

Success Ines:
Welcome home, Nes.

Success Admin:
Welcome back, Moses.
Acceptance Criteria
1. User bisa memasukkan login code.
2. Jika kode Ines benar, user masuk sebagai role ines.
3. Jika admin code benar, user masuk sebagai role admin.
4. Jika kode salah, tampil pesan error.
5. Unlock status dan role tersimpan di localStorage.
6. Saat refresh, user tetap dianggap login sesuai role.
7. UI mobile-friendly.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 4: Unlock / Login Code Screen dengan 2 Role.

Buat UnlockPage dengan konsep:
- private
- romantis elegan
- scrapbook ringan
- full screen
- centered card

Fitur:
1. Input login code.
2. Tombol "Unlock our little place".
3. Validasi kode:
   - VITE_INES_CODE atau fallback "230624" → role ines
   - VITE_ADMIN_CODE → role admin
4. Jika login sebagai Ines:
   - simpan isUnlocked true
   - simpan role "ines"
   - redirect ke /home
5. Jika login sebagai Admin:
   - simpan isUnlocked true
   - simpan role "admin"
   - redirect ke /admin
6. Jika salah, tampilkan:
   "Hmm, not that one, sayang. Try again with your heart."

Gunakan style dari tokens.css dan globals.css. Jangan install library UI tambahan dulu. Boleh gunakan Framer Motion untuk animasi fade/slide sederhana.
Phase 5 — Supabase Setup dan Database Schema
Tujuan

Menyiapkan koneksi Supabase, database table, storage bucket, dan service layer dasar.

Task
1. Buat project Supabase.
2. Buat table replies.
3. Buat table favorites.
4. Buat table letter_history.
5. Buat table gallery_photos.
6. Buat table music_tracks.
7. Buat table love_letters.
8. Buat table daily_messages.
9. Buat storage bucket gallery.
10. Buat storage bucket music.
11. Buat storage bucket letter-photos.
12. Simpan env di .env.
13. Buat supabaseClient.js.
14. Buat service files.
Environment Variables
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
SQL Tables
replies
create table replies (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id text not null,
  mood text,
  reply_text text not null,
  created_at timestamptz default now()
);
favorites
create table favorites (
  id uuid primary key default gen_random_uuid(),
  item_type text not null,
  item_id text not null,
  mood text,
  created_at timestamptz default now()
);
letter_history
create table letter_history (
  id uuid primary key default gen_random_uuid(),
  letter_id text not null,
  mood text,
  opened_at timestamptz default now()
);
gallery_photos
create table gallery_photos (
  id uuid primary key default gen_random_uuid(),
  title text,
  caption text,
  image_url text not null,
  category text,
  is_featured boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
music_tracks
create table music_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text,
  audio_url text not null,
  is_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
love_letters
create table love_letters (
  id uuid primary key default gen_random_uuid(),
  mood text not null,
  title text not null,
  subtitle text,
  content text not null,
  style text not null,
  photo_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
daily_messages
create table daily_messages (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  tone text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
Storage Buckets
gallery
music
letter-photos
File yang Dibuat/Diubah
.env
src/services/supabaseClient.js
src/services/repliesService.js
src/services/favoritesService.js
src/services/historyService.js
src/services/photosService.js
src/services/musicService.js
src/services/lettersService.js
src/services/dailyMessagesService.js
src/services/storageService.js
Acceptance Criteria
1. Supabase client berhasil dibuat.
2. Env terbaca oleh Vite.
3. Semua service file dibuat.
4. Tidak ada Supabase logic langsung di komponen.
5. Semua akses Supabase lewat services.
6. Table dan storage bucket terdokumentasi.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 5: Supabase Setup dan Database Schema.

Tugas kamu:
1. Install Supabase JS client jika belum ada.
2. Buat src/services/supabaseClient.js.
3. Buat service file:
   - repliesService.js
   - favoritesService.js
   - historyService.js
   - photosService.js
   - musicService.js
   - lettersService.js
   - dailyMessagesService.js
   - storageService.js
4. Pastikan konfigurasi memakai:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
5. Tambahkan komentar SQL schema di dokumentasi atau file catatan jika perlu.

Jangan mengubah UI besar-besaran. Fokus membuat service layer yang rapi.
Semua query Supabase harus berada di folder services, bukan langsung di komponen.
Phase 6 — Home Scrapbook Welcome untuk Ines
Tujuan

Membuat halaman utama setelah Ines login yang terasa seperti scrapbook kenangan.

Task
1. Buat HomePage.
2. Buat InesLayout.
3. Buat GreetingHero.
4. Buat ScrapbookCollage.
5. Buat DailyMessagePreview.
6. Buat FeatureNavigationCards.
7. Tambahkan navigasi ke Gallery, Daily, Letters, Saved.
File yang Dibuat/Diubah
src/pages/HomePage.jsx
src/components/common/InesLayout.jsx
src/components/scrapbook/PolaroidCard.jsx
src/components/scrapbook/ScrapbookCard.jsx
src/components/scrapbook/FloatingDecorations.jsx
src/data/galleryPhotos.js
src/data/dailyMessages.js
Konten Home

Home harus menampilkan:

1. Sapaan untuk Ines.
2. Kalimat pembuka romantis.
3. Beberapa polaroid foto.
4. Preview daily message.
5. Card navigasi fitur.
6. Music control placeholder atau MusicControl jika sudah dibuat.
Copy Utama
Hi, Nes.
I made this little place for us.

A small corner of the internet
where our memories can stay,
and where my words can find you
whenever your heart needs them.
Acceptance Criteria
1. Home tampil setelah Ines login.
2. Admin tidak diarahkan ke Home.
3. Ada scrapbook collage sederhana.
4. Ada preview daily message.
5. Ada navigasi ke Gallery, Daily, Letters, dan Saved.
6. Layout nyaman di mobile.
7. Tidak terlihat seperti dashboard.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 6: Home Scrapbook Welcome untuk Ines.

Buat HomePage dengan konsep scrapbook 60% dan romantis elegan 40%.

Komponen yang perlu dibuat:
1. InesLayout
2. GreetingHero
3. ScrapbookCollage
4. DailyMessagePreview
5. FeatureNavigationCards

Home harus punya:
- sapaan personal untuk Ines
- foto polaroid dari galleryPhotos
- preview daily message
- tombol/card menuju Gallery, Daily, Letters, Saved

Gunakan Framer Motion untuk animasi ringan. Jangan membuat fitur Gallery atau Love Letter secara penuh dulu. Fokus hanya Home.
Phase 7 — Background Music Control
Tujuan

Menambahkan musik latar yang bisa diaktifkan/dimatikan oleh Ines dan mengambil lagu aktif dari Supabase jika tersedia.

Task
1. Buat hook useMusicPlayer.
2. Buat MusicControl.
3. Ambil lagu aktif dari musicService jika Supabase tersedia.
4. Fallback ke data lokal musicTracks.js jika Supabase kosong/gagal.
5. Tambahkan MusicControl di InesLayout atau HomePage.
6. Pastikan musik tidak autoplay sebelum user klik.
File yang Dibuat/Diubah
src/data/musicTracks.js
src/hooks/useMusicPlayer.js
src/components/common/MusicControl.jsx
src/components/common/InesLayout.jsx
src/services/musicService.js
Behavior
1. Default: musik tidak menyala.
2. Sistem mencari lagu aktif.
3. User klik play.
4. Musik mulai diputar.
5. Tombol berubah menjadi pause.
6. User bisa pause.
7. Jika browser menolak play, tampilkan pesan.
Acceptance Criteria
1. MusicControl tampil di area Ines.
2. Musik hanya play setelah user klik.
3. User bisa pause/play.
4. Tidak ada autoplay paksa.
5. Jika Supabase gagal, fallback data lokal.
6. Tidak error jika file audio belum tersedia.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 7: Background Music Control.

Buat:
1. src/hooks/useMusicPlayer.js
2. src/components/common/MusicControl.jsx
3. Update src/services/musicService.js jika perlu
4. Update src/data/musicTracks.js jika perlu

Aturan:
- Musik tidak boleh autoplay.
- Musik hanya play setelah user klik.
- Ambil lagu aktif dari Supabase melalui musicService.
- Jika Supabase kosong/gagal, fallback ke musicTracks.js.
- Harus ada tombol play/pause.
- Jika audio gagal diputar, tampilkan pesan sederhana.
- MusicControl harus kecil, lembut, dan cocok dengan desain scrapbook romantis.

Jangan membuat admin music management pada tahap ini.
Phase 8 — Gallery Foto untuk Ines
Tujuan

Membuat galeri foto berbentuk scrapbook/polaroid untuk Ines.

Task
1. Buat GalleryPage.
2. Buat GalleryFilter.
3. Buat PolaroidGrid.
4. Buat GalleryPhotoCard.
5. Buat PhotoLightbox.
6. Ambil data dari Supabase jika tersedia.
7. Fallback ke galleryPhotos.js jika Supabase kosong/gagal.
File yang Dibuat/Diubah
src/pages/GalleryPage.jsx
src/components/gallery/GalleryFilter.jsx
src/components/gallery/GalleryGrid.jsx
src/components/gallery/GalleryPhotoCard.jsx
src/components/gallery/PhotoLightbox.jsx
src/components/scrapbook/PolaroidCard.jsx
src/data/galleryPhotos.js
src/services/photosService.js
Gallery Behavior
1. Ines membuka /gallery.
2. Website mengambil foto aktif.
3. Website menampilkan daftar foto.
4. Ines bisa filter kategori.
5. Ines klik foto.
6. Modal/lightbox terbuka.
7. Ines bisa menutup modal.
Acceptance Criteria
1. Foto tampil dari Supabase atau fallback local data.
2. Foto tampil dalam style polaroid/scrapbook.
3. Ada filter kategori.
4. Ada lightbox saat foto diklik.
5. Layout mobile nyaman.
6. Jika gambar gagal dimuat, tampil placeholder.
7. Hanya foto is_active yang tampil untuk Ines.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 8: Gallery Foto untuk Ines.

Buat GalleryPage yang menampilkan foto dari Supabase melalui photosService, dengan fallback ke src/data/galleryPhotos.js jika Supabase kosong/gagal.

Komponen yang perlu dibuat:
1. GalleryFilter
2. GalleryGrid
3. GalleryPhotoCard
4. PhotoLightbox
5. PolaroidCard reusable jika belum ada

Desain:
- scrapbook/polaroid
- foto boleh sedikit rotate
- caption menggunakan aksen handwritten
- mobile-first
- bukan grid kaku seperti dashboard

Fitur:
- filter berdasarkan category
- hanya tampilkan foto active
- klik foto membuka lightbox
- lightbox menampilkan foto besar dan caption

Jangan membuat admin photos management pada tahap ini.
Phase 9 — Daily Message untuk Ines
Tujuan

Membuat pesan harian random yang konsisten per hari.

Task
1. Buat hook useDailyMessage.
2. Buat DailyPage.
3. Buat DailyMessageCard.
4. Ambil daily message aktif dari Supabase jika tersedia.
5. Fallback ke dailyMessages.js jika Supabase kosong/gagal.
6. Pilih pesan berdasarkan tanggal hari ini.
7. Tambahkan reply form placeholder atau ReplyForm jika sudah tersedia.
File yang Dibuat/Diubah
src/hooks/useDailyMessage.js
src/pages/DailyPage.jsx
src/components/daily/DailyMessageCard.jsx
src/components/daily/DailyReplyForm.jsx
src/utils/dateUtils.js
src/utils/randomUtils.js
src/data/dailyMessages.js
src/services/dailyMessagesService.js
Daily Message Logic
1. Ambil daftar daily message aktif.
2. Jika Supabase tersedia, gunakan data Supabase.
3. Jika gagal/kosong, gunakan data lokal.
4. Ambil tanggal hari ini.
5. Ubah tanggal menjadi seed.
6. Pilih satu pesan dari daftar.
7. Pesan yang sama tetap tampil sepanjang hari yang sama.
8. Besok pesan berubah.
Acceptance Criteria
1. Daily message tampil dari Supabase atau data lokal.
2. Pesan tidak berubah saat refresh di hari yang sama.
3. Ada tombol favorite placeholder.
4. Ada textarea reply placeholder.
5. Belum wajib simpan reply jika ReplyForm belum dibuat.
6. Hanya daily message is_active yang dipilih.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 9: Daily Message untuk Ines.

Buat:
1. useDailyMessage hook
2. DailyPage
3. DailyMessageCard
4. DailyReplyForm placeholder

Daily message harus:
- mengambil data dari Supabase melalui dailyMessagesService jika tersedia
- fallback ke src/data/dailyMessages.js jika Supabase kosong/gagal
- hanya memakai pesan is_active
- dipilih secara random berbasis tanggal
- tidak berubah saat refresh di hari yang sama
- berubah di hari berbeda

Tambahkan textarea reply, tetapi belum perlu simpan ke Supabase jika ReplyForm belum masuk phase berikutnya.

Jangan membuat admin daily messages management pada tahap ini.
Phase 10 — Love Letter Generator untuk Ines
Tujuan

Membuat fitur utama: pilih mood lalu tampilkan surat sesuai mood.

Task
1. Buat LettersPage.
2. Buat MoodSelector.
3. Buat MoodCard.
4. Buat useLetterPicker.
5. Buat LetterRenderer.
6. Ambil love letters aktif dari Supabase jika tersedia.
7. Fallback ke loveLetters.js jika Supabase kosong/gagal.
8. Buat 5 variant letter:
   - TypewriterLetter
   - SoftFadeLetter
   - StickyNoteLetter
   - EnvelopeLetter
   - GlowRomanticLetter
9. Tambahkan tombol Another Letter.
10. Tambahkan tombol Back to Moods.
File yang Dibuat/Diubah
src/pages/LettersPage.jsx
src/components/letters/MoodSelector.jsx
src/components/letters/MoodCard.jsx
src/components/letters/LetterRenderer.jsx
src/components/letters/TypewriterLetter.jsx
src/components/letters/SoftFadeLetter.jsx
src/components/letters/StickyNoteLetter.jsx
src/components/letters/EnvelopeLetter.jsx
src/components/letters/GlowRomanticLetter.jsx
src/hooks/useLetterPicker.js
src/data/loveLetters.js
src/data/moodConfig.js
src/services/lettersService.js
Behavior
1. Ines membuka /letters.
2. Website mengambil daftar love letter aktif.
3. Website menampilkan mood selector.
4. Ines memilih mood.
5. Sistem memilih surat sesuai mood.
6. LetterRenderer menentukan style berdasarkan letter.style.
7. Surat tampil dengan animasi sesuai mood.
8. Ines bisa klik Another Letter.
9. Ines bisa kembali ke mood selector.
Mood dan Style
kangen   → typewriter
sedih    → soft-fade
capek    → sticky-note
marah    → envelope
romantis → glow-card
Acceptance Criteria
1. Mood selector tampil.
2. Ines bisa memilih 5 mood.
3. Surat sesuai mood tampil.
4. Setiap mood punya visual berbeda.
5. Tombol Another Letter berfungsi.
6. Tombol Back to Moods berfungsi.
7. UI mobile-friendly.
8. Data bisa berasal dari Supabase atau fallback local data.
9. Hanya love letter is_active yang tampil.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 10: Love Letter Generator untuk Ines.

Buat fitur inti:
1. LettersPage
2. MoodSelector
3. MoodCard
4. useLetterPicker
5. LetterRenderer
6. TypewriterLetter
7. SoftFadeLetter
8. StickyNoteLetter
9. EnvelopeLetter
10. GlowRomanticLetter

Data diambil dari:
- Supabase melalui lettersService jika tersedia
- fallback ke src/data/loveLetters.js jika Supabase kosong/gagal
- moodConfig tetap dari src/data/moodConfig.js

Mood:
- kangen
- sedih
- capek
- marah
- romantis

Setiap mood harus menampilkan style berbeda:
- typewriter
- soft-fade
- sticky-note
- envelope
- glow-card

Tambahkan:
- Another Letter button
- Back to Moods button

Jangan membuat admin letters management pada tahap ini.
Phase 11 — Reply Form dan Supabase Replies
Tujuan

Membuat form balasan teks yang bisa digunakan di love letter dan daily message, lalu menyimpan reply ke Supabase.

Task
1. Buat ReplyForm reusable.
2. Validasi jika reply kosong.
3. Submit reply ke Supabase table replies.
4. Jika Supabase gagal, tampilkan error.
5. Gunakan ReplyForm di LettersPage dan DailyPage.
6. Tampilkan pesan sukses.
File yang Dibuat/Diubah
src/components/letters/ReplyForm.jsx
src/components/daily/DailyReplyForm.jsx
src/services/repliesService.js
src/hooks/useToast.js
src/components/common/Toast.jsx
Reply Data
{
  source_type: "love_letter",
  source_id: "kangen-001",
  mood: "kangen",
  reply_text: "Aku juga kangen."
}
Acceptance Criteria
1. Ines bisa menulis reply di love letter.
2. Ines bisa menulis reply di daily message.
3. Reply kosong ditolak.
4. Reply tersimpan ke Supabase.
5. Muncul pesan sukses setelah submit.
6. Komponen ReplyForm reusable.
7. Tidak ada insert Supabase langsung di komponen tanpa service.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 11: Reply Form dan Supabase Replies.

Buat ReplyForm reusable yang bisa dipakai untuk:
- love letter
- daily message

Fitur:
1. Textarea balasan.
2. Validasi balasan tidak boleh kosong.
3. Submit menyimpan data ke Supabase melalui repliesService.
4. Tampilkan toast sukses.
5. Tampilkan pesan error jika kosong atau gagal simpan.

Data reply harus menyimpan:
- source_type
- source_id
- mood
- reply_text

Jika sukses, tampilkan:
"I’ll keep this reply close to my heart."

Jika gagal, tampilkan:
"Maaf sayang, balasannya belum berhasil disimpan. Coba lagi ya."

Jangan membuat admin replies page pada tahap ini.
Phase 12 — Saved, Favorites, dan History
Tujuan

Membuat fitur favorite dan history untuk Ines, menggunakan Supabase dengan fallback localStorage jika perlu.

Task
1. Buat FavoriteButton.
2. Buat useLocalHistory.
3. Simpan letter yang dibuka ke history.
4. Simpan favorite ke Supabase.
5. Simpan history ke Supabase.
6. Buat SavedPage.
7. Buat tab Favorites dan History.
8. LocalStorage boleh menjadi fallback.
File yang Dibuat/Diubah
src/components/letters/FavoriteButton.jsx
src/hooks/useLocalHistory.js
src/pages/SavedPage.jsx
src/utils/storageUtils.js
src/components/common/EmptyState.jsx
src/services/favoritesService.js
src/services/historyService.js
Data Favorite
{
  item_type: "love_letter",
  item_id: "kangen-001",
  mood: "kangen"
}
Data History
{
  letter_id: "kangen-001",
  mood: "kangen"
}
Acceptance Criteria
1. Surat yang dibuka masuk history.
2. Ines bisa favorite surat.
3. Ines bisa unfavorite surat.
4. SavedPage menampilkan tab Favorites dan History.
5. Empty state tampil jika belum ada data.
6. Data tersimpan di Supabase jika tersedia.
7. LocalStorage boleh menjadi fallback.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 12: Saved, Favorites, dan History.

Buat:
1. FavoriteButton
2. useLocalHistory
3. SavedPage
4. EmptyState

Fitur:
- Saat love letter dibuka, simpan ke history.
- User bisa menandai love letter sebagai favorite.
- Favorite tersimpan ke Supabase melalui favoritesService.
- History tersimpan ke Supabase melalui historyService.
- SavedPage punya dua tab: Favorites dan History.
- Jika kosong, tampilkan empty state yang personal.
- LocalStorage boleh dipertahankan sebagai fallback sederhana.

Jangan membuat admin feature pada tahap ini.
Phase 13 — Admin Layout dan Admin Dashboard
Tujuan

Membuat fondasi admin area untuk Moses.

Task
1. Buat AdminLayout.
2. Buat AdminTopBar.
3. Buat AdminNavigation.
4. Buat AdminDashboardPage.
5. Buat AdminStatCard.
6. Tampilkan ringkasan data dari Supabase.
7. Tambahkan shortcut ke admin feature.
File yang Dibuat/Diubah
src/components/common/AdminLayout.jsx
src/components/admin/AdminTopBar.jsx
src/components/admin/AdminNavigation.jsx
src/components/admin/AdminStatCard.jsx
src/components/admin/AdminSectionHeader.jsx
src/pages/admin/AdminDashboardPage.jsx
src/services/repliesService.js
src/services/photosService.js
src/services/musicService.js
src/services/lettersService.js
src/services/dailyMessagesService.js
src/styles/admin.css
Dashboard Data

Admin Dashboard menampilkan:

- Total replies
- Latest replies
- Total photos
- Active music
- Total love letters
- Total daily messages
Acceptance Criteria
1. Admin login diarahkan ke /admin.
2. AdminLayout tampil.
3. AdminNavigation tampil.
4. Admin Dashboard menampilkan stat cards.
5. Ada shortcut ke Replies, Photos, Music, Letters, Daily Messages.
6. Ines tidak bisa membuka /admin.
7. Admin page clean dan tidak terlalu dekoratif.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 13: Admin Layout dan Admin Dashboard.

Buat fondasi admin area untuk Moses.

Komponen yang perlu dibuat:
1. AdminLayout
2. AdminTopBar
3. AdminNavigation
4. AdminStatCard
5. AdminSectionHeader
6. AdminDashboardPage

Dashboard harus menampilkan:
- Total replies
- Latest replies
- Total photos
- Active music
- Total love letters
- Total daily messages

Data diambil melalui service layer.
Jika data belum tersedia, tampilkan fallback loading/empty state.

Desain:
- clean
- private
- warm
- tidak terlalu scrapbook
- tidak seperti dashboard perusahaan yang kaku

Jangan membuat CRUD admin detail dulu. Fokus dashboard dan layout admin.
Phase 14 — Admin Replies Page
Tujuan

Membuat halaman untuk Moses melihat semua balasan dari Ines.

Task
1. Buat AdminRepliesPage.
2. Buat RepliesList.
3. Buat ReplyCard.
4. Fetch replies dari Supabase.
5. Sort terbaru ke terlama.
6. Tampilkan source_type, source_id, mood, reply_text, created_at.
File yang Dibuat/Diubah
src/pages/admin/AdminRepliesPage.jsx
src/components/admin/RepliesList.jsx
src/components/admin/ReplyCard.jsx
src/services/repliesService.js
Acceptance Criteria
1. /admin/replies hanya bisa diakses admin.
2. Replies tampil dari Supabase.
3. Replies diurutkan terbaru ke terlama.
4. Setiap reply menampilkan source_type, source_id, mood, reply_text, created_at.
5. Jika belum ada reply, tampil empty state.
6. Desain clean dan mudah dibaca.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 14: Admin Replies Page.

Buat halaman /admin/replies untuk Moses.

Fitur:
1. Ambil daftar replies dari Supabase melalui repliesService.
2. Urutkan dari terbaru ke terlama.
3. Tampilkan setiap reply dalam ReplyCard.
4. Setiap card menampilkan:
   - reply_text
   - source_type
   - source_id
   - mood
   - created_at
5. Jika belum ada reply, tampilkan empty state:
   "No replies yet. Maybe Ines is still reading with a smile."

Desain admin page harus clean, private, dan tidak terlalu dekoratif.
Phase 15 — Admin Music Management
Tujuan

Membuat halaman admin untuk mengelola lagu website.

Task
1. Buat AdminMusicPage.
2. Buat MusicList.
3. Buat MusicItemCard.
4. Buat MusicForm.
5. Buat AdminUploadField jika belum ada.
6. Admin bisa upload lagu.
7. Admin bisa set active music.
8. Admin bisa delete music.
File yang Dibuat/Diubah
src/pages/admin/AdminMusicPage.jsx
src/components/admin/MusicList.jsx
src/components/admin/MusicItemCard.jsx
src/components/admin/MusicForm.jsx
src/components/admin/AdminUploadField.jsx
src/components/common/ConfirmDialog.jsx
src/services/musicService.js
src/services/storageService.js
Behavior
1. Admin membuka /admin/music.
2. Sistem menampilkan daftar lagu.
3. Admin dapat upload lagu baru.
4. Admin dapat mengisi title dan artist.
5. Admin dapat memilih lagu sebagai active.
6. Saat satu lagu active, lagu lain menjadi inactive.
7. Admin dapat menghapus lagu.
Acceptance Criteria
1. /admin/music hanya bisa diakses admin.
2. Admin bisa melihat daftar lagu.
3. Admin bisa upload file audio.
4. Metadata lagu tersimpan di music_tracks.
5. File audio tersimpan di bucket music.
6. Admin bisa set active music.
7. Hanya satu music track yang is_active = true.
8. Admin bisa delete music dengan konfirmasi.
9. MusicControl Ines memakai lagu aktif.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 15: Admin Music Management.

Buat halaman /admin/music.

Komponen:
1. AdminMusicPage
2. MusicList
3. MusicItemCard
4. MusicForm
5. AdminUploadField
6. ConfirmDialog jika belum ada

Fitur:
- Fetch music_tracks dari Supabase melalui musicService.
- Upload file audio ke bucket music melalui storageService.
- Simpan metadata:
  - title
  - artist
  - audio_url
  - is_active
- Admin bisa Set Active.
- Jika satu lagu dijadikan active, lagu lain harus menjadi inactive.
- Admin bisa delete music dengan konfirmasi.

Desain:
- clean
- easy to manage
- tampilkan audio preview
- active badge jelas

Jangan mengubah MusicControl terlalu besar kecuali perlu membaca active track.
Phase 16 — Admin Photos Management
Tujuan

Membuat halaman admin untuk mengelola foto gallery.

Task
1. Buat AdminPhotosPage.
2. Buat PhotoList.
3. Buat PhotoItemCard.
4. Buat PhotoForm.
5. Buat AdminUploadField jika belum ada.
6. Admin bisa upload foto.
7. Admin bisa edit metadata foto.
8. Admin bisa set featured.
9. Admin bisa set active/inactive.
10. Admin bisa delete foto.
File yang Dibuat/Diubah
src/pages/admin/AdminPhotosPage.jsx
src/components/admin/PhotoList.jsx
src/components/admin/PhotoItemCard.jsx
src/components/admin/PhotoForm.jsx
src/components/admin/AdminUploadField.jsx
src/components/common/ConfirmDialog.jsx
src/services/photosService.js
src/services/storageService.js
Behavior
1. Admin membuka /admin/photos.
2. Sistem menampilkan daftar foto.
3. Admin dapat upload foto baru.
4. Admin mengisi title, caption, category.
5. Admin bisa menandai is_featured.
6. Admin bisa mengaktifkan/nonaktifkan foto.
7. Admin bisa edit foto.
8. Admin bisa hapus foto.
Acceptance Criteria
1. /admin/photos hanya bisa diakses admin.
2. Admin bisa melihat daftar foto.
3. Admin bisa upload foto ke bucket gallery.
4. Metadata foto tersimpan di gallery_photos.
5. Admin bisa edit title, caption, category, is_featured, is_active.
6. Admin bisa delete foto dengan konfirmasi.
7. Gallery Ines hanya menampilkan foto is_active.
8. Foto featured bisa dipakai untuk Home.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 16: Admin Photos Management.

Buat halaman /admin/photos.

Komponen:
1. AdminPhotosPage
2. PhotoList
3. PhotoItemCard
4. PhotoForm
5. AdminUploadField
6. ConfirmDialog jika belum ada

Fitur:
- Fetch gallery_photos dari Supabase melalui photosService.
- Upload file image ke bucket gallery melalui storageService.
- Simpan metadata:
  - title
  - caption
  - image_url
  - category
  - is_featured
  - is_active
- Admin bisa edit metadata foto.
- Admin bisa delete foto dengan konfirmasi.
- Gallery Ines hanya menampilkan foto active.

Desain:
- clean admin
- preview foto jelas
- action edit/delete mudah ditemukan
- jangan memakai scrapbook berlebihan di admin page.
Phase 17 — Admin Love Letters Management
Tujuan

Membuat halaman admin untuk mengelola love letter.

Task
1. Buat AdminLettersPage.
2. Buat LetterList.
3. Buat LetterItemCard.
4. Buat LetterForm.
5. Admin bisa tambah love letter.
6. Admin bisa edit love letter.
7. Admin bisa memilih mood.
8. Admin bisa memilih style.
9. Admin bisa set active/inactive.
10. Admin bisa delete/deactivate letter.
File yang Dibuat/Diubah
src/pages/admin/AdminLettersPage.jsx
src/components/admin/LetterList.jsx
src/components/admin/LetterItemCard.jsx
src/components/admin/LetterForm.jsx
src/components/common/ConfirmDialog.jsx
src/services/lettersService.js
src/data/moodConfig.js
Behavior
1. Admin membuka /admin/letters.
2. Sistem menampilkan daftar love letters.
3. Admin bisa tambah letter baru.
4. Admin bisa edit title, subtitle, mood, style, content, photo_url, is_active.
5. Admin bisa menonaktifkan letter.
6. Letter aktif muncul di Love Letter Generator Ines.
Acceptance Criteria
1. /admin/letters hanya bisa diakses admin.
2. Admin bisa melihat daftar love letter.
3. Admin bisa tambah love letter.
4. Admin bisa edit love letter.
5. Admin bisa memilih mood dari moodConfig.
6. Admin bisa memilih style letter.
7. Admin bisa set is_active.
8. Love Letter Generator Ines hanya menampilkan letter is_active.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 17: Admin Love Letters Management.

Buat halaman /admin/letters.

Komponen:
1. AdminLettersPage
2. LetterList
3. LetterItemCard
4. LetterForm
5. ConfirmDialog jika perlu

Fitur:
- Fetch love_letters dari Supabase melalui lettersService.
- Admin bisa tambah love letter.
- Admin bisa edit:
  - title
  - subtitle
  - mood
  - style
  - content
  - photo_url
  - is_active
- Mood harus mengikuti moodConfig.
- Style yang tersedia:
  - typewriter
  - soft-fade
  - sticky-note
  - envelope
  - glow-card
- Admin bisa menonaktifkan surat.
- Love Letter Generator Ines hanya menampilkan surat active.

Desain:
- writing-focused
- form nyaman untuk teks panjang
- clean dan tidak terlalu dekoratif.
Phase 18 — Admin Daily Messages Management
Tujuan

Membuat halaman admin untuk mengelola daily message.

Task
1. Buat AdminDailyMessagesPage.
2. Buat DailyMessageList.
3. Buat DailyMessageItemCard.
4. Buat DailyMessageForm.
5. Admin bisa tambah daily message.
6. Admin bisa edit daily message.
7. Admin bisa memilih tone.
8. Admin bisa set active/inactive.
9. Admin bisa delete/deactivate daily message.
File yang Dibuat/Diubah
src/pages/admin/AdminDailyMessagesPage.jsx
src/components/admin/DailyMessageList.jsx
src/components/admin/DailyMessageItemCard.jsx
src/components/admin/DailyMessageForm.jsx
src/components/common/ConfirmDialog.jsx
src/services/dailyMessagesService.js
Behavior
1. Admin membuka /admin/daily-messages.
2. Sistem menampilkan daftar daily messages.
3. Admin bisa tambah pesan baru.
4. Admin bisa edit message, tone, is_active.
5. Admin bisa menonaktifkan pesan.
6. Daily Message Ines hanya memilih pesan aktif.
Acceptance Criteria
1. /admin/daily-messages hanya bisa diakses admin.
2. Admin bisa melihat daftar daily message.
3. Admin bisa tambah daily message.
4. Admin bisa edit daily message.
5. Admin bisa memilih tone.
6. Admin bisa set is_active.
7. Daily Message Ines hanya memakai pesan is_active.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 18: Admin Daily Messages Management.

Buat halaman /admin/daily-messages.

Komponen:
1. AdminDailyMessagesPage
2. DailyMessageList
3. DailyMessageItemCard
4. DailyMessageForm
5. ConfirmDialog jika perlu

Fitur:
- Fetch daily_messages dari Supabase melalui dailyMessagesService.
- Admin bisa tambah daily message.
- Admin bisa edit:
  - message
  - tone
  - is_active
- Tone yang tersedia:
  - sweet
  - caring
  - funny
  - romantic
  - supportive
- Admin bisa menonaktifkan pesan.
- Daily Message Ines hanya memakai pesan active.

Desain:
- simple
- quick editing
- clean admin UI.
Phase 19 — Visual Polish dengan Library UI
Tujuan

Membuat website terasa lebih interaktif dan tidak basic dengan bantuan library UI yang sudah diriset.

Task
1. Tambahkan React Bits untuk text animation atau carousel.
2. Tambahkan Animate UI untuk button/cursor jika cocok.
3. Gunakan Uiverse untuk input/textarea/button kecil jika cocok.
4. Gunakan Vengeance UI glow card secara terbatas.
5. Tambahkan custom scrapbook CSS.
6. Pastikan semua komponen tetap konsisten dengan Design System.
7. Admin area tetap clean dan tidak terlalu banyak animasi.
Prioritas Library
1. Framer Motion / Motion
2. React Bits
3. Animate UI
4. Uiverse
5. Vengeance UI
6. Skiper UI
Area Polish
Unlock:
- animated text
- elegant input
- soft unlock transition

Home:
- opening text animation
- floating polaroids
- scrapbook collage

Gallery:
- polaroid hover
- modal transition

Daily:
- paper note reveal
- soft card animation

Letters:
- mood carousel
- typewriter effect
- envelope animation
- glow romantic card

Saved:
- tab transition
- empty state animation

Admin:
- subtle page fade
- button hover
- modal animation
- clean loading states
Acceptance Criteria
1. Website terasa lebih interaktif.
2. Animasi tetap lembut.
3. Tidak ada halaman Ines yang terlalu ramai.
4. Admin area tetap clean dan fungsional.
5. Tidak ada library yang dipakai tanpa alasan jelas.
6. Performance tetap baik di mobile.
7. Visual area Ines tetap scrapbook 60% + romantis elegan 40%.
8. Visual area Admin tetap clean private admin + romantic minimal accent.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 19: Visual Polish.

Gunakan library UI secara selektif. Jangan memasang semua library sekaligus.

Prioritas:
1. Framer Motion untuk animasi utama.
2. React Bits untuk text animation atau carousel jika cocok.
3. Animate UI untuk button/cursor jika cocok.
4. Uiverse untuk input/textarea/button kecil jika cocok.
5. Vengeance UI hanya untuk glow card atau special card.

Aturan:
- Jangan mengubah flow utama.
- Jangan merusak data layer.
- Jangan membuat website terlalu ramai.
- Semua animasi area Ines harus lembut dan romantis.
- Admin area hanya memakai animasi ringan dan fungsional.
- Pertahankan gaya Ines: scrapbook 60% + romantis elegan 40%.
- Pertahankan gaya Admin: clean private admin.

Fokus polish pada:
- UnlockPage
- HomePage
- LettersPage
- GalleryPage
- AdminDashboardPage
Phase 20 — Responsive dan Accessibility Pass
Tujuan

Memastikan website nyaman digunakan di HP dan tetap accessible.

Task
1. Cek semua halaman Ines di mobile.
2. Cek semua halaman Admin di mobile dan desktop.
3. Perbaiki ukuran teks.
4. Perbaiki tap target button.
5. Pastikan modal bisa ditutup.
6. Pastikan input bisa dikirim dengan Enter.
7. Tambahkan alt text gambar.
8. Tambahkan reduced motion handling.
9. Pastikan musik bisa dimatikan.
10. Pastikan form admin punya label jelas.
11. Pastikan delete action memakai konfirmasi.
File yang Mungkin Diubah
src/styles/globals.css
src/styles/scrapbook.css
src/styles/admin.css
src/styles/animations.css
src/components/common/*
src/components/admin/*
src/pages/*
Acceptance Criteria
1. Website nyaman di mobile.
2. Admin nyaman di desktop dan cukup baik di mobile.
3. Tidak ada horizontal overflow.
4. Button mudah diklik.
5. Teks mudah dibaca.
6. Gambar punya alt text.
7. Modal bisa ditutup.
8. Musik bisa dimatikan.
9. Animasi tidak mengganggu.
10. Admin form punya label jelas.
11. Delete action membutuhkan konfirmasi.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 20: Responsive dan Accessibility Pass.

Audit seluruh halaman Ines:
- UnlockPage
- HomePage
- GalleryPage
- DailyPage
- LettersPage
- SavedPage

Audit seluruh halaman Admin:
- AdminDashboardPage
- AdminRepliesPage
- AdminPhotosPage
- AdminMusicPage
- AdminLettersPage
- AdminDailyMessagesPage

Perbaiki:
1. Responsiveness mobile.
2. Horizontal overflow.
3. Ukuran teks.
4. Button tap target.
5. Alt text gambar.
6. Keyboard interaction sederhana.
7. Modal close behavior.
8. Reduced motion support.
9. Music control agar jelas dan bisa dimatikan.
10. Admin form labels.
11. Delete confirmation.

Jangan menambah fitur baru. Fokus hanya memperbaiki kualitas penggunaan.
Phase 21 — Deployment ke Vercel
Tujuan

Mendeploy website ke Vercel dan memastikan env berfungsi.

Task
1. Push project ke GitHub.
2. Import repository ke Vercel.
3. Tambahkan env variables.
4. Deploy.
5. Test route Ines.
6. Test route Admin.
7. Test login role.
8. Test Supabase reply.
9. Test admin content management.
10. Test mobile.
Environment Variables di Vercel
VITE_INES_CODE=230624
VITE_ADMIN_CODE=...
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
Checklist Test Setelah Deploy
1. Website bisa dibuka.
2. /unlock tampil.
3. Kode 230624 masuk sebagai Ines.
4. Admin code masuk sebagai Admin.
5. /home tampil untuk Ines.
6. /admin tampil untuk Admin.
7. Ines tidak bisa akses /admin.
8. Admin bisa akses /admin/replies.
9. Gallery tampil.
10. Daily message tampil.
11. Love letter generator berfungsi.
12. Reply tersimpan ke Supabase.
13. Admin bisa melihat replies.
14. Music play/pause bekerja.
15. Admin bisa melihat active music.
16. Admin bisa set active music.
17. Admin bisa melihat photos.
18. Mobile layout aman.
Acceptance Criteria
1. Website online di Vercel.
2. Tidak ada error build.
3. Tidak ada env missing.
4. Role login berjalan.
5. Supabase insert/select berhasil.
6. Admin routes berjalan.
7. Website nyaman digunakan di HP.
Prompt untuk AI/Codex
Sekarang kita masuk Phase 21: Deployment ke Vercel.

Bantu saya menyiapkan project agar siap deploy:
1. Pastikan build berhasil dengan npm run build.
2. Pastikan tidak ada import path error.
3. Pastikan env variable yang dibutuhkan sudah didokumentasikan.
4. Pastikan tidak ada console error penting.
5. Buat checklist deployment ke Vercel.
6. Jangan menambah fitur baru.

Env yang dibutuhkan:
- VITE_INES_CODE
- VITE_ADMIN_CODE
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Pastikan route berikut aman:
- /unlock
- /home
- /gallery
- /daily
- /letters
- /saved
- /admin
- /admin/replies
- /admin/photos
- /admin/music
- /admin/letters
- /admin/daily-messages
8. Urutan Eksekusi yang Disarankan

Untuk menghindari implementasi berantakan, lakukan urutan berikut:

1. Phase 0: Project Setup
2. Phase 1: Design Tokens dan Global Styling
3. Phase 2: Data Layer Lokal
4. Phase 3: Routing dan Role-Based Protected Route
5. Phase 4: Unlock / Login Code Screen dengan 2 Role
6. Phase 5: Supabase Setup dan Database Schema
7. Phase 6: Home Scrapbook Welcome untuk Ines
8. Phase 7: Background Music Control
9. Phase 8: Gallery Foto untuk Ines
10. Phase 9: Daily Message untuk Ines
11. Phase 10: Love Letter Generator untuk Ines
12. Phase 11: Reply Form dan Supabase Replies
13. Phase 12: Saved, Favorites, dan History
14. Phase 13: Admin Layout dan Admin Dashboard
15. Phase 14: Admin Replies Page
16. Phase 15: Admin Music Management
17. Phase 16: Admin Photos Management
18. Phase 17: Admin Love Letters Management
19. Phase 18: Admin Daily Messages Management
20. Phase 19: Visual Polish dengan Library UI
21. Phase 20: Responsive dan Accessibility Pass
22. Phase 21: Deployment ke Vercel
9. Prioritas Jika Waktu Terbatas

Jika ingin membuat versi MVP secepat mungkin, cukup kerjakan:

Phase 0: Project Setup
Phase 1: Design Tokens dan Global Styling
Phase 2: Data Layer Lokal
Phase 3: Routing dan Role-Based Protected Route
Phase 4: Unlock / Login Code Screen dengan 2 Role
Phase 5: Supabase Setup dan Database Schema
Phase 6: Home Scrapbook Welcome untuk Ines
Phase 7: Background Music Control
Phase 10: Love Letter Generator untuk Ines
Phase 11: Reply Form dan Supabase Replies
Phase 13: Admin Layout dan Admin Dashboard
Phase 14: Admin Replies Page
Phase 21: Deployment ke Vercel

Fitur yang bisa ditunda:

Gallery detail
Saved/favorites/history
Admin photos management
Admin love letters management
Admin daily messages management
Visual polish library tambahan
Easter egg
Anniversary mode

Fitur admin music bisa diprioritaskan lebih awal jika tujuan utamanya adalah agar Moses dapat mengganti lagu dari website.

10. Aturan untuk AI/Codex Setiap Tahap

Setiap kali memberi instruksi ke AI/Codex, gunakan aturan berikut:

1. Jangan mengerjakan phase berikutnya sebelum saya bilang lanjut.
2. Jangan mengubah file di luar kebutuhan phase ini.
3. Jika membuat file baru, sebutkan path file-nya.
4. Jika mengubah file, jelaskan bagian yang diubah.
5. Jangan hardcode data konten di komponen.
6. Gunakan data dari folder src/data jika phase masih lokal.
7. Gunakan service layer untuk Supabase.
8. Jangan menulis query Supabase langsung di komponen UI.
9. Pastikan kode tetap mobile-first.
10. Pastikan route dilindungi berdasarkan role.
11. Jangan menambahkan dependency tanpa menjelaskan alasannya.
12. Setelah selesai, berikan checklist testing.
13. Tunggu aba-aba saya sebelum lanjut phase berikutnya.
11. Template Prompt Umum untuk AI/Codex

Gunakan template ini setiap mulai phase baru:

Pahami konteks proyek ini.

Saya sedang membuat website personal private untuk pacar saya, Ines. Website ini adalah interactive scrapbook dengan konsep visual scrapbook 60% dan romantis elegan 40% untuk area Ines.

Website juga memiliki area Admin/Moses dengan konsep clean private admin + romantic minimal accent.

Stack:
- React + Vite
- Tailwind CSS
- React Router
- Framer Motion
- Supabase
- Deploy ke Vercel

Role:
1. Ines
   - login dengan kode 230624
   - diarahkan ke /home
   - bisa melihat gallery, daily message, love letters, saved/history, dan mengirim reply

2. Admin / Moses
   - login dengan admin code
   - diarahkan ke /admin
   - bisa melihat replies
   - bisa mengelola photos
   - bisa mengelola music
   - bisa mengelola love letters
   - bisa mengelola daily messages

Aturan penting:
1. Kerjakan hanya phase yang saya minta.
2. Jangan lanjut ke phase berikutnya sebelum saya bilang lanjut.
3. Jangan hardcode data konten di komponen.
4. Simpan data lokal di src/data.
5. Semua query Supabase harus lewat src/services.
6. Buat komponen modular dan reusable.
7. Mobile-first.
8. Animasi lembut dan tidak berlebihan.
9. Jangan membuat area Ines terlihat seperti dashboard.
10. Jangan membuat area Admin terlalu dekoratif.
11. Jangan menambah dependency tanpa alasan jelas.
12. Setelah selesai, berikan file yang dibuat/diubah dan checklist testing.

Sekarang kerjakan:
[ISI PHASE DI SINI]
12. Definition of Done Keseluruhan

Website dianggap selesai jika:

1. Ines bisa login dengan kode 230624.
2. Admin bisa login dengan admin code.
3. Role tersimpan dan route guard berjalan.
4. Ines tidak bisa membuka route admin.
5. Admin bisa membuka route admin.
6. Home scrapbook tampil dengan baik.
7. Gallery foto bisa dibuka oleh Ines.
8. Daily message tampil random per hari.
9. Love Letter Generator bisa memilih mood.
10. Setiap mood menampilkan surat dengan style berbeda.
11. Ines bisa mengirim balasan teks.
12. Reply tersimpan ke Supabase.
13. Admin bisa melihat balasan di Admin Replies.
14. Favorites dan history berjalan.
15. Background music bisa play/pause.
16. Admin bisa melihat dan mengganti lagu aktif.
17. Admin bisa mengelola foto.
18. Admin bisa mengelola love letter.
19. Admin bisa mengelola daily message.
20. Website responsive di mobile.
21. Website berhasil deploy di Vercel.
22. Supabase berhasil menyimpan dan membaca data.
23. Desain area Ines konsisten dengan scrapbook 60% + romantis elegan 40%.
24. Desain area Admin clean, private, dan fungsional.
25. Website terasa personal, interaktif, dan tidak seperti template AI.