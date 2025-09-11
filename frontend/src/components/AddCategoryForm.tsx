import { JSX, createSignal } from 'solid-js';
import Input from '../ui/Input/Input';
import SubmitButton from '../ui/SubmitButton/SubmitButton';
import Form from '../ui/Form/Form';
import addCategory from '../utils/addCategory';

const AddCategoryForm = (): JSX.Element => {
  const [categoryName, setCategoryName] = createSignal('');
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (categoryName() !== '') {
      addCategory({ categoryName: categoryName() });
    }
  };
  return (
    <Form onsubmit={handleSubmit}>
      <Input
        placeholder='Название категории'
        name='category_name'
        value={categoryName()}
        oninput={(event) => setCategoryName(event.target.value)}
      />
      <SubmitButton name='add_category_submit'>Добавить категорию</SubmitButton>
    </Form>
  );
};

export default AddCategoryForm;
