## 🚀 Getting Started

Follow these steps to set up and run the frontend project on your local machine.

### 📦 Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (Package Manager)
- [Git](https://git-scm.com/) (Optional but recommended)
- Ensure that you have a working API key, create a `.env` file at `weather-app-ts` and add `VITE_OPEN_WEATHER_MAP_API_KEY=<YOUR_API_KEY>` to the file.

### 📥 Installation
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-repo/frontend-project.git](https://github.com/newbiecody/weather-app.git
   cd weather-app/weather-app-ts
   ```

2. **Install Dependencies**
   ```sh
   npm install  # or yarn install
   ```

### 🛠 Development
To start a local development server with hot-reloading:
```sh
npm run dev  # or yarn dev
```

This will start the app at `http://localhost:5173/`

### 📦 Building for Production
To create an optimized production build:
```sh
npm run build  # or yarn build
```
The output will be in the `dist/` or `build/` directory depending on the framework used.

### ✨ Technologies Used
- Framework: **React**
- Styling: **TailwindCSS / SCSS**
