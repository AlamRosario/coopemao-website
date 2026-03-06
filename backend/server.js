const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MasterShield.05",
  database: "copemao_db"
});

db.connect((err) => {
  if (err) {
    console.log("Error conectando a MySQL:", err);
  } else {
    console.log("Conectado a MySQL");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor Copemao funcionando");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

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
        res.status(500).json({ error: "Error guardando inscripción" });
      } else {
        res.json({ message: "Inscripción guardada correctamente" });
      }
    }
  );
});

app.post("/api/prestamos", (req, res) => {
  const { nombre, telefono, correo, monto, empleo } = req.body;

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