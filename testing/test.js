const fs = require("fs/promises");
const path = require("path");

async function fetch_all_blogs_title_and_url() {
  try {
    let page = 0;
    const new_data = [];

    do {
      page++;
      const response = await fetch(
        `https://ritzmediaworld.com/api/get_all_blogs?page=${page}`,
      );

      if (!response.ok) {
        console.log(`Page ${page} failed with status ${response.status}`);
        break;
      }

      const payload = await response.json();
      const records = Array.isArray(payload)
        ? payload
        : payload?.blogs || payload?.data || [];

      if (!Array.isArray(records) || records.length === 0) {
        console.log(`Page ${page} returned [] — stopping.`);
        break;
      }

      for (const blog of records) {
        const title = blog.title || blog.blogTitle || "";
        const slug = blog.slug || blog.blogSlug || "";
        if (title || slug) {
          new_data.push({ title, url: `https://ritzmediaworld.com/${slug}` });
        }
      }

      console.log(`Page ${page}: fetched ${records.length} blogs (total ${new_data.length})`);
    } while (true);

    const outPath = path.join(__dirname, "seo_blog.json");
    await fs.writeFile(outPath, JSON.stringify(new_data, null, 2), "utf8");
    console.log(`Saved ${new_data.length} blogs to ${outPath}`);
  } catch (error) {
    console.log("Internal Server Error ", error);
  }
}

fetch_all_blogs_title_and_url();
