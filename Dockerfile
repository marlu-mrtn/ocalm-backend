FROM node

RUN apt-get update && \
    apt-get install -y \
    postgresql-client \
    libdbd-pg-perl \
    sqitch

WORKDIR /ocalmDocker

COPY . .

RUN npm i

CMD bash -c 'until pg_isready -h ocalm_postgres_database; do sleep 1; done; sqitch deploy --verify && node index.js'
