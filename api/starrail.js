export default async function handler(req, res) {
  const r = await fetch(
    "https://api.ennead.cc/mihoyo/starrail/news/notices"
  );
  const data = await r.json();

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).json(data);
}
