FROM 762554054182.dkr.ecr.ap-southeast-1.amazonaws.com/node
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]