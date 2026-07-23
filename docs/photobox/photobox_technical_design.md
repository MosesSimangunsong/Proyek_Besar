# Photobox Technical Design

## 1. Tujuan Dokumen

Dokumen ini menjelaskan desain teknis fitur Photobox agar implementasi di React lebih terarah, modular, dan mudah diuji.

Fitur ini menggunakan browser API native:

```text
navigator.mediaDevices.getUserMedia()
HTMLVideoElement
HTMLCanvasElement
CanvasRenderingContext2D.drawImage()
canvas.toDataURL("image/png")
Native download link
```

Tidak menggunakan library kamera tambahan pada MVP.

## 2. Referensi Teknis

Referensi teknis yang digunakan sebagai dasar:

1. MDN `getUserMedia()` untuk akses kamera.
2. MDN tutorial mengambil still photo dari camera stream.
3. WebRTC sample `getUserMedia` ke canvas.
4. Contoh repo photobooth React sebagai inspirasi flow countdown, capture otomatis, strip, dan download.

Catatan:

```text
Referensi hanya dijadikan acuan pola implementasi. Kode fitur tetap dibuat menyesuaikan struktur project ini.
```

## 3. Arsitektur Umum

```text
PhotoboxPage
├── usePhotoboxCamera
├── CameraPreview
├── FrameSelector
├── FilterSelector
├── PhotoboxControls
├── CountdownOverlay
├── PhotoStripPreview
├── RetakeControls
└── PhotoboxResult

photoboxUtils
├── generatePhotoboxImage
├── drawRoundedImage
├── applyCanvasFilter
├── drawFrameDecorations
├── downloadImage
└── formatPhotoboxDate
```

## 4. Struktur File Target

```text
src/pages/PhotoboxPage.jsx

src/components/photobox/
├── CameraPreview.jsx
├── CountdownOverlay.jsx
├── PhotoboxControls.jsx
├── FrameSelector.jsx
├── FilterSelector.jsx
├── PhotoStripPreview.jsx
├── PhotoboxResult.jsx
└── RetakeControls.jsx

src/hooks/
└── usePhotoboxCamera.js

src/utils/
└── photoboxUtils.js

src/data/
├── photoboxFrames.js
└── photoboxFilters.js
```

File existing yang kemungkinan diubah:

```text
src/App.jsx
src/components/common/InesLayout.jsx
```

Jika project memakai struktur navigasi berbeda, ikuti struktur existing.

## 5. Route Design

Route:

```text
/photobox
```

Guard:

```text
allowedRole = "ines"
```

Behavior:

```text
belum login → /unlock
role ines → /photobox
role admin → /admin
```

## 6. State Design

State minimal di `PhotoboxPage`:

```js
const [selectedFrame, setSelectedFrame] = useState(photoboxFrames[0]);
const [selectedFilter, setSelectedFilter] = useState(photoboxFilters[0]);
const [capturedPhotos, setCapturedPhotos] = useState([]);
const [isCapturing, setIsCapturing] = useState(false);
const [countdown, setCountdown] = useState(null);
const [currentCaptureIndex, setCurrentCaptureIndex] = useState(null);
const [retakeIndex, setRetakeIndex] = useState(null);
const [finalImageUrl, setFinalImageUrl] = useState(null);
const [isGenerating, setIsGenerating] = useState(false);
const [uiError, setUiError] = useState("");
```

State dari hook `usePhotoboxCamera`:

```js
{
  videoRef,
  stream,
  isCameraActive,
  cameraError,
  startCamera,
  stopCamera,
  capturePhoto
}
```

## 7. Data Model

### 7.1 Captured Photo

Format data foto hasil capture:

```js
{
  id: "photo-1",
  dataUrl: "data:image/png;base64,...",
  index: 0,
  capturedAt: "2026-07-08T..."
}
```

### 7.2 Photobox Frame

File:

```text
src/data/photoboxFrames.js
```

Struktur:

```js
export const photoboxFrames = [
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
];
```

Frame lengkap:

1. `cream-scrapbook`
2. `dusty-rose-love`
3. `vintage-paper`
4. `golden-memory`
5. `playful-notes`

### 7.3 Photobox Filter

File:

```text
src/data/photoboxFilters.js
```

Struktur:

```js
export const photoboxFilters = [
  {
    id: "normal",
    name: "Normal",
    cssFilter: "none",
    canvasFilter: "none"
  }
];
```

Filter lengkap:

```js
[
  {
    id: "normal",
    name: "Normal",
    cssFilter: "none",
    canvasFilter: "none"
  },
  {
    id: "warm",
    name: "Warm",
    cssFilter: "sepia(0.18) saturate(1.15) brightness(1.05)",
    canvasFilter: "sepia(18%) saturate(115%) brightness(105%)"
  },
  {
    id: "soft-pink",
    name: "Soft Pink",
    cssFilter: "sepia(0.08) saturate(1.1) hue-rotate(-8deg) brightness(1.05)",
    canvasFilter: "sepia(8%) saturate(110%) hue-rotate(-8deg) brightness(105%)"
  },
  {
    id: "vintage",
    name: "Vintage",
    cssFilter: "sepia(0.35) contrast(0.95) brightness(1.03)",
    canvasFilter: "sepia(35%) contrast(95%) brightness(103%)"
  },
  {
    id: "black-white",
    name: "Black & White",
    cssFilter: "grayscale(1) contrast(1.05)",
    canvasFilter: "grayscale(100%) contrast(105%)"
  }
]
```

Catatan:

```text
CSS filter digunakan untuk preview video.
Canvas filter digunakan saat menggambar hasil final.
```

## 8. Hook usePhotoboxCamera

File:

```text
src/hooks/usePhotoboxCamera.js
```

Tanggung jawab:

1. Menyimpan `videoRef`.
2. Menjalankan `startCamera`.
3. Menjalankan `stopCamera`.
4. Menjalankan `capturePhoto`.
5. Menangani error kamera.
6. Cleanup stream saat unmount.

Return value:

```js
{
  videoRef,
  stream,
  isCameraActive,
  cameraError,
  startCamera,
  stopCamera,
  capturePhoto
}
```

### 8.1 startCamera

Pseudo-code:

```js
async function startCamera() {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 1280 },
        height: { ideal: 720 }
      },
      audio: false
    });

    setStream(mediaStream);

    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
      await videoRef.current.play();
    }
  } catch (error) {
    setCameraError(normalizeCameraError(error));
  }
}
```

### 8.2 stopCamera

Pseudo-code:

```js
function stopCamera() {
  stream?.getTracks().forEach((track) => track.stop());
  setStream(null);

  if (videoRef.current) {
    videoRef.current.srcObject = null;
  }
}
```

### 8.3 capturePhoto

Pseudo-code:

```js
function capturePhoto({ filter }) {
  const video = videoRef.current;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.filter = filter?.canvasFilter || "none";
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL("image/png");
}
```

## 9. Auto Capture Logic

Auto capture di `PhotoboxPage`.

Pseudo-code:

```js
async function startPhotoboxCapture() {
  setIsCapturing(true);
  setCapturedPhotos([]);

  for (let i = 0; i < 6; i++) {
    setCurrentCaptureIndex(i);
    await runCountdown(5);

    const dataUrl = capturePhoto({ filter: selectedFilter });

    setCapturedPhotos((prev) => [
      ...prev,
      {
        id: `photo-${i + 1}`,
        index: i,
        dataUrl,
        capturedAt: new Date().toISOString()
      }
    ]);
  }

  setIsCapturing(false);
  setCountdown(null);
  setCurrentCaptureIndex(null);
}
```

## 10. Countdown Logic

Pseudo-code:

```js
function runCountdown(seconds = 5) {
  return new Promise((resolve) => {
    let value = seconds;
    setCountdown(value);

    const interval = setInterval(() => {
      value -= 1;

      if (value <= 0) {
        clearInterval(interval);
        setCountdown("Smile, sayang!");
        setTimeout(resolve, 300);
      } else {
        setCountdown(value);
      }
    }, 1000);
  });
}
```

Catatan:

```text
Pastikan interval dibersihkan jika user meninggalkan halaman.
```

## 11. Retake Logic

### 11.1 Retake Foto Tertentu

Pseudo-code:

```js
async function retakePhoto(index) {
  setRetakeIndex(index);
  setIsCapturing(true);

  await runCountdown(5);

  const dataUrl = capturePhoto({ filter: selectedFilter });

  setCapturedPhotos((prev) =>
    prev.map((photo, photoIndex) =>
      photoIndex === index
        ? {
            ...photo,
            dataUrl,
            capturedAt: new Date().toISOString()
          }
        : photo
    )
  );

  setRetakeIndex(null);
  setIsCapturing(false);
}
```

### 11.2 Retake All

Pseudo-code:

```js
function retakeAll() {
  setCapturedPhotos([]);
  setFinalImageUrl(null);
  setCurrentCaptureIndex(null);
  setRetakeIndex(null);
}
```

## 12. Generate Final PNG

File:

```text
src/utils/photoboxUtils.js
```

Function:

```js
async function generatePhotoboxImage({ photos, frame, filter }) {
  // return dataUrl
}
```

Canvas final:

```text
width: 1200
height: 1800
padding: 64
gap: 32
columns: 2
rows: 3
```

Layout:

```text
Top header:
- Photobox
- For Ines

Grid:
- 2 columns
- 3 rows
- 6 photos

Footer:
- date
- 230624 / our little place
```

Pseudo-code:

```js
export async function generatePhotoboxImage({ photos, frame, filter }) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1200;
  canvas.height = 1800;

  drawBackground(ctx, frame);
  drawHeader(ctx, frame);
  await drawPhotoGrid(ctx, photos, filter);
  drawDecorations(ctx, frame);
  drawFooter(ctx, frame);

  return canvas.toDataURL("image/png");
}
```

## 13. Draw Photo Grid

Foto harus object-fit cover.

Pseudo-code:

```js
function drawImageCover(ctx, image, x, y, width, height) {
  const imageRatio = image.width / image.height;
  const boxRatio = width / height;

  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;

  if (imageRatio > boxRatio) {
    sw = image.height * boxRatio;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / boxRatio;
    sy = (image.height - sh) / 2;
  }

  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}
```

## 14. Download Image

Function:

```js
export function downloadImage(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
```

Filename:

```js
ines-photobox-YYYY-MM-DD.png
```

## 15. Component Responsibilities

### 15.1 PhotoboxPage

Tanggung jawab:

1. Mengatur state utama.
2. Memanggil hook kamera.
3. Mengatur flow capture.
4. Mengatur retake.
5. Mengatur generate/download.
6. Menyusun layout halaman.

### 15.2 CameraPreview

Props:

```js
{
  videoRef,
  isCameraActive,
  selectedFilter,
  cameraError
}
```

Tugas:

1. Menampilkan video preview.
2. Menerapkan CSS filter.
3. Menampilkan error jika ada.
4. Menampilkan placeholder sebelum kamera aktif.

### 15.3 CountdownOverlay

Props:

```js
{
  countdown,
  currentCaptureIndex,
  totalPhotos
}
```

Tugas:

1. Menampilkan countdown besar.
2. Menampilkan info foto keberapa.
3. Tampil hanya saat capture/retake berjalan.

### 15.4 FrameSelector

Props:

```js
{
  frames,
  selectedFrame,
  onSelectFrame,
  disabled
}
```

### 15.5 FilterSelector

Props:

```js
{
  filters,
  selectedFilter,
  onSelectFilter,
  disabled
}
```

### 15.6 PhotoStripPreview

Props:

```js
{
  photos,
  frame,
  filter,
  onRetake
}
```

Tugas:

1. Preview 2 kolom x 3 baris.
2. Menampilkan tombol Retake per foto.
3. Menampilkan style frame ringan.

### 15.7 PhotoboxControls

Props:

```js
{
  onStartCamera,
  onStartPhotobox,
  onRetakeAll,
  onDownload,
  isCameraActive,
  isCapturing,
  canStartCapture,
  canDownload
}
```

### 15.8 PhotoboxResult

Opsional jika finalImageUrl ditampilkan sebelum download.

## 16. Responsive Design

### Mobile

```text
- Single column layout
- Camera preview full width
- Frame/filter selector horizontal scroll
- Button besar
- Photo preview 2 kolom tetap
- Gap lebih kecil
```

### Desktop

```text
- Dua kolom:
  kiri camera/preview
  kanan controls/frame/filter
- Preview hasil bisa lebih besar
- Controls tetap mudah ditemukan
```

## 17. Accessibility

1. Tombol punya label jelas.
2. Error kamera ditampilkan sebagai text.
3. Countdown memiliki visual besar.
4. Elemen interaktif bisa difokuskan.
5. Kamera tidak aktif otomatis.
6. Kamera berhenti saat unmount.
7. Gambar preview punya alt text.
8. Jangan ada horizontal overflow.

## 18. Cleanup Requirements

Saat user keluar halaman:

```js
useEffect(() => {
  return () => {
    stopCamera();
  };
}, [stopCamera]);
```

Jika ada interval countdown:

```text
Interval harus dibersihkan saat unmount agar tidak setState setelah component unmount.
```

## 19. Performance Notes

1. Jangan simpan blob besar terlalu banyak.
2. 6 dataUrl masih aman untuk MVP.
3. Hasil final 1200 x 1800 cukup baik untuk download.
4. Hindari re-generate PNG setiap state berubah.
5. Generate PNG hanya saat user klik Download atau Preview Final.

## 20. Testing Checklist Teknis

1. Start Camera berhasil di Chrome desktop.
2. Start Camera berhasil di mobile browser.
3. Permission denied ditangani.
4. Capture 6 foto berhasil.
5. Filter terlihat di preview.
6. Filter masuk ke hasil final.
7. Frame masuk ke hasil final.
8. Retake satu foto berhasil.
9. Retake all berhasil.
10. Download PNG berhasil.
11. Kamera mati saat pindah route.
12. Build lolos.
13. Lint lolos.