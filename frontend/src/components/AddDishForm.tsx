import {
  Switch,
  Match,
  For,
  JSX,
  createSignal,
  createResource,
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
import { allSymbolsRegExpStr, allSymbolsRegExp } from '../utils/regExps';
import BackButton from './BackButton/BackButton';
import FormTitle from '../ui/FormTitle/FormTitle';

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
    setData({
      DishCategory: dishCategory(),
      DishName: dishName(),
      DishDescription: dishDescription(),
      DishPhoto: dishPhoto(),
    });
    addDish(data() as Dish);
  };

  return (
    <Form onsubmit={handleSubmit}>
      <BackButton />
      <FormTitle>Добавление блюда</FormTitle>
      <Input
        placeholder='Название блюда*'
        name='dish_name'
        value={dishName()}
        oninput={(event) => setDishName(event.target.value)}
        required
        pattern={allSymbolsRegExpStr}
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
            required
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
        oninput={(event) => {
          setDishDescription(event.target.value);
          if (
            dishDescription() != '' &&
            !allSymbolsRegExp.test(dishDescription())
          ) {
            event.target.setCustomValidity(
              'Введите данные в указанном формате.',
            );
          } else {
            event.target.setCustomValidity('');
          }
        }}
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
