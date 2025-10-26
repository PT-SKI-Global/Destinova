import { Sparkles } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Destinova</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Platform simulasi keputusan karier dan pendidikan dengan AI untuk Indonesia.
            </p>
            <div className="pt-2 space-y-1">
              <p className="text-xs font-semibold text-foreground">PT. Sentra Karya Integrasi Global</p>
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground block">
                Privasi
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produk</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  Harga
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-sm text-muted-foreground hover:text-foreground">
                  Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Perusahaan</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Privasi
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 PT. Sentra Karya Integrasi Global. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
