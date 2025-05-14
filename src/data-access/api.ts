import axios from "axios";

interface Api {
    url?: string;
    path: string;
    params?: any;
}

export async function api<T>({url = "http://localhost:3001", path, params}: Api){
  const res = await axios.get<Array<T>>(
    `${url}/${path}`,
    {
      params,
    }
  );
  return res.data;
};