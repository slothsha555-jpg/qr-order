export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const GAS_URL =
      "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjDw8O0AtZWQW7jbZGRTB94ClTCeFhmowrVWDrLfgNsGfCnAzoJbGbpOnquwfUSLazK0i9jlvyFtwxp0DWbb6JQy0y1fqWP0mFXCrtXlni28TGCidR7DQuoNROBb6M8iTQrs8CCb3bL930v6T6CHqTuCJA_VPjYuKiKcBLzwbPc2oA1R4k8kiks4AdPEYohR841-O0dmPaYXE3QfskqxNozWsZO8YL7yLj2OTul15IWReYy6iEGTsn_8k2tULsbMkwPpgQ_MYYXQqq-O4spAI6az1LtfHTIJvmtP-Ck&lib=MEh1kHHJB5xi5lKxnI9oL7k9OvfWI_fm-";

    const response = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
