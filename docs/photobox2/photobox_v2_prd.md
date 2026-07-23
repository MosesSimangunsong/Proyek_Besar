# PRD Photobox v2 — Advanced Effects & Vintage Output

## 1. Nama Fitur

**Photobox v2 — Advanced Effects & Vintage Output**

Fitur ini adalah pengembangan lanjutan dari Photobox MVP pada website personal **For Ines — A Little Place for Us**. Photobox v2 tetap menjadi fitur kamera pribadi untuk Ines, tetapi pengalaman visualnya ditingkatkan agar terasa seperti mini photobooth Instagram/Snapchat yang tetap romantis, scrapbook, personal, dan elegan.

---

## 2. Latar Belakang

Photobox MVP sudah memungkinkan Ines membuka halaman `/photobox`, menyalakan kamera, mengambil 6 foto otomatis dengan countdown, memilih frame dan filter sederhana, melakukan retake, lalu mengunduh hasil akhir sebagai PNG.

Namun, hasil Photobox MVP masih terasa terlalu sederhana karena hanya memiliki frame dan filter dasar. User menginginkan pengalaman yang lebih kaya, yaitu:

1. Banyak efek seperti Instagram.
2. Efek lucu dan romantis seperti topi, dog ears, cat ears, blush, kacamata, heart overlay, dan sticker wajah.
3. Efek visual aesthetic seperti old photo, analog film, VHS/camcorder, cassette/tape aesthetic, film grain, light leak, dan polaroid.
4. Hasil download PNG yang jauh lebih menarik, bukan hanya grid foto sederhana.
5. Tetap nyaman digunakan di HP dan laptop.
6. Tetap private dan tidak mengunggah foto ke server.

Photobox v2 dibuat untuk menjawab kebutuhan tersebut tanpa mengubah karakter utama website, yaitu **scrapbook 60% + romantic elegant 40%**.

---

## 3. Tujuan Fitur

Tujuan utama Photobox v2:

1. Membuat Photobox terasa lebih hidup, menyenangkan, dan personal.
2. Memberikan pengalaman memilih banyak efek seperti Instagram/Snapchat, tetapi tetap dalam gaya romantis dan scrapbook.
3. Meningkatkan kualitas hasil PNG final agar terlihat seperti artefak kenangan, bukan sekadar screenshot atau grid kamera biasa.
4. Menyediakan pilihan layout hasil akhir: **2×3** dan **1×3**.
5. Menyediakan minimal **20+ efek awal**.
6. Memastikan efek dipilih **sebelum capture** agar pengalaman tetap sederhana dan hasil konsisten.
7. Menjaga privasi: proses kamera dan efek berjalan di browser, output hanya diunduh sebagai PNG.
8. Menjaga performa mobile dengan implementasi hybrid bertahap.

---

## 4. Target User

Target user utama:

```text
Role: ines
Nama user: Ines
Akses: hanya setelah login dengan kode Ines
Route: /photobox
```

Admin/Moses tidak menjadi target user untuk fitur ini dan tidak membutuhkan halaman admin khusus untuk Photobox v2.

---

## 5. Posisi Fitur dalam Website

Photobox v2 adalah fitur tambahan di area Ines.

Route target:

```text
/photobox
```

Aturan akses:

```text
Jika belum login:
- redirect ke /unlock

Jika role = ines:
- boleh akses /photobox

Jika role = admin:
- redirect ke /admin
```

Navigasi:

```text
Menu Photobox muncul di navigasi area Ines.
Menu Photobox tidak muncul di navigasi Admin.
```

---

## 6. Ringkasan Keputusan Produk

Keputusan final untuk Photobox v2:

```text
1. Layout hasil akhir:
   - User bisa memilih 2×3
   - User bisa memilih 1×3

2. Efek:
   - Efek dipilih sebelum capture
   - Efek dikunci saat proses capture berjalan
   - Target awal minimal 20+ efek

3. Pendekatan implementasi:
   - Hybrid bertahap
   - Mulai dari output themes dan efek non-AR
   - Face tracking masuk setelah fondasi stabil

4. Output:
   - Hanya download PNG
   - Tidak simpan ke Supabase
   - Tidak upload otomatis ke Gallery
   - Tidak share langsung ke WhatsApp/Instagram

5. Device:
   - Wajib nyaman di HP
   - Tetap nyaman di laptop
```

---

## 7. Scope Photobox v2

Fitur yang masuk scope Photobox v2:

1. Halaman `/photobox` tetap tersedia dan protected untuk role Ines.
2. Kamera hanya aktif setelah user klik **Start Camera**.
3. User dapat memilih layout final:
   - 2×3
   - 1×3
4. User dapat memilih effect/theme sebelum capture.
5. Minimal tersedia 20+ efek awal.
6. Effect picker berbentuk tray/carousel horizontal yang nyaman di mobile.
7. Theme picker untuk memilih gaya hasil download final.
8. Efek warna dan overlay non-face dapat tampil di preview/capture.
9. Tema output final dapat membuat PNG terlihat seperti:
   - vintage photobooth
   - old photo
   - polaroid collage
   - scrapbook page
   - VHS/camcorder
   - cassette/tape aesthetic
   - analog film/contact sheet
10. Capture otomatis tetap berjalan dengan countdown.
11. User tetap bisa retake foto tertentu.
12. User tetap bisa retake all.
13. User dapat download hasil akhir sebagai PNG.
14. Kamera berhenti saat halaman ditinggalkan.
15. Jika face tracking belum tersedia atau gagal, sistem tetap dapat berjalan dengan efek non-face.

---

## 8. Non-Scope Photobox v2

Hal yang tidak dikerjakan pada Photobox v2 awal:

1. Simpan hasil photobox ke Supabase.
2. Admin melihat hasil photobox.
3. Upload otomatis hasil photobox ke Gallery.
4. Share langsung ke WhatsApp/Instagram.
5. Video recording.
6. PDF output.
7. Multi-user photobooth.
8. Editor manual kompleks setelah capture, seperti drag sticker, crop detail, resize sticker manual, atau layer editor seperti Canva.
9. Pembayaran/API eksternal.
10. Menggunakan SDK resmi Instagram/Snapchat/TikTok.

---

## 9. User Flow Utama

### 9.1 Entry Flow

```text
Ines login
↓
Masuk /home
↓
Klik menu Photobox
↓
Masuk /photobox
```

Jika membuka langsung dari URL:

```text
Ines membuka /photobox
↓
Sistem cek login dan role
↓
Jika belum login → redirect /unlock
↓
Jika role ines → tampilkan Photobox
↓
Jika role admin → redirect /admin
```

### 9.2 Main Flow Photobox v2

```text
Ines membuka /photobox
↓
Website menampilkan intro Photobox
↓
Ines klik Start Camera
↓
Browser meminta izin kamera
↓
Jika izin diberikan, preview kamera tampil
↓
Ines memilih layout hasil akhir:
    - 2×3
    - 1×3
↓
Ines memilih theme output final
↓
Ines memilih effect dari effect tray
↓
Ines klik Start Photobox
↓
Sistem mengunci layout, theme, dan effect selama capture
↓
Countdown berjalan
↓
Sistem mengambil foto otomatis sesuai layout
↓
Preview hasil tampil
↓
Ines bisa retake foto tertentu atau retake all
↓
Ines klik Download Photobox
↓
Sistem generate PNG final sesuai layout, theme, dan effect
↓
File PNG terdownload
```

---

## 10. Layout Final

Photobox v2 menyediakan dua layout final.

### 10.1 Layout 2×3

Deskripsi:

```text
2 kolom × 3 baris
Total foto: 6
```

Kegunaan:

- Untuk hasil photobox penuh.
- Cocok untuk scrapbook page, polaroid collage, vintage photobooth, dan album lama.
- Tetap mempertahankan flow lama dari Photobox MVP.

### 10.2 Layout 1×3

Deskripsi:

```text
1 kolom × 3 baris
Total foto: 3
```

Kegunaan:

- Untuk hasil yang lebih mirip photobooth strip klasik.
- Lebih cepat dibuat karena hanya mengambil 3 foto.
- Cocok untuk vintage strip, cassette frame, VHS/camcorder strip, dan romantic strip.

### 10.3 Aturan Layout

1. User harus memilih layout sebelum capture.
2. Layout dikunci selama proses capture.
3. Jika memilih 2×3, sistem mengambil 6 foto.
4. Jika memilih 1×3, sistem mengambil 3 foto.
5. Preview mengikuti layout yang dipilih.
6. Download PNG mengikuti layout yang dipilih.
7. Foto tidak boleh gepeng; semua foto harus object-fit cover.

---

## 11. Effect System

Photobox v2 menggunakan sistem efek berbasis metadata agar mudah ditambah.

Efek dibagi menjadi beberapa tipe:

```text
COLOR_FILTER
FULL_FRAME_OVERLAY
STATIC_STICKER
FACE_OVERLAY
COMBO
```

### 11.1 COLOR_FILTER

Efek yang hanya mengubah warna/foto.

Contoh:

1. Normal
2. Warm Film
3. Soft Pink
4. Dreamy Cream
5. Vintage Sepia
6. Black & White
7. Dusty Rose
8. Retro 90s
9. Faded Analog
10. Golden Hour

### 11.2 FULL_FRAME_OVERLAY

Efek overlay seluruh frame tanpa face tracking.

Contoh:

1. Film Grain
2. Dust & Scratch
3. Light Leak
4. VHS Noise
5. Old Paper Texture
6. Soft Glow
7. Romantic Sparkle

### 11.3 STATIC_STICKER

Efek sticker statis yang tidak mengikuti wajah.

Contoh:

1. Floating Hearts
2. Sparkles
3. “For Ines” Sticker
4. Washi Tape Corner
5. Doodle Hearts
6. Paper Note
7. Love Stamp

### 11.4 FACE_OVERLAY

Efek yang membutuhkan face landmark agar mengikuti wajah.

Contoh:

1. Dog Ears
2. Cat Ears
3. Bunny Ears
4. Cute Hat
5. Crown
6. Heart Glasses
7. Blush Cheeks
8. Heart Cheek
9. Mustache
10. Ribbon

### 11.5 COMBO

Efek gabungan antara filter warna, overlay, dan/atau face effect.

Contoh:

1. Puppy Love
2. Angel Ines
3. Princess Glow
4. 90s VHS Camcorder
5. Vintage Date Night
6. Scrapbook Love

---

## 12. Minimal 20+ Efek Awal

Photobox v2 harus menyediakan minimal 20 efek awal. Rekomendasi katalog awal:

### Color & Film Effects

1. Normal
2. Warm Film
3. Soft Pink
4. Dreamy Cream
5. Vintage Sepia
6. Black & White
7. Faded Analog
8. Dusty Rose
9. Golden Hour
10. Retro 90s

### Overlay & Scrapbook Effects

11. Film Grain
12. Dust & Scratch
13. Light Leak
14. VHS Noise
15. Floating Hearts
16. Sparkles
17. Washi Tape
18. For Ines Sticker
19. Love Stamp
20. Paper Note

### Face Effects untuk Phase Lanjutan

21. Dog Ears
22. Cat Ears
23. Bunny Ears
24. Cute Hat
25. Crown
26. Heart Glasses
27. Blush Cheeks
28. Heart Cheek
29. Ribbon
30. Mustache

Catatan:

```text
Tidak semua face effects harus selesai di phase pertama.
PRD menargetkan 20+ efek awal secara produk, tetapi implementasi dilakukan hybrid bertahap.
```

---

## 13. Theme System untuk Output PNG

Theme berbeda dari effect.

```text
Effect = tampilan kamera/foto saat capture.
Theme = desain hasil akhir PNG saat download.
```

Photobox v2 harus memiliki theme output final agar hasil download terasa lebih premium dan memorable.

### 13.1 Theme Awal yang Direkomendasikan

1. **Vintage Photobooth Strip**
   - Nuansa foto zaman dahulu.
   - Paper border.
   - Film grain.
   - Tanggal kecil.
   - Cocok untuk layout 1×3 dan 2×3.

2. **Old Photo Album**
   - Background old paper.
   - Foto seperti ditempel di album lama.
   - Ada tape/stamp kecil.
   - Cocok untuk layout 2×3.

3. **Polaroid Collage**
   - Foto seperti polaroid.
   - Sedikit rotasi lembut.
   - Caption “For Ines”.
   - Cocok untuk layout 2×3.

4. **Cassette/Tape Aesthetic**
   - Dekorasi seperti kaset/tape.
   - Label kecil.
   - Warna warm beige/brown.
   - Cocok untuk layout 1×3 dan 2×3.

5. **VHS/Camcorder Memory**
   - Timestamp kecil.
   - Noise/glitch halus.
   - Border camcorder.
   - Cocok untuk layout 1×3.

6. **Scrapbook Love Page**
   - Paper texture.
   - Washi tape.
   - Doodle hearts.
   - Stamp dan handwritten note.
   - Cocok untuk layout 2×3.

7. **Analog Film Contact Sheet**
   - Frame seperti film roll/contact sheet.
   - Nomor frame kecil.
   - Dust/scratch.
   - Cocok untuk layout 2×3.

8. **Romantic Dusty Rose Card**
   - Dusty rose + champagne gold.
   - Soft glow.
   - Floating hearts.
   - Cocok untuk layout 1×3 dan 2×3.

### 13.2 Aturan Theme

1. User memilih theme sebelum capture.
2. Theme dikunci selama capture.
3. Theme digunakan saat preview final dan saat download PNG.
4. Theme tidak boleh membuat teks/foto sulit dilihat.
5. Theme harus tetap sesuai design system: scrapbook 60% + romantic elegant 40%.

---

## 14. Capture Behavior

### 14.1 Start Camera

```text
User klik Start Camera
↓
Browser meminta izin kamera
↓
Jika izin diberikan, preview tampil
↓
Jika ditolak, tampil error lembut
```

Kamera tidak boleh menyala otomatis saat user membuka halaman.

### 14.2 Start Photobox

```text
User memilih layout, theme, dan effect
↓
User klik Start Photobox
↓
Sistem mengunci pilihan
↓
Countdown dimulai
↓
Sistem capture foto otomatis
```

### 14.3 Jumlah Capture

```text
Layout 2×3 → 6 foto
Layout 1×3 → 3 foto
```

### 14.4 Countdown

Default countdown tetap 5 detik.

Copy countdown:

```text
5
4
3
2
1
Smile, sayang!
```

---

## 15. Retake Behavior

Photobox v2 tetap mendukung:

1. Retake foto tertentu.
2. Retake all.

Aturan:

1. Retake menggunakan layout, theme, dan effect yang sudah dipilih.
2. User tidak mengganti effect di tengah capture/retake pada versi awal.
3. Jika ingin mengganti effect/theme/layout, user harus retake all dari awal.
4. Retake tetap menggunakan countdown.

---

## 16. Download PNG Behavior

Output final hanya berupa PNG.

Aturan:

1. Download button muncul setelah semua foto sesuai layout tersedia.
2. Hasil PNG sesuai layout yang dipilih.
3. Hasil PNG memakai theme yang dipilih.
4. Hasil PNG menyertakan efek yang dipilih.
5. Hasil PNG harus proporsional dan tidak gepeng.
6. Hasil PNG harus cukup tajam untuk disimpan di HP/laptop.
7. Filename disarankan:

```text
ines-photobox-YYYY-MM-DD.png
```

Isi PNG minimal:

1. Foto hasil capture.
2. Theme visual.
3. Teks `Photobox` atau nama theme.
4. Teks `For Ines`.
5. Tanggal otomatis.
6. Teks kecil `230624` atau `our little place`.

---

## 17. Privacy Requirement

Photobox v2 harus menjaga privasi.

Requirement:

1. Kamera hanya aktif setelah user klik Start Camera.
2. Foto tidak diupload ke Supabase.
3. Foto tidak dikirim ke backend.
4. Face tracking, jika ada, berjalan di browser.
5. Tidak menggunakan SDK Instagram/Snapchat/TikTok.
6. Tidak ada API eksternal untuk memproses wajah/foto.
7. Saat kamera aktif, tampilkan pesan kecil:

```text
Everything stays on your device, sayang.
Nothing is uploaded.
```

---

## 18. Visual & UX Rules

Photobox v2 harus mengikuti design system website.

Karakter visual:

```text
Personal
Warm
Romantic
Elegant
Nostalgic
Soft
Playful but not childish
Interactive
Handmade
Private
Scrapbook
```

Gunakan:

1. Paper card.
2. Polaroid style.
3. Warm beige/ivory/cream.
4. Dusty rose sebagai aksen.
5. Champagne gold secukupnya.
6. Soft shadow.
7. Rounded corner.
8. Texture kertas yang subtle.
9. Handwritten label kecil.
10. Gentle animation.

Jangan gunakan:

1. Neon.
2. Cyberpunk.
3. Dashboard style.
4. Warna terlalu mencolok.
5. Animasi berlebihan.
6. Sticker terlalu ramai sampai childish.
7. Efek terlalu berat sampai HP terasa lambat.

---

## 19. Copywriting UI

Judul halaman:

```text
Photobox
```

Subtitle:

```text
Take tiny memories, sayang.
Pick a little effect and let your smile stay here for a while.
```

Start Camera:

```text
Start Camera
```

Layout picker:

```text
Choose your photobox shape
```

Theme picker:

```text
Pick a memory style
```

Effect picker:

```text
Pick your little effect
```

Start capture:

```text
Start Photobox
```

Retake:

```text
Retake this one
```

Retake all:

```text
Retake All
```

Download:

```text
Download Photobox
```

Success:

```text
Your little photobox is ready.
```

Permission error:

```text
I need your camera permission to make this little memory.
Please allow camera access, sayang.
```

Camera unavailable:

```text
Your camera is not available right now.
Try again from another device or browser.
```

Face not detected fallback:

```text
I can't find your face clearly, sayang.
The effect will stay soft for now.
```

---

## 20. Hybrid Bertahap Implementation Strategy

Photobox v2 menggunakan pendekatan **Hybrid Bertahap**.

Artinya target produk tetap besar, tetapi implementasi tidak langsung memaksa semua efek AR selesai di awal.

### Phase V2-1 — Output Themes & Canvas Upgrade

Fokus:

1. Membuat hasil download PNG jauh lebih bagus.
2. Menambahkan layout 2×3 dan 1×3.
3. Membuat theme output final.
4. Membuat renderer PNG yang bisa menampilkan vintage, polaroid, cassette, VHS, scrapbook.

Contoh theme:

- Vintage Photobooth Strip
- Old Photo Album
- Polaroid Collage
- Cassette/Tape Aesthetic
- VHS/Camcorder Memory
- Scrapbook Love Page

### Phase V2-2 — Effect Picker 20+

Fokus:

1. Membuat effect tray seperti Instagram.
2. Menyediakan minimal 20+ efek metadata.
3. Mengimplementasikan efek warna dan overlay statis lebih dulu.
4. Efek dipilih sebelum capture.
5. Efek dikunci saat capture.

### Phase V2-3 — Static Sticker & Romantic Overlay

Fokus:

1. Floating hearts.
2. Sparkles.
3. Washi tape.
4. Doodle hearts.
5. For Ines sticker.
6. Love stamp.
7. Paper note.

Semua efek pada phase ini tidak membutuhkan face tracking.

### Phase V2-4 — Face Tracking Effects

Fokus:

1. Integrasi MediaPipe Face Landmarker.
2. Dog ears.
3. Cat ears.
4. Bunny ears.
5. Hat.
6. Crown.
7. Heart glasses.
8. Blush cheeks.
9. Heart cheek.
10. Ribbon.

### Phase V2-5 — Polish & Mobile Optimization

Fokus:

1. Performance mobile.
2. iOS Safari.
3. Android Chrome.
4. Cleanup camera stream.
5. Cleanup requestAnimationFrame.
6. Fallback saat face detection gagal.
7. PNG tetap tajam.
8. Build dan lint lolos.

---

## 21. Acceptance Criteria

Photobox v2 dianggap memenuhi PRD jika:

1. Route `/photobox` tersedia.
2. `/photobox` hanya bisa diakses role Ines.
3. Menu Photobox muncul di navigasi Ines.
4. Menu Photobox tidak muncul di navigasi Admin.
5. Kamera tidak menyala otomatis.
6. Kamera menyala setelah klik Start Camera.
7. Permission denied ditangani dengan pesan lembut.
8. User bisa memilih layout 2×3 atau 1×3.
9. Layout 2×3 mengambil 6 foto.
10. Layout 1×3 mengambil 3 foto.
11. User bisa memilih theme output final sebelum capture.
12. User bisa memilih effect sebelum capture.
13. Pilihan layout/theme/effect terkunci selama capture.
14. Minimal 20+ efek tersedia dalam daftar efek awal.
15. Effect picker nyaman digunakan di mobile.
16. Theme picker nyaman digunakan di mobile.
17. Countdown berjalan sebelum setiap capture.
18. Preview hasil sesuai layout yang dipilih.
19. User bisa retake foto tertentu.
20. User bisa retake all.
21. Download PNG berhasil.
22. PNG final mengikuti layout yang dipilih.
23. PNG final memakai theme yang dipilih.
24. PNG final berisi teks `For Ines`, tanggal, dan `230624` atau `our little place`.
25. PNG final tidak gepeng.
26. PNG final terlihat lebih kaya daripada Photobox MVP.
27. Foto tidak disimpan ke Supabase.
28. Foto tidak dikirim ke server.
29. Kamera berhenti saat user meninggalkan halaman.
30. Jika face tracking gagal, fitur tidak crash.
31. Layout nyaman di HP dan laptop.
32. `npm run build` lolos.
33. `npm run lint` lolos.

---

## 22. Risiko dan Mitigasi

### 22.1 Risiko: fitur terlalu kompleks jika face tracking langsung dikerjakan

Mitigasi:

```text
Gunakan hybrid bertahap.
Mulai dari output themes dan efek non-AR.
Face tracking masuk setelah canvas renderer stabil.
```

### 22.2 Risiko: performa HP menurun

Mitigasi:

```text
Matikan face tracking untuk efek yang tidak membutuhkan wajah.
Lazy load MediaPipe hanya saat user memilih face effect.
Turunkan FPS detection jika device lambat.
Stop requestAnimationFrame saat keluar halaman.
```

### 22.3 Risiko: iOS Safari black screen saat canvas capture

Mitigasi:

```text
Gunakan playsInline, muted, dan autoPlay pada video.
Pastikan video sudah ready sebelum drawImage.
Uji khusus di iOS Safari.
Gunakan fallback jika canvas gagal.
```

### 22.4 Risiko: hasil PNG berbeda dari preview

Mitigasi:

```text
Gunakan pipeline canvas yang konsisten.
Efek preview dan efek capture memakai sumber konfigurasi yang sama.
Jangan hanya menampilkan overlay DOM jika efek harus masuk ke PNG.
```

### 22.5 Risiko: asset terlalu berat

Mitigasi:

```text
Gunakan WebP/PNG transparan yang terkompresi.
Pisahkan asset stickers, textures, frames, thumbnails.
Lazy load asset berdasarkan effect/theme aktif.
```

### 22.6 Risiko: lisensi asset tidak jelas

Mitigasi:

```text
Gunakan asset buatan sendiri atau asset gratis dengan lisensi yang jelas.
Catat sumber asset.
Jangan memakai asset berlisensi komersial tanpa izin.
```

---

## 23. Asset Requirement

Folder asset yang disarankan:

```text
public/assets/photobox/
├── stickers/
├── textures/
├── frames/
├── thumbnails/
└── fonts/
```

Asset yang dibutuhkan:

### Stickers

1. Dog ears
2. Cat ears
3. Bunny ears
4. Hat
5. Crown
6. Heart glasses
7. Blush cheeks
8. Heart cheek
9. Ribbon
10. Mustache
11. Floating hearts
12. Sparkles
13. For Ines sticker
14. Love stamp
15. Paper note
16. Washi tape

### Textures

1. Film grain
2. Dust
3. Scratch
4. Light leak
5. Old paper
6. VHS noise
7. Soft glow

### Frames

1. Polaroid frame
2. Vintage strip
3. Cassette/tape frame
4. Camcorder frame
5. Scrapbook page frame
6. Contact sheet frame

### Fonts

1. Handwritten font
2. VCR/camcorder font
3. Optional typewriter/retro font

---

## 24. Open Questions untuk Technical Design

PRD ini belum memutuskan detail teknis berikut. Detail ini harus dijawab di dokumen technical design:

1. Ukuran canvas final untuk layout 1×3.
2. Ukuran canvas final untuk layout 2×3 versi v2.
3. Format final export: `toDataURL` atau `toBlob`.
4. Cara menyamakan preview canvas dengan final PNG.
5. Struktur final `photoboxEffects.js`.
6. Struktur final `photoboxThemes.js`.
7. Apakah `FrameSelector` lama digabung ke `ThemePicker` atau tetap dipisah.
8. Kapan MediaPipe diload.
9. Bagaimana fallback jika MediaPipe gagal.
10. Apakah semua efek face overlay wajib realtime preview atau cukup saat capture.

---

## 25. Definition of Done

Photobox v2 dianggap selesai secara produk jika:

1. Ines dapat membuka `/photobox` setelah login.
2. Ines dapat memilih layout 2×3 atau 1×3.
3. Ines dapat memilih theme output final.
4. Ines dapat memilih effect sebelum capture.
5. Minimal 20+ efek tersedia dalam UI.
6. Capture otomatis berjalan sesuai layout.
7. Preview hasil jelas.
8. Retake berjalan.
9. Download PNG berjalan.
10. PNG final terlihat seperti photobox aesthetic, bukan hasil sederhana.
11. Tidak ada upload foto ke server.
12. Kamera berhenti saat keluar halaman.
13. Fitur stabil di desktop Chrome.
14. Fitur diuji di mobile browser.
15. Build dan lint lolos.
