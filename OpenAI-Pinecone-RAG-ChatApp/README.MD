# OpenAI-Pinecone Chatbot 🤖

Welcome to the OpenAI-Pinecone Chatbot project! This application leverages the power of OpenAI's language models and Pinecone's vector database to create an intelligent and responsive chatbot. The chatbot is designed to handle various queries by utilizing advanced natural language processing and retrieval-augmented generation (RAG) techniques.

Embeddings and vector databases allow developers to create tools that can retrieve knowledge from custom documents and use it to form more accurate and dynamic conversations. But while cutting-edge AI models like ChatGPT can generate useful conversational responses to many different kinds of queries, the replies are always limited to the data that was available when the model was last trained. In this course, instructor Guil Hernandez offers an overview of text embeddings, vector databases, and retrieval-augmented generation (RAG) to elevate and optimize your AI learning journey. Along the way, test out your new skills in the exercise challenges provided at the end of each section.

## Features ✨

- **Natural Language Understanding**: Utilizes OpenAI's GPT models to understand and generate human-like text.
- **Vector Database**: Employs Pinecone for efficient storage and retrieval of vector embeddings.
- **Scalable Architecture**: Built with Vite and Webpack for a fast and scalable development experience.
- **Environment Configuration**: Uses dotenv for managing environment variables securely.

## Models used

- Embedding Model: text-embedding-3-small
- Chat Completion Model: gtp-4o-mini

## Getting Started 🚀

### Prerequisites

- Node.js and npm installed on your machine.

## Vector DB

- Pinecone and OpenAI API keys.
- https://www.pinecone.io/
- https://app.pinecone.io/
- install Pinecone
    ```
    npm install @pinecone-database/pinecone
    ```
- ![Pinecone Vector DB Page](public\PineconeVectorDB.PNG)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/openai-pinecone-chatbot.git
    cd openai-pinecone-chatbot
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your API keys:
    ```env
    PINECONE_API_KEY=your-pinecone-api-key
    OPENAI_API_KEY=your-openai-api-key
    ```

### Development

To start the development server, run:
```bash
npm run dev
```

### Build

To build the project for production, run:
```bash
npm run build
```

### Preview

To preview the production build, run:
```bash
npm run preview
```

## Contributing 🤝

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License 📄

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


