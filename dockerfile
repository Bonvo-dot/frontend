# FROM node:16-alpine AS node
# WORKDIR /app
# COPY . .
# RUN yarn install
# ENV REACT_APP_BACKEND http://todaviano.com
# RUN yarn build

# ### STAGE 2: Run ###
# FROM nginx:1.21.6-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=node /app/build/ /usr/share/nginx/html
# EXPOSE 80


FROM node:16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install
ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm run build
CMD ["npm", "start"]