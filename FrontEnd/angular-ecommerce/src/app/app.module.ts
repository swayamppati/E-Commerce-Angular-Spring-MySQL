/**
 * Components (Declarations)
 */
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { AddButtonsComponent } from './components/add-buttons/add-buttons.component';

/**
 * Node Modules
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Service Providers
 */
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { FormService } from './services/form.service';
import { PlaceService } from './services/place.service';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaAuthStateService, OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

import myAppConfig from './config/my-app-config';
import { LoginStatusService } from './services/login-status.service';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},

  {path: 'checkout', component: CheckoutFormComponent},
  {path: 'cart', component: CartComponent},

  {path: 'product/:id/:catId', component: ProductDetailsComponent},
  {path: 'products/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},

  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    SearchBarComponent,
    AddButtonsComponent,
    CartComponent,
    CheckoutFormComponent,
    LoginComponent,
    LoginStatusComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, CartService, FormService, LoginStatusService,
              PlaceService, { provide: OKTA_CONFIG, useValue: {oktaAuth}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
