import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

// TODO: 에러처리 어떻게 하면 좋을지?
export async function loadPost(
  fileName: string
): Promise<matter.GrayMatterFile<string>> {
  const postsDirectory = path.join(process.cwd(), "__posts");
  const rawFileContent = await fs.readFile(
    path.join(postsDirectory, `${fileName}.md`),
    "utf8"
  );
  const contentObject = matter(rawFileContent);
  const content = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(contentObject.content);
  contentObject.content = content.toString();
  return contentObject;
}
