import { type FormEvent, type ReactElement, useRef, useState } from "react";

import styles from "./cart.module.scss";
import {
  addToast,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Form,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  getCart,
  getTotal,
  removeCart,
} from "../../features/cart/cart";
import emailjs from "@emailjs/browser";
import { Icon } from "@iconify/react/dist/iconify.js";
import CartItem from "../cart-item/cart-item";
import { Link } from "react-router-dom";

const priceFormat = (price: number) =>
  price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

export default function Cart(): ReactElement {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const list = useSelector(getCart);
  const total = useSelector(getTotal);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [sendTemplate, setSendTemplate] = useState("");

  const TemplateTable = () => {
    setSendTemplate(
      `
      <table>
        <thead>
          <tr>
            <th width='50px' style='text-align: center'>№</th>
            <th style='text-align: center'>Наименование</th>
            <th width='100px' style='text-align: center'>Количество</th>
            <th width='50px' style='text-align: center'>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          ${list
            .map(
              (item, index) => `
            <tr>
              <td width='50px' style='text-align: center'>${index + 1}</td>
              <td>${item.title}</td>
              <td width='100px' style='text-align: center'>${
                item.count
              } шт.</td>
              <td width='100px' style='text-align: center'>${(
                (item?.count ?? 0) * item.price
              ).toFixed(2)} руб.</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <h2 class='cart_total'>Итого: ${priceFormat(total)} руб.</h2>
    `
    );
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //gutgesg3pd@translateid.com
    emailjs
      .sendForm("service_wulgaob", "template_7r2dixx", formRef.current || "", {
        publicKey: "uQUIWvCwv0Nvd-XaD",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          if (formRef.current) {
            formRef.current.reset();
          }
          addToast({
            title: "Успех!",
            description: "Сообщение успешно отправлено!",
            timeout: 3000,
            color: "success",
          });
          dispatch(clearCart());
        },
        (error) => {
          console.log("FAILED...", error.text);
          addToast({
            title: "Ошибка...",
            description: error.text,
            timeout: 3000,
            color: "danger",
          });
        }
      );
  };

  return (
    <>
      <div className={styles.cart__icon} onClick={onOpen}>
        <Badge placement="top-right" content={list.length}>
          <Icon
            icon="material-symbols-light:shopping-bag-sharp"
            width="35"
            height="35"
          />
        </Badge>
      </div>
      <Drawer
        size="3xl"
        radius="none"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Корзина
              </DrawerHeader>
              <DrawerBody>
                {list.length > 0 ? (
                  <div className={styles.cart__list}>
                    <Table
                      radius="none"
                      aria-label="Example static collection table"
                    >
                      <TableHeader>
                        <TableColumn width={100}>Изображение</TableColumn>
                        <TableColumn>Название</TableColumn>
                        <TableColumn width={90}>Цена</TableColumn>
                        <TableColumn width={120}>Кол-во</TableColumn>
                        <TableColumn width={90}>Сумма</TableColumn>
                        <TableColumn width={50}>Удалить</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {list?.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div className={styles.cart_item__image}>
                                <img
                                  src={`../../assets/catalog/${item.image[0]}`}
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <Link
                                to={`/catalog/${item.id}`}
                                className={styles.cart_item__title}
                              >
                                {item.title}
                              </Link>
                            </TableCell>
                            <TableCell>
                              <div className={styles.cart_item__price}>
                                {priceFormat(item.price)} ₽
                              </div>
                            </TableCell>
                            <TableCell>
                              <CartItem item={item} />
                            </TableCell>
                            <TableCell>
                              <div className={styles.cart_item__price}>
                                {priceFormat(item.price * item?.count)} ₽
                              </div>
                            </TableCell>
                            <TableCell>
                              <button
                                className={styles.cart_item__delete}
                                onClick={() => dispatch(removeCart(item))}
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
                <Form
                  className="w-full flex gap-4 flex-row flex-wrap"
                  validationBehavior="native"
                  ref={formRef}
                  onSubmit={sendEmail}
                >
                  <Input
                    classNames={{ base: "w-50 flex-1", inputWrapper: "h-50" }}
                    isRequired
                    errorMessage="Поле должно быть заполнено"
                    label="Имя"
                    labelPlacement="outside"
                    name="order_name"
                    placeholder="Ваше имя"
                    type="text"
                    variant="bordered"
                    radius="none"
                  />
                  <Input
                    classNames={{ base: "w-50 flex-1 ", inputWrapper: "h-50" }}
                    isRequired
                    errorMessage="Не верно введена электронная почта"
                    label="Электронная почта"
                    labelPlacement="outside"
                    name="order_email"
                    placeholder="Ваша электронная почта"
                    type="tel"
                    variant="bordered"
                    radius="none"
                  />
                  <Textarea
                    className="w-full"
                    label="Комментарий"
                    labelPlacement="outside"
                    placeholder="Ваш комментарий"
                    variant="bordered"
                    name="order_text"
                    radius="none"
                  />
                  <textarea
                    className="hidden"
                    name="order_list"
                    value={sendTemplate}
                    readOnly
                  ></textarea>
                  <div className={styles.cart__footer}>
                    <div className={styles.cart__total}>
                      Общая сумма: {""}
                      {priceFormat(total)} ₽
                    </div>
                    <div className={styles.cart__controls}>
                      <Button
                        type="submit"
                        color="primary"
                        onPress={() => {
                          TemplateTable();
                        }}
                        radius="none"
                      >
                        Отправить
                      </Button>
                      <Button
                        color="warning"
                        variant="ghost"
                        onPress={() => dispatch(clearCart())}
                        radius="none"
                      >
                        Очистить
                      </Button>
                      <Button
                        color="danger"
                        variant="ghost"
                        onPress={onClose}
                        radius="none"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                </Form>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
