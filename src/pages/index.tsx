import { loadFileNames } from "@/lib/loadFileNames";
import Link from "next/link";

interface Props {
  posts: string[];
}

export default function Blog({ posts }: Props) {
  return (
    <>
      {posts.map((post) => {
        return (
          <li key={post}>
            <Link href={`/${post}`}>
              <div>{post}</div>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export async function getStaticProps() {
  const fileNames = await loadFileNames();

  return {
    props: {
      posts: fileNames,
    },
  };
}
