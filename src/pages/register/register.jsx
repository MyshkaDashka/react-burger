import { useRef, useState } from "react";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { register } from "../../utils/burger-api";
import styles from './register.module.css';

function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);

    const inputRef = useRef(null);

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        setHidePass(!hidePass);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        register({ email, password, name });
    }

    return (
        <div className={styles.form}>
            <p className="text text_type_main-medium pt-6 pb-6">
                Регистрация
            </p>
            <form onSubmit={onSubmit}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setName(e.target.value)}
                    value={name}
                    error={false}
                    errorText={'Ошибка ввода'}
                    size={'default'}
                    extraClass="pb-6"
                />
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка ввода'}
                    size={'default'}
                    extraClass="pb-6"
                />
                <Input
                    type={hidePass ? 'password' : "text"}
                    placeholder={'Пароль'}
                    onChange={e => setPassword(e.target.value)}
                    icon={hidePass ? "HideIcon" : 'ShowIcon'}
                    value={password}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="pb-6"
                />
                <Button htmlType="submit" type="primary" size="large" disabled={!email || !password || !name}>
                    Зарегистрироваться
                </Button>
            </form>
            <p className="text text_type_main-small text_color_inactive pb-4 pt-20">
                Уже зарегистрированы? <Link to="/login">Войти</Link>
            </p>
        </div>
    )
}
export { RegisterPage };