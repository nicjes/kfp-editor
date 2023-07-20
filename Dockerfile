# Stage 1: Build the React Frontend with Vite
FROM node:18-alpine as FRONTEND_IMAGE

# Set the client folder as the working directory
WORKDIR /app/client

# Set NODE_ENV to production for frontend build
ENV NODE_ENV=production

# Copy frontend dependencies first to leverage Docker cache
COPY client/package.json client/package-lock.json ./

# Install frontend dependencies
RUN npm ci --production

# Copy frontend source code
COPY client .

# Build the frontend
RUN npm run build


# Stage 2: Build the Express Backend
FROM node:18-alpine as BACKEND_IMAGE

# Set the server folder as the working directory
WORKDIR /app/server

# Set NODE_ENV to production for backend build
ENV NODE_ENV=production

# Copy backend dependencies first to leverage Docker cache
COPY server/package.json server/package-lock.json ./

# Install backend dependencies
RUN npm ci --production

# Copy backend source code
COPY server .


# Stage 3: Create the final production container
FROM nikolaik/python-nodejs:python3.11-nodejs18-alpine

# Set the app folder as the working directory
WORKDIR /app

# Install the KFP SDK
RUN pip3 install kfp==1.8.22

# Copy frontend artifacts from stage 1
COPY --from=FRONTEND_IMAGE /app/client/dist/ ./client/dist/
COPY --from=FRONTEND_IMAGE /app/client/package.json ./client/
COPY --from=FRONTEND_IMAGE /app/client/vite.config.ts ./client/
COPY --from=FRONTEND_IMAGE /app/client/node_modules ./client/node_modules/

# Copy backend artifacts from stage 2
COPY --from=BACKEND_IMAGE /app/server ./server/

# Expose the ports for the Express backend and Vite frontend
EXPOSE 4173
EXPOSE 5000

# Set the command to start both frontend and backend sequentially
CMD ["sh", "-c", "npm run preview --prefix client & npm run start --prefix server"]
