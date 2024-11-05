import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './reset-password.module.css';
import { passwordResetReset } from "../../utils/burger-api";

function ResetPasswordPage() {

    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [hidePass, setHidePass] = useState(true);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const inputRef = useRef(null);

    const onIconClick = () => {
        setTimeout(() => inputRef.current.focus(), 0)
        setHidePass(!hidePass);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        passwordResetReset(password, code)
            .then(() => {
                localStorage.removeItem("resetPassword")
                navigate('/login')
            })
            .catch((err) => setError(err.message));
    }

    if (!localStorage.getItem("resetPassword")) {
        navigate('/forgot-password');
    }

    return (
        <div className={styles.form}>
            <p className="text text_type_main-medium pt-6 pb-6">
                Восстановление пароля
            </p>
            <form onSubmit={onSubmit}>
                <Input
                    type={hidePass ? 'password' : "text"}
                    placeholder={'Введите новый пароль'}
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
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setCode(e.target.value)}
                    value={code}
                    error={false}
                    ref={inputRef}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass="pb-6"
                />
                <Button htmlType="submit" type="primary" size="large" disabled={!password || !code}>
                    Сохранить
                </Button>
            </form>

            {error && <p className="text text_type_main-small text_color_inactive pb-4 pt-10">Ошибка при выполнении запроса: {error}</p>}
            <p className="text text_type_main-small text_color_inactive pb-4 pt-20">
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
        </div>
    )
}

export { ResetPasswordPage };