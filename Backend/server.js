import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 📩 EMAIL CONFIG
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 📬 API CONTACTO
app.post("/api/contacto", async (req, res) => {
  try {
    const { nombre, email, empresa, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ ok: false, message: "Faltan campos" });
    }

    await transporter.sendMail({
      from: `"Web Vertex" <${process.env.EMAIL_USER}>`,
      to: "jgarcia@vertex.csg.com",
      subject: "Nuevo mensaje desde la web",
      html: `
        <h2>Nuevo contacto</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Empresa:</b> ${empresa || "-"}</p>
        <p><b>Mensaje:</b><br>${mensaje}</p>
      `,
    });

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on http://0.0.0.0:${PORT}`);
});