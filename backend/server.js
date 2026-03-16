const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// =====================================================
// MIDDLEWARES
// =====================================================

app.use(cors());
app.use(express.json());

// =====================================================
// CONEXION A MYSQL
// =====================================================

const db = mysql.createConnection({
  host: "turntable.proxy.rlwy.net",
  user: "root",
  password: "lNwIVXEvRQXHohbXiyXWcLduuIGNykdZ",
  database: "railway",
  port: 46423,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((err) => {
  if (err) {
    console.log("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

// =====================================================
// RUTA PRINCIPAL
// =====================================================

app.get("/", (req, res) => {
  res.send("Servidor Copemao funcionando");
});

// =====================================================
// GUARDAR AFILIACIONES
// =====================================================

app.post("/api/inscripciones", (req, res) => {

  const { nombre, apellido, cedula, telefono, correo, direccion, ocupacion } = req.body;

  const sql = `
    INSERT INTO inscripciones
    (nombre, apellido, cedula, telefono, correo, direccion, ocupacion)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, apellido, cedula, telefono, correo, direccion, ocupacion],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({
          error: "Error guardando inscripción"
        });
      }

      res.json({
        message: "Inscripción guardada correctamente"
      });

    }
  );

});

// =====================================================
// GUARDAR SOLICITUD DE PRESTAMO
// =====================================================

app.post("/api/prestamos", (req, res) => {

  const { nombre, telefono, correo, empleo, monto } = req.body;

  const sql = `
    INSERT INTO solicitudes_prestamo
    (nombre, telefono, correo, tipo_prestamo, monto)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [nombre, telefono, correo, empleo, monto],
    (err, result) => {

      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error guardando solicitud"
        });
      }

      res.json({
        message: "Solicitud enviada correctamente"
      });

    }
  );

});

// =====================================================
// VER SOLICITUDES DE PRESTAMOS
// =====================================================

app.get("/api/prestamos", (req, res) => {

  const sql = `
    SELECT *
    FROM solicitudes_prestamo
    ORDER BY fecha_solicitud DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Error obteniendo solicitudes"
      });
    }

    res.json(result);

  });

});

// =====================================================
// VER INSCRIPCIONES
// =====================================================

app.get("/api/inscripciones", (req, res) => {

  const sql = `
    SELECT *
    FROM inscripciones
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.error(err);
      return res.status(500).json({
        error: "Error obteniendo inscripciones"
      });
    }

    res.json(result);

  });

});

// =====================================================
// INICIAR SERVIDOR
// =====================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
