# 📤 Cara Push Code ke GitHub

Repository GitHub sudah dibuat di: **https://github.com/ideathings/destinova**

## 🚀 Cara Cepat (Recommended)

### Opsi 1: Gunakan Script Otomatis

1. Buka **Shell** di Replit (tab Shell di bagian bawah atau samping)

2. Jalankan script:
   ```bash
   ./push-to-github.sh
   ```

3. Jika diminta authentication:
   - Username: `ideathings`
   - Password: Gunakan **Personal Access Token** (bukan password biasa)

### Opsi 2: Manual Commands

Jika script tidak bekerja, jalankan commands berikut di **Shell**:

```bash
# 1. Configure git
git config user.email "inkspiredpublished@gmail.com"
git config user.name "PT. Sentra Karya Integrasi Global"

# 2. Setup remote
git remote remove origin 2>/dev/null
git remote add origin https://github.com/ideathings/destinova.git

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: Destinova AI Career & Education Platform"

# 5. Push to GitHub
git push -u origin main
```

## 🔐 Cara Buat Personal Access Token (Jika Diperlukan)

Jika diminta password saat push, GitHub memerlukan **Personal Access Token**:

1. Buka: https://github.com/settings/tokens

2. Klik **"Generate new token"** → **"Generate new token (classic)"**

3. Atur settings:
   - **Note**: `Destinova Replit Push`
   - **Expiration**: 90 days (atau sesuai kebutuhan)
   - **Scopes**: Centang ✅ **repo** (semua sub-options)

4. Klik **"Generate token"**

5. **COPY token** yang muncul (hanya muncul sekali!)

6. Saat push, paste token sebagai password

## 📋 Files yang Akan Dipush

✅ **Frontend (React + TypeScript)**
- Home page dengan hero section
- Personality Quiz (MBTI)
- Simulation page (AI scenarios)
- Results page (PRO Psikotes features)
- Comparison page
- About Us (4 Business Pillars)
- Privacy Policy
- Terms & Conditions

✅ **Backend (Express.js)**
- API routes
- MBTI personality calculation
- PRO Psikotes logic
- Database schema (Drizzle ORM)
- OpenAI integration

✅ **Documentation**
- README.md (comprehensive docs)
- This instruction file

✅ **Configuration**
- package.json
- tsconfig.json
- tailwind.config.ts
- vite.config.ts
- drizzle.config.ts

## ✨ Setelah Push Berhasil

Repository akan berisi:
- ✅ Full source code Destinova
- ✅ Documentation lengkap
- ✅ Setup instructions
- ✅ Company profile PT. SKI Global

Anda bisa:
1. View di: https://github.com/ideathings/destinova
2. Clone untuk development lain
3. Share dengan team
4. Setup CI/CD (optional)

## ❓ Troubleshooting

**Error: "failed to push"**
→ Pastikan menggunakan Personal Access Token, bukan password

**Error: "remote origin already exists"**
→ Jalankan: `git remote remove origin` dulu

**Error: "nothing to commit"**
→ Normal, artinya sudah ter-commit. Langsung `git push`

**Error: "Permission denied"**
→ Pastikan token memiliki permission `repo`

## 📞 Support

Jika ada masalah, hubungi:
- Email: inkspiredpublished@gmail.com
- WhatsApp: +62 851-1707-6160

---

**Good luck! 🚀**
