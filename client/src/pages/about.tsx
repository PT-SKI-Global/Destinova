import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Target, Users, Award, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="h-12 w-12 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">
                PT. Sentra Karya Integrasi Global
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Mitra terpercaya dalam solusi teknologi dan pengembangan karier untuk Indonesia
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        {/* Company Overview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Tentang Kami</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-4">
              PT. Sentra Karya Integrasi Global (PT SKI Global) adalah perusahaan yang berkomitmen untuk memberikan 
              solusi inovatif dalam pengembangan sumber daya manusia dan teknologi di Indonesia. Kami berfokus pada 
              pemberdayaan generasi muda melalui platform digital yang membantu mereka membuat keputusan karier dan 
              pendidikan yang lebih baik.
            </p>
            <p className="text-lg leading-relaxed">
              Dengan memanfaatkan teknologi AI dan data analytics, kami menghadirkan Destinova - platform simulasi 
              keputusan karier yang membantu pengguna memvisualisasikan berbagai jalur karier, memahami potensi diri, 
              dan merencanakan masa depan dengan lebih percaya diri.
            </p>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Visi Kami</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p className="leading-relaxed">
                Menjadi perusahaan terdepan dalam penyediaan solusi teknologi untuk pengembangan karier dan 
                pendidikan di Indonesia, membantu jutaan individu mencapai potensi maksimal mereka.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Misi Kami</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="space-y-3">
                <li className="flex gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Mengembangkan platform teknologi yang mudah diakses dan bermanfaat</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Memberikan insights berbasis data untuk keputusan karier yang lebih baik</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Memberdayakan generasi muda Indonesia dengan tools dan knowledge yang tepat</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Berkontribusi pada peningkatan kualitas SDM Indonesia</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Nilai-Nilai Kami</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Inovasi</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Terus berinovasi menggunakan teknologi terkini untuk memberikan solusi terbaik bagi pengguna kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Integritas</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Berkomitmen pada transparansi, kejujuran, dan etika bisnis yang tinggi dalam setiap aspek layanan kami.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Pemberdayaan</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Fokus pada pemberdayaan individu dengan memberikan tools, insights, dan dukungan yang mereka butuhkan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Kolaborasi</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Membangun kemitraan strategis dan bekerja sama dengan berbagai stakeholder untuk dampak yang lebih luas.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Aksesibilitas</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Memastikan layanan kami dapat diakses oleh semua kalangan dengan interface yang user-friendly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Dampak Sosial</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Berkomitmen memberikan kontribusi positif bagi pengembangan sumber daya manusia Indonesia.
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
