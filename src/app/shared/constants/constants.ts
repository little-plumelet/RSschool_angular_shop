import { AppState } from 'src/app/redux/app-state.model';
import { IContacts } from '../models/contacts';

export const CONTACTS: IContacts = {
  mainPhoneNumber: '+7(495)888-88-88',
  secondPhoneNumber: '+7(495)888-99-99',
};

export const CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Ростов-на-Дону',
  'Волгоград',
  'Сочи',
  'Минск',
  'Витебск',
  'Гомель',
];

export const sortingOrder = {
  asc: 'ascending',
  dsc: 'discending',
  unsorted: 'unsorted',
};

export const BASE_URL = 'http://localhost:3004';

export const DEBOUNCE_TIME = 1000;

export const INPUT_VALUE_MIN_LENGTH = 2;

export const INITIAL_STATE: AppState = {
  categoriesState: {
    categories: [],
    chosenCategoryName: '',
    subcategoriesOfChosenCategory: [],
    inCatalog: false,
    loading: false,
    loaded: false,
    error: null,
  },
};

export const HOME_PAGE_GOODS = [
  {
    categoryId: 'appliances',
    subcategoryId: 'refrigerators',
  },
  {
    categoryId: 'appliances',
    subcategoryId: 'washing-machines',
  },
  {
    categoryId: 'electronics',
    subcategoryId: 'mobile',
  },
  {
    categoryId: 'electronics',
    subcategoryId: 'ebooks',
  },
  {
    categoryId: 'electronics',
    subcategoryId: 'tvs',
  },
  {
    categoryId: 'computers-peripherals',
    subcategoryId: 'laptops',
  },
  {
    categoryId: 'computers-peripherals',
    subcategoryId: 'consoles',
  },
  {
    categoryId: 'hobbies',
    subcategoryId: 'music-instruments',
  },
  {
    categoryId: 'hobbies',
    subcategoryId: 'fun-and-rest',
  },
];

export const ICONS_OF_CATEGORIES = [
  {
    appliances: 'local_laundry_service',
    icon:  'local_laundry_service',
  },
  {
    electronics: 'phone_iphone',
    icon: 'phone_iphone',
  },
  {
    'computers-peripherals': 'desktop_windows',
    icon: 'desktop_windows',
  },
  {
    furniture: 'weekend',
    icon: 'weekend',
  },
  {
    hobbies: 'palette',
    icon: 'palette',

  },
];
