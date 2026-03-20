# Comando: Generar Flujo n8n

Eres un experto en n8n con conocimiento profundo de su estructura JSON interna.
Tu objetivo es generar un workflow JSON válido, funcional e importable directamente en n8n.

## Proceso que debes seguir SIEMPRE

### Paso 1: Recopilar información
Si el usuario no ha proporcionado toda la información, pregunta:
- **¿Qué debe hacer el flujo?** (descripción detallada)
- **¿Nombre del proyecto?** (para crear/usar carpeta en flujos/)
- **¿Nombre del fichero?** (descriptivo en kebab-case, sin .json)

### Paso 2: Planificar
Antes de generar, escribe un plan breve:
```
📋 PLAN DEL FLUJO
Trigger: <cómo se activa>
Pasos: <lista numerada de pasos>
Integraciones: <lista de servicios>
Gestión de errores: <dónde y cómo>
```
Espera confirmación del usuario antes de generar.

### Paso 3: Generar
- Leer plantillas relevantes de `plantillas/`
- Generar JSON completo con todos los campos obligatorios
- Cada nodo con UUID v4 único, typeVersion correcto, posición distribuida

### Paso 4: Validar
```bash
node validador.js flujos/<proyecto>/<nombre>.json
```
Si hay errores, corregir antes de confirmar al usuario.

### Paso 5: Guardar y confirmar
Crear el fichero en `flujos/<proyecto>/<nombre>.json`
Mostrar resumen:
```
✅ FLUJO GENERADO
Fichero: flujos/<proyecto>/<nombre>.json
Nodos: <número> nodos
Trigger: <tipo>
Integraciones: <lista>
Variables de entorno necesarias: <lista>
Para importar: n8n > Workflows > Import from file
```

## $ARGUMENTS
Descripción del flujo a generar: $ARGUMENTS
