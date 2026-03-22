---
name: n8n-expert
description: Activa este skill para generar, modificar, depurar o validar workflows de n8n. TypeVersions correctas, conexiones AI/LangChain, gotchas críticos y expresiones.
---

# N8N Expert — Core (siempre cargar)

> Este skill contiene la base siempre necesaria.
> Para integraciones específicas, carga además el skill correspondiente:
> - WhatsApp/Evolution API → skill `n8n-whatsapp`
> - AI/LangChain/Gemini/OpenAI → skill `n8n-ai-langchain`
> - Supabase/Postgres/MongoDB → skill `n8n-database`
> - Gmail/Sheets/Telegram/Stripe/Notion/HTTP → skill `n8n-integraciones`
> - SplitInBatches/Sort/Aggregate/datos → skill `n8n-datos`

---

## Estructura de nodo (campos obligatorios)

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

## TypeVersions — Nodos base

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
| Execute Sub-workflow Trigger | `n8n-nodes-base.executeWorkflowTrigger` | 1 |
| Workflow Trigger | `n8n-nodes-base.workflowTrigger` | 1 |

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
| Execution Data | `n8n-nodes-base.executionData` | 1 |

### HTTP / APIs / Archivos
| Nodo | type | typeVersion |
|---|---|---|
| HTTP Request | `n8n-nodes-base.httpRequest` | 4.2 |
| Respond to Webhook | `n8n-nodes-base.respondToWebhook` | 1.1 |
| Read/Write Files | `n8n-nodes-base.readWriteFile` | 1 |
| Extract From File | `n8n-nodes-base.extractFromFile` | 1 |
| Convert to File | `n8n-nodes-base.convertToFile` | 1.1 |

### Transformación
| Nodo | type | typeVersion |
|---|---|---|
| Date & Time | `n8n-nodes-base.dateTime` | 2 |
| Crypto | `n8n-nodes-base.crypto` | 1 |
| HTML | `n8n-nodes-base.html` | 1.2 |
| XML | `n8n-nodes-base.xml` | 1 |
| Markdown | `n8n-nodes-base.markdown` | 1 |
| JWT | `n8n-nodes-base.jwt` | 1 |

---

## ⚠️ SplitInBatches — Outputs CRÍTICOS

```
Output 0 = "Done"  → se activa cuando TERMINA el bucle (lo que va DESPUÉS del loop)
Output 1 = "Loop"  → se activa con CADA ITEM (la cadena de procesado)
```

**Loop-back:** el último nodo de la cadena conecta de vuelta al INPUT del SplitInBatches.

```json
"connections": {
  "MiLoop": {
    "main": [
      [],
      [{ "node": "PrimerNodoProcesado", "type": "main", "index": 0 }]
    ]
  },
  "UltimoNodoProcesado": {
    "main": [[{ "node": "MiLoop", "type": "main", "index": 0 }]]
  }
}
```

---

## Conexiones estándar

```json
"connections": {
  "NodoOrigen": {
    "main": [
      [{ "node": "NodoDestino", "type": "main", "index": 0 }]
    ]
  },
  "IF Validar": {
    "main": [
      [{ "node": "Procesar OK", "type": "main", "index": 0 }],
      [{ "node": "Responder Error", "type": "main", "index": 0 }]
    ]
  }
}
```

### Conexiones AI/LangChain (tipos especiales)
```json
"Gemini Model":  { "ai_languageModel": [[{ "node": "AI Agent", "type": "ai_languageModel", "index": 0 }]] }
"Memory Buffer": { "ai_memory":        [[{ "node": "AI Agent", "type": "ai_memory",        "index": 0 }]] }
"Tool HTTP":     { "ai_tool":          [[{ "node": "AI Agent", "type": "ai_tool",          "index": 0 }]] }
"Embeddings":    { "ai_embedding":     [[{ "node": "VectorStore","type": "ai_embedding",   "index": 0 }]] }
"OutputParser":  { "ai_outputParser":  [[{ "node": "Chain",     "type": "ai_outputParser", "index": 0 }]] }
```

---

## EXPRESIONES n8n — Referencia

```js
// Datos del item actual
$json.campo
$json["campo con espacios"]
$json.objeto.subcampo
$json.array[0].campo

// Input y nodos específicos
$input.first().json.campo
$input.last().json.campo
$input.all()
$node["Nombre Nodo"].json.campo

// Variables de entorno
$env.NOMBRE_VARIABLE

// Tiempo (Luxon)
$now                              // DateTime actual UTC
$now.toISO()                      // "2026-03-21T10:30:00.000Z"
$now.toFormat("dd/MM/yyyy")       // "21/03/2026"
$now.plus({ days: 7 }).toISO()
$now.minus({ hours: 2 }).toISO()

// Workflow y ejecución
$workflow.id / $workflow.name
$execution.id / $execution.mode
$runIndex / $itemIndex

// Operadores útiles
={{ $json.campo ?? "default" }}
={{ $json.objeto?.subcampo }}
={{ `Hola ${$json.nombre}` }}
={{ JSON.stringify($json.objeto) }}
={{ JSON.parse($json.string) }}
={{ $json.array.filter(x => x > 0) }}
={{ $json.array.map(x => x * 2) }}

// Code node (runOnceForAllItems)
const items = $input.all();
return items.map(item => ({ json: { resultado: item.json.campo } }));
```

---

## Webhook — Modos de respuesta

- `onReceived` — Responde 200 inmediatamente. **Usar para Evolution API, Stripe, Telegram, Slack**
- `lastNode` — Espera al último nodo y devuelve su output
- `responseNode` — Requiere nodo "Respond to Webhook" explícito

```js
// Acceso a datos del webhook
$json.body.campo         // body POST
$json.query.parametro    // query string
$json.headers["x-key"]  // headers
$json.params.id          // URL path params
```

**rawBody para verificar firmas (Stripe, GitHub):**
```json
{ "options": { "rawBody": true } }
```

---

## Manejo de errores — Patrones

**Patrón 1 (obligatorio en webhooks):** IF de validación al inicio
```
Webhook → IF tiene campos requeridos?
  → true: Procesar
  → false: Respond 400
```

**Patrón 2:** continueOnFail + IF detectar error
```json
{ "onError": "continueRegularOutput" }
// IF posterior: $json.error !== undefined
```

**Patrón 3:** Error Workflow global (flujo separado)
```
Error Trigger → Set Formatear Error → Slack/Telegram notificar → Supabase Registrar Log
```
Datos disponibles: `$json.execution.id`, `$json.execution.error.message`, `$json.workflow.name`

**Patrón 4:** Stop and Error para validaciones de negocio
```json
{ "errorMessage": "={{ 'Payload inválido: ' + $json.campo }}" }
```

---

## Posicionamiento de nodos

```
Sticky Note:   [0,   150]
Trigger:       [250, 300]    cada nodo siguiente: +250 X
IF rama OK:    [500, 200]    (output 0)
IF rama ERR:   [500, 450]    (output 1)
Paralelo A:    [750, 100] → [1000, 100]
Paralelo B:    [750, 400] → [1000, 400]
Sub-nodos AI:  mismo X que nodo raíz, +300 Y (DEBAJO, no a la derecha)
```

---

## REGLA FUNDAMENTAL: NODO NATIVO SIEMPRE

**NUNCA usar HTTP Request si existe nodo nativo o community node.**

| Servicio | Nodo nativo |
|---|---|
| Evolution API (WhatsApp) | `n8n-nodes-evolution-api.evolutionApi` |
| Telegram | `n8n-nodes-base.telegram` |
| Slack | `n8n-nodes-base.slack` |
| Gmail | `n8n-nodes-base.gmail` |
| Google Sheets | `n8n-nodes-base.googleSheets` |
| Notion | `n8n-nodes-base.notion` |
| Stripe | `n8n-nodes-base.stripe` |
| Supabase | `n8n-nodes-base.supabase` |
| Postgres | `n8n-nodes-base.postgres` |

HTTP Request **solo** para APIs sin nodo nativo propio.

---

## Buenas prácticas de producción

1. UUID v4 único por nodo — nunca repetir IDs
2. `$env.VARIABLE` — nunca hardcodear credentials
3. `responseMode: onReceived` para Stripe, Telegram, Slack, Evolution API
4. `continueOnFail` en HTTP Requests que pueden fallar, manejar con IF posterior
5. Sticky Note al inicio con descripción, vars requeridas y credenciales
6. Nombres descriptivos en español que expliquen qué hace el nodo
7. Sub-nodos AI posicionados DEBAJO del nodo raíz (Y+300), no a la derecha
8. `typeVersion` siempre el más reciente de la tabla
