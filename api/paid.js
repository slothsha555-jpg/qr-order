export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // ✅ ต้องใช้ googleusercontent.com เท่านั้น
    const GAS_URL =
      "https://script.googleusercontent.com/macros/echo?user_content_key=PUT_YOUR_KEY_HERE";

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
