import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './forgot-password.module.css';
import { passwordReset } from "../../utils/burger-api";

function ForgotPasswordPage(): React.JSX.Element {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>();
    const navigate = useNavigate();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        passwordReset(email)
            .then(() => {
                localStorage.setItem("resetPassword", "true");
                navigate('/reset-password')
            })
            .catch((err) => setError(err.message));
    }

    return (
        <div className={styles.form}>
            <p className="text text_type_main-medium pt-6 pb-6">
                Восстановление пароля
            </p>
            <form onSubmit={onSubmit}>
                <Input
                    type={'email'}
                    placeholder={'Укажите е-mail'}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    error={false}
                    errorText={'Ошибка ввода'}
                    size={'default'}
                    extraClass="pb-6"
                />
                <Button htmlType="submit" type="primary" size="large" disabled={!email}>
                    Восстановить
                </Button>
            </form>
            {error && <p className="text text_type_main-small text_color_inactive">Ошибка при выполнении запроса: {error}</p>}
            <p className="text text_type_main-small text_color_inactive pb-4 pt-20">
                Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
        </div>
    )
}

export { ForgotPasswordPage };