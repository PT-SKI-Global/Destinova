# Destinova 🎯

**AI-Powered Career & Education Decision Simulation Platform**

Platform simulasi keputusan karier dan pendidikan berbasis AI untuk pengguna Indonesia, dikembangkan oleh **PT. Sentra Karya Integrasi Global**.

![Destinova](https://img.shields.io/badge/Status-MVP-brightgreen)
![License](https://img.shields.io/badge/License-Proprietary-blue)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Express%20%7C%20PostgreSQL-orange)

## 🌟 Tentang Destinova

Destinova membantu generasi muda Indonesia membuat keputusan penting tentang karier dan pendidikan melalui:

- 🧠 **Analisis Kepribadian** - Tes MBTI 16 pertanyaan untuk memahami tipe kepribadian Anda
- 🤖 **Simulasi AI** - Skenario karier realistis yang dipersonalisasi menggunakan AI
- 💼 **PRO Psikotes** - Rekomendasi karier tahan resesi, skill hemat biaya, dan peluang side hustle
- 📊 **Analisis Mendalam** - Enneagram, Jungian Cognitive Functions, dan strategi optimasi income
- 📈 **Perbandingan Skenario** - Bandingkan berbagai pilihan karier secara side-by-side

## 🚀 Fitur Utama

### 1. Personality Quiz (MBTI)
- 16 pertanyaan untuk menentukan tipe MBTI
- Analisis kepribadian comprehensive
- Rekomendasi karier berdasarkan tipe kepribadian

### 2. AI Career Simulation
- Scenario generation menggunakan OpenAI GPT
- Personalisasi berdasarkan:
  - Tipe kepribadian
  - Level pendidikan
  - Interest dan goals
- Action plans yang actionable

### 3. PRO Psikotes Features (FREE untuk MVP)
- **Recession-Proof Careers**: Karier dengan resistance score 75-98%
- **Cost-Effective Skills**: Skills dengan ROI 85-95% yang bisa dipelajari gratis/murah
- **Side Hustle Opportunities**: Peluang income tambahan dengan startup cost rendah
- **Enneagram Analysis**: Core motivations dan workplace behavior
- **Jungian Functions**: Dominant, auxiliary, tertiary, inferior function stack
- **Income Optimization**: Strategi berbasis kepribadian untuk career advancement

### 4. Scenario Comparison
- Side-by-side comparison hingga 3 skenario
- Metrics comparison: salary, fit score, time investment
- Visual comparison dengan charts

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **AI**: OpenAI GPT (via Replit AI Integrations)

### Design System
- **Typography**: Inter (primary), JetBrains Mono (monospace)
- **Theme**: Light/Dark mode support
- **Colors**: Purple/Teal vibrant color scheme
- **Design Philosophy**: Material Design + LinkedIn-inspired

## 📋 Prerequisites

- Node.js 18+
- PostgreSQL database
- OpenAI API access (via Replit integration)

## 🏃‍♂️ Installation & Setup

1. **Clone repository**
   ```bash
   git clone https://github.com/ideathings/destinova.git
   cd destinova
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create `.env` file:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
   ```

4. **Initialize database**
   ```bash
   npm run db:push
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open application**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
destinova/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and helpers
│   │   └── App.tsx       # Main app component
├── server/                # Backend Express application
│   ├── routes.ts         # API routes
│   ├── personality.ts    # MBTI & PRO Psikotes logic
│   └── storage.ts        # Database operations
├── shared/               # Shared types and schemas
│   └── schema.ts        # Drizzle database schema
└── package.json
```

## 🎨 Design Principles

1. **Clarity Over Cleverness** - Instant comprehension
2. **Progressive Disclosure** - Complex data in digestible layers
3. **Actionable Confidence** - Empower next steps
4. **Data-Driven Hierarchy** - Critical metrics prominent

## 🔒 Privacy & Security

- User data protected dengan encryption
- Session management dengan PostgreSQL
- Secure authentication (in development)
- Compliance dengan privacy regulations

## 📄 License

Proprietary - © 2025 PT. Sentra Karya Integrasi Global. All rights reserved.

## 🏢 About PT. Sentra Karya Integrasi Global

**Tagline**: *Integrating Innovation for a Better Future*

PT. Sentra Karya Integrasi Global adalah perusahaan yang bergerak di 4 pilar bisnis:

1. **📚 Penerbitan, Percetakan & Konsultan Manajemen**
2. **🎬 Multimedia & Produk Packaging**
3. **💻 Teknologi & Telematika**
4. **🌾 Agrobisnis & Export**

### Nilai Inti
- **Kolaborasi** - Membangun sinergi antar bidang
- **Berkarya** - Menghasilkan produk berkualitas
- **Pemberdayaan** - Memberikan tools dan knowledge
- **Keberlanjutan** - Bisnis yang bertanggung jawab

## 📞 Contact

**PT. Sentra Karya Integrasi Global**

- 📧 Email: inkspiredpublished@gmail.com
- 📱 WhatsApp: +62 851-1707-6160
- 🌐 Website: [Destinova](https://destinova.replit.app)

## 🙏 Acknowledgments

- OpenAI for GPT technology
- Replit for development platform
- Indonesian tech community

---

**Made with ❤️ in Indonesia**

*Empowering Indonesian youth to make better career and education decisions*
