# PostgreSQL Database for Destinova AI Chat Application
FROM postgres:15-alpine

# Set environment variables for PostgreSQL
ENV POSTGRES_USER=postgres \
    POSTGRES_PASSWORD=postgres \
    POSTGRES_DB=destinova \
    PGDATA=/var/lib/postgresql/data/pgdata

# Install additional tools if needed
RUN apk add --no-cache \
    curl \
    wget

# Copy initialization scripts (if any)
# COPY ./scripts/init-db.sql /docker-entrypoint-initdb.d/

# Expose PostgreSQL port
EXPOSE 5432

# Health check
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=5 \
    CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB || exit 1

# Default command (inherited from postgres:15-alpine)
CMD ["postgres"]
