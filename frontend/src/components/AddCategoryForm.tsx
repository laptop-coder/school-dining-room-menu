import { JSX, createSignal } from 'solid-js';
import Input from '../ui/Input/Input';
import SubmitButton from '../ui/SubmitButton/SubmitButton';
import Form from '../ui/Form/Form';
import addCategory from '../utils/addCategory';
import { allSymbolsRegExpStr } from '../utils/regExps';
import BackButton from './BackButton/BackButton';

const AddCategoryForm = (): JSX.Element => {
  const [categoryName, setCategoryName] = createSignal('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    addCategory({ categoryName: categoryName() });
  };

  return (
    <Form onsubmit={handleSubmit}>
      <BackButton />
      <Input
        placeholder='Название категории*'
        name='category_name'
        value={categoryName()}
        oninput={(event) => setCategoryName(event.target.value)}
        required
        pattern={allSymbolsRegExpStr}
      />
      <SubmitButton name='add_category_submit'>Добавить категорию</SubmitButton>
    </Form>
  );
};

export default AddCategoryForm;
