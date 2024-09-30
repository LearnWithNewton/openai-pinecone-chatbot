import { generateEmbeddings, chatCompletion } from "./utils/openai.js";
import { queryVectors, upsertVectors } from "./utils/pinecone.js";
import "./style.css";

const filePath = "./documents/lectures-sm.txt";

const form = document.querySelector("form");
const input = document.querySelector("input");
const chatReply = document.querySelector("#chat-reply");

// Submit form
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    //pass prompt details to chatReply function
    main(input.value);
    input.values = '';

});

async function main(prompt) {
    try {
        chatReply.innerHTML = "Thinking...!";

        // Generate embeddings from query
        const queryEmbeddings = await generateEmbeddings(prompt);
        //console.log(queryEmbeddings);

        // query cosine similar vector embeddings based on query
        const contexts = await queryVectors(queryEmbeddings[0].values);
        console.log(contexts);

        //    
        const chatResponse = await chatCompletion(prompt, contexts, [], 0.5, 0.2); // Set temperature to 0.5, frequency penalty to 0.2
        console.log(chatResponse);

        chatReply.innerHTML = `<p>${reply}</p>`
    } catch (error) {
        console.log("Error: ", error);
        chatReply.innerHTML = `<p>Sorry, some error occured! Please try again!</p>`
    }
}

// write vectors into Pinecone index
async function upsert() {
    try {
        const embeddingsData = await generateEmbeddings(filePath);

        console.log(embeddingsData);

        await upsertVectors(embeddingsData);

    } catch (error) {
        console.log("Error: ", error);
    }

}


//upsert()