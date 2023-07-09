import { loadPosts } from "./loadPosts";

export async function loadFileNames() {
  const posts = await loadPosts();
  const fileNames = posts.map((post) => post.replace(/\.md$/, ""));
  return fileNames;
}
