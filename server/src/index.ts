
import express from "express";
import cors from "cors";
import { Queue } from "bullmq";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from "dotenv";
dotenv.config();


const ai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const app = express();

app.use(express.json());
app.use(cors());

const queue = new Queue("file-upload", {
    connection: {
        host: 'localhost',
        port: 6379
    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}-${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post('/pdf/upload', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded"
            })
        }

        console.log('File uploaded:', req.file.originalname)
        console.log('File path:', req.file.path)
        console.log('File destination:', req.file.destination)

        await queue.add('ready-file', JSON.stringify({
            filename: req.file.originalname,
            destination: req.file.destination,
            path: req.file.path
        }))
        
        return res.json({
            message: "Document upload successfully",
            filename: req.file.originalname
        })
    } catch (error) {
        console.error('Upload error:', error)
        return res.status(500).json({
            error: "Upload failed"
        })
    }
})

app.post('/chat', async (req, res) => {
    try {
        const userQuery = req.body.query;
        if(!userQuery){
            return res.status(400).json({
                error: "No user input was received"
            })
        }
    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "gemini-embedding-001",
        apiKey: process.env.GOOGLE_API_KEY || ""
    });
    const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: "http://localhost:6333",
        collectionName: 'pdf-docs'
    })
    const ret = vectorStore.asRetriever({
        k: 2
    })
    const result = await ret.invoke(userQuery);

    const SYSTEM_PROMPT = `
You are SauLM, an AI-powered professional virtual lawyer. 
Your mission: demystify legal documents for users—especially non-lawyers—by giving short, clear, relevant answers.

**Instructions:**
- Analyze the user's document or question.
- Only explain the key relevant clauses, obligations, or risks the user asked about.
- Be concise! Keep responses as short as possible (3-6 bullet points, or a 3-6 sentence paragraph).
- If possible, use bullet points, checklists, or short numbered lists.
- Never include generic background info. Avoid lengthy legal definitions or unrelated context.
- Only cite clauses or sections when truly important for the user’s question—don’t cite excessively.
- Flag critical deadlines, risks, or red flags—skip boilerplate.
- If you don’t know or it's ambiguous, say “Consider consulting a lawyer for this point.”

**Tone:**
- Friendly, clear, trustworthy, and focused on what the user really needs to know.
- Empower users with actionable insights, not legal lectures.

**Example output style:**
- Brief paragraph **or** 3-6 bullet points with only the essentials.

${JSON.stringify(result)}
`


const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
const response = await model.generateContent(`System: ${SYSTEM_PROMPT}\nUser: ${userQuery}`);

  console.log(response.response.text());
  const resp = response.response;

    return res.json({
        result: {
            parts: [
                {
                    text: resp.text()
                }
            ],
            role: "model"
        }
    })
    
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
})

app.post("/pdf/:fileId/chat", async (req, res) => {
    try {
      const userQuery = req.body.query;
      const fileId = req.params.fileId; // Get PDF identifier from URL
  
      if (!userQuery || !fileId) {
        return res.status(400).json({
          error: "Missing user query or file identifier",
        });
      }
  
      // 1. Setup embeddings/vector store as before
      const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "gemini-embedding-001",
        apiKey: process.env.GOOGLE_API_KEY || "",
      });
  
      const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
        url: "http://localhost:6333",
        collectionName: "pdf-docs",
      });
  
      // 2. Use Qdrant’s payload filter so only vectors from this PDF are used
      const ret = vectorStore.asRetriever({
        k: 5,
        filter: {
          must: [{ key: "fileId", match: { value: fileId } }],
        },
      });
  
      const result = await ret.invoke(userQuery);
  
      const SYSTEM_PROMPT = `
  You are SauLM, an AI-powered professional virtual lawyer.
  Your mission: demystify THIS legal document (uploaded as PDF) for users—give short, clear, relevant answers ONLY using content from the file.
  
  (Results for context):
  ${JSON.stringify(result)}
      `;
  
      const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
      const response = await model.generateContent(
        `System: ${SYSTEM_PROMPT}\nUser: ${userQuery}`
      );
      const resp = response.response;
  
      return res.json({
        result: {
          parts: [{ text: resp.text() }],
          role: "model",
        },
      });
    } catch (error) {
      console.error("Error in pdf chat endpoint:", error);
      return res.status(500).json({
        error: "Internal server error",
      });
    }
});
  

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})