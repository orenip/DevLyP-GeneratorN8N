---
name: n8n-expert
description: >
  Activa este skill cuando el usuario pida generar, modificar, depurar o validar
  workflows de n8n. Contiene la estructura interna completa de n8n JSON, tipos de nodos,
  typeVersions correctas, patrones de expresiones, LangChain/AI, y casos de uso reales.
---

# N8N Expert Skill — Referencia Completa

## Estructura interna de un nodo n8n

```json
{
  "id": "<UUID v4 único>",
  "name": "<nombre descriptivo en español>",
  "type": "<tipo-nodo exacto>",
  "typeVersion": <número>,
  "position": [<x>, <y>],
  "parameters": { ... },
  "credentials": {
    "<credentialType>": {
      "id": "<credential-id-placeholder>",
      "name": "<nombre-credencial-en-n8n>"
    }
  },
  "onError": "continueRegularOutput"
}
```

---

## CATÁLOGO COMPLETO DE NODOS CON TYPEVERSIONS

### Triggers
| Nodo | type | typeVersion |
|---|---|---|
| Webhook | `n8n-nodes-base.webhook` | 2 |
| Schedule | `n8n-nodes-base.scheduleTrigger` | 1.2 |
| Manual | `n8n-nodes-base.manualTrigger` | 1 |
| Error Trigger | `n8n-nodes-base.errorTrigger` | 1 |
| Chat Trigger | `@n8n/n8n-nodes-langchain.chatTrigger` | 1.1 |
| Form Trigger | `n8n-nodes-base.formTrigger` | 2.2 |
| Email Trigger (IMAP) | `n8n-nodes-base.emailReadImap` | 2 |
| Local File Trigger | `n8n-nodes-base.localFileTrigger` | 1 |
| RSS Feed Trigger | `n8n-nodes-base.rssFeedReadTrigger` | 1.1 |
| Workflow Trigger | `n8n-nodes-base.workflowTrigger` | 1 |
| Execute Sub-workflow Trigger | `n8n-nodes-base.executeWorkflowTrigger` | 1 |
| Activation Trigger | `n8n-nodes-base.activationTrigger` | 1 |

### Lógica y flujo de control
| Nodo | type | typeVersion |
|---|---|---|
| IF | `n8n-nodes-base.if` | 2 |
| Switch | `n8n-nodes-base.switch` | 3 |
| Set (Edit Fields) | `n8n-nodes-base.set` | 3.4 |
| Code | `n8n-nodes-base.code` | 2 |
| Merge | `n8n-nodes-base.merge` | 3 |
| Wait | `n8n-nodes-base.wait` | 1 |
| NoOp | `n8n-nodes-base.noOp` | 1 |
| Filter | `n8n-nodes-base.filter` | 2 |
| Split In Batches | `n8n-nodes-base.splitInBatches` | 3 |
| Aggregate | `n8n-nodes-base.aggregate` | 1 |
| Remove Duplicates | `n8n-nodes-base.removeDuplicates` | 1 |
| Sort | `n8n-nodes-base.sort` | 1 |
| Limit | `n8n-nodes-base.limit` | 1 |
| Summarize | `n8n-nodes-base.summarize` | 1 |
| Split Out | `n8n-nodes-base.splitOut` | 1 |
| Compare Datasets | `n8n-nodes-base.compareDatasets` | 3 |
| Execute Workflow | `n8n-nodes-base.executeWorkflow` | 1.1 |
| Stop and Error | `n8n-nodes-base.stopAndError` | 1 |
| Rename Keys | `n8n-nodes-base.renameKeys` | 1 |
| Execution Data | `n8n-nodes-base.executionData` | 1 |

### HTTP / APIs / Archivos
| Nodo | type | typeVersion |
|---|---|---|
| HTTP Request | `n8n-nodes-base.httpRequest` | 4.2 |
| Respond to Webhook | `n8n-nodes-base.respondToWebhook` | 1.1 |
| GraphQL | `n8n-nodes-base.graphql` | 1 |
| FTP | `n8n-nodes-base.ftp` | 1 |
| SSH | `n8n-nodes-base.ssh` | 1 |
| Read/Write Files from Disk | `n8n-nodes-base.readWriteFile` | 1 |
| Extract From File | `n8n-nodes-base.extractFromFile` | 1 |
| Convert to File | `n8n-nodes-base.convertToFile` | 1.1 |
| RSS Read | `n8n-nodes-base.rssFeedRead` | 1.1 |

### Transformación de datos
| Nodo | type | typeVersion |
|---|---|---|
| Date & Time | `n8n-nodes-base.dateTime` | 2 |
| Crypto | `n8n-nodes-base.crypto` | 1 |
| HTML | `n8n-nodes-base.html` | 1.2 |
| XML | `n8n-nodes-base.xml` | 1 |
| Markdown | `n8n-nodes-base.markdown` | 1 |
| Compression | `n8n-nodes-base.compression` | 1 |
| JWT | `n8n-nodes-base.jwt` | 1 |
| Edit Image | `n8n-nodes-base.editImage` | 1 |

### Google
| Nodo | type | typeVersion |
|---|---|---|
| Gmail | `n8n-nodes-base.gmail` | 2.1 |
| Google Sheets | `n8n-nodes-base.googleSheets` | 4.5 |
| Google Drive | `n8n-nodes-base.googleDrive` | 3 |
| Google Calendar | `n8n-nodes-base.googleCalendar` | 1.3 |
| Google Docs | `n8n-nodes-base.googleDocs` | 2 |
| Google Translate | `n8n-nodes-base.googleTranslate` | 2 |
| Google Tasks | `n8n-nodes-base.googleTasks` | 1 |
| YouTube | `n8n-nodes-base.youTube` | 1 |

### Mensajería y comunicación
| Nodo | type | typeVersion |
|---|---|---|
| Telegram | `n8n-nodes-base.telegram` | 1.2 |
| Slack | `n8n-nodes-base.slack` | 2.3 |
| Discord | `n8n-nodes-base.discord` | 2 |
| Send Email (SMTP) | `n8n-nodes-base.emailSend` | 2.1 |
| Gmail | `n8n-nodes-base.gmail` | 2.1 |
| Microsoft Teams | `n8n-nodes-base.microsoftTeams` | 2 |
| WhatsApp Business Cloud | `n8n-nodes-base.whatsApp` | 1 |
| Twilio | `n8n-nodes-base.twilio` | 1 |

### Productividad / CRM / PM
| Nodo | type | typeVersion |
|---|---|---|
| Notion | `n8n-nodes-base.notion` | 2.2 |
| Airtable | `n8n-nodes-base.airtable` | 2.1 |
| HubSpot | `n8n-nodes-base.hubspot` | 2 |
| Salesforce | `n8n-nodes-base.salesforce` | 1 |
| Trello | `n8n-nodes-base.trello` | 1 |
| Jira | `n8n-nodes-base.jira` | 1 |
| Linear | `n8n-nodes-base.linear` | 1 |
| Monday.com | `n8n-nodes-base.mondayCom` | 1 |
| Asana | `n8n-nodes-base.asana` | 1 |
| GitHub | `n8n-nodes-base.github` | 1 |
| GitLab | `n8n-nodes-base.gitlab` | 1 |
| Stripe | `n8n-nodes-base.stripe` | 1 |
| Shopify | `n8n-nodes-base.shopify` | 1 |

### Base de datos
| Nodo | type | typeVersion |
|---|---|---|
| Postgres | `n8n-nodes-base.postgres` | 2.5 |
| Supabase | `n8n-nodes-base.supabase` | 1 |
| MongoDB | `n8n-nodes-base.mongoDb` | 1.1 |
| Redis | `n8n-nodes-base.redis` | 1 |
| MySQL | `n8n-nodes-base.mySql` | 2.3 |
| Microsoft SQL | `n8n-nodes-base.microsoftSql` | 1.1 |

### AI / LangChain — Root Nodes
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

### AI / LangChain — Sub-Nodes (Chat Models → `ai_languageModel`)
| Nodo | type | typeVersion |
|---|---|---|
| Chat OpenAI Model | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1.2 |
| Chat Gemini Model | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` | 1.1 |
| Chat Anthropic | `@n8n/n8n-nodes-langchain.lmChatAnthropic` | 1.4 |
| Chat Ollama | `@n8n/n8n-nodes-langchain.lmChatOllama` | 1 |
| Chat Mistral | `@n8n/n8n-nodes-langchain.lmChatMistralCloud` | 1 |
| Chat Azure OpenAI | `@n8n/n8n-nodes-langchain.lmChatAzureOpenAi` | 1 |
| Chat Groq | `@n8n/n8n-nodes-langchain.lmChatGroq` | 1 |
| Chat DeepSeek | `@n8n/n8n-nodes-langchain.lmChatDeepSeek` | 1 |

### AI / LangChain — Sub-Nodes (Memoria → `ai_memory`)
| Nodo | type | typeVersion |
|---|---|---|
| Memory Buffer Window | `@n8n/n8n-nodes-langchain.memoryBufferWindow` | 1.3 |
| Memory Postgres Chat | `@n8n/n8n-nodes-langchain.memoryPostgresChat` | 1.1 |
| Memory Redis Chat | `@n8n/n8n-nodes-langchain.memoryRedisChat` | 1.1 |
| Memory MongoDB Chat | `@n8n/n8n-nodes-langchain.memoryMongoDbChat` | 1.1 |
| Chat Memory Manager | `@n8n/n8n-nodes-langchain.memoryManager` | 1.1 |

### AI / LangChain — Sub-Nodes (Tools → `ai_tool`)
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
| Tool: AI Agent | `@n8n/n8n-nodes-langchain.toolAgent` | 1 |
| Tool: MCP Client | `@n8n/n8n-nodes-langchain.mcpClientTool` | 1 |

### AI / LangChain — Sub-Nodes (Embeddings → `ai_embedding`)
| Nodo | type | typeVersion |
|---|---|---|
| Embeddings OpenAI | `@n8n/n8n-nodes-langchain.embeddingsOpenAi` | 1.1 |
| Embeddings Google Gemini | `@n8n/n8n-nodes-langchain.embeddingsGoogleGemini` | 1 |
| Embeddings Ollama | `@n8n/n8n-nodes-langchain.embeddingsOllama` | 1 |
| Embeddings Mistral | `@n8n/n8n-nodes-langchain.embeddingsMistralCloud` | 1 |

### AI / LangChain — Sub-Nodes (Vector Stores → `ai_vectorStore`)
| Nodo | type | typeVersion |
|---|---|---|
| Pinecone | `@n8n/n8n-nodes-langchain.vectorStorePinecone` | 1 |
| Supabase Vector | `@n8n/n8n-nodes-langchain.vectorStoreSupabase` | 1 |
| Qdrant | `@n8n/n8n-nodes-langchain.vectorStoreQdrant` | 1 |
| In-Memory | `@n8n/n8n-nodes-langchain.vectorStoreInMemory` | 1.1 |
| PGVector | `@n8n/n8n-nodes-langchain.vectorStorePGVector` | 1.1 |
| Redis Vector | `@n8n/n8n-nodes-langchain.vectorStoreRedis` | 1 |

### AI / LangChain — Sub-Nodes (Output Parsers → `ai_outputParser`)
| Nodo | type | typeVersion |
|---|---|---|
| Structured Output Parser | `@n8n/n8n-nodes-langchain.outputParserStructured` | 1.2 |
| Item List Output Parser | `@n8n/n8n-nodes-langchain.outputParserItemList` | 1 |
| Auto-fixing Parser | `@n8n/n8n-nodes-langchain.outputParserAutofixing` | 1 |

### AI / LangChain — Sub-Nodes (Document Loaders → `ai_document`)
| Nodo | type | typeVersion |
|---|---|---|
| Default Data Loader | `@n8n/n8n-nodes-langchain.documentDefaultDataLoader` | 1 |
| GitHub Document Loader | `@n8n/n8n-nodes-langchain.documentGithubLoader` | 1 |

### AI / LangChain — Sub-Nodes (Text Splitters → `ai_textSplitter`)
| Nodo | type | typeVersion |
|---|---|---|
| Recursive Character Splitter | `@n8n/n8n-nodes-langchain.textSplitterRecursiveCharacterTextSplitter` | 1 |
| Character Splitter | `@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter` | 1 |
| Token Splitter | `@n8n/n8n-nodes-langchain.textSplitterTokenSplitter` | 1 |

---

## CONEXIONES EN n8n

### Conexiones estándar
```json
"connections": {
  "<nodo-origen>": {
    "main": [
      [ { "node": "<nodo-destino>", "type": "main", "index": 0 } ]
    ]
  }
}
```

### IF / Switch (múltiples salidas)
```json
"connections": {
  "IF Validar datos": {
    "main": [
      [ { "node": "Procesar OK", "type": "main", "index": 0 } ],
      [ { "node": "Responder Error", "type": "main", "index": 0 } ]
    ]
  }
}
```

### Sub-nodos AI/LangChain (tipos especiales)
```json
"connections": {
  "Chat OpenAI": {
    "ai_languageModel": [ [ { "node": "AI Agent", "type": "ai_languageModel", "index": 0 } ] ]
  },
  "Memory Buffer": {
    "ai_memory": [ [ { "node": "AI Agent", "type": "ai_memory", "index": 0 } ] ]
  },
  "Tool HTTP": {
    "ai_tool": [ [ { "node": "AI Agent", "type": "ai_tool", "index": 0 } ] ]
  },
  "Embeddings OpenAI": {
    "ai_embedding": [ [ { "node": "Pinecone Store", "type": "ai_embedding", "index": 0 } ] ]
  },
  "Structured Output Parser": {
    "ai_outputParser": [ [ { "node": "Basic LLM Chain", "type": "ai_outputParser", "index": 0 } ] ]
  }
}
```

---

## EXPRESIONES n8n — REFERENCIA COMPLETA

### Variables principales
```js
// Datos del item actual
$json.campo                          // acceso a campo del item
$json["campo con espacios"]          // campo con espacios o caracteres especiales
$json.objeto.subcampo                // acceso anidado
$json.array[0].campo                 // primer elemento de array

// Input del nodo actual
$input.first().json.campo            // primer item
$input.last().json.campo             // último item
$input.all()                         // array de todos los items
$input.item.json.campo               // item actual (en runOnceForEachItem)

// Datos de nodo específico
$node["Nombre Nodo"].json.campo      // output del nodo por nombre
$node["Nombre Nodo"].data            // todos los datos del nodo

// Variables de entorno
$env.NOMBRE_VARIABLE                 // variable de entorno de n8n

// Tiempo
$now                                 // Luxon DateTime actual (UTC)
$today                               // inicio del día actual
$now.toISO()                         // "2026-03-20T10:30:00.000Z"
$now.toFormat("dd/MM/yyyy")          // "20/03/2026"
$now.plus({ days: 7 }).toISO()       // +7 días
$now.minus({ hours: 2 }).toISO()     // -2 horas

// Workflow y ejecución
$workflow.id                         // ID del workflow
$workflow.name                       // nombre del workflow
$execution.id                        // ID de la ejecución actual
$execution.mode                      // "manual" | "trigger" | "webhook"
$runIndex                            // índice del item en el loop (empieza en 0)
$itemIndex                           // índice del item actual

// Parámetros del nodo
$parameter.nombre_parametro          // valor de un parámetro del nodo actual

// URL de resume (para Wait node)
$resumeWebhookUrl                    // URL para reanudar workflow pausado
```

### Métodos de String
```js
// En expresiones, los strings tienen métodos Luxon/JS nativos + helpers n8n
$json.texto.toUpperCase()
$json.texto.toLowerCase()
$json.texto.includes("buscar")
$json.texto.startsWith("prefix")
$json.texto.split(",")
$json.texto.trim()
$json.texto.replace("viejo", "nuevo")
$json.texto.slice(0, 100)           // primeros 100 caracteres
```

### Operadores comunes en expresiones
```js
// Ternario
={{ $json.activo ? "Sí" : "No" }}

// Null coalescing
={{ $json.campo ?? "valor por defecto" }}

// Encadenamiento opcional
={{ $json.objeto?.subcampo?.valor }}

// Template literal
={{ `Hola ${$json.nombre}, tienes ${$json.mensajes} mensajes` }}

// Concatenación
={{ "Prefijo: " + $json.campo }}

// Número a string
={{ $json.numero.toString() }}

// String a número
={{ parseInt($json.texto) }}
={{ parseFloat($json.decimal) }}

// JSON parse/stringify
={{ JSON.parse($json.json_string) }}
={{ JSON.stringify($json.objeto) }}

// Array methods
={{ $json.array.length }}
={{ $json.array.join(", ") }}
={{ $json.array.filter(x => x > 0) }}
={{ $json.array.map(x => x * 2) }}
={{ $json.array.find(x => x.id === "abc") }}
```

### Acceso desde Code node (JavaScript)
```js
// Procesar todos los items
const items = $input.all();
return items.map(item => ({
  json: {
    resultado: item.json.campo,
    timestamp: new Date().toISOString()
  }
}));

// Procesar item a item (runOnceForEachItem)
return {
  json: {
    campo: $json.valor.toUpperCase(),
    calculado: $json.precio * 1.21
  }
};

// Acceder a variables de entorno
const apiKey = $env.MI_API_KEY;

// Acceder a parámetros del nodo
const param = $parameter.miParametro;

// Acceder a datos de nodo anterior específico
const datosDelWebhook = $node["Webhook"].json;

// Retornar múltiples items desde uno
return [
  { json: { parte: 1, datos: "..." } },
  { json: { parte: 2, datos: "..." } }
];
```

---

## AI AGENT — PATRONES AVANZADOS

### Tipos de agentes disponibles
- `conversationalAgent` — Agente conversacional general (más común)
- `toolsAgent` — Agente optimizado para usar tools (recomendado con GPT-4o / Claude)
- `openAiFunctionsAgent` — Usa function calling nativo de OpenAI
- `reActAgent` — Razonamiento step-by-step (más lento, más transparente)
- `planAndExecuteAgent` — Planifica antes de ejecutar (tareas largas)
- `sqlAgent` — Especializado en consultas SQL

### $fromAI() — Parámetros dinámicos en Tools
La función `$fromAI()` permite que el AI Agent rellene parámetros dinámicamente:
```js
// Sintaxis: $fromAI("key", "descripción", "tipo", "valor_default")
={{ $fromAI("email", "Email del cliente", "string") }}
={{ $fromAI("cantidad", "Número de items a buscar", "number", "10") }}
={{ $fromAI("activo", "Si está activo", "boolean", "true") }}

// Solo disponible en tools conectados al AI Agent
// NO funciona en Code node ni otros nodos no-tool
```

### Patrón AI Agent completo con tools y memoria
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
          "systemMessage": "Eres un asistente experto en...\nResponde siempre en español.",
          "maxIterations": 10,
          "returnIntermediateSteps": false
        }
      }
    },
    {
      "name": "Chat OpenAI",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1.2,
      "position": [500, 550],
      "parameters": {
        "model": "gpt-4o-mini",
        "options": { "temperature": 0.7 }
      },
      "credentials": { "openAiApi": { "id": "...", "name": "OpenAI account" } }
    },
    {
      "name": "Memory Buffer",
      "type": "@n8n/n8n-nodes-langchain.memoryBufferWindow",
      "typeVersion": 1.3,
      "position": [750, 550],
      "parameters": {
        "contextWindowLength": 10,
        "sessionKey": "={{ $json.sessionId }}"
      }
    }
  ],
  "connections": {
    "Chat Trigger": { "main": [ [ { "node": "AI Agent", "type": "main", "index": 0 } ] ] },
    "Chat OpenAI": { "ai_languageModel": [ [ { "node": "AI Agent", "type": "ai_languageModel", "index": 0 } ] ] },
    "Memory Buffer": { "ai_memory": [ [ { "node": "AI Agent", "type": "ai_memory", "index": 0 } ] ] }
  }
}
```

### Information Extractor (structured output desde texto)
```json
{
  "name": "Extraer Datos",
  "type": "@n8n/n8n-nodes-langchain.informationExtractor",
  "typeVersion": 1.1,
  "parameters": {
    "text": "={{ $json.texto_libre }}",
    "attributes": {
      "attributes": [
        { "name": "nombre", "description": "Nombre completo de la persona", "required": true },
        { "name": "email", "description": "Email de contacto", "required": false },
        { "name": "telefono", "description": "Número de teléfono con prefijo", "required": false }
      ]
    }
  }
}
```

### Text Classifier (clasificar texto en categorías)
```json
{
  "name": "Clasificar Mensaje",
  "type": "@n8n/n8n-nodes-langchain.textClassifier",
  "typeVersion": 1.1,
  "parameters": {
    "inputText": "={{ $json.mensaje }}",
    "categories": {
      "categories": [
        { "category": "consulta", "description": "El usuario hace una pregunta sobre productos o servicios" },
        { "category": "queja", "description": "El usuario expresa insatisfacción o reporta un problema" },
        { "category": "pedido", "description": "El usuario quiere realizar o consultar un pedido" },
        { "category": "otro", "description": "Cualquier otro tipo de mensaje" }
      ]
    },
    "options": { "multiClass": false }
  }
}
```

---

## WEBHOOK — CONFIGURACIÓN COMPLETA

### Parámetros del Webhook node
```json
{
  "httpMethod": "POST",
  "path": "mi-webhook-unico",
  "responseMode": "responseNode",
  "options": {
    "rawBody": false,
    "responseHeaders": {
      "entries": []
    }
  }
}
```

### Modos de respuesta
- `onReceived` — Responde 200 inmediatamente y procesa en segundo plano. **Usar para Stripe, Telegram, Slack** (requieren respuesta inmediata)
- `lastNode` — Espera al último nodo y devuelve su output automáticamente
- `responseNode` — Requiere nodo "Respond to Webhook" explícito (control total)

### Autenticación en Webhook
- `none` — Sin auth (solo para desarrollo/testing)
- `basicAuth` — Usuario y contraseña por request
- `headerAuth` — Token estático en header (ej: `X-API-Key`)
- `jwtAuth` — Token JWT firmado

### Acceso a datos del webhook
```js
$json.body.campo         // datos del body POST
$json.query.parametro    // query string (?parametro=valor)
$json.headers["x-api-key"]  // header específico
$json.params.id          // URL path params (/webhook/:id)
```

### rawBody para verificación de firmas (Stripe, GitHub)
```json
{
  "options": { "rawBody": true }
}
```
Acceso: `$json.rawBody` (string) para calcular HMAC

---

## MANEJO DE ERRORES — PATRONES COMPLETOS

### Patrón 1: IF de validación al inicio (OBLIGATORIO en webhooks)
```
Webhook → IF Tiene campo requerido?
  → true (output 0): Procesar
  → false (output 1): Respond to Webhook 400
```

### Patrón 2: continueOnFail + IF detectar error HTTP
```json
{ "onError": "continueRegularOutput" }
```
```js
// En el IF siguiente al HTTP Request:
// Condición: $json.error !== undefined
```

### Patrón 3: Error Workflow global (flujo separado dedicado)
```
[Flujo dedicado de errores]
Error Trigger → Set Formatear Error → Telegram/Slack Notificar → Supabase Registrar Log
```
Datos disponibles en el Error Trigger:
```js
$json.execution.id            // ID de la ejecución fallida
$json.execution.error.message // Mensaje de error
$json.execution.error.stack   // Stack trace
$json.workflow.id             // ID del workflow
$json.workflow.name           // Nombre del workflow
$json.execution.startedAt     // Cuándo empezó
```
**Configurar en n8n:** Settings del workflow → Error Workflow → seleccionar el flujo de errores

### Patrón 4: Stop and Error para validaciones de negocio
```json
{
  "errorMessage": "={{ 'Payload inválido: falta el campo ' + $json.campo_faltante }}"
}
```

### Patrón 5: Retry manual con Wait
```
HTTP Request (continueOnFail) → IF ¿Error?
  → Sí: Set incrementar contador → IF ¿contador < 3?
      → Sí: Wait 30s → HTTP Request
      → No: Stop and Error
  → No: Continuar
```

---

## HTTP REQUEST — CONFIGURACIÓN v4.2

### Estructura parámetros v4.2
```json
{
  "method": "POST",
  "url": "https://api.ejemplo.com/endpoint",
  "authentication": "none",
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      { "name": "Content-Type", "value": "application/json" },
      { "name": "Authorization", "value": "=Bearer {{ $env.API_KEY }}" }
    ]
  },
  "sendQuery": false,
  "sendBody": true,
  "specifyBody": "json",
  "jsonBody": "={{ JSON.stringify({ campo: $json.valor }) }}",
  "options": {
    "response": {
      "response": {
        "fullResponse": false,
        "neverError": false
      }
    }
  },
  "onError": "continueRegularOutput"
}
```

### Métodos de autenticación disponibles
- `none` — Sin autenticación
- `genericCredentialType` — Credencial genérica n8n
- `predefinedCredentialType` — Usar credencial de integración n8n (OAuth2, etc.)

### Paginación automática
```json
{
  "options": {
    "pagination": {
      "pagination": {
        "paginationMode": "updateAParameterInEachRequest",
        "nextURL": "={{ $response.body.next_page_url }}",
        "parameters": {
          "parameters": [
            { "name": "page", "value": "={{ $pageCount + 1 }}" }
          ]
        },
        "paginationCompleteWhen": "responseIsEmpty"
      }
    }
  }
}
```

---

## INTEGRACIONES — PATRONES DE PRODUCCIÓN

### Evolution API (WhatsApp) — Webhook entrada
```js
// Datos del mensaje entrante
$json.body.data.key.remoteJid    // número remitente (ej: 34600000000@s.whatsapp.net)
$json.body.data.message.conversation  // texto del mensaje
$json.body.data.pushName          // nombre del contacto
$json.body.event                  // "messages.upsert"
$json.body.data.key.fromMe        // true si lo envió la propia instancia

// Filtro OBLIGATORIO en IF:
// $json.body.event === 'messages.upsert' && $json.body.data.key.fromMe === false
```

### Evolution API — Enviar mensaje (HTTP Request v4.2)
```json
{
  "method": "POST",
  "url": "=https://{{ $env.EVOLUTION_HOST }}/message/sendText/{{ $env.EVOLUTION_INSTANCE }}",
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      { "name": "apikey", "value": "={{ $env.EVOLUTION_API_KEY }}" },
      { "name": "Content-Type", "value": "application/json" }
    ]
  },
  "sendBody": true,
  "specifyBody": "json",
  "jsonBody": "={{ JSON.stringify({ number: $json.numero, text: $json.mensaje }) }}"
}
```

### Gemini API (HTTP Request v4.2)
```json
{
  "method": "POST",
  "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  "sendQuery": true,
  "queryParameters": {
    "parameters": [{ "name": "key", "value": "={{ $env.GEMINI_API_KEY }}" }]
  },
  "sendBody": true,
  "specifyBody": "json",
  "jsonBody": "={{ JSON.stringify({ contents: [{ parts: [{ text: $json.prompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 2048 } }) }}"
}
```
Respuesta: `{{ $json.candidates[0].content.parts[0].text }}`

### Supabase REST API (HTTP Request v4.2)
```json
{
  "method": "POST",
  "url": "=https://{{ $env.SUPABASE_URL }}/rest/v1/tabla_nombre",
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      { "name": "apikey", "value": "={{ $env.SUPABASE_ANON_KEY }}" },
      { "name": "Authorization", "value": "=Bearer {{ $env.SUPABASE_ANON_KEY }}" },
      { "name": "Content-Type", "value": "application/json" },
      { "name": "Prefer", "value": "return=representation" }
    ]
  },
  "sendBody": true,
  "specifyBody": "json",
  "jsonBody": "={{ JSON.stringify({ campo1: $json.valor1, campo2: $json.valor2 }) }}"
}
```

### Stripe — Responder inmediatamente (CRÍTICO)
Stripe cancela si no recibe 200 en 30s. Patrón correcto:
1. Webhook con `responseMode: "onReceived"` → responde 200 al instante
2. IF verificar `stripe-signature`: `$json.headers['stripe-signature']`
3. IF tipo de evento: `$json.body.type`
4. Procesar según evento

### Telegram Bot — Configuración
```json
{
  "httpMethod": "POST",
  "path": "telegram-bot",
  "responseMode": "onReceived",
  "options": {}
}
```
```js
// Datos del mensaje:
$json.body.message.chat.id       // chat_id para responder
$json.body.message.text          // texto del mensaje
$json.body.message.from.username // username
$json.body.callback_query.data   // datos de botón inline
```

---

## NODOS AVANZADOS — CASOS ESPECÍFICOS

### Sort
```json
{
  "type": "simple",
  "sortFieldsUi": {
    "sortField": [
      { "fieldName": "fecha", "order": "descending" }
    ]
  }
}
```

### Limit
```json
{
  "maxItems": 10,
  "keepItems": "firstItems"
}
```

### Summarize (agrupar y agregar)
```json
{
  "fieldsToSummarize": {
    "values": [
      { "aggregation": "sum", "field": "importe" },
      { "aggregation": "count", "field": "id" }
    ]
  },
  "options": {
    "fieldsToGroupBy": { "values": [{ "fieldName": "categoria" }] }
  }
}
```

### Compare Datasets (unir/comparar dos fuentes)
```json
{
  "mergeByFields": {
    "values": [{ "field1": "email", "field2": "email" }]
  },
  "outputDataFrom": "both",
  "options": {}
}
```

### Wait (pausar workflow)
```json
{
  "resume": "timeInterval",
  "unit": "minutes",
  "amount": 30
}
```
Para reanudar con webhook: `resume: "webhook"` + usar `$resumeWebhookUrl`

### Schedule — Expresiones cron útiles
```
0 9 * * 1-5    → Lunes a viernes a las 9:00
0 */2 * * *    → Cada 2 horas
*/15 * * * *   → Cada 15 minutos
0 8 1 * *      → El día 1 de cada mes a las 8:00
0 0 * * 0      → Cada domingo a medianoche
```

---

## POSICIONAMIENTO RECOMENDADO

```
Sticky Note:         [0,    150]    (color 5=naranja o 2=azul)
Trigger:             [250,  300]
Validación IF:       [500,  300]
  ├── Rama OK:       [750,  200]    (output 0 del IF)
  └── Rama Error:    [750,  500]    (output 1 del IF)
Proceso 1:           [1000, 200]
Proceso 2:           [1250, 200]
Respuesta final:     [1500, 300]

Para flujos en paralelo (Merge al final):
  Rama A:            [750,  100] → [1000, 100]
  Rama B:            [750,  400] → [1000, 400]
  Merge:             [1250, 250]

Sub-nodos AI (DEBAJO del nodo raíz, no a la derecha):
  AI Agent:          [750,  300]
  Modelo LLM:        [750,  600]
  Memoria:           [1000, 600]
  Tool 1:            [500,  600]
  Tool 2:            [500,  800]
```

---

## PATRONES DE FLUJOS COMPLETOS MÁS DEMANDADOS

### 1. Chatbot WhatsApp con IA y memoria
```
Webhook → IF Filtrar mensajes propios → Set Extraer datos
  → IF Clasificar intención (TextClassifier)
    → Caso "consulta": AI Agent + Gemini + Memoria Buffer → Enviar respuesta WA
    → Caso "pedido": Consultar Supabase → Formatear respuesta → Enviar WA
    → Caso "otro": Enviar respuesta genérica WA
```

### 2. Pipeline de procesamiento de emails con IA
```
Gmail Trigger → Extraer contenido email
  → Information Extractor (nombre, empresa, asunto)
  → Text Classifier (consulta/presupuesto/spam/otro)
  → Switch por categoría:
    → "presupuesto": Crear registro Notion + Notificar Slack
    → "consulta": AI Agent redactar respuesta → Gmail crear borrador
    → "spam": NoOp (ignorar)
```

### 3. Notificaciones y alertas automatizadas
```
Schedule Trigger (cada hora) → HTTP Request consultar API
  → IF hay datos nuevos
    → Set formatear mensaje → Slack/Telegram notificar
    → Supabase registrar última notificación
```

### 4. Procesamiento en lote con manejo de errores
```
Webhook → IF validar payload → Obtener lista (Sheets/Supabase)
  → SplitInBatches (10 por lote)
    → HTTP Request (continueOnFail)
    → IF ¿error? → Set marcar como fallido / Set marcar como exitoso
    → Merge resultados
  → Done: Aggregate resultados → Set resumen → Respond to Webhook
```

### 5. RAG con documentos (base de conocimiento)
```
[Flujo de indexación - manual/schedule]:
  HTTP Request obtener docs → Document Loader → Text Splitter
  → Embeddings OpenAI → Vector Store (Pinecone/Supabase)

[Flujo de consulta - webhook/chat]:
  Chat Trigger → AI Agent (toolsAgent)
    + Modelo: Chat OpenAI
    + Tool: Vector Store QA (busca en la BD vectorial)
    + Tool: HTTP Request (info en tiempo real si necesario)
    + Memoria: Buffer Window
```

---

## BUENAS PRÁCTICAS DE PRODUCCIÓN

1. **UUIDs únicos**: generar UUID v4 válido para cada nodo
2. **`$env.VARIABLE`**: NUNCA hardcodear credenciales, siempre `={{ $env.NOMBRE }}`
3. **`responseMode: onReceived`**: para Stripe, Telegram, Slack (necesitan 200 inmediato)
4. **`continueOnFail`**: en HTTP Requests que pueden fallar, manejar con IF posterior
5. **Sticky Note**: siempre al inicio del flujo con descripción, vars requeridas y credenciales
6. **Nombres descriptivos**: nodos con nombre en español que expliquen qué hacen
7. **Error Workflow**: configurar en Settings del workflow para captura centralizada
8. **Sub-nodos AI**: posicionar DEBAJO del nodo raíz (Y+250/300), no a la derecha
9. **typeVersion**: siempre el más reciente de la tabla (el validador lo comprobará)
10. **Testing**: documentar en `meta.description` cómo testear el flujo
