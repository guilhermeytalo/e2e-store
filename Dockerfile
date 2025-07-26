FROM cypress/included:12.17.4

WORKDIR /e2e
COPY . .

RUN npm install


CMD ["npx", "cypress", "run"]
