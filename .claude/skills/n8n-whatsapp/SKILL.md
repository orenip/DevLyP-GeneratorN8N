---
name: n8n-whatsapp
description: Referencia completa para WhatsApp via Evolution API en n8n. Nodo nativo n8n-nodes-evolution-api, webhook de entrada, filtros, envío de mensajes y patrones de bots conversacionales.
---

# N8N — WhatsApp / Evolution API

## TypeVersions
| Nodo | type | typeVersion |
|---|---|---|
| Evolution API | `n8n-nodes-evolution-api.evolutionApi` | 1 |
| Webhook (trigger entrada) | `n8n-nodes-base.webhook` | 2 |

**Instalar:** n8n > Settings > Community Nodes > `n8n-nodes-evolution-api`

---

## Webhook de entrada — Acceso a datos del mensaje

```js
// Campos principales del payload Evolution API
$json.body.event                                           // "messages.upsert"
$json.body.data.key.remoteJid                             // "34612345678@s.whatsapp.net"
$json.body.data.key.fromMe                                // true si lo envió la instancia
$json.body.data.pushName                                  // nombre del contacto
$json.body.data.message?.conversation                     // texto simple
$json.body.data.message?.extendedTextMessage?.text        // texto con formato/respuesta
$json.body.data.message?.imageMessage?.caption            // caption de imagen

// Expresión para obtener el texto sin importar el tipo:
$json.body.data.message?.conversation || $json.body.data.message?.extendedTextMessage?.text || ''

// Limpiar el número (quitar @s.whatsapp.net):
$json.body.data.key.remoteJid.replace('@s.whatsapp.net', '').replace('@c.us', '')
```

---

## ⚠️ Filtro obligatorio en todos los bots

**Siempre añadir un IF justo después del Webhook para evitar procesar mensajes propios o eventos no deseados:**

```json
{
  "name": "IF Filtrar Mensajes WA",
  "type": "n8n-nodes-base.if",
  "typeVersion": 2,
  "parameters": {
    "conditions": {
      "conditions": [
        {
          "leftValue": "={{ $json.body.event }}",
          "rightValue": "messages.upsert",
          "operator": { "type": "string", "operation": "equals" }
        },
        {
          "leftValue": "={{ $json.body.data.key.fromMe }}",
          "rightValue": true,
          "operator": { "type": "boolean", "operation": "notEquals" }
        }
      ],
      "combinator": "and"
    }
  }
}
```

---

## Webhook de entrada — Configuración

```json
{
  "name": "Webhook WhatsApp",
  "type": "n8n-nodes-base.webhook",
  "typeVersion": 2,
  "parameters": {
    "httpMethod": "POST",
    "path": "mi-bot-whatsapp",
    "responseMode": "onReceived",
    "options": {}
  }
}
```
**`responseMode: "onReceived"` siempre** — Evolution API no espera respuesta del webhook.

---

## Enviar mensaje de texto

```json
{
  "name": "WA Enviar Mensaje",
  "type": "n8n-nodes-evolution-api.evolutionApi",
  "typeVersion": 1,
  "parameters": {
    "resource": "messages-api",
    "operation": "send-text",
    "instanceName": "={{ $env.EVOLUTION_INSTANCE }}",
    "remoteJid": "={{ $json.telefono + '@s.whatsapp.net' }}",
    "messageText": "={{ $json.mensaje }}",
    "options_message": { "delay": 1200 }
  },
  "credentials": {
    "evolutionApi": { "id": "PLACEHOLDER", "name": "Evolution API account" }
  }
}
```

---

## Operaciones disponibles

```
messages-api:
  send-text, send-image, send-video, send-audio, send-document,
  send-poll, send-contact, send-list, send-buttons, send-reaction

chat:
  verificar-numero, ler-mensagem, buscar-foto-perfil,
  bloquear-contato, buscar-contatos, procurar-mensagens

groups:
  criar-grupo, atualizar-membros, encontrar-participantes, buscar-link-convite

instances:
  criar-instancia, gerar-qr-code, buscar-instancia,
  desconectar-whatsapp, deletar-instancia

events: webhook, rabbitmq
integrations: chatwoot, evolution-bot, typebot, dify, flowise
```

---

## Credencial Evolution API

```
Campos en n8n:
  apiUrl: https://tu-evolution-host.com
  apiKey: tu-api-key-global

El instanceName va como parámetro en cada nodo (no en la credencial).
```

---

## Variables de entorno necesarias

```
EVOLUTION_INSTANCE — nombre de la instancia (va en el parámetro instanceName)
```

---

## Configurar webhook en Evolution API

En el dashboard de Evolution API (o via API):
```
URL webhook: https://tu-n8n.com/webhook/mi-bot-whatsapp
Eventos activar: messages.upsert
```

---

## Patrón bot conversacional completo

```
Webhook (onReceived)
  → IF Filtrar (event=messages.upsert AND fromMe=false)
  → Set Extraer (telefono, mensaje, nombre)
  → Supabase / lógica de negocio
  → AI Agent / Switch de estados
  → WA Enviar respuesta
```
