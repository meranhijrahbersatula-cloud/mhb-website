# 🌙 Panduan Deploy Website MHB ke GitHub Pages

## Persiapan Awal

### 1. Install Node.js & Git
- Download Node.js: https://nodejs.org (pilih versi LTS)
- Download Git: https://git-scm.com

### 2. Buat Akun GitHub
- Daftar di https://github.com
- Buat repository baru dengan nama: `mhb-website`
- Set visibility ke **Public**

---

## Langkah Deploy

### Step 1 — Setup Project
```bash
# Extract file zip yang sudah didownload ke folder, lalu masuk ke folder
cd mhb-website-build

# Install dependencies
npm install
```

### Step 2 — Konfigurasi Vite untuk GitHub Pages
Edit file `vite.config.js`, tambahkan `base`:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mhb-website/',  // ganti dengan nama repo GitHub kamu
})
```

### Step 3 — Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 4 — Tambahkan Script di package.json
Buka `package.json`, tambahkan di bagian `"scripts"`:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```
Dan tambahkan di luar scripts:
```json
"homepage": "https://USERNAME.github.io/mhb-website"
```
(Ganti USERNAME dengan username GitHub kamu)

### Step 5 — Push ke GitHub
```bash
git init
git add .
git commit -m "Website MHB - Initial commit"
git remote add origin https://github.com/USERNAME/mhb-website.git
git branch -M main
git push -u origin main
```

### Step 6 — Deploy!
```bash
npm run deploy
```

### Step 7 — Aktifkan GitHub Pages
1. Buka repository di GitHub
2. Klik **Settings** → **Pages**
3. Source: pilih branch `gh-pages`
4. Klik **Save**

✅ Website kamu akan live di:
**https://USERNAME.github.io/mhb-website**

---

## Update Website

Setiap kali ada perubahan:
```bash
npm run deploy
```

---

## Kustomisasi Konten

Edit file `src/App.jsx`:
- **Nomor HP/WhatsApp**: Tambahkan di bagian kontak
- **Foto kegiatan**: Ganti section galeri dengan `<img>` dari folder `/public`
- **Anggota baru**: Update angka di array `STATS`
- **Kegiatan baru**: Tambahkan item di array `KEGIATAN`

---

## Tambah Foto Galeri

1. Taruh foto di folder `public/galeri/`
2. Di `App.jsx`, ganti icon galeri dengan:
```jsx
<img src="/mhb-website/galeri/nama-foto.jpg" 
     style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:16}} 
     alt="Kegiatan MHB" />
```

---

## Domain Custom (Opsional)

Kalau mau pakai domain sendiri (misal: mhb-community.org):
1. Beli domain di Niagahoster/Rumahweb
2. Di GitHub Pages settings → tambahkan Custom Domain
3. Ikuti instruksi DNS yang diberikan GitHub

---

*Dibuat dengan ❤️ untuk Komunitas Meran Hijrah Bersatu*
