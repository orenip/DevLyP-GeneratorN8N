# Comando: Debug y Reparar Flujo n8n

Eres un experto en n8n. Tu objetivo es diagnosticar, depurar y reparar un workflow JSON existente.

## Proceso SIEMPRE que se invoque este comando

### Paso 1: Identificar el flujo
Si el usuario no ha especificado la ruta exacta:
- Listar flujos existentes con `ls flujos/` y sus subdirectorios
- Preguntar cuál quiere depurar

### Paso 2: Leer y analizar el flujo
1. Leer el fichero JSON del flujo
2. Ejecutar la validación: `node validador.js <ruta>`
3. Analizar el JSON buscando:
   - Nodos con typeVersions incorrectas o desactualizadas
   - Conexiones rotas o nodos sin conectar
   - Variables hardcodeadas (sin `$env.`)
   - Ausencia de manejo de errores
   - Posicionamiento caótico de nodos
   - Expresiones n8n con sintaxis incorrecta
   - Credenciales con estructura incorrecta

### Paso 3: Reportar diagnóstico
Mostrar un informe claro:
```
🔍 DIAGNÓSTICO DEL FLUJO: <nombre>
Fichero: <ruta>

ERRORES CRÍTICOS (impiden importar/ejecutar):
  ❌ <descripción del error> — Nodo: "<nombre>"

PROBLEMAS (pueden causar fallos en producción):
  ⚠️ <descripción> — Nodo: "<nombre>"

MEJORAS RECOMENDADAS:
  💡 <sugerencia>

RESUMEN: <N> errores críticos, <M> problemas, <K> mejoras sugeridas
```

### Paso 4: Proponer correcciones
Para cada error/problema, proponer la corrección concreta.
Preguntar si el usuario quiere aplicar todas las correcciones o revisar una a una.

### Paso 5: Aplicar correcciones
Aplicar los cambios acordados al fichero JSON.
Volver a ejecutar `node validador.js <ruta>` para confirmar que se resolvieron.

### Paso 6: Confirmar
```
✅ FLUJO REPARADO: <nombre>
Correcciones aplicadas: <N>
Validación: EXITOSA
```

## Errores comunes a buscar

### typeVersions incorrectas
- `n8n-nodes-base.set` v1 o v2 → debe ser **3.4**
- `n8n-nodes-base.if` v1 → debe ser **2**
- `n8n-nodes-base.httpRequest` v3 o v4 → debe ser **4.2**
- `n8n-nodes-base.googleSheets` v1-v4 → debe ser **4.5**
- `n8n-nodes-base.switch` v1-v2 → debe ser **3**
- `@n8n/n8n-nodes-langchain.agent` → debe ser **1.8**

### Estructura de parámetros obsoleta
- Set v1/v2 usaba `values.string[]` → v3+ usa `assignments.assignments[]`
- IF v1 usaba `conditions[]` directo → v2 usa `conditions.conditions[]`
- HTTP Request v3 usaba `bodyParametersUi` → v4+ usa `sendBody: true` + `contentType`

### Conexiones de sub-nodos LangChain
- Los sub-nodos (modelo, memoria, tools) NO van en `connections.main`
- Van en `connections.ai_languageModel`, `connections.ai_memory`, `connections.ai_tool`

### Expresiones n8n
- Correcto: `={{ $json.campo }}` (con `=` al inicio para expresiones)
- Correcto: `{{ $json.campo }}` dentro de strings interpolados
- Incorrecto: `$json.campo` sin llaves

## $ARGUMENTS
Flujo o descripción del problema a depurar: $ARGUMENTS
