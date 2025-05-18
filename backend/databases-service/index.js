const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const conectarDB = require('./db');

// const preguntasClasificadas = [
//   // 1. Seguridad de la información
//   { categoria: "1. Seguridad de la información", texto: "¿Existen políticas de seguridad de la información documentadas y actualizadas?", norma: "ISO 27001" },
//   { categoria: "1. Seguridad de la información", texto: "¿Existen políticas de seguridad de la información documentadas y actualizadas?", norma: "NIST CSF" },
//   { categoria: "1. Seguridad de la información", texto: "¿Se gestionan y controlan los accesos a la plataforma utilizando RBAC (Role-Based Access Control)?", norma: "NIST CSF" },
//   { categoria: "1. Seguridad de la información", texto: "¿Se aplican controles de autenticación multifactor (MFA) para el acceso administrativo?", norma: "ISO 27001" },
//   { categoria: "1. Seguridad de la información", texto: "¿La información sensible almacenada en la plataforma está cifrada en reposo y en tránsito?", norma: "ISO 27001" },
//   { categoria: "1. Seguridad de la información", texto: "¿La información sensible almacenada en la plataforma está cifrada en reposo y en tránsito?", norma: "NIST CSF" },
//   { categoria: "1. Seguridad de la información", texto: "¿Existe un procedimiento para responder a incidentes de seguridad?", norma: "NIST CSF" },

//   // 2. Gestión de cambios y actualizaciones
//   { categoria: "2. Gestión de cambios y actualizaciones", texto: "¿Los cambios en el sistema son registrados y aprobados antes de ser aplicados?", norma: "ISO 27001" },
//   { categoria: "2. Gestión de cambios y actualizaciones", texto: "¿Existe un entorno de pruebas separado para validar cambios antes de producción?", norma: "NIST CSF" },
//   { categoria: "2. Gestión de cambios y actualizaciones", texto: "¿Se actualizan regularmente librerías y dependencias para mitigar vulnerabilidades?", norma: "NIST CSF" },

//   // 3. Disponibilidad y continuidad
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿La plataforma tiene mecanismos automáticos de respaldo de datos?", norma: "ISO 27001" },
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿La plataforma tiene mecanismos automáticos de respaldo de datos?", norma: "NIST CSF" },
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿Se ha probado el proceso de recuperación ante desastres en los últimos 12 meses?", norma: "ISO 27001" },
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿Se ha probado el proceso de recuperación ante desastres en los últimos 12 meses?", norma: "NIST CSF" },
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿Cuál es el tiempo máximo de recuperación (RTO) definido para la plataforma?", norma: "ISO 27001" },
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿Cuál es el tiempo máximo de recuperación (RTO) definido para la plataforma?", norma: "NIST CSF" },
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿Se cuenta con alta disponibilidad o mecanismos de failover?", norma: "ISO 27001" },
//   { categoria: "3. Disponibilidad y continuidad", texto: "¿Se cuenta con alta disponibilidad o mecanismos de failover?", norma: "NIST CSF" },

//   // 4. Integridad de la información
//   { categoria: "4. Integridad de la información", texto: "¿Existe control de versiones para los documentos de cumplimiento?", norma: "ISO 27001" },
//   { categoria: "4. Integridad de la información", texto: "¿Se registran logs de auditoría de las operaciones importantes?", norma: "ISO 27001" },
//   { categoria: "4. Integridad de la información", texto: "¿Se registran logs de auditoría de las operaciones importantes?", norma: "NIST CSF" },
//   { categoria: "4. Integridad de la información", texto: "¿Los logs son almacenados de forma segura y protegidos contra alteraciones?", norma: "ISO 27001" },
//   { categoria: "4. Integridad de la información", texto: "¿Los logs son almacenados de forma segura y protegidos contra alteraciones?", norma: "NIST CSF" },

//   // 5. Cumplimiento normativo
//   { categoria: "5. Cumplimiento normativo", texto: "¿La plataforma cumple con ISO 27001, ISO 27002 y NIST Cybersecurity Framework?", norma: "ISO 27001" },
//   { categoria: "5. Cumplimiento normativo", texto: "¿La plataforma cumple con ISO 27001, ISO 27002 y NIST Cybersecurity Framework?", norma: "ISO 27002" },
//   { categoria: "5. Cumplimiento normativo", texto: "¿La plataforma cumple con ISO 27001, ISO 27002 y NIST Cybersecurity Framework?", norma: "NIST CSF" },
//   { categoria: "5. Cumplimiento normativo", texto: "¿Se ha realizado una evaluación de impacto de protección de datos (DPIA) respecto a GDPR?", norma: "ISO 27001" },
//   { categoria: "5. Cumplimiento normativo", texto: "¿Los usuarios consienten las políticas de privacidad al usar la plataforma?", norma: "ISO 27001" },

//   // 6. Gestión de usuarios y roles
//   { categoria: "6. Gestión de usuarios y roles", texto: "¿Existe un proceso para alta y baja de usuarios?", norma: "ISO 27001" },
//   { categoria: "6. Gestión de usuarios y roles", texto: "¿Existe un proceso para alta y baja de usuarios?", norma: "NIST CSF" },
//   { categoria: "6. Gestión de usuarios y roles", texto: "¿Se revisan periódicamente los permisos asignados?", norma: "ISO 27001" },
//   { categoria: "6. Gestión de usuarios y roles", texto: "¿Se revisan periódicamente los permisos asignados?", norma: "NIST CSF" },
//   { categoria: "6. Gestión de usuarios y roles", texto: "¿Se aplica el principio de menor privilegio en los accesos?", norma: "ISO 27001" },
//   { categoria: "6. Gestión de usuarios y roles", texto: "¿Se aplica el principio de menor privilegio en los accesos?", norma: "NIST CSF" },

//   // 7. Integraciones y APIs
//   { categoria: "7. Integraciones y APIs", texto: "¿Las APIs expuestas están autenticadas y autorizadas de forma segura?", norma: "ISO 27001" },
//   { categoria: "7. Integraciones y APIs", texto: "¿Las APIs expuestas están autenticadas y autorizadas de forma segura?", norma: "NIST CSF" },
//   { categoria: "7. Integraciones y APIs", texto: "¿Se limitan los datos expuestos en integraciones?", norma: "ISO 27001" },
//   { categoria: "7. Integraciones y APIs", texto: "¿Se limitan los datos expuestos en integraciones?", norma: "NIST CSF" },
//   { categoria: "7. Integraciones y APIs", texto: "¿Se revisan las APIs de terceros que integran con la plataforma?", norma: "ISO 27001" },
//   { categoria: "7. Integraciones y APIs", texto: "¿Se revisan las APIs de terceros que integran con la plataforma?", norma: "NIST CSF" },

//   // 8. Evaluación y mejora continua
//   { categoria: "8. Evaluación y mejora continua", texto: "¿Se ejecutan autoevaluaciones periódicas del cumplimiento normativo?", norma: "ISO 27001" },
//   { categoria: "8. Evaluación y mejora continua", texto: "¿Se ejecutan autoevaluaciones periódicas del cumplimiento normativo?", norma: "NIST CSF" },
//   { categoria: "8. Evaluación y mejora continua", texto: "¿Se generan planes de acción para no conformidades?", norma: "ISO 27001" },
//   { categoria: "8. Evaluación y mejora continua", texto: "¿Se generan planes de acción para no conformidades?", norma: "NIST CSF" },
//   { categoria: "8. Evaluación y mejora continua", texto: "¿Los informes de auditoría son revisados por la alta dirección?", norma: "ISO 27001" },
//   { categoria: "8. Evaluación y mejora continua", texto: "¿Los informes de auditoría son revisados por la alta dirección?", norma: "NIST CSF" },

//   // 9. Mantenimiento y soporte
//   { categoria: "9. Mantenimiento y soporte", texto: "¿Existe un plan de mantenimiento preventivo del sistema?", norma: "ISO 27001" },
//   { categoria: "9. Mantenimiento y soporte", texto: "¿El equipo de soporte tiene tiempos de respuesta definidos?", norma: "ISO 27001" },
//   { categoria: "9. Mantenimiento y soporte", texto: "¿Se documentan y analizan los incidentes reportados?", norma: "ISO 27001" },
//   { categoria: "9. Mantenimiento y soporte", texto: "¿Se documentan y analizan los incidentes reportados?", norma: "NIST CSF" }
// ];

// async function insertarPreguntas() {
//   try {
//     const db = await conectarDB();
//     const coleccion = db.collection("preguntas_auditoria");

//     // Eliminar datos existentes si quieres limpiar antes de insertar
//     await coleccion.deleteMany({});

//     const resultado = await coleccion.insertMany(preguntasClasificadas);
//     console.log("Preguntas insertadas:", resultado.insertedCount);
//   } catch (error) {
//     console.error("Error al insertar preguntas:", error);
//   } 
// }

// insertarPreguntas();




app.listen(3002, () => {
  console.log("Servidor corriendo en http://localhost:3002");
});

app.get("/", (req, res) => {
  res.send("¡Servidor en Node.js con Express!");
});

async function obtenerAuditoriaDesdeDB() {
  const db = await conectarDB();
  const coleccion = db.collection("preguntas_auditoria");

  const cursor = await coleccion.find({});
  const documentos = await cursor.toArray();

  const auditoria = {};
  for (const doc of documentos) {
    if (!auditoria[doc.categoria]) {
      auditoria[doc.categoria] = [];
    }
    auditoria[doc.categoria].push({
      texto: doc.texto,
      norma: doc.norma
    });
  }
  return auditoria;
}

async function evaluarCumplimiento(respuestas) {
  const auditoria = await obtenerAuditoriaDesdeDB();
  const resultados = {
    ISO_27001: { total: 0, puntos: 0 },
    NIST_CSF: { total: 0, puntos: 0 },
  };
  for (const clave in respuestas) {
    const partes = clave.split("-");
    const norma = partes.pop();              
    const indiceStr = partes.pop();           
    const categoria = partes.join("-");      
    const indice = parseInt(indiceStr, 10);
    const respuesta = respuestas[clave];
    const preguntasCategoria = auditoria[categoria];
    if (!preguntasCategoria) continue;
    const preguntasPorNorma = preguntasCategoria.filter(q => q.norma === norma);
    const itemAuditoria = preguntasPorNorma[indice];
    if (!itemAuditoria) continue;
    const estado = respuesta.estado;
    const puntaje = estado === "Cumple" ? 2 : estado === "En proceso" ? 1 : 0;
    if (norma === "ISO 27001") {
      resultados.ISO_27001.total += 2;
      resultados.ISO_27001.puntos += puntaje;
    } else if (norma === "NIST CSF") {
      resultados.NIST_CSF.total += 2;
      resultados.NIST_CSF.puntos += puntaje;
    }
  }
  const porcentaje = (puntos, total) => total === 0 ? 0 : parseFloat(((puntos / total) * 100).toFixed(2));
  return {
    ISO_27001: porcentaje(resultados.ISO_27001.puntos, resultados.ISO_27001.total),
    NIST_CSF: porcentaje(resultados.NIST_CSF.puntos, resultados.NIST_CSF.total),
  };
}

// async function evaluarCumplimiento(respuestas) {
//   const auditoria = await obtenerAuditoriaDesdeDB();
//   console.log(respuestas);
//   console.log(auditoria);
//   const resultados = {};
//   const normas=[]
//   // for (const clave in respuestas) {
//   //     const [categoria, pregunta] = clave.split(" - ");
//   //     const respuesta = respuestas[clave];

//   //     const itemAuditoria = auditoria[categoria]?.find(q => q.texto === pregunta);
//   //     if (!itemAuditoria) continue;
//   //     const normas = Array.isArray(itemAuditoria.norma) ? itemAuditoria.norma : [itemAuditoria.norma];

//   //     const estado = respuesta.estado;
//   //     const puntaje = estado === "Cumple" ? 2 : estado === "En proceso" ? 1 : 0;
//   //     for (const norma of normas) {
//   //         if (!resultados[norma]) {
//   //             resultados[norma] = { total: 0, puntos: 0 };
//   //         }
//   //         resultados[norma].total += 2;
//   //         resultados[norma].puntos += puntaje;
//   //     }
//   // }
//   for (const clave in respuestas) {
//     const partes = clave.split("-");
//     const norma = partes[partes.length - 1].trim();
//     const indice = parseInt(partes[partes.length - 2].trim(), 10);
//     const categoria = partes.slice(0, partes.length - 2).join("-").trim();

//     const respuesta = respuestas[clave];

//     const itemAuditoria = auditoria[categoria];

//     console.log('item aud',itemAuditoria);
//     if (!itemAuditoria) {
//       console.warn(`No encontrado: categoria='${categoria}', indice=${indice}, norma='${norma}'`);
//       console.warn(`Categorías disponibles:`, Object.keys(auditoria));
//       continue
//     };

//     const normas = Array.isArray(norma) ? norma : [norma];
//     console.log(normas);
//     const estado = respuesta.estado;
//     const puntaje = estado === "Cumple" ? 2 : estado === "En proceso" ? 1 : 0;

//     for (const norma of normas) {
//       if (!resultados[norma]) {
//         resultados[norma] = { total: 0, puntos: 0 };
//       }
//       resultados[norma].total += 2;
//       resultados[norma].puntos += puntaje;
//     }
//   }
//   const porcentaje = (puntos, total) => total === 0 ? 0 : parseFloat(((puntos / total) * 100).toFixed(2));

//   const resultadosPorcentaje = {};
//   for (const norma in resultados) {
//     resultadosPorcentaje[norma] = porcentaje(resultados[norma].puntos, resultados[norma].total);
//   }

//   return resultadosPorcentaje;
// }




app.post("/auditoria", async (req, res) => {
  try {
    const datos = req.body;
    console.log(datos.respuestas)
    const db = await conectarDB();
    const coleccion = db.collection('auditorias');

    if (!datos.uid || !datos.respuestas) {
      return res.status(400).send("Faltan datos: uid o respuestas");
    }

    const resultadoEvaluacion = await evaluarCumplimiento(datos.respuestas);
    console.log("Resultado ev", resultadoEvaluacion);
    const resultado = await coleccion.updateOne(
      { uid: datos.uid },
      {
        $set: {
          respuestas: datos.respuestas,
          fecha: new Date(),
          evaluacion: resultadoEvaluacion
        }
      },
      { upsert: true }
    );

    if (resultado.upsertedCount > 0) {
      console.log("Nueva auditoría creada con UID:", datos.uid);
    } else {
      console.log("Auditoría actualizada para UID:", datos.uid);
    }

    res.status(200).send("Auditoría almacenada correctamente");
  } catch (error) {
    console.error("Error al almacenar la auditoría:", error);
    res.status(500).send("Error al almacenar auditoría");
  }
});


app.get("/auditoria/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const db = await conectarDB();
    const coleccion = db.collection('auditorias');

    const documento = await coleccion.findOne({ uid: uid });

    if (!documento) {
      return res.status(404).json({ mensaje: "Auditoría no encontrada para el UID proporcionado" });
    }

    res.status(200).json({ evaluacion: documento.evaluacion });
  } catch (error) {
    console.error("Error al obtener la auditoría:", error);
    res.status(500).json({ mensaje: "Error del servidor al obtener la auditoría" });
  }
});

app.post('/preguntas', async (req, res) => {
  const { categoria, texto, norma } = req.body;

  if (!categoria || !texto || !norma) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }

  try {
    const db = await conectarDB();
    const coleccion = db.collection('preguntas_auditoria');

    const nuevaPregunta = {
      categoria,
      texto,
      norma: norma,
      fechaCreacion: new Date()
    };

    await coleccion.insertOne(nuevaPregunta);

    res.status(201).json({
      mensaje: "Pregunta agregada correctamente.",
      pregunta: nuevaPregunta
    });

  } catch (error) {
    console.error("Error al guardar la pregunta:", error);
    res.status(500).json({ error: "Error al guardar la pregunta.", detalles: error.message });
  }
});



app.get("/preguntas", async (req, res) => {
  try {
    const db = await conectarDB();
    const coleccion = db.collection("preguntas_auditoria");

    const documentos = await coleccion.find({}).toArray();

    const preguntasPorCategoria = {};

    for (const doc of documentos) {
      const key = doc.categoria;
      if (!preguntasPorCategoria[key]) {
        preguntasPorCategoria[key] = [];
      }
      preguntasPorCategoria[key].push({
        texto: doc.texto,
        norma: doc.norma
      });
    }

    res.status(200).json(preguntasPorCategoria);
  } catch (error) {
    console.error("Error al obtener preguntas:", error);
    res.status(500).send("Error al obtener preguntas");
  }
});
