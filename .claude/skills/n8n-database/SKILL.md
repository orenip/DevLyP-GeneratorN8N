---
name: n8n-database
description: Referencia completa de bases de datos en n8n. Supabase nativo, PostgreSQL, MongoDB, Redis, MySQL. Patrones de select/insert/update, manejo de 0 resultados y filtros.
---

# N8N — Bases de Datos

## TypeVersions

| Nodo | type | typeVersion |
|---|---|---|
| Supabase | `n8n-nodes-base.supabase` | 1 |
| PostgreSQL | `n8n-nodes-base.postgres` | 2.5 |
| MongoDB | `n8n-nodes-base.mongoDb` | 1.1 |
| Redis | `n8n-nodes-base.redis` | 1 |
| MySQL | `n8n-nodes-base.mySql` | 2.3 |
| Microsoft SQL | `n8n-nodes-base.microsoftSql` | 1.1 |

---

## Supabase — Nodo nativo

### Create (INSERT)
```json
{
  "operation": "create",
  "tableId": "nombre_tabla",
  "dataToSend": "defineBelow",
  "fieldsUi": {
    "fieldValues": [
      { "fieldId": "campo1", "fieldValue": "={{ $json.valor1 }}" },
      { "fieldId": "campo2", "fieldValue": "={{ $json.valor2 }}" }
    ]
  }
}
```

### GetAll (SELECT con filtro)
```json
{
  "operation": "getAll",
  "tableId": "nombre_tabla",
  "returnAll": true,
  "filterType": "manual",
  "filters": {
    "conditions": [
      {
        "keyName": "campo",
        "condition": "eq",
        "keyValue": "={{ $json.valor }}"
      }
    ]
  }
}
```

Condiciones disponibles: `eq`, `neq`, `lt`, `lte`, `gt`, `gte`, `is`, `in`, `cs`, `cd`

### Update
```json
{
  "operation": "update",
  "tableId": "nombre_tabla",
  "id": "={{ $json.id }}",
  "dataToSend": "defineBelow",
  "fieldsUi": {
    "fieldValues": [
      { "fieldId": "estado", "fieldValue": "nuevo_estado" }
    ]
  }
}
```

### Delete
```json
{
  "operation": "delete",
  "tableId": "nombre_tabla",
  "id": "={{ $json.id }}"
}
```

---

## ⚠️ Manejo de 0 resultados (Supabase getAll)

Si Supabase devuelve 0 items, los nodos downstream no se ejecutan.
**Solución:** Code node con `runOnceForAllItems` justo después:

```javascript
// Code node — runOnceForAllItems
const items = $input.all();
const estadosActivos = ['pendiente', 'en_proceso']; // ajustar según caso

// Filtrar solo registros en estado activo
const activos = items.filter(i => estadosActivos.includes(i.json.estado));
const found = activos.length > 0;

return [{
  json: {
    found,
    count: activos.length,
    data: found ? activos[0].json : null   // primer resultado o null
  }
}];
```

Después del Code node: `IF $json.found === true` para bifurcar.

---

## Supabase REST API (HTTP Request — para queries complejas)

Usar cuando el nodo nativo no soporta la operación (OR, JOINs, funciones RPC):

### SELECT
```json
{
  "method": "GET",
  "url": "=https://{{ $env.SUPABASE_URL }}/rest/v1/tabla?campo=eq.{{ $json.valor }}&select=*",
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      { "name": "apikey", "value": "={{ $env.SUPABASE_ANON_KEY }}" },
      { "name": "Authorization", "value": "=Bearer {{ $env.SUPABASE_ANON_KEY }}" }
    ]
  }
}
```

### INSERT (con retorno del registro creado)
```json
{
  "method": "POST",
  "url": "=https://{{ $env.SUPABASE_URL }}/rest/v1/tabla",
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
  "jsonBody": "={{ JSON.stringify({ campo1: $json.val1, campo2: $json.val2 }) }}"
}
```

### UPDATE con filtro en URL
```json
{
  "method": "PATCH",
  "url": "=https://{{ $env.SUPABASE_URL }}/rest/v1/tabla?id=eq.{{ $json.id }}",
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
  "jsonBody": "={{ JSON.stringify({ estado: 'nuevo_estado' }) }}"
}
```

**Filtros avanzados en URL:**
```
?campo=eq.valor          → campo = valor
?campo=neq.valor         → campo != valor
?campo=gt.10             → campo > 10
?campo=in.(a,b,c)        → campo IN (a,b,c)
?campo=not.in.(x,y)      → campo NOT IN (x,y)
?campo=is.null           → campo IS NULL
?select=id,nombre,estado → solo esas columnas
?order=created_at.desc   → ordenar
&limit=10                → limitar
```

---

## PostgreSQL — Nodo nativo

```json
{
  "operation": "executeQuery",
  "query": "SELECT * FROM tabla WHERE campo = $1 AND estado = $2",
  "additionalFields": {
    "queryParams": "={{ [$json.valor, 'activo'] }}"
  }
}
```

Operaciones: `executeQuery`, `insert`, `update`, `delete`, `select`

---

## Google Cloud Firestore

```json
{
  "type": "n8n-nodes-base.googleFirebaseCloudFirestore",
  "typeVersion": 1,
  "parameters": {
    "projectId": "={{ $env.FIREBASE_PROJECT_ID }}",
    "database": "(default)",
    "collectionId": "mi-coleccion",
    "simple": true,
    "returnAll": true,
    "options": {}
  },
  "credentials": {
    "googleFirebaseCloudFirestoreOAuth2Api": { "id": "...", "name": "Google Firebase Firestore account" }
  }
}
```
**`simple: true` siempre** — parsea tipos Firestore a JSON plano automáticamente.
Operaciones: `create`, `delete`, `get`, `getAll`, `update`, `upsert`

---

## Variables de entorno necesarias

```
# Supabase
SUPABASE_URL        — URL del proyecto (ej: xyzabc.supabase.co)
SUPABASE_ANON_KEY   — clave anon pública

# PostgreSQL directo
POSTGRES_HOST / POSTGRES_DB / POSTGRES_USER / POSTGRES_PASSWORD

# Firebase
FIREBASE_PROJECT_ID — ID del proyecto en Google Cloud
```
