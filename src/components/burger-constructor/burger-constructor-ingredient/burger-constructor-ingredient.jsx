import { useRef } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientItemType } from "../../../utils/types";
import { deleteConstructorIngredient, moveIngredient } from "../../../services/actions/burger-constructor";
import styles from "./burger-constructor-ingredient.module.css";

const BurgerConstructorIngredient = ({ id, index, item }) => {
    const dispatch = useDispatch();

    const deleteFromConstructor = () => {
        return dispatch(deleteConstructorIngredient(item.key));
    }

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
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
    const [{ isDragging }, drag] = useDrag({
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
        <div className={`${styles.dragItem} ${isDragging && styles.ondrag}`} ref={ref}>
            <div className="pr-2">
                <DragIcon />
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

BurgerConstructorIngredient.propTypes = {
    item: IngredientItemType.isRequired,
    id: PropTypes.string,
    index: PropTypes.number,
}

export { BurgerConstructorIngredient };