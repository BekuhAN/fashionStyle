import { useEffect, useState } from "react";
import { api } from "../api";
import { TeamItem } from "../../interfaces/team-item";

export const useTeam = () => {
  const [team, setTeam] = useState<Array<TeamItem>>([]);
  useEffect(() => {
    const get = async () => {
      const items = await api<TeamItem>({ path: "team" });
      setTeam(items);
    };
    get();
  }, []);
  return team;
};
