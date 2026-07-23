# Technical Design Photobox v2 — Advanced Effects & Vintage Output

## 1. Tujuan Dokumen

Dokumen ini menjelaskan desain teknis **Photobox v2** untuk website personal **For Ines — A Little Place for Us**.

Photobox v2 adalah pengembangan dari Photobox MVP. Pada MVP, fitur kamera sudah memiliki flow dasar: kamera dinyalakan setelah klik tombol, foto diambil otomatis, hasil ditampilkan dalam layout 2x3, lalu diunduh sebagai PNG. Pada v2, fitur diperluas dengan:

1. Pilihan layout hasil akhir 2x3 dan 1x3.
2. Theme output final seperti vintage photobooth, old photo album, polaroid, cassette/tape aesthetic, VHS/camcorder, scrapbook page, analog film, dan dusty rose card.
3. Effect picker 20+ efek seperti Instagram-style tray.
4. Efek warna, overlay penuh, sticker statis, dan face overlay bertahap.
5. Pipeline canvas yang memastikan efek preview, hasil capture, dan hasil download konsisten.
6. Privasi penuh: tidak upload foto ke Supabase, server, atau API eksternal.

Dokumen ini dibuat sebagai acuan implementasi teknis untuk React + Vite + JavaScript + Tailwind CSS + Framer Motion/Motion.

---

## 2. Prinsip Utama Teknis

Photobox v2 harus mengikuti prinsip berikut:

```text
1. Camera tidak aktif otomatis.
2. Camera aktif hanya setelah user klik Start Camera.
3. Semua proses foto dan efek berjalan di browser.
4. Tidak ada upload foto ke Supabase.
5. Tidak ada upload foto ke backend.
6. Tidak menggunakan SDK resmi Instagram/Snapchat/TikTok.
7. Layout, theme, dan effect dipilih sebelum capture.
8. Layout, theme, dan effect dikunci selama capture.
9. Efek preview dan efek hasil capture menggunakan sumber konfigurasi yang sama.
10. Efek yang harus masuk ke PNG tidak boleh hanya berupa DOM overlay.
11. Canvas menjadi pusat rendering untuk capture dan final PNG.
12. Face tracking hanya diload ketika effect membutuhkannya.
13. Jika face tracking gagal, Photobox tetap berjalan dengan fallback non-face.
14. Implementasi wajib mobile-first.
15. Cleanup camera stream dan animation frame wajib dilakukan saat keluar halaman.
```

---

## 3. Stack Teknis

Stack utama:

```text
React
Vite
JavaScript
Tailwind CSS
React Router
Framer Motion / Motion
Native browser camera API
HTMLVideoElement
HTMLCanvasElement
CanvasRenderingContext2D
```

Dependency tambahan yang direkomendasikan secara bertahap:

```text
@mediapipe/tasks-vision  // hanya untuk Phase Face Tracking
```

Dependency yang tidak direkomendasikan untuk v2 awal:

```text
face-api.js              // tidak direkomendasikan karena maintenance dan risiko bundling
react-webcam             // tidak wajib; native getUserMedia cukup
filter library berat     // filter dapat dibuat via canvas/CSS + asset texture
SDK Instagram/Snapchat   // tidak sesuai scope dan butuh platform/API eksternal
```

---

## 4. Hubungan dengan Photobox MVP

Photobox MVP memiliki struktur dasar:

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
```

Photobox v2 tidak perlu membuang seluruh fondasi MVP. Beberapa bagian tetap bisa dipakai:

```text
Tetap digunakan:
- route /photobox
- role guard allowedRole = "ines"
- start camera flow
- stop camera cleanup
- countdown
- auto capture
- retake one
- retake all
- download PNG

Perlu diubah:
- CameraPreview menjadi CameraCanvasPreview
- FrameSelector/FilterSelector diperluas menjadi LayoutPicker, ThemePicker, EffectPicker
- capturedPhotos perlu menyimpan metadata layout/theme/effect
- generatePhotoboxImage diganti/diperluas menjadi photoboxThemeRenderer
- filter sederhana diganti effect metadata system
```

---

## 5. Arsitektur Umum Photobox v2

Arsitektur target:

```text
PhotoboxPage
├── usePhotoboxCamera
├── usePhotoboxSession
├── usePhotoboxAssets
├── usePhotoboxEffects
├── useFaceLandmarks          // lazy, hanya untuk FACE_OVERLAY/COMBO face
├── CameraCanvasPreview
├── LayoutPicker
├── ThemePicker
├── EffectPicker
├── CountdownOverlay
├── PhotoboxControls
├── PhotoStripPreview
├── RetakeControls
└── PhotoboxResult

utils/
├── photoboxCanvasUtils
├── photoboxCaptureRenderer
├── photoboxThemeRenderer
├── photoboxEffectRenderer
├── faceOverlayUtils
├── vintageEffectsUtils
├── imageAssetUtils
└── photoboxDownloadUtils
```

Alur data utama:

```text
User pilih layout/theme/effect
↓
Pilihan disimpan di PhotoboxPage state
↓
Start Photobox mengunci pilihan
↓
CameraCanvasPreview menggambar video + effect ke preview canvas
↓
Saat countdown selesai, sistem capture dari canvas render source
↓
Captured photo disimpan sebagai dataUrl/blob + metadata
↓
Preview hasil menampilkan layout sesuai pilihan
↓
Download memanggil photoboxThemeRenderer
↓
Final PNG dibuat di canvas final
↓
File diunduh ke device
```

---

## 6. Struktur File Target

Struktur file Photobox v2 yang disarankan:

```text
src/pages/
└── PhotoboxPage.jsx

src/components/photobox/
├── CameraCanvasPreview.jsx
├── CountdownOverlay.jsx
├── EffectPicker.jsx
├── LayoutPicker.jsx
├── ThemePicker.jsx
├── PhotoboxControls.jsx
├── PhotoStripPreview.jsx
├── PhotoboxResult.jsx
├── RetakeControls.jsx
├── PhotoboxErrorMessage.jsx
├── PrivacyNote.jsx
└── FaceTrackingStatus.jsx

src/hooks/
├── usePhotoboxCamera.js
├── usePhotoboxSession.js
├── usePhotoboxAssets.js
├── usePhotoboxEffects.js
├── useFaceLandmarks.js
└── useAnimationFrameLoop.js

src/data/
├── photoboxLayouts.js
├── photoboxEffects.js
├── photoboxThemes.js
└── photoboxCopy.js

src/utils/
├── photoboxCanvasUtils.js
├── photoboxCaptureRenderer.js
├── photoboxThemeRenderer.js
├── photoboxEffectRenderer.js
├── faceOverlayUtils.js
├── vintageEffectsUtils.js
├── imageAssetUtils.js
└── photoboxDownloadUtils.js

public/assets/photobox/
├── stickers/
├── textures/
├── frames/
├── thumbnails/
└── fonts/
```

File existing yang kemungkinan diubah:

```text
src/App.jsx
src/components/common/InesLayout.jsx
src/styles/scrapbook.css
src/styles/animations.css
```

---

## 7. Route dan Guard

Route tetap:

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

Menu Photobox hanya muncul pada navigasi area Ines.

---

## 8. State Design

### 8.1 State Utama PhotoboxPage

```js
const [selectedLayout, setSelectedLayout] = useState(photoboxLayouts[0]);
const [selectedTheme, setSelectedTheme] = useState(photoboxThemes[0]);
const [selectedEffect, setSelectedEffect] = useState(photoboxEffects[0]);

const [lockedLayout, setLockedLayout] = useState(null);
const [lockedTheme, setLockedTheme] = useState(null);
const [lockedEffect, setLockedEffect] = useState(null);

const [capturedPhotos, setCapturedPhotos] = useState([]);
const [isCapturing, setIsCapturing] = useState(false);
const [countdown, setCountdown] = useState(null);
const [currentCaptureIndex, setCurrentCaptureIndex] = useState(null);
const [retakeIndex, setRetakeIndex] = useState(null);

const [finalImageUrl, setFinalImageUrl] = useState(null);
const [isGenerating, setIsGenerating] = useState(false);
const [uiError, setUiError] = useState("");
const [isEffectLocked, setIsEffectLocked] = useState(false);
```

### 8.2 State dari usePhotoboxCamera

```js
{
  videoRef,
  stream,
  isCameraActive,
  isVideoReady,
  cameraError,
  startCamera,
  stopCamera
}
```

### 8.3 State dari CameraCanvasPreview

CameraCanvasPreview sebaiknya memakai ref, bukan state berlebihan, agar tidak memicu render React terlalu sering:

```js
const previewCanvasRef = useRef(null);
const renderCanvasRef = useRef(null);
const latestFrameRef = useRef(null);
const animationFrameRef = useRef(null);
```

### 8.4 State Face Tracking

```js
{
  isFaceTrackingEnabled,
  isModelLoading,
  isModelReady,
  faceLandmarksRef,
  faceTrackingError,
  startFaceTracking,
  stopFaceTracking
}
```

`faceLandmarksRef` dipakai agar update landmark tidak menyebabkan re-render React setiap frame.

---

## 9. Data Model

### 9.1 Photobox Layout

File:

```text
src/data/photoboxLayouts.js
```

Struktur:

```js
export const photoboxLayouts = [
  {
    id: "grid-2x3",
    name: "2 x 3",
    description: "Six tiny memories in one scrapbook page.",
    columns: 2,
    rows: 3,
    photoCount: 6,
    previewRatio: "portrait",
    recommendedCanvas: {
      width: 1200,
      height: 1800
    }
  },
  {
    id: "strip-1x3",
    name: "1 x 3",
    description: "A classic little photobooth strip.",
    columns: 1,
    rows: 3,
    photoCount: 3,
    previewRatio: "strip",
    recommendedCanvas: {
      width: 800,
      height: 1800
    }
  }
];
```

### 9.2 Photobox Effect

File:

```text
src/data/photoboxEffects.js
```

Tipe effect:

```text
COLOR_FILTER
FULL_FRAME_OVERLAY
STATIC_STICKER
FACE_OVERLAY
COMBO
```

Struktur dasar:

```js
export const photoboxEffectTypes = {
  COLOR_FILTER: "COLOR_FILTER",
  FULL_FRAME_OVERLAY: "FULL_FRAME_OVERLAY",
  STATIC_STICKER: "STATIC_STICKER",
  FACE_OVERLAY: "FACE_OVERLAY",
  COMBO: "COMBO"
};
```

Contoh metadata:

```js
export const photoboxEffects = [
  {
    id: "normal",
    name: "Normal",
    category: "Color & Film",
    type: "COLOR_FILTER",
    thumbnail: "/assets/photobox/thumbnails/normal.webp",
    requiresFaceTracking: false,
    preview: {
      cssFilter: "none"
    },
    canvas: {
      filter: "none",
      overlays: [],
      stickers: []
    }
  },
  {
    id: "warm-film",
    name: "Warm Film",
    category: "Color & Film",
    type: "COLOR_FILTER",
    thumbnail: "/assets/photobox/thumbnails/warm-film.webp",
    requiresFaceTracking: false,
    preview: {
      cssFilter: "sepia(0.16) saturate(1.15) brightness(1.04)"
    },
    canvas: {
      filter: "sepia(16%) saturate(115%) brightness(104%)",
      overlays: []
    }
  },
  {
    id: "light-leak",
    name: "Light Leak",
    category: "Overlay",
    type: "FULL_FRAME_OVERLAY",
    thumbnail: "/assets/photobox/thumbnails/light-leak.webp",
    requiresFaceTracking: false,
    preview: {
      cssFilter: "sepia(0.08) saturate(1.08)"
    },
    canvas: {
      filter: "sepia(8%) saturate(108%)",
      overlays: [
        {
          asset: "/assets/photobox/textures/light-leak.webp",
          blendMode: "screen",
          opacity: 0.42
        }
      ]
    }
  },
  {
    id: "floating-hearts",
    name: "Floating Hearts",
    category: "Romantic",
    type: "STATIC_STICKER",
    thumbnail: "/assets/photobox/thumbnails/floating-hearts.webp",
    requiresFaceTracking: false,
    canvas: {
      filter: "none",
      stickers: [
        {
          asset: "/assets/photobox/stickers/floating-hearts.webp",
          placement: "full-frame",
          opacity: 0.85
        }
      ]
    }
  },
  {
    id: "dog-ears",
    name: "Dog Ears",
    category: "Face",
    type: "FACE_OVERLAY",
    thumbnail: "/assets/photobox/thumbnails/dog-ears.webp",
    requiresFaceTracking: true,
    faceOverlays: [
      {
        asset: "/assets/photobox/stickers/dog-ears.webp",
        anchor: "headTop",
        scaleBy: "faceWidth",
        widthRatio: 1.45,
        yOffsetRatio: -0.36,
        rotationMode: "eye-line"
      }
    ]
  }
];
```

### 9.3 Photobox Theme

File:

```text
src/data/photoboxThemes.js
```

Theme berbeda dari effect:

```text
Effect = tampilan foto/camera frame.
Theme = desain final PNG saat download.
```

Struktur:

```js
export const photoboxThemes = [
  {
    id: "vintage-photobooth-strip",
    name: "Vintage Photobooth",
    description: "Like an old little photo strip from another time.",
    supportedLayouts: ["grid-2x3", "strip-1x3"],
    thumbnail: "/assets/photobox/thumbnails/theme-vintage-strip.webp",
    canvas: {
      background: {
        color: "#FFF8EF",
        texture: "/assets/photobox/textures/old-paper.jpg"
      },
      photoStyle: {
        borderColor: "#FFFDF8",
        borderWidth: 18,
        radius: 18,
        shadow: true
      },
      decorations: [
        {
          type: "text",
          text: "For Ines",
          position: "footer"
        },
        {
          type: "texture",
          asset: "/assets/photobox/textures/film-grain.webp",
          blendMode: "overlay",
          opacity: 0.22
        }
      ]
    }
  }
];
```

### 9.4 Captured Photo

Captured photo harus menyimpan metadata agar final renderer tahu konteks capture.

```js
{
  id: "photo-1",
  index: 0,
  dataUrl: "data:image/png;base64,...",
  capturedAt: "2026-07-08T...",
  layoutId: "grid-2x3",
  themeId: "vintage-photobooth-strip",
  effectId: "warm-film",
  width: 1280,
  height: 720
}
```

---

## 10. Asset Structure

Asset disimpan di public agar mudah diakses oleh canvas renderer.

```text
public/assets/photobox/
├── stickers/
│   ├── dog-ears.webp
│   ├── cat-ears.webp
│   ├── bunny-ears.webp
│   ├── cute-hat.webp
│   ├── crown.webp
│   ├── heart-glasses.webp
│   ├── blush-left.webp
│   ├── blush-right.webp
│   ├── heart-cheek.webp
│   ├── ribbon.webp
│   ├── mustache.webp
│   ├── floating-hearts.webp
│   ├── sparkles.webp
│   ├── for-ines-sticker.webp
│   ├── love-stamp.webp
│   ├── paper-note.webp
│   └── washi-tape.webp
│
├── textures/
│   ├── film-grain.webp
│   ├── dust.webp
│   ├── scratch.webp
│   ├── light-leak.webp
│   ├── old-paper.jpg
│   ├── vhs-noise.webp
│   └── soft-glow.webp
│
├── frames/
│   ├── polaroid-frame.webp
│   ├── vintage-strip.webp
│   ├── cassette-frame.webp
│   ├── camcorder-frame.webp
│   ├── scrapbook-page-frame.webp
│   └── contact-sheet-frame.webp
│
├── thumbnails/
│   ├── normal.webp
│   ├── warm-film.webp
│   ├── light-leak.webp
│   └── theme-vintage-strip.webp
│
└── fonts/
    ├── handwritten.woff2
    ├── vcr-osd.woff2
    └── typewriter.woff2
```

Format asset:

```text
Sticker transparan: WebP alpha atau PNG transparan
Texture tanpa transparansi: JPG/WebP
Texture transparan: WebP alpha/PNG
Fonts: WOFF2
Thumbnail: WebP ukuran kecil
```

---

## 11. Hook Design

## 11.1 usePhotoboxCamera

Tanggung jawab:

1. Menyimpan `videoRef`.
2. Menjalankan `getUserMedia`.
3. Memasang stream ke video.
4. Menandai video ready.
5. Menangani error.
6. Stop semua track saat unmount.

Pseudo-code:

```js
export function usePhotoboxCamera() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [cameraError, setCameraError] = useState("");

  async function startCamera() {
    try {
      setCameraError("");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.muted = true;
        videoRef.current.playsInline = true;
        await videoRef.current.play();
      }
    } catch (error) {
      setCameraError(normalizeCameraError(error));
      setIsCameraActive(false);
    }
  }

  function stopCamera() {
    mediaStreamCleanup(stream);
    setStream(null);
    setIsCameraActive(false);
    setIsVideoReady(false);

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }

  useEffect(() => stopCamera, []);

  return {
    videoRef,
    stream,
    isCameraActive,
    isVideoReady,
    cameraError,
    startCamera,
    stopCamera,
    setIsVideoReady
  };
}
```

### 11.2 usePhotoboxSession

Tanggung jawab:

1. Menyimpan state layout/theme/effect.
2. Mengunci pilihan saat capture.
3. Menghitung jumlah foto berdasarkan layout.
4. Reset session jika retake all.

Return value:

```js
{
  selectedLayout,
  setSelectedLayout,
  selectedTheme,
  setSelectedTheme,
  selectedEffect,
  setSelectedEffect,
  lockedLayout,
  lockedTheme,
  lockedEffect,
  lockSelections,
  unlockSelections,
  photoCount,
  isSelectionLocked
}
```

### 11.3 usePhotoboxAssets

Tanggung jawab:

1. Preload asset untuk selected effect.
2. Preload asset untuk selected theme.
3. Cache image object agar canvas drawImage tidak reload berulang.
4. Memberikan fallback jika asset gagal dimuat.

Return value:

```js
{
  getImageAsset,
  preloadEffectAssets,
  preloadThemeAssets,
  isLoadingAssets,
  assetError
}
```

### 11.4 usePhotoboxEffects

Tanggung jawab:

1. Menentukan apakah effect membutuhkan face tracking.
2. Mengatur canvas filter.
3. Mengirim konfigurasi ke renderer.
4. Mematikan face tracking untuk effect non-face.

Return value:

```js
{
  activeEffect,
  requiresFaceTracking,
  effectRenderConfig,
  canRenderEffect
}
```

### 11.5 useFaceLandmarks

Tanggung jawab:

1. Lazy load `@mediapipe/tasks-vision`.
2. Inisialisasi FaceLandmarker.
3. Menjalankan `detectForVideo` pada interval aman.
4. Menyimpan landmarks di ref.
5. Menutup model saat tidak dibutuhkan.
6. Fallback jika model gagal.

Pseudo-code:

```js
export function useFaceLandmarks({ enabled, videoRef }) {
  const faceLandmarkerRef = useRef(null);
  const faceLandmarksRef = useRef(null);
  const rafRef = useRef(null);

  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [faceTrackingError, setFaceTrackingError] = useState("");

  async function loadModel() {
    if (faceLandmarkerRef.current) return;

    setIsModelLoading(true);
    try {
      const { FaceLandmarker, FilesetResolver } = await import("@mediapipe/tasks-vision");
      const filesetResolver = await FilesetResolver.forVisionTasks("/wasm");

      faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: "/models/face_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numFaces: 1
      });

      setIsModelReady(true);
    } catch (error) {
      setFaceTrackingError("Face effect is not available on this device.");
    } finally {
      setIsModelLoading(false);
    }
  }

  function stopFaceTracking() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    faceLandmarksRef.current = null;

    if (faceLandmarkerRef.current) {
      faceLandmarkerRef.current.close?.();
      faceLandmarkerRef.current = null;
    }

    setIsModelReady(false);
  }

  return {
    faceLandmarksRef,
    isModelLoading,
    isModelReady,
    faceTrackingError,
    loadModel,
    stopFaceTracking
  };
}
```

Catatan:

```text
Path /wasm dan /models adalah rekomendasi. Implementasi bisa memakai CDN MediaPipe jika lebih mudah, tetapi lokal asset lebih stabil untuk deployment jangka panjang.
```

### 11.6 useAnimationFrameLoop

Tanggung jawab:

1. Menjalankan render loop.
2. Stop loop saat camera mati atau halaman unmount.
3. Mendukung FPS cap untuk mobile.

Return value:

```js
{
  startLoop,
  stopLoop,
  isLoopRunning
}
```

---

## 12. Component Responsibilities

### 12.1 PhotoboxPage

Tanggung jawab:

1. Menjadi orchestrator utama.
2. Memanggil hook camera, session, assets, effects.
3. Menyusun UI.
4. Menjalankan auto capture.
5. Menjalankan retake.
6. Menjalankan generate final PNG.
7. Menampilkan error dan loading state.

### 12.2 CameraCanvasPreview

Props:

```js
{
  videoRef,
  isCameraActive,
  isVideoReady,
  selectedEffect,
  faceLandmarksRef,
  getImageAsset,
  onCaptureFrameReady,
  onVideoReady,
  disabled
}
```

Tanggung jawab:

1. Menampilkan video tersembunyi/di belakang canvas.
2. Menampilkan canvas preview utama.
3. Menggambar video frame ke canvas.
4. Menggambar effect ke canvas.
5. Menyediakan method capture current rendered frame.
6. Menampilkan placeholder sebelum camera aktif.
7. Menangani mirroring kamera depan.

Struktur DOM:

```jsx
<div className="photobox-camera-shell">
  <video
    ref={videoRef}
    autoPlay
    muted
    playsInline
    className="sr-only-or-hidden-video-source"
    onLoadedMetadata={onVideoReady}
  />

  <canvas ref={previewCanvasRef} className="photobox-preview-canvas" />
</div>
```

Catatan penting:

```text
Video boleh disembunyikan secara visual, tetapi jangan display: none jika browser tertentu gagal drawImage dari video hidden.
Gunakan ukuran kecil/offscreen/opacity 0 jika perlu.
```

### 12.3 LayoutPicker

Props:

```js
{
  layouts,
  selectedLayout,
  onSelectLayout,
  disabled
}
```

Tanggung jawab:

1. Menampilkan pilihan 2x3 dan 1x3.
2. Menjelaskan jumlah foto yang akan diambil.
3. Disabled saat capture berjalan.

### 12.4 ThemePicker

Props:

```js
{
  themes,
  selectedTheme,
  selectedLayout,
  onSelectTheme,
  disabled
}
```

Tanggung jawab:

1. Menampilkan theme sesuai layout yang dipilih.
2. Menyembunyikan/disable theme yang tidak mendukung layout aktif.
3. Menggunakan horizontal scroll di mobile.

### 12.5 EffectPicker

Props:

```js
{
  effects,
  selectedEffect,
  onSelectEffect,
  disabled
}
```

Tanggung jawab:

1. Menampilkan 20+ efek.
2. Mendukung kategori.
3. Menggunakan horizontal tray/carousel.
4. Menampilkan active state.
5. Menampilkan indikator jika effect butuh face tracking.

### 12.6 FaceTrackingStatus

Props:

```js
{
  requiresFaceTracking,
  isModelLoading,
  isModelReady,
  faceTrackingError
}
```

Tanggung jawab:

1. Memberi informasi kecil bahwa face effect sedang disiapkan.
2. Menampilkan fallback message jika face tracking gagal.
3. Tidak mengganggu flow utama.

### 12.7 PhotoStripPreview

Props:

```js
{
  photos,
  layout,
  theme,
  effect,
  onRetake
}
```

Tanggung jawab:

1. Menampilkan preview sesuai layout 2x3 atau 1x3.
2. Menampilkan tombol Retake per foto.
3. Menampilkan style ringan berdasarkan theme.
4. Tidak perlu 100% sama dengan final PNG, tetapi harus merepresentasikan layout final.

### 12.8 PhotoboxResult

Props:

```js
{
  finalImageUrl,
  isGenerating,
  onDownload,
  onRegenerate
}
```

Tanggung jawab:

1. Menampilkan preview PNG final jika tersedia.
2. Menampilkan tombol download.
3. Menampilkan loading saat generate.

---

## 13. Rendering Pipeline

## 13.1 Preview Pipeline

Preview pipeline berjalan saat camera aktif.

```text
HTMLVideoElement stream
↓
CameraCanvasPreview render loop
↓
Clear canvas
↓
Draw mirrored video frame
↓
Apply selected effect:
  - canvas filter
  - full frame overlay
  - static sticker
  - face overlay jika tersedia
↓
Display preview canvas
```

Pseudo-code:

```js
function renderPreviewFrame() {
  const video = videoRef.current;
  const canvas = previewCanvasRef.current;
  const ctx = canvas.getContext("2d");

  syncCanvasSizeToVideo(canvas, video);

  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawMirroredVideo(ctx, video, canvas.width, canvas.height);
  applyEffectToCanvas(ctx, {
    effect: selectedEffect,
    canvas,
    assets,
    faceLandmarks: faceLandmarksRef.current
  });

  ctx.restore();

  animationFrameRef.current = requestAnimationFrame(renderPreviewFrame);
}
```

### 13.2 Capture Pipeline

Saat countdown selesai, sistem mengambil frame dari canvas preview/render canvas.

```text
Countdown selesai
↓
Ambil canvas frame yang sudah berisi video + effect
↓
Export ke Blob/DataURL
↓
Simpan ke capturedPhotos
```

Rekomendasi export:

```text
Gunakan toBlob untuk efisiensi memori.
Gunakan dataUrl sebagai fallback jika toBlob gagal.
```

Pseudo-code:

```js
async function captureRenderedFrame({ layout, theme, effect, index }) {
  const canvas = previewCanvasRef.current;

  await waitForNextPaint();

  const blob = await canvasToBlob(canvas, "image/png", 0.95);
  const dataUrl = blob ? URL.createObjectURL(blob) : canvas.toDataURL("image/png");

  return {
    id: `photo-${index + 1}`,
    index,
    dataUrl,
    capturedAt: new Date().toISOString(),
    layoutId: layout.id,
    themeId: theme.id,
    effectId: effect.id,
    width: canvas.width,
    height: canvas.height
  };
}
```

### 13.3 Final PNG Pipeline

Final PNG dibuat setelah user klik Download atau Generate.

```text
capturedPhotos
↓
selected/locked layout
↓
selected/locked theme
↓
Load theme assets
↓
Create final canvas
↓
Draw theme background
↓
Draw photo slots object-fit cover
↓
Draw theme decorations
↓
Draw final texture overlay
↓
Draw text: Photobox / For Ines / date / 230624
↓
Export PNG
↓
Download
```

---

## 14. Canvas Size Decision

### 14.1 Layout 2x3

Rekomendasi canvas final:

```text
width: 1200px
height: 1800px
ratio: 2:3 portrait
photoCount: 6
columns: 2
rows: 3
```

Alasan:

1. Melanjutkan ukuran MVP.
2. Cukup tajam untuk disimpan di HP.
3. Tidak terlalu besar untuk memory mobile.
4. Cocok untuk scrapbook page, polaroid collage, old album, dan contact sheet.

### 14.2 Layout 1x3

Rekomendasi canvas final:

```text
width: 800px
height: 1800px
ratio: vertical strip
photoCount: 3
columns: 1
rows: 3
```

Alasan:

1. Lebih mirip photobooth strip klasik.
2. Lebih ringan dari canvas 1200x2400.
3. Cocok untuk vintage strip, VHS strip, cassette/tape, dan romantic strip.

### 14.3 Device Pixel Ratio

Untuk hasil lebih tajam, renderer boleh memakai scale factor:

```js
const scale = Math.min(window.devicePixelRatio || 1, 2);
```

Namun untuk mencegah memory tinggi, final canvas tetap dibatasi:

```text
max width: 1600
max height: 2400
```

Pada v2 awal, gunakan ukuran tetap 1200x1800 dan 800x1800 terlebih dahulu.

---

## 15. Canvas Utilities

File:

```text
src/utils/photoboxCanvasUtils.js
```

Fungsi yang disarankan:

```js
export function createCanvas(width, height) {}
export function getCanvasContext(canvas) {}
export function clearCanvas(ctx, width, height) {}
export function drawImageCover(ctx, image, x, y, width, height) {}
export function drawRoundedRect(ctx, x, y, width, height, radius) {}
export function clipRoundedRect(ctx, x, y, width, height, radius) {}
export function drawRoundedImageCover(ctx, image, x, y, width, height, radius) {}
export function drawText(ctx, options) {}
export function drawTextureOverlay(ctx, image, options) {}
export function canvasToBlob(canvas, type, quality) {}
export function canvasToDataUrl(canvas, type, quality) {}
export function waitForNextPaint() {}
```

### 15.1 drawImageCover

```js
export function drawImageCover(ctx, image, x, y, width, height) {
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

### 15.2 canvasToBlob with fallback

```js
export function canvasToBlob(canvas, type = "image/png", quality = 0.95) {
  return new Promise((resolve) => {
    if (!canvas.toBlob) {
      resolve(null);
      return;
    }

    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}
```

---

## 16. Effect Renderer

File:

```text
src/utils/photoboxEffectRenderer.js
```

Tanggung jawab:

1. Membaca metadata effect.
2. Menerapkan canvas filter.
3. Menggambar overlay full-frame.
4. Menggambar sticker statis.
5. Menggambar face overlay jika tersedia.
6. Tidak crash jika asset/landmark tidak tersedia.

Pseudo-code:

```js
export function applyEffectToCanvas(ctx, options) {
  const {
    effect,
    canvas,
    assets,
    faceLandmarks
  } = options;

  if (!effect) return;

  applyColorFilter(ctx, effect);
  drawFullFrameOverlays(ctx, effect, canvas, assets);
  drawStaticStickers(ctx, effect, canvas, assets);

  if (effect.requiresFaceTracking && faceLandmarks) {
    drawFaceOverlays(ctx, effect, canvas, assets, faceLandmarks);
  }
}
```

Catatan penting:

```text
CanvasRenderingContext2D.filter hanya memengaruhi draw setelah filter di-set.
Jika video sudah digambar sebelum filter, filter tidak berlaku ke video.
Karena itu, untuk COLOR_FILTER, filter sebaiknya diterapkan sebelum draw video atau memakai offscreen/source canvas.
```

Rekomendasi preview rendering:

```text
1. Set ctx.filter dari effect.
2. Draw mirrored video.
3. Reset ctx.filter = "none".
4. Draw overlay/sticker/face effect.
```

---

## 17. Capture Renderer

File:

```text
src/utils/photoboxCaptureRenderer.js
```

Tanggung jawab:

1. Menggambar satu frame camera + effect ke canvas capture.
2. Memastikan capture tidak bergantung pada DOM overlay.
3. Menghasilkan captured photo data.

Fungsi:

```js
export async function renderCapturedPhoto({
  video,
  effect,
  assets,
  faceLandmarks,
  width,
  height,
  mirror = true
}) {}
```

Pipeline:

```text
create capture canvas
↓
set filter sesuai effect
↓
draw mirrored video
↓
reset filter
↓
draw overlays/stickers/face overlays
↓
export blob/dataUrl
```

---

## 18. Theme Renderer

File:

```text
src/utils/photoboxThemeRenderer.js
```

Tanggung jawab:

1. Membuat final PNG sesuai layout.
2. Menggambar background theme.
3. Menggambar photo grid/strip.
4. Menggambar decoration theme.
5. Menggambar text final.
6. Export PNG.

Fungsi utama:

```js
export async function generatePhotoboxFinalImage({
  photos,
  layout,
  theme,
  getImageAsset,
  output = "blob"
}) {}
```

Return:

```js
{
  blob,
  dataUrl,
  width,
  height,
  filename
}
```

### 18.1 Layout slot calculation

```js
function getPhotoSlots(layout, canvasWidth, canvasHeight, theme) {
  if (layout.id === "grid-2x3") {
    return getGrid2x3Slots(canvasWidth, canvasHeight, theme);
  }

  if (layout.id === "strip-1x3") {
    return getStrip1x3Slots(canvasWidth, canvasHeight, theme);
  }

  return [];
}
```

### 18.2 2x3 slot recommendation

```text
canvas: 1200x1800
paddingX: 80
paddingTop: 170
paddingBottom: 140
gapX: 32
gapY: 34
photoWidth: (1200 - 160 - 32) / 2 = 504
photoHeight: (1800 - 170 - 140 - 68) / 3 = 474
```

### 18.3 1x3 slot recommendation

```text
canvas: 800x1800
paddingX: 84
paddingTop: 170
paddingBottom: 140
gapY: 38
photoWidth: 632
photoHeight: (1800 - 170 - 140 - 76) / 3 = 471
```

---

## 19. Theme Rendering Details

### 19.1 Vintage Photobooth Strip

Render steps:

```text
1. Fill background ivory.
2. Draw old paper texture with low opacity.
3. Draw photos with white border.
4. Add subtle shadow.
5. Add film grain overlay.
6. Add small date text.
7. Add For Ines label.
```

### 19.2 Old Photo Album

Render steps:

```text
1. Draw old paper background.
2. Draw photos as album prints.
3. Add tape on corners.
4. Add stamp element.
5. Add dust/scratch overlay.
6. Add handwritten note.
```

### 19.3 Polaroid Collage

Render steps:

```text
1. Draw soft paper background.
2. Draw each photo inside polaroid card.
3. Apply small rotation per card.
4. Draw caption area under photo.
5. Draw hearts/stickers lightly.
6. Add For Ines handwritten text.
```

### 19.4 Cassette/Tape Aesthetic

Render steps:

```text
1. Draw warm beige background.
2. Draw cassette/tape frame or label shapes.
3. Draw photos inside slots.
4. Add small tape labels.
5. Add date and 230624.
6. Add subtle grain.
```

### 19.5 VHS/Camcorder Memory

Render steps:

```text
1. Draw dark/soft frame or camcorder border.
2. Draw photos with slight contrast/saturation.
3. Add VHS noise overlay.
4. Add timestamp.
5. Add REC / PLAY indicator softly.
6. Add chromatic offset text if possible.
```

### 19.6 Scrapbook Love Page

Render steps:

```text
1. Draw paper texture.
2. Draw photo grid.
3. Add washi tape corners.
4. Add doodle hearts.
5. Add love stamp.
6. Add handwritten For Ines.
```

### 19.7 Analog Film Contact Sheet

Render steps:

```text
1. Draw film/contact sheet background.
2. Draw photos in grid.
3. Add frame number per photo.
4. Add dust/scratch.
5. Add small date.
```

### 19.8 Romantic Dusty Rose Card

Render steps:

```text
1. Draw dusty rose / ivory gradient.
2. Draw photos with soft rounded border.
3. Add champagne gold accent.
4. Add floating hearts/sparkle.
5. Add For Ines label.
```

---

## 20. Face Overlay Technical Design

Face overlay adalah phase lanjutan. Jangan jadikan blocker untuk Phase V2-1 sampai V2-3.

### 20.1 Landmark Anchors

Anchor yang digunakan:

```text
leftEyeOuter: 33
rightEyeOuter: 263
noseTip: 4
headTop: 10
leftCheek: 234
rightCheek: 454
```

### 20.2 Coordinate normalization

MediaPipe landmarks biasanya bernilai 0..1 terhadap ukuran video.

```js
function normalizeLandmark(point, width, height) {
  return {
    x: point.x * width,
    y: point.y * height,
    z: point.z
  };
}
```

### 20.3 Face rotation

Rotasi roll kepala dihitung dari garis mata:

```js
function getFaceRollAngle(leftEye, rightEye) {
  return Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
}
```

### 20.4 Face width

```js
function getFaceWidth(leftCheek, rightCheek) {
  const dx = rightCheek.x - leftCheek.x;
  const dy = rightCheek.y - leftCheek.y;
  return Math.sqrt(dx * dx + dy * dy);
}
```

### 20.5 Draw face sticker

```js
export function drawFaceSticker(ctx, options) {
  const {
    image,
    anchor,
    width,
    height,
    rotation,
    opacity = 1
  } = options;

  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.translate(anchor.x, anchor.y);
  ctx.rotate(rotation);
  ctx.drawImage(image, -width / 2, -height / 2, width, height);
  ctx.restore();
}
```

### 20.6 Fallback behavior

Jika wajah tidak terdeteksi:

```text
1. Jangan crash.
2. Tetap tampilkan video + color/full-frame/static effect.
3. Tampilkan pesan kecil:
   "I can't find your face clearly, sayang. The effect will stay soft for now."
4. Saat capture, lewati face overlay.
```

---

## 21. Auto Capture Logic

Jumlah foto mengikuti layout:

```js
const totalPhotos = lockedLayout.photoCount;
```

Pseudo-code:

```js
async function startPhotoboxCapture() {
  if (!isCameraActive || !isVideoReady) return;

  const layout = selectedLayout;
  const theme = selectedTheme;
  const effect = selectedEffect;

  lockSelections({ layout, theme, effect });
  setCapturedPhotos([]);
  setFinalImageUrl(null);
  setIsCapturing(true);

  for (let i = 0; i < layout.photoCount; i++) {
    setCurrentCaptureIndex(i);
    await runCountdown(5);

    const photo = await captureRenderedFrame({
      index: i,
      layout,
      theme,
      effect
    });

    setCapturedPhotos((prev) => [...prev, photo]);
  }

  setCountdown(null);
  setCurrentCaptureIndex(null);
  setIsCapturing(false);
}
```

---

## 22. Countdown Logic

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

Cleanup:

```text
Jika user keluar halaman saat countdown berjalan, interval harus dibersihkan.
Simpan intervalRef agar bisa clearInterval pada unmount.
```

---

## 23. Retake Logic

### 23.1 Retake One

```js
async function retakePhoto(index) {
  if (!lockedLayout || !lockedTheme || !lockedEffect) return;

  setRetakeIndex(index);
  setIsCapturing(true);

  await runCountdown(5);

  const newPhoto = await captureRenderedFrame({
    index,
    layout: lockedLayout,
    theme: lockedTheme,
    effect: lockedEffect
  });

  setCapturedPhotos((prev) =>
    prev.map((photo, photoIndex) =>
      photoIndex === index ? newPhoto : photo
    )
  );

  setRetakeIndex(null);
  setIsCapturing(false);
}
```

### 23.2 Retake All

```js
function retakeAll() {
  revokeCapturedPhotoUrls(capturedPhotos);
  setCapturedPhotos([]);
  setFinalImageUrl(null);
  setCountdown(null);
  setCurrentCaptureIndex(null);
  setRetakeIndex(null);
  unlockSelections();
}
```

Jika user ingin mengganti layout/theme/effect, user harus retake all.

---

## 24. Download Logic

File:

```text
src/utils/photoboxDownloadUtils.js
```

Fungsi:

```js
export function downloadBlob(blob, filename) {}
export function downloadDataUrl(dataUrl, filename) {}
export function createPhotoboxFilename(date = new Date()) {}
```

Rekomendasi:

```text
Gunakan Blob URL untuk download agar lebih hemat memori.
Fallback ke dataUrl jika Blob gagal.
```

Pseudo-code:

```js
async function handleDownload() {
  if (capturedPhotos.length !== lockedLayout.photoCount) {
    setUiError("Take all tiny memories first, sayang.");
    return;
  }

  setIsGenerating(true);

  try {
    const result = await generatePhotoboxFinalImage({
      photos: capturedPhotos,
      layout: lockedLayout,
      theme: lockedTheme,
      getImageAsset
    });

    downloadBlob(result.blob, result.filename);
    setFinalImageUrl(result.previewUrl);
  } catch (error) {
    setUiError("I couldn't save this little memory yet. Try again, sayang.");
  } finally {
    setIsGenerating(false);
  }
}
```

---

## 25. Memory Management

Wajib dilakukan:

```text
1. Stop camera tracks saat keluar halaman.
2. cancelAnimationFrame saat keluar halaman.
3. clearInterval countdown saat keluar halaman.
4. close MediaPipe model jika sudah tidak dipakai.
5. Revoke Object URL dari captured photo jika retake all atau unmount.
6. Revoke final image URL jika generate ulang.
7. Jangan menyimpan terlalu banyak canvas/dataUrl besar di React state.
```

Rekomendasi:

```text
Gunakan Blob URL untuk captured photo.
Gunakan DataURL hanya jika benar-benar perlu.
```

---

## 26. Mobile Compatibility

### 26.1 iOS Safari

Aturan:

```text
1. Video harus memakai playsInline.
2. Video harus muted.
3. Video harus diputar setelah user gesture.
4. Jangan rely pada autoplay sebelum user klik.
5. Pastikan video ready sebelum drawImage.
6. Tambahkan delay kecil sebelum capture jika canvas hitam.
```

Video props:

```jsx
<video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  onLoadedMetadata={handleVideoReady}
/>
```

### 26.2 Android Chrome

Aturan:

```text
1. getUserMedia harus berjalan di HTTPS atau localhost.
2. Gunakan facingMode user untuk kamera depan.
3. Stop stream saat keluar halaman.
4. Jaga resolusi ideal, jangan terlalu tinggi.
```

### 26.3 Performance Guard

```text
1. Face tracking tidak jalan untuk effect non-face.
2. Lazy load MediaPipe hanya saat diperlukan.
3. Batasi FPS face detection jika device lambat.
4. Jangan render asset besar setiap frame tanpa cache.
5. Preload asset selected effect/theme.
```

---

## 27. Accessibility dan UX

1. Semua tombol punya label jelas.
2. LayoutPicker, ThemePicker, dan EffectPicker bisa digunakan dengan keyboard dasar.
3. Active selection punya visual state dan aria-pressed.
4. Error ditampilkan sebagai text, bukan hanya warna.
5. Countdown besar dan mudah dibaca.
6. Camera permission error menggunakan microcopy lembut.
7. Tidak ada autoplay camera.
8. Tidak ada autoplay audio karena fitur ini berdampingan dengan website yang punya music control.

---

## 28. Error Handling

### 28.1 Camera Permission Denied

```text
I need your camera permission to make this little memory.
Please allow camera access, sayang.
```

### 28.2 Camera Unavailable

```text
Your camera is not available right now.
Try again from another device or browser.
```

### 28.3 Capture Failed

```text
The camera missed that moment. Let's try again, sayang.
```

### 28.4 Generate PNG Failed

```text
I couldn't save this little memory yet. Try again, sayang.
```

### 28.5 Face Not Detected

```text
I can't find your face clearly, sayang.
The effect will stay soft for now.
```

### 28.6 Asset Failed to Load

Fallback:

```text
1. Skip missing overlay/sticker.
2. Continue rendering photo.
3. Do not block capture unless asset is required for core theme layout.
```

---

## 29. Implementation Phases

### Phase V2-1 — Output Themes & Canvas Upgrade

Tujuan:

```text
Membuat hasil download PNG jauh lebih menarik tanpa face tracking.
```

Task:

```text
1. Tambah photoboxLayouts.js.
2. Tambah photoboxThemes.js.
3. Tambah LayoutPicker.
4. Tambah ThemePicker.
5. Buat photoboxThemeRenderer.js.
6. Support layout 2x3 dan 1x3.
7. Buat minimal 4 theme awal.
8. Download PNG dengan theme.
```

Acceptance:

```text
1. Layout 2x3 mengambil 6 foto.
2. Layout 1x3 mengambil 3 foto.
3. Download PNG mengikuti layout.
4. PNG terlihat lebih kaya dari MVP.
5. Tidak ada face tracking dulu.
```

### Phase V2-2 — Effect Picker 20+

Task:

```text
1. Buat photoboxEffects.js.
2. Buat EffectPicker.jsx.
3. Buat photoboxEffectRenderer.js.
4. Tambah color filters.
5. Tambah full frame overlays.
6. Tambah static stickers.
7. Efek dikunci saat capture.
```

Acceptance:

```text
1. Minimal 20+ effect tampil di picker.
2. Effect non-face bekerja di preview/capture.
3. Effect masuk ke captured photo.
```

### Phase V2-3 — Static Sticker & Romantic Overlay

Task:

```text
1. Floating hearts.
2. Sparkles.
3. For Ines sticker.
4. Washi tape.
5. Love stamp.
6. Paper note.
```

Acceptance:

```text
1. Static sticker tampil di preview.
2. Static sticker masuk ke captured photo.
3. Tidak butuh MediaPipe.
```

### Phase V2-4 — Face Tracking Effects

Task:

```text
1. Install @mediapipe/tasks-vision.
2. Buat useFaceLandmarks.js.
3. Buat faceOverlayUtils.js.
4. Lazy load face model hanya saat effect membutuhkan.
5. Implement dog ears/cat ears/hat/crown/glasses/blush.
6. Fallback jika wajah tidak terdeteksi.
```

Acceptance:

```text
1. Face effect mengikuti wajah.
2. Face effect masuk ke capture.
3. Jika model gagal, fitur tidak crash.
```

### Phase V2-5 — Polish & Mobile Optimization

Task:

```text
1. Uji iOS Safari.
2. Uji Android Chrome.
3. Optimize asset size.
4. Cleanup memory.
5. Build dan lint.
```

---

## 30. Testing Checklist

### 30.1 Route & Guard

```text
[ ] /photobox hanya bisa diakses role ines.
[ ] User belum login diarahkan ke /unlock.
[ ] Admin diarahkan ke /admin.
[ ] Menu Photobox hanya muncul di area Ines.
```

### 30.2 Camera

```text
[ ] Camera tidak menyala otomatis.
[ ] Start Camera meminta permission.
[ ] Preview muncul setelah permission allowed.
[ ] Permission denied menampilkan error lembut.
[ ] Camera mati saat keluar halaman.
```

### 30.3 Layout

```text
[ ] Layout 2x3 bisa dipilih.
[ ] Layout 1x3 bisa dipilih.
[ ] Layout 2x3 mengambil 6 foto.
[ ] Layout 1x3 mengambil 3 foto.
[ ] Preview mengikuti layout.
[ ] PNG mengikuti layout.
```

### 30.4 Theme

```text
[ ] Theme picker tampil.
[ ] Theme sesuai layout aktif.
[ ] Theme terkunci saat capture.
[ ] PNG final memakai theme.
[ ] Theme tidak membuat foto gepeng.
```

### 30.5 Effect

```text
[ ] Effect picker tampil.
[ ] Minimal 20+ effect tersedia.
[ ] Effect bisa dipilih sebelum capture.
[ ] Effect terkunci saat capture.
[ ] Effect non-face masuk ke preview.
[ ] Effect non-face masuk ke captured photo.
[ ] Face effect fallback tidak crash.
```

### 30.6 Capture & Retake

```text
[ ] Countdown berjalan 5 detik.
[ ] Capture otomatis berjalan sampai jumlah foto sesuai layout.
[ ] Retake satu foto bekerja.
[ ] Retake all bekerja.
[ ] Jika mengganti layout/theme/effect, user harus retake all.
```

### 30.7 Download

```text
[ ] Download button muncul setelah semua foto tersedia.
[ ] PNG berhasil diunduh.
[ ] Filename sesuai format.
[ ] PNG berisi For Ines.
[ ] PNG berisi tanggal.
[ ] PNG berisi 230624 atau our little place.
[ ] PNG tajam dan tidak gepeng.
```

### 30.8 Mobile

```text
[ ] Tombol nyaman di HP.
[ ] Picker horizontal nyaman di HP.
[ ] Camera preview tidak terpotong aneh.
[ ] iOS Safari tidak black screen.
[ ] Android Chrome camera berjalan.
```

### 30.9 Build

```text
[ ] npm run build lolos.
[ ] npm run lint lolos.
[ ] Tidak ada memory leak jelas setelah keluar halaman.
```

---

## 31. Open Technical Notes

Beberapa hal yang dapat diputuskan saat implementasi:

```text
1. Apakah asset MediaPipe model disimpan lokal atau memakai CDN.
2. Apakah preview final PNG langsung ditampilkan sebelum download atau hanya download langsung.
3. Apakah theme lama dari photoboxFrames.js digabung ke photoboxThemes.js.
4. Apakah semua thumbnail effect dibuat manual atau sementara memakai emoji/icon.
5. Apakah captured photo disimpan sebagai Blob URL atau DataURL pada phase awal.
```

Rekomendasi default:

```text
1. Simpan theme di photoboxThemes.js.
2. photoboxFrames.js lama dapat dianggap legacy dan perlahan digabung ke theme.
3. Gunakan Blob URL untuk capturedPhotos jika memungkinkan.
4. Gunakan emoji/icon sementara untuk effect thumbnail jika asset belum lengkap.
5. Jangan implement Face Tracking sebelum renderer non-face stabil.
```

---

## 32. Definition of Done Teknis

Photobox v2 dianggap selesai secara teknis jika:

```text
1. /photobox berjalan dengan guard role ines.
2. Camera start/stop stabil.
3. Canvas preview berjalan.
4. Layout 2x3 dan 1x3 berjalan.
5. Theme output final berjalan.
6. Minimal 20+ effect tersedia di UI.
7. Effect non-face masuk preview dan capture.
8. Retake one dan retake all berjalan.
9. Download PNG berjalan.
10. PNG final sesuai layout/theme/effect.
11. Tidak ada upload foto ke server.
12. Cleanup camera, interval, animation frame berjalan.
13. Fallback face tracking aman.
14. Mobile layout nyaman.
15. npm run build lolos.
16. npm run lint lolos.
```
