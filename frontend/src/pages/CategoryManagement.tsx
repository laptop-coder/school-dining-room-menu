import { JSX, createSignal } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminCategoriesList from '../components/AdminCategoriesList/AdminCategoriesList';
import getAuthorizedCookie from '../utils/getAuthorizedCookie';

const CategoryManagementPage = (): JSX.Element => {
  const [authorized, setAuthorized] = createSignal(false);
  getAuthorizedCookie(setAuthorized);
  return (
    <Page
      admin
      authorized={authorized()}
    >
      <Header
        admin
        authorized={authorized()}
      />
      <Content>
        <AdminCategoriesList />
      </Content>
      <Footer />
    </Page>
  );
};

export default CategoryManagementPage;
