import { generateEmbeddings } from "./openai.js";
import { queryVectors, upsertVectors } from "./pinecone.js";

import "./style.css";

const document = "./documents/lectures-sm.txt";

async function chat() {
    
}

// write vectors into Pinecone index
async function upsert() {
    // const embeddingsData = await generateEmbeddings(document);

    // console.log(embeddingsData);

    // await upsertVectors(embeddingsData);

    console.log("Upsert Complete");
}

upsert()
