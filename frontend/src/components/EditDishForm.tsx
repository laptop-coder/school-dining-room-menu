import {
  Switch,
  Match,
  For,
  JSX,
  createSignal,
  createResource,
  createEffect,
} from 'solid-js';
import DishPhoto from '../ui/DishPhoto/DishPhoto';
import Input from '../ui/Input/Input';
import TextArea from '../ui/TextArea/TextArea';
import AttachFile from '../ui/AttachFile/AttachFile';
import Select from '../ui/Select/Select';
import SubmitButton from '../ui/SubmitButton/SubmitButton';
import Form from '../ui/Form/Form';
import fetchDishData from '../utils/fetchDishData';
import type Dish from '../types/dish';
import fetchCategoriesList from '../utils/fetchCategoriesList';
import Loading from '../ui/Loading/Loading';
import Error from '../ui/Error/Error';
import NoData from '../ui/NoData/NoData';
import type { ResourceReturn } from 'solid-js';
import fileToBase64 from '../utils/fileToBase64';
import { allSymbolsRegExpStr, allSymbolsRegExp } from '../utils/regExps';
import editDish from '../utils/editDish';
import checkPhotoAvailability from '../utils/checkPhotoAvailability';
import { STORAGE_ROUTE } from '../utils/consts';

const EditDishForm = (props: { dishId: string }): JSX.Element => {
  const [dishPhotoIsAvailable, setDishPhotoIsAvailable] = createSignal(false);
  const pathToPhoto = `${STORAGE_ROUTE}/${props.dishId}.jpeg`;
  checkPhotoAvailability({
    pathToPhoto: pathToPhoto,
    success: () => setDishPhotoIsAvailable(true),
  });
  const [categoriesList]: ResourceReturn<string[]> =
    createResource(fetchCategoriesList);
  const [oldDishData]: ResourceReturn<Dish> = createResource(
    { dishId: props.dishId },
    fetchDishData,
  );

  const [dishName, setDishName] = createSignal('');
  const [dishCategory, setDishCategory] = createSignal('');
  const [dishDescription, setDishDescription] = createSignal('');
  const [dishPhoto, setDishPhoto] = createSignal('');
  const [newData, setNewData] = createSignal();

  let effectFirstRun = true;
  createEffect(() => {
    if (effectFirstRun && oldDishData.state === 'ready') {
      setDishName(oldDishData().DishName);
      setDishCategory(oldDishData().DishCategory);
      setDishDescription(oldDishData().DishDescription);
      effectFirstRun = false;
    }
  });

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setNewData({
      DishId: props.dishId,
      DishName: dishName(),
      DishCategory: dishCategory(),
      DishDescription: dishDescription(),
      DishPhoto: dishPhoto(),
    });
    editDish(newData() as Dish);
  };

  return (
    /*TODO: is it normal to use Loading in the fallback here?*/
    <Switch fallback={<Loading />}>
      <Match
        when={
          oldDishData.state === 'unresolved' || oldDishData.state === 'pending'
        }
      >
        <Loading />
      </Match>
      <Match
        when={
          oldDishData.state === 'ready' || oldDishData.state === 'refreshing'
        }
      >
        <Form onsubmit={handleSubmit}>
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
                      selected={item === dishCategory() ? true : undefined}
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
          {dishPhoto() ? (
            <DishPhoto src={dishPhoto()} />
          ) : (
            dishPhotoIsAvailable() && (
              <DishPhoto
                src={pathToPhoto}
                title={`${dishName()} (изображение)`}
              />
            )
          )}
          <SubmitButton name='edit_dish_submit'>
            Сохранить изменения
          </SubmitButton>
        </Form>
      </Match>
      <Match when={oldDishData.state === 'errored'}>
        <Error />
      </Match>
    </Switch>
  );
};

export default EditDishForm;
