# Photobox Implementation Plan

## 1. Tujuan Dokumen

Dokumen ini membagi implementasi Photobox menjadi beberapa phase kecil agar Codex dapat mengerjakan fitur secara aman, bertahap, dan mudah dites.

Jangan mengerjakan semua phase sekaligus kecuali diminta.

## 2. Prinsip Implementasi

```text
1. Kerjakan satu phase sampai stabil.
2. Jangan mengubah fitur lain tanpa alasan.
3. Jangan memakai Supabase untuk MVP Photobox.
4. Jangan menambahkan library kamera.
5. Gunakan getUserMedia + video + canvas native.
6. Kamera tidak boleh menyala otomatis.
7. Kamera harus dimatikan saat keluar halaman.
8. Semua komponen harus modular.
9. UI harus mobile-first.
10. Build dan lint harus lolos setiap phase besar.
```

## 3. Phase Overview

```text
PB-0: Route, placeholder, dan data awal
PB-1: Camera hook dan camera preview
PB-2: Frame selector dan filter selector
PB-3: Auto capture 6 foto dengan countdown
PB-4: Preview 2x3 dan retake
PB-5: Canvas final PNG generator dan download
PB-6: Responsive, accessibility, dan cleanup pass
```

---

# Phase PB-0 — Route, Placeholder, dan Data Awal

## Tujuan

Menambahkan fondasi awal fitur Photobox tanpa mengaktifkan kamera dulu.

## Task

```text
1. Buat route /photobox.
2. Lindungi route agar hanya role ines yang bisa akses.
3. Tambahkan menu Photobox di navigasi Ines.
4. Jangan tambahkan menu Photobox di AdminNavigation.
5. Buat PhotoboxPage placeholder.
6. Buat data photoboxFrames.js.
7. Buat data photoboxFilters.js.
```

## File Dibuat

```text
src/pages/PhotoboxPage.jsx
src/data/photoboxFrames.js
src/data/photoboxFilters.js
```

## File Diubah

```text
src/App.jsx
src/components/common/InesLayout.jsx
```

Nama file navigasi bisa menyesuaikan struktur existing project.

## Acceptance Criteria

```text
1. /photobox tersedia.
2. /photobox hanya bisa diakses role Ines.
3. Menu Photobox muncul di navigasi Ines.
4. Menu Photobox tidak muncul di AdminNavigation.
5. PhotoboxPage masih placeholder.
6. Data 5 frame tersedia.
7. Data 5 filter tersedia.
8. npm run build lolos.
9. npm run lint lolos.
```

## Prompt Codex PB-0

```text
Sekarang kerjakan Phase PB-0 untuk fitur Photobox.

Tugas:
1. Tambahkan route /photobox untuk role ines.
2. Tambahkan menu Photobox di navigasi Ines.
3. Jangan tambahkan menu Photobox di AdminNavigation.
4. Buat src/pages/PhotoboxPage.jsx sebagai placeholder.
5. Buat src/data/photoboxFrames.js berisi 5 frame:
   - Cream Scrapbook
   - Dusty Rose Love
   - Vintage Paper
   - Golden Memory
   - Playful Notes
6. Buat src/data/photoboxFilters.js berisi 5 filter:
   - Normal
   - Warm
   - Soft Pink
   - Vintage
   - Black & White

Jangan mengaktifkan kamera dulu.
Jangan membuat canvas generator dulu.
Jangan mengubah Supabase service.
Jangan mengubah admin page.

Setelah selesai, jalankan npm run build dan npm run lint.
```

---

# Phase PB-1 — Camera Hook dan Camera Preview

## Tujuan

Membuat kamera bisa dinyalakan setelah user klik Start Camera.

## Task

```text
1. Buat usePhotoboxCamera.
2. Buat CameraPreview.
3. Tambahkan Start Camera button.
4. Tampilkan error jika permission ditolak.
5. Stop camera saat unmount.
```

## File Dibuat

```text
src/hooks/usePhotoboxCamera.js
src/components/photobox/CameraPreview.jsx
src/components/photobox/PhotoboxControls.jsx
```

## File Diubah

```text
src/pages/PhotoboxPage.jsx
```

## Acceptance Criteria

```text
1. Kamera tidak menyala otomatis.
2. Klik Start Camera meminta permission.
3. Jika permission diberikan, video preview tampil.
4. Jika permission ditolak, error lembut tampil.
5. Kamera berhenti saat keluar halaman.
6. npm run build lolos.
7. npm run lint lolos.
```

## Prompt Codex PB-1

```text
Sekarang kerjakan Phase PB-1 untuk Photobox.

Tugas:
1. Buat src/hooks/usePhotoboxCamera.js.
2. Buat src/components/photobox/CameraPreview.jsx.
3. Buat src/components/photobox/PhotoboxControls.jsx jika diperlukan.
4. Update PhotoboxPage agar punya tombol Start Camera.
5. Kamera hanya aktif setelah tombol Start Camera diklik.
6. Gunakan navigator.mediaDevices.getUserMedia().
7. Tampilkan video preview jika berhasil.
8. Tampilkan error lembut jika permission ditolak atau kamera tidak tersedia.
9. Stop semua camera tracks saat halaman ditinggalkan.

Jangan membuat auto capture dulu.
Jangan membuat frame/filter selector dulu.
Jangan membuat final PNG dulu.
```

---

# Phase PB-2 — Frame Selector dan Filter Selector

## Tujuan

Menambahkan pilihan frame dan filter yang bisa dipilih sebelum capture.

## Task

```text
1. Buat FrameSelector.
2. Buat FilterSelector.
3. Terapkan filter ke video preview.
4. Selected frame dan selected filter disimpan di state.
```

## File Dibuat

```text
src/components/photobox/FrameSelector.jsx
src/components/photobox/FilterSelector.jsx
```

## File Diubah

```text
src/pages/PhotoboxPage.jsx
src/components/photobox/CameraPreview.jsx
```

## Acceptance Criteria

```text
1. 5 frame tampil.
2. 5 filter tampil.
3. User bisa memilih frame.
4. User bisa memilih filter.
5. Filter terlihat di video preview.
6. UI selector nyaman di mobile.
7. npm run build lolos.
8. npm run lint lolos.
```

## Prompt Codex PB-2

```text
Sekarang kerjakan Phase PB-2 untuk Photobox.

Tugas:
1. Buat FrameSelector.
2. Buat FilterSelector.
3. Ambil data dari src/data/photoboxFrames.js dan src/data/photoboxFilters.js.
4. Simpan selectedFrame dan selectedFilter di PhotoboxPage.
5. Terapkan selectedFilter.cssFilter pada video preview.
6. Buat UI selector mobile-friendly, boleh horizontal scroll.
7. Jangan membuat auto capture dulu.
8. Jangan membuat final PNG dulu.

Pastikan build dan lint lolos.
```

---

# Phase PB-3 — Auto Capture 6 Foto dengan Countdown

## Tujuan

Membuat flow capture otomatis 6 foto dengan countdown 5 detik per foto.

## Task

```text
1. Buat CountdownOverlay.
2. Tambahkan Start Photobox button.
3. Buat runCountdown.
4. Capture 6 foto otomatis.
5. Simpan capturedPhotos.
```

## File Dibuat

```text
src/components/photobox/CountdownOverlay.jsx
```

## File Diubah

```text
src/pages/PhotoboxPage.jsx
src/hooks/usePhotoboxCamera.js
src/components/photobox/PhotoboxControls.jsx
```

## Acceptance Criteria

```text
1. Klik Start Photobox memulai countdown.
2. Countdown 5 detik per foto.
3. Sistem capture 6 foto otomatis.
4. CapturedPhotos berisi 6 item.
5. Saat capture berjalan, tombol yang mengganggu disabled.
6. npm run build lolos.
7. npm run lint lolos.
```

## Prompt Codex PB-3

```text
Sekarang kerjakan Phase PB-3 untuk Photobox.

Tugas:
1. Buat CountdownOverlay.
2. Tambahkan tombol Start Photobox.
3. Buat logic countdown 5 detik.
4. Setelah countdown selesai, capture frame dari video ke canvas.
5. Ulangi sampai 6 foto.
6. Simpan foto sebagai dataUrl di capturedPhotos.
7. Tampilkan progress foto keberapa, misalnya "Photo 2 of 6".
8. Disable tombol frame/filter saat capture berjalan.

Jangan membuat retake dulu.
Jangan membuat final PNG dulu.

Pastikan build dan lint lolos.
```

---

# Phase PB-4 — Preview 2x3 dan Retake

## Tujuan

Menampilkan hasil 6 foto dan memberi kemampuan retake foto tertentu atau retake all.

## Task

```text
1. Buat PhotoStripPreview.
2. Buat RetakeControls.
3. Tampilkan 6 foto dalam layout 2 kolom x 3 baris.
4. Tambahkan tombol Retake per foto.
5. Tambahkan Retake All.
6. Retake foto tertentu memakai countdown 5 detik.
```

## File Dibuat

```text
src/components/photobox/PhotoStripPreview.jsx
src/components/photobox/RetakeControls.jsx
```

## File Diubah

```text
src/pages/PhotoboxPage.jsx
```

## Acceptance Criteria

```text
1. Preview 6 foto tampil 2 kolom x 3 baris.
2. Setiap foto punya tombol Retake.
3. Retake foto tertentu hanya mengganti foto tersebut.
4. Retake All menghapus semua foto.
5. Retake memakai countdown 5 detik.
6. npm run build lolos.
7. npm run lint lolos.
```

## Prompt Codex PB-4

```text
Sekarang kerjakan Phase PB-4 untuk Photobox.

Tugas:
1. Buat PhotoStripPreview.
2. Buat RetakeControls.
3. Setelah capturedPhotos berisi 6 foto, tampilkan preview 2 kolom x 3 baris.
4. Tambahkan tombol Retake pada setiap foto.
5. Jika Retake diklik:
   - simpan index foto
   - countdown 5 detik
   - capture ulang
   - ganti foto di index tersebut
6. Tambahkan tombol Retake All untuk mengulang semua foto.
7. Jangan membuat final PNG generator dulu.

Pastikan build dan lint lolos.
```

---

# Phase PB-5 — Canvas Final PNG Generator dan Download

## Tujuan

Menghasilkan gambar final PNG berisi 6 foto, frame, dekorasi, teks, dan tanggal.

## Task

```text
1. Buat photoboxUtils.js.
2. Buat generatePhotoboxImage.
3. Buat downloadImage.
4. Buat PhotoboxResult jika diperlukan.
5. Tambahkan tombol Download Photobox.
```

## File Dibuat

```text
src/utils/photoboxUtils.js
src/components/photobox/PhotoboxResult.jsx
```

## File Diubah

```text
src/pages/PhotoboxPage.jsx
src/components/photobox/PhotoboxControls.jsx
```

## Acceptance Criteria

```text
1. Download button muncul setelah 6 foto tersedia.
2. Klik Download menghasilkan PNG.
3. PNG berisi 6 foto layout 2 kolom x 3 baris.
4. PNG memakai frame terpilih.
5. PNG memakai filter terpilih.
6. PNG berisi judul Photobox.
7. PNG berisi teks For Ines.
8. PNG berisi tanggal otomatis.
9. PNG tidak gepeng.
10. npm run build lolos.
11. npm run lint lolos.
```

## Prompt Codex PB-5

```text
Sekarang kerjakan Phase PB-5 untuk Photobox.

Tugas:
1. Buat src/utils/photoboxUtils.js.
2. Buat generatePhotoboxImage({ photos, frame, filter }).
3. Gunakan canvas native.
4. Canvas final disarankan 1200 x 1800.
5. Layout foto 2 kolom x 3 baris.
6. Foto harus object-fit cover, tidak gepeng.
7. Terapkan frame terpilih.
8. Terapkan filter terpilih.
9. Tambahkan dekorasi kecil sesuai frame.
10. Tambahkan teks:
    - Photobox
    - For Ines
    - tanggal otomatis
    - 230624 atau our little place
11. Buat downloadImage(dataUrl, filename).
12. Tambahkan tombol Download Photobox.

Jangan pakai Supabase.
Jangan install library canvas tambahan.

Pastikan build dan lint lolos.
```

---

# Phase PB-6 — Responsive, Accessibility, dan Cleanup Pass

## Tujuan

Memastikan Photobox nyaman, aman, dan stabil di HP dan laptop.

## Task

```text
1. Audit mobile layout.
2. Audit desktop layout.
3. Perbaiki horizontal overflow.
4. Pastikan semua button nyaman diklik.
5. Pastikan camera cleanup berjalan.
6. Pastikan error state jelas.
7. Pastikan lint/build lolos.
```

## File Mungkin Diubah

```text
src/pages/PhotoboxPage.jsx
src/components/photobox/*
src/hooks/usePhotoboxCamera.js
src/utils/photoboxUtils.js
src/styles/*
```

## Acceptance Criteria

```text
1. Photobox nyaman di HP.
2. Photobox nyaman di laptop.
3. Tidak ada horizontal overflow.
4. Kamera berhenti saat route berubah.
5. Permission error mudah dipahami.
6. Download berhasil di desktop.
7. Download berhasil atau minimal tidak error di mobile.
8. Build lolos.
9. Lint lolos.
```

## Prompt Codex PB-6

```text
Sekarang kerjakan Phase PB-6 untuk Photobox.

Tugas:
1. Audit seluruh fitur Photobox.
2. Perbaiki mobile layout.
3. Perbaiki desktop layout.
4. Pastikan tidak ada horizontal overflow.
5. Pastikan tombol mudah diklik.
6. Pastikan camera stream berhenti saat halaman ditinggalkan.
7. Pastikan permission error tampil lembut.
8. Pastikan capture, retake, retake all, dan download tetap bekerja.
9. Jangan menambah fitur baru.
10. Jangan mengubah Supabase service.
11. Jangan mengubah admin page.

Jalankan npm run build dan npm run lint.
Berikan checklist testing manual.
```

---

## 4. Urutan Eksekusi yang Disarankan

```text
1. PB-0
2. PB-1
3. PB-2
4. PB-3
5. PB-4
6. PB-5
7. PB-6
```

Jangan lompat ke PB-5 sebelum PB-3 dan PB-4 stabil.

## 5. Definition of Done Photobox

Photobox selesai jika:

```text
1. /photobox tersedia dan protected untuk role Ines.
2. Kamera hanya aktif setelah Start Camera.
3. Frame selector bekerja.
4. Filter selector bekerja.
5. Capture otomatis 6 foto bekerja.
6. Countdown 5 detik bekerja.
7. Preview 2 kolom x 3 baris tampil.
8. Retake foto tertentu bekerja.
9. Retake all bekerja.
10. Download PNG bekerja.
11. PNG final berisi 6 foto, frame, filter, dekorasi, judul, tanggal.
12. UI nyaman di HP dan laptop.
13. Kamera mati saat keluar halaman.
14. Tidak ada perubahan merusak fitur existing.
15. Build dan lint lolos.
```