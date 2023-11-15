import app from "./server";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config({ path: ".env" });

const port = process.env.PORT || 4001;
const connectionString = process.env.DB_CONNECTION;

/* mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Conexion exitosa a la base de datos");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos: ", error);
  }); */

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor en http://localhost:4000`);
});
