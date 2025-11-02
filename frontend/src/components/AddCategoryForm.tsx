import { JSX, createSignal, createEffect, on } from 'solid-js';
import Input from '../ui/Input/Input';
import SubmitButton from '../ui/SubmitButton/SubmitButton';
import Form from '../ui/Form/Form';
import addCategory from '../utils/addCategory';
import checkStringSecurity from '../utils/checkStringSecurity';
import FormIncorrectInputMessage from '../ui/FormIncorrectInputMessage/FormIncorrectInputMessage';

const AddCategoryForm = (): JSX.Element => {
  const [categoryName, setCategoryName] = createSignal('');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    // Checks
    if (categoryNameEmpty()) {
      alert(categoryNameEmptyMessage);
      return;
    } else if (categoryNameForbiddenSymbols()) {
      alert(categoryNameForbiddenSymbolsMessage);
      return;
    }

    addCategory({ categoryName: categoryName() });
  };

  const [categoryNameEmpty, setCategoryNameEmpty] = createSignal(false);
  const [categoryNameForbiddenSymbols, setCategoryNameForbiddenSymbols] =
    createSignal(false);

  createEffect(
    on(
      () => categoryName(),
      () => {
        // Checks for category name
        if (categoryName() === '') {
          setCategoryNameEmpty(true);
          setCategoryNameForbiddenSymbols(false);
        } else {
          setCategoryNameEmpty(false);
          if (!checkStringSecurity(categoryName())) {
            setCategoryNameForbiddenSymbols(true);
          } else {
            setCategoryNameForbiddenSymbols(false);
          }
        }
      },
      { defer: true },
    ),
  );

  const categoryNameEmptyMessage =
    'Название категории блюда не может быть пустой';
  const categoryNameForbiddenSymbolsMessage =
    'В названии категории блюда используются запрещённые символы';

  return (
    <Form onsubmit={handleSubmit}>
      <FormIncorrectInputMessage>
        {categoryNameEmpty() && <span>{categoryNameEmptyMessage}</span>}
        {categoryNameForbiddenSymbols() && (
          <span>{categoryNameForbiddenSymbolsMessage}</span>
        )}
      </FormIncorrectInputMessage>
      <Input
        placeholder='Название категории*'
        name='category_name'
        value={categoryName()}
        oninput={(event) => setCategoryName(event.target.value)}
        redBorder={categoryNameEmpty() || categoryNameForbiddenSymbols()}
      />
      <SubmitButton name='add_category_submit'>Добавить категорию</SubmitButton>
    </Form>
  );
};

export default AddCategoryForm;
