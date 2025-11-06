import { JSX, createSignal } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminLoginForm from '../components/AdminLoginForm';
import getAuthorizedCookie from '../utils/getAuthorizedCookie';

const AdminLoginPage = (): JSX.Element => {
  const [authorized, setAuthorized] = createSignal(false);
  getAuthorizedCookie(setAuthorized);
  return (
    <Page>
      <Header
        admin
        authorized={authorized()}
      />
      <Content>
        <AdminLoginForm />
      </Content>
      <Footer />
    </Page>
  );
};

export default AdminLoginPage;
