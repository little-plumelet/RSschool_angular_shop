import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CITIES, CONTACTS } from 'src/app/shared/constants/constants';
import { IContacts } from 'src/app/shared/models/contacts';

@Component({
  selector: 'app-information-block',
  templateUrl: './information-block.component.html',
  styleUrls: ['./information-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationBlockComponent {

  placeName = 'Москва';

  contacts: IContacts = CONTACTS;

  cities = CITIES;

  selectedCity = this.cities[0];

  changePlaceName(placeName: string){
    this.placeName = placeName;
    console.log(this.placeName);
  }
}
