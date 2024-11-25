import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../services/actions/auth";
import styles from './login.module.css';
import { useDispatch } from "../../services/store";

function LoginPage(): React.JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [hidePass, setHidePass] = useState(true);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const dispath = useDispatch();

    const onIconClick = () => {
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 0)
        setHidePass(!hidePass);
    }

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispath(login(email, password));
    }

    return (
        <div className={styles.form}>
            <p className="text text_type_main-medium pt-6 pb-6">
                Вход
            </p>
            <form onSubmit={onSubmit}>
                <Input
                    type={'email'}
                    placeholder={'E-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка ввода'}
                    size={'default'}
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
                    extraClass="pt-6 pb-6"
                />
                <Button htmlType="submit" type="primary" size="large" disabled={!email || !password} >
                    Войти
                </Button>
            </form>
            <p className="text text_type_main-small text_color_inactive pb-4 pt-20">
                Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link>
            </p>
            <p className="text text_type_main-small text_color_inactive">
                Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link>
            </p>
        </div>
    )
}
export { LoginPage };