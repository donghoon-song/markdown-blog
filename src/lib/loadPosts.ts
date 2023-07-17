import fs from "fs";
import path from "path";

export function loadPosts() {
  const posts = fs.readdirSync(path.join(process.cwd(), "__posts"));
  return posts;
}
