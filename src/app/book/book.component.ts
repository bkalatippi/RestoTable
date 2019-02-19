import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Booking } from "../shared/booking";
import { BookingService } from "../services/booking.service";
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerModule, MatFormFieldModule } from '@angular/material';
import { flyInOut, expand } from "../animations/app.animation";
import { ActivatedRoute, Params } from '@angular/router';
import { GUESTCOUNTS } from "../shared/guestcounts";
import { TIMESLOTS } from "../shared/timeslots";
import { SearchService } from "../services/search.service";
import { switchMap } from "rxjs/operators";
import { Restaurant } from "../shared/restaurant";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  host: {
      '[@flyInOut]': 'true',
      'style': 'display: block;'
      },
  animations: [ flyInOut(), expand() ]
})
export class BookComponent implements OnInit {
    restaurant: Restaurant = new Restaurant();
    bookingForm: FormGroup;
    booking: Booking;
    @ViewChild('bform') bookingFormDirective;
    errMess: string;
    guestcounts: number[] = GUESTCOUNTS;
    timeslots: string[] = TIMESLOTS;
    @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;
    
    constructor(private fb: FormBuilder, 
            private bookingService: BookingService,
            private searchService: SearchService,
            private route: ActivatedRoute,
            @Inject('BaseURL') private BaseURL) {
      this.createForm();
    }

  ngOnInit() {
      this.route.params.pipe(switchMap((params: Params) => {return this.searchService.getRestaurant(+params['restId']); }))
          .subscribe(restaurant => {console.log(restaurant);this.restaurant = restaurant}, errmess => {this.errMess = <any>errmess;})
  }
  
  formErrors = {
          'date': '',
          'noofguests': 1,
          'time': '0800',
          'firstname': '',
          'lastname': '',
          'phone': '',
          'email': '',
        };
      
        validationMessages = { 
          'firstname': {
            'required':      'First Name is required.',
            'minlength':     'First Name must be at least 2 characters long.',
            'maxlength':     'FirstName cannot be more than 25 characters long.'
          },
          'lastname': {
            'required':      'Last Name is required.',
            'minlength':     'Last Name must be at least 2 characters long.',
            'maxlength':     'Last Name cannot be more than 25 characters long.'
          },
          'phone': {
            'required':      'Phone number is required.',
            'pattern':       'Phone number must contain only numbers.'
          },
          'email': {
            'required':      'Email is required.',
            'email':         'Email not in valid format.'
          }
        };
      
      createForm() : void{
          this.bookingForm = this.fb.group({
              date: ['', [Validators.required]],
              noofguests: 1,
              time: '0800',
              firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
              lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
              phone: ['', [Validators.required, Validators.pattern] ],
              email: ['', [Validators.required, Validators.email] ],
              costfor2: 0
             });
          this.booking = this.bookingForm.value;
          
          this.bookingForm.valueChanges.subscribe(data => this.onValueChanged(data));
          this.onValueChanged(); // (re)set validation messages now
        }
      
      onSubmit() {
          this.booking = this.bookingForm.value;
          this.booking.userId = 0;
          this.booking.paymentstatus = "PENDING";
          this.booking.totalamount = (this.booking.costfor2/2) * this.booking.noofguests;
          console.log(this.bookingForm.value);
          
          //submit feedback to server
          this.bookingService.submitBooking(this.booking)
              .subscribe(booking => {this.booking = booking;}, errmess => { this.booking = null; this.errMess = <any>errmess; });
          
          this.bookingForm.reset({
              date: '',
              noofguests: 1,
              time: '0800',
              firstname: '',
              lastname: '',
              phone: '',
              email: '',
              costfor2: 0
          });
          this.bookingFormDirective.resetForm();
       }
      
      onValueChanged(data?: any) {
          if (!this.bookingForm) { return; }
          const form = this.bookingForm;
          for (const field in this.formErrors) {
            if (this.formErrors.hasOwnProperty(field)) {
              // clear previous error message (if any)
              this.formErrors[field] = '';
              const control = form.get(field);
              if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                  if (control.errors.hasOwnProperty(key)) {
                    this.formErrors[field] += messages[key] + ' ';
                  }
                }
              }
            }
          }
        }
}
