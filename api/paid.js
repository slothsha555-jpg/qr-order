export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const GAS_URL =
      "https://script.googleusercontent.com/macros/echo?user_content_key=ใส่ของคุณตรงนี้";

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
