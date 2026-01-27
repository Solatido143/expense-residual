# Expense Residual

Expense Residual is a simple React + TypeScript web application for tracking expenses. It allows users to add, view, and delete expense items, and displays the total expense in Philippine Peso (PHP).

## Features

- Add new expenses with a name and amount
- View a list of all expenses
- Delete individual expenses
- See the total of all expenses, formatted as PHP currency
- Built with React, TypeScript, Vite, and Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd expense-residual
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```sh
npm run dev
# or
yarn dev
```

Open your browser and go to [http://localhost:5173](http://localhost:5173) to view the app.

### Building for Production

```sh
npm run build
# or
yarn build
```

### Linting

```sh
npm run lint
# or
yarn lint
```

## Project Structure

- `src/App.tsx` - Main application component
- `src/type.ts` - TypeScript types for expenses
- `src/index.css` - Tailwind CSS styles
- `vite.config.ts` - Vite configuration

## License

This project is licensed under the MIT License.
