// Import necessary libraries
import axios from 'axios';

// Set up Pinecone configuration
const PINECONE_API_KEY = import.meta.env.VITE_PINECONE_API_KEY; // Load from .env file
const PINECONE_ENVIRONMENT = import.meta.env.VITE_PINECONE_ENVIRONMENT; // Load from .env file
const INDEX_NAME = import.meta.env.VITE_INDEX_NAME; // Replace with your index name

const pineconeBaseURL = `https://${INDEX_NAME}.svc.${PINECONE_ENVIRONMENT}.pinecone.io`;

// Function to upsert vectors into Pinecone
export async function upsertVectors(embeddings) {
  const url = `${pineconeBaseURL}/vectors/upsert`;

  const vectors = embeddings;

  try {
    const response = await axios.post(
      url,
      { vectors },
      {
        headers: {
          'Api-Key': PINECONE_API_KEY,
          'Content-Type': 'application/json;charset:UTF-8'
        }
      }
    );
    console.log('Embedding Vectors Stored in Pinecone Database!', response.data);
  } catch (error) {
    console.error('Error upserting vectors:', error);
  }
}

// Function to query the Pinecone index
export async function queryVectors(queryVector) {
  const url = `${pineconeBaseURL}/query`;

  try {
    const response = await axios.post(
      url,
      {
        vector: queryVector,
        topK: 3, // Number of results to return
        includeMetadata: true
      },
      {
        headers: {
          'Api-Key': PINECONE_API_KEY,
          'Content-Type': 'application/json;charset:UTF-8'
        }
      }
    );
    console.log('Matching Query embeddings retrieved from Pinecone Database!', response);
    return response;
  } catch (error) {
    console.error('Error querying vectors:', error);
  }
}
