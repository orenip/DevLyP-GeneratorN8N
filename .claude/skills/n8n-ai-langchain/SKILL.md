---
name: n8n-ai-langchain
description: Referencia completa de nodos AI/LangChain para n8n. AI Agent, modelos LLM (Gemini, OpenAI, Anthropic), memoria, tools, embeddings, vector stores, output parsers y patrones avanzados de agentes.
---

# N8N — AI / LangChain Referencia Completa

## TypeVersions — Nodos AI

### Nodos raíz AI
| Nodo | type | typeVersion |
|---|---|---|
| AI Agent | `@n8n/n8n-nodes-langchain.agent` | 1.8 |
| Basic LLM Chain | `@n8n/n8n-nodes-langchain.chainLlm` | 1.5 |
| Question & Answer Chain | `@n8n/n8n-nodes-langchain.chainRetrievalQa` | 1.4 |
| Summarization Chain | `@n8n/n8n-nodes-langchain.chainSummarization` | 2 |
| Information Extractor | `@n8n/n8n-nodes-langchain.informationExtractor` | 1.1 |
| Text Classifier | `@n8n/n8n-nodes-langchain.textClassifier` | 1.1 |
| Sentiment Analysis | `@n8n/n8n-nodes-langchain.sentimentAnalysis` | 1.1 |
| OpenAI (directo) | `@n8n/n8n-nodes-langchain.openAi` | 1.8 |

### Chat Models (sub-nodos → `ai_languageModel`)
| Nodo | type | typeVersion |
|---|---|---|
| Chat OpenAI | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1.2 |
| Chat Gemini | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | 1 |
| Chat Anthropic | `@n8n/n8n-nodes-langchain.lmChatAnthropic` | 1.4 |
| Chat Ollama | `@n8n/n8n-nodes-langchain.lmChatOllama` | 1 |
| Chat Mistral | `@n8n/n8n-nodes-langchain.lmChatMistralCloud` | 1 |
| Chat Azure OpenAI | `@n8n/n8n-nodes-langchain.lmChatAzureOpenAi` | 1 |
| Chat Groq | `@n8n/n8n-nodes-langchain.lmChatGroq` | 1 |
| Chat DeepSeek | `@n8n/n8n-nodes-langchain.lmChatDeepSeek` | 1 |

### Memoria (sub-nodos → `ai_memory`)
| Nodo | type | typeVersion |
|---|---|---|
| Memory Buffer Window | `@n8n/n8n-nodes-langchain.memoryBufferWindow` | 1.3 |
| Memory Postgres Chat | `@n8n/n8n-nodes-langchain.memoryPostgresChat` | 1.1 |
| Memory Redis Chat | `@n8n/n8n-nodes-langchain.memoryRedisChat` | 1.1 |
| Memory MongoDB Chat | `@n8n/n8n-nodes-langchain.memoryMongoDbChat` | 1.1 |
| Chat Memory Manager | `@n8n/n8n-nodes-langchain.memoryManager` | 1.1 |

### Tools (sub-nodos → `ai_tool`)
| Nodo | type | typeVersion |
|---|---|---|
| Tool: Code | `@n8n/n8n-nodes-langchain.toolCode` | 1.1 |
| Tool: HTTP Request | `@n8n/n8n-nodes-langchain.toolHttpRequest` | 1.1 |
| Tool: Workflow | `@n8n/n8n-nodes-langchain.toolWorkflow` | 1.2 |
| Tool: Calculator | `@n8n/n8n-nodes-langchain.toolCalculator` | 1 |
| Tool: Wikipedia | `@n8n/n8n-nodes-langchain.toolWikipedia` | 1 |
| Tool: SerpApi | `@n8n/n8n-nodes-langchain.toolSerpApi` | 1 |
| Tool: Think | `@n8n/n8n-nodes-langchain.toolThink` | 1 |
| Tool: Vector Store QA | `@n8n/n8n-nodes-langchain.toolVectorStoreQA` | 1 |
| Tool: MCP Client | `@n8n/n8n-nodes-langchain.mcpClientTool` | 1 |

### Output Parsers (sub-nodos → `ai_outputParser`)
| Nodo | type | typeVersion |
|---|---|---|
| Structured Output Parser | `@n8n/n8n-nodes-langchain.outputParserStructured` | 1.2 |
| Item List Output Parser | `@n8n/n8n-nodes-langchain.outputParserItemList` | 1 |
| Auto-fixing Parser | `@n8n/n8n-nodes-langchain.outputParserAutofixing` | 1 |

### Embeddings (sub-nodos → `ai_embedding`)
| Nodo | type | typeVersion |
|---|---|---|
| Embeddings OpenAI | `@n8n/n8n-nodes-langchain.embeddingsOpenAi` | 1.1 |
| Embeddings Google Gemini | `@n8n/n8n-nodes-langchain.embeddingsGoogleGemini` | 1 |
| Embeddings Ollama | `@n8n/n8n-nodes-langchain.embeddingsOllama` | 1 |
| Embeddings Mistral | `@n8n/n8n-nodes-langchain.embeddingsMistralCloud` | 1 |

### Vector Stores (sub-nodos → `ai_vectorStore`)
| Nodo | type | typeVersion |
|---|---|---|
| Supabase Vector | `@n8n/n8n-nodes-langchain.vectorStoreSupabase` | 1 |
| Pinecone | `@n8n/n8n-nodes-langchain.vectorStorePinecone` | 1 |
| Qdrant | `@n8n/n8n-nodes-langchain.vectorStoreQdrant` | 1 |
| In-Memory | `@n8n/n8n-nodes-langchain.vectorStoreInMemory` | 1.1 |
| PGVector | `@n8n/n8n-nodes-langchain.vectorStorePGVector` | 1.1 |
| Redis Vector | `@n8n/n8n-nodes-langchain.vectorStoreRedis` | 1 |

### Document Loaders / Text Splitters
| Nodo | type | typeVersion |
|---|---|---|
| Default Data Loader | `@n8n/n8n-nodes-langchain.documentDefaultDataLoader` | 1 |
| Recursive Character Splitter | `@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter` | 1 |
| Token Splitter | `@n8n/n8n-nodes-langchain.textSplitterTokenSplitter` | 1 |

---

## ⚠️ Gotchas críticos AI

### Gemini — credential correcta
```json
{
  "type": "@n8n/n8n-nodes-langchain.lmChatGoogleGemini",
  "typeVersion": 1,
  "parameters": { "modelName": "models/gemini-2.0-flash", "options": {} },
  "credentials": {
    "googlePalmApi": { "id": "...", "name": "Google Gemini(PaLM) Api account" }
  }
}
```
**`googlePalmApi`** — NO `googleGeminiApi`

### Memory Buffer fuera de Chat Trigger
Cuando el trigger es Webhook (no Chat Trigger), OBLIGATORIO añadir `sessionIdType: "customKey"`:
```json
{
  "parameters": {
    "sessionIdType": "customKey",
    "sessionKey": "={{ $json.telefono }}",
    "contextWindowLength": 10
  }
}
```
Sin esto → error: *"No session ID found"*

### Posicionamiento sub-nodos AI
Sub-nodos siempre DEBAJO del nodo raíz, no a la derecha:
```
AI Agent:   [750, 300]
Modelo LLM: [750, 600]
Memoria:    [1000, 600]
Tool 1:     [500, 600]
Tool 2:     [500, 800]
```

---

## AI Agent — Configuración completa

```json
{
  "name": "AI Agent",
  "type": "@n8n/n8n-nodes-langchain.agent",
  "typeVersion": 1.8,
  "position": [750, 300],
  "parameters": {
    "agent": "conversationalAgent",
    "promptType": "define",
    "text": "={{ $json.mensaje_usuario }}",
    "options": {
      "systemMessage": "Eres un asistente experto en...\nResponde siempre en español.\nSé conciso y directo.",
      "maxIterations": 10,
      "returnIntermediateSteps": false
    }
  }
}
```

### Tipos de agentes disponibles
- `conversationalAgent` — General conversacional (más común y estable)
- `toolsAgent` — Optimizado para usar tools (recomendado con GPT-4o / Claude)
- `openAiFunctionsAgent` — Function calling nativo OpenAI
- `reActAgent` — Razonamiento step-by-step
- `planAndExecuteAgent` — Planifica antes de ejecutar (tareas largas)

---

## $fromAI() — Parámetros dinámicos en Tools

```js
={{ $fromAI("email", "Email del cliente", "string") }}
={{ $fromAI("cantidad", "Número de items", "number", "10") }}
={{ $fromAI("activo", "Si está activo", "boolean", "true") }}
```
Solo disponible en sub-nodos tool conectados al AI Agent.

---

## Patrón AI Agent completo con tools y memoria

```json
{
  "nodes": [
    {
      "name": "Chat Trigger",
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.1,
      "position": [250, 300],
      "parameters": { "public": false }
    },
    {
      "name": "AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.8,
      "position": [500, 300],
      "parameters": {
        "agent": "toolsAgent",
        "promptType": "define",
        "text": "={{ $json.chatInput }}",
        "options": {
          "systemMessage": "Eres un asistente experto en...",
          "maxIterations": 10
        }
      }
    },
    {
      "name": "Chat OpenAI",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "position": [500, 600],
      "parameters": { "model": "gpt-4o-mini", "options": { "temperature": 0.7 } },
      "credentials": { "openAiApi": { "id": "...", "name": "OpenAI account" } }
    },
    {
      "name": "Memory Buffer",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "position": [750, 600],
      "parameters": { "contextWindowLength": 10, "sessionKey": "={{ $json.sessionId }}" }
    }
  ],
  "connections": {
    "Chat Trigger": { "main": [[{ "node": "AI Agent", "type": "main", "index": 0 }]] },
    "Chat OpenAI": { "ai_languageModel": [[{ "node": "AI Agent", "type": "ai_languageModel", "index": 0 }]] },
    "Memory Buffer": { "ai_memory": [[{ "node": "AI Agent", "type": "ai_memory", "index": 0 }]] }
  }
}
```

---

## Information Extractor — Extraer datos estructurados de texto

```json
{
  "name": "Extraer Datos",
  "type": "@n8n/n8n-nodes-langchain.informationExtractor",
  "typeVersion": 1.1,
  "parameters": {
    "text": "={{ $json.texto_libre }}",
    "attributes": {
      "attributes": [
        { "name": "nombre", "description": "Nombre completo", "required": true },
        { "name": "email", "description": "Email de contacto", "required": false },
        { "name": "telefono", "description": "Teléfono con prefijo", "required": false }
      ]
    }
  }
}
```

---

## Text Classifier — Clasificar texto en categorías

```json
{
  "name": "Clasificar Mensaje",
  "type": "@n8n/n8n-nodes-langchain.textClassifier",
  "typeVersion": 1.1,
  "parameters": {
    "inputText": "={{ $json.mensaje }}",
    "categories": {
      "categories": [
        { "category": "consulta", "description": "El usuario hace una pregunta" },
        { "category": "queja", "description": "El usuario expresa insatisfacción" },
        { "category": "pedido", "description": "El usuario quiere realizar un pedido" },
        { "category": "otro", "description": "Cualquier otro tipo de mensaje" }
      ]
    },
    "options": { "multiClass": false }
  }
}
```

---

## Patrón RAG / Base de conocimiento

```
[Flujo indexación - manual/schedule]:
  HTTP Request obtener docs → Document Loader → Text Splitter
  → Embeddings OpenAI → Vector Store (Pinecone/Supabase)

[Flujo consulta - webhook/chat]:
  Chat Trigger → AI Agent (toolsAgent)
    + Modelo LLM
    + Tool: Vector Store QA
    + Memoria: Buffer Window
```

---

## Credenciales AI

| Modelo | credentialType | nombre en n8n |
|---|---|---|
| OpenAI | `openAiApi` | `OpenAI account` |
| Gemini | `googlePalmApi` | `Google Gemini(PaLM) Api account` |
| Anthropic | `anthropicApi` | `Anthropic account` |
| Groq | `groqApi` | `Groq account` |
