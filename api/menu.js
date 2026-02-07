export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const GAS_URL =
      "https://script.google.com/macros/s/AKfycbzmGR44z676R6brKDa5pwnP7mpgDWsWdznADerz0aiu3nuUqimKwyG97wkKWNY4qhFYxA/exec?api=MENU";

    const r = await fetch(GAS_URL);
    const text = await r.text();

    // Google Script ต้องคืน JSON
    const data = JSON.parse(text);

    res.status(200).json(data);
  } catch (err) {
    console.error("MENU API ERROR", err);
    res.status(500).json({ error: err.toString() });
  }
}
