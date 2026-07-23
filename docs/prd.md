# PRD Website Personal untuk Ines

## 1. Nama Sementara Produk

**For Ines — A Little Place for Us**

Nama ini masih sementara. Website ini ditujukan sebagai ruang digital pribadi untuk Ines, berisi scrapbook kenangan, galeri foto, love letter, daily message, musik latar, dan tempat Ines bisa mengirim balasan teks.

Website ini juga memiliki mode khusus untuk Moses sebagai admin, agar Moses dapat mengelola isi website tanpa harus mengubah kode secara manual setiap saat.

---

## 2. Tujuan Website

Website ini dibuat sebagai hadiah personal jangka panjang untuk pacar, yaitu Ines.

Website tidak hanya berfungsi sebagai galeri foto, tetapi sebagai **scrapbook digital interaktif** yang dapat dibuka Ines kapan saja. Website ini menjadi tempat kecil berisi kenangan, surat cinta, pesan harian, musik, foto, dan balasan dari Ines.

Tujuan utama website:

- Membuat Ines merasa memiliki tempat digital pribadi yang dibuat khusus untuknya.
- Menyediakan ruang untuk membaca love letter berdasarkan mood.
- Menyediakan daily message yang berubah setiap hari.
- Menampilkan galeri foto dalam bentuk scrapbook/polaroid.
- Memberikan pengalaman interaktif, hangat, dan personal.
- Memungkinkan Ines mengirim balasan teks.
- Memungkinkan Moses sebagai admin mengelola konten website.

Website harus terasa:

- Personal
- Hangat
- Interaktif
- Romantis
- Scrapbook
- Elegan
- Tidak seperti template AI
- Tidak seperti dashboard biasa
- Tidak terlalu ramai seperti demo komponen UI

Gaya visual utama adalah:

**Scrapbook 60% + Romantis Elegan 40%**

---

## 3. Target User dan Role

Website memiliki 2 role utama:

1. **Ines**
2. **Admin / Moses**

---

## 3.1 Role: Ines

Ines adalah user utama dan penerima website.

### Cara Login

Ines login menggunakan secret code berbasis tanggal khusus:

```text
230624

Jika Ines memasukkan kode tersebut, sistem akan mengenali role sebagai:

role: "ines"
Fitur yang Bisa Diakses Ines

Ines dapat:

Membuka website dengan secret code.
Melihat Home / Scrapbook Welcome.
Membuka galeri foto.
Membaca daily message.
Memilih mood.
Membaca love letter sesuai mood.
Menulis balasan teks.
Menyimpan surat atau pesan ke favorite.
Melihat ulang surat yang pernah dibuka.
Melihat favorite/history.
Memutar atau menghentikan background music.
Fitur yang Tidak Bisa Diakses Ines

Ines tidak dapat:

Mengakses halaman admin.
Melihat semua reply yang pernah dikirim.
Menambah/menghapus/mengedit foto.
Mengganti lagu website.
Mengelola love letter.
Mengelola daily message.
Mengubah konfigurasi website.
3.2 Role: Admin / Moses

Admin adalah Moses sebagai pembuat website.

Cara Login

Admin login menggunakan kode admin khusus.

Untuk MVP awal, admin dapat login melalui secret code admin:

VITE_ADMIN_CODE

Untuk versi yang lebih aman, admin login dapat dikembangkan menggunakan:

Supabase Auth
Fitur yang Bisa Diakses Admin

Admin dapat:

Masuk ke halaman Admin Dashboard.
Melihat semua reply dari Ines.
Mengelola foto galeri.
Menambah foto baru.
Menghapus foto.
Mengubah caption foto.
Mengubah kategori foto.
Menandai foto sebagai featured.
Mengelola lagu website.
Mengupload lagu baru.
Mengganti lagu aktif.
Menghapus lagu.
Mengelola love letter.
Menambah love letter baru.
Mengedit love letter.
Menonaktifkan love letter.
Mengelola daily message.
Menambah daily message baru.
Mengedit daily message.
Menonaktifkan daily message.
Catatan Penting

Role admin harus dipisahkan dari role Ines. Route admin tidak boleh muncul di navigasi utama Ines.

4. Platform dan Teknologi
4.1 Frontend

Website akan dibuat menggunakan:

React
Vite
HTML
CSS
JavaScript
Tailwind CSS
Framer Motion
React Router
4.2 Hosting

Website akan dihosting di:

Vercel
4.3 Database dan Storage

Website menggunakan:

Supabase Database
Supabase Storage

Supabase digunakan untuk menyimpan:

Reply dari Ines
Foto galeri
Metadata foto
Lagu
Metadata lagu
Love letter
Daily message
Favorite
History
4.4 UI dan Animasi

Website dapat mengambil inspirasi atau komponen dari:

React Bits
Animate UI
Uiverse
Vengeance UI
Skiper UI
Uilora
Animmaster Lib

Namun, penggunaan library harus tetap dikontrol. Tidak semua library digunakan sekaligus agar website tidak terasa ramai atau seperti kumpulan template UI.

5. Gaya Bahasa

Website menggunakan bahasa campuran:

Bahasa Indonesia
Bahasa Inggris

Contoh gaya bahasa:

“Hi sayang, welcome back.”
“Aku buat tempat kecil ini supaya kamu bisa pulang ke kenangan kita kapan pun kamu mau.”
“Open this when you miss me.”
“Hari ini berat ya? Come here, let me remind you something.”
“I’ll keep your reply close to my heart.”
“Pick your mood, and I’ll leave a letter for you.”

Bahasa harus terasa:

Natural
Personal
Hangat
Tidak terlalu formal
Tidak kaku
Tidak terlalu seperti tulisan AI
6. Sapaan dan Panggilan

Website dapat menggunakan beberapa panggilan untuk Ines secara bergantian agar terasa personal.

Daftar panggilan:

Ines pacar
Ines
Nes
Sayang
Cintaku
Kunneng

Panggilan ini dapat digunakan di:

Halaman login
Halaman pembuka
Daily message
Love letter
Empty state
Pesan error secret code
Pesan setelah balasan dikirim
Pesan favorite/history

Contoh:

“Welcome back, Nes.”
“This one is for you, cintaku.”
“Kunneng, kalau hari ini terasa berat, baca ini pelan-pelan ya.”
“Sayang, aku simpan balasanmu di sini.”
7. Konsep Visual

Website menggunakan gaya:

Scrapbook 60% + Romantis Elegan 40%

7.1 Scrapbook Elements

Elemen scrapbook yang digunakan:

Polaroid photo cards
Torn paper effect
Washi tape
Handwritten notes
Sticky notes
Paper texture
Photo collage
Stamp effect
Doodle kecil
Pin atau paperclip visual
Layered cards
Tape corner
Envelope
Paper notes
Scrapbook stickers yang tidak berlebihan
7.2 Romantic Elegant Elements

Elemen romantis elegan yang digunakan:

Warna cream
Ivory
Beige
Dusty rose
Deep brown
Champagne gold
Serif font untuk heading
Soft shadow
Smooth transition
Subtle glow
Gentle animation
Glassmorphism ringan
Background gradient lembut
7.3 Hal yang Perlu Dihindari

Website tidak boleh terlihat:

Terlalu childish
Terlalu pink berlebihan
Terlalu ramai seperti demo animasi
Terlalu kaku seperti dashboard
Terlalu generik seperti template AI
Terlalu futuristik sampai menghilangkan nuansa personal
Terlalu banyak efek WebGL/3D yang tidak perlu
Terlalu berat saat dibuka di HP
8. Struktur Halaman

Website memiliki dua area utama:

Area Ines
Area Admin
8.1 Struktur Halaman untuk Ines
/
├── Unlock / Login Code Screen
├── Home / Scrapbook Welcome
├── Gallery
├── Daily Message
├── Love Letter Generator
├── Letter History / Favorites
└── Music Control

Rekomendasi route:

/unlock
/home
/gallery
/daily
/letters
/saved
8.2 Struktur Halaman untuk Admin
/admin
├── Admin Login / Admin Code Gate
├── Admin Dashboard
├── Replies Management
├── Photos Management
├── Music Management
├── Love Letters Management
└── Daily Messages Management

Rekomendasi route:

/admin
/admin/replies
/admin/photos
/admin/music
/admin/letters
/admin/daily-messages

Route admin tidak boleh muncul di navigasi utama Ines.

9. Sistem Login dan Role
9.1 Deskripsi

Saat user membuka website, user akan diarahkan ke halaman unlock/login code. Pada halaman ini user memasukkan kode.

Sistem akan mengecek kode tersebut dan menentukan role user.

9.2 Login sebagai Ines

Jika kode yang dimasukkan adalah:

230624

Maka sistem akan menyimpan session sebagai:

{
  "isUnlocked": true,
  "role": "ines"
}

Setelah itu user diarahkan ke:

/home
9.3 Login sebagai Admin

Jika kode yang dimasukkan sesuai dengan admin code, maka sistem akan menyimpan session sebagai:

{
  "isUnlocked": true,
  "role": "admin"
}

Setelah itu user diarahkan ke:

/admin
9.4 Penyimpanan Session

Untuk MVP awal, session dapat disimpan di:

localStorage

Data yang disimpan:

isUnlocked
role

Contoh:

{
  "isUnlocked": true,
  "role": "ines"
}

atau:

{
  "isUnlocked": true,
  "role": "admin"
}
9.5 Route Guard

Website harus memiliki route guard.

Rule untuk Ines

Jika user belum login:

akses /home, /gallery, /daily, /letters, /saved
↓
redirect ke /unlock

Jika user login sebagai Ines:

boleh akses /home, /gallery, /daily, /letters, /saved
tidak boleh akses /admin/*
Rule untuk Admin

Jika user login sebagai Admin:

boleh akses /admin/*
boleh diarahkan ke Admin Dashboard

Admin tidak perlu menggunakan halaman Ines kecuali jika memang ingin preview.

10. Fitur Utama untuk Ines
10.1 Unlock / Login Code Screen
Deskripsi

Halaman pertama saat website dibuka. User memasukkan kode untuk masuk.

Tujuan
Membuat website terasa private.
Memisahkan role Ines dan Admin.
Memberikan pengalaman awal yang personal.
Requirement
Input secret code.
Tombol unlock.
Validasi kode.
Jika kode 230624, login sebagai Ines.
Jika kode admin benar, login sebagai Admin.
Jika kode salah, tampilkan pesan error yang manis.
Setelah login, role disimpan ke localStorage.
Contoh Microcopy

Saat awal:

Enter the date only we know.

Jika login sebagai Ines berhasil:

Welcome home, Nes.

Jika login sebagai Admin berhasil:

Welcome back, Moses.

Jika kode salah:

Hmm, not that one, sayang. Try again with your heart.
10.2 Home / Scrapbook Welcome
Deskripsi

Home adalah halaman pertama setelah Ines berhasil masuk. Halaman ini menjadi pintu masuk ke seluruh pengalaman website.

Isi Halaman
Sapaan personal.
Foto utama atau collage kecil.
Kalimat pembuka romantis.
Preview daily message.
Tombol menuju Gallery.
Tombol menuju Love Letter Generator.
Tombol menuju Favorites atau History.
Background music control.
Contoh Copy
Hi, Ines pacar.

I made this little place for us.

A place for our photos,
our silly memories,
and the words I want you to read
whenever your heart needs them.
Interaksi
Text animation saat halaman dibuka.
Polaroid cards muncul satu per satu.
Hover pada foto membuat foto sedikit bergerak.
Tombol navigasi memiliki animasi halus.
Music control dapat diaktifkan.
10.3 Gallery Foto
Deskripsi

Gallery berisi foto-foto kenangan. Galeri tidak hanya berupa grid biasa, tetapi dibuat seperti scrapbook digital.

Sumber Data

Untuk versi awal:

Data foto bisa berasal dari file lokal.

Untuk versi final:

Foto berasal dari Supabase Storage dan metadata dari table gallery_photos.
Kegunaan Foto

Foto dapat digunakan sebagai:

Background
Polaroid scrapbook
Hiasan di surat
Galeri khusus
Collage di home
Visual pendukung mood letter
Requirement
Menampilkan daftar foto.
Foto ditampilkan dalam style polaroid atau scrapbook.
Setiap foto memiliki caption.
Foto bisa dikelompokkan berdasarkan kategori atau momen.
Foto dapat dibuka dalam modal/lightbox.
Ada animasi saat foto dibuka.
Beberapa foto bisa digunakan sebagai dekorasi halaman.
Foto featured dapat tampil di Home.
Kategori Foto Awal

Kategori dapat dibuat seperti:

Our Favorite Moments
Random Us
Sweet Memories
Funny Moments
Places We Went
My Favorite Photos of You
10.4 Daily Message
Deskripsi

Daily Message adalah pesan pendek yang muncul secara random setiap hari.

Tujuan

Agar website terasa hidup dan punya alasan untuk dibuka kembali.

Requirement
Setiap hari muncul satu pesan.
Pesan dipilih secara random berbasis tanggal.
Pesan tidak berubah-ubah setiap refresh di hari yang sama.
Pesan dapat menggunakan panggilan berbeda untuk Ines.
Pesan bisa disimpan ke favorite.
Ines dapat memberi balasan teks terhadap daily message.
Daily message dapat dikelola oleh Admin.
Contoh Daily Message
Today’s little reminder:
jangan lupa makan ya, Nes.
Kamu boleh sibuk, tapi kamu tetap harus dijaga,
even by yourself.
Cintaku, kalau hari ini terasa biasa aja,
aku cuma mau bilang:
having you in my life is never ordinary.
Sumber Data

Untuk MVP awal:

Daily message disimpan dalam file lokal.

Untuk versi final:

Daily message disimpan di Supabase table daily_messages.
10.5 Love Letter Generator
Deskripsi

Love Letter Generator adalah fitur utama website. Ines memilih mood, lalu website menampilkan surat cinta sesuai mood tersebut.

Mood Awal

Mood yang digunakan:

Kangen
Sedih
Capek / Butuh Semangat
Marah / Kesal
Random Romantis
Requirement
User memilih mood.
Website menampilkan satu surat berdasarkan mood.
Setiap mood dapat memiliki lebih dari satu surat.
Jika mood memiliki beberapa surat, website dapat memilih salah satu secara random.
Surat ditampilkan dengan animasi berbeda-beda.
Setelah surat tampil, user bisa menulis balasan teks.
Surat yang dibuka dapat masuk ke history.
Surat dapat ditandai sebagai favorite.
Love letter dapat dikelola oleh Admin.
Draft Jumlah Konten Awal

Untuk versi awal:

Minimal 5 surat.
Setiap mood memiliki minimal 1 surat.
Struktur dibuat agar mudah ditambah menjadi beberapa surat per mood.
Contoh Struktur Mood dan Style
Mood	Style Tampilan	Nuansa
Kangen	Typewriter letter + polaroid	Hangat, lembut
Sedih	Soft card + fade animation	Menenangkan
Capek / Butuh Semangat	Sticky note + checklist	Supportive
Marah / Kesal	Envelope opening animation	Minta maaf, lembut
Random Romantis	Glow card + scrapbook collage	Manis, surprise
10.6 Letter Animation Variants
Deskripsi

Setiap surat tidak tampil dengan gaya yang sama. Ini penting agar fitur tidak terasa monoton.

Variasi Tampilan
Typewriter Letter
Teks muncul seperti diketik.
Cocok untuk mood kangen.
Soft Fade Letter
Surat muncul perlahan.
Cocok untuk mood sedih.
Sticky Note Letter
Surat seperti catatan kecil di scrapbook.
Cocok untuk mood capek/butuh semangat.
Envelope Letter
Amplop terbuka, lalu surat keluar.
Cocok untuk mood marah/kesal.
Glow Romantic Card
Card dengan glow lembut dan dekorasi foto.
Cocok untuk random romantis.
10.7 Reply Text
Deskripsi

Setelah membaca surat atau daily message, Ines dapat menulis balasan teks.

Requirement
Ada textarea untuk balasan.
Ada tombol kirim.
Setelah berhasil dikirim, tampil pesan sukses.
Balasan disimpan ke database Supabase.
Balasan menyimpan informasi sumber, yaitu love letter atau daily message.
Balasan dapat dilihat oleh Admin melalui halaman Admin Replies.
Data yang Disimpan
replies
- id
- source_type
- source_id
- mood
- reply_text
- created_at

Keterangan:

source_type bisa bernilai love_letter atau daily_message.
source_id adalah ID surat atau pesan harian.
mood menyimpan mood terkait jika ada.
reply_text menyimpan isi balasan Ines.
created_at menyimpan waktu balasan dikirim.
10.8 Letter History / Favorites
Deskripsi

Ines dapat melihat ulang surat yang pernah dibuka atau surat yang ditandai sebagai favorite.

Requirement
Menampilkan daftar surat yang pernah dibuka.
Menampilkan daftar surat favorite.
User dapat membuka ulang surat dari halaman ini.
Favorite disimpan di Supabase agar tidak hilang jika pindah device.
History surat juga dapat disimpan di Supabase.
Data Favorite
favorites
- id
- item_type
- item_id
- mood
- created_at
Data History
letter_history
- id
- letter_id
- mood
- opened_at
10.9 Background Music
Deskripsi

Website memiliki background music untuk menambah suasana romantis.

Requirement
Ada tombol play/pause.
Musik tidak boleh langsung mengganggu.
User bisa mengaktifkan atau mematikan musik.
Volume sebaiknya lembut.
Musik dapat mulai setelah user melakukan interaksi pertama.
Control musik tersedia di halaman utama.
Lagu aktif dapat diganti oleh Admin.
Lagu disimpan di Supabase Storage.
Metadata lagu disimpan di Supabase table music_tracks.
Catatan Teknis

Browser biasanya membatasi autoplay audio. Karena itu, musik sebaiknya tidak dipaksa langsung menyala otomatis sebelum user berinteraksi.

Cara terbaik adalah menampilkan tombol seperti:

Play our little song

atau setelah secret code berhasil:

Do you want to turn on the music?
11. Fitur Utama untuk Admin
11.1 Admin Dashboard
Deskripsi

Halaman utama untuk Admin setelah login.

Isi Dashboard

Admin Dashboard menampilkan ringkasan:

Jumlah reply dari Ines.
Reply terbaru.
Jumlah foto.
Lagu aktif saat ini.
Jumlah love letter.
Jumlah daily message.
Shortcut ke halaman pengelolaan.
Requirement
Admin Dashboard hanya dapat diakses role admin.
Menampilkan data ringkas dari Supabase.
Memiliki navigasi ke:
Replies
Photos
Music
Love Letters
Daily Messages
11.2 Admin Replies
Deskripsi

Halaman untuk melihat semua balasan teks yang dikirim oleh Ines.

Requirement
Menampilkan semua reply dari tabel replies.
Urutkan reply dari terbaru ke terlama.
Tampilkan source type.
Tampilkan source id atau judul sumber jika tersedia.
Tampilkan mood.
Tampilkan isi reply.
Tampilkan tanggal dan waktu reply.
Admin dapat membaca semua reply.
Contoh Tampilan Data
Reply:
Aku juga kangen kamu.

Source:
Love Letter - Kangen

Time:
12 July 2026, 20:31
11.3 Admin Photos Management
Deskripsi

Halaman untuk mengelola foto website.

Requirement

Admin dapat:

Melihat daftar foto.
Upload foto baru.
Mengisi caption.
Memilih kategori foto.
Menandai foto sebagai featured.
Menghapus foto.
Mengedit caption.
Mengedit kategori.
Mengubah status aktif/nonaktif foto.
Penyimpanan

File foto disimpan di:

Supabase Storage bucket: gallery

Metadata foto disimpan di table:

gallery_photos
11.4 Admin Music Management
Deskripsi

Halaman untuk mengelola lagu website.

Requirement

Admin dapat:

Melihat daftar lagu.
Upload lagu baru.
Mengisi title.
Mengisi artist/note.
Memilih lagu aktif.
Menghapus lagu.
Mengubah metadata lagu.
Penyimpanan

File lagu disimpan di:

Supabase Storage bucket: music

Metadata lagu disimpan di table:

music_tracks
Rule Lagu Aktif
Hanya satu lagu yang boleh aktif dalam satu waktu.
Lagu aktif memiliki is_active = true.
Ketika admin memilih lagu baru sebagai aktif, lagu lain harus menjadi is_active = false.
11.5 Admin Love Letters Management
Deskripsi

Halaman untuk mengelola love letter.

Requirement

Admin dapat:

Melihat semua love letter.
Menambah love letter baru.
Mengedit title.
Mengedit subtitle.
Mengedit mood.
Mengedit content.
Mengedit style tampilan.
Mengupload/memilih foto pendukung.
Mengaktifkan/nonaktifkan surat.
Menghapus surat jika diperlukan.
Field Love Letter
id
mood
title
subtitle
content
style
photo_url
is_active
created_at
updated_at
11.6 Admin Daily Messages Management
Deskripsi

Halaman untuk mengelola daily message.

Requirement

Admin dapat:

Melihat semua daily message.
Menambah daily message baru.
Mengedit pesan.
Mengubah tone.
Mengaktifkan/nonaktifkan pesan.
Menghapus pesan jika diperlukan.
Field Daily Message
id
message
tone
is_active
created_at
updated_at
12. Data Konten yang Dibutuhkan
12.1 Love Letters

Minimal 5 surat awal:

1. Kangen
2. Sedih
3. Capek / Butuh Semangat
4. Marah / Kesal
5. Random Romantis

Setiap surat memiliki:

- id
- mood
- title
- subtitle
- content
- style
- photo_url
- is_active
12.2 Daily Messages

Minimal 10–30 pesan pendek agar daily message tidak cepat terasa berulang.

Setiap daily message memiliki:

- id
- message
- tone
- is_active

Tone bisa berupa:

- sweet
- caring
- funny
- romantic
- supportive
12.3 Photos

Foto yang dibutuhkan:

- Foto utama untuk home
- Foto untuk background
- Foto untuk polaroid scrapbook
- Foto untuk gallery
- Foto pendukung surat

Setiap foto memiliki:

- id
- title
- caption
- image_url
- category
- is_featured
- is_active
- created_at
- updated_at
12.4 Music

Data musik:

- id
- title
- artist
- audio_url
- is_active
- created_at
- updated_at

File musik disimpan di Supabase Storage.

12.5 Secret Codes

Kode yang dibutuhkan:

- Ines code: 230624
- Admin code: disimpan di environment variable

Environment variable:

VITE_INES_CODE=230624
VITE_ADMIN_CODE=...

Catatan:

Environment variable dengan prefix VITE_ tetap akan masuk ke bundle frontend. Jadi ini cukup untuk private gate ringan, bukan keamanan tingkat tinggi.

13. Struktur Data Awal
13.1 Love Letter Data
const loveLetters = [
  {
    id: "kangen-001",
    mood: "kangen",
    title: "Kalau kamu lagi kangen aku",
    subtitle: "Read this slowly, sayang.",
    style: "typewriter",
    content: [
      "Hai, Nes.",
      "Kalau kamu lagi kangen aku, aku mau kamu tahu satu hal: aku juga sering kangen kamu di waktu-waktu yang bahkan tidak aku rencanakan.",
      "Kadang cuma karena hal kecil, tiba-tiba aku ingat kamu."
    ],
    photo_url: "/images/letters/kangen-1.jpg",
    is_active: true
  }
];
13.2 Daily Message Data
const dailyMessages = [
  {
    id: "daily-001",
    tone: "caring",
    message: "Jangan lupa makan ya, Nes. Aku tahu kamu kuat, tapi kamu tetap harus dijaga.",
    is_active: true
  }
];
13.3 Gallery Data
const galleryPhotos = [
  {
    id: "photo-001",
    title: "Sweet Memory",
    image_url: "/images/gallery/photo-001.jpg",
    caption: "One of my favorite memories with you.",
    category: "Sweet Memories",
    is_featured: true,
    is_active: true
  }
];
13.4 Music Data
const musicTracks = [
  {
    id: "music-001",
    title: "Our Little Song",
    artist: "For Ines",
    audio_url: "/audio/our-song.mp3",
    is_active: true
  }
];
14. Database Supabase
14.1 Table: replies

Untuk menyimpan balasan teks dari Ines.

create table replies (
  id uuid primary key default gen_random_uuid(),
  source_type text not null,
  source_id text not null,
  mood text,
  reply_text text not null,
  created_at timestamptz default now()
);
14.2 Table: favorites

Untuk menyimpan surat atau daily message yang disukai.

create table favorites (
  id uuid primary key default gen_random_uuid(),
  item_type text not null,
  item_id text not null,
  mood text,
  created_at timestamptz default now()
);
14.3 Table: letter_history

Untuk menyimpan riwayat surat yang dibuka.

create table letter_history (
  id uuid primary key default gen_random_uuid(),
  letter_id text not null,
  mood text,
  opened_at timestamptz default now()
);
14.4 Table: gallery_photos

Untuk menyimpan metadata foto.

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
14.5 Table: music_tracks

Untuk menyimpan metadata lagu.

create table music_tracks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text,
  audio_url text not null,
  is_active boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
14.6 Table: love_letters

Untuk menyimpan love letter.

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
14.7 Table: daily_messages

Untuk menyimpan daily message.

create table daily_messages (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  tone text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
14.8 Supabase Storage Bucket

Storage bucket yang dibutuhkan:

gallery
music
letter-photos

Kegunaan:

gallery       → menyimpan foto galeri
music         → menyimpan file audio
letter-photos → menyimpan foto pendukung love letter
15. User Flow
15.1 Flow Login Role
User membuka website
↓
User melihat Unlock / Login Code Screen
↓
User memasukkan kode
↓
Sistem mengecek kode
↓
Jika kode = 230624
    login sebagai Ines
    redirect ke /home
↓
Jika kode = admin code
    login sebagai Admin
    redirect ke /admin
↓
Jika kode salah
    tampilkan pesan error
15.2 Flow Utama Ines
Ines membuka website
↓
Ines memasukkan kode 230624
↓
Sistem login sebagai Ines
↓
Ines masuk ke Home
↓
Ines melihat scrapbook welcome
↓
Ines membaca daily message
↓
Ines membuka Love Letter Generator
↓
Ines memilih mood
↓
Website menampilkan surat sesuai mood
↓
Ines membaca surat
↓
Ines menulis balasan teks
↓
Balasan tersimpan ke Supabase
↓
Ines dapat membuka Gallery atau Favorites/History
15.3 Flow Gallery Ines
Ines masuk ke Gallery
↓
Ines melihat foto dalam bentuk scrapbook/polaroid
↓
Ines klik foto
↓
Foto terbuka dalam modal/lightbox
↓
Caption dan kenangan ditampilkan
15.4 Flow Admin
Moses membuka website
↓
Moses memasukkan admin code
↓
Sistem login sebagai Admin
↓
Moses masuk ke Admin Dashboard
↓
Moses dapat memilih:
    - melihat replies
    - mengelola foto
    - mengelola lagu
    - mengelola love letter
    - mengelola daily message
15.5 Flow Admin Melihat Reply
Admin membuka /admin/replies
↓
Sistem mengambil data dari table replies
↓
Balasan ditampilkan dari terbaru ke terlama
↓
Admin membaca reply dari Ines
15.6 Flow Admin Mengganti Lagu
Admin membuka /admin/music
↓
Admin melihat daftar lagu
↓
Admin upload lagu baru atau memilih lagu yang sudah ada
↓
Admin klik Set Active
↓
Sistem mengubah lagu tersebut menjadi is_active = true
↓
Sistem mengubah lagu lain menjadi is_active = false
↓
Website Ines memutar lagu aktif yang baru
15.7 Flow Admin Mengelola Foto
Admin membuka /admin/photos
↓
Admin melihat daftar foto
↓
Admin upload foto baru
↓
Admin mengisi caption dan kategori
↓
Foto tersimpan di Supabase Storage
↓
Metadata foto tersimpan di table gallery_photos
↓
Foto muncul di Gallery Ines
16. Non-Functional Requirements
16.1 Performance
Website harus ringan.
Animasi tidak boleh membuat loading lambat.
Gambar harus dikompresi.
Musik tidak boleh berukuran terlalu besar.
Komponen berat seperti 3D atau shader digunakan secara terbatas.
Supabase query harus efisien.
Gallery tidak boleh memuat gambar ukuran besar tanpa optimasi.
16.2 Responsiveness

Website harus nyaman dibuka di:

Mobile
Tablet
Laptop

Prioritas utama adalah mobile karena kemungkinan besar Ines membuka dari HP.

Admin panel juga harus bisa dibuka di laptop dan tetap cukup nyaman di mobile.

16.3 Privacy
Website bersifat private.
Ada role-based access.
Ines hanya bisa mengakses halaman Ines.
Admin hanya bisa mengakses halaman admin setelah kode admin benar.
Admin routes tidak muncul di navigasi Ines.
Reply dari Ines tidak boleh terbuka bebas.
Supabase policy harus diperhatikan.
Environment variables digunakan untuk konfigurasi.
16.4 Maintainability
Data surat, daily message, gallery, dan music dibuat terstruktur.
Mudah menambah surat baru.
Mudah menambah foto baru.
Mudah mengganti lagu.
Mudah menambah mood baru.
Komponen dipisah berdasarkan fitur.
Supabase logic tidak boleh langsung ditulis di komponen UI.
Akses Supabase harus melalui service layer.
17. Design Direction
17.1 Warna

Palet warna yang disarankan:

Ivory
Cream
Warm beige
Dusty rose
Deep brown
Champagne gold
Soft black / charcoal
17.2 Font

Saran font:

Heading: elegant serif
Body: clean sans-serif
Accent: handwritten/script font secukupnya
17.3 Animasi

Animasi harus:

Lembut
Tidak terlalu cepat
Tidak berlebihan
Memberi rasa surprise
Mendukung suasana romantis
Tidak membuat website terasa seperti demo UI

Contoh animasi:

Text reveal
Fade in
Paper slide
Envelope open
Polaroid hover
Floating photo
Page transition
18. Library UI yang Direkomendasikan
18.1 React Bits

Digunakan untuk:

Text animation
Carousel
Interactive cards
Background animation ringan
18.2 Animate UI

Digunakan untuk:

Animated button
Cursor
Motion carousel
Small interactive elements
18.3 Uiverse

Digunakan untuk:

Input secret code
Textarea reply
Admin form input
Upload form styling
Small cards
18.4 Vengeance UI

Digunakan secara terbatas untuk:

Glow border card
Premium card effect
Hero/background tertentu
18.5 Skiper UI

Digunakan untuk:

Animated link
Theme toggle jika dibutuhkan
Detail kecil interaktif
18.6 Uilora dan Animmaster Lib

Opsional. Digunakan hanya jika ada komponen yang benar-benar cocok dan tidak membuat website terlalu berat.

19. MVP Scope
19.1 Wajib Ada di MVP
Login code screen dengan 2 role:
Ines
Admin
Home scrapbook welcome untuk Ines
Gallery foto sederhana
Daily message random per hari
Love Letter Generator berdasarkan 5 mood
Minimal 5 surat awal
Tampilan surat berbeda berdasarkan mood
Text reply form
Reply tersimpan ke Supabase
Admin dapat melihat reply
Background music dengan tombol play/pause
Admin dapat mengganti lagu aktif
Responsive mobile
Deploy ke Vercel
19.2 Bisa Masuk Setelah MVP
Admin upload foto dari UI
Admin edit caption foto
Admin delete foto
Admin tambah/edit love letter
Admin tambah/edit daily message
Favorites
Letter history
More letters per mood
More daily messages
More gallery categories
Easter egg
Anniversary mode
Theme toggle
Secret hidden letter
Supabase Auth untuk admin yang lebih aman
20. Prioritas Implementasi
Phase 1 — Foundation
1. Setup React + Vite
2. Setup Tailwind CSS
3. Setup struktur folder
4. Setup React Router
5. Setup design tokens
6. Setup Supabase client
Phase 2 — Role Login
1. Buat Unlock/Login Code Screen
2. Validasi kode Ines 230624
3. Validasi admin code
4. Simpan role ke localStorage
5. Buat route guard berdasarkan role
6. Redirect Ines ke /home
7. Redirect Admin ke /admin
Phase 3 — Core Experience Ines
1. Home scrapbook welcome
2. Background music control
3. Daily Message component
4. Gallery component
5. Mood Selector
6. Love Letter Display
7. Reply textarea
Phase 4 — Supabase Interaction
1. Buat table replies
2. Simpan reply ke Supabase
3. Buat table favorites
4. Buat table letter_history
5. Simpan favorite dan history
Phase 5 — Admin Core
1. Admin Dashboard
2. Admin Replies Page
3. Admin Music Page
4. Admin Photos Page
5. Admin Letters Page
6. Admin Daily Messages Page
Phase 6 — Admin Content Management
1. Admin dapat mengganti lagu aktif
2. Admin dapat upload lagu
3. Admin dapat upload foto
4. Admin dapat edit caption foto
5. Admin dapat tambah/edit love letter
6. Admin dapat tambah/edit daily message
Phase 7 — Visual Polish
1. Tambahkan text animation
2. Tambahkan scrapbook details
3. Tambahkan polaroid hover
4. Tambahkan envelope animation
5. Tambahkan page transition
6. Tambahkan custom cursor
7. Tambahkan card animation
Phase 8 — Surprise Features
1. Hidden letter
2. Anniversary mode
3. Secret second code
4. Random popup message
5. Special date theme
21. Risiko dan Catatan
21.1 Autoplay Music

Browser mungkin tidak mengizinkan musik langsung menyala otomatis. Solusinya adalah musik dimulai setelah user klik tombol atau setelah interaksi pertama.

21.2 Terlalu Banyak Animasi

Karena banyak library UI yang menarik, ada risiko website menjadi terlalu ramai. Solusinya adalah memilih animasi yang mendukung cerita, bukan hanya terlihat keren.

21.3 Privacy Database

Jika memakai Supabase, aturan akses data harus diperhatikan agar balasan pribadi tidak terbuka untuk publik.

21.4 Security Role Login

Jika role login hanya menggunakan kode di frontend, maka sistem ini hanya bersifat private ringan.

Untuk MVP personal, ini masih bisa diterima.

Untuk versi yang lebih aman, terutama admin, gunakan:

Supabase Auth
21.5 File Upload

Upload foto dan lagu membutuhkan Supabase Storage.

Risiko:

File terlalu besar.
Format file tidak sesuai.
Storage policy belum benar.
File gagal dimuat di frontend.

Solusi:

Batasi ukuran file.
Validasi format file.
Gunakan bucket khusus.
Simpan metadata di table terpisah.
21.6 Konten Terlalu Sedikit

Jika hanya ada 5 surat dan sedikit daily message, website bisa cepat terasa berulang. Untuk MVP cukup, tetapi untuk jangka panjang konten sebaiknya ditambah secara bertahap melalui admin panel.

22. Definisi Selesai MVP

MVP dianggap selesai jika:

Ines bisa login dengan kode 230624.
Admin bisa login dengan admin code.
Sistem menyimpan role user.
Ines masuk ke halaman Home.
Admin masuk ke halaman Admin Dashboard.
Ines melihat home scrapbook.
Ines bisa melihat beberapa foto di gallery.
Ines bisa membaca daily message.
Ines bisa memilih salah satu dari 5 mood.
Website menampilkan surat sesuai mood.
Setiap mood punya gaya tampilan yang berbeda.
Ines bisa menulis balasan teks.
Balasan Ines tersimpan ke Supabase.
Admin bisa melihat balasan Ines.
Ada tombol play/pause background music.
Admin bisa melihat lagu aktif.
Admin bisa mengganti lagu aktif.
Website nyaman dibuka dari HP.
Website berhasil di-deploy ke Vercel.
Desain konsisten dengan scrapbook 60% + romantis elegan 40%.
23. Definition of Done Final

Website dianggap selesai secara final jika:

Role Ines dan Admin berjalan dengan baik.
Route guard berjalan sesuai role.
Ines tidak bisa membuka halaman admin.
Admin bisa mengelola konten utama.
Reply dari Ines tersimpan dan bisa dibaca admin.
Foto galeri bisa dikelola admin.
Lagu website bisa diganti admin.
Love letter bisa ditambah/edit admin.
Daily message bisa ditambah/edit admin.
Background music berjalan baik.
Gallery tampil seperti scrapbook.
Love letter tampil interaktif sesuai mood.
Website responsive di mobile.
Website tidak terasa seperti template AI.
Website terasa personal, hangat, romantis, dan dibuat khusus untuk Ines.