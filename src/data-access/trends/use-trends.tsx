import { useEffect, useState } from "react";
import { api } from "../api";
import type { TrendsItem } from "../../interfaces/trends";
interface Params {
  _embed?: string;
}

export const useTrends = (params?: Params) => {
  const [trends, setTrends] = useState<Array<TrendsItem>>([]);
  useEffect(() => {
    const get = async () => {
      const items = await api<TrendsItem>({ path: "trends", params });
      setTrends(items);
    };
    get();
  }, []);
  return trends;
};
