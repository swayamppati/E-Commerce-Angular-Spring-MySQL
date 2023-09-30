import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  public totalQty: number = 0;
  public totalPrice: number = 0;

  isChecked = false;
  
  yearList: number[] = [];
  monthList: number[] = [];

  countryList: Country[] = [];
  shippingStateList: State[] = [];
  billingStateList: State[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private formService: FormService,
    private placeService: PlaceService
  ) { }

  ngOnInit(): void {
    this.defineForm();
    this.getTotals();
    this.getExpiryYear();
    this.getCountries();
  }

  defineForm(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customerGroup: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddrGroup: this.formBuilder.group({
        country: ['Select Country'],
        state: ['Select State'],
        city: [''],
        street: [''],
        pin: [''],
      }),
      billingAddrGroup: this.formBuilder.group({
        country: ['Select Country'],
        state: ['Select State'],
        city: [''],
        street: [''],
        pin: [''],
      }),
      creditCardGroup: this.formBuilder.group({
        cardType: ['Select Card Type'],
        nameOnCard: [''],
        cardNumber: [''],
        cvc: [''],
        expMonth: ['Month'],
        expYear: ['Year'],
      })
    });
  }

  getTotals(): void {
    this.cartService.totalQty.subscribe(data => { this.totalQty = data; });
    this.cartService.totalPrice.subscribe(data => { this.totalPrice = data; });

    //This component has subscribed lately, so triggered the Obervable Again.
    this.cartService.computeTotals();
  }

  copyShippingToBilling() {
    if(this.isChecked) {
      this.checkoutFormGroup.controls['billingAddrGroup'].setValue(
        this.checkoutFormGroup.controls['shippingAddrGroup'].value
      );
      this.billingStateList = this.shippingStateList;
    }
    else{
      console.log("Unchecked");
      this.checkoutFormGroup.controls['billingAddrGroup'].reset();
      this.billingStateList = [];
    }
  }

  getCountries(): void {
    this.placeService.getCountries().subscribe(
      data => {
        this.countryList = data;
        console.log(this.countryList);
      }
    )
  }

  getStates(formGroupName: string): void {
    let countryCode = this.checkoutFormGroup.get(formGroupName)?.value.country.code;
    console.log(countryCode);

    this.placeService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName == 'shippingAddrGroup')
          this.shippingStateList = data;
        else
          this.billingStateList = data;
        console.log(data);
      }
    )
  }

  getExpiryYear(): void {
    this.formService.generateYears().subscribe(
      data => {
        this.yearList=data;
      }
    );
  }

  getExpiryMonth(): void {
    let date: Date = new Date();
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth()+1; //Goes 0 to 11

    let selectedYear = +this.checkoutFormGroup.get('creditCardGroup')?.value.expYear;
    let startMonth = selectedYear==currentYear ? currentMonth : 1;

    this.formService.generateMonths(startMonth).subscribe(
      data => {
        this.monthList=data;
      }
    );

    console.log(currentYear);
    console.log(selectedYear);
    console.log(startMonth);
  }

  onSubmit(): void {
    console.log("Form Submitted");
    console.log(this.checkoutFormGroup.get('customerGroup')?.value);
    console.log(this.checkoutFormGroup.get('shippingAddrGroup')?.value);
    console.log(this.checkoutFormGroup.get('billingAddrGroup')?.value);
    console.log(this.checkoutFormGroup.get('creditCardGroup')?.value);
  }

}
