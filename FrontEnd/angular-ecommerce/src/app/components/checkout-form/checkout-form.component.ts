import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { FormService } from 'src/app/services/form.service';

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

  monthList: number[] = [];
  yearList: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private formService: FormService
  ) { }

  ngOnInit(): void {
    this.defineForm();
    this.getTotals();
    this.getExpiryYear();
  }

  defineForm(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customerGroup: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shipAddrGroup: this.formBuilder.group({
        country: ['Select Country'],
        state: [''],
        city: [''],
        street: [''],
        pin: [''],
      }),
      billingAddrGroup: this.formBuilder.group({
        country: ['Select Country'],
        state: [''],
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
      console.log("Checked");
      this.checkoutFormGroup.controls['billingAddrGroup'].setValue(
        this.checkoutFormGroup.controls['shipAddrGroup'].value
      );
    }
    else{
      console.log("Unchecked");
      this.checkoutFormGroup.controls['billingAddrGroup'].reset();
    }
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
    console.log(this.checkoutFormGroup.get('shipAddrGroup')?.value);
    console.log(this.checkoutFormGroup.get('billingAddrGroup')?.value);
    console.log(this.checkoutFormGroup.get('creditCardGroup')?.value);
  }

}
