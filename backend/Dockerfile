FROM nginx

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
RUN npm install --global pm2 ts-node

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy production build files
COPY ./dist ./
COPY ./docker ./
COPY ./migrations ./migrations
COPY ./seeds ./seeds
COPY ./knexfile.ts ./knexfile.ts

EXPOSE 4000

RUN chmod +x ./start.sh

# # Launch app with 
CMD ["./start.sh"]
