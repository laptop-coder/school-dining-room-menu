import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminLoginForm from '../components/AdminLoginForm';

const AdminLoginPage = (): JSX.Element => {
  return (
    <Page>
      <Header admin />
      <Content>
        <AdminLoginForm />
      </Content>
      <Footer />
    </Page>
  );
};

export default AdminLoginPage;
