import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';
import { PlaceService } from 'src/app/services/place.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

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
        firstName: new FormControl('', [Validators.required, Validators.minLength(2),
                                        CustomValidators.notOnlyWhitespace]),
                                        
        lastName: new FormControl('', [Validators.required, Validators.minLength(2),
                                      CustomValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, 
                                    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9._%+-]+\\.[a-z]{2,4}$')])
      }),

      shippingAddrGroup: this.formBuilder.group({
        country: new FormControl('',Validators.required),
        state: new FormControl('',Validators.required),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
                                  CustomValidators.notOnlyWhitespace]),
        street: new FormControl('', [Validators.required, Validators.minLength(2),
                                    CustomValidators.notOnlyWhitespace]),
        pin: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      }),

      billingAddrGroup: this.formBuilder.group({
        country: new FormControl('',Validators.required),
        state: new FormControl('',Validators.required),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
                                  CustomValidators.notOnlyWhitespace]),
        street: new FormControl('', [Validators.required, Validators.minLength(2),
                                    CustomValidators.notOnlyWhitespace]),
        pin: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
      }),

      creditCardGroup: this.formBuilder.group({
        cardType: new FormControl('',Validators.required),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2),
                                        CustomValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{16}$')]),
        cvc: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{3}$')]),
        expMonth: new FormControl('',Validators.required),
        expYear: new FormControl('',Validators.required),
      })
    });
  }

  getTotals(): void {
    this.cartService.totalQty.subscribe(data => { this.totalQty = data; });
    this.cartService.totalPrice.subscribe(data => { this.totalPrice = data; });

    //Not needed anymore due to BehaviourSubject
    // //This component has subscribed lately, so triggered the Obervable Again.
    // this.cartService.computeTotals();
  }

  copyShippingToBilling() {
    if(this.isChecked) {
      this.checkoutFormGroup.controls['billingAddrGroup'].setValue(
        this.checkoutFormGroup.get('shippingAddrGroup')?.value
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

  //Getters for formControls
  get firstName() { return this.checkoutFormGroup.get('customerGroup.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customerGroup.lastName'); }
  get email() { return this.checkoutFormGroup.get('customerGroup.email'); }


  get shippingAddrCountry() { return this.checkoutFormGroup.get('shippingAddrGroup.country'); }
  get shippingAddrState() { return this.checkoutFormGroup.get('shippingAddrGroup.state'); }
  get shippingAddrCity() { return this.checkoutFormGroup.get('shippingAddrGroup.city'); }
  get shippingAddrStreet() { return this.checkoutFormGroup.get('shippingAddrGroup.street'); }
  get shippingAddrPin() { return this.checkoutFormGroup.get('shippingAddrGroup.pin'); }

  get billingAddrCountry() { return this.checkoutFormGroup.get('billingAddrGroup.country'); }
  get billingAddrState() { return this.checkoutFormGroup.get('billingAddrGroup.state'); }
  get billingAddrCity() { return this.checkoutFormGroup.get('billingAddrGroup.city'); }
  get billingAddrStreet() { return this.checkoutFormGroup.get('billingAddrGroup.street'); }
  get billingAddrPin() { return this.checkoutFormGroup.get('billingAddrGroup.pin'); }

  get cardType() { return this.checkoutFormGroup.get('creditCardGroup.cardType'); }
  get nameOnCard() { return this.checkoutFormGroup.get('creditCardGroup.nameOnCard'); }
  get cardNumber() { return this.checkoutFormGroup.get('creditCardGroup.cardNumber'); }
  get cvc() { return this.checkoutFormGroup.get('creditCardGroup.cvc'); }
  get expMonth() { return this.checkoutFormGroup.get('creditCardGroup.expMonth'); }
  get expYear() { return this.checkoutFormGroup.get('creditCardGroup.expYear'); }

  
  onSubmit(): void {
    console.log("Form Submitted");
    console.log(this.checkoutFormGroup.get('customerGroup')?.value);
    // console.log(this.checkoutFormGroup.get('shippingAddrGroup')?.value);
    // console.log(this.checkoutFormGroup.get('billingAddrGroup')?.value);
    // console.log(this.checkoutFormGroup.get('creditCardGroup')?.value);

    //Not required for all fields, but mostly user will click submit when he is on last field he is filling
    if(this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log("CheckoutFormFroup is valid: " + this.checkoutFormGroup.valid);
  }

}
