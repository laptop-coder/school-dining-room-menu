import {
  Switch,
  Match,
  For,
  JSX,
  createSignal,
  createResource,
  createEffect,
  on,
} from 'solid-js';
import DishPhoto from '../ui/DishPhoto/DishPhoto';
import Input from '../ui/Input/Input';
import TextArea from '../ui/TextArea/TextArea';
import AttachFile from '../ui/AttachFile/AttachFile';
import Select from '../ui/Select/Select';
import SubmitButton from '../ui/SubmitButton/SubmitButton';
import Form from '../ui/Form/Form';
import addDish from '../utils/addDish';
import type Dish from '../types/dish';
import fetchCategoriesList from '../utils/fetchCategoriesList';
import Loading from '../ui/Loading/Loading';
import Error from '../ui/Error/Error';
import NoData from '../ui/NoData/NoData';
import type { ResourceReturn } from 'solid-js';
import fileToBase64 from '../utils/fileToBase64';
import checkStringSecurity from '../utils/checkStringSecurity';
import FormIncorrectInputMessage from '../ui/FormIncorrectInputMessage/FormIncorrectInputMessage';

const AddDishForm = (props: { defaultCategory?: string }): JSX.Element => {
  const [categoriesList]: ResourceReturn<string[]> =
    createResource(fetchCategoriesList);

  const [dishCategory, setDishCategory] = createSignal(
    props.defaultCategory || '',
  );
  const [dishName, setDishName] = createSignal('');
  const [dishDescription, setDishDescription] = createSignal('');
  const [dishPhoto, setDishPhoto] = createSignal('');
  const [data, setData] = createSignal();
  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    if (dishCategory() === '') {
      setDishCategory((categoriesList() as string[])[0]);
    }
    if (dishCategory() !== '' && dishName() !== '') {
      setData({
        DishCategory: dishCategory(),
        DishName: dishName(),
        DishDescription: dishDescription(),
        DishPhoto: dishPhoto(),
      });
      addDish(data() as Dish);
    }
  };

  const [dishNameEmpty, setDishNameEmpty] = createSignal(false);
  const [dishCategoryEmpty, setDishCategoryEmpty] = createSignal(false);
  const [dishNameForbiddenSymbols, setDishNameForbiddenSymbols] =
    createSignal(false);
  const [dishCategoryForbiddenSymbols, setDishCategoryForbiddenSymbols] =
    createSignal(false);
  const [dishDescriptionForbiddenSymbols, setDishDescriptionForbiddenSymbols] =
    createSignal(false);

  createEffect(
    on(
      [() => dishName(), () => dishCategory(), () => dishDescription()],
      () => {
        // Checks for dish name
        if (dishName() === '') {
          setDishNameEmpty(true);
          setDishNameForbiddenSymbols(false);
        } else {
          setDishNameEmpty(false);
          if (!checkStringSecurity(dishName())) {
            setDishNameForbiddenSymbols(true);
          } else {
            setDishNameForbiddenSymbols(false);
          }
        }
        // Checks for dish category (just in case)
        if (dishCategory() === '') {
          setDishCategoryEmpty(true);
          setDishCategoryForbiddenSymbols(false);
        } else {
          setDishCategoryEmpty(false);
          if (!checkStringSecurity(dishCategory())) {
            setDishCategoryForbiddenSymbols(true);
          } else {
            setDishCategoryForbiddenSymbols(false);
          }
        }
        // Checks for dish description
        if (
          dishDescription() !== '' &&
          !checkStringSecurity(dishDescription())
        ) {
          setDishDescriptionForbiddenSymbols(true);
        } else {
          setDishDescriptionForbiddenSymbols(false);
        }
      },
      { defer: true },
    ),
  );

  const dishNameEmptyMessage = 'Название блюда не может быть пустым';
  const dishCategoryEmptyMessage = 'Категория блюда не может быть пустой';
  const dishNameForbiddenSymbolsMessage =
    'В названии блюда используются запрещённые символы';
  const dishCategoryForbiddenSymbolsMessage =
    'В категории блюда используются запрещённые символы';
  const dishDescriptionForbiddenSymbolsMessage =
    'В описании блюда используются запрещённые символы';

  return (
    <Form onsubmit={handleSubmit}>
      <FormIncorrectInputMessage>
        {dishNameEmpty() && <span>{dishNameEmptyMessage}</span>}
        {dishCategoryEmpty() && <span>{dishCategoryEmptyMessage}</span>}
        {dishNameForbiddenSymbols() && (
          <span>{dishNameForbiddenSymbolsMessage}</span>
        )}
        {dishCategoryForbiddenSymbols() && (
          <span>{dishCategoryForbiddenSymbolsMessage}</span>
        )}
        {dishDescriptionForbiddenSymbols() && (
          <span>{dishDescriptionForbiddenSymbolsMessage}</span>
        )}
      </FormIncorrectInputMessage>
      <Input
        placeholder='Название блюда*'
        name='dish_name'
        value={dishName()}
        oninput={(event) => setDishName(event.target.value)}
        redBorder={dishNameEmpty() || dishNameForbiddenSymbols()}
      />
      {/*TODO: is it normal to use Loading in the fallback here?*/}
      <Switch fallback={<Loading />}>
        <Match
          when={
            categoriesList.state === 'unresolved' ||
            categoriesList.state === 'pending'
          }
        >
          <Loading />
        </Match>
        <Match
          when={
            categoriesList.state === 'ready' ||
            categoriesList.state === 'refreshing'
          }
        >
          <Select
            id='dish_category_select'
            value={dishCategory()}
            oninput={(event) => setDishCategory(event.target.value)}
            label='Выберите категорию*'
          >
            <For
              each={categoriesList()}
              fallback={<NoData />}
            >
              {(item: string) => (
                <option
                  value={item}
                  selected={item === props.defaultCategory ? true : undefined}
                >
                  {item}
                </option>
              )}
            </For>
          </Select>
        </Match>
        <Match when={categoriesList.state === 'errored'}>
          <Error />
        </Match>
      </Switch>
      <TextArea
        placeholder='Описание блюда'
        name='dish_description'
        value={dishDescription()}
        oninput={(event) => setDishDescription(event.target.value)}
        redBorder={dishDescriptionForbiddenSymbols()}
      />
      <AttachFile
        accept='image/jpeg,image/png'
        id='attach_dish_photo'
        label='Выберите фотографию'
        oninput={(event) =>
          event.target.files &&
          fileToBase64(event.target.files[0]).then((photoBase64) =>
            setDishPhoto(photoBase64),
          )
        }
      />
      <DishPhoto src={dishPhoto()} />
      <SubmitButton name='add_dish_submit'>Добавить блюдо</SubmitButton>
    </Form>
  );
};

export default AddDishForm;
