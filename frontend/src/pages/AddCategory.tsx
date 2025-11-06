import { JSX, createSignal } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AddCategoryForm from '../components/AddCategoryForm';
import getAuthorizedCookie from '../utils/getAuthorizedCookie';

const AddCategoryPage = (): JSX.Element => {
  const [authorized, setAuthorized] = createSignal(false);
  getAuthorizedCookie(setAuthorized);
  return (
    <Page>
      <Header
        admin
        authorized={authorized()}
      />
      <Content>
        <AddCategoryForm />
      </Content>
      <Footer />
    </Page>
  );
};

export default AddCategoryPage;
