import { JSX, createSignal } from 'solid-js';

import DishesListTV from '../components/DishesListTV/DishesListTV';
import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';

const TVPage = (): JSX.Element => {
  const [isFullscreen, setIsFullscreen] = createSignal(false);
  return (
    <Page>
      <Header />
      <Content>
        <DishesListTV
          isFullscreen={isFullscreen()}
          setIsFullscreen={setIsFullscreen}
        />
      </Content>
      <Footer />
    </Page>
  );
};

export default TVPage;
