---
name: n8n-datos
description: Referencia de nodos de procesamiento de datos en n8n. SplitInBatches con patrón loop correcto, Sort, Limit, Summarize, Aggregate, Compare Datasets, Split Out, Wait y Schedule con expresiones cron.
---

# N8N — Procesamiento de Datos Avanzado

## TypeVersions
| Nodo | type | typeVersion |
|---|---|---|
| Split In Batches | `n8n-nodes-base.splitInBatches` | 3 |
| Aggregate | `n8n-nodes-base.aggregate` | 1 |
| Sort | `n8n-nodes-base.sort` | 1 |
| Limit | `n8n-nodes-base.limit` | 1 |
| Summarize | `n8n-nodes-base.summarize` | 1 |
| Split Out | `n8n-nodes-base.splitOut` | 1 |
| Compare Datasets | `n8n-nodes-base.compareDatasets` | 3 |
| Remove Duplicates | `n8n-nodes-base.removeDuplicates` | 1 |
| Wait | `n8n-nodes-base.wait` | 1 |
| Schedule Trigger | `n8n-nodes-base.scheduleTrigger` | 1.2 |

---

## ⚠️ SplitInBatches — Outputs CRÍTICOS (no confundir nunca)

```
Output 0 = "Done"  → se activa cuando TERMINA el bucle (lo que va DESPUÉS del loop)
Output 1 = "Loop"  → se activa con CADA ITEM del lote (la cadena de procesado)
```

**Flujo correcto:**
```
IF hay items → SplitInBatches
               ├─ [0] Done  → NoOp fin / siguiente paso post-bucle
               └─ [1] Loop  → Nodo A → Nodo B → Nodo C → (vuelta a SplitInBatches)
```

**Loop-back:** El último nodo de la cadena conecta de vuelta al INPUT de SplitInBatches:
```json
"connections": {
  "SplitInBatches": {
    "main": [
      [],
      [{ "node": "Nodo A", "type": "main", "index": 0 }]
    ]
  },
  "Nodo C (último del loop)": {
    "main": [
      [{ "node": "SplitInBatches", "type": "main", "index": 0 }]
    ]
  }
}
```

### Parámetros SplitInBatches
```json
{
  "batchSize": 10,
  "options": {
    "reset": false
  }
}
```

### Patrón completo con manejo de errores
```
Webhook → IF validar → Obtener lista (Supabase/Sheets)
  → SplitInBatches (10 por lote)
    [1] Loop → HTTP Request (continueOnFail)
             → IF ¿error? → Set marcar fallido / Set marcar exitoso
    [0] Done → Aggregate resultados → Set resumen → Respond Webhook
```

---

## Sort — Ordenar items

```json
{
  "type": "simple",
  "sortFieldsUi": {
    "sortField": [
      { "fieldName": "fecha", "order": "descending" },
      { "fieldName": "nombre", "order": "ascending" }
    ]
  }
}
```

---

## Limit — Limitar número de items

```json
{
  "maxItems": 10,
  "keepItems": "firstItems"
}
```
`keepItems`: `"firstItems"` | `"lastItems"`

---

## Summarize — Agrupar y agregar

```json
{
  "fieldsToSummarize": {
    "values": [
      { "aggregation": "sum", "field": "importe" },
      { "aggregation": "count", "field": "id" },
      { "aggregation": "average", "field": "precio" },
      { "aggregation": "max", "field": "fecha" }
    ]
  },
  "options": {
    "fieldsToGroupBy": {
      "values": [{ "fieldName": "categoria" }]
    }
  }
}
```

Agregaciones: `sum`, `count`, `average`, `min`, `max`, `countUnique`, `concatenate`

---

## Aggregate — Combinar todos los items en uno

```json
{
  "aggregate": "aggregateAllItemData",
  "destinationFieldName": "resultados"
}
```
Útil para convertir múltiples items en un array en un solo item.

---

## Split Out — Expandir array en items individuales

```json
{
  "fieldToSplitOut": "mi_array",
  "options": {
    "include": "selectedOtherFields",
    "fieldsToInclude": {
      "fields": [{ "fieldName": "campo_padre" }]
    }
  }
}
```

---

## Compare Datasets — Comparar dos fuentes de datos

```json
{
  "mergeByFields": {
    "values": [{ "field1": "email", "field2": "email" }]
  },
  "outputDataFrom": "both",
  "options": {}
}
```
`outputDataFrom`: `"both"` | `"input1"` | `"input2"`

---

## Wait — Pausar workflow

```json
{
  "resume": "timeInterval",
  "unit": "minutes",
  "amount": 30
}
```

Para reanudar con webhook externo:
```json
{
  "resume": "webhook"
}
// URL para reanudar: $resumeWebhookUrl
```

---

## Schedule — Expresiones cron

```
0 9 * * 1-5      → Lunes a viernes a las 9:00
0 */2 * * *      → Cada 2 horas
*/15 * * * *     → Cada 15 minutos
0 8 1 * *        → El día 1 de cada mes a las 8:00
0 0 * * 0        → Cada domingo a medianoche
0 9,14,18 * * *  → A las 9:00, 14:00 y 18:00
```

---

## Patrón ETL / procesamiento en lote

```
Schedule → HTTP Request obtener datos origen
  → Filter (solo registros nuevos: created_at > última ejecución)
  → Split In Batches (50 por lote)
    [1] Loop:
      → Set transformar campos
      → Supabase Insert
      → Set marcar procesado
    [0] Done:
      → Summarize (contar insertados)
      → Slack notificar resultado
```

---

## Patrón deduplicación

```
Obtener datos → Remove Duplicates (por campo "email")
  → Split Out (si hay arrays dentro)
  → Sort (por fecha desc)
  → Limit (top 100)
  → Procesar
```
