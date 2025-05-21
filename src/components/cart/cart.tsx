import { type FormEvent, type ReactElement, useRef, useState } from "react";

import styles from "./cart.module.scss";
import {
  Alert,
  Badge,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Form,
  Input,
  Textarea,
  useDisclosure,
} from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotal } from "../../features/cart/cart";
import emailjs from "@emailjs/browser";
import { Icon } from "@iconify/react/dist/iconify.js";

const priceFormat = (price: number) =>
  price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

export default function Cart(): ReactElement {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const list = useSelector(getCart);
  const total = useSelector(getTotal);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({
    isError: false,
    text: "",
  });
  const [warning, setWarning] = useState(false);

  const [loading, setLoading] = useState(false);
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
      <h2 class='cart_total'>Итого: ${total} руб.</h2>
    `
    );
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //hqvlamo357@ramvv.com
    setLoading(true);
    if (list.length > 0) {
      emailjs
        .sendForm(
          "service_099qjgo",
          "template_306q5sv",
          formRef.current || "",
          {
            publicKey: "S1l_xUmzgej3DKyLo",
          }
        )
        .then(
          () => {
            console.log("SUCCESS!");
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
            }, 2000);
            if (formRef.current) {
              formRef.current.reset();
            }
            dispatch(clearCart());
          },
          (error) => {
            console.log("FAILED...", error.text);
            setLoading(false);
            setError({ isError: true, text: error.text });
            setTimeout(() => {
              setError({ isError: false, text: error.text });
            }, 2000);
          }
        );
    } else {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
        setLoading(false);
      }, 2000);
    }
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
                    {list.map(
                      (item) => item.id
                      //   <Product
                      //     key={item.id}
                      //     item={item}
                      //     isRow={true}
                      //     isCart={true}
                      //   />
                    )}
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
                  ></textarea>
                  <div className={styles.cart__footer}>
                    <div className={styles.cart__total}>
                      Общая сумма: {""}
                      {priceFormat(total)} ₽
                    </div>
                    <div className={styles.cart__controls}>
                      <Button
                        isLoading={loading}
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
                  {success && (
                    <Alert color="success" title="Заказ успешно отправлен!" />
                  )}
                  {error.isError && (
                    <Alert
                      color="danger"
                      title={`Что-то пошло не так... Ошибка { ${error.text} }`}
                    />
                  )}
                  {warning && (
                    <Alert
                      color="warning"
                      title={`Корзина пуста, добавьте товары!`}
                    />
                  )}
                </Form>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
