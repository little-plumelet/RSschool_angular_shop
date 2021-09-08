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
];

export const BASE_URL = 'http://localhost:3004';

export const DEBOUNCE_TIME = 1000;

export const INPUT_VALUE_MIN_LENGTH = 2;

export const INITIAL_STATE: AppState = {
  categoriesState: {
    categories: [],
    chosenCategoryName: '',
    chosenSubcategory: [],
    loading: false,
    loaded: false,
    error: null,
  },
};
