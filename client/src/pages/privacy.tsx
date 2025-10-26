import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <h1 className="text-4xl font-bold mb-8">Kebijakan Privasi</h1>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi yang Kami Kumpulkan</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Destinova mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informasi profil (nama, email, tingkat pendidikan)</li>
                <li>Hasil tes kepribadian MBTI</li>
                <li>Data simulasi karier dan pendidikan yang Anda buat</li>
                <li>Preferensi dan minat karier</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Penggunaan Informasi</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Kami menggunakan informasi yang dikumpulkan untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menyediakan rekomendasi karier dan pendidikan yang dipersonalisasi</li>
                <li>Menganalisis kepribadian Anda menggunakan framework MBTI</li>
                <li>Membuat simulasi skenario karier dengan AI</li>
                <li>Meningkatkan layanan dan pengalaman pengguna</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keamanan Data</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Data Anda disimpan dengan aman menggunakan enkripsi dan protokol keamanan standar industri.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Berbagi Informasi</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Kami tidak menjual atau membagikan informasi pribadi Anda kepada pihak ketiga untuk tujuan pemasaran. Informasi Anda hanya digunakan untuk memberikan layanan Destinova yang lebih baik kepada Anda.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hak Anda</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Anda memiliki hak untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mengakses dan memperbarui informasi pribadi Anda</li>
                <li>Menghapus akun dan data Anda</li>
                <li>Mengunduh data Anda</li>
                <li>Menolak penggunaan data untuk tujuan tertentu</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kontak</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi kami:
              </p>
              <p className="mt-4 font-semibold">
                PT. Sentra Karya Integrasi Global<br />
                Email: inkspiredpublished@gmail.com
              </p>
            </CardContent>
          </Card>

          <p className="text-sm text-muted-foreground text-center pt-8">
            Terakhir diperbarui: Oktober 2025
          </p>
        </div>
      </div>
    </div>
  );
}
