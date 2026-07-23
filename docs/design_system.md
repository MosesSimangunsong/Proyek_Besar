# Design System Website Personal untuk Ines

## 1. Tujuan Design System

Design System ini dibuat untuk menjaga agar seluruh tampilan website konsisten, romantis, interaktif, dan tetap terasa personal.

Website ini memiliki dua area utama:

1. **Area Ines**
   - Area utama yang digunakan oleh Ines.
   - Berisi scrapbook welcome, gallery, daily message, love letter generator, saved/history, dan background music.
   - Visual utama: **Scrapbook 60% + Romantic Elegant 40%**.

2. **Area Admin / Moses**
   - Area khusus untuk Moses sebagai admin.
   - Berisi admin dashboard, replies, photos management, music management, love letters management, dan daily messages management.
   - Visual utama: **Clean Private Admin + Romantic Minimal Accent**.

Design system ini harus menjaga agar website terasa seperti hadiah personal, bukan template AI, dashboard generik, atau kumpulan komponen UI yang asal ditempel.

Website harus terasa seperti:

> “A private digital scrapbook made with love, with a small hidden studio for Moses to keep it alive.”

---

## 2. Design Personality

## 2.1 Personality untuk Area Ines

Karakter visual area Ines:

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
Emotional
Scrapbook

Area Ines harus terasa seperti:

“A private digital scrapbook made with love.”

Bukan seperti:

“Modern SaaS landing page.”
“Dashboard aplikasi.”
“Template Valentine generik.”
“Website AI yang terlalu sempurna tapi tidak personal.”

2.2 Personality untuk Area Admin / Moses

Karakter visual area Admin:

Private
Clean
Calm
Organized
Minimal
Functional
Warm
Focused
Soft admin interface
Not too decorative

Area Admin harus terasa seperti:

“A private control room for Moses to take care of the website.”

Bukan seperti:

“Dashboard perusahaan yang kaku.”
“Admin panel terlalu teknis.”
“CMS yang dingin dan tidak personal.”
“Tampilan admin yang terlalu ramai dengan dekorasi scrapbook.”

3. Visual Direction
3.1 Konsep Utama Area Ines

Area Ines menggunakan visual seperti scrapbook romantis:

Foto polaroid
Potongan kertas
Tekstur kertas
Washi tape
Sticky note
Tulisan tangan
Stamp kecil
Paperclip
Soft shadow
Layered cards
Foto miring sedikit
Background lembut
Animasi pelan dan halus
Envelope
Paper note
Floating decoration

Namun, agar tetap elegan, elemen scrapbook tidak boleh terlalu ramai. Scrapbook digunakan sebagai aksen utama, sedangkan layout tetap bersih dan nyaman dibaca.

3.2 Konsep Utama Area Admin

Area Admin menggunakan visual yang lebih clean dan terstruktur.

Admin tetap memakai warna dan nuansa yang sama dengan website Ines, tetapi scrapbook element dikurangi.

Admin area menggunakan:

Paper card
Soft border
Clean table/list
Simple form
Rounded input
Gentle hover
Minimal icon
Warm background
Subtle shadow
Clear hierarchy
Small romantic accent

Admin area tidak perlu banyak polaroid, tape, doodle, atau dekorasi berlapis. Fokusnya adalah agar Moses mudah mengelola konten.

3.3 Komposisi Visual
Area Ines

Rasio desain:

60% scrapbook
40% romantic elegant

Contoh:

Home page: scrapbook sangat terasa melalui foto, notes, tape, dan collage.
Love letter page: lebih elegan agar teks surat nyaman dibaca.
Gallery: scrapbook dominan dengan polaroid layout.
Daily message: note kecil yang manis dan lembut.
Saved/history: simple tapi tetap warm.
Unlock page: elegan, lembut, dan misterius.
Area Admin

Rasio desain:

75% clean functional admin
25% romantic minimal accent

Contoh:

Admin Dashboard: clean cards, statistik ringkas, shortcut jelas.
Admin Replies: list balasan yang nyaman dibaca.
Admin Photos: grid/list foto dengan action button.
Admin Music: list track dengan audio preview dan active badge.
Admin Letters: table/list surat dengan status mood dan style.
Admin Daily Messages: list pesan dengan tone dan status active.
4. Color Palette
4.1 Primary Colors

Warna utama website:

Ivory White
Cream
Warm Beige
Dusty Rose
Deep Brown
Champagne Gold
Soft Charcoal
Paper White
Muted Brown
4.2 Suggested Color Tokens
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
}
4.3 Background Colors

Gunakan background yang lembut dan hangat:

Main background: Ivory / Cream
Section background: Paper white / Warm beige
Card background: Paper white
Dark romantic background: Soft charcoal / deep brown gradient
Admin background: Soft cream / warm ivory
Admin surface: Paper white

Contoh:

--background-main: #FFF8EF;
--background-paper: #FFFDF8;
--background-soft: #F7EAD8;
--background-dark: #2F2926;
--background-admin: #FBF4EA;
4.4 Accent Colors

Accent digunakan untuk tombol, highlight, link, status, dan elemen kecil.

Dusty Rose: elemen romantis
Champagne Gold: elemen spesial/premium
Deep Brown: teks utama
Soft Rose: hover atau dekorasi
Success Green: status active/success
Warning Gold: status warning
Soft Red: error/delete
4.5 Color Usage Rules

Gunakan warna dengan aturan berikut:

Background utama harus tetap terang, hangat, dan lembut.
Teks panjang harus menggunakan deep brown atau soft charcoal agar mudah dibaca.
Dusty rose tidak boleh terlalu dominan.
Gold digunakan secukupnya untuk highlight, bukan warna utama.
Admin area boleh lebih netral dan clean.
Tombol delete/admin danger harus jelas tetapi tidak neon.
Jangan menggunakan pink neon.
Jangan menggunakan warna terlalu kontras seperti merah terang, biru elektrik, atau ungu neon.
Warna harus mendukung rasa nostalgia dan romantis.
5. Typography
5.1 Font Personality

Tipografi harus menggabungkan tiga rasa:

Elegant
Readable
Handmade
5.2 Font Categories

Gunakan tiga jenis font:

Elegant Serif Font
Untuk heading besar.
Memberikan kesan romantis dan premium.
Cocok untuk area Ines.
Clean Sans-serif Font
Untuk body text.
Untuk admin table/form.
Agar isi surat, caption, form, dan navigasi mudah dibaca.
Handwritten / Script Font
Untuk aksen kecil.
Digunakan pada note, caption singkat, label, atau dekorasi.
Jangan digunakan untuk teks panjang.
Jangan digunakan terlalu banyak di admin area.
5.3 Suggested Font Pairing

Opsi 1:

Heading: Playfair Display
Body: Inter
Accent: Caveat

Opsi 2:

Heading: Cormorant Garamond
Body: Plus Jakarta Sans
Accent: Patrick Hand

Opsi 3:

Heading: Lora
Body: Nunito Sans
Accent: Kalam

Rekomendasi utama:

Heading: Playfair Display
Body: Plus Jakarta Sans
Accent: Caveat

Alasannya:

Playfair Display memberi rasa romantis elegan.
Plus Jakarta Sans tetap modern dan nyaman dibaca.
Caveat memberi rasa tulisan tangan scrapbook.
5.4 Font Usage Rules
Heading besar area Ines: serif
Heading admin: serif kecil atau sans-serif bold
Body text: sans-serif
Love letter content: sans-serif atau serif lembut
Small note: handwritten font
Button text: sans-serif
Caption foto: handwritten atau sans-serif kecil
Admin table/form: sans-serif
Admin badge/status: sans-serif
5.5 Type Scale
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
5.6 Heading Style

Heading utama:

.heading-hero {
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-deep-brown);
}

Heading section:

.heading-section {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.1;
  color: var(--color-deep-brown);
}

Admin heading:

.heading-admin {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.2;
  font-weight: 700;
  color: var(--color-deep-brown);
}

Body text:

.body-text {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-muted-brown);
}

Handwritten note:

.handwritten {
  font-family: "Caveat", cursive;
  font-size: 1.35rem;
  line-height: 1.4;
  color: var(--color-deep-brown);
}
6. Layout System
6.1 General Layout Area Ines

Website harus mobile-first. Prioritas utama adalah tampilan HP.

Mobile: single-column vertical flow
Tablet: 2-column layout jika diperlukan
Desktop: centered content dengan scrapbook collage di sekitar
6.2 General Layout Area Admin

Admin area harus tetap rapi dan mudah digunakan.

Mobile: stacked cards and forms
Tablet: 2-column layout untuk dashboard card
Desktop: sidebar/topbar + content area

Admin layout disarankan:

AdminLayout
├── AdminTopBar
├── AdminSidebar / AdminMobileMenu
└── AdminContent

Untuk MVP, admin dapat menggunakan top navigation sederhana terlebih dahulu.

6.3 Max Width
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1180px;
--container-admin: 1280px;

Aturan:

Konten surat maksimal 720px agar nyaman dibaca.
Gallery boleh lebih lebar.
Home boleh menggunakan layout lebih bebas.
Admin page boleh lebih lebar karena butuh table/list.
Admin form maksimal 760px agar tetap nyaman.
6.4 Spacing Scale
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.25rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-10: 2.5rem;
--space-12: 3rem;
--space-16: 4rem;
--space-20: 5rem;
6.5 Section Spacing
Mobile section padding: 24px 20px
Tablet section padding: 48px 32px
Desktop section padding: 72px 48px
Admin mobile padding: 20px
Admin desktop padding: 32px
6.6 Layout Rules Area Ines

Setiap halaman Ines harus punya:

1. Clear emotional focus
2. Enough whitespace
3. One main action
4. Soft visual decoration
5. No dashboard-like grid overload
6.7 Layout Rules Area Admin

Setiap halaman Admin harus punya:

1. Clear page title
2. Clear primary action
3. Simple data list/table
4. Easy edit/delete/upload actions
5. Minimal decoration
6. No unnecessary animation
7. Clear loading and error states
7. Border Radius and Shape
7.1 Radius Tokens
--radius-sm: 8px;
--radius-md: 14px;
--radius-lg: 22px;
--radius-xl: 32px;
--radius-full: 999px;
7.2 Usage
Button: radius-full atau radius-md
Card: radius-lg
Paper note: radius-sm
Polaroid: radius-sm
Modal: radius-xl
Input: radius-md
Admin card: radius-lg
Admin table/list: radius-md
Admin badge: radius-full
7.3 Shape Personality

Bentuk tidak boleh terlalu tajam. Gunakan sudut rounded lembut agar terasa romantis dan hangat.

Untuk Admin, bentuk tetap rounded tetapi lebih sederhana.

8. Shadow and Depth
8.1 Shadow Tokens
--shadow-soft: 0 10px 30px rgba(74, 47, 37, 0.08);
--shadow-paper: 0 8px 18px rgba(74, 47, 37, 0.10);
--shadow-floating: 0 18px 50px rgba(74, 47, 37, 0.16);
--shadow-glow: 0 0 30px rgba(214, 181, 109, 0.22);
--shadow-admin: 0 10px 24px rgba(74, 47, 37, 0.06);
8.2 Shadow Usage
Soft card: shadow-soft
Polaroid: shadow-paper
Main love letter card: shadow-floating
Special romantic card: shadow-glow
Admin card: shadow-admin
Admin modal: shadow-floating

Shadow harus halus. Jangan gunakan shadow gelap yang terlalu keras.

9. Texture and Decorative Elements
9.1 Paper Texture

Gunakan paper texture ringan untuk:

Background surat
Card daily message
Sticky note
Scrapbook section
Gallery polaroid
Unlock card

Texture harus subtle. Jangan sampai mengganggu keterbacaan teks.

9.2 Scrapbook Decorative Elements

Elemen yang boleh digunakan:

Washi tape
Paperclip
Pin
Stamp
Doodle heart kecil
Small stars
Torn paper edge
Polaroid frame
Handwritten labels
Pressed flower illustration
Envelope illustration
9.3 Decorative Rules Area Ines
Maksimal 2–4 dekorasi kecil dalam satu section.
Jangan menaruh dekorasi di atas teks utama.
Dekorasi harus mendukung cerita.
Dekorasi boleh sedikit tidak simetris agar terasa handmade.
Jangan terlalu banyak sticker sehingga terlihat childish.
9.4 Decorative Rules Area Admin
Admin area tidak perlu banyak dekorasi scrapbook.
Maksimal satu aksen kecil per halaman.
Gunakan decorative element hanya untuk header atau empty state.
Jangan menaruh tape, stamp, atau polaroid pada form admin utama.
Fokus admin adalah keterbacaan dan efisiensi.
10. Component Design
10.1 Button
Primary Button

Digunakan untuk aksi utama:

Unlock
Open Letter
Send Reply
Play Music
Admin Save
Admin Upload
Set Active Music

Style:

.button-primary {
  border-radius: 999px;
  background: var(--color-deep-brown);
  color: var(--color-ivory);
  padding: 0.85rem 1.4rem;
  font-weight: 600;
  box-shadow: var(--shadow-soft);
  transition: all 0.25s ease;
}

Hover:

.button-primary:hover {
  transform: translateY(-2px);
  background: #3b241c;
}
Secondary Button

Digunakan untuk aksi kedua:

Back to moods
Another letter
View gallery
Cancel edit
Back to dashboard

Style:

.button-secondary {
  border-radius: 999px;
  background: rgba(255, 253, 248, 0.7);
  color: var(--color-deep-brown);
  border: 1px solid rgba(74, 47, 37, 0.14);
  padding: 0.85rem 1.4rem;
}
Romantic Accent Button

Digunakan untuk aksi spesial:

Save favorite
Open surprise
Read today’s message
.button-accent {
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-dusty-rose), var(--color-champagne-gold));
  color: white;
  padding: 0.85rem 1.4rem;
  box-shadow: var(--shadow-glow);
}
Admin Danger Button

Digunakan untuk:

Delete photo
Delete music
Delete love letter
Delete daily message
.button-danger {
  border-radius: 999px;
  background: rgba(184, 92, 92, 0.12);
  color: var(--color-danger);
  border: 1px solid rgba(184, 92, 92, 0.24);
  padding: 0.75rem 1.2rem;
  font-weight: 600;
}
Button Rules
Tidak boleh terlalu banyak jenis tombol di satu halaman.
Satu halaman idealnya punya satu primary action.
Button text harus personal untuk area Ines.
Button text harus jelas dan fungsional untuk area Admin.
Danger button harus terlihat jelas tetapi tidak agresif.

Contoh button text untuk Ines:

Unlock our little place
Open this letter
Read another one
Send your little reply
Save this feeling
Back to moods
Play our little song

Contoh button text untuk Admin:

Save Changes
Upload Photo
Upload Music
Set Active
Edit
Delete
Cancel
Back to Dashboard
10.2 Input

Input digunakan untuk:

Secret code
Admin code
Reply text
Admin form title
Admin form caption
Admin form message
Admin upload metadata
Admin search/filter
Secret Code Input

Style:

Elegant
Centered
Soft border
Large enough for mobile
Private feeling

Contoh placeholder:

Enter our special date
Admin Code Input

Style:

Simple
Private
Clean
Centered
Soft border

Contoh placeholder:

Enter admin code
Textarea Reply

Textarea harus terasa seperti menulis catatan kecil.

Style:

.reply-textarea {
  width: 100%;
  min-height: 140px;
  border-radius: var(--radius-lg);
  border: 1px solid rgba(74, 47, 37, 0.14);
  background: var(--color-paper);
  color: var(--color-deep-brown);
  padding: 1rem;
  line-height: 1.7;
  box-shadow: var(--shadow-soft);
}

Placeholder:

Write a little reply for me...

Validation message:

Tulis sedikit dulu ya, Nes.
Admin Text Input
.admin-input {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-admin-border);
  background: var(--color-admin-surface);
  color: var(--color-deep-brown);
  padding: 0.85rem 1rem;
  font-family: "Plus Jakarta Sans", sans-serif;
}
Admin Textarea
.admin-textarea {
  width: 100%;
  min-height: 160px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-admin-border);
  background: var(--color-admin-surface);
  color: var(--color-deep-brown);
  padding: 1rem;
  line-height: 1.7;
  font-family: "Plus Jakarta Sans", sans-serif;
}
10.3 Card
Base Card
.card {
  background: var(--color-paper);
  border: 1px solid rgba(74, 47, 37, 0.08);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
  padding: 1.25rem;
}
Scrapbook Card

Digunakan untuk:

Gallery photo
Mood card
Daily message
Small note

Ciri-ciri:

Slight rotation
Paper texture
Tape decoration
Soft shadow
Handwritten caption

Contoh:

.scrapbook-card {
  background: var(--color-paper);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-paper);
  transform: rotate(-1deg);
  padding: 0.75rem;
}
Romantic Card

Digunakan untuk:

Love letter
Daily message detail
Secret code container

Ciri-ciri:

More elegant
Less rotated
More whitespace
Subtle glow
Readable text
Admin Card

Digunakan untuk:

Admin dashboard stat
Reply card
Photo item
Music item
Form container
Table wrapper

Ciri-ciri:

Clean
Readable
No rotation
Soft border
Soft shadow
Clear action area

Contoh:

.admin-card {
  background: var(--color-admin-surface);
  border: 1px solid var(--color-admin-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-admin);
  padding: 1.25rem;
}
10.4 Polaroid Photo

Polaroid digunakan untuk galeri dan dekorasi di area Ines.

Struktur:

Photo
Caption
Date/moment label

Style:

.polaroid {
  background: #fff;
  padding: 0.75rem 0.75rem 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow-paper);
  transform: rotate(var(--rotate, -2deg));
}

Caption:

.polaroid-caption {
  font-family: "Caveat", cursive;
  font-size: 1.2rem;
  color: var(--color-deep-brown);
  text-align: center;
}

Interaction:

Hover desktop: slightly lift and rotate to 0deg
Tap mobile: open detail modal

Admin area boleh menampilkan preview foto, tetapi tidak perlu style polaroid pada seluruh item admin.

10.5 Mood Card

Mood card digunakan di Love Letter Generator.

Mood awal:

Kangen
Sedih
Capek / Butuh Semangat
Marah / Kesal
Random Romantis
Mood Card Style

Setiap mood memiliki karakter visual:

Kangen
Color: warm beige + dusty rose
Decoration: polaroid, small heart, paper note
Animation: typewriter preview
Feeling: warm and longing
Sedih
Color: muted blue-gray mixed with ivory
Decoration: soft paper, small flower, gentle fade
Animation: slow fade in
Feeling: calm and comforting
Capek / Butuh Semangat
Color: cream + champagne gold
Decoration: sticky note, checklist, small sun doodle
Animation: gentle bounce or paper slide
Feeling: supportive and safe
Marah / Kesal
Color: deep rose + brown
Decoration: envelope, folded paper
Animation: envelope open
Feeling: gentle, apologetic, patient
Random Romantis
Color: ivory + gold glow
Decoration: collage, sparkle, pressed flower
Animation: glow reveal
Feeling: sweet surprise
Mood Card Copy

Gunakan copy yang lembut:

Aku lagi kangen
Aku lagi sedih
Aku capek hari ini
Aku lagi kesal
Surprise me with love
10.6 Love Letter Component

Love letter adalah komponen paling penting. Harus nyaman dibaca dan terasa emosional.

Base Layout
Mood label
Title
Subtitle
Decorative photo/note
Letter content
Actions
Reply textarea
Example Structure
[ Mood: Kangen ]

Kalau kamu lagi kangen aku
Read this slowly, sayang.

Isi surat...

[Save this letter] [Another letter]
[Textarea reply]
[Send your little reply]
Letter Rules
Teks tidak boleh terlalu rapat.
Gunakan line-height besar.
Maksimal lebar 720px.
Background harus seperti kertas.
Dekorasi tidak boleh mengganggu teks.
Animasi harus membantu rasa emosional.
10.7 Admin List / Table Component

Admin list digunakan untuk data:

Replies
Photos
Music
Love letters
Daily messages
Style
Clean card wrapper
Row separation
Small badges
Action buttons on right
Responsive stacked layout on mobile
Row Content Example
Title / Main text
Meta information
Status badge
Action buttons
Rules
Jangan gunakan table yang terlalu kecil di mobile.
Di mobile, gunakan card list.
Di desktop, boleh gunakan table.
Action utama harus jelas.
Delete action harus butuh konfirmasi.
10.8 Status Badge

Status badge digunakan di admin area.

Jenis badge:

Active
Inactive
Featured
Draft
Music Active
Mood
Tone

Style:

.badge {
  border-radius: var(--radius-full);
  padding: 0.3rem 0.65rem;
  font-size: var(--text-xs);
  font-weight: 600;
}

Warna:

Active: soft green
Inactive: muted brown/gray
Featured: champagne gold
Danger/Delete: soft red
Mood: dusty rose/cream
10.9 Upload Field

Upload field digunakan di admin area untuk foto dan musik.

Style:

Dashed border
Paper background
Upload icon
Short helper text
Clear file name after selection

Copy:

Upload photo
Choose a memory photo
Upload music
Choose our little song

Rules:

Tampilkan format file yang didukung.
Tampilkan batas ukuran file jika ada.
Tampilkan loading state saat upload.
Tampilkan error jika upload gagal.
11. Love Letter Visual Variants
11.1 Typewriter Letter

Untuk mood:

Kangen

Visual:

Paper card
Polaroid kecil
Text appears slowly
Warm tone

Interaction:

Teks muncul perlahan.
Setelah selesai, tombol reply muncul.
11.2 Soft Fade Letter

Untuk mood:

Sedih

Visual:

Soft card
Subtle flower/stamp
Low contrast background
Fade-in paragraphs

Interaction:

Paragraf muncul satu per satu.
Tidak ada animasi cepat.
11.3 Sticky Note Letter

Untuk mood:

Capek / Butuh Semangat

Visual:

Sticky note
Checklist kecil
Tape corner
Warm sunlight accent

Interaction:

Note slide dari samping.
Checklist support muncul pelan.
11.4 Envelope Letter

Untuk mood:

Marah / Kesal

Visual:

Envelope graphic
Folded paper
Deep rose accent
Soft apology tone

Interaction:

Amplop terbuka.
Surat keluar.
Teks muncul setelah animasi selesai.
11.5 Glow Romantic Card

Untuk mood:

Random Romantis

Visual:

Elegant card
Subtle gold glow
Scrapbook photo corner
Sparkle kecil

Interaction:

Card muncul dengan glow lembut.
Dekorasi muncul setelah teks.
12. Gallery Design
12.1 Gallery Personality

Gallery harus terasa seperti meja penuh foto kenangan, bukan grid galeri biasa.

12.2 Layout

Mobile:

Single-column polaroid cards
Some cards slightly rotated
Caption below image

Desktop:

Masonry/collage layout
Cards have different rotations
Some featured photos larger
12.3 Photo Detail Modal

Saat foto diklik:

Background blur
Foto besar
Caption
Moment/date
Close button

Modal harus terasa seperti membuka halaman album.

12.4 Gallery Rules
Jangan semua foto dibuat ukuran sama.
Beberapa foto boleh menjadi featured.
Caption harus personal.
Layout boleh sedikit tidak simetris.
Tetap jaga jarak agar tidak berantakan.
13. Daily Message Design
13.1 Visual Style

Daily Message harus terasa seperti note kecil yang ditemukan hari ini.

Style:

Paper card
Date label
Short message
Small decoration
Favorite button
Reply textarea
13.2 Copy

Contoh title:

Today’s little note
A small reminder for you
For today, sayang
13.3 Interaction
Pesan muncul dengan fade.
Favorite button memiliki micro animation.
Reply textarea muncul setelah tombol “Reply to this” diklik.
14. Unlock / Login Code Screen Design
14.1 Visual Goal

Unlock screen harus terasa private, lembut, dan sedikit misterius.

Karena login sekarang memiliki 2 role, halaman ini harus tetap terasa romantis untuk Ines, tetapi juga dapat menerima admin code untuk Moses tanpa membuat UI terasa seperti form login biasa.

14.2 Layout
Full screen
Centered card
Soft background
Small scrapbook decoration
Input code
Unlock button
Subtle helper text
14.3 Background

Gunakan:

Cream gradient
Soft paper texture
Floating small photos blurred
Subtle vignette
14.4 Copy

Title:

This place is only for you

Subtitle:

Enter the date only we know.

Button:

Unlock our little place

Error:

Hmm, not that one, sayang. Try again with your heart.

Success untuk Ines:

Welcome home, Nes.

Success untuk Admin:

Welcome back, Moses.
15. Admin Area Design
15.1 Visual Goal

Admin area harus private, clean, dan rapi.

Admin area tidak perlu terlihat terlalu romantis, tetapi tetap memakai warna dan nuansa yang sama agar terasa menjadi bagian dari website.

15.2 Admin Layout

Struktur layout:

AdminLayout
├── AdminTopBar
├── AdminNavigation
└── AdminContent

Pada desktop:

Sidebar atau top navigation
Content area lebar
Cards/table/list

Pada mobile:

Topbar
Dropdown/floating admin menu
Stacked cards
15.3 Admin Dashboard Design

Admin Dashboard menampilkan:

Stat cards
Latest replies preview
Active music preview
Quick actions

Stat card:

Total Replies
Total Photos
Active Music
Total Letters
Total Daily Messages

Visual:

Clean card
Small icon
Number/value
Short description
15.4 Admin Replies Page Design

Visual goal:

Private
Clean
Readable
Warm
Minimal

Layout:

Page title
Filter/search optional
Reply list
Newest first

Reply card menampilkan:

Reply text
Source type
Mood
Date/time

Style:

Paper cards
Deep brown text
Soft border
Small timestamp
15.5 Admin Photos Page Design

Visual goal:

Organized photo management
Easy upload
Easy edit
Clear preview

Layout:

Page header
Upload/Add Photo button
Photo grid/list
Edit modal/form
Delete confirmation

Photo item menampilkan:

Photo preview
Title
Caption
Category
Featured badge
Active badge
Edit button
Delete button
15.6 Admin Music Page Design

Visual goal:

Simple music management
Clear active track
Easy upload

Layout:

Page header
Upload Music button
Active music card
Music list
Audio preview
Set active button
Delete button

Music item menampilkan:

Title
Artist/note
Audio preview
Active badge
Set Active button
Delete button
15.7 Admin Love Letters Page Design

Visual goal:

Easy content writing
Mood/status visible
Comfortable long text editing

Layout:

Page header
Add Letter button
Letter list
Letter form modal/page

Letter item menampilkan:

Title
Mood
Style
Active badge
Updated time
Edit button
Deactivate button

Letter form berisi:

Title
Subtitle
Mood select
Style select
Content textarea
Photo URL/upload
Active toggle
Save button
15.8 Admin Daily Messages Page Design

Visual goal:

Simple short message management
Quick editing
Tone visible

Layout:

Page header
Add Daily Message button
Message list
Message form modal/page

Daily message item menampilkan:

Message preview
Tone badge
Active badge
Updated time
Edit button
Deactivate button
16. Navigation Design
16.1 Desktop Navigation Area Ines

Desktop dapat menggunakan top navigation kecil:

Home
Gallery
Daily
Letters
Saved

Style:

Small text
Animated underline
Soft hover
No heavy navbar
16.2 Mobile Navigation Area Ines

Mobile lebih cocok menggunakan:

Bottom navigation
atau floating scrapbook menu

Menu:

Home
Gallery
Daily
Letters
Saved
16.3 Admin Navigation

Admin navigation menggunakan menu:

Dashboard
Replies
Photos
Music
Letters
Daily Messages

Style:

Clean
Compact
Clear active state
Small icons
No scrapbook rotation
No heavy animation
16.4 Navigation Rules
Navigasi Ines tidak boleh terasa seperti dashboard.
Navigasi Admin boleh lebih fungsional, tetapi tetap warm.
Gunakan label pendek.
Icon boleh digunakan, tapi jangan terlalu banyak.
Active state harus jelas tetapi lembut.
Route admin tidak boleh muncul di navigasi Ines.
Route Ines tidak perlu muncul di navigasi Admin, kecuali ada tombol preview.
17. Animation System
17.1 Animation Personality Area Ines

Animasi area Ines harus:

Soft
Slow enough
Emotional
Smooth
Meaningful
Not excessive
17.2 Animation Personality Area Admin

Animasi area Admin harus:

Fast enough
Subtle
Functional
No dramatic effects
No scrapbook floating overload

Admin animation hanya untuk:

Page fade
Button hover
Modal open
Toast
Loading state
17.3 Timing
--duration-fast: 180ms;
--duration-normal: 300ms;
--duration-slow: 600ms;
--duration-letter: 900ms;
17.4 Easing
--ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
--ease-romantic: cubic-bezier(0.16, 1, 0.3, 1);
17.5 Animation Types Area Ines

Gunakan animasi berikut:

Fade in
Slide up
Paper slide
Text reveal
Typewriter
Envelope open
Polaroid lift
Soft glow pulse
Floating decoration
Page transition
17.6 Animation Types Area Admin

Gunakan animasi berikut:

Fade in
Slide up slight
Modal scale/fade
Toast slide
Button hover
Loading shimmer
17.7 Animation Rules
Jangan gunakan animasi terlalu cepat di area Ines.
Jangan semua elemen bergerak bersamaan.
Animasi utama hanya satu per section.
Dekorasi boleh floating sangat pelan di area Ines.
Admin area tidak memakai animasi romantis berlebihan.
Hindari efek glitch, neon, atau cyberpunk.
Hindari bounce berlebihan.
Gunakan reduced motion support.
18. Microinteractions

Microinteraction adalah detail kecil yang membuat website terasa hidup.

18.1 Button Hover
Button naik 2px
Shadow sedikit bertambah
Warna sedikit lebih gelap/lembut
18.2 Polaroid Hover
Card sedikit lurus
Scale 1.02
Shadow naik
18.3 Favorite Click
Heart kecil scale up
Tampilkan text: “Saved for you, sayang.”
18.4 Reply Sent
Textarea clear
Toast muncul
Small heart animation
18.5 Unlock Success
Card glow lembut
Text: “Welcome home, Nes.”
Transition ke Home
18.6 Admin Save Success
Toast muncul
Button kembali normal
Data list refresh

Copy:

Changes saved.
Photo uploaded.
Music updated.
Letter saved.
Daily message saved.
18.7 Admin Delete Confirmation
Click delete
Confirmation modal muncul
Admin confirm
Item deleted
Toast muncul

Copy:

This action cannot be undone.
Delete this item?
19. Iconography
19.1 Icon Style

Icon harus:

Thin line
Rounded
Soft
Minimal

Icon tidak boleh terlalu solid atau kaku.

19.2 Icon Set

Boleh menggunakan:

Lucide React
Phosphor Icons

Rekomendasi:

Lucide React

Karena ringan, bersih, dan cocok untuk React.

19.3 Icon Usage Area Ines

Contoh icon:

Heart
Music
Lock
Image
BookOpen
PenLine
Sparkles
Mail
Star
Home
19.4 Icon Usage Area Admin

Contoh icon:

LayoutDashboard
MessagesSquare
Images
Music
BookOpen
NotebookPen
Upload
Edit
Trash
Save
Eye
EyeOff
CheckCircle
XCircle
20. Image Style
20.1 Photo Treatment Area Ines

Foto harus terasa seperti bagian dari scrapbook.

Gunakan:

Polaroid frame
Soft border
Paper shadow
Rounded small corners
Slight rotation
Caption handwritten
20.2 Image Rules
Compress gambar sebelum deploy.
Gunakan format .webp jika memungkinkan.
Jangan gunakan foto terlalu besar.
Foto penting bisa dibuat featured.
Foto untuk background harus diberi overlay agar teks tetap terbaca.
Foto dari Supabase Storage harus punya fallback jika gagal dimuat.
20.3 Background Image Overlay

Jika foto digunakan sebagai background:

background: linear-gradient(
  rgba(255, 248, 239, 0.82),
  rgba(255, 248, 239, 0.92)
), url("/images/background.jpg");
20.4 Image Treatment Area Admin

Admin image preview harus:

Square atau 4:3 ratio
Rounded corners
Object-fit cover
Clear preview
No heavy rotation

Admin image preview digunakan untuk:

Photo management
Letter photo management
Featured image selection
21. Music Control Design
21.1 Visual Style untuk Ines

Music control harus kecil, lembut, dan mudah ditemukan.

Posisi:

Bottom right floating button
atau bagian atas Home
21.2 States
Not playing: Play our little song
Playing: Pause music
Loading: Preparing our little song...
Error: Tap once more to play
21.3 Style
Round button
Glass/paper background
Music icon
Small label on desktop
Icon only on mobile
21.4 Admin Music UI

Admin music UI harus menampilkan:

Active track card
Audio preview
Upload music form
Set active button
Delete button

Status lagu aktif:

Active Song
Currently playing on Ines website
22. Toast and Feedback Message
22.1 Toast Style

Toast digunakan untuk:

Unlock success
Reply sent
Favorite saved
Error message
Music error
Admin save success
Admin upload success
Admin delete success
Admin upload error

Style:

Small card
Bottom center
Paper background
Soft shadow
Short message
22.2 Toast Copy untuk Ines
Saved for you, sayang.
I’ll keep this reply close to my heart.
Your little reply has been saved.
Hmm, not that one, sayang.
Tap once more to play our little song.
22.3 Toast Copy untuk Admin
Changes saved.
Photo uploaded.
Music uploaded.
Active song updated.
Letter saved.
Daily message saved.
Reply list refreshed.
Something went wrong. Please try again.
23. Empty State

Empty state harus tetap personal.

23.1 Favorites Empty
You haven’t saved anything yet, sayang.
Maybe one of my letters will become your favorite soon.
23.2 History Empty
No letters opened yet.
Pick a mood and let me write something for your heart.
23.3 Replies Empty for Admin
No replies yet.
Maybe Ines is still reading with a smile.
23.4 Photos Empty for Admin
No photos yet.
Upload the first memory for the gallery.
23.5 Music Empty for Admin
No music yet.
Upload a song to set the mood.
23.6 Love Letters Empty for Admin
No letters yet.
Write the first one for Ines.
23.7 Daily Messages Empty for Admin
No daily messages yet.
Create a small note for tomorrow.
24. Responsive Design
24.1 Mobile First Area Ines

Prioritas utama adalah mobile.

Aturan mobile:

One-column layout
Large tap targets
Readable text
No tiny buttons
Bottom/floating navigation
Images optimized
Textarea comfortable
24.2 Mobile Admin

Admin area harus tetap bisa digunakan di mobile, tetapi prioritas terbaik admin adalah laptop/desktop.

Aturan mobile admin:

Stacked cards
No wide table overflow
Action buttons wrap nicely
Upload field visible
Form labels clear
Save button sticky if needed
24.3 Tablet

Tablet boleh menggunakan:

Two-column cards
Larger photo collage
More spacing
Admin dashboard two-column cards
24.4 Desktop

Desktop boleh menggunakan:

Centered content
Decorative side photos
Wider scrapbook layout
Masonry gallery
More whitespace
Admin sidebar/topbar
Admin table/list
25. Accessibility

Walaupun website personal, tetap harus nyaman digunakan.

25.1 Text Contrast
Teks harus kontras dengan background.
Jangan menaruh teks langsung di atas foto tanpa overlay.
Body text harus cukup besar.
Admin table/list harus mudah dibaca.
25.2 Keyboard Accessibility
Input secret code bisa dikirim dengan Enter.
Admin code bisa dikirim dengan Enter.
Button bisa difokuskan.
Modal bisa ditutup dengan Escape.
Form admin bisa digunakan dengan keyboard.
25.3 Motion Preference

Jika user mengaktifkan reduced motion:

Kurangi animasi besar
Matikan floating effect berlebihan
Gunakan fade sederhana
Hindari typewriter terlalu panjang
25.4 Audio Control
Musik harus bisa dimatikan.
Jangan paksa autoplay.
Tombol play/pause harus jelas.
Admin audio preview harus bisa dipause.
25.5 Form Accessibility

Admin form harus memiliki:

Label jelas
Placeholder tidak menggantikan label utama
Error message jelas
Required field terlihat
Focus state terlihat
26. Suggested UI Libraries Usage
26.1 React Bits

Digunakan untuk:

Text animation
Carousel
Background ringan
Interactive cards

Cocok untuk:

Opening text
Mood selector
Home hero text
Letter reveal

Tidak wajib untuk admin.

26.2 Animate UI

Digunakan untuk:

Animated button
Cursor
Motion carousel
Small interactive components

Cocok untuk:

Unlock button
Mood carousel
Custom cursor
Page transition

Admin boleh memakai button atau modal animation ringan saja.

26.3 Uiverse

Digunakan untuk:

Input
Textarea
Small button
Loader
Card

Cocok untuk:

Secret code input
Reply textarea
Send reply button
Admin form input
Upload field
Small decorative button
26.4 Vengeance UI

Digunakan terbatas untuk:

Glow border card
Premium card effect
Hero/background detail

Cocok untuk:

Random romantic letter
Daily message card
Secret code card

Tidak disarankan untuk admin utama.

26.5 Skiper UI

Digunakan untuk:

Animated link
Theme toggle
Small unique effect

Cocok untuk:

Navigation link
Optional theme toggle
26.6 Library Usage Rule

Jangan menggunakan semua library secara berlebihan. Pilih komponen yang mendukung konsep emosional website.

Prioritas:

Custom CSS + Tailwind
Framer Motion
React Bits
Animate UI
Uiverse
Vengeance UI secukupnya
Skiper UI secukupnya

Admin area boleh memakai komponen lebih sederhana. Jangan membuat admin terlalu penuh animasi.

27. Page-by-Page Visual Standard
27.1 Unlock / Login Code Page

Visual:

Private
Elegant
Soft
Mysterious
Role-aware

Elemen:

Centered card
Secret/admin code input
Unlock button
Small floating photos
Soft gradient background
27.2 Home Page

Visual:

Scrapbook welcome
Warm
Personal
Emotional

Elemen:

Greeting
Photo collage
Daily message preview
Feature cards
Music control
27.3 Gallery Page

Visual:

Scrapbook dominant
Photo album
Playful but neat

Elemen:

Polaroid grid
Category filter
Photo modal
Handwritten captions
27.4 Daily Message Page

Visual:

Small note
Calm
Sweet

Elemen:

Paper card
Today label
Message
Favorite button
Reply textarea
27.5 Love Letter Page

Visual:

Emotional
Readable
Animated
Personal

Elemen:

Mood selector
Letter card
Mood-based style
Photo decoration
Reply textarea
Favorite button
27.6 Saved / History Page

Visual:

Saved memories
Simple
Warm

Elemen:

Tabs
Saved cards
History cards
Empty state
27.7 Admin Dashboard Page

Visual:

Private
Clean
Warm
Functional

Elemen:

Stat cards
Latest replies
Active music preview
Quick action cards
Admin navigation
27.8 Admin Replies Page

Visual:

Private
Clean
Minimal
Readable

Elemen:

Reply list
Timestamp
Source label
Mood badge
27.9 Admin Photos Page

Visual:

Organized
Visual but clean
Easy to manage

Elemen:

Photo preview cards
Upload form
Category badge
Featured badge
Active badge
Edit/Delete actions
27.10 Admin Music Page

Visual:

Calm
Functional
Clear active status

Elemen:

Active music card
Audio preview
Music list
Upload form
Set active button
27.11 Admin Love Letters Page

Visual:

Writing-focused
Clean
Comfortable

Elemen:

Letter list
Mood badge
Style badge
Editor form
Content textarea
Active toggle
27.12 Admin Daily Messages Page

Visual:

Simple
Short-form writing
Quick edit

Elemen:

Message list
Tone badge
Active badge
Message form
28. Do and Don’t
28.1 Do
Use warm colors
Use personal copywriting
Use subtle animations
Use scrapbook details in Ines area
Use readable typography
Use photos meaningfully
Keep mobile experience smooth
Make every Ines page feel handmade
Make admin pages clean and functional
Use clear form labels
Use clear loading states
Use confirmation for delete actions
28.2 Don’t
Do not make Ines area look like a dashboard
Do not make admin area too decorative
Do not overuse pink
Do not use too many animations at once
Do not use neon/cyberpunk effects
Do not use generic AI-style text
Do not make every card identical
Do not make scrapbook elements too messy
Do not hide important actions
Do not autoplay loud music
Do not make admin delete actions too easy without confirmation
Do not use wide tables that break mobile layout
29. Sample Visual Copy
29.1 Home
Hi, Nes.
I made this little place for us.

A small corner of the internet
where our memories can stay,
and where my words can find you
whenever your heart needs them.
29.2 Daily Message
Today’s little note

Jangan lupa makan ya, sayang.
I know you’re strong,
but you still deserve to be cared for.
29.3 Mood Selector
How’s your heart today?
Pick one, and I’ll leave a letter for you.
29.4 Reply Section
Want to write something back?
I’ll keep it close.
29.5 Gallery
Little pieces of us
Some memories are too sweet
to stay only in my phone.
29.6 Admin Dashboard
Welcome back, Moses.
Here’s what Ines left for you.
29.7 Admin Replies
Replies from Ines
Every little message she sent is kept here.
29.8 Admin Music
Set the song for this little place.
Choose what Ines will hear when she comes back.
29.9 Admin Photos
Manage memories
Add, edit, and choose the photos that make this place feel alive.
30. Design Tokens Summary
:root {
  /* Colors */
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

  /* Admin Colors */
  --color-admin-bg: #FBF4EA;
  --color-admin-surface: #FFFDF8;
  --color-admin-border: rgba(74, 47, 37, 0.12);
  --color-admin-muted: #8A6D5C;
  --color-success: #5F8A6B;
  --color-warning: #C89B4A;
  --color-danger: #B85C5C;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 22px;
  --radius-xl: 32px;
  --radius-full: 999px;

  /* Shadow */
  --shadow-soft: 0 10px 30px rgba(74, 47, 37, 0.08);
  --shadow-paper: 0 8px 18px rgba(74, 47, 37, 0.10);
  --shadow-floating: 0 18px 50px rgba(74, 47, 37, 0.16);
  --shadow-glow: 0 0 30px rgba(214, 181, 109, 0.22);
  --shadow-admin: 0 10px 24px rgba(74, 47, 37, 0.06);

  /* Timing */
  --duration-fast: 180ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-letter: 900ms;

  /* Easing */
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-romantic: cubic-bezier(0.16, 1, 0.3, 1);
}
31. Final Design Principle

Setiap keputusan desain untuk area Ines harus melewati pertanyaan ini:

Apakah ini membuat website terasa lebih personal untuk Ines?
Apakah ini mendukung suasana scrapbook romantis?
Apakah ini tetap nyaman dibaca dan digunakan?
Apakah ini terasa dibuat dengan hati, bukan sekadar template?

Setiap keputusan desain untuk area Admin harus melewati pertanyaan ini:

Apakah ini membantu Moses mengelola konten dengan lebih mudah?
Apakah ini tetap terasa private dan hangat?
Apakah ini cukup jelas tanpa membuat admin area terlalu ramai?
Apakah fitur penting seperti upload, edit, delete, dan save mudah ditemukan?

Jika jawabannya tidak, elemen tersebut sebaiknya tidak dipakai.

Design system ini menjadi standar utama agar seluruh halaman website tetap konsisten, hangat, romantis, interaktif, personal, dan tetap mudah dikelola melalui role Admin.