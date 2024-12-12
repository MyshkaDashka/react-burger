import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TIngredientItem } from "../../../utils/types";
import { deleteConstructorIngredient, moveIngredient } from "../../../services/actions/burger-constructor";
import { Identifier } from "dnd-core";
import styles from "./burger-constructor-ingredient.module.css";
import { useDispatch } from "../../../services/store";

type TBurgerConstructorIngredientProps = {
    id: string;
    index: number;
    item: TIngredientItem & { key: string };
}

type TDragObject = {
    id: string;
    index: number;
}
type TDragCollectedProps = {
    isDragging: boolean;
}

type TDropCollectedProps = {
    handlerId: Identifier | null;
}

const BurgerConstructorIngredient = ({ id, index, item }: TBurgerConstructorIngredientProps): React.JSX.Element => {
    const dispatch = useDispatch();

    const deleteFromConstructor = () => {
        return dispatch(deleteConstructorIngredient(item));
    }
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
        accept: "item-constr-ingr",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            if (!clientOffset) {
                return;
            }
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            dispatch(moveIngredient(hoverIndex, dragIndex));
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag<TDragObject, unknown, TDragCollectedProps>({
        type: "item-constr-ingr",
        item: () => {
            return { id, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    drag(drop(ref));

    return (
        <div className={`${styles.dragItem} ${isDragging && styles.ondrag}`} ref={ref} data-handler-id={handlerId}>
            <div className="pr-2">
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => deleteFromConstructor()}
            />
        </div>
    )
};

export { BurgerConstructorIngredient };