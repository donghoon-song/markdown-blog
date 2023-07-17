import { loadPosts } from "./loadPosts";

export function loadFileNames() {
  const posts = loadPosts();
  const fileNames = posts.map((post) => post.replace(/\.md$/, ""));
  return fileNames;
}
