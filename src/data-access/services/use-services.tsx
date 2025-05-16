// import { useEffect, useState } from "react";
// import { api } from "../api";
// // import { Service } from "../../interfaces/service";

// export const useServices = () => {
//   const [services, setServices] = useState<Array<Service>>([]);
//   useEffect(() => {
//     const get = async () => {
//       const items = await api<Service>({ path: "services" });
//       setServices(items);
//     };
//     get();
//   }, []);
//   return services;
// };
