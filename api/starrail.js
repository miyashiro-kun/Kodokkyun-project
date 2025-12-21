export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://sg-hyp-api.hoyoverse.com/hyp/hyp-connect/api/getGamePackages?game_ids[]=4ziysqXOQ8&launcher_id=VYTpXlbWo8",
      {
        method: "GET",
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Failed to fetch API",
        status: response.status
      });
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({
      error: "Serverless function crashed",
      message: err.message
    });
  }
}
