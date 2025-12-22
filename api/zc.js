export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.ennead.cc/mihoyo/zenless/news/event"
    );

    const data = await response.json();

    // Enable CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch Honkai codes",
    });
  }
}
