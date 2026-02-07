export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const GAS_URL =
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLh26kMXQPHmTJcDtjOZKMjoBrg6inehV_AUN3gbXPUiqAv0BTed-5IYSsEA0DcKzq7cAm_trBSTL6qVn4fG21nWwIv75jqbc3N3prixYUdjH4kI3b6deyKjKcMEm7DYC19-WXuzfCdFSpKsWZu7GkN5tSG1apGhKusxFUTQmkjQXFR8LwPfioCc8WiUUVMYIjYddpQYTGbQo7gCZ-F77w_dt-nAhm7rGuvWrihy7o1duTtD6JshP08kv-chJs1xfalGV8wADo8rTbipurB2IaA90n8KNWR7XTq5EJ5-&lib=MEh1kHHJB5xi5lKxnI9oL7k9OvfWI_fm-";

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
