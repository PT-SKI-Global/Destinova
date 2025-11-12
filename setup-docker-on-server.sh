#!/bin/bash

# Destinova Docker Deployment Script for SSH
# Script untuk dijalankan di server setelah SSH

set -e

echo "========================================"
echo "Destinova Docker Setup"
echo "========================================"
echo ""

# Variabel
SERVER_PATH="$HOME/destinova"

echo "[1/4] Navigasi ke direktori project..."
cd $SERVER_PATH
echo "✓ Berada di: $(pwd)"
echo ""

echo "[2/4] Verifikasi file Docker..."
if [ ! -f "Dockerfile" ]; then
    echo "ERROR: Dockerfile tidak ditemukan!"
    exit 1
fi
if [ ! -f "docker-compose.yml" ]; then
    echo "ERROR: docker-compose.yml tidak ditemukan!"
    exit 1
fi
echo "✓ File Docker ditemukan"
echo ""

echo "[3/4] Menghentikan container yang ada (jika ada)..."
docker-compose down || true
echo "✓ Container dihentikan"
echo ""

echo "[4/4] Memulai Docker Compose..."
docker-compose up -d
echo "✓ Docker Compose dimulai!"
echo ""

echo "========================================"
echo "Status Container:"
echo "========================================"
docker-compose ps
echo ""

echo "========================================"
echo "Informasi Koneksi Database:"
echo "========================================"
echo "Host: localhost atau container name 'destinova-db'"
echo "Port: 5432"
echo "User: postgres"
echo "Password: postgres"
echo "Database: destinova"
echo ""

echo "Perintah Berguna:"
echo "  - Lihat logs: docker-compose logs -f"
echo "  - Hentikan: docker-compose down"
echo "  - Akses DB: docker exec -it destinova-db psql -U postgres -d destinova"
echo ""
