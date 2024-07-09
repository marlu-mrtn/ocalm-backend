FROM node:14

RUN apt-get update && \
    apt-get install -y \
    postgresql-client \
    libdbd-pg-perl \
    sqitch

WORKDIR /ocalm_backend

COPY . .

RUN npm i

EXPOSE 4000

CMD bash -c 'until pg_isready -h ocalm_postgres_database; do sleep 1; done; sqitch deploy --verify && node index.js'
