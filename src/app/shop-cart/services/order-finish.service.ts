import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderFinishService {

  orderFinish$ = new BehaviorSubject<boolean>(false);

}
