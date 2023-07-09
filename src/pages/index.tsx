import { loadPosts } from "@/lib/loadPosts";
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
  const posts = await loadPosts();
  // TODO: 일단 fileName만 가져오고, 나중에 리스트에서 필요한 데이터 추가
  const fileNames = posts.map((post) => post.replace(/\.md$/, ""));

  return {
    props: {
      posts: fileNames,
    },
  };
}
