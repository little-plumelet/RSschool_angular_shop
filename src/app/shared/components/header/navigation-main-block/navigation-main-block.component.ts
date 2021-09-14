import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthentificationService } from 'src/app/auth/services/authentification.service';
import { changeInCatalog } from 'src/app/redux/actions/categories-actions';
import { AppState } from 'src/app/redux/app-state.model';
import { UserAuthToggleService } from 'src/app/shared/services/user-auth-toggle.service';

@Component({
  selector: 'app-navigation-main-block',
  templateUrl: './navigation-main-block.component.html',
  styleUrls: ['./navigation-main-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationMainBlockComponent implements OnInit, OnDestroy {
  token$ = new Observable();

  inCatalog$: Observable<boolean> = new Observable();

  subscription: Subscription[] = [];

  inCatalog = false;

  constructor(
    private userAuthToggleService: UserAuthToggleService,
    private authentificationService: AuthentificationService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {}

  ngOnInit() {
    this.token$ = this.authentificationService.token$;
    this.inCatalog$ = this.store.select((state) => state.categoriesState.inCatalog);
    this.subscription.push(this.inCatalog$.subscribe((inCatalog) => this.inCatalog = inCatalog));
  }

  userProfileBlockToggle() {
    this.userAuthToggleService.userProfileBlockToggle();
    this.store.dispatch(changeInCatalog({ inCatalog: false }));
  }

  goToHome() {
    this.router.navigate(['/']);
    this.store.dispatch(changeInCatalog({ inCatalog: false }));
  }

  goToCatalog() {
    if (!this.inCatalog) {
      this.router.navigate(['/catalog']);
      this.store.dispatch(changeInCatalog({ inCatalog: true }));
    } else {
      this.router.navigate(['/']);
      this.store.dispatch(changeInCatalog({ inCatalog: false }));
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((element) => element.unsubscribe());
  }

}
