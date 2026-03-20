# n8n Flow Generator — DevLyP

Generador de workflows n8n mediante Claude Code. Describe en lenguaje natural lo que necesitas y obtén un JSON listo para importar en n8n.

## Requisitos

- Node.js 18+
- Claude Code instalado (`npm install -g @anthropic-ai/claude-code`)
- n8n self-hosted (última versión)

## Instalación

```bash
# Clonar/copiar el proyecto
cd n8n-flow-generator

# Verificar que el validador funciona
node validador.js --help
```

## Uso desde Claude Code en VSCode

```bash
# Abrir Claude Code en la carpeta del proyecto
claude

# Usar el comando slash
/generar-flujo Quiero un flujo que reciba mensajes de WhatsApp, los procese con Gemini y responda automáticamente

# O directamente en lenguaje natural
Genera un workflow que cuando llegue un webhook de Stripe con evento checkout.session.completed, guarde los datos en Supabase y envíe un email de confirmación por Gmail
```

## Estructura

```
n8n-flow-generator/
├── CLAUDE.md                    ← Instrucciones para Claude Code
├── .claude/
│   ├── commands/
│   │   └── generar-flujo.md     ← Comando /generar-flujo
│   └── skills/
│       └── n8n-expert/
│           └── SKILL.md         ← Conocimiento interno de n8n
├── flujos/                      ← JSONs generados organizados por proyecto
│   └── [nombre-proyecto]/
│       └── [nombre-flujo].json
├── plantillas/                  ← Patrones base por integración
│   ├── whatsapp-evolution.json
│   ├── webhook-http.json
│   ├── gmail-sheets.json
│   ├── gemini-openai.json
│   ├── supabase-postgres.json
│   └── stripe.json
├── validador.js                 ← Validación automática de JSONs
└── README.md
```

## Importar en n8n

1. Abrir n8n
2. Ir a **Workflows**
3. Click en **⋯ > Import from file**
4. Seleccionar el JSON de `flujos/<proyecto>/<nombre>.json`
5. Configurar las credenciales referenciadas
6. Activar el workflow

## Variables de entorno en n8n

Los workflows generados usan `$env.NOMBRE_VAR`. Configúralas en:
**n8n > Settings > Variables de entorno**

Variables comunes:
| Variable | Descripción |
|---|---|
| `EVOLUTION_HOST` | URL de tu instancia Evolution API |
| `EVOLUTION_INSTANCE` | Nombre de la instancia WhatsApp |
| `EVOLUTION_API_KEY` | API Key de Evolution |
| `GEMINI_API_KEY` | API Key de Google Gemini |
| `OPENAI_API_KEY` | API Key de OpenAI |
| `SUPABASE_URL` | URL de tu proyecto Supabase |
| `SUPABASE_ANON_KEY` | Anon key de Supabase |
| `STRIPE_SECRET_KEY` | Secret key de Stripe |
| `SHEETS_DOCUMENT_ID` | ID del Google Sheet |

## Créditos

Desarrollado por **DevLyP — Jose Antonio López Piñero**
