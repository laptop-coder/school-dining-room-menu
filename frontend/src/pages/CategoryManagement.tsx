import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminCategoriesList from '../components/AdminCategoriesList/AdminCategoriesList';

const CategoryManagementPage = (): JSX.Element => {
  return (
    <Page>
      <Header admin />
      <Content>
        <AdminCategoriesList />
      </Content>
      <Footer />
    </Page>
  );
};

export default CategoryManagementPage;
