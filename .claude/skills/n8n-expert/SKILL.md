---
name: n8n-expert
description: >
  Activa este skill cuando el usuario pida generar, modificar, depurar o validar
  workflows de n8n. Contiene la estructura interna completa de n8n JSON, tipos de nodos,
  typeVersions correctas, y patrones para las integraciones más comunes.
---

# N8N Expert Skill

## Estructura interna de un nodo n8n

```json
{
  "id": "<UUID v4 único>",
  "name": "<nombre descriptivo>",
  "type": "<tipo-nodo>",
  "typeVersion": <número>,
  "position": [<x>, <y>],
  "parameters": { ... },
  "credentials": {
    "<credentialType>": {
      "id": "<credential-id>",
      "name": "<nombre-credencial>"
    }
  }
}
```

## Tipos de nodos más usados y sus typeVersions

### Triggers
| Nodo | type | typeVersion |
|---|---|---|
| Webhook | `n8n-nodes-base.webhook` | 2 |
| Schedule | `n8n-nodes-base.scheduleTrigger` | 1.2 |
| Manual | `n8n-nodes-base.manualTrigger` | 1 |

### Lógica
| Nodo | type | typeVersion |
|---|---|---|
| IF | `n8n-nodes-base.if` | 2 |
| Switch | `n8n-nodes-base.switch` | 3 |
| Set | `n8n-nodes-base.set` | 3.4 |
| Code | `n8n-nodes-base.code` | 2 |
| Merge | `n8n-nodes-base.merge` | 3 |
| Wait | `n8n-nodes-base.wait` | 1 |
| NoOp | `n8n-nodes-base.noOp` | 1 |

### HTTP / APIs
| Nodo | type | typeVersion |
|---|---|---|
| HTTP Request | `n8n-nodes-base.httpRequest` | 4.2 |
| Respond to Webhook | `n8n-nodes-base.respondToWebhook` | 1.1 |

### Google
| Nodo | type | typeVersion |
|---|---|---|
| Gmail | `n8n-nodes-base.gmail` | 2.1 |
| Google Sheets | `n8n-nodes-base.googleSheets` | 4.5 |

### OpenAI / IA
| Nodo | type | typeVersion |
|---|---|---|
| OpenAI | `@n8n/n8n-nodes-langchain.openAi` | 1.8 |
| AI Agent | `@n8n/n8n-nodes-langchain.agent` | 1.8 |
| Chat OpenAI Model | `@n8n/n8n-nodes-langchain.lmChatOpenAi` | 1.2 |
| HTTP Request (Gemini) | `n8n-nodes-base.httpRequest` | 4.2 |

### Base de datos
| Nodo | type | typeVersion |
|---|---|---|
| Postgres | `n8n-nodes-base.postgres` | 2.5 |
| Supabase | `n8n-nodes-base.supabase` | 1 |

### Comunicación
| Nodo | type | typeVersion |
|---|---|---|
| Gmail | `n8n-nodes-base.gmail` | 2.1 |
| Send Email (SMTP) | `n8n-nodes-base.emailSend` | 2.1 |

## Formato de connections

```json
"connections": {
  "<nombre-nodo-origen>": {
    "main": [
      [
        { "node": "<nombre-nodo-destino>", "type": "main", "index": 0 }
      ]
    ]
  }
}
```

Para nodos con múltiples salidas (IF, Switch):
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

## Patrón Evolution API (WhatsApp)

### Enviar mensaje de texto
```json
{
  "method": "POST",
  "url": "https://<evolution-host>/message/sendText/<instancia>",
  "headers": {
    "apikey": "={{ $env.EVOLUTION_API_KEY }}",
    "Content-Type": "application/json"
  },
  "body": {
    "number": "={{ $json.telefono }}",
    "text": "={{ $json.mensaje }}"
  }
}
```

### Webhook Evolution API (entrada)
- El webhook de Evolution envía en `$json.body.data`
- Número del remitente: `$json.body.data.key.remoteJid`
- Mensaje de texto: `$json.body.data.message.conversation`
- Tipo de mensaje: `$json.body.event`

## Patrón Gemini API (HTTP Request)

```json
{
  "method": "POST",
  "url": "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  "qs": { "key": "={{ $env.GEMINI_API_KEY }}" },
  "body": {
    "contents": [
      {
        "parts": [{ "text": "={{ $json.prompt }}" }]
      }
    ]
  }
}
```
Respuesta: `$json.candidates[0].content.parts[0].text`

## Patrón Supabase (HTTP Request)

```json
{
  "method": "POST",
  "url": "https://<proyecto>.supabase.co/rest/v1/<tabla>",
  "headers": {
    "apikey": "={{ $env.SUPABASE_ANON_KEY }}",
    "Authorization": "Bearer {{ $env.SUPABASE_ANON_KEY }}",
    "Content-Type": "application/json",
    "Prefer": "return=representation"
  },
  "body": { ... }
}
```

## Patrón Stripe Webhook

Validar que viene de Stripe:
- Header `stripe-signature` debe existir
- Usar nodo Code para verificar si es necesario

Eventos comunes:
- `payment_intent.succeeded` → pago completado
- `checkout.session.completed` → sesión de checkout completada
- `customer.subscription.created` → nueva suscripción

## Buenas prácticas de generación

1. **UUIDs**: generar v4 válidos para cada nodo (formato: 8-4-4-4-12 hex)
2. **Nombres de nodo**: descriptivos en español, sin caracteres especiales
3. **Variables de entorno**: usar siempre `$env.NOMBRE_VAR` nunca valores hardcodeados
4. **Posicionamiento**: distribuir nodos horizontalmente, ramas verticalmente
5. **Notas**: añadir nodo Sticky Note al inicio con descripción del flujo
6. **Testing**: siempre incluir comentario en `meta.description` sobre cómo testear

## Sticky Note (documentación en el flujo)

```json
{
  "id": "<uuid>",
  "name": "Descripción del flujo",
  "type": "n8n-nodes-base.stickyNote",
  "typeVersion": 1,
  "position": [0, 200],
  "parameters": {
    "content": "## <Título del flujo>\n\n**Descripción:** <qué hace>\n\n**Dependencias:**\n- <lista de credenciales/vars necesarias>\n\n**Autor:** DevLyP\n**Fecha:** <fecha>"
  }
}
```
