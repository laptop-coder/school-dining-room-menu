import { JSX, createSignal } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import DishAvailabilityList from '../components/DishAvailabilityList/DishAvailabilityList';
import CategoryToggle from '../components/CategoryToggle';
import getAuthorizedCookie from '../utils/getAuthorizedCookie';

const DishAvailabilityManagementPage = (): JSX.Element => {
  const [category, setCategory] = createSignal('');
  const [isFullscreen, setIsFullscreen] = createSignal(false);
  const [authorized, setAuthorized] = createSignal(false);
  getAuthorizedCookie(setAuthorized);
  return (
    <Page
      admin
      authorized={authorized()}
    >
      <Header admin />
      <Content>
        <CategoryToggle
          setter={setCategory}
          fullscreen={isFullscreen()}
        />
        <DishAvailabilityList
          category={category}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
        />
      </Content>
      <Footer />
    </Page>
  );
};

export default DishAvailabilityManagementPage;
