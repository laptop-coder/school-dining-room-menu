import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AddCategoryForm from '../components/AddCategoryForm';

const AddCategoryPage = (): JSX.Element => {
  return (
    <Page>
      <Header admin />
      <Content>
        <AddCategoryForm />
      </Content>
      <Footer />
    </Page>
  );
};

export default AddCategoryPage;
