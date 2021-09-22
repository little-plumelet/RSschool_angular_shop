import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CONTACTS } from '../../constants/constants';
import { IContacts } from '../../models/contacts';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  contacts: IContacts = CONTACTS;
}
