import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      if (!router.query.id) return;
      try {
        const { data, error } = await fetch(
          `/api/posts/detail/${router.query.id}`
        ).then((res) => res.json());
        if (data) {
          setContent(data.content);
        }
        if (error) {
          setContent("<div>데이터를 찾지 못했습니다.</div>");
          throw new Error(error);
        }
      } catch (error) {
        console.error("error : ", error);
      }
    };
    fetchData();
  }, [router.query.id]);

  return (
    <>
      <p dangerouslySetInnerHTML={{ __html: content }}></p>
    </>
  );
}
