import { JSX, createSignal } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import EditDishForm from '../components/EditDishForm';
import getAuthorizedCookie from '../utils/getAuthorizedCookie';

import { useSearchParams } from '@solidjs/router';

const EditDishPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const dishId = (searchParams.dish_id || '').toString();
  const [authorized, setAuthorized] = createSignal(false);
  getAuthorizedCookie(setAuthorized);
  return (
    <Page>
      <Header
        admin
        authorized={authorized()}
      />
      <Content>
        <EditDishForm dishId={dishId} />
      </Content>
      <Footer />
    </Page>
  );
};

export default EditDishPage;
