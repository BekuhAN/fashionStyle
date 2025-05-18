import { useEffect, useState } from "react";
import { api } from "../api";
import { type Comment } from "../../interfaces/comment";

export const useComments = () => {
  const [comments, setComments] = useState<Array<Comment>>([]);
  useEffect(() => {
    const get = async () => {
      const items = await api<Comment>({ path: "comments" });
      setComments(items);
    };
    get();
  }, []);
  return comments;
};
