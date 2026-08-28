const axios = require("axios");

const API_BASE =
  "https://sylvatica.my.id/api/tools/alightmotion";

const API_KEY = process.env.ALIGHTMOTION_APIKEY || "";

module.exports = async (req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const email =
      String(req.body?.email || req.query?.email || "")
        .trim()
        .toLowerCase();

    const options =
      String(req.body?.options || req.query?.options || "")
        .trim();

    const url =
      String(req.body?.url || req.query?.url || "")
        .trim();

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email wajib diisi."
      });
    }

    if (!API_KEY) {
      return res.status(500).json({
        success: false,
        message:
          "ALIGHTMOTION_APIKEY belum dipasang di Vercel."
      });
    }

    const response = await axios.get(API_BASE, {
      params: {
        email,
        options,
        url,
        apikey: API_KEY
      },
      timeout: 20000,
      validateStatus: () => true
    });

    return res.status(response.status).json({
      success:
        response.status >= 200 &&
        response.status < 300,
      data: response.data
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal menghubungi API."
    });
  }
};
