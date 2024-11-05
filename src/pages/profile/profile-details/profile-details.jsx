import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../services/actions/auth";
import styles from "./profile-details.module.css";

function ProfileDetailsPage() {
    const user = useSelector(store => store.user.user);
    const [userForm, setUserForm] = useState(user);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(userForm));
    }

    const onChange = (e) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value });
        setIsFormChanged(true);
    }

    const onCancelButtonClick = () => {
        setUserForm(user);
        setIsFormChanged(false);
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                type={"text"}
                placeholder={'Имя'}
                onChange={onChange}
                icon={"EditIcon"}
                value={userForm.name}
                name={'name'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="pb-6"
            />
            <Input
                type={"email"}
                placeholder={'Логин'}
                onChange={onChange}
                icon={"EditIcon"}
                value={userForm.email}
                name={'email'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="pb-6"
            />
            <Input
                type={'password'}
                placeholder={'Пароль'}
                onChange={onChange}
                icon={"EditIcon"}
                value={userForm.password ?? ""}
                name={'password'}
                error={false}
                errorText={'Ошибка'}
                size={'default'}
                extraClass="pb-6"
            />
            {isFormChanged &&
                <div className={styles.buttons}>
                    <Button htmlType="button" type="secondary" size="medium" onClick={onCancelButtonClick}>
                        Отменить
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium" disabled={!userForm.name || !userForm.email} >
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    )
}
export { ProfileDetailsPage };