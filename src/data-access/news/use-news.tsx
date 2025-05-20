import { useEffect, useState } from "react";
import { api } from "../api";
import { type NewsType } from "../../interfaces/news-type";

export const useNews = () => {
  const [news, setNews] = useState<Array<NewsType>>([]);
  useEffect(() => {
    const get = async () => {
      const items = await api<NewsType>({ path: "news" });
      setNews(items);
    };
    get();
  }, []);
  return news;
};
