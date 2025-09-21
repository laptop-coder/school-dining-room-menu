import { JSX, createSignal } from 'solid-js';

import { A } from '@solidjs/router';

import Form from '../ui/Form/Form';
import AdminAuthFormSubmitButton from '../ui/AdminAuthFormSubmitButton/AdminAuthFormSubmitButton';
import Input from '../ui/Input/Input';
import {
  ADMIN_REGISTER_ROUTE,
  BACKEND_ADMIN_LOGIN_ROUTE,
  ADMIN_ROUTE,
} from '../utils/consts';
import AdminAuthFormOtherChoice from '../ui/AdminAuthFormOtherChoice/AdminAuthFormOtherChoice';
import AdminAuthFormTitle from '../ui/AdminAuthFormTitle/AdminAuthFormTitle';
import axiosInstance from '../utils/axiosInstance';

const AdminLoginForm = (): JSX.Element => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (username() != '' && password() != '') {
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
          alert('Ошибка отправки. Попробуйте ещё раз');
          console.log(error);
        });
    } else {
      alert('Не все поля заполнены');
    }
  };

  return (
    <Form onsubmit={handleSubmit}>
      <AdminAuthFormTitle>Вход в аккаунт администратора</AdminAuthFormTitle>
      <Input
        placeholder='Имя пользователя'
        name='admin_login_form_username'
        value={username()}
        oninput={(event) => setUsername(event.target.value)}
      />
      <Input
        type='password'
        placeholder='Пароль'
        name='admin_login_form_password'
        value={password()}
        oninput={(event) => setPassword(event.target.value)}
      />
      <AdminAuthFormSubmitButton title='Войти в аккаунт' />
      <AdminAuthFormOtherChoice>
        Нет аккаунта? <A href={ADMIN_REGISTER_ROUTE}>Регистрация</A>
      </AdminAuthFormOtherChoice>
    </Form>
  );
};

export default AdminLoginForm;
