import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminRegisterForm from '../components/AdminRegisterForm';

const AdminRegisterPage = (): JSX.Element => {
  return (
    <Page>
      <Header admin />
      <Content>
        <AdminRegisterForm />
      </Content>
      <Footer />
    </Page>
  );
};

export default AdminRegisterPage;
