# User Flow Website Personal untuk Ines

## 1. Tujuan User Flow

Dokumen ini menjelaskan alur penggunaan website dari sudut pandang user. Website ini memiliki dua role utama:

1. **Ines**, sebagai user utama yang menerima dan menggunakan website.
2. **Admin / Moses**, sebagai pembuat website yang mengelola isi website.

Website ini bersifat private dan dirancang sebagai scrapbook digital interaktif berisi galeri foto, daily message, love letter berdasarkan mood, background music, history/favorites, dan fitur balasan teks.

Perubahan penting pada versi ini adalah website tidak hanya memiliki satu secret code untuk Ines, tetapi memiliki sistem **role-based access** sederhana:

```text
Kode 230624 → login sebagai Ines
Kode admin  → login sebagai Admin / Moses

Setelah login, sistem akan mengarahkan user ke halaman yang sesuai dengan role-nya.

2. Daftar Role User
2.1 Ines

Ines adalah user utama yang menggunakan website.

Ines dapat:

Membuka website.
Memasukkan secret code 230624.
Login sebagai role ines.
Melihat halaman Home / Scrapbook Welcome.
Membaca daily message.
Membuka galeri foto.
Memilih mood.
Membaca love letter.
Mengirim balasan teks.
Menyimpan surat atau pesan ke favorite.
Melihat ulang history/favorite.
Mengaktifkan atau mematikan background music.

Ines tidak dapat:

Mengakses halaman admin.
Melihat seluruh reply yang pernah dikirim.
Mengelola foto.
Mengganti lagu.
Mengelola love letter.
Mengelola daily message.
2.2 Admin / Moses

Admin adalah Moses sebagai pembuat website.

Admin dapat:

Membuka website.
Memasukkan admin code.
Login sebagai role admin.
Masuk ke Admin Dashboard.
Melihat daftar balasan teks dari Ines.
Melihat asal balasan, apakah dari love letter atau daily message.
Melihat waktu balasan dikirim.
Mengelola foto galeri.
Menambah foto baru.
Mengedit caption foto.
Menghapus foto.
Menandai foto sebagai featured.
Mengelola lagu website.
Upload lagu baru.
Mengganti lagu aktif.
Menghapus lagu.
Mengelola love letter.
Menambah love letter.
Mengedit love letter.
Menonaktifkan love letter.
Mengelola daily message.
Menambah daily message.
Mengedit daily message.
Menonaktifkan daily message.
3. Struktur Navigasi Utama

Website memiliki dua area utama:

Area Ines
Area Admin
3.1 Struktur Navigasi Ines
/
├── /unlock
├── /home
├── /gallery
├── /daily
├── /letters
└── /saved

Keterangan:

/unlock adalah halaman login code.
/home adalah halaman utama setelah Ines berhasil login.
/gallery adalah halaman galeri foto.
/daily adalah halaman daily message.
/letters adalah halaman love letter generator.
/saved adalah halaman favorites dan history.
3.2 Struktur Navigasi Admin
/admin
├── /admin
├── /admin/replies
├── /admin/photos
├── /admin/music
├── /admin/letters
└── /admin/daily-messages

Keterangan:

/admin adalah Admin Dashboard.
/admin/replies adalah halaman untuk melihat reply dari Ines.
/admin/photos adalah halaman untuk mengelola foto.
/admin/music adalah halaman untuk mengelola lagu.
/admin/letters adalah halaman untuk mengelola love letter.
/admin/daily-messages adalah halaman untuk mengelola daily message.

Route admin tidak boleh tampil di navigasi utama Ines.

4. Global User Flow
4.1 Alur Login Role
User membuka link website
↓
Website menampilkan Unlock / Login Code Screen
↓
User memasukkan kode
↓
Sistem memvalidasi kode
↓
Jika kode = 230624:
    simpan role sebagai "ines"
    arahkan ke /home
↓
Jika kode = admin code:
    simpan role sebagai "admin"
    arahkan ke /admin
↓
Jika kode salah:
    tampilkan pesan error
    tetap berada di /unlock
4.2 Alur Utama Ines
Ines membuka link website
↓
Website menampilkan Unlock / Login Code Screen
↓
Ines memasukkan kode 230624
↓
Sistem memvalidasi kode
↓
Jika benar:
    simpan status unlock
    simpan role = "ines"
    arahkan ke /home
↓
Ines melihat halaman scrapbook utama
↓
Ines dapat memilih:
    - membuka Gallery
    - membaca Daily Message
    - membuka Love Letter Generator
    - melihat Favorites/History
    - mengontrol background music
4.3 Alur Utama Admin / Moses
Moses membuka link website
↓
Website menampilkan Unlock / Login Code Screen
↓
Moses memasukkan admin code
↓
Sistem memvalidasi kode
↓
Jika benar:
    simpan status unlock
    simpan role = "admin"
    arahkan ke /admin
↓
Moses melihat Admin Dashboard
↓
Moses dapat memilih:
    - melihat replies dari Ines
    - mengelola foto
    - mengelola lagu
    - mengelola love letter
    - mengelola daily message
5. Flow Unlock / Login Code Screen
5.1 Tujuan

Unlock / Login Code Screen digunakan untuk:

Membuat website terasa private.
Memisahkan akses Ines dan Admin.
Menentukan role user berdasarkan kode yang dimasukkan.
Mengarahkan user ke halaman sesuai role.
5.2 Entry Point

User masuk ke halaman ini ketika:

Pertama kali membuka website.
Status unlock belum tersimpan.
Session/localStorage unlock dihapus.
User membuka route tertentu tanpa login.
User logout dari website.
5.3 Flow Login Code
User membuka website
↓
Sistem mengecek status unlock dan role
↓
Jika belum unlock:
    tampilkan Unlock / Login Code Screen
↓
User memasukkan kode
↓
User klik tombol Unlock
↓
Sistem mengecek kode
↓
Jika kode = 230624:
    tampilkan pesan:
    “Welcome home, Nes.”
    simpan isUnlocked = true
    simpan role = "ines"
    redirect ke /home
↓
Jika kode = admin code:
    tampilkan pesan:
    “Welcome back, Moses.”
    simpan isUnlocked = true
    simpan role = "admin"
    redirect ke /admin
↓
Jika kode salah:
    tampilkan pesan:
    “Hmm, not that one, sayang. Try again with your heart.”
    tetap berada di /unlock
5.4 State yang Dibutuhkan
- inputCode
- isUnlocked
- role
- errorMessage
- isChecking
5.5 Output

Jika login sebagai Ines berhasil:

Redirect ke /home

Jika login sebagai Admin berhasil:

Redirect ke /admin

Jika gagal:

Tetap di /unlock
6. Navigation Guard dan Role Guard
6.1 Tujuan

Navigation guard memastikan user tidak bisa membuka halaman tanpa login, dan role guard memastikan user hanya bisa membuka halaman sesuai role.

6.2 Data Session

Setelah login, sistem menyimpan data seperti ini:

{
  "isUnlocked": true,
  "role": "ines"
}

atau:

{
  "isUnlocked": true,
  "role": "admin"
}

Penyimpanan MVP awal menggunakan:

localStorage
6.3 Flow Navigation Guard
User membuka route selain /unlock
↓
Sistem mengecek isUnlocked
↓
Jika isUnlocked = false:
    redirect ke /unlock
↓
Jika isUnlocked = true:
    lanjut cek role
↓
Jika role sesuai dengan route:
    izinkan akses
↓
Jika role tidak sesuai:
    redirect ke halaman default role
6.4 Route yang Dilindungi untuk Ines
/home
/gallery
/daily
/letters
/saved

Rule:

Hanya bisa diakses jika role = "ines"

Jika Admin membuka route Ines, sistem dapat mengarahkan Admin ke:

/admin
6.5 Route yang Dilindungi untuk Admin
/admin
/admin/replies
/admin/photos
/admin/music
/admin/letters
/admin/daily-messages

Rule:

Hanya bisa diakses jika role = "admin"

Jika Ines membuka route Admin, sistem harus mengarahkan Ines ke:

/home

atau menampilkan halaman tidak memiliki akses.

7. Flow Home / Scrapbook Welcome
7.1 Tujuan

Home menjadi pusat pengalaman Ines. Halaman ini harus memberi kesan pertama yang hangat, personal, dan scrapbook.

7.2 Entry Point

Ines masuk ke Home setelah:

Login dengan kode 230624.
Klik menu Home.
Selesai dari halaman lain lalu kembali ke Home.
7.3 Flow
Ines masuk ke Home
↓
Website menampilkan animasi pembuka
↓
Website menampilkan sapaan personal
↓
Website menampilkan beberapa foto scrapbook/polaroid
↓
Website menampilkan preview Daily Message
↓
Website menampilkan navigasi utama:
    - Gallery
    - Daily Message
    - Love Letters
    - Saved / History
↓
Website menampilkan Music Control
↓
Ines memilih fitur yang ingin dibuka
7.4 Elemen yang Ditampilkan
- Greeting text
- Foto utama atau photo collage
- Daily message preview
- Navigation cards
- Music control
- Floating scrapbook elements
7.5 Navigasi dari Home
Home
├── Klik “Open Gallery” → /gallery
├── Klik “Read Today’s Message” → /daily
├── Klik “Open Love Letter” → /letters
├── Klik “Saved Letters” → /saved
└── Klik music control → play/pause music
8. Flow Background Music untuk Ines
8.1 Tujuan

Background music digunakan untuk membangun suasana romantis.

8.2 Flow
Ines berhasil masuk ke Home
↓
Website mengambil lagu aktif dari Supabase
↓
Website menampilkan tombol:
“Play our little song”
↓
Ines klik tombol play
↓
Musik mulai diputar
↓
Tombol berubah menjadi pause
↓
Ines dapat klik pause untuk menghentikan musik
↓
Status musik disimpan sementara selama user berada di website
8.3 Catatan

Musik tidak disarankan autoplay langsung karena browser dapat memblokir audio sebelum user melakukan interaksi.

8.4 State yang Dibutuhkan
- isMusicPlaying
- volume
- currentTrack
- activeTrack
- isLoadingTrack
9. Flow Gallery Foto untuk Ines
9.1 Tujuan

Gallery digunakan untuk menampilkan foto-foto kenangan dalam bentuk scrapbook/polaroid, bukan grid biasa yang kaku.

9.2 Entry Point

Ines masuk ke Gallery dari:

Home.
Navigasi utama.
Link dari surat tertentu.
Link dari daily message jika ada.
9.3 Flow
Ines membuka Gallery
↓
Website mengambil data foto aktif dari Supabase atau data lokal
↓
Website menampilkan daftar foto dalam layout scrapbook
↓
Ines dapat scroll foto
↓
Ines dapat melihat foto berdasarkan kategori
↓
Ines klik salah satu foto
↓
Foto terbuka dalam modal/lightbox
↓
Website menampilkan:
    - foto lebih besar
    - caption
    - kategori
    - tanggal/momen jika ada
↓
Ines menutup modal
↓
Ines kembali ke Gallery
9.4 Kategori Foto
- Our Favorite Moments
- Random Us
- Sweet Memories
- Funny Moments
- Places We Went
- My Favorite Photos of You
9.5 Navigasi dari Gallery
Gallery
├── Klik foto → Photo Detail Modal
├── Tutup modal → Gallery
├── Klik Home → /home
├── Klik Love Letters → /letters
└── Klik Saved → /saved
9.6 State yang Dibutuhkan
- selectedCategory
- selectedPhoto
- isModalOpen
- galleryPhotos
- isLoadingPhotos
10. Flow Daily Message untuk Ines
10.1 Tujuan

Daily Message memberikan satu pesan pendek random setiap hari agar website terasa hidup dan layak dibuka kembali.

10.2 Entry Point

Ines membuka Daily Message dari:

Home preview.
Navigasi utama.
Link langsung /daily.
10.3 Flow
Ines membuka halaman Daily Message
↓
Sistem mengambil daftar daily message aktif
↓
Sistem mengambil tanggal hari ini
↓
Sistem memilih satu pesan berdasarkan tanggal
↓
Website menampilkan daily message
↓
Ines dapat:
    - membaca pesan
    - menulis balasan teks
    - menyimpan pesan ke favorite
    - kembali ke Home
10.4 Flow Balasan Daily Message
Ines membaca daily message
↓
Ines menulis balasan pada textarea
↓
Ines klik Send
↓
Sistem mengecek isi balasan
↓
Jika kosong:
    tampilkan pesan:
    “Tulis sedikit dulu ya, sayang.”
↓
Jika ada isi:
    simpan balasan ke Supabase table replies
↓
Tampilkan pesan sukses:
    “Your little reply has been saved.”
10.5 State yang Dibutuhkan
- todayMessage
- replyText
- isSubmitting
- submitStatus
- isFavorite
10.6 Data yang Dikirim ke Database
source_type: daily_message
source_id: daily message id
mood: null
reply_text: isi balasan
created_at: waktu kirim
11. Flow Love Letter Generator untuk Ines
11.1 Tujuan

Love Letter Generator adalah fitur utama. Ines memilih mood, lalu website menampilkan surat yang sesuai dengan mood tersebut.

11.2 Entry Point

Ines masuk ke Love Letter Generator dari:

Home.
Daily Message.
Gallery.
Saved/history.
Link langsung /letters.
11.3 Flow Utama
Ines membuka Love Letter Generator
↓
Website mengambil daftar love letter aktif
↓
Website menampilkan mood selector
↓
Ines memilih salah satu mood:
    - Kangen
    - Sedih
    - Capek / Butuh Semangat
    - Marah / Kesal
    - Random Romantis
↓
Sistem mencari daftar surat berdasarkan mood
↓
Jika ada beberapa surat:
    sistem memilih satu surat secara random
↓
Website menampilkan animasi sesuai style surat
↓
Ines membaca surat
↓
Website menampilkan action:
    - tulis balasan
    - save to favorite
    - another letter
    - back to moods
11.4 Flow Jika Ines Memilih Mood Kangen
Ines klik mood “Kangen”
↓
Sistem memilih surat dengan mood kangen
↓
Website menampilkan surat dengan style typewriter
↓
Foto/polaroid terkait muncul sebagai hiasan
↓
Ines membaca surat
↓
Ines dapat menulis balasan teks
11.5 Flow Jika Ines Memilih Mood Sedih
Ines klik mood “Sedih”
↓
Sistem memilih surat dengan mood sedih
↓
Website menampilkan surat dengan soft fade animation
↓
Nuansa visual lebih tenang dan lembut
↓
Ines membaca surat
↓
Ines dapat menulis balasan teks
11.6 Flow Jika Ines Memilih Mood Capek / Butuh Semangat
Ines klik mood “Capek / Butuh Semangat”
↓
Sistem memilih surat dengan mood capek
↓
Website menampilkan surat dengan sticky note style
↓
Surat berisi kalimat support dan reassurance
↓
Ines membaca surat
↓
Ines dapat menulis balasan teks
11.7 Flow Jika Ines Memilih Mood Marah / Kesal
Ines klik mood “Marah / Kesal”
↓
Sistem memilih surat dengan mood marah
↓
Website menampilkan envelope opening animation
↓
Surat muncul dengan nada lembut dan menenangkan
↓
Ines membaca surat
↓
Ines dapat menulis balasan teks
11.8 Flow Jika Ines Memilih Mood Random Romantis
Ines klik mood “Random Romantis”
↓
Sistem memilih surat random romantis
↓
Website menampilkan glow romantic card
↓
Scrapbook collage muncul sebagai dekorasi
↓
Ines membaca surat
↓
Ines dapat menulis balasan teks
11.9 Flow Another Letter
Ines sedang membaca surat
↓
Ines klik “Another letter”
↓
Sistem mencari surat lain dengan mood yang sama
↓
Jika ada surat lain:
    tampilkan surat lain
↓
Jika belum ada surat lain:
    tampilkan pesan:
    “For now, this is the only one for this mood, sayang.”
11.10 Flow Back to Moods
Ines sedang membaca surat
↓
Ines klik “Back to moods”
↓
Website kembali menampilkan Mood Selector
↓
Ines dapat memilih mood lain
11.11 State yang Dibutuhkan
- selectedMood
- selectedLetter
- availableLetters
- replyText
- isFavorite
- isSubmitting
- animationType
12. Flow Reply Text pada Love Letter
12.1 Tujuan

Reply Text memungkinkan Ines mengirim balasan setelah membaca surat.

12.2 Flow
Ines membaca love letter
↓
Ines menulis balasan di textarea
↓
Ines klik Send Reply
↓
Sistem memvalidasi isi balasan
↓
Jika kosong:
    tampilkan pesan:
    “Tulis sedikit dulu ya, Nes.”
↓
Jika tidak kosong:
    sistem menyimpan balasan ke Supabase table replies
↓
Tampilkan loading state
↓
Jika berhasil:
    tampilkan pesan:
    “I’ll keep this reply close to my heart.”
↓
Jika gagal:
    tampilkan pesan:
    “Maaf sayang, balasannya belum berhasil disimpan. Coba lagi ya.”
12.3 Data yang Dikirim ke Database
source_type: love_letter
source_id: selectedLetter.id
mood: selectedMood
reply_text: isi balasan
created_at: waktu kirim
13. Flow Favorite Letter / Daily Message
13.1 Tujuan

Favorite digunakan agar Ines dapat menyimpan surat atau daily message yang ingin ia baca lagi.

13.2 Flow
Ines membaca love letter atau daily message
↓
Ines klik tombol Favorite
↓
Sistem mengecek apakah item sudah favorite
↓
Jika belum favorite:
    simpan ke favorites
    ubah tombol menjadi aktif
    tampilkan pesan:
    “Saved for you, sayang.”
↓
Jika sudah favorite:
    hapus dari favorites
    ubah tombol menjadi nonaktif
    tampilkan pesan:
    “Removed from saved letters.”
13.3 Data Favorite
item_type: love_letter atau daily_message
item_id: id item
mood: mood jika ada
created_at: waktu simpan
14. Flow Letter History
14.1 Tujuan

History menyimpan surat yang pernah dibuka sehingga Ines bisa melihat ulang.

14.2 Flow Penyimpanan History
Ines membuka love letter
↓
Sistem mengecek letter_id
↓
Sistem menyimpan aktivitas buka surat ke history
↓
Data history tersimpan
14.3 Flow Melihat History
Ines membuka halaman Saved
↓
Website menampilkan dua tab:
    - Favorites
    - History
↓
Ines klik tab History
↓
Website menampilkan daftar surat yang pernah dibuka
↓
Ines klik salah satu surat
↓
Website membuka ulang surat tersebut
14.4 Data History
letter_id
mood
opened_at
15. Flow Saved Page
15.1 Tujuan

Halaman ini digunakan untuk melihat ulang surat atau pesan yang disimpan.

15.2 Entry Point

Ines masuk dari:

Home.
Love Letter Generator.
Daily Message.
Navigation link.
15.3 Flow
Ines membuka Saved Page
↓
Website menampilkan tab:
    - Favorites
    - History
↓
Default tab: Favorites
↓
Jika Favorites kosong:
    tampilkan empty state
↓
Jika ada Favorites:
    tampilkan daftar item favorite
↓
Ines klik salah satu item
↓
Website membuka detail item
15.4 Empty State

Jika belum ada favorite:

“You haven’t saved anything yet, sayang.
Maybe one of my letters will become your favorite soon.”

Jika belum ada history:

“No letters opened yet.
Pick a mood and let me write something for your heart.”
15.5 Navigasi dari Saved Page
Saved
├── Klik favorite letter → buka letter detail
├── Klik favorite daily message → buka daily detail
├── Klik history item → buka letter detail
├── Klik Love Letters → /letters
└── Klik Home → /home
16. Flow Admin Dashboard
16.1 Tujuan

Admin Dashboard menjadi pusat kontrol untuk Moses.

16.2 Entry Point

Admin masuk ke Dashboard setelah:

Login menggunakan admin code.
Membuka /admin saat role masih tersimpan sebagai admin.
16.3 Flow
Moses login sebagai Admin
↓
Website redirect ke /admin
↓
Admin Dashboard tampil
↓
Sistem mengambil ringkasan data dari Supabase
↓
Dashboard menampilkan:
    - jumlah reply
    - reply terbaru
    - jumlah foto
    - lagu aktif
    - jumlah love letter
    - jumlah daily message
↓
Admin memilih menu pengelolaan
16.4 Navigasi dari Admin Dashboard
Admin Dashboard
├── Klik Replies → /admin/replies
├── Klik Photos → /admin/photos
├── Klik Music → /admin/music
├── Klik Love Letters → /admin/letters
└── Klik Daily Messages → /admin/daily-messages
16.5 State yang Dibutuhkan
- totalReplies
- latestReplies
- totalPhotos
- activeMusic
- totalLoveLetters
- totalDailyMessages
- isLoadingDashboard
17. Flow Admin Replies
17.1 Tujuan

Admin Replies digunakan oleh Moses untuk membaca balasan teks dari Ines.

17.2 Entry Point

Admin membuka:

/admin/replies
17.3 Flow Melihat Balasan
Admin membuka /admin/replies
↓
Sistem mengambil data replies dari Supabase
↓
Website menampilkan daftar balasan terbaru
↓
Setiap balasan menampilkan:
    - isi balasan
    - source type
    - judul surat atau daily message jika tersedia
    - mood
    - tanggal dan waktu
↓
Admin dapat membaca semua balasan
17.4 Tampilan Data Balasan

Setiap item balasan menampilkan:

Reply text:
“Aku juga kangen.”

From:
Love Letter - Kangen

Time:
12 July 2026, 20:31
17.5 State yang Dibutuhkan
- replies
- isLoading
- errorMessage
18. Flow Admin Photos Management
18.1 Tujuan

Admin Photos digunakan untuk mengelola foto yang tampil di Gallery, Home, dan dekorasi scrapbook.

18.2 Entry Point

Admin membuka:

/admin/photos
18.3 Flow Melihat Foto
Admin membuka /admin/photos
↓
Sistem mengambil data gallery_photos dari Supabase
↓
Website menampilkan daftar foto
↓
Admin dapat melihat:
    - preview foto
    - title
    - caption
    - category
    - is_featured
    - is_active
18.4 Flow Upload Foto Baru
Admin klik Add Photo
↓
Website menampilkan form upload foto
↓
Admin memilih file foto
↓
Admin mengisi title
↓
Admin mengisi caption
↓
Admin memilih category
↓
Admin memilih apakah foto featured
↓
Admin klik Save
↓
Sistem upload file ke Supabase Storage bucket gallery
↓
Sistem mengambil public URL foto
↓
Sistem menyimpan metadata ke table gallery_photos
↓
Foto baru muncul di daftar foto
↓
Foto dapat tampil di Gallery Ines
18.5 Flow Edit Foto
Admin klik Edit pada salah satu foto
↓
Website menampilkan form edit
↓
Admin mengubah title/caption/category/is_featured/is_active
↓
Admin klik Save
↓
Sistem update data di gallery_photos
↓
Daftar foto diperbarui
18.6 Flow Delete Foto
Admin klik Delete pada foto
↓
Website meminta konfirmasi
↓
Jika Admin membatalkan:
    tidak ada perubahan
↓
Jika Admin mengonfirmasi:
    sistem menghapus metadata foto
    sistem dapat menghapus file dari Supabase Storage
↓
Foto hilang dari daftar dan tidak tampil di Gallery Ines
18.7 State yang Dibutuhkan
- photos
- selectedPhoto
- uploadFile
- formTitle
- formCaption
- formCategory
- isFeatured
- isActive
- isUploading
- isSaving
- errorMessage
19. Flow Admin Music Management
19.1 Tujuan

Admin Music digunakan untuk mengelola background music website.

19.2 Entry Point

Admin membuka:

/admin/music
19.3 Flow Melihat Daftar Lagu
Admin membuka /admin/music
↓
Sistem mengambil data music_tracks dari Supabase
↓
Website menampilkan daftar lagu
↓
Setiap lagu menampilkan:
    - title
    - artist/note
    - audio preview
    - status active
19.4 Flow Upload Lagu Baru
Admin klik Add Music
↓
Website menampilkan form upload lagu
↓
Admin memilih file audio
↓
Admin mengisi title
↓
Admin mengisi artist/note
↓
Admin memilih apakah langsung dijadikan lagu aktif
↓
Admin klik Save
↓
Sistem upload file ke Supabase Storage bucket music
↓
Sistem mengambil public URL audio
↓
Sistem menyimpan metadata ke table music_tracks
↓
Jika is_active = true:
    sistem menonaktifkan lagu lain
    sistem menjadikan lagu baru sebagai active track
↓
Lagu baru muncul di daftar lagu
19.5 Flow Set Active Music
Admin melihat daftar lagu
↓
Admin klik Set Active pada lagu tertentu
↓
Sistem meminta konfirmasi
↓
Jika Admin mengonfirmasi:
    sistem update semua lagu lain menjadi is_active = false
    sistem update lagu terpilih menjadi is_active = true
↓
Website Ines akan menggunakan lagu aktif yang baru
19.6 Flow Delete Music
Admin klik Delete pada lagu
↓
Website meminta konfirmasi
↓
Jika Admin membatalkan:
    tidak ada perubahan
↓
Jika Admin mengonfirmasi:
    sistem menghapus metadata lagu
    sistem dapat menghapus file dari Supabase Storage
↓
Lagu hilang dari daftar
19.7 State yang Dibutuhkan
- musicTracks
- selectedTrack
- uploadFile
- title
- artist
- isActive
- isUploading
- isSaving
- errorMessage
20. Flow Admin Love Letters Management
20.1 Tujuan

Admin Love Letters digunakan untuk menambah, mengedit, menonaktifkan, atau menghapus love letter.

20.2 Entry Point

Admin membuka:

/admin/letters
20.3 Flow Melihat Love Letters
Admin membuka /admin/letters
↓
Sistem mengambil data love_letters dari Supabase
↓
Website menampilkan daftar love letter
↓
Setiap surat menampilkan:
    - title
    - mood
    - style
    - is_active
    - updated_at
20.4 Flow Tambah Love Letter
Admin klik Add Letter
↓
Website menampilkan form love letter
↓
Admin mengisi title
↓
Admin mengisi subtitle
↓
Admin memilih mood
↓
Admin memilih style tampilan
↓
Admin menulis content surat
↓
Admin dapat memilih/upload photo pendukung
↓
Admin memilih status active
↓
Admin klik Save
↓
Sistem menyimpan data ke table love_letters
↓
Surat baru muncul di daftar love letter
↓
Jika active, surat dapat muncul di Love Letter Generator Ines
20.5 Flow Edit Love Letter
Admin klik Edit pada salah satu love letter
↓
Website menampilkan data lama di form
↓
Admin mengubah title/subtitle/mood/style/content/photo/is_active
↓
Admin klik Save
↓
Sistem update data di table love_letters
↓
Perubahan muncul di website Ines
20.6 Flow Nonaktifkan Love Letter
Admin membuka daftar love letter
↓
Admin toggle is_active menjadi false
↓
Sistem update data di Supabase
↓
Surat tidak lagi muncul di Love Letter Generator Ines
20.7 State yang Dibutuhkan
- letters
- selectedLetter
- title
- subtitle
- mood
- style
- content
- photoUrl
- isActive
- isSaving
- errorMessage
21. Flow Admin Daily Messages Management
21.1 Tujuan

Admin Daily Messages digunakan untuk mengelola pesan harian yang muncul di website Ines.

21.2 Entry Point

Admin membuka:

/admin/daily-messages
21.3 Flow Melihat Daily Messages
Admin membuka /admin/daily-messages
↓
Sistem mengambil data daily_messages dari Supabase
↓
Website menampilkan daftar daily message
↓
Setiap pesan menampilkan:
    - message preview
    - tone
    - is_active
    - updated_at
21.4 Flow Tambah Daily Message
Admin klik Add Daily Message
↓
Website menampilkan form daily message
↓
Admin menulis message
↓
Admin memilih tone
↓
Admin memilih status active
↓
Admin klik Save
↓
Sistem menyimpan data ke table daily_messages
↓
Daily message baru muncul di daftar
↓
Jika active, pesan dapat dipilih oleh sistem daily message Ines
21.5 Flow Edit Daily Message
Admin klik Edit pada salah satu daily message
↓
Website menampilkan data lama di form
↓
Admin mengubah message/tone/is_active
↓
Admin klik Save
↓
Sistem update data di table daily_messages
↓
Perubahan berlaku di website Ines
21.6 Flow Nonaktifkan Daily Message
Admin membuka daftar daily message
↓
Admin toggle is_active menjadi false
↓
Sistem update data di Supabase
↓
Pesan tidak lagi dipilih sebagai daily message Ines
21.7 State yang Dibutuhkan
- dailyMessages
- selectedMessage
- message
- tone
- isActive
- isSaving
- errorMessage
22. Mobile User Flow

Karena kemungkinan besar Ines membuka website dari HP, flow mobile harus dibuat sederhana.

22.1 Mobile Navigation Ines

Di mobile, navigasi dapat berbentuk:

Bottom navigation atau floating menu

Menu utama Ines:

Home
Gallery
Daily
Letters
Saved
22.2 Mobile Flow Ines
Ines membuka website dari HP
↓
Unlock / Login Code Screen tampil full screen
↓
Ines memasukkan kode 230624
↓
Home tampil dengan scrapbook layout vertical
↓
Ines scroll
↓
Ines memilih fitur dari card navigasi atau bottom nav
↓
Ines membaca surat atau melihat foto
↓
Ines dapat kembali menggunakan bottom nav
22.3 Mobile Navigation Admin

Admin panel di mobile tetap bisa digunakan, tetapi prioritas utama admin adalah nyaman di laptop.

Menu admin:

Dashboard
Replies
Photos
Music
Letters
Daily Messages
22.4 Prioritas Mobile
Tombol harus mudah diklik.
Textarea balasan harus nyaman digunakan.
Foto tidak boleh terlalu besar.
Musik control harus mudah ditemukan.
Animasi tidak boleh mengganggu scroll.
Form admin tetap dapat digunakan, tetapi boleh lebih optimal di laptop.
23. Error Flow
23.1 Secret Code Salah
User memasukkan kode salah
↓
Sistem menampilkan pesan:
“Hmm, not that one, sayang. Try again with your heart.”
↓
Input tetap aktif
23.2 Role Tidak Sesuai
Ines mencoba membuka /admin
↓
Sistem mengecek role
↓
Role = ines
↓
Sistem redirect ke /home
Admin mencoba membuka /home
↓
Sistem mengecek role
↓
Role = admin
↓
Sistem redirect ke /admin
23.3 Balasan Kosong
Ines klik Send tanpa menulis balasan
↓
Sistem menampilkan pesan:
“Tulis sedikit dulu ya, Nes.”
23.4 Gagal Simpan Balasan
Ines mengirim balasan
↓
Supabase gagal menyimpan data
↓
Sistem menampilkan pesan:
“Maaf sayang, balasannya belum berhasil disimpan. Coba lagi ya.”
23.5 Foto Gagal Dimuat
Foto tidak berhasil dimuat
↓
Sistem menampilkan placeholder scrapbook
↓
Caption tetap ditampilkan jika ada
23.6 Musik Tidak Bisa Diputar
Ines klik play music
↓
Browser menolak pemutaran audio
↓
Sistem menampilkan pesan:
“Tap once more to play our little song.”
23.7 Admin Gagal Upload Foto
Admin upload foto
↓
Upload ke Supabase Storage gagal
↓
Sistem menampilkan pesan:
“Foto belum berhasil diupload. Coba lagi ya.”
23.8 Admin Gagal Upload Musik
Admin upload lagu
↓
Upload ke Supabase Storage gagal
↓
Sistem menampilkan pesan:
“Lagu belum berhasil diupload. Coba lagi.”
23.9 Admin Gagal Update Konten
Admin menyimpan perubahan konten
↓
Update Supabase gagal
↓
Sistem menampilkan pesan:
“Perubahan belum berhasil disimpan. Coba lagi.”
24. Mermaid User Flow Diagram
24.1 Main Role Login Flow
flowchart TD
    A[User opens website] --> B{Already unlocked?}
    B -- No --> C[Unlock / Login Code Screen]
    C --> D[Enter code]
    D --> E{Code type?}

    E -- Wrong code --> F[Show sweet error message]
    F --> C

    E -- Ines code 230624 --> G[Save role ines]
    G --> H[Redirect to /home]

    E -- Admin code --> I[Save role admin]
    I --> J[Redirect to /admin]

    B -- Yes --> K{Stored role?}
    K -- ines --> H
    K -- admin --> J
24.2 Ines Main Flow
flowchart TD
    A[Ines Login] --> B[Home / Scrapbook Welcome]

    B --> C[Gallery]
    B --> D[Daily Message]
    B --> E[Love Letter Generator]
    B --> F[Saved / History]
    B --> G[Music Control]

    C --> C1[Open photo modal]
    C1 --> C

    D --> D1[Read daily message]
    D1 --> D2[Write text reply]
    D2 --> D3[Save reply to Supabase]
    D1 --> D4[Save favorite]

    E --> E1[Choose mood]
    E1 --> E2[Show matching love letter]
    E2 --> E3[Write text reply]
    E3 --> E4[Save reply to Supabase]
    E2 --> E5[Save favorite]
    E2 --> E6[Save to history]

    F --> F1[Open favorite item]
    F --> F2[Open history item]

    G --> G1[Play or pause active music]
24.3 Love Letter Generator Flow
flowchart TD
    A[Open Love Letter Generator] --> B[Show Mood Selector]
    B --> C{Choose Mood}

    C --> D[Kangen]
    C --> E[Sedih]
    C --> F[Capek / Butuh Semangat]
    C --> G[Marah / Kesal]
    C --> H[Random Romantis]

    D --> I[Pick random kangen letter]
    E --> J[Pick random sedih letter]
    F --> K[Pick random support letter]
    G --> L[Pick random marah/kesal letter]
    H --> M[Pick random romantic letter]

    I --> N[Show Typewriter Letter]
    J --> O[Show Soft Fade Letter]
    K --> P[Show Sticky Note Letter]
    L --> Q[Show Envelope Letter]
    M --> R[Show Glow Romantic Card]

    N --> S[Reply Textarea]
    O --> S
    P --> S
    Q --> S
    R --> S

    S --> T{Reply filled?}
    T -- No --> U[Show validation message]
    T -- Yes --> V[Save reply to Supabase]
    V --> W[Show success message]

    N --> X[Favorite Letter]
    O --> X
    P --> X
    Q --> X
    R --> X
24.4 Admin Main Flow
flowchart TD
    A[Admin Login] --> B[Admin Dashboard]

    B --> C[Admin Replies]
    B --> D[Admin Photos]
    B --> E[Admin Music]
    B --> F[Admin Love Letters]
    B --> G[Admin Daily Messages]

    C --> C1[Read replies from Ines]

    D --> D1[View photos]
    D --> D2[Upload photo]
    D --> D3[Edit photo metadata]
    D --> D4[Delete photo]

    E --> E1[View music tracks]
    E --> E2[Upload music]
    E --> E3[Set active music]
    E --> E4[Delete music]

    F --> F1[View love letters]
    F --> F2[Add love letter]
    F --> F3[Edit love letter]
    F --> F4[Deactivate love letter]

    G --> G1[View daily messages]
    G --> G2[Add daily message]
    G --> G3[Edit daily message]
    G --> G4[Deactivate daily message]
24.5 Admin Music Flow
flowchart TD
    A[Open Admin Music] --> B[Load music tracks]
    B --> C[Show music list]

    C --> D[Upload new music]
    D --> E[Save audio to Supabase Storage]
    E --> F[Save metadata to music_tracks]

    C --> G[Set active music]
    G --> H[Set all tracks inactive]
    H --> I[Set selected track active]

    C --> J[Delete music]
    J --> K[Confirm delete]
    K --> L[Delete metadata and optional file]
24.6 Admin Photos Flow
flowchart TD
    A[Open Admin Photos] --> B[Load gallery photos]
    B --> C[Show photo list]

    C --> D[Upload new photo]
    D --> E[Save photo to Supabase Storage]
    E --> F[Save metadata to gallery_photos]

    C --> G[Edit photo]
    G --> H[Update caption/category/featured/active]

    C --> I[Delete photo]
    I --> J[Confirm delete]
    J --> K[Delete metadata and optional file]
25. Ringkasan Navigasi
25.1 Navigasi untuk Ines
Unlock
↓
Home
├── Gallery
├── Daily Message
├── Love Letter Generator
└── Saved / History
25.2 Navigasi untuk Admin / Moses
Unlock
↓
Admin Dashboard
├── Replies
├── Photos
├── Music
├── Love Letters
└── Daily Messages
26. Catatan Implementasi

Untuk implementasi awal, flow yang paling penting adalah:

Unlock Role Login → Home Ines → Love Letter Generator → Reply Text → Admin Replies

Setelah flow inti ini stabil, fitur lain dapat ditambahkan:

Gallery → Daily Message → Music Control → Saved/History → Admin Photos → Admin Music

Urutan pengembangan yang disarankan:

1. Login role Ines/Admin
2. Route guard berdasarkan role
3. Home Ines
4. Love Letter Generator
5. Reply Text ke Supabase
6. Admin Replies
7. Gallery
8. Music Control
9. Admin Music
10. Admin Photos
11. Admin Love Letters
12. Admin Daily Messages

Prioritas mobile harus tinggi untuk halaman Ines karena website ini kemungkinan paling sering dibuka dari HP.

Untuk admin, prioritas utama adalah fungsional dan rapi. Admin panel boleh lebih optimal di laptop.