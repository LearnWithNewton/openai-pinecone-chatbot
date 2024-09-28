// Import necessary libraries
import axios from 'axios';
import { nextID, splitText } from "./utils";

// Set up Pinecone configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Load from .env file
const OPENAI_EMBEDDING_MODEL =import.meta.env.VITE_OPENAI_EMBEDDING_MODEL // Replace with the specific model (use text-embedding-3-small if it's available)
const embeddingUrl = `https://api.openai.com/v1/embeddings`;

// Function to query the Pinecone index
export async function generateEmbeddings(document) {
  const textChunks = await splitText(document);

  const data = [];

  for (const textChunk of textChunks) {
    // Request to OpenAI for embeddings
    const embeddingResponse = await axios.post(
      embeddingUrl,
      {
        model: OPENAI_EMBEDDING_MODEL,
        input: textChunk.pageContent,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json;charset:UTF-8',
          'Cache-Control': 'max-age=300',
          'X-Content-Type-Options' : 'no-sniff'

        },
      }
    );

    data.push({
      id: nextID(),
      values: embeddingResponse.data.data[0].embedding,
      metadata: { content: textChunk.pageContent },
    });
  }

  console.log("Embeddings Complete!");

  return data;
}
