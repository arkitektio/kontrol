FROM node:22

WORKDIR /workspace/
COPY package.json .
COPY . . 
COPY yarn.lock .
RUN yarn install
EXPOSE 80

    
CMD ["yarn", "dev", "--host", "--port", "80"]