import { type ReactElement } from "react";
import styles from "./wishlist.module.scss";
import {
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishList,
  removeWishList,
  setWishList,
} from "../../features/wishlist/wishlist";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const priceFormat = (price: number) =>
  price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

export default function Wishlist(): ReactElement {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const list = useSelector(getWishList);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.wishlist__icon} onClick={onOpen}>
        <Badge color="default" placement="top-right" content={list.length}>
          <Icon icon="material-symbols-light:heart-check-outline" />
        </Badge>
      </div>
      <Drawer
        radius="none"
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Избранное
              </DrawerHeader>
              <DrawerBody>
                {list.length > 0 ? (
                  <div className={styles.wishlist__list}>
                    <Table
                      radius="none"
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn width={100}>Изображение</TableColumn>
                        <TableColumn>Название</TableColumn>
                        <TableColumn width={100}>Цена</TableColumn>
                        <TableColumn width={50}>Удалить</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {list.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className={styles.wishlist__item__image}>
                                <img
                                  src={`../../assets/catalog/${item.image[0]}`}
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/catalog/${item.id}`}
                                className={styles.wishlist__item__title}
                              >
                                {item.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div className={styles.wishlist__item__price}>
                                {priceFormat(item.price)} ₽
                              </div>
                            </TableCell>
                            <TableCell>
                              <button
                                className={styles.wishlist__item__delete}
                                onClick={() =>
                                  dispatch(removeWishList(item.id))
                                }
                              >
                                <Icon
                                  icon="material-symbols-light:delete-outline-sharp"
                                  width="30"
                                  height="30"
                                />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div>Пусто :(</div>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Button
                  color="warning"
                  variant="ghost"
                  radius="none"
                  onPress={() => dispatch(setWishList([]))}
                >
                  Очистить
                </Button>
                <Button
                  color="default"
                  variant="ghost"
                  radius="none"
                  onPress={onClose}
                >
                  Закрыть
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
