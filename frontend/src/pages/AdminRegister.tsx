import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import { ADMIN_LOGIN_ROUTE } from '../utils/consts';

const AdminRegisterPage = (): JSX.Element => {
  return (
    <Page>
      <Header admin />
      <Content></Content>
      <Footer />
    </Page>
  );
};

export default AdminRegisterPage;
