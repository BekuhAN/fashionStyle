import { type ReactElement } from "react";
import { useCatalog } from "../../data-access/catalog/use-catalog";
import Carousel from "../carousel/carousel";

function New(): ReactElement {
  const newList = useCatalog({ new: true, _limit: 8 });
  return (
    <section>
      <Carousel title="Новинки" items={newList} />
    </section>
  );
}

export default New;
