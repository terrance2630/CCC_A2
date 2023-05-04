#!/bin/bash

# Function to print an error message and exit
function print_error() {
    echo -e "\033[31mERROR:\033[0m $1"
    exit 1
}

echo "--------------------------------------------------------"
echo -e "\033[35m> Checking existence and versions of Node.js and npm...\033[0m"
echo "--------------------------------------------------------"

# Check if Node.js and npm are installed and display their versions
command -v node >/dev/null 2>&1 && echo "Node.js version: $(node -v)" || print_error "Node.js is not installed. Please install it and try again."
command -v npm >/dev/null 2>&1 && echo "npm version: $(npm -v)" || print_error "npm is not installed. Please install it and try again."

echo -e "\n--------------------------------------------------------"
echo -e "\033[35m> Checking and installing pnpm...\033[0m"
echo "--------------------------------------------------------"

# Check if pnpm is installed, if not, install it globally
if ! command -v pnpm >/dev/null 2>&1; then
    echo "Installing pnpm globally..."
    npm install -g pnpm || print_error "Failed to install pnpm. Please check the error message above."
    echo "pnpm version: $(pnpm -v)"
else
    echo "pnpm is already installed. Skipping installation."
    echo "pnpm version: $(pnpm -v)"
fi

echo -e "\n--------------------------------------------------------"
echo -e "\033[35m> Installing frontend dependencies...\033[0m"
echo "--------------------------------------------------------"

# Install dependencies for the frontend
cd frontend || print_error "Failed to change to frontend directory. Make sure it exists."
pnpm install || print_error "Failed to install frontend dependencies. Please check the error message above."

# Change to the root folder
cd ..

echo -e "\n--------------------------------------------------------"
echo -e "\033[35m> Installing backend dependencies...\033[0m"
echo "--------------------------------------------------------"

# Install dependencies for the backend
cd backend || print_error "Failed to change to backend directory. Make sure it exists."
pnpm install || print_error "Failed to install backend dependencies. Please check the error message above."

echo -e "\n--------------------------------------------------------"
echo -e "\033[32mEnvironment setup completed successfully!\033[0m"
echo "--------------------------------------------------------"
