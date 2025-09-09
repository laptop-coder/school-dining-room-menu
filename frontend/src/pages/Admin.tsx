import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AdminPageButton from '../ui/AdminPageButton/AdminPageButton';
import AdminPageButtonsGroup from '../ui/AdminPageButtonsGroup/AdminPageButtonsGroup';
import {
  CATEGORY_MANAGEMENT_ROUTE,
  DISH_MANAGEMENT_ROUTE,
  DISH_AVAILABILITY_MANAGEMENT_ROUTE,
} from '../utils/consts';

const AdminPage = (): JSX.Element => {
  return (
    <Page>
      <Header admin />
      <Content>
        <AdminPageButtonsGroup>
          <AdminPageButton
            link={CATEGORY_MANAGEMENT_ROUTE}
            title='Перейти на страницу управления категориями'
          >
            Управление категориями
          </AdminPageButton>
          <AdminPageButton
            link={DISH_MANAGEMENT_ROUTE}
            title='Перейти на страницу управления блюдами'
          >
            Управление блюдами
          </AdminPageButton>
          <AdminPageButton
            link={DISH_AVAILABILITY_MANAGEMENT_ROUTE}
            title='Перейти на страницу управления наличием блюд'
          >
            Управление наличием блюд
          </AdminPageButton>
        </AdminPageButtonsGroup>
      </Content>
      <Footer />
    </Page>
  );
};

export default AdminPage;
