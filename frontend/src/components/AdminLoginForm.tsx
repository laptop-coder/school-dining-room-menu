import { JSX, createSignal } from 'solid-js';

import { A } from '@solidjs/router';

import Form from '../ui/Form/Form';
import AdminAuthFormSubmitButton from '../ui/AdminAuthFormSubmitButton/AdminAuthFormSubmitButton';
import Input from '../ui/Input/Input';
import { ADMIN_REGISTER_ROUTE } from '../utils/consts';
import AdminAuthFormOtherChoice from '../ui/AdminAuthFormOtherChoice/AdminAuthFormOtherChoice';
import AdminAuthFormTitle from '../ui/AdminAuthFormTitle/AdminAuthFormTitle';

const AdminLoginForm = (): JSX.Element => {
  const [username, setUsername] = createSignal('');
  const [password, setPassword] = createSignal('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    console.log(username(), password());
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
