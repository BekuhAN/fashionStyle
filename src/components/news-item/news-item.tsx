import { type ReactElement } from "react";
import { Icon } from "@iconify/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@heroui/react";
import styles from "./news-item.module.scss";
import type { NewsType } from "../../interfaces/news-type";

interface Props {
  item: NewsType;
}

function NewsItem({ item }: Props): ReactElement {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className={styles.news_item} onClick={onOpen}>
        <div className={styles.news_item__image}>
          <img src={`./assets/${item.image}`} />
        </div>
        <div className={styles.news_item__date}>
          <Icon
            icon="material-symbols-light:calendar-month-sharp"
            width="18"
            height="18"
          />
          {item.date}
        </div>
        <div className={styles.news_item__title}>{item.title}</div>
      </div>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        radius="none"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className={styles.news_item__modal__title}>{item.title}</h2>
                <div className={styles.news_item__modal__date}>
                  <Icon
                    icon="material-symbols-light:calendar-month-sharp"
                    width="18"
                    height="18"
                  />
                  {item.date}
                </div>
              </ModalHeader>
              <ModalBody>
                <div className={styles.news_item__modal__inner}>
                  <div className={styles.news_item__modal__image}>
                    <img src={`./assets/${item.image}`} />
                  </div>
                  <div
                    className={styles.news_item__modal__content}
                    dangerouslySetInnerHTML={{
                      __html: `${item?.content}`,
                    }}
                  ></div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default NewsItem;
