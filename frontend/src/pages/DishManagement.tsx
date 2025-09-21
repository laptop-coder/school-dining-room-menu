import { JSX, createSignal } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminDishesList from '../components/AdminDishesList/AdminDishesList';
import CategoryToggle from '../components/CategoryToggle';
import getAuthorizedCookie from '../utils/getAuthorizedCookie';

const DishManagementPage = (): JSX.Element => {
  const [category, setCategory] = createSignal('');
  const [authorized, setAuthorized] = createSignal(false);
  getAuthorizedCookie(setAuthorized);
  return (
    <Page
      admin
      authorized={authorized()}
    >
      <Header admin />
      <Content>
        <CategoryToggle setter={setCategory} />
        <AdminDishesList category={category} />
      </Content>
      <Footer />
    </Page>
  );
};

export default DishManagementPage;
