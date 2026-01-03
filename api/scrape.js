import cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const TARGET_URL = "https://wutheringwaves.fandom.com/wiki/Redemption_Code; // replace

    const response = await fetch(TARGET_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch page" });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const tables = [];

    $("table.table-progress-tracking").each((_, table) => {
      const tableId = $(table).attr("id") || null;
      const codes = [];

      $(table)
        .find("tbody tr")
        .each((_, row) => {
          const codeRedeem = $(row)
            .find("td code")
            .first()
            .text()
            .trim();

          if (!codeRedeem) return;

          const rewards = [];

          $(row)
            .find(".card-container")
            .each((_, card) => {
              const img = $(card).find("img");

              const name = img.attr("alt")?.trim();
              const image = img.attr("src");

              const amountText = $(card)
                .find(".card-text")
                .text()
                .replace(/,/g, "")
                .trim();

              const amount = parseInt(amountText, 10);

              if (name && image && !isNaN(amount)) {
                rewards.push({
                  name,
                  amount,
                  image
                });
              }
            });

          codes.push({
            codeRedeem,
            rewards
          });
        });

      if (codes.length > 0) {
        tables.push({
          tableId,
          codes
        });
      }
    });

    res.status(200).json({
      source: TARGET_URL,
      tableCount: tables.length,
      tables
    });

  } catch (err) {
    res.status(500).json({
      error: "Scraping failed",
      message: err.message
    });
  }
}
