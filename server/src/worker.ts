import { Worker } from "bullmq";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Document } from "@langchain/core/documents";
import pdf from "pdf-parse";
import mammoth from "mammoth";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GOOGLE_API_KEY || ""
});

// Create or get the vector store
let vectorStore: QdrantVectorStore;

async function initializeVectorStore() {
    try {
        vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
            url: "http://localhost:6333",
            collectionName: 'pdf-docs'
        });
        console.log("Vector store initialized successfully");
    } catch (error) {
        console.error("Error initializing vector store:", error);
        // Create new collection if it doesn't exist
        vectorStore = await QdrantVectorStore.fromTexts(
            ["Initial document"],
            [{ filename: "initial" }],
            embeddings,
            {
                url: "http://localhost:6333",
                collectionName: 'pdf-docs'
            }
        );
        console.log("Created new vector store collection");
    }
}

async function extractTextFromFile(filePath: string, filename: string): Promise<string> {
    const ext = path.extname(filename).toLowerCase();
    
    try {
        if (ext === '.pdf') {
            const dataBuffer = fs.readFileSync(filePath);
            const data = await pdf(dataBuffer);
            return data.text;
        } else if (ext === '.doc' || ext === '.docx') {
            const dataBuffer = fs.readFileSync(filePath);
            const result = await mammoth.extractRawText({ buffer: dataBuffer });
            return result.value;
        } else {
            throw new Error(`Unsupported file type: ${ext}`);
        }
    } catch (error) {
        console.error(`Error extracting text from ${filename}:`, error);
        throw error;
    }
}

async function processDocument(fileData: any) {
    try {
        const { filename, path: filePath } = JSON.parse(fileData);
        
        console.log(`Processing document: ${filename}`);
        console.log(`File path: ${filePath}`);
        
        // Extract text from the document
        const text = await extractTextFromFile(filePath, filename);
        
        if (!text || text.trim().length === 0) {
            console.log(`No text extracted from ${filename}`);
            return;
        }
        
        console.log(`Extracted ${text.length} characters from ${filename}`);
        
        // Split text into chunks (optional - for large documents)
        const chunkSize = 1000; // characters
        const chunks = [];
        
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.slice(i, i + chunkSize));
        }
        
        // Create documents for each chunk
        const documents = chunks.map((chunk, index) => new Document({
            pageContent: chunk,
            metadata: {
                filename: filename,
                chunkIndex: index,
                totalChunks: chunks.length,
                filePath: filePath
            }
        }));
        
        // Add documents to vector store
        await vectorStore.addDocuments(documents);
        
        console.log(`Successfully processed ${filename} - added ${documents.length} chunks to vector store`);
        
    } catch (error) {
        console.error("Error processing document:", error);
        throw error;
    }
}

// Create the worker
const worker = new Worker(
    "file-upload",
    async (job) => {
        console.log(`Processing job ${job.id}: ${job.name}`);
        await processDocument(job.data);
    },
    {
        connection: {
            host: 'localhost',
            port: 6379
        },
        concurrency: 1 // Process one document at a time
    }
);

// Initialize vector store and start worker
async function startWorker() {
    try {
        await initializeVectorStore();
        console.log("Document processing worker started successfully");
        console.log("Waiting for documents to process...");
    } catch (error) {
        console.error("Failed to start worker:", error);
        process.exit(1);
    }
}

// Handle worker events
worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully`);
});

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err);
});

worker.on('error', (err) => {
    console.error("Worker error:", err);
});

// Start the worker
startWorker();
