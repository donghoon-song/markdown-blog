import { loadFileNames } from "@/lib/loadFileNames";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";

interface Props {
  posts: string[];
}

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
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

// TODO : 파일이름말고 다른 정보도 가져오기
export const getStaticProps: GetStaticProps<Props> = () => {
  const fileNames = loadFileNames();

  return {
    props: {
      posts: fileNames,
    },
  };
};
