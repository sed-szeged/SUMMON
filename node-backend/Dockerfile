FROM node:10.10.0

# Create a directory in the container to hold the app, the -p flag enables us to create the directory recursively without having to go into each level
#RUN mkdir -p /usr/src/app

# Go into the app folder by making it the working directory
WORKDIR /usr/src/app

# Copy the local package.json and package-lock.json files into the container to install node modules
COPY ./package.json .
#COPY ./package-lock.json /user/src/app

#RUN npm install -g nodemon
RUN npm install

# Copy local code into the container
COPY . .

#CMD ["npm","run","dev"]
CMD ["npm","start"]
