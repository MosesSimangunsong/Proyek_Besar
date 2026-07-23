# Photobox PRD

## 1. Ringkasan Fitur

Photobox adalah fitur kamera pribadi untuk Ines di website personal ini. Fitur ini memungkinkan Ines mengambil 6 foto secara otomatis dengan countdown, memilih frame dan filter, melakukan retake foto tertentu, lalu mengunduh hasil akhir sebagai gambar PNG berbentuk photobooth 2 kolom x 3 baris.

Fitur ini dibuat agar website tidak hanya berisi foto dan surat, tetapi juga bisa menjadi tempat membuat kenangan baru secara langsung.

## 2. Tujuan Fitur

Tujuan utama Photobox:

1. Memberikan fitur interaktif yang personal untuk Ines.
2. Membuat pengalaman seperti photobooth romantis di dalam website.
3. Menghasilkan gambar final yang bisa disimpan oleh Ines di HP atau laptop.
4. Menambah nilai emosional website melalui foto yang dibuat langsung.
5. Menjaga konsep visual website: scrapbook 60% dan romantis elegan 40%.

## 3. Target User

Target user utama:

```text
Role: ines
Nama user: Ines
Akses: hanya setelah login dengan kode Ines
```

Admin/Moses tidak membutuhkan fitur Photobox di area admin.

## 4. Route dan Akses Role

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

## 5. Scope MVP

Fitur yang masuk MVP:

1. Halaman `/photobox`.
2. Kamera aktif setelah user klik tombol Start Camera.
3. Pilihan 5 frame.
4. Pilihan 5 filter.
5. Capture otomatis 6 foto.
6. Countdown 5 detik sebelum setiap capture.
7. Preview 6 foto dalam layout 2 kolom x 3 baris.
8. Retake foto tertentu.
9. Retake semua foto.
10. Generate hasil akhir PNG menggunakan canvas.
11. Download hasil PNG.
12. Kamera berhenti saat halaman ditinggalkan.
13. UI nyaman di HP dan laptop.

## 6. Non-Scope MVP

Hal yang tidak dikerjakan pada MVP awal:

1. Simpan hasil fotobox ke Supabase.
2. Admin melihat hasil fotobox.
3. Share langsung ke WhatsApp/Instagram.
4. Upload hasil ke Gallery otomatis.
5. Pilihan kamera depan/belakang tingkat lanjut.
6. Filter berbasis library eksternal.
7. Editing manual setelah foto, seperti crop/drag/sticker manual.
8. Video recording.
9. PDF output.

## 7. Keputusan Utama

```text
Nama fitur: Photobox
Jumlah foto: 6
Layout final: 2 kolom x 3 baris
Capture: otomatis setelah klik Start Photobox
Countdown: 5 detik per foto
Output: download PNG
Storage: tidak pakai Supabase dulu
Frame: 5 pilihan
Filter: 5 pilihan
Retake: bisa retake foto tertentu dan retake all
Device: wajib nyaman di HP dan laptop
```

## 8. Frame yang Disediakan

### 8.1 Cream Scrapbook

Nuansa:

```text
Cream, ivory, scrapbook klasik, soft, hangat.
```

Data awal:

```js
{
  id: "cream-scrapbook",
  name: "Cream Scrapbook",
  description: "Soft scrapbook frame for tiny memories.",
  backgroundColor: "#FFF8EF",
  borderColor: "#4A2F25",
  accentColor: "#D6B56D",
  textColor: "#4A2F25",
  decoration: "tape"
}
```

### 8.2 Dusty Rose Love

Nuansa:

```text
Dusty rose, soft pink, heart doodle, romantis.
```

### 8.3 Vintage Paper

Nuansa:

```text
Paper white, warm beige, album lama, nostalgic.
```

### 8.4 Golden Memory

Nuansa:

```text
Ivory, champagne gold, elegant romantic, subtle sparkle.
```

### 8.5 Playful Notes

Nuansa:

```text
Cream, sticker kecil, doodle heart/star, playful tapi tidak childish.
```

## 9. Filter yang Disediakan

### 9.1 Normal

```js
{
  id: "normal",
  name: "Normal",
  cssFilter: "none"
}
```

### 9.2 Warm

```js
{
  id: "warm",
  name: "Warm",
  cssFilter: "sepia(0.18) saturate(1.15) brightness(1.05)"
}
```

### 9.3 Soft Pink

```js
{
  id: "soft-pink",
  name: "Soft Pink",
  cssFilter: "sepia(0.08) saturate(1.1) hue-rotate(-8deg) brightness(1.05)"
}
```

### 9.4 Vintage

```js
{
  id: "vintage",
  name: "Vintage",
  cssFilter: "sepia(0.35) contrast(0.95) brightness(1.03)"
}
```

### 9.5 Black & White

```js
{
  id: "black-white",
  name: "Black & White",
  cssFilter: "grayscale(1) contrast(1.05)"
}
```

## 10. Output Final

Hasil akhir berupa PNG yang diunduh ke device Ines.

Layout:

```text
2 kolom x 3 baris
Total foto: 6
```

Isi gambar final:

1. Judul: `Photobox`
2. 6 foto hasil capture.
3. Frame sesuai pilihan.
4. Filter sesuai pilihan.
5. Dekorasi kecil sesuai frame.
6. Teks kecil: `For Ines`
7. Tanggal otomatis.
8. Teks kecil: `230624` atau `our little place`.

Ukuran canvas yang disarankan:

```text
Width: 1200px
Height: 1800px
```

Catatan:

```text
Ukuran boleh disesuaikan jika implementasi butuh proporsi yang lebih baik, tetapi hasil akhir tidak boleh gepeng.
```

## 11. Copywriting UI

Judul:

```text
Photobox
```

Subtitle:

```text
Take 6 tiny memories, sayang.
Let your smile stay here for a while.
```

Button:

```text
Start Camera
Start Photobox
Retake
Retake All
Download Photobox
Back to Home
```

Countdown:

```text
5
4
3
2
1
Smile, sayang!
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

Success:

```text
Your little photobox is ready.
```

## 12. Design Rules

Photobox harus mengikuti design system area Ines:

```text
Scrapbook 60%
Romantis elegan 40%
```

Gunakan:

1. Paper card.
2. Rounded corner.
3. Soft shadow.
4. Warm color.
5. Scrapbook decoration.
6. Gentle animation.
7. Mobile-first layout.

Jangan gunakan:

1. Neon.
2. Cyberpunk.
3. Dashboard style.
4. Warna terlalu mencolok.
5. Animasi berlebihan.

## 13. Acceptance Criteria

Fitur dianggap selesai jika:

1. Route `/photobox` tersedia.
2. `/photobox` hanya bisa diakses role Ines.
3. Menu Photobox muncul di navigasi Ines.
4. Menu Photobox tidak muncul di navigasi Admin.
5. Kamera tidak menyala otomatis.
6. Kamera menyala setelah klik Start Camera.
7. Jika permission ditolak, tampil error lembut.
8. Ines bisa memilih 1 dari 5 frame.
9. Ines bisa memilih 1 dari 5 filter.
10. Ines bisa klik Start Photobox.
11. Sistem countdown 5 detik untuk setiap foto.
12. Sistem otomatis mengambil 6 foto.
13. Preview 6 foto tampil dalam layout 2 kolom x 3 baris.
14. Ines bisa retake foto tertentu.
15. Ines bisa retake all.
16. Ines bisa download hasil akhir PNG.
17. Hasil PNG berisi 6 foto, frame, dekorasi, judul, tanggal, dan teks kecil.
18. Layout nyaman di HP dan laptop.
19. Kamera stream berhenti saat halaman ditinggalkan.
20. `npm run build` lolos.
21. `npm run lint` lolos.

## 14. Catatan Risiko

1. Kamera hanya berjalan di HTTPS atau localhost.
2. Browser akan meminta permission kamera.
3. Beberapa browser mobile bisa punya behavior berbeda untuk kamera depan/belakang.
4. Canvas final perlu diuji agar hasil tidak gepeng.
5. Download di iOS Safari mungkin perlu diuji khusus.
6. Stream kamera harus selalu dihentikan saat halaman ditinggalkan agar tidak boros baterai.