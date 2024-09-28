import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

let currentID = 0;
export function nextID(){
    currentID += 1
    let nxtID = "Lecture#" + currentID.toString();

    return nxtID;
}


// LangChain text splitter
export async function splitText(document) {
    const response = await fetch(document);
    const text = await response.text();
  
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 20 });
  
    const output = await splitter.createDocuments([text]);
    return output;
  }