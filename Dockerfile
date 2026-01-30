# Use official Cypress image with Node and browsers
FROM cypress/included:12.17.4

WORKDIR /app

# Copy your project files into the container
COPY . .

# Install dependencies
RUN npm ci

# Default command to run Cypress tests
CMD ["npx", "cypress", "run"]
