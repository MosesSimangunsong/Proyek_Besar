# Photobox v2 Implementation Plan

## 1. Tujuan Dokumen

Dokumen ini menjadi panduan implementasi bertahap untuk fitur **Photobox v2** pada website personal **For Ines — A Little Place for Us**.

Photobox v2 adalah pengembangan dari Photobox MVP. Pada MVP lama, fitur Photobox hanya mendukung kamera, countdown, 6 foto, 5 frame, 5 filter sederhana, preview, retake, dan download PNG. Pada v2, fitur ini diperluas menjadi pengalaman photobox yang lebih menarik seperti mini Instagram/Snapchat filter, tetapi tetap menjaga karakter utama website:

```text
Scrapbook 60% + Romantic Elegant 40%
```

Target akhir Photobox v2:

1. Ines bisa membuka `/photobox` setelah login sebagai role `ines`.
2. Ines bisa memilih layout output final:
   - `2x3`
   - `1x3`
3. Ines bisa memilih theme hasil download PNG.
4. Ines bisa memilih 20+ effect sebelum capture.
5. Effect dikunci saat capture berjalan.
6. Sistem tetap memakai capture otomatis dengan countdown.
7. Sistem bisa preview hasil foto.
8. Ines bisa retake foto tertentu atau retake all.
9. Ines bisa download hasil final sebagai PNG.
10. Tidak ada penyimpanan hasil ke Supabase pada versi ini.
11. Tidak ada upload otomatis ke Gallery pada versi ini.
12. Semua proses kamera dan rendering berjalan client-side.
13. Face tracking hanya dipakai untuk effect yang benar-benar membutuhkan landmark wajah.
14. Jika face tracking gagal atau device lambat, sistem tetap berjalan dengan fallback effect biasa.

---

## 2. Prinsip Implementasi

Selama implementasi, Codex/AI harus mengikuti prinsip berikut:

```text
1. Kerjakan bertahap, jangan langsung mengimplementasikan semua efek AR.
2. Pertahankan fitur Photobox lama yang sudah bekerja.
3. Jangan merusak route guard role Ines/Admin.
4. Jangan menyalakan kamera otomatis saat halaman dibuka.
5. Kamera hanya aktif setelah user klik Start Camera.
6. Semua efek dipilih sebelum capture.
7. Saat capture dimulai, layout, theme, dan effect dikunci.
8. Output tetap hanya download PNG.
9. Tidak menyimpan hasil photobox ke Supabase.
10. Gunakan Canvas sebagai pusat preview, capture, dan final rendering.
11. Jangan membuat overlay penting hanya di DOM jika overlay itu harus masuk ke hasil foto.
12. Gunakan asset lokal/legal untuk sticker, texture, frame, dan overlay.
13. Jangan install dependency berat tanpa alasan jelas.
14. MediaPipe hanya dimuat secara lazy saat effect face tracking dipilih.
15. Selalu cleanup camera stream, requestAnimationFrame, timer, dan face landmarker saat keluar halaman.
16. Fitur harus mobile-first.
17. iOS Safari dan Android Chrome harus dipertimbangkan sejak awal.
18. Efek boleh lucu, tetapi jangan terlalu childish atau neon.
19. Hasil PNG harus terasa lebih premium daripada MVP lama.
20. Setelah setiap phase selesai, jalankan build/lint dan lakukan checklist manual.
```

---

## 3. Stack dan Dependency

### 3.1 Stack Existing

Gunakan stack proyek saat ini:

```text
React
Vite
JavaScript
Tailwind CSS
Framer Motion / Motion
React Router
Supabase
Vercel
```

### 3.2 Browser API Utama

Photobox v2 tetap menggunakan browser API native:

```text
navigator.mediaDevices.getUserMedia()
HTMLVideoElement
HTMLCanvasElement
CanvasRenderingContext2D.drawImage()
CanvasRenderingContext2D.filter
CanvasRenderingContext2D.globalCompositeOperation
canvas.toBlob()
Fallback: canvas.toDataURL("image/png")
Native download link
```

### 3.3 Dependency Baru yang Direkomendasikan

Dependency tambahan hanya digunakan saat benar-benar dibutuhkan.

#### Phase awal

Tidak wajib menambah dependency baru jika Framer Motion/Motion sudah tersedia.

#### Phase face tracking

Tambahkan hanya saat masuk phase face tracking:

```bash
npm install @mediapipe/tasks-vision
```

Catatan:

```text
Jangan memasang @mediapipe/tasks-vision pada phase awal jika belum mengerjakan face overlay.
```

---

## 4. Struktur File Target

Struktur file target Photobox v2:

```text
src/pages/
└── PhotoboxPage.jsx

src/components/photobox/
├── CameraCanvasPreview.jsx
├── CountdownOverlay.jsx
├── PhotoboxControls.jsx
├── LayoutPicker.jsx
├── ThemePicker.jsx
├── EffectPicker.jsx
├── PhotoStripPreview.jsx
├── PhotoboxResult.jsx
├── RetakeControls.jsx
├── PrivacyNote.jsx
├── CameraErrorState.jsx
└── FaceTrackingStatus.jsx

src/hooks/
├── usePhotoboxCamera.js
├── usePhotoboxCapture.js
├── usePhotoboxEffects.js
├── usePhotoboxAssets.js
└── useFaceLandmarks.js

src/data/
├── photoboxLayouts.js
├── photoboxThemes.js
├── photoboxEffects.js
└── photoboxCopy.js

src/utils/
├── photoboxCanvasUtils.js
├── photoboxThemeRenderer.js
├── photoboxEffectRenderer.js
├── vintageEffectsUtils.js
├── faceOverlayUtils.js
├── imageAssetUtils.js
└── downloadUtils.js

public/assets/photobox/
├── stickers/
├── textures/
├── frames/
├── thumbnails/
└── fonts/
```

Jika struktur project existing berbeda, ikuti struktur existing tetapi pertahankan pemisahan tanggung jawab.

---

## 5. Data Model Utama

### 5.1 Photobox Layout

File:

```text
src/data/photoboxLayouts.js
```

Contoh struktur:

```js
export const photoboxLayouts = [
  {
    id: "layout-2x3",
    name: "Classic 2x3",
    description: "Six tiny memories in a classic photobox grid.",
    photoCount: 6,
    columns: 2,
    rows: 3,
    output: {
      width: 1200,
      height: 1800,
      padding: 64,
      gap: 32
    }
  },
  {
    id: "layout-1x3",
    name: "Sweet Strip 1x3",
    description: "Three little memories like a vintage photo strip.",
    photoCount: 3,
    columns: 1,
    rows: 3,
    output: {
      width: 900,
      height: 1800,
      padding: 56,
      gap: 28
    }
  }
];
```

Rules:

```text
layout-2x3 membutuhkan 6 foto.
layout-1x3 membutuhkan 3 foto.
Jumlah capture mengikuti selectedLayout.photoCount.
```

---

### 5.2 Photobox Theme

File:

```text
src/data/photoboxThemes.js
```

Contoh struktur:

```js
export const photoboxThemes = [
  {
    id: "vintage-photobooth",
    name: "Vintage Photobooth",
    category: "Vintage",
    description: "Old-school photo strip with soft paper texture.",
    compatibleLayouts: ["layout-2x3", "layout-1x3"],
    thumbnail: "/assets/photobox/thumbnails/theme-vintage.webp",
    renderer: "vintagePhotobooth",
    background: {
      color: "#FFF8EF",
      texture: "/assets/photobox/textures/old-paper.jpg"
    },
    decorations: ["film-grain", "dust-scratch", "date-label"],
    typography: {
      title: "Photobox",
      subtitle: "For Ines",
      footer: "our little place"
    }
  }
];
```

Minimal theme awal:

```text
1. Vintage Photobooth
2. Old Paper Album
3. Polaroid Collage
4. Cassette Tape
5. VHS Camcorder
6. Soft Scrapbook
7. Romantic Dusty Rose
8. Golden Memory
```

---

### 5.3 Photobox Effect

File:

```text
src/data/photoboxEffects.js
```

Jenis effect:

```text
COLOR_FILTER
FULL_FRAME
STATIC_STICKER
FACE_OVERLAY
COMBO
```

Contoh struktur:

```js
export const photoboxEffects = [
  {
    id: "normal",
    name: "Normal",
    category: "Basic",
    type: "COLOR_FILTER",
    thumbnail: "/assets/photobox/thumbnails/effect-normal.webp",
    requiresFaceTracking: false,
    cssFilter: "none",
    canvasFilter: "none",
    overlays: []
  },
  {
    id: "warm-film",
    name: "Warm Film",
    category: "Aesthetic",
    type: "COLOR_FILTER",
    thumbnail: "/assets/photobox/thumbnails/effect-warm-film.webp",
    requiresFaceTracking: false,
    cssFilter: "sepia(0.18) saturate(1.15) brightness(1.05)",
    canvasFilter: "sepia(18%) saturate(115%) brightness(105%)",
    overlays: []
  },
  {
    id: "puppy-love",
    name: "Puppy Love",
    category: "Face",
    type: "FACE_OVERLAY",
    thumbnail: "/assets/photobox/thumbnails/effect-puppy.webp",
    requiresFaceTracking: true,
    canvasFilter: "brightness(105%) saturate(108%)",
    overlays: [
      {
        id: "dog-ears",
        asset: "/assets/photobox/stickers/dog-ears.webp",
        anchor: "headTop",
        scale: 1.35,
        offsetY: -0.35
      },
      {
        id: "dog-nose",
        asset: "/assets/photobox/stickers/dog-nose.webp",
        anchor: "noseTip",
        scale: 0.32,
        offsetY: 0.02
      }
    ]
  }
];
```

Minimal 20+ effect awal:

```text
Basic:
1. Normal
2. Soft Warm
3. Soft Pink
4. Black & White

Aesthetic:
5. Warm Film
6. Old Photo
7. Dusty Rose Film
8. Retro 90s
9. Dreamy Cream
10. Golden Hour
11. Light Leak
12. Film Grain
13. Disposable Camera
14. VHS Soft

Scrapbook / Romantic Static:
15. Floating Hearts
16. Sparkle Love
17. For Ines Sticker
18. Washi Tape Corners
19. Paper Note
20. Doodle Hearts

Face Overlay, phase lanjutan:
21. Puppy Love
22. Cat Ears
23. Bunny Ears
24. Crown
25. Heart Glasses
26. Blush Cheeks
```

Catatan:

```text
Effect face overlay boleh disiapkan di data sejak awal, tetapi implementasi face tracking masuk phase terpisah.
```

---

### 5.4 Captured Photo

Format captured photo:

```js
{
  id: "photo-1",
  index: 0,
  dataUrl: "data:image/png;base64,...",
  capturedAt: "2026-07-08T...",
  layoutId: "layout-2x3",
  themeId: "vintage-photobooth",
  effectId: "warm-film",
  width: 1280,
  height: 720
}
```

Rules:

```text
Captured photo menyimpan hasil yang sudah dibakar dengan effect aktif saat capture.
Final PNG menggunakan dataUrl captured photo tersebut.
```

---

## 6. Rendering Pipeline

### 6.1 Pipeline Utama

```text
Start Camera
↓
Video source aktif
↓
CameraCanvasPreview menggambar video ke canvas
↓
Apply selected effect preview
↓
Jika effect butuh face tracking:
    jalankan useFaceLandmarks
    render face overlay ke canvas
Jika tidak:
    lewati face tracking
↓
Start Photobox
↓
Countdown
↓
Capture current canvas frame
↓
Simpan captured photo
↓
Ulangi sampai photoCount sesuai layout
↓
Preview captured photos
↓
Retake jika perlu
↓
Generate final PNG dengan selected theme + selected layout
↓
Download PNG
```

### 6.2 Kenapa Capture dari Canvas, Bukan Video Langsung

Pada MVP lama, capture bisa dilakukan langsung dari video dengan `drawImage(video)`. Pada v2, effect harus ikut masuk ke hasil foto. Karena itu capture harus mengambil frame dari canvas preview yang sudah berisi:

```text
video frame
+ color filter
+ full frame overlay
+ static sticker
+ face overlay jika ada
```

### 6.3 Prinsip Final PNG Renderer

Final PNG renderer tidak mengambil screenshot DOM. Renderer harus membuat canvas baru dan menggambar ulang:

```text
background theme
photo grid
captured photos
frame/border
texture overlay
scrapbook decoration
title/subtitle/footer/date
final grain/light leak jika theme membutuhkan
```

---

## 7. Phase Implementasi

## Phase 0 — Audit Photobox Existing

### Tujuan

Memahami kondisi Photobox yang sudah ada agar upgrade tidak merusak fitur lama.

### Task

1. Cek file existing:
   - `src/pages/PhotoboxPage.jsx`
   - `src/hooks/usePhotoboxCamera.js`
   - `src/utils/photoboxUtils.js`
   - `src/data/photoboxFrames.js`
   - `src/data/photoboxFilters.js`
   - semua komponen di `src/components/photobox/`
2. Catat alur kamera, capture, retake, preview, dan download yang sudah berjalan.
3. Pastikan route `/photobox` masih hanya untuk role `ines`.
4. Pastikan admin tidak melihat menu Photobox.
5. Pastikan kamera berhenti saat halaman ditinggalkan.
6. Pastikan build existing lulus sebelum perubahan besar.

### File yang Dicek

```text
src/pages/PhotoboxPage.jsx
src/components/photobox/*
src/hooks/usePhotoboxCamera.js
src/utils/photoboxUtils.js
src/data/photoboxFrames.js
src/data/photoboxFilters.js
src/App.jsx
src/components/common/InesLayout.jsx
```

### Acceptance Criteria

1. Developer memahami struktur Photobox lama.
2. Tidak ada fitur lama yang dihapus tanpa pengganti.
3. Route guard tetap aman.
4. Build/lint baseline diketahui.

### Testing Checklist

```text
[ ] /photobox hanya bisa dibuka role ines.
[ ] Kamera tidak menyala otomatis.
[ ] Kamera bisa start manual.
[ ] Capture lama masih berjalan.
[ ] Preview lama masih berjalan.
[ ] Download lama masih berjalan.
[ ] Kamera mati saat keluar halaman.
[ ] npm run build lulus sebelum upgrade.
```

---

## Phase 1 — Data Layer v2: Layout, Theme, Effect

### Tujuan

Menyiapkan data dasar untuk Photobox v2 tanpa mengubah rendering besar terlebih dahulu.

### Task

1. Buat `src/data/photoboxLayouts.js`.
2. Buat `src/data/photoboxThemes.js`.
3. Buat `src/data/photoboxEffects.js`.
4. Buat `src/data/photoboxCopy.js` jika belum ada.
5. Pastikan minimal tersedia:
   - 2 layout
   - 8 theme
   - 20+ effect
6. Untuk phase awal, effect face overlay boleh disiapkan datanya tetapi diberi flag `requiresFaceTracking: true`.
7. Pastikan semua asset path mengarah ke `/assets/photobox/...`.

### File yang Dibuat/Diubah

```text
src/data/photoboxLayouts.js
src/data/photoboxThemes.js
src/data/photoboxEffects.js
src/data/photoboxCopy.js
```

### Acceptance Criteria

1. Data layout tersedia untuk `2x3` dan `1x3`.
2. Data theme tersedia minimal 8.
3. Data effect tersedia 20+.
4. Data tidak hardcoded di komponen.
5. Data bisa diimport tanpa error.
6. Tidak ada asset path yang menyebabkan build error.

### Testing Checklist

```text
[ ] Import photoboxLayouts berhasil.
[ ] Import photoboxThemes berhasil.
[ ] Import photoboxEffects berhasil.
[ ] Jumlah effects >= 20.
[ ] Semua id unik.
[ ] Semua compatibleLayouts valid.
[ ] Semua requiresFaceTracking berupa boolean.
[ ] npm run build lulus.
```

---

## Phase 2 — LayoutPicker dan ThemePicker

### Tujuan

Menambahkan pilihan layout dan theme ke UI sebelum capture dimulai.

### Task

1. Buat `LayoutPicker.jsx`.
2. Buat `ThemePicker.jsx`.
3. Tambahkan state di `PhotoboxPage`:
   - `selectedLayout`
   - `selectedTheme`
4. Default layout: `layout-2x3`.
5. Default theme: `vintage-photobooth` atau theme pertama.
6. Saat capture berjalan, LayoutPicker dan ThemePicker disabled.
7. Jumlah capture mengikuti `selectedLayout.photoCount`.
8. Update copy agar Ines tahu layout 2x3 mengambil 6 foto dan 1x3 mengambil 3 foto.

### File yang Dibuat/Diubah

```text
src/components/photobox/LayoutPicker.jsx
src/components/photobox/ThemePicker.jsx
src/pages/PhotoboxPage.jsx
src/data/photoboxLayouts.js
src/data/photoboxThemes.js
```

### Acceptance Criteria

1. Ines bisa memilih 2x3 atau 1x3.
2. Ines bisa memilih theme.
3. Pilihan layout/theme terlihat jelas.
4. Layout/theme tidak bisa diganti saat capture berjalan.
5. Photo count berubah sesuai layout.
6. UI nyaman di mobile.

### Testing Checklist

```text
[ ] Pilih layout 2x3, sistem menyiapkan 6 foto.
[ ] Pilih layout 1x3, sistem menyiapkan 3 foto.
[ ] Theme aktif terlihat di UI.
[ ] LayoutPicker disabled saat capture.
[ ] ThemePicker disabled saat capture.
[ ] Tidak ada layout yang bisa dipilih setelah capture dimulai.
[ ] npm run build lulus.
```

---

## Phase 3 — EffectPicker 20+ dan State Effect

### Tujuan

Membuat effect tray seperti Instagram secara sederhana dan mobile-friendly.

### Task

1. Buat `EffectPicker.jsx`.
2. Buat hook `usePhotoboxEffects.js`.
3. Tambahkan state `selectedEffect` di `PhotoboxPage`.
4. Tampilkan effect secara horizontal scroll atau carousel.
5. Group effect berdasarkan category:
   - Basic
   - Aesthetic
   - Romantic
   - Scrapbook
   - Face
6. Effect yang membutuhkan face tracking boleh tampil dengan badge kecil seperti `Face` atau `Coming later` jika face tracking belum diimplementasikan.
7. Saat capture berjalan, EffectPicker disabled.
8. Effect dipilih sebelum capture dan dikunci saat capture berjalan.

### File yang Dibuat/Diubah

```text
src/components/photobox/EffectPicker.jsx
src/hooks/usePhotoboxEffects.js
src/pages/PhotoboxPage.jsx
src/data/photoboxEffects.js
```

### Acceptance Criteria

1. 20+ effect tampil di UI.
2. Ines bisa memilih effect sebelum capture.
3. Effect aktif punya active state yang jelas.
4. EffectPicker mobile-friendly.
5. EffectPicker disabled saat capture.
6. Effect face tracking tidak menyebabkan error walau MediaPipe belum dipasang.

### Testing Checklist

```text
[ ] Effect list tampil.
[ ] Jumlah effect >= 20.
[ ] Effect aktif berubah saat dipilih.
[ ] EffectPicker bisa horizontal scroll di HP.
[ ] EffectPicker disabled saat capture.
[ ] Face effect belum aktif tidak merusak flow.
[ ] npm run build lulus.
```

---

## Phase 4 — CameraCanvasPreview Basic

### Tujuan

Mengubah preview kamera dari video-only menjadi canvas-based preview agar effect bisa masuk ke hasil capture.

### Task

1. Buat `CameraCanvasPreview.jsx`.
2. Pertahankan `videoRef` dari `usePhotoboxCamera`.
3. Tambahkan `canvasRef` untuk preview.
4. Video boleh dibuat hidden atau opacity 0, tetapi tetap menjadi source.
5. Gunakan `requestAnimationFrame` untuk menggambar video ke canvas.
6. Terapkan `selectedEffect.canvasFilter` pada canvas.
7. Untuk phase ini, cukup render color filter dan basic effect.
8. Tambahkan cleanup RAF saat component unmount.
9. Pastikan atribut video untuk mobile:
   - `playsInline`
   - `autoPlay`
   - `muted`

### File yang Dibuat/Diubah

```text
src/components/photobox/CameraCanvasPreview.jsx
src/hooks/usePhotoboxCamera.js
src/utils/photoboxCanvasUtils.js
src/pages/PhotoboxPage.jsx
```

### Acceptance Criteria

1. Preview kamera tampil melalui canvas.
2. Basic color effect terlihat di preview.
3. Tidak ada black canvas saat kamera aktif.
4. RAF berhenti saat keluar halaman.
5. Video tetap compatible dengan iOS Safari.
6. Kamera tidak autoplay sebelum Start Camera.

### Testing Checklist

```text
[ ] Start Camera menampilkan preview canvas.
[ ] Normal effect menampilkan kamera normal.
[ ] Warm/Soft Pink/BW effect terlihat di preview.
[ ] Kamera mati saat keluar halaman.
[ ] Tidak ada loop RAF setelah keluar halaman.
[ ] iOS attributes ada: playsInline, autoPlay, muted.
[ ] npm run build lulus.
```

---

## Phase 5 — Capture dari Canvas Preview

### Tujuan

Mengubah capture agar mengambil frame dari canvas preview, bukan langsung dari video, supaya effect yang dipilih ikut masuk ke foto.

### Task

1. Buat hook `usePhotoboxCapture.js`.
2. Tambahkan fungsi `captureCanvasFrame`.
3. Simpan hasil capture sebagai dataUrl atau blob URL.
4. Pastikan captured photo menyimpan metadata:
   - layoutId
   - themeId
   - effectId
   - capturedAt
   - index
5. Update auto capture agar jumlah capture mengikuti `selectedLayout.photoCount`.
6. Update retake single photo agar juga memakai canvas preview.
7. Pastikan effect/layout/theme tidak berubah saat capture berjalan.

### File yang Dibuat/Diubah

```text
src/hooks/usePhotoboxCapture.js
src/pages/PhotoboxPage.jsx
src/components/photobox/CountdownOverlay.jsx
src/utils/photoboxCanvasUtils.js
```

### Acceptance Criteria

1. Capture mengambil gambar dari canvas preview.
2. Effect warna ikut masuk ke captured photo.
3. Layout 2x3 menghasilkan 6 foto.
4. Layout 1x3 menghasilkan 3 foto.
5. Retake foto tertentu mengganti foto yang benar.
6. Metadata photo tersimpan.

### Testing Checklist

```text
[ ] Pilih BW, hasil captured photo BW.
[ ] Pilih Warm, hasil captured photo Warm.
[ ] Layout 2x3 capture 6 foto.
[ ] Layout 1x3 capture 3 foto.
[ ] Retake foto ke-2 hanya mengganti foto ke-2.
[ ] Retake all menghapus semua foto.
[ ] npm run build lulus.
```

---

## Phase 6 — Static Overlay dan Full Frame Effects

### Tujuan

Menerapkan effect non-face seperti film grain, light leak, sparkle, hearts, sticker, washi tape, dan doodle ke preview/capture.

### Task

1. Buat `photoboxEffectRenderer.js`.
2. Buat `imageAssetUtils.js` untuk preload asset.
3. Buat `usePhotoboxAssets.js`.
4. Render `FULL_FRAME` overlay ke canvas.
5. Render `STATIC_STICKER` overlay ke canvas.
6. Terapkan `globalCompositeOperation` untuk overlay tertentu:
   - `screen` untuk light leak
   - `overlay` untuk film grain
   - `multiply` untuk paper/dust style
7. Tambahkan fallback jika asset gagal dimuat.
8. Pastikan overlay ikut masuk capture.

### File yang Dibuat/Diubah

```text
src/utils/photoboxEffectRenderer.js
src/utils/imageAssetUtils.js
src/hooks/usePhotoboxAssets.js
src/components/photobox/CameraCanvasPreview.jsx
src/data/photoboxEffects.js
public/assets/photobox/textures/*
public/assets/photobox/stickers/*
```

### Acceptance Criteria

1. Light leak terlihat di preview dan hasil capture.
2. Film grain/dust terlihat di preview dan hasil capture.
3. Floating hearts/sparkle/sticker terlihat di preview dan hasil capture.
4. Asset gagal load tidak membuat aplikasi crash.
5. Performance tetap layak di mobile.

### Testing Checklist

```text
[ ] Light leak effect muncul.
[ ] Film grain effect muncul.
[ ] Floating hearts effect muncul.
[ ] For Ines sticker effect muncul.
[ ] Overlay ikut masuk captured photo.
[ ] Jika asset tidak ada, tampil fallback tanpa crash.
[ ] npm run build lulus.
```

---

## Phase 7 — Final PNG Theme Renderer v2

### Tujuan

Membuat hasil download PNG jauh lebih bagus dengan theme output final seperti vintage, polaroid, cassette, VHS, dan scrapbook.

### Task

1. Buat `photoboxThemeRenderer.js`.
2. Buat `vintageEffectsUtils.js`.
3. Buat `downloadUtils.js`.
4. Gunakan canvas baru untuk output final.
5. Ukuran canvas mengikuti selected layout dan theme.
6. Render background theme.
7. Render grid foto sesuai layout.
8. Gunakan object-fit cover agar foto tidak gepeng.
9. Render frame/border.
10. Render texture:
    - paper
    - dust
    - scratch
    - film grain
    - light leak
11. Render dekorasi:
    - washi tape
    - stamp
    - handwritten label
    - cassette frame
    - VHS timestamp
12. Export PNG menggunakan `canvas.toBlob()`.
13. Fallback ke `toDataURL` jika `toBlob` gagal.
14. Download file dengan nama:

```text
ines-photobox-YYYY-MM-DD.png
```

### File yang Dibuat/Diubah

```text
src/utils/photoboxThemeRenderer.js
src/utils/vintageEffectsUtils.js
src/utils/downloadUtils.js
src/utils/photoboxCanvasUtils.js
src/components/photobox/PhotoboxResult.jsx
src/pages/PhotoboxPage.jsx
src/data/photoboxThemes.js
public/assets/photobox/textures/*
public/assets/photobox/frames/*
public/assets/photobox/fonts/*
```

### Acceptance Criteria

1. Download PNG berjalan.
2. Layout 2x3 menghasilkan PNG 6 foto.
3. Layout 1x3 menghasilkan PNG 3 foto.
4. Theme vintage terlihat berbeda dari theme scrapbook.
5. Theme cassette/tape punya dekorasi visual yang jelas.
6. Theme VHS/camcorder punya timestamp/style retro.
7. Foto tidak gepeng.
8. PNG final lebih bagus daripada MVP lama.

### Testing Checklist

```text
[ ] Download layout 2x3 berhasil.
[ ] Download layout 1x3 berhasil.
[ ] PNG terbuka normal di device.
[ ] Foto tidak gepeng.
[ ] Theme vintage terlihat.
[ ] Theme polaroid terlihat.
[ ] Theme cassette terlihat.
[ ] Theme VHS terlihat.
[ ] Nama file sesuai format.
[ ] npm run build lulus.
```

---

## Phase 8 — Preview Result dan Retake Polish

### Tujuan

Merapikan preview captured photos, retake, dan result state agar user flow terasa nyaman.

### Task

1. Update `PhotoStripPreview.jsx` agar mendukung 2x3 dan 1x3.
2. Update `RetakeControls.jsx`.
3. Update `PhotoboxResult.jsx`.
4. Tampilkan info selected layout/theme/effect pada preview.
5. Tambahkan state loading saat generate final PNG.
6. Tambahkan error state jika generate gagal.
7. Tambahkan empty state jika belum semua foto diambil.
8. Pastikan retake tidak mengubah layout/theme/effect.

### File yang Dibuat/Diubah

```text
src/components/photobox/PhotoStripPreview.jsx
src/components/photobox/RetakeControls.jsx
src/components/photobox/PhotoboxResult.jsx
src/pages/PhotoboxPage.jsx
```

### Acceptance Criteria

1. Preview 2x3 tampil rapi.
2. Preview 1x3 tampil rapi.
3. Retake per foto jelas.
4. Retake all jelas.
5. Loading generate PNG jelas.
6. Error generate PNG tampil lembut.
7. UI mobile nyaman.

### Testing Checklist

```text
[ ] Preview 2x3 rapi di mobile.
[ ] Preview 1x3 rapi di mobile.
[ ] Tombol retake mudah ditemukan.
[ ] Retake all bekerja.
[ ] Loading saat download muncul.
[ ] Error state tidak teknis.
[ ] npm run build lulus.
```

---

## Phase 9 — MediaPipe Face Tracking Setup

### Tujuan

Menambahkan fondasi face landmark secara lazy dan aman tanpa langsung mengaktifkan semua face effects.

### Task

1. Install `@mediapipe/tasks-vision`.
2. Buat `useFaceLandmarks.js`.
3. Model hanya dimuat jika selectedEffect.requiresFaceTracking = true.
4. Gunakan `FilesetResolver` dan `FaceLandmarker`.
5. Gunakan `detectForVideo()` pada interval yang terkontrol.
6. Simpan landmark di `ref`, bukan state yang memicu render terus-menerus.
7. Tambahkan status:
   - `idle`
   - `loading`
   - `ready`
   - `no-face`
   - `error`
8. Tambahkan cleanup:
   - stop loop
   - close faceLandmarker
   - clear ref
9. Jika model gagal, fallback ke effect tanpa face overlay.

### File yang Dibuat/Diubah

```text
src/hooks/useFaceLandmarks.js
src/components/photobox/FaceTrackingStatus.jsx
src/components/photobox/CameraCanvasPreview.jsx
src/pages/PhotoboxPage.jsx
package.json
```

### Acceptance Criteria

1. MediaPipe hanya dimuat saat face effect dipilih.
2. Non-face effect tidak memuat MediaPipe.
3. Status face tracking tampil lembut.
4. Jika wajah tidak terdeteksi, aplikasi tidak crash.
5. Saat keluar halaman, model/loop dibersihkan.

### Testing Checklist

```text
[ ] Pilih non-face effect, MediaPipe tidak load.
[ ] Pilih face effect, MediaPipe mulai load.
[ ] Loading state tampil.
[ ] Ready state tampil saat model siap.
[ ] No face state tampil saat wajah tidak ada.
[ ] Error state tidak crash.
[ ] Kamera/model berhenti saat keluar halaman.
[ ] npm run build lulus.
```

---

## Phase 10 — Face Overlay Effects Basic

### Tujuan

Menerapkan face effects sederhana seperti dog ears, cat ears, crown, glasses, dan blush dengan landmark wajah.

### Task

1. Buat `faceOverlayUtils.js`.
2. Buat fungsi normalisasi landmark:
   - dari rasio 0..1 ke pixel canvas.
3. Buat anchor points:
   - `leftEyeOuter`
   - `rightEyeOuter`
   - `headTop`
   - `noseTip`
   - `leftCheek`
   - `rightCheek`
4. Buat helper:
   - `getFaceRotation()`
   - `getFaceWidth()`
   - `drawFaceOverlay()`
   - `drawOverlayImage()`
5. Render overlay dengan:
   - `ctx.save()`
   - `ctx.translate()`
   - `ctx.rotate()`
   - `ctx.drawImage()`
   - `ctx.restore()`
6. Implementasi minimal face effects:
   - Puppy Love
   - Cat Ears
   - Crown
   - Heart Glasses
   - Blush Cheeks
7. Tambahkan fallback jika landmark tidak ada.

### File yang Dibuat/Diubah

```text
src/utils/faceOverlayUtils.js
src/utils/photoboxEffectRenderer.js
src/components/photobox/CameraCanvasPreview.jsx
src/data/photoboxEffects.js
public/assets/photobox/stickers/*
```

### Acceptance Criteria

1. Dog ears mengikuti kepala.
2. Cat ears mengikuti kepala.
3. Crown mengikuti kepala.
4. Glasses mengikuti mata.
5. Blush mengikuti pipi.
6. Overlay ikut masuk hasil capture.
7. Jika wajah tidak terdeteksi, capture tetap bisa berjalan tanpa overlay.

### Testing Checklist

```text
[ ] Puppy Love muncul saat wajah terdeteksi.
[ ] Cat Ears muncul saat wajah terdeteksi.
[ ] Crown muncul saat wajah terdeteksi.
[ ] Heart Glasses berada di area mata.
[ ] Blush berada di area pipi.
[ ] Overlay ikut masuk captured photo.
[ ] No face fallback aman.
[ ] npm run build lulus.
```

---

## Phase 11 — Performance, Mobile, dan Fallback Pass

### Tujuan

Menstabilkan fitur untuk mobile browser dan device yang tidak terlalu kuat.

### Task

1. Batasi resolusi canvas preview jika device lambat.
2. Batasi face detection FPS.
3. Jangan menjalankan face detection untuk effect non-face.
4. Tambahkan fallback mode:
   - disable face overlay
   - keep color/static effects
5. Pastikan cleanup semua resource:
   - camera stream
   - RAF preview
   - RAF/detection loop
   - countdown interval
   - face landmarker
   - object URLs jika ada
6. Pastikan iOS Safari attributes benar.
7. Gunakan `toBlob` untuk output final.
8. Fallback ke `toDataURL` jika perlu.
9. Tambahkan error message yang lembut.

### File yang Dibuat/Diubah

```text
src/hooks/usePhotoboxCamera.js
src/hooks/useFaceLandmarks.js
src/components/photobox/CameraCanvasPreview.jsx
src/utils/downloadUtils.js
src/pages/PhotoboxPage.jsx
```

### Acceptance Criteria

1. Fitur tidak terasa terlalu berat di mobile.
2. Kamera berhenti saat keluar halaman.
3. Tidak ada memory leak yang jelas.
4. Face tracking bisa fallback.
5. Download tetap berhasil.
6. Error tidak teknis.

### Testing Checklist

```text
[ ] Test di Chrome desktop.
[ ] Test di Android Chrome.
[ ] Test di iOS Safari jika tersedia.
[ ] Test permission denied.
[ ] Test no camera.
[ ] Test face effect pada device lambat.
[ ] Test pindah route saat kamera aktif.
[ ] Test refresh saat kamera aktif.
[ ] npm run build lulus.
```

---

## Phase 12 — Visual Polish dan UX Copy

### Tujuan

Merapikan pengalaman Photobox agar terasa personal, romantis, dan tidak seperti demo teknis.

### Task

1. Tambahkan `PrivacyNote`:

```text
Everything stays on your device, sayang.
Nothing is uploaded. This little memory is only yours.
```

2. Rapikan copy:
   - Start Camera
   - Choose your little style
   - Pick a memory layout
   - Start Photobox
   - Smile, sayang!
   - Your little photobox is ready
3. Tambahkan micro-animation lembut.
4. Pastikan active state effect/theme/layout terlihat jelas.
5. Pastikan tidak terlalu ramai.
6. Pastikan warna mengikuti design system.
7. Pastikan mobile layout enak dipakai satu tangan.

### File yang Dibuat/Diubah

```text
src/components/photobox/PrivacyNote.jsx
src/components/photobox/*
src/data/photoboxCopy.js
src/styles/scrapbook.css
src/styles/animations.css
```

### Acceptance Criteria

1. Photobox terasa personal dan romantis.
2. UX copy tidak teknis.
3. Privacy note tampil sebelum/di sekitar Start Camera.
4. UI tidak terlalu ramai.
5. Semua tombol jelas.
6. Mobile nyaman.

### Testing Checklist

```text
[ ] Copy terasa natural.
[ ] Privacy note terbaca.
[ ] Tombol utama jelas.
[ ] UI tidak seperti dashboard.
[ ] Effect tray tidak terlalu memenuhi layar.
[ ] Layout di mobile nyaman.
[ ] npm run build lulus.
```

---

## Phase 13 — Final QA dan Regression Test

### Tujuan

Memastikan Photobox v2 siap dipakai tanpa merusak fitur website lain.

### Task

1. Test route guard.
2. Test semua layout.
3. Test semua theme.
4. Test semua effect non-face.
5. Test minimal beberapa face effect.
6. Test retake.
7. Test download PNG.
8. Test permission denied.
9. Test no camera.
10. Test keluar halaman saat kamera aktif.
11. Test responsive mobile.
12. Test build/lint.
13. Pastikan fitur lain website tidak rusak:
    - Home
    - Gallery
    - Daily
    - Letters
    - Saved
    - Admin

### Acceptance Criteria

1. `/photobox` stabil.
2. Role guard aman.
3. Output PNG sesuai layout/theme/effect.
4. Tidak ada crash pada permission denied.
5. Tidak ada kamera aktif setelah keluar halaman.
6. Build/lint lulus.

### Testing Checklist

```text
[ ] Role ines bisa membuka /photobox.
[ ] Role admin diarahkan ke /admin.
[ ] Guest diarahkan ke /unlock.
[ ] Kamera hanya aktif setelah Start Camera.
[ ] Layout 2x3 berhasil.
[ ] Layout 1x3 berhasil.
[ ] Semua theme bisa dipilih.
[ ] Semua non-face effect bisa dipilih.
[ ] Face effect fallback aman.
[ ] Retake single berjalan.
[ ] Retake all berjalan.
[ ] Download PNG berhasil.
[ ] Permission denied tampil lembut.
[ ] No camera tampil lembut.
[ ] Kamera mati saat keluar halaman.
[ ] npm run build lulus.
[ ] npm run lint lulus jika script tersedia.
```

---

## 8. Prompt Implementasi Bertahap untuk Codex

Gunakan prompt berikut saat mulai mengerjakan dengan Codex. Berikan satu phase saja setiap kali agar implementasi tetap aman.

---

### Prompt Umum untuk Semua Phase

```text
Pahami konteks proyek ini.

Saya sedang membangun website personal private untuk Ines bernama “For Ines — A Little Place for Us”.
Stack proyek:
- React
- Vite
- JavaScript
- Tailwind CSS
- Framer Motion / Motion
- React Router
- Supabase
- Vercel

Website memiliki dua role:
1. Ines, login dengan kode 230624.
2. Admin/Moses, login dengan admin code.

Fitur yang sedang kita kerjakan adalah Photobox v2.
Photobox v2 adalah upgrade dari Photobox MVP lama.
Targetnya:
- route /photobox hanya untuk role ines
- kamera aktif hanya setelah Start Camera
- user bisa pilih layout 2x3 atau 1x3
- user bisa pilih theme output final
- user bisa pilih 20+ effect sebelum capture
- effect dikunci saat capture berjalan
- output hanya download PNG
- tidak simpan ke Supabase
- tidak upload otomatis ke Gallery
- semua rendering kamera/foto dilakukan client-side memakai Canvas
- face tracking memakai MediaPipe hanya pada phase lanjutan dan hanya untuk effect yang membutuhkan wajah

Design harus mengikuti:
Scrapbook 60% + Romantic Elegant 40%.
Jangan membuat UI seperti dashboard, cyberpunk, neon, atau terlalu childish.

Prinsip kerja:
- Kerjakan hanya phase yang saya minta.
- Jangan mengerjakan phase berikutnya.
- Jangan install dependency baru tanpa alasan jelas.
- Jangan merusak fitur Photobox lama yang sudah berjalan.
- Jangan merusak route guard.
- Setelah selesai, jelaskan file yang dibuat/diubah dan checklist test.
```

---

### Prompt Phase 0 — Audit Existing

```text
Sekarang kerjakan Phase 0: Audit Photobox Existing.

Tugas:
1. Baca struktur Photobox existing.
2. Cek file PhotoboxPage, usePhotoboxCamera, photoboxUtils, data frame/filter, dan komponen photobox.
3. Jelaskan alur existing kamera, capture, retake, preview, dan download.
4. Jangan mengubah kode terlebih dahulu kecuali ada error fatal yang mencegah build.
5. Pastikan route /photobox tetap hanya role ines.
6. Berikan ringkasan kondisi saat ini dan risiko upgrade.

Output yang saya inginkan:
- daftar file yang dicek
- ringkasan alur existing
- bagian yang aman dipertahankan
- bagian yang perlu diubah untuk v2
- checklist sebelum masuk Phase 1
```

---

### Prompt Phase 1 — Data Layer v2

```text
Sekarang kerjakan Phase 1: Data Layer Photobox v2.

Buat atau update file:
1. src/data/photoboxLayouts.js
2. src/data/photoboxThemes.js
3. src/data/photoboxEffects.js
4. src/data/photoboxCopy.js jika dibutuhkan

Requirement:
- Layout tersedia: layout-2x3 dan layout-1x3.
- layout-2x3 punya photoCount 6.
- layout-1x3 punya photoCount 3.
- Theme minimal 8: Vintage Photobooth, Old Paper Album, Polaroid Collage, Cassette Tape, VHS Camcorder, Soft Scrapbook, Romantic Dusty Rose, Golden Memory.
- Effect minimal 20+.
- Effect punya type: COLOR_FILTER, FULL_FRAME, STATIC_STICKER, FACE_OVERLAY, COMBO.
- Effect face overlay boleh disiapkan datanya tetapi jangan implementasi MediaPipe dulu.
- Semua data harus valid JavaScript dan bisa diimport.
- Jangan mengubah rendering besar di phase ini.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- berikan checklist test
- pastikan npm run build lulus
```

---

### Prompt Phase 2 — LayoutPicker dan ThemePicker

```text
Sekarang kerjakan Phase 2: LayoutPicker dan ThemePicker.

Tugas:
1. Buat src/components/photobox/LayoutPicker.jsx.
2. Buat src/components/photobox/ThemePicker.jsx.
3. Tambahkan selectedLayout dan selectedTheme ke PhotoboxPage.
4. Default layout adalah layout-2x3.
5. Default theme adalah vintage-photobooth atau theme pertama.
6. Saat capture berjalan, LayoutPicker dan ThemePicker harus disabled.
7. Jumlah capture harus mengikuti selectedLayout.photoCount.
8. UI harus mobile-first dan sesuai scrapbook romantic design.

Jangan membuat EffectPicker dulu.
Jangan mengubah final renderer besar dulu.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test layout 2x3 dan 1x3
- pastikan build lulus
```

---

### Prompt Phase 3 — EffectPicker

```text
Sekarang kerjakan Phase 3: EffectPicker 20+.

Tugas:
1. Buat src/components/photobox/EffectPicker.jsx.
2. Buat src/hooks/usePhotoboxEffects.js jika diperlukan.
3. Tampilkan semua effect dari src/data/photoboxEffects.js.
4. Group atau tampilkan category effect dengan jelas.
5. Effect aktif harus punya active state.
6. EffectPicker disabled saat capture berjalan.
7. Effect dipilih sebelum capture dan dikunci saat capture.
8. Face effect yang membutuhkan MediaPipe jangan dijalankan dulu. Jika dipilih, boleh tampilkan badge Face / Advanced / Coming later atau fallback aman.

Jangan install MediaPipe pada phase ini.
Jangan membuat face tracking dulu.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test pilihan effect
- pastikan build lulus
```

---

### Prompt Phase 4 — CameraCanvasPreview Basic

```text
Sekarang kerjakan Phase 4: CameraCanvasPreview Basic.

Tugas:
1. Buat src/components/photobox/CameraCanvasPreview.jsx.
2. Gunakan video sebagai source kamera.
3. Tambahkan canvas preview.
4. Render video frame ke canvas memakai requestAnimationFrame.
5. Terapkan selectedEffect.canvasFilter pada canvas.
6. Pastikan video memiliki playsInline, autoPlay, muted.
7. Kamera tetap hanya aktif setelah Start Camera.
8. Cleanup requestAnimationFrame saat unmount.

Untuk phase ini cukup dukung color filter/basic effect.
Jangan implementasi static overlay atau face tracking dulu.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test filter masuk preview
- pastikan kamera berhenti saat keluar halaman
- pastikan build lulus
```

---

### Prompt Phase 5 — Capture dari Canvas

```text
Sekarang kerjakan Phase 5: Capture dari Canvas Preview.

Tugas:
1. Buat src/hooks/usePhotoboxCapture.js jika perlu.
2. Ubah capture agar mengambil frame dari canvas preview, bukan langsung dari video.
3. Pastikan selectedEffect yang terlihat di preview ikut masuk captured photo.
4. Jumlah capture mengikuti selectedLayout.photoCount.
5. Captured photo menyimpan metadata layoutId, themeId, effectId, capturedAt, index.
6. Retake single photo memakai canvas preview juga.
7. Retake all tetap bekerja.

Jangan implementasi final theme renderer dulu.
Jangan implementasi face tracking dulu.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test effect masuk capture
- pastikan build lulus
```

---

### Prompt Phase 6 — Static Overlay Effects

```text
Sekarang kerjakan Phase 6: Static Overlay dan Full Frame Effects.

Tugas:
1. Buat src/utils/photoboxEffectRenderer.js.
2. Buat src/utils/imageAssetUtils.js.
3. Buat src/hooks/usePhotoboxAssets.js jika perlu.
4. Render FULL_FRAME overlay seperti film grain, dust, light leak.
5. Render STATIC_STICKER overlay seperti floating hearts, sparkle, For Ines sticker, washi tape corners.
6. Gunakan globalCompositeOperation untuk overlay jika diperlukan.
7. Pastikan overlay terlihat di preview dan ikut masuk captured photo.
8. Jika asset gagal load, jangan crash.

Jangan implementasi MediaPipe/face tracking dulu.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- list asset yang dibutuhkan
- jelaskan fallback asset error
- pastikan build lulus
```

---

### Prompt Phase 7 — Final PNG Theme Renderer

```text
Sekarang kerjakan Phase 7: Final PNG Theme Renderer v2.

Tugas:
1. Buat src/utils/photoboxThemeRenderer.js.
2. Buat src/utils/vintageEffectsUtils.js.
3. Buat src/utils/downloadUtils.js.
4. Generate final PNG berdasarkan selectedLayout dan selectedTheme.
5. Layout 2x3 harus menampilkan 6 foto.
6. Layout 1x3 harus menampilkan 3 foto.
7. Foto harus object-fit cover dan tidak gepeng.
8. Render theme background, border, texture, dekorasi, tanggal, title, subtitle, footer.
9. Theme minimal yang harus terlihat berbeda:
   - Vintage Photobooth
   - Polaroid Collage
   - Cassette Tape
   - VHS Camcorder
   - Soft Scrapbook
10. Export memakai canvas.toBlob() dan fallback ke toDataURL jika perlu.
11. Nama file: ines-photobox-YYYY-MM-DD.png.

Jangan implementasi face tracking di phase ini.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test tiap theme
- pastikan build lulus
```

---

### Prompt Phase 8 — Preview dan Retake Polish

```text
Sekarang kerjakan Phase 8: Preview Result dan Retake Polish.

Tugas:
1. Update PhotoStripPreview agar mendukung 2x3 dan 1x3.
2. Update RetakeControls agar mudah dipakai di mobile.
3. Update PhotoboxResult untuk menampilkan loading/error/success download.
4. Tampilkan selected layout, theme, dan effect pada preview.
5. Pastikan retake single dan retake all tetap bekerja.
6. Error message harus lembut dan tidak teknis.

Jangan implementasi face tracking dulu.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test retake dan download
- pastikan build lulus
```

---

### Prompt Phase 9 — MediaPipe Setup

```text
Sekarang kerjakan Phase 9: MediaPipe Face Tracking Setup.

Tugas:
1. Install @mediapipe/tasks-vision.
2. Buat src/hooks/useFaceLandmarks.js.
3. MediaPipe hanya boleh load jika selectedEffect.requiresFaceTracking = true.
4. Non-face effect tidak boleh memuat MediaPipe.
5. Gunakan detectForVideo untuk membaca landmark dari video.
6. Simpan landmark di ref agar tidak menyebabkan render terus-menerus.
7. Tambahkan status loading, ready, no-face, error.
8. Buat FaceTrackingStatus jika perlu.
9. Cleanup model dan loop saat keluar halaman atau effect diganti ke non-face.
10. Jika model gagal, fallback ke effect tanpa face overlay.

Jangan implementasi banyak face effect dulu. Fokus setup model yang stabil.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test lazy load MediaPipe
- pastikan build lulus
```

---

### Prompt Phase 10 — Face Overlay Basic

```text
Sekarang kerjakan Phase 10: Face Overlay Effects Basic.

Tugas:
1. Buat src/utils/faceOverlayUtils.js.
2. Implement helper untuk normalisasi landmark ke pixel canvas.
3. Implement anchor point:
   - leftEyeOuter
   - rightEyeOuter
   - headTop
   - noseTip
   - leftCheek
   - rightCheek
4. Implement getFaceRotation dan getFaceWidth.
5. Implement drawFaceOverlay dengan ctx.save, ctx.translate, ctx.rotate, ctx.drawImage, ctx.restore.
6. Implement face effect awal:
   - Puppy Love
   - Cat Ears
   - Crown
   - Heart Glasses
   - Blush Cheeks
7. Pastikan overlay ikut masuk captured photo.
8. Jika wajah tidak terdeteksi, capture tetap berjalan tanpa crash.

Setelah selesai:
- jelaskan file yang dibuat/diubah
- jelaskan cara test tiap face effect
- pastikan build lulus
```

---

### Prompt Phase 11 — Performance dan Mobile Pass

```text
Sekarang kerjakan Phase 11: Performance, Mobile, dan Fallback Pass.

Tugas:
1. Batasi face detection FPS.
2. Jangan jalankan face detection untuk non-face effect.
3. Pastikan cleanup camera stream, RAF preview, detection loop, countdown interval, dan face landmarker.
4. Pastikan iOS Safari memakai playsInline, autoPlay, muted.
5. Gunakan toBlob untuk download PNG dan fallback toDataURL.
6. Tambahkan fallback jika device lambat.
7. Tambahkan error message yang lembut.
8. Pastikan tidak ada memory leak yang jelas.

Setelah selesai:
- jelaskan optimasi yang dilakukan
- jelaskan fallback behavior
- berikan checklist test mobile
- pastikan build lulus
```

---

### Prompt Phase 12 — Visual Polish

```text
Sekarang kerjakan Phase 12: Visual Polish dan UX Copy.

Tugas:
1. Buat atau update PrivacyNote.
2. Rapikan copy agar terasa personal untuk Ines.
3. Tambahkan micro-animation lembut.
4. Pastikan active state layout/theme/effect jelas.
5. Pastikan UI mobile nyaman.
6. Pastikan visual tetap scrapbook 60% + romantic elegant 40%.
7. Jangan membuat UI terlalu ramai, neon, cyberpunk, atau childish.

Setelah selesai:
- jelaskan file yang diubah
- jelaskan perubahan UX copy
- pastikan build lulus
```

---

### Prompt Phase 13 — Final QA

```text
Sekarang kerjakan Phase 13: Final QA dan Regression Test.

Tugas:
1. Test route guard /photobox.
2. Test role ines, role admin, dan guest.
3. Test layout 2x3 dan 1x3.
4. Test semua theme.
5. Test semua non-face effect.
6. Test beberapa face effect.
7. Test retake single.
8. Test retake all.
9. Test download PNG.
10. Test permission denied.
11. Test no camera.
12. Test keluar halaman saat kamera aktif.
13. Test fitur lain website agar tidak rusak.
14. Jalankan npm run build dan npm run lint jika tersedia.

Output:
- daftar hasil test
- bug yang ditemukan
- rekomendasi fix
- status apakah fitur siap dipakai
```

---

## 9. Catatan Asset

Asset harus disiapkan secara legal dan ringan.

Struktur asset:

```text
public/assets/photobox/
├── stickers/
│   ├── dog-ears.webp
│   ├── dog-nose.webp
│   ├── cat-ears.webp
│   ├── bunny-ears.webp
│   ├── crown.webp
│   ├── heart-glasses.webp
│   ├── blush-left.webp
│   ├── blush-right.webp
│   ├── floating-hearts.webp
│   ├── sparkle.webp
│   ├── for-ines-sticker.webp
│   └── washi-tape.webp
│
├── textures/
│   ├── old-paper.jpg
│   ├── film-grain.webp
│   ├── dust-scratch.webp
│   ├── light-leak.webp
│   └── vhs-glitch.webp
│
├── frames/
│   ├── cassette-frame.webp
│   ├── polaroid-frame.webp
│   ├── vintage-strip.webp
│   └── scrapbook-border.webp
│
├── thumbnails/
│   ├── effect-normal.webp
│   ├── effect-warm-film.webp
│   ├── effect-puppy.webp
│   ├── theme-vintage.webp
│   └── theme-vhs.webp
│
└── fonts/
    └── vcr-osd-mono.woff2
```

Rules:

```text
1. Gunakan WebP untuk sticker transparan jika memungkinkan.
2. Gunakan PNG hanya jika WebP alpha bermasalah.
3. Gunakan JPG untuk texture tanpa transparansi.
4. Gunakan WOFF2 untuk font.
5. Jangan memakai asset tanpa lisensi jelas.
6. Optimalkan ukuran asset sebelum masuk project.
7. Jangan memasukkan asset terlalu besar yang membuat website berat.
```

---

## 10. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Kamera tidak diizinkan | Photobox tidak bisa digunakan | Tampilkan error lembut dan instruksi allow camera |
| Kamera tidak tersedia | Preview gagal | Tampilkan camera unavailable state |
| iOS Safari canvas black screen | Capture kosong/hitam | Gunakan playsInline, muted, autoPlay, delay kecil sebelum capture jika perlu |
| Device lambat | FPS turun | Batasi resolusi canvas dan face detection FPS |
| Face tracking gagal | Face overlay tidak muncul | Fallback ke filter/static effect |
| Asset gagal load | Overlay hilang atau crash | Preload asset dan skip overlay yang gagal |
| Final PNG terlalu besar | Memory berat | Gunakan ukuran canvas yang wajar dan toBlob |
| Effect tidak masuk hasil capture | Output tidak sesuai preview | Capture dari canvas preview, bukan dari video langsung |
| UI terlalu ramai | Tidak sesuai design system | Batasi dekorasi dan gunakan scrapbook romantic style |
| Dependency terlalu berat | Build/performance buruk | Install MediaPipe hanya saat phase face tracking |

---

## 11. Definition of Done

Photobox v2 dianggap selesai jika:

```text
[ ] Route /photobox hanya bisa diakses role ines.
[ ] Kamera tidak menyala otomatis.
[ ] Kamera bisa start manual.
[ ] Ines bisa memilih layout 2x3 atau 1x3.
[ ] Ines bisa memilih theme output final.
[ ] Ines bisa memilih 20+ effect sebelum capture.
[ ] Layout/theme/effect terkunci saat capture.
[ ] Layout 2x3 mengambil 6 foto.
[ ] Layout 1x3 mengambil 3 foto.
[ ] Preview memakai canvas.
[ ] Effect non-face masuk preview dan capture.
[ ] Static overlay masuk preview dan capture.
[ ] Final PNG punya theme yang jelas.
[ ] Final PNG tidak gepeng.
[ ] Retake single bekerja.
[ ] Retake all bekerja.
[ ] Download PNG berhasil.
[ ] Tidak ada penyimpanan ke Supabase.
[ ] Tidak ada upload otomatis ke Gallery.
[ ] Face effect memiliki fallback aman.
[ ] Kamera berhenti saat keluar halaman.
[ ] Error kamera ditulis lembut.
[ ] Privacy note tersedia.
[ ] Mobile layout nyaman.
[ ] npm run build lulus.
[ ] npm run lint lulus jika tersedia.
```

---

## 12. Urutan Implementasi yang Direkomendasikan

Urutan paling aman:

```text
1. Phase 0  - Audit existing
2. Phase 1  - Data layer v2
3. Phase 2  - LayoutPicker + ThemePicker
4. Phase 3  - EffectPicker
5. Phase 4  - CameraCanvasPreview basic
6. Phase 5  - Capture dari canvas
7. Phase 6  - Static overlay effects
8. Phase 7  - Final PNG theme renderer
9. Phase 8  - Preview/retake polish
10. Phase 11 - Performance/mobile pass untuk non-face features
11. Phase 12 - Visual polish
12. Phase 13 - QA sementara
13. Phase 9  - MediaPipe setup
14. Phase 10 - Face overlay basic
15. Phase 11 - Performance/mobile pass ulang
16. Phase 13 - Final QA
```

Catatan penting:

```text
Phase 9 dan Phase 10 boleh ditunda sampai output theme dan non-face effects sudah stabil.
Jangan memulai MediaPipe terlalu awal karena risiko kompleksitas tinggi.
```

---

## 13. Rekomendasi Implementasi Awal

Untuk membuat Photobox v2 cepat terlihat jauh lebih bagus, implementasi awal sebaiknya fokus pada:

```text
1. Layout 2x3 dan 1x3.
2. Theme final PNG vintage/polaroid/cassette/VHS/scrapbook.
3. 20+ effect data.
4. Color filter dan static overlay.
5. Capture dari canvas.
6. Download PNG yang lebih cantik.
```

Face tracking seperti dog ears, cat ears, crown, glasses, dan blush sebaiknya masuk setelah fondasi di atas stabil.