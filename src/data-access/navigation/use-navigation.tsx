import { useEffect, useState } from "react";
import { api } from "../api";
import { type NavLink } from "../../interfaces/nav-link";

export const useNavigation = () => {
  const [navItems, setNavItems] = useState<Array<NavLink>>([]);
  useEffect(() => {
    const get = async () => {
      const items = await api<NavLink>({ path: "navigation" });
      setNavItems(items);
    };
    get();
  }, []);
  return navItems;
};
