import { useEffect, useState } from "react";
import { api } from "../api";
import type { Category } from "../../interfaces/cat";

interface Params {
  _embed?: string;
}

export const useCategories = (params?: Params) => {
  const [categories, setCategories] = useState<Array<Category>>([]);
  useEffect(() => {
    const get = async () => {
      const items = await api<Category>({ path: "categories", params });
      setCategories(items);
    };
    get();
  }, []);
  return categories;
};
