import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { type CatalogItemType } from "../../interfaces/catalog-item";

interface Params {
  new?: boolean;
  popular?: boolean;
  oldPrice_gt?: number;
  price_gte?: number;
  price_lte?: number;
  _limit?: number;
  categoryId?: number;
  trendId?: number;
  _sort?: string;
}

export const useCatalog = (params: Params) => {
  const [items, setItems] = useState<Array<CatalogItemType>>([]);
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
  useEffect(() => {
    const get = async () => {
      const items = await api<CatalogItemType>({
        path: "catalog",
        params: memoizedParams,
      });
      setItems(items);
    };
    get();
  }, [memoizedParams]);
  return items;
};
