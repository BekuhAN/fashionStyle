import { useState, type ReactElement } from "react";
import type { CatalogItemType } from "../../interfaces/catalog-item";
import { Input } from "@heroui/react";
import styles from "./cart-item.module.scss";
import { editCart } from "../../features/cart/cart";
import { useDispatch } from "react-redux";

interface Props {
  item: CatalogItemType;
}

function CartItem({ item }: Props): ReactElement {
  const dispatch = useDispatch();
  const [count, setCount] = useState(item?.count);

  return (
    <>
      <Input
        endContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">шт.</span>
          </div>
        }
        labelPlacement="outside"
        min={1}
        max={100}
        radius="none"
        value={count?.toString()}
        onValueChange={(e) => {
          setCount(Number(e));
          dispatch(editCart({ ...item, count: Number(e) }));
        }}
        classNames={{
          base: styles.product__info__buy__input,
        }}
        type="number"
      />
    </>
  );
}

export default CartItem;
