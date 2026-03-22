# n8n Flow Generator — Instrucciones para Claude Code

## Propósito
Este proyecto genera workflows JSON válidos e importables para n8n (versión self-hosted última estable).
Cada JSON generado debe poder importarse directamente en n8n sin errores y funcionar en producción.

## Reglas absolutas

1. **SIEMPRE** preguntar el nombre del proyecto antes de guardar si no se ha indicado.
2. **SIEMPRE** ejecutar `node validador.js <ruta-fichero>` tras generar cada JSON.
3. **NUNCA** generar un JSON sin nodos de manejo de errores (al menos un nodo Error Trigger o try/catch via IF).
4. **SIEMPRE** guardar en `flujos/<nombre-proyecto>/<nombre-flujo>.json`.
5. Los nombres de fichero usan kebab-case: `webhook-whatsapp-respuesta-ia.json`.
6. **SIEMPRE** incluir el campo `"meta"` en el JSON con autor, fecha y descripción.
7. **SIEMPRE** usar el nodo nativo/community de cada servicio cuando exista. **NUNCA** usar HTTP Request si hay nodo propio disponible. Ver tabla de integraciones arriba. HTTP Request solo para APIs sin nodo nativo.
8. **SplitInBatches (Loop Over Items):** output **0 = Done** (fin del bucle, conectar a lo que sigue después), output **1 = Loop** (procesar cada item). Los nodos al final del bucle conectan de vuelta al input de SplitInBatches.

## Versión de n8n objetivo
- Versión: última estable (self-hosted en Render)
- Motor de ejecución: `v1` (no legacy)
- Credentials: usar siempre referencias por nombre, nunca hardcodear secrets

## Integraciones que dominas (ver plantillas/)

| Integración | Plantilla base | Nodo n8n |
|---|---|---|
| WhatsApp via Evolution API | plantillas/whatsapp-evolution.json | `n8n-nodes-evolution-api.evolutionApi` (community) |
| Webhooks entrantes | plantillas/webhook-http.json | `n8n-nodes-base.webhook` |
| Gmail | plantillas/gmail-sheets.json | `n8n-nodes-base.gmail` |
| Google Sheets | plantillas/gmail-sheets.json | `n8n-nodes-base.googleSheets` |
| Google Cloud Firestore | — | `n8n-nodes-base.googleFirebaseCloudFirestore` |
| Google Firebase Realtime DB | — | `n8n-nodes-base.googleFirebaseRealtimeDatabase` |
| OpenAI / Gemini LLM | plantillas/gemini-openai.json | `@n8n/n8n-nodes-langchain.lmChatGoogleGemini` / `lmChatOpenAi` |
| Supabase | plantillas/supabase-postgres.json | `n8n-nodes-base.supabase` |
| PostgreSQL | plantillas/supabase-postgres.json | `n8n-nodes-base.postgres` |
| Stripe | plantillas/stripe.json | `n8n-nodes-base.stripe` |
| Telegram Bot | plantillas/telegram-bot.json | `n8n-nodes-base.telegram` |
| Slack | plantillas/slack-notion.json | `n8n-nodes-base.slack` |
| Notion | plantillas/slack-notion.json | `n8n-nodes-base.notion` |
| AI Agent con tools y memoria | plantillas/ai-agent-tools.json | `@n8n/n8n-nodes-langchain.agent` |
| Loop / Procesamiento en lotes | plantillas/loop-batch-errores.json | `n8n-nodes-base.splitInBatches` |
| Manejo de errores centralizado | plantillas/loop-batch-errores.json | `n8n-nodes-base.errorTrigger` |
| RAG / Vector Store / Base de conocimiento | plantillas/rag-vectorstore.json | LangChain Chain + VectorStore |
| Casos de uso populares (email IA, lead scoring, ecommerce, ETL...) | plantillas/casos-uso-populares.json | Múltiples |

## Proceso obligatorio para generar un flujo

```
1. Analizar el requisito en lenguaje natural
2. Identificar integraciones necesarias
3. Cargar plantillas relevantes de plantillas/
4. Construir el JSON completo con estructura válida n8n
5. Asegurarse de que todos los nodos tienen:
   - "id" único (UUID v4)
   - "name" descriptivo
   - "type" correcto
   - "typeVersion" correcto
   - "position" con coordenadas [x, y] distribuidas horizontalmente cada 250px
   - "parameters" completos
6. Validar con: node validador.js <ruta>
7. Preguntar nombre del proyecto si no está claro
8. Guardar en flujos/<proyecto>/<nombre>.json
9. Confirmar con resumen de nodos generados
```

## Estructura JSON obligatoria de n8n

```json
{
  "meta": {
    "instanceId": "devlyp-generator",
    "author": "DevLyP - Jose Antonio López Piñero",
    "createdAt": "<fecha ISO>",
    "description": "<descripción del flujo>"
  },
  "name": "<nombre del flujo>",
  "nodes": [...],
  "connections": {...},
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "tags": []
}
```

## Posicionamiento de nodos
- Nodo trigger: posición [250, 300]
- Cada nodo siguiente: incrementar X en 250
- Ramas paralelas: incrementar Y en 200

## Manejo de errores obligatorio
Todo flujo DEBE incluir al mínimo:
- Un nodo `IF` para validar datos de entrada críticos
- En flujos con webhooks: validación de payload antes de procesar
- En flujos con LLMs: manejo de respuesta vacía o error de API

## Comandos disponibles

- `/generar-flujo` — Genera un workflow nuevo desde cero
- `/debug-flujo` — Diagnóstica y repara un workflow existente

## Cuando el usuario diga "generar flujo" o use /generar-flujo
1. Pedir descripción si no se ha dado
2. Pedir nombre del proyecto (o confirmar si ya existe)
3. Pedir nombre descriptivo para el fichero del flujo
4. Generar, validar y guardar
5. Mostrar resumen con lista de nodos y conexiones

## Carpeta de flujos
Todos los proyectos viven en `flujos/`. Cada proyecto es una subcarpeta.
Un proyecto puede tener múltiples ficheros JSON (múltiples flujos).
Ejemplo:
```
flujos/
  taller/
    webhook-recepcion-encargos.json
    notificacion-whatsapp-cliente.json
  tienda/
    stripe-webhook-pago.json
    email-confirmacion-pedido.json
```
