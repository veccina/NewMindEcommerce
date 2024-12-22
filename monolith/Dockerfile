FROM node:18-alpine

# 1) Install build tools for bcrypt if needed
RUN apk add --no-cache python3 make g++

WORKDIR /app

# 2) Copy only package.json and package-lock.json, then run npm install
COPY package*.json ./
RUN npm install

# 3) Now copy the rest of the source code
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
