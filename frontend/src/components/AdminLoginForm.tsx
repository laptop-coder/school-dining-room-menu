import { JSX, createSignal } from 'solid-js';

import { A } from '@solidjs/router';

import Form from '../ui/Form/Form';
import AdminAuthFormSubmitButton from '../ui/AdminAuthFormSubmitButton/AdminAuthFormSubmitButton';
import Input from '../ui/Input/Input';
import {
  ADMIN_REGISTER_ROUTE,
  BACKEND_ADMIN_LOGIN_ROUTE,
  ADMIN_ROUTE,
  PASSWORD_MIN_LEN,
  PASSWORD_MAX_LEN,
  USERNAME_MIN_LEN,
  USERNAME_MAX_LEN,
} from '../utils/consts';
import AdminAuthFormOtherChoice from '../ui/AdminAuthFormOtherChoice/AdminAuthFormOtherChoice';
import FormTitle from '../ui/FormTitle/FormTitle';
import axiosInstance from '../utils/axiosInstance';
import { usernameRegExpStr, passwordRegExpStr } from '../utils/regExps';
import BackButton from './BackButton/BackButton';

const AdminLoginForm = (): JSX.Element => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    await axiosInstance
      .post(
        BACKEND_ADMIN_LOGIN_ROUTE,
        {
          username: username(),
          password: password(),
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .then((response) => {
        if (response.status == 200) {
          window.location.replace(ADMIN_ROUTE);
        }
      })
      .catch((error) => {
        alert(
          'Ошибка отправки. Возможно, имя пользователя или пароль неверны. Попробуйте ещё раз',
        );
        console.log(error);
      });
  };

  return (
    <Form onsubmit={handleSubmit}>
      <BackButton />
      <FormTitle>Вход в аккаунт администратора</FormTitle>
      <Input
        placeholder='Имя пользователя'
        name='admin_login_form_username'
        value={username()}
        oninput={(event) => setUsername(event.target.value)}
        required
        pattern={usernameRegExpStr}
        minlength={USERNAME_MIN_LEN}
        maxlength={USERNAME_MAX_LEN}
      />
      <Input
        type='password'
        placeholder='Пароль'
        name='admin_login_form_password'
        value={password()}
        oninput={(event) => setPassword(event.target.value)}
        required
        pattern={passwordRegExpStr}
        minlength={PASSWORD_MIN_LEN}
        maxlength={PASSWORD_MAX_LEN}
      />
      <AdminAuthFormSubmitButton title='Войти в аккаунт' />
      <AdminAuthFormOtherChoice>
        Нет аккаунта? <A href={ADMIN_REGISTER_ROUTE}>Регистрация</A>
      </AdminAuthFormOtherChoice>
    </Form>
  );
};

export default AdminLoginForm;
