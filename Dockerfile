FROM node:14

RUN apt-get update && \
    apt-get install -y \
    postgresql \
    postgresql-client \
    libdbd-pg-perl \
    sqitch

ENV PGUSER=postgres \
    PGPASSWORD=postgres \
    PGHOST=localhost \
    PGPORT=5432 \
    PGDATABASE=ocalm \
    PGURI=postgres://postgres:postgres@localhost:5432/ocalm \
    PGSERVERPROXYURI=http://localhost:4000

WORKDIR /ocalmDocker

COPY . .

RUN npm i

EXPOSE 4000 5432

CMD service postgresql start && \
    until pg_isready -h localhost -p 5432 -U postgres; do \
        echo 'Waiting for postgres to be ready...'; \
        sleep 1; \
    done && \
    sqitch deploy --verify && \
    node index.js
