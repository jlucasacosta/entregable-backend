import app from "./server";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 4001;

const connectionString = process.env.DB_CONNECTION;

if (!connectionString) {
  console.error("ERROR: La cadena de conexión a la base de datos no está definida.");
} else {
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((error) => {
      console.error("Error al conectar a la base de datos: ", error);
    });
}

app.listen(port, () => {
  console.log(`Servidor en http://localhost:4000`);
});
