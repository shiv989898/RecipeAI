# RecipeAI

Welcome to RecipeAI, a web application that uses generative AI to help you discover new and exciting recipes. Simply enter the name of a dish you'd like to cook, and our AI assistant will generate a complete recipe for you, including ingredients and step-by-step instructions.

## ✨ Features

- **Instant Recipe Generation**: Get recipes for any dish you can think of.
- **Interactive Instructions**: Check off steps as you cook.
- **Clean and Modern UI**: A beautiful and easy-to-use interface built with ShadCN UI and Tailwind CSS.
- **AI-Powered**: Leverages Google's Gemini model through Genkit for intelligent recipe creation.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Setup

1.  **Clone the repository** (if you're working locally outside of Firebase Studio):
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root of your project and add your Google AI API key:
    ```env
    GOOGLE_API_KEY=YOUR_API_KEY_HERE
    ```
    You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

This project requires running two separate development servers: one for the Next.js frontend and one for the Genkit AI flows.

1.  **Start the Genkit development server**:
    Open a terminal and run:
    ```bash
    npm run genkit:watch
    ```
    This will start the Genkit development UI and watch for changes in your AI flows.

2.  **Start the Next.js development server**:
    Open a second terminal and run:
    ```bash
    npm run dev
    ```

3.  **Open the app**:
    Navigate to [http://localhost:9002](http://localhost:9002) in your browser to see the application.

## 📂 Project Structure

Here's an overview of the key files and directories:

-   `src/app/`: Contains the pages and core UI of the Next.js application.
    -   `page.tsx`: The main entry point and home page.
    -   `actions.ts`: Server Actions for communicating with the backend/AI flows.
-   `src/ai/`: Home for all AI-related code.
    -   `genkit.ts`: Genkit configuration.
    -   `flows/`: Contains all the Genkit flows that define the AI's behavior.
-   `src/components/`: Shared React components used throughout the application.
    -   `ui/`: Auto-generated components from ShadCN UI.
    -   `RecipeCard.tsx`: The component that displays the generated recipe.
-   `tailwind.config.ts`: Configuration for Tailwind CSS.

## 🤝 Contributing

Contributions are welcome! If you have suggestions or find a bug, please feel free to open an issue or submit a pull request.
