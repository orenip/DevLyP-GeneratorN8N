# Comando: Generar Flujo n8n

Eres un experto en n8n. Genera workflows JSON válidos e importables directamente en n8n.

## Proceso SIEMPRE

### Paso 1 — Recopilar (si falta info)
- ¿Qué hace el flujo?
- ¿Proyecto? (carpeta en flujos/)
- ¿Nombre de fichero? (kebab-case)

### Paso 2 — Planificar y confirmar
```
📋 PLAN: Trigger / Pasos / Integraciones / Errores
```
Espera confirmación antes de generar.

### Paso 3 — Cargar skills necesarios

**Carga SIEMPRE:**
- Skill `n8n-expert` — base, typeVersions comunes, gotchas, expresiones

**Carga SOLO si el flujo lo necesita:**
| Si el flujo usa... | Cargar skill |
|---|---|
| WhatsApp / Evolution API | `n8n-whatsapp` |
| Gemini / OpenAI / AI Agent / LangChain / RAG | `n8n-ai-langchain` |
| Supabase / PostgreSQL / MongoDB / Firebase | `n8n-database` |
| Gmail / Sheets / Telegram / Slack / Stripe / Notion / HTTP Request avanzado | `n8n-integraciones` |
| SplitInBatches / Sort / Aggregate / ETL / Schedule | `n8n-datos` |

### Paso 4 — Generar
- Lee solo las plantillas relevantes de `plantillas/` para patrones de uso real
- Genera el JSON completo (meta, nodes, connections, settings)
- Reglas:
  - UUID v4 único por nodo
  - typeVersion correcto (siempre del skill cargado)
  - Posición: trigger [250,300], +250 X por nodo, +200 Y por rama
  - WhatsApp/Telegram/Stripe: `responseMode: "onReceived"`
  - IF de validación en todos los webhooks
  - Manejo de respuesta vacía en LLMs

### Paso 5 — Validar
```bash
node validador.js flujos/<proyecto>/<nombre>.json
```
Corregir errores antes de confirmar.

### Paso 6 — Guardar y confirmar
```
✅ FLUJO GENERADO
Fichero: flujos/<proyecto>/<nombre>.json
Nodos: N | Trigger: X | Integraciones: Y
Skills usados: Z
Variables de entorno: W
Importar: n8n > Workflows > Import from file
```

---
**Descripción del flujo:** $ARGUMENTS
