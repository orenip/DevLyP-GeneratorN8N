#!/usr/bin/env node

/**
 * Validador de workflows n8n
 * Uso: node validador.js <ruta-al-fichero.json>
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_TOP_FIELDS = ['name', 'nodes', 'connections', 'settings'];
const REQUIRED_NODE_FIELDS = ['id', 'name', 'type', 'typeVersion', 'position', 'parameters'];
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const errors = [];
const warnings = [];

function error(msg) { errors.push(`❌ ERROR: ${msg}`); }
function warn(msg)  { warnings.push(`⚠️  AVISO: ${msg}`); }
function ok(msg)    { console.log(`✅ ${msg}`); }

// --- Leer fichero ---
const filePath = process.argv[2];
if (!filePath || filePath === '--help' || filePath === '-h') {
  console.log(`
Validador de workflows n8n — DevLyP

Uso:
  node validador.js <ruta-fichero.json>

Ejemplos:
  node validador.js flujos/taller/webhook-recepcion-encargos.json
  node validador.js flujos/tienda/stripe-webhook-pago.json

Qué valida:
  ✔ Estructura JSON válida
  ✔ Campos raíz obligatorios (name, nodes, connections, settings, meta)
  ✔ Nodo trigger presente
  ✔ Manejo de errores (IF, Switch, errorTrigger)
  ✔ Cada nodo: id UUID v4 único, name único, type, typeVersion, position, parameters
  ✔ Connections sin referencias rotas
  ✔ Secrets hardcodeados (sk-*, Bearer tokens, passwords)
  `);
  process.exit(0);
}

const absolutePath = path.resolve(filePath);
if (!fs.existsSync(absolutePath)) {
  console.error(`❌ Fichero no encontrado: ${absolutePath}`);
  process.exit(1);
}

let workflow;
try {
  const raw = fs.readFileSync(absolutePath, 'utf8');
  workflow = JSON.parse(raw);
  ok(`JSON parseado correctamente`);
} catch (e) {
  console.error(`❌ JSON inválido: ${e.message}`);
  process.exit(1);
}

// --- Validar campos raíz ---
for (const field of REQUIRED_TOP_FIELDS) {
  if (!workflow[field]) {
    error(`Campo raíz obligatorio ausente: "${field}"`);
  }
}

if (workflow.name) ok(`Nombre del workflow: "${workflow.name}"`);

// --- Validar settings ---
if (workflow.settings?.executionOrder !== 'v1') {
  warn(`settings.executionOrder debería ser "v1" (motor nuevo de n8n)`);
}

// --- Validar meta ---
if (!workflow.meta) {
  error(`Campo "meta" obligatorio ausente. Debe incluir author, description, createdAt`);
} else {
  if (!workflow.meta.description) warn(`meta.description vacío`);
  if (!workflow.meta.author) warn(`meta.author vacío`);
}

// --- Validar nodos ---
if (!Array.isArray(workflow.nodes) || workflow.nodes.length === 0) {
  error(`El workflow no tiene nodos`);
} else {
  ok(`Nodos encontrados: ${workflow.nodes.length}`);
  
  const nodeIds = new Set();
  const nodeNames = new Set();
  let hasTrigger = false;
  let hasErrorHandling = false;

  for (const node of workflow.nodes) {
    const nodeRef = `Nodo "${node.name || node.id || 'desconocido'}"`;

    // Campos obligatorios
    for (const field of REQUIRED_NODE_FIELDS) {
      if (node[field] === undefined || node[field] === null || node[field] === '') {
        error(`${nodeRef}: campo obligatorio ausente "${field}"`);
      }
    }

    // UUID único
    if (node.id) {
      if (!UUID_REGEX.test(node.id)) {
        warn(`${nodeRef}: id no tiene formato UUID v4 válido`);
      }
      if (nodeIds.has(node.id)) {
        error(`${nodeRef}: id duplicado "${node.id}"`);
      }
      nodeIds.add(node.id);
    }

    // Nombre único
    if (node.name) {
      if (nodeNames.has(node.name)) {
        error(`Nombre de nodo duplicado: "${node.name}"`);
      }
      nodeNames.add(node.name);
    }

    // Posición válida
    if (!Array.isArray(node.position) || node.position.length !== 2) {
      error(`${nodeRef}: position debe ser un array [x, y]`);
    }

    // Detectar trigger
    const triggerTypes = [
      'webhook', 'manualTrigger', 'scheduleTrigger', 'emailReadImap',
      'errorTrigger', 'chatTrigger', 'formTrigger',
      'n8n-nodes-base.webhook', 'n8n-nodes-base.manualTrigger',
      'n8n-nodes-base.scheduleTrigger', 'n8n-nodes-base.errorTrigger',
      'n8n-nodes-base.chatTrigger', 'n8n-nodes-base.formTrigger',
      '@n8n/n8n-nodes-langchain.chatTrigger'
    ];
    if (triggerTypes.some(t => node.type?.includes(t))) {
      hasTrigger = true;
    }

    // Detectar manejo de errores
    const errorTypes = ['if', 'switch', 'errorTrigger', 'stopAndError'];
    if (errorTypes.some(t => node.type?.includes(t))) {
      hasErrorHandling = true;
    }

    // typeVersion debe ser número
    if (typeof node.typeVersion !== 'number') {
      error(`${nodeRef}: typeVersion debe ser número, encontrado: ${typeof node.typeVersion}`);
    }
  }

  if (!hasTrigger) {
    error(`El workflow no tiene nodo trigger (Webhook, Manual, Schedule...)`);
  }

  if (!hasErrorHandling) {
    warn(`No se detectó manejo de errores (IF, Switch, Error Trigger). Recomendado añadir validaciones.`);
  }
}

// --- Validar connections ---
if (workflow.connections && typeof workflow.connections === 'object') {
  const nodeNamesInConnections = Object.keys(workflow.connections);
  const allNodeNames = new Set((workflow.nodes || []).map(n => n.name));
  
  for (const connNodeName of nodeNamesInConnections) {
    if (!allNodeNames.has(connNodeName)) {
      error(`Connections referencia un nodo que no existe: "${connNodeName}"`);
    }
    // Validar destinos
    const outputs = workflow.connections[connNodeName]?.main || [];
    for (const outputBranch of outputs) {
      for (const conn of (outputBranch || [])) {
        if (conn.node && !allNodeNames.has(conn.node)) {
          error(`Connection desde "${connNodeName}" apunta a nodo inexistente: "${conn.node}"`);
        }
      }
    }
  }
  ok(`Connections validadas`);
}

// --- Detectar secrets hardcodeados ---
const rawJson = JSON.stringify(workflow);
const suspiciousPatterns = [
  /sk-[a-zA-Z0-9]{20,}/,
  /AIza[a-zA-Z0-9_-]{35}/,
  /"password"\s*:\s*"[^"]{3,}"/,
  /Bearer\s+[a-zA-Z0-9_-]{20,}/
];
for (const pattern of suspiciousPatterns) {
  if (pattern.test(rawJson)) {
    warn(`Posible secret/token hardcodeado detectado. Usa $env.NOMBRE_VAR en su lugar.`);
    break;
  }
}

// --- Resultado final ---
console.log('\n' + '='.repeat(50));
console.log(`📊 RESULTADO DE VALIDACIÓN: ${path.basename(filePath)}`);
console.log('='.repeat(50));

if (warnings.length > 0) {
  console.log('\nAvisos:');
  warnings.forEach(w => console.log(` ${w}`));
}

if (errors.length > 0) {
  console.log('\nErrores:');
  errors.forEach(e => console.log(` ${e}`));
  console.log(`\n❌ Validación FALLIDA — ${errors.length} error(es), ${warnings.length} aviso(s)`);
  process.exit(1);
} else {
  console.log(`\n✅ Validación EXITOSA — 0 errores, ${warnings.length} aviso(s)`);
  console.log(`   Listo para importar en n8n: Workflows > Import from file\n`);
  process.exit(0);
}
