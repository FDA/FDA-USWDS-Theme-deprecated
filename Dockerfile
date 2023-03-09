FROM node:14

# Install npm tooling
RUN npm install --global gulp-cli

# mount src here
RUN mkdir /usr/src/fda-uswds
VOLUME /usr/src/fda-uswds

WORKDIR /usr/src/fda-uswds
EXPOSE 3000/tcp
EXPOSE 35729/tcp

CMD "/bin/bash"