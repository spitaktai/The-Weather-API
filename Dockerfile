# Use Node.js LTS version
FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm build

# Expose port (Cloud Run will set PORT env variable)
EXPOSE 8080

# Start the application
CMD ["node", "dist/index.js"]
