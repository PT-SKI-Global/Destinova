import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <h1 className="text-4xl font-bold mb-4">Syarat dan Ketentuan</h1>
        <p className="text-muted-foreground mb-8">
          Terakhir diperbarui: Oktober 2025
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            Dengan menggunakan layanan Destinova, Anda menyetujui syarat dan ketentuan yang tercantum di bawah ini. 
            Harap baca dengan saksama sebelum menggunakan platform kami.
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Penerimaan Syarat */}
          <Card>
            <CardHeader>
              <CardTitle>1. Penerimaan Syarat</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Dengan mengakses dan menggunakan platform Destinova ("Layanan"), yang dioperasikan oleh PT. Sentra Karya 
                Integrasi Global ("Perusahaan", "kami", "milik kami"), Anda setuju untuk terikat oleh Syarat dan Ketentuan 
                ini. Jika Anda tidak setuju dengan syarat ini, mohon untuk tidak menggunakan Layanan kami.
              </p>
              <p>
                Syarat dan Ketentuan ini berlaku untuk semua pengguna Layanan, termasuk namun tidak terbatas pada pengguna 
                yang hanya menjelajah, pengguna terdaftar, dan pengguna yang berkontribusi konten.
              </p>
            </CardContent>
          </Card>

          {/* Penggunaan Layanan */}
          <Card>
            <CardHeader>
              <CardTitle>2. Penggunaan Layanan</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-foreground">2.1. Kelayakan:</span> Anda harus berusia minimal 13 tahun 
                untuk menggunakan Layanan ini. Jika Anda berusia di bawah 18 tahun, Anda harus mendapatkan izin dari orang 
                tua atau wali untuk menggunakan Layanan.
              </p>
              <p>
                <span className="font-semibold text-foreground">2.2. Akun Pengguna:</span> Untuk mengakses fitur tertentu, 
                Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda dan 
                untuk semua aktivitas yang terjadi di bawah akun Anda.
              </p>
              <p>
                <span className="font-semibold text-foreground">2.3. Penggunaan yang Dilarang:</span> Anda setuju untuk tidak:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Menggunakan Layanan untuk tujuan ilegal atau tidak sah</li>
                <li>Mencoba mendapatkan akses tidak sah ke sistem atau jaringan kami</li>
                <li>Mengganggu atau merusak integritas atau kinerja Layanan</li>
                <li>Menggunakan robot, spider, atau alat otomatis lainnya untuk mengakses Layanan</li>
                <li>Mengirimkan virus, malware, atau kode berbahaya lainnya</li>
                <li>Menyalahgunakan atau mengeksploitasi bug atau celah keamanan</li>
              </ul>
            </CardContent>
          </Card>

          {/* Hak Kekayaan Intelektual */}
          <Card>
            <CardHeader>
              <CardTitle>3. Hak Kekayaan Intelektual</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-foreground">3.1. Kepemilikan:</span> Semua konten yang tersedia melalui 
                Layanan, termasuk teks, grafik, logo, ikon, gambar, klip audio, unduhan digital, kompilasi data, dan perangkat 
                lunak, adalah milik PT. Sentra Karya Integrasi Global atau pemberi lisensinya dan dilindungi oleh undang-undang 
                hak cipta Indonesia dan internasional.
              </p>
              <p>
                <span className="font-semibold text-foreground">3.2. Lisensi Terbatas:</span> Kami memberikan Anda lisensi 
                terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk mengakses dan menggunakan Layanan untuk 
                penggunaan pribadi dan non-komersial.
              </p>
              <p>
                <span className="font-semibold text-foreground">3.3. Konten Pengguna:</span> Dengan mengirimkan atau 
                memposting konten melalui Layanan, Anda memberikan kami lisensi non-eksklusif, bebas royalti, perpetual, 
                dan dapat dialihkan untuk menggunakan, mereproduksi, memodifikasi, dan menampilkan konten tersebut dalam 
                kaitannya dengan pengoperasian Layanan.
              </p>
            </CardContent>
          </Card>

          {/* Layanan AI dan Rekomendasi */}
          <Card>
            <CardHeader>
              <CardTitle>4. Layanan AI dan Rekomendasi</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-foreground">4.1. Sifat Rekomendasi:</span> Destinova menggunakan 
                teknologi AI untuk memberikan rekomendasi karier dan pendidikan. Rekomendasi ini bersifat informatif dan 
                tidak boleh dianggap sebagai nasihat profesional, hukum, atau karier yang definitif.
              </p>
              <p>
                <span className="font-semibold text-foreground">4.2. Akurasi:</span> Meskipun kami berusaha memberikan 
                informasi yang akurat dan terkini, kami tidak menjamin keakuratan, kelengkapan, atau keandalan konten atau 
                rekomendasi yang dihasilkan oleh Layanan.
              </p>
              <p>
                <span className="font-semibold text-foreground">4.3. Keputusan Pengguna:</span> Anda bertanggung jawab penuh 
                atas keputusan yang Anda buat berdasarkan informasi atau rekomendasi dari Layanan kami. Kami menyarankan Anda 
                untuk berkonsultasi dengan profesional yang berkualifikasi sebelum membuat keputusan penting tentang karier 
                atau pendidikan.
              </p>
            </CardContent>
          </Card>

          {/* Privasi dan Data */}
          <Card>
            <CardHeader>
              <CardTitle>5. Privasi dan Penggunaan Data</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Penggunaan informasi pribadi Anda diatur oleh Kebijakan Privasi kami. Dengan menggunakan Layanan, Anda 
                menyetujui pengumpulan dan penggunaan informasi sesuai dengan Kebijakan Privasi kami.
              </p>
              <p>
                Kami dapat menggunakan data agregat dan anonim untuk meningkatkan Layanan kami, mengembangkan fitur baru, 
                dan untuk tujuan penelitian dan analisis.
              </p>
            </CardContent>
          </Card>

          {/* Pembayaran dan Langganan */}
          <Card>
            <CardHeader>
              <CardTitle>6. Pembayaran dan Langganan</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-foreground">6.1. Layanan Gratis:</span> Saat ini, semua fitur PRO 
                Psikotes tersedia gratis selama periode MVP (Minimum Viable Product).
              </p>
              <p>
                <span className="font-semibold text-foreground">6.2. Perubahan di Masa Depan:</span> Kami berhak untuk 
                memperkenalkan layanan berbayar di masa depan. Pengguna akan diberitahu terlebih dahulu tentang perubahan 
                struktur harga atau model bisnis.
              </p>
              <p>
                <span className="font-semibold text-foreground">6.3. Pembatalan:</span> Jika layanan berbayar diperkenalkan, 
                pengguna berhak membatalkan langganan mereka kapan saja sesuai dengan syarat yang berlaku pada saat itu.
              </p>
            </CardContent>
          </Card>

          {/* Penafian (Disclaimer) */}
          <Card>
            <CardHeader>
              <CardTitle>7. Penafian (Disclaimer)</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p className="uppercase font-semibold text-foreground">
                LAYANAN DISEDIAKAN "SEBAGAIMANA ADANYA" DAN "SEBAGAIMANA TERSEDIA" TANPA JAMINAN DALAM BENTUK APAPUN, 
                BAIK TERSURAT MAUPUN TERSIRAT.
              </p>
              <p>
                Kami tidak menjamin bahwa:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Layanan akan memenuhi kebutuhan atau harapan Anda</li>
                <li>Layanan akan tersedia tanpa gangguan, tepat waktu, aman, atau bebas dari kesalahan</li>
                <li>Hasil yang diperoleh dari penggunaan Layanan akan akurat atau dapat diandalkan</li>
                <li>Kualitas produk, layanan, informasi, atau materi lain yang diperoleh melalui Layanan akan memenuhi harapan Anda</li>
              </ul>
            </CardContent>
          </Card>

          {/* Pembatasan Tanggung Jawab */}
          <Card>
            <CardHeader>
              <CardTitle>8. Pembatasan Tanggung Jawab</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Sejauh diizinkan oleh hukum yang berlaku, PT. Sentra Karya Integrasi Global, direktur, karyawan, atau 
                afiliasinya tidak bertanggung jawab atas:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Kerugian tidak langsung, insidental, khusus, konsekuensial, atau hukuman</li>
                <li>Kehilangan keuntungan, pendapatan, data, atau penggunaan</li>
                <li>Kerusakan yang timbul dari penggunaan atau ketidakmampuan menggunakan Layanan</li>
                <li>Keputusan karier atau pendidikan yang dibuat berdasarkan informasi dari Layanan</li>
              </ul>
              <p>
                Tanggung jawab total kami kepada Anda untuk semua klaim yang berkaitan dengan Layanan tidak akan melebihi 
                jumlah yang Anda bayarkan kepada kami (jika ada) dalam 12 bulan sebelum klaim tersebut.
              </p>
            </CardContent>
          </Card>

          {/* Ganti Rugi */}
          <Card>
            <CardHeader>
              <CardTitle>9. Ganti Rugi</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Anda setuju untuk membela, mengganti rugi, dan membebaskan PT. Sentra Karya Integrasi Global, afiliasi, 
                dan personelnya dari dan terhadap semua klaim, kerusakan, kewajiban, kerugian, biaya, dan pengeluaran 
                (termasuk biaya pengacara yang wajar) yang timbul dari:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Penggunaan atau penyalahgunaan Layanan oleh Anda</li>
                <li>Pelanggaran Anda terhadap Syarat dan Ketentuan ini</li>
                <li>Pelanggaran Anda terhadap hak pihak ketiga manapun</li>
                <li>Konten yang Anda kirimkan atau posting melalui Layanan</li>
              </ul>
            </CardContent>
          </Card>

          {/* Perubahan Layanan dan Syarat */}
          <Card>
            <CardHeader>
              <CardTitle>10. Perubahan Layanan dan Syarat</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-foreground">10.1. Modifikasi Layanan:</span> Kami berhak untuk 
                memodifikasi, menangguhkan, atau menghentikan Layanan (atau bagian mana pun darinya) kapan saja dengan 
                atau tanpa pemberitahuan.
              </p>
              <p>
                <span className="font-semibold text-foreground">10.2. Perubahan Syarat:</span> Kami dapat memperbarui 
                Syarat dan Ketentuan ini dari waktu ke waktu. Perubahan material akan diumumkan melalui Layanan atau email. 
                Penggunaan Layanan yang berkelanjutan setelah perubahan tersebut merupakan persetujuan Anda terhadap Syarat 
                dan Ketentuan yang diperbarui.
              </p>
            </CardContent>
          </Card>

          {/* Penghentian */}
          <Card>
            <CardHeader>
              <CardTitle>11. Penghentian</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Kami berhak untuk menangguhkan atau menghentikan akses Anda ke Layanan kapan saja, dengan atau tanpa sebab, 
                dengan atau tanpa pemberitahuan, efektif segera. Semua ketentuan dalam Syarat dan Ketentuan ini yang menurut 
                sifatnya harus tetap berlaku setelah penghentian akan tetap berlaku, termasuk namun tidak terbatas pada 
                ketentuan kepemilikan, penafian jaminan, ganti rugi, dan pembatasan tanggung jawab.
              </p>
            </CardContent>
          </Card>

          {/* Hukum yang Berlaku */}
          <Card>
            <CardHeader>
              <CardTitle>12. Hukum yang Berlaku dan Penyelesaian Sengketa</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-foreground">12.1. Hukum yang Berlaku:</span> Syarat dan Ketentuan ini 
                diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia, tanpa memperhatikan prinsip-prinsip 
                konflik hukum.
              </p>
              <p>
                <span className="font-semibold text-foreground">12.2. Penyelesaian Sengketa:</span> Setiap perselisihan yang 
                timbul dari atau berkaitan dengan Syarat dan Ketentuan ini akan diselesaikan melalui negosiasi dengan itikad 
                baik. Jika negosiasi tidak berhasil, sengketa akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
              </p>
            </CardContent>
          </Card>

          {/* Ketentuan Umum */}
          <Card>
            <CardHeader>
              <CardTitle>13. Ketentuan Umum</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                <span className="font-semibold text-foreground">13.1. Keseluruhan Perjanjian:</span> Syarat dan Ketentuan 
                ini, bersama dengan Kebijakan Privasi kami, merupakan keseluruhan perjanjian antara Anda dan kami mengenai 
                Layanan.
              </p>
              <p>
                <span className="font-semibold text-foreground">13.2. Keterpisahan:</span> Jika ada ketentuan dalam Syarat 
                dan Ketentuan ini yang ditemukan tidak sah atau tidak dapat dilaksanakan, ketentuan tersebut akan dibatasi 
                atau dihilangkan sejauh yang diperlukan, dan ketentuan lainnya akan tetap berlaku penuh.
              </p>
              <p>
                <span className="font-semibold text-foreground">13.3. Pengesampingan:</span> Kegagalan kami untuk menegakkan 
                hak atau ketentuan dalam Syarat dan Ketentuan ini tidak akan dianggap sebagai pengesampingan hak atau ketentuan 
                tersebut.
              </p>
              <p>
                <span className="font-semibold text-foreground">13.4. Pengalihan:</span> Anda tidak dapat mengalihkan hak 
                atau kewajiban Anda berdasarkan Syarat dan Ketentuan ini tanpa persetujuan tertulis dari kami. Kami dapat 
                mengalihkan hak kami tanpa batasan.
              </p>
            </CardContent>
          </Card>

          {/* Kontak */}
          <Card>
            <CardHeader>
              <CardTitle>14. Hubungi Kami</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
              </p>
              <div className="space-y-2 font-semibold text-foreground">
                <p>PT. Sentra Karya Integrasi Global</p>
                <p>Email: inkspiredpublished@gmail.com</p>
                <p>WhatsApp: <a href="https://wa.me/6285117076160" className="text-primary hover:underline">+62 851-1707-6160</a></p>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 border rounded-lg p-6 mt-8">
            <p className="text-sm text-muted-foreground">
              Dengan menggunakan Destinova, Anda mengakui bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat 
              oleh Syarat dan Ketentuan ini serta Kebijakan Privasi kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
