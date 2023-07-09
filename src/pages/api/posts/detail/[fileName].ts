// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { System } from "typescript";

type Data = {
  data?: Object;
  error?: Object;
};

interface SystemError {
  code: string;
  errno: number;
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const postsDirectory = path.join(process.cwd(), "__posts");
  try {
    const rawFileContent = await fs.readFile(
      path.join(postsDirectory, `${req.query.fileName}.md`),
      "utf8"
    );
    const contentObject = matter(rawFileContent);
    const content = await unified()
      .use(remarkParse)
      .use(remarkHtml)
      .process(contentObject.content);
    contentObject.content = content.toString();
    res.status(200).json({ data: contentObject });
  } catch (error) {
    console.error("error : ", error);
    const err = error as SystemError;
    if (err.code === "ENOENT") {
      res.status(404).json({ error: "파일을 찾지 못했습니다." });
      return;
    }
    res.status(500).json({ error: "서버 에러" });
    return;
  }
}
