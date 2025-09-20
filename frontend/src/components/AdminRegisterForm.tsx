import { JSX, createSignal } from 'solid-js';

import { A } from '@solidjs/router';

import Form from '../ui/Form/Form';
import AdminAuthFormSubmitButton from '../ui/AdminAuthFormSubmitButton/AdminAuthFormSubmitButton';
import Input from '../ui/Input/Input';
import { ADMIN_LOGIN_ROUTE } from '../utils/consts';
import AdminAuthFormOtherChoice from '../ui/AdminAuthFormOtherChoice/AdminAuthFormOtherChoice';
import AdminAuthFormTitle from '../ui/AdminAuthFormTitle/AdminAuthFormTitle';

const AdminRegisterForm = (): JSX.Element => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordRepeat, setPasswordRepeat] = createSignal('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    console.log(username(), password(), passwordRepeat());
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
