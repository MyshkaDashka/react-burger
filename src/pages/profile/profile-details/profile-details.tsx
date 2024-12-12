import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { updateUser } from "../../../services/actions/auth";
import styles from "./profile-details.module.css";
import { useDispatch, useSelector } from "../../../services/store";
import { TUserData } from "../../../utils/types";

function ProfileDetailsPage(): React.JSX.Element {
    const user = useSelector(store => store.user.user);
    const [userForm, setUserForm] = useState(user);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(updateUser(userForm as TUserData));
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserForm({ ...userForm, [e.target.name]: e.target.value } as TUserData);
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
                value={userForm ? userForm.name : ""}
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
                value={userForm ? userForm.email : ""}
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
                value={userForm?.password ? userForm.password : ""}
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
                    <Button htmlType="submit" type="primary" size="medium" disabled={!userForm?.name || !userForm?.email} >
                        Сохранить
                    </Button>
                </div>
            }
        </form>
    )
}
export { ProfileDetailsPage };