import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({ path: "config.env" });

const app = express();

// 🔧 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 🧪 TEST ROOT
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// 📩 CONTACTO API
app.post("/api/contacto", async (req, res) => {
  try {
    const { nombre, email, empresa, mensaje } = req.body;

    // 🔍 VALIDACIÓN BÁSICA
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({
        ok: false,
        error: "Faltan campos obligatorios"
      });
    }

    // 📬 TRANSPORTER (GMAIL)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // 📧 EMAIL
    await transporter.sendMail({
      from: `"Web Vertex" <${process.env.EMAIL_USER}>`,
      to: "jgarcia@vertex-csg.com",
      subject: "Nuevo mensaje desde la web",
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Empresa:</b> ${empresa || "-"}</p>
        <p><b>Mensaje:</b><br>${mensaje}</p>
      `
    });

    console.log("✅ Email enviado correctamente");

    res.json({
      ok: true,
      message: "Email enviado correctamente"
    });

  } catch (error) {
    console.error("❌ ERROR EMAIL:", error);

    res.status(500).json({
      ok: false,
      error: error.message
    });
  }
});

// 🚀 SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});