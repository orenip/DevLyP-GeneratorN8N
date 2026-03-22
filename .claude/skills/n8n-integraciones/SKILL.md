---
name: n8n-integraciones
description: Referencia de integraciones n8n. Gmail, Google Sheets, Drive, Calendar, Telegram Bot, Slack, Notion, Stripe, HubSpot, Shopify y configuración avanzada de HTTP Request v4.2 con autenticación y paginación.
---

# N8N — Integraciones y HTTP Request

## TypeVersions

### Google
| Nodo | type | typeVersion |
|---|---|---|
| Gmail | `n8n-nodes-base.gmail` | 2.1 |
| Google Sheets | `n8n-nodes-base.googleSheets` | 4.5 |
| Google Drive | `n8n-nodes-base.googleDrive` | 3 |
| Google Calendar | `n8n-nodes-base.googleCalendar` | 1.3 |
| Google Docs | `n8n-nodes-base.googleDocs` | 2 |
| Google Translate | `n8n-nodes-base.googleTranslate` | 2 |
| Google Firebase Realtime DB | `n8n-nodes-base.googleFirebaseRealtimeDatabase` | 1 |

### Mensajería
| Nodo | type | typeVersion |
|---|---|---|
| Telegram | `n8n-nodes-base.telegram` | 1.2 |
| Slack | `n8n-nodes-base.slack` | 2.3 |
| Discord | `n8n-nodes-base.discord` | 2 |
| Send Email (SMTP) | `n8n-nodes-base.emailSend` | 2.1 |
| Twilio | `n8n-nodes-base.twilio` | 1 |

### Productividad / CRM / eCommerce
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

---

## HTTP Request v4.2 — Configuración completa

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

### Paginación automática
```json
{
  "options": {
    "pagination": {
      "pagination": {
        "paginationMode": "updateAParameterInEachRequest",
        "nextURL": "={{ $response.body.next_page_url }}",
        "parameters": {
          "parameters": [{ "name": "page", "value": "={{ $pageCount + 1 }}" }]
        },
        "paginationCompleteWhen": "responseIsEmpty"
      }
    }
  }
}
```

### rawBody para verificación de firmas
```json
{ "options": { "rawBody": true } }
// Acceso: $json.rawBody (string) para calcular HMAC
```

---

## Stripe — Patrón webhook (CRÍTICO)

Stripe cancela si no recibe 200 en 30s. **Siempre `responseMode: "onReceived"`**:

```
Webhook (onReceived) → responde 200 inmediatamente
  → IF verificar stripe-signature: $json.headers['stripe-signature']
  → IF tipo de evento: $json.body.type
    → "payment_intent.succeeded": procesar pago
    → "customer.subscription.deleted": cancelar suscripción
    → ...
```

---

## Telegram Bot — Configuración

```json
{
  "httpMethod": "POST",
  "path": "telegram-bot",
  "responseMode": "onReceived",
  "options": {}
}
```

```js
// Acceso a datos del mensaje Telegram:
$json.body.message.chat.id       // chat_id para responder
$json.body.message.text          // texto del mensaje
$json.body.message.from.username // username
$json.body.callback_query.data   // datos de botón inline
```

---

## Gemini API directo (HTTP Request — si no usas LangChain)

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
Respuesta: `$json.candidates[0].content.parts[0].text`

---

## Patrones de flujo con estas integraciones

### Pipeline email con IA
```
Gmail Trigger → Extraer contenido
  → Information Extractor (nombre, empresa, asunto)
  → Text Classifier (consulta/presupuesto/spam/otro)
  → Switch por categoría:
    → "presupuesto": Crear Notion + Notificar Slack
    → "consulta": AI Agent redactar → Gmail crear borrador
    → "spam": NoOp
```

### Notificaciones automatizadas
```
Schedule (cada hora) → HTTP Request consultar API
  → IF hay datos nuevos
    → Set formatear mensaje → Slack/Telegram notificar
    → Supabase registrar última notificación
```

### Stripe → CRM
```
Stripe Webhook (onReceived)
  → IF payment_intent.succeeded
    → HubSpot crear/actualizar contacto
    → Notion registrar pago
    → Gmail enviar recibo
```
