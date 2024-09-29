// Import necessary libraries
import axios from 'axios';
import { nextID, splitText } from ".";

// Set up Pinecone configuration
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Load from .env file
const OPENAI_EMBEDDING_MODEL = import.meta.env.VITE_OPENAI_EMBEDDING_MODEL; // Model for embeddings
const OPENAI_CHAT_MODEL = import.meta.env.VITE_OPENAI_CHAT_MODEL; // Chat model (gpt-4-mini or similar)

const embeddingUrl = `https://api.openai.com/v1/embeddings`;
const chatCompletionUrl = `https://api.openai.com/v1/chat/completions`;

// Function to query the Pinecone index and generate embeddings
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
          'X-Content-Type-Options': 'no-sniff',
        },
      }
    );

    data.push({
      id: nextID(),
      values: embeddingResponse.data.data[0].embedding,
      metadata: { content: textChunk.pageContent },
    });
  }

  console.log("Embeddings Generated using !" + OPENAI_CHAT_MODEL);
  return data;
}

// Function to generate chat completion using ChatGPT model
export async function chatCompletion(prompt, contexts , history = [], temperature = 0.1, frequencyPenalty = 0.0) {
  const messages = [
    history,
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: `Context: ${contexts} Question: ${prompt}` },
  ];

  try {
    const response = await axios.post(
      chatCompletionUrl,
      {
        model: OPENAI_CHAT_MODEL, // Use gpt-4-mini or similar
        messages: messages,
        temperature: temperature, // Controls randomness of the output
        frequency_penalty: frequencyPenalty, // Reduces repetitive tokens
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json;charset:UTF-8',
          'Cache-Control': 'max-age=300',
          'X-Content-Type-Options': 'no-sniff',
        },
      }
    );

    const completion = response.data.choices[0].message.content;
    console.log("Chat Completion Response:", completion);

    return completion;
  } catch (error) {
    console.error("Error in Chat Completion:", error);
    return null;
  }
}
