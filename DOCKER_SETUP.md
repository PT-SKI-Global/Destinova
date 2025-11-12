 ssh ist# Docker Setup untuk Destinova AI Chat

## File-file yang Dibuat

### 1. **Dockerfile**
Dockerfile untuk PostgreSQL database dengan:
- Base image: `postgres:15-alpine`
- Environment variables untuk user, password, dan database
- Health check untuk monitoring status container
- Support untuk script inisialisasi database

### 2. **docker-compose.yml**
Konfigurasi Docker Compose dengan:
- Service database PostgreSQL
- Volume persistence untuk data
- Network bridge untuk komunikasi antar service
- Optional: Service API (commented out)

### 3. **Dockerfile.app**
Dockerfile untuk aplikasi Node.js dengan:
- Multi-stage build untuk optimasi ukuran image
- Production dependencies optimization
- Health check
- Expose port 5173

### 4. **scripts/init-db.sql**
Script SQL untuk inisialisasi database dengan:
- Table untuk users, personalities, dan simulations
- UUID extension
- Indexes untuk performance
- Automatic updated_at triggers

### 5. **.dockerignore**
File untuk mengecualikan file/folder yang tidak perlu dalam Docker build

## Cara Menggunakan

### Start Database Saja
```bash
docker-compose up db -d
```

### Start Semua Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### Stop dan Remove Volumes
```bash
docker-compose down -v
```

### Lihat Logs
```bash
docker-compose logs -f db
docker-compose logs -f api
```

### Akses PostgreSQL
```bash
docker exec -it destinova-db psql -U postgres -d destinova
```

## Environment Variables

Default yang sudah dikonfigurasi:
- `POSTGRES_USER`: postgres
- `POSTGRES_PASSWORD`: postgres
- `POSTGRES_DB`: destinova
- Port: 5432

Untuk production, ganti password di `.env` atau docker-compose.yml

## Customization

### Mengubah Schema Database
Edit file `scripts/init-db.sql` sesuai kebutuhan schema aplikasi Anda

### Mengubah Port
Di `docker-compose.yml`, ubah port mapping:
```yaml
ports:
  - "YOUR_PORT:5432"
```

### Menambah Service
Uncomment bagian `api` di `docker-compose.yml` dan pastikan `Dockerfile.app` sudah ada

## Network

Services terhubung melalui network `destinova-network` dengan driver bridge, sehingga:
- Service API bisa akses database via hostname `db:5432`
- Connection string: `postgresql://postgres:postgres@db:5432/destinova`
