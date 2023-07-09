import { loadFileNames } from "@/lib/loadFileNames";
import { loadPost } from "@/lib/loadPost";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

export default function Page({
  postDetail,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: postDetail.content }}></p>
    </>
  );
}

// 미리 렌더링할 페이지 path들을 넘김
export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = await loadFileNames();
  const paths = fileNames.map((fileName) => {
    return {
      params: { fileName },
    };
  });
  return {
    paths,
    fallback: false, // false or "blocking"
  };
};

// context 예시
// context:  {
//   params: { fileName: 'do-not-use-"new"-for-side-effects-eslint-rule' },
//   locales: undefined,
//   locale: undefined,
//   defaultLocale: undefined
// }
export const getStaticProps: GetStaticProps<{
  postDetail: matter.GrayMatterFile<string>;
}> = async (context) => {
  const post = await loadPost(context.params?.fileName as string);

  // TODO: serialize할 수 없는 data.date, orig 등은 어떻게 처리?
  return {
    props: {
      postDetail: JSON.parse(JSON.stringify(post)),
    },
  };
};
