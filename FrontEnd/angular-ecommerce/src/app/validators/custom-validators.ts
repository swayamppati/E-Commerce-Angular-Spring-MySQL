import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static notOnlyWhitespace(formControl: FormControl): ValidationErrors | null {
        
        if (formControl==null || formControl.value.trim().length === 0)
            return { 'notOnlyWhitespace': true }
        else
            return null;
    }
}
