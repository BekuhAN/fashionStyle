import { useEffect, useState } from "react";
import { api } from "../api";
import { NewsItem } from "../../interfaces/news-item";

export const useNews = () => {
  const [news, setNews] = useState<Array<NewsItem>>([]);
  useEffect(() => {
    const get = async () => {
      const items = await api<NewsItem>({ path: "news" });
      setNews(items);
    };
    get();
  }, []);
  return news;
};
