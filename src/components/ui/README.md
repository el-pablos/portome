# 🎨 Dokumentasi Komponen UI Modern

Folder ini berisi komponen-komponen UI modern yang dapat digunakan kembali (reusable) untuk meningkatkan tampilan visual website.

**Total Komponen:** 9 komponen
**Dependencies:** @tsparticles, @radix-ui, class-variance-authority, framer-motion

---

## 📦 Daftar Komponen

### 1. ✨ SparklesCore

Komponen efek partikel berkilauan yang modern dan interaktif.

#### Import:
```javascript
import { SparklesCore } from "./components/ui/sparkles";
```

#### Penggunaan Dasar:
```javascript
<SparklesCore
  background="transparent"
  minSize={0.4}
  maxSize={1}
  particleDensity={800}
  particleColor="#a78bfa"
  speed={0.5}
  className="w-full h-full"
/>
```

#### Props:

| Prop | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| `id` | string | auto-generated | ID unik untuk instance particles |
| `className` | string | - | Class CSS tambahan |
| `background` | string | "#0d47a1" | Warna background (gunakan "transparent" untuk transparan) |
| `minSize` | number | 1 | Ukuran minimum partikel (dalam pixel) |
| `maxSize` | number | 3 | Ukuran maksimum partikel (dalam pixel) |
| `speed` | number | 4 | Kecepatan animasi opacity (1-10) |
| `particleColor` | string | "#ffffff" | Warna partikel (hex color) |
| `particleDensity` | number | 120 | Jumlah partikel (50-2000) |

#### Contoh Penggunaan:

**Hero Section dengan Sparkles:**
```javascript
<div className="relative h-64">
  <h1 className="relative z-10">Judul Anda</h1>
  
  <SparklesCore
    background="transparent"
    minSize={0.4}
    maxSize={1}
    particleDensity={800}
    particleColor="#a78bfa"
    speed={0.5}
    className="absolute inset-0"
  />
</div>
```

**Background Subtle:**
```javascript
<div className="relative">
  <div className="absolute inset-0 opacity-30">
    <SparklesCore
      background="transparent"
      minSize={0.3}
      maxSize={0.8}
      particleDensity={50}
      particleColor="#a78bfa"
      speed={0.3}
    />
  </div>
  
  <div className="relative z-10">
    {/* Konten Anda */}
  </div>
</div>
```

#### Tips Performa:
- Untuk background subtle, gunakan `particleDensity` rendah (50-100)
- Untuk efek dramatis, gunakan `particleDensity` tinggi (500-1000)
- Kurangi density di mobile untuk performa lebih baik
- Gunakan `opacity` untuk mengontrol intensitas efek

---

### 2. 🌊 BackgroundBeams

Komponen efek garis-garis animasi gradient yang dinamis dan futuristik.

#### Import:
```javascript
import { BackgroundBeams } from "./components/ui/background-beams";
```

#### Penggunaan Dasar:
```javascript
<div className="relative">
  <BackgroundBeams className="absolute inset-0" />
  
  <div className="relative z-10">
    {/* Konten Anda */}
  </div>
</div>
```

#### Props:

| Prop | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| `className` | string | - | Class CSS tambahan |

#### Contoh Penggunaan:

**Card dengan Background Beams:**
```javascript
<div className="relative overflow-hidden rounded-2xl p-8">
  <BackgroundBeams className="absolute inset-0 z-0" />
  
  <div className="relative z-10">
    <h2>Judul Card</h2>
    <p>Konten card Anda di sini</p>
  </div>
</div>
```

**Section dengan Beams:**
```javascript
<section className="relative py-16">
  <BackgroundBeams />
  
  <div className="relative z-10 container mx-auto">
    {/* Konten section */}
  </div>
</section>
```

#### Catatan Penting:
- ⚠️ Parent element harus memiliki `position: relative`
- ⚠️ Parent element harus memiliki `overflow: hidden` untuk clip beams
- ⚠️ Konten harus memiliki `z-index` lebih tinggi dari beams
- ✅ Komponen sudah di-optimize dengan `React.memo`

---

### 3. 📝 Input

Komponen input field yang konsisten dengan design system.

#### Import:
```javascript
import { Input } from "./components/ui/input";
```

#### Penggunaan Dasar:
```javascript
<Input 
  type="email" 
  placeholder="email@example.com"
  className="w-full"
/>
```

#### Props:

Mendukung semua props HTML input standar, plus:

| Prop | Tipe | Default | Deskripsi |
|------|------|---------|-----------|
| `className` | string | - | Class CSS tambahan |
| `type` | string | "text" | Tipe input (text, email, password, dll) |

#### Contoh Penggunaan:

**Form Contact:**
```javascript
<form className="space-y-4">
  <Input 
    type="text" 
    placeholder="Nama Anda"
    required
  />
  
  <Input 
    type="email" 
    placeholder="Email Anda"
    required
  />
  
  <Input 
    type="tel" 
    placeholder="Nomor Telepon"
  />
</form>
```

**Input dengan Label:**
```javascript
<div className="space-y-2">
  <label htmlFor="email">Email Address</label>
  <Input 
    id="email"
    type="email" 
    placeholder="you@example.com"
  />
</div>
```

---

## 🎨 Styling & Theming

Semua komponen mendukung CSS variables untuk theming:

```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1a1a1a;
  --text-secondary: #4a5568;
  --violet-primary: #7c3aed;
  --violet-secondary: #8b5cf6;
}

.dark {
  --bg-primary: #0b0414;
  --bg-secondary: #1a0b2e;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --violet-primary: #a78bfa;
  --violet-secondary: #c4b5fd;
}
```

---

## 🚀 Best Practices

### 1. **Performa**
- Gunakan `particleDensity` rendah untuk background
- Kurangi density di mobile devices
- Gunakan `React.memo` untuk komponen yang sering re-render

### 2. **Accessibility**
- Pastikan konten tetap readable dengan background effects
- Gunakan opacity untuk mengontrol intensitas
- Test dengan screen readers

### 3. **Responsive Design**
- Test di berbagai ukuran layar
- Sesuaikan density untuk mobile
- Gunakan Tailwind responsive classes

### 4. **Z-Index Management**
```javascript
// Background effects
<BackgroundBeams className="z-0" />

// Content
<div className="relative z-10">
  {/* Konten */}
</div>
```

---

## 🐛 Troubleshooting

### Partikel tidak muncul?
- ✅ Pastikan parent element memiliki height yang jelas
- ✅ Check apakah `background` prop diset ke "transparent"
- ✅ Pastikan z-index tidak tertutup element lain

### Beams terpotong?
- ✅ Tambahkan `overflow: hidden` ke parent element
- ✅ Pastikan parent memiliki `position: relative`

### Performa lambat?
- ✅ Kurangi `particleDensity`
- ✅ Kurangi `maxSize` partikel
- ✅ Gunakan `speed` lebih rendah

---

## 📚 Dependencies

Komponen-komponen ini membutuhkan:

```json
{
  "@tsparticles/react": "^3.0.0",
  "@tsparticles/slim": "^3.0.0",
  "@tsparticles/engine": "^3.0.0",
  "framer-motion": "^10.18.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

---

## 🎯 Contoh Lengkap

Lihat implementasi lengkap di `src/App.js`:
- Hero Section dengan SparklesCore (line ~1628)
- Web Stress Testing Section dengan SparklesCore (line ~618)
- CTA Section dengan BackgroundBeams (line ~1104)
- Testimonials Section dengan Marquee (line ~1764)
- Proven Attack Results dengan ShaderLines (line ~830)

---

## 🆕 Komponen Terbaru (Fase 3)

### 7. 🌊 ShaderLines

Komponen shader effect dengan Three.js untuk efek visual yang menakjubkan.

#### Import:
```javascript
import { ShaderLines } from "./components/ui/shader-lines";
```

#### Penggunaan:
```javascript
<div className="relative h-20">
  <ShaderLines />
  <h1 className="relative z-10">Teks dengan Shader Background</h1>
</div>
```

#### Fitur:
- ✅ Three.js loaded via CDN (tidak menambah bundle size)
- ✅ GPU-accelerated rendering
- ✅ Auto-resize responsive
- ✅ Violet/purple theme optimized
- ✅ Proper cleanup untuk prevent memory leaks

#### Performance:
- Bundle size impact: ~1.5KB (hanya wrapper code)
- Three.js loaded dynamically dari CDN
- Optimized untuk mobile dengan pixel ratio limit

---

### 8. 💬 TestimonialsWithMarquee

Section testimonial dengan marquee animation yang smooth.

#### Import:
```javascript
import { TestimonialsWithMarquee } from "./components/ui/testimonials-with-marquee";
```

#### Penggunaan:
```javascript
<TestimonialsWithMarquee
  title="What Clients Say"
  subtitle="Trusted by developers worldwide"
  testimonials={[
    {
      name: "John Doe",
      role: "CTO",
      company: "TechCorp",
      content: "Amazing work!",
      avatar: "https://...",
      rating: 5,
    }
  ]}
/>
```

#### Fitur:
- ✅ Dual row marquee (scroll kanan & kiri)
- ✅ Pause on hover
- ✅ Responsive design
- ✅ SEO-friendly
- ✅ Enhanced padding untuk breathing space

---

### 9. 🔘 MetalButton & LiquidButton

Button dengan efek metallic dan liquid glass yang modern.

#### Import:
```javascript
import { MetalButton, LiquidButton } from "./components/ui/liquid-glass-button";
```

#### Penggunaan MetalButton:
```javascript
<MetalButton variant="violet">
  Click Me
</MetalButton>
```

#### Variants:
- `default` - Silver metallic
- `violet` - Violet/purple metallic (sesuai tema)
- `primary` - Primary color
- `success` - Green
- `error` - Red
- `gold` - Gold
- `bronze` - Bronze

#### Fitur:
- ✅ Interactive press & hover states
- ✅ Touch device detection
- ✅ Smooth animations
- ✅ Accessible

---

## 📊 Bundle Size Impact

**Total penambahan dari semua komponen:**
- JavaScript: +10.15 KB gzipped
- CSS: +2.27 KB gzipped
- **Total: ~12.42 KB** ✅

**Breakdown:**
- SparklesCore & BackgroundBeams: +6.37 KB
- Testimonials & Buttons: +2.26 KB
- ShaderLines: +1.52 KB

**Catatan:** ShaderLines menggunakan Three.js via CDN, jadi tidak menambah bundle size secara signifikan.

---

**Dibuat dengan ❤️ untuk Portfolio Tama EL Pablo**
**Last Updated:** Implementasi Fase 3 - Enhanced UI Components

