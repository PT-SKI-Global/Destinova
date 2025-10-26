import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Target, Users, Award, Mail, Phone, MapPin, BookOpen, Printer, TrendingUp, Film, Package, Cpu, Radio, Sprout, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                PT. Sentra Karya Integrasi Global
              </h1>
            </div>
            <p className="text-2xl font-semibold mb-4">
              Integrating Innovation for a Better Future
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Mewujudkan sinergi antar bidang untuk membangun masa depan yang lebih berdaya. 
              Kami percaya, setiap ide punya potensi besar. Saat ide-ide itu saling terhubung, 
              lahirlah inovasi yang menciptakan terobosan produk.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mt-4">
              Itulah makna <span className="font-semibold text-foreground">"Integrating Innovation"</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Nilai Inti (Core Values)</h2>
          <p className="text-xl text-center mb-8">
            🌟 <span className="font-semibold">Kolaborasi. Berkarya. Pemberdayaan. Keberlanjutan.</span>
          </p>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Empat pilar utama yang menjadi dasar langkah kami dalam setiap bidang bisnis.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Kolaborasi</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                <p>
                  Membangun kemitraan strategis dan sinergi antar bidang untuk menciptakan dampak yang lebih besar.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Berkarya</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                <p>
                  Menghasilkan produk dan layanan berkualitas tinggi yang memberikan nilai nyata bagi pelanggan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Pemberdayaan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                <p>
                  Memberikan tools dan knowledge untuk mengembangkan potensi individu dan organisasi.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-center">Keberlanjutan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-center">
                <p>
                  Membangun bisnis yang bertanggung jawab dan berkelanjutan untuk masa depan yang lebih baik.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Empat Pilar Bisnis */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">Empat Pilar Bisnis</h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Integrasi (4) bidang, (1) visi. Kami menghubungkan dunia kreatif, teknologi, dan pertanian.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Penerbitan, Percetakan & Konsultan Manajemen */}
            <Card className="border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">Penerbitan, Percetakan & Konsultan Manajemen</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 text-muted-foreground">
                  <Printer className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-foreground">
                    📚 Dari ide menjadi inspirasi, dari konsep menjadi karya nyata.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Kami bukan hanya mencetak — kami menginspirasi.
                </p>
                <p className="text-muted-foreground">
                  Melalui penerbitan dan konsultan manajemen, kami membantu individu dan perusahaan membangun citra, 
                  strategi, dan nilai yang berdampak.
                </p>
              </CardContent>
            </Card>

            {/* Multimedia & Packaging */}
            <Card className="border-slate-400/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    <Film className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                  </div>
                  <CardTitle className="text-xl">Multimedia & Produk Packaging</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 text-muted-foreground">
                  <Package className="h-5 w-5 text-slate-600 dark:text-slate-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-foreground">
                    🎬 Desain, animasi, dan kemasan kreatif yang bercerita.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Kami menciptakan visual yang kuat untuk memperkuat identitas brand Anda.
                </p>
                <p className="text-muted-foreground">
                  Karena kemasan yang baik bukan hanya membungkus produk, tapi menghidupkan makna di baliknya.
                </p>
              </CardContent>
            </Card>

            {/* Teknologi & Telematika */}
            <Card className="border-blue-500/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">Teknologi & Telematika</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 text-muted-foreground">
                  <Radio className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-foreground">
                    💻 Solusi digital yang menghubungkan ide, data, dan manusia.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Inovasi kami bergerak dari sistem informasi hingga jaringan komunikasi terpadu.
                </p>
                <p className="text-muted-foreground">
                  Mewujudkan dunia yang lebih efisien dan terkoneksi.
                </p>
              </CardContent>
            </Card>

            {/* Agrobisnis & Export */}
            <Card className="border-green-500/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <Sprout className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-xl">Agrobisnis & Export</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 text-muted-foreground">
                  <Globe className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="font-semibold text-foreground">
                    🌾 Masa depan bangsa tumbuh dari tanah yang diberdayakan.
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Melalui inovasi, riset, dan kemitraan strategis, kami membangun rantai pasok agrobisnis modern yang 
                  siap berkompetisi di pasar internasional.
                </p>
                <p className="text-muted-foreground">
                  Dari hasil bumi lokal hingga produk turunan bernilai tinggi, kami hadir untuk menghubungkan potensi 
                  Indonesia dengan dunia.
                </p>
                <p className="text-sm text-muted-foreground italic">
                  Visi kami: menciptakan ekosistem agrobisnis yang produktif, berkelanjutan, dan mendunia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Products & Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Produk & Layanan Kami</h2>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Destinova - AI Career Planning Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                Platform unggulan kami yang membantu pengguna membuat keputusan karier dan pendidikan yang lebih baik 
                melalui teknologi AI dan data analytics.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Fitur Utama:</h4>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Tes Kepribadian MBTI Profesional</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Simulasi Skenario Karier dengan AI</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Rekomendasi Karier Tahan Resesi</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Analisis Skills dengan ROI Tinggi</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Manfaat:</h4>
                  <ul className="space-y-2">
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Keputusan karier lebih terarah</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Pemahaman mendalam tentang potensi diri</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Rekomendasi side hustle & income optimization</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>Budget-friendly training paths</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Hubungi Kami</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Email</h4>
                    <a 
                      href="mailto:inkspiredpublished@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-email-contact"
                    >
                      inkspiredpublished@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">WhatsApp</h4>
                    <a 
                      href="https://wa.me/6285117076160" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="link-whatsapp-about"
                    >
                      +62 851-1707-6160
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Lokasi</h4>
                    <p className="text-muted-foreground">
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild data-testid="button-start-destinova">
                    <a href="/simulation">
                      Mulai Gunakan Destinova
                    </a>
                  </Button>
                  <Button variant="outline" asChild data-testid="button-whatsapp-contact">
                    <a 
                      href="https://wa.me/6285117076160" 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Hubungi via WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team/Why Choose Us */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Mengapa Memilih Kami?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle>Berpengalaman & Terpercaya</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Tim kami terdiri dari profesional berpengalaman di bidang teknologi, HR, dan pengembangan karier 
                  yang memahami kebutuhan pasar Indonesia.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-primary" />
                  <CardTitle>Fokus pada Hasil</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Kami berkomitmen memberikan solusi yang tidak hanya inovatif, tetapi juga benar-benar memberikan 
                  dampak positif bagi pengembangan karier pengguna.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building2 className="h-6 w-6 text-primary" />
                  <CardTitle>Teknologi AI Terkini</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Memanfaatkan artificial intelligence dan machine learning untuk memberikan rekomendasi yang 
                  akurat dan personalized untuk setiap pengguna.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-primary" />
                  <CardTitle>Gratis untuk MVP</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Semua fitur PRO Psikotes kami tersedia gratis selama periode MVP untuk memaksimalkan manfaat 
                  bagi pengguna Indonesia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
