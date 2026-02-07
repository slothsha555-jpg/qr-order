export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbzmGR44z676R6brKDa5pwnP7mpgDWsWdznADerz0aiu3nuUqimKwyG97wkKWNY4qhFYxA/exec";

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
    console.error("ORDER API ERROR", err);
    res.status(500).json({ error: err.toString() });
  }
}
