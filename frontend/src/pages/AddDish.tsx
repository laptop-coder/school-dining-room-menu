import { JSX } from 'solid-js';

import Page from '../ui/Page/Page';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Content from '../components/Content/Content';
import AddDishForm from '../components/AddDishForm';

import { useSearchParams } from '@solidjs/router';

const AddDishPage = (): JSX.Element => {
  const [searchParams] = useSearchParams();
  const defaultCategory = (searchParams.default_category || '').toString();
  return (
    <Page>
      <Header admin />
      <Content>
        <AddDishForm defaultCategory={defaultCategory} />
      </Content>
      <Footer />
    </Page>
  );
};

export default AddDishPage;
