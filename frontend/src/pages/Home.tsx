import { JSX, createSignal } from 'solid-js';

import DishesList from '../components/DishesList/DishesList';
import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import AvailabilityToggle from '../components/AvailabilityToggle';
import CategoryToggle from '../components/CategoryToggle';
import Content from '../components/Content/Content';

const HomePage = (): JSX.Element => {
  const [available, setAvailable] = createSignal('');
  const [category, setCategory] = createSignal('');
  return (
    <Page>
      <Header />
      <Content>
        <AvailabilityToggle setter={setAvailable} />
        <CategoryToggle setter={setCategory} />
        <DishesList
          category={category}
          available={available}
        />
      </Content>
      <Footer />
    </Page>
  );
};

export default HomePage;
