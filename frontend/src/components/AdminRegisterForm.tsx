import { JSX, createSignal } from 'solid-js';

import { A } from '@solidjs/router';

import Form from '../ui/Form/Form';
import AdminAuthFormSubmitButton from '../ui/AdminAuthFormSubmitButton/AdminAuthFormSubmitButton';
import Input from '../ui/Input/Input';
import {
  ADMIN_LOGIN_ROUTE,
  BACKEND_ADMIN_REGISTER_ROUTE,
} from '../utils/consts';
import AdminAuthFormOtherChoice from '../ui/AdminAuthFormOtherChoice/AdminAuthFormOtherChoice';
import AdminAuthFormTitle from '../ui/AdminAuthFormTitle/AdminAuthFormTitle';
import axiosInstance from '../utils/axiosInstance';

const AdminRegisterForm = (): JSX.Element => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordRepeat, setPasswordRepeat] = createSignal('');

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    if (username() != '' && password() != '' && passwordRepeat() != '') {
      if (password() == passwordRepeat()) {
        await axiosInstance
          .post(
            BACKEND_ADMIN_REGISTER_ROUTE,
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
              window.location.replace(ADMIN_LOGIN_ROUTE);
            }
          })
          .catch((error) => {
            alert(
              'Ошибка отправки. Возможно, аккаунт администратора уже создан. Если Вы уверены, что создаёте первый аккаунт, попробуйте ещё раз',
            );
            console.log(error);
          });
      } else {
        alert('Пароли не совпадают');
      }
    } else {
      alert('Не все поля заполнены');
    }
  };

  return (
    <Form onsubmit={handleSubmit}>
      <AdminAuthFormTitle>Создание аккаунта администратора</AdminAuthFormTitle>
      <Input
        placeholder='Имя пользователя'
        name='admin_register_form_username'
        value={username()}
        oninput={(event) => setUsername(event.target.value)}
      />
      <Input
        type='password'
        placeholder='Пароль'
        name='admin_register_form_password'
        value={password()}
        oninput={(event) => setPassword(event.target.value)}
      />
      <Input
        type='password'
        placeholder='Повторите пароль'
        name='admin_register_form_password_repeat'
        value={passwordRepeat()}
        oninput={(event) => setPasswordRepeat(event.target.value)}
      />
      <AdminAuthFormSubmitButton title='Зарегистрироваться' />
      <AdminAuthFormOtherChoice>
        Уже есть аккаунт? <A href={ADMIN_LOGIN_ROUTE}>Вход</A>
      </AdminAuthFormOtherChoice>
    </Form>
  );
};

export default AdminRegisterForm;
