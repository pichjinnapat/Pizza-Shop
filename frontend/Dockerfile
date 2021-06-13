FROM nginx

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs htop python-certbot-nginx cron

# Copy production build files to web server root
COPY ./build ./
COPY ./docker ./

# # Setup services
RUN rm /etc/nginx/conf.d/default.conf
COPY ./docker/www.conf /etc/nginx/conf.d/www.conf
COPY ./docker/ssl.conf /etc/nginx/conf.d/ssl.conf.bak
EXPOSE 80
EXPOSE 443

RUN chmod +x ./start.sh
RUN chmod +x ./gen-cert.sh

# # Launch app with 
CMD ["./start.sh"]
