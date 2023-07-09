import { promises as fs } from "fs";
import path from "path";

export async function loadPosts() {
  const posts = await fs.readdir(path.join(process.cwd(), "__posts"));
  return posts;
}
