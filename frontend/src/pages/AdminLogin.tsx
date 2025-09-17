import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import { ADMIN_REGISTER_ROUTE } from '../utils/consts';

const AdminLoginPage = (): JSX.Element => {
  return (
    <Page>
      <Header admin />
      <Content></Content>
      <Footer />
    </Page>
  );
};

export default AdminLoginPage;
