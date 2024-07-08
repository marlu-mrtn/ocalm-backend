services:
  ocalm_backend:
    environment:
      - PGUSER=postgres
      - PGPASSWORD=postgres
      - PGHOST=ocalm_postgres_database
      - PGPORT=5432
      - PGDATABASE=ocalm
      - PGURI=postgres://postgres:postgres@ocalm_postgres_database:5432/ocalm
      - PGSERVERPROXYURI=http://localhost:4000
    build: .
    ports:
      - "4000:4000"
    depends_on:
      - ocalm_postgres_database
    volumes:
      - .:/usr/src/app

  ocalm_postgres_database:
    image: postgres
    environment:
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_DB=ocalm
      - PGDATA=/data/pg
    volumes:
      - $HOME/pg,/data/pg
    ports:
      - "5432:5432"
  