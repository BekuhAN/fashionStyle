import { type ReactElement } from "react";
import Carousel from "../carousel/carousel";
import { useCatalog } from "../../data-access/catalog/use-catalog";

function Popular(): ReactElement {
  const popularList = useCatalog({ popular: true, _limit: 8 });
  return (
    <section>
      <Carousel title="Популярное" items={popularList} />
    </section>
  );
}

export default Popular;
