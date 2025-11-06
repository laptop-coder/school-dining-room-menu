import { JSX, createSignal } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminRegisterForm from '../components/AdminRegisterForm';
import getAuthorizedCookie from '../utils/getAuthorizedCookie';

const AdminRegisterPage = (): JSX.Element => {
  const [authorized, setAuthorized] = createSignal(false);
  getAuthorizedCookie(setAuthorized);
  return (
    <Page>
      <Header
        admin
        authorized={authorized()}
      />
      <Content>
        <AdminRegisterForm />
      </Content>
      <Footer />
    </Page>
  );
};

export default AdminRegisterPage;
