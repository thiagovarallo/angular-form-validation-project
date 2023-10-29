import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { ConsultaCepService } from '../service/consulta-cep.service';

@Directive({
  selector: '[appValidandoCep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidandoCepDirective,
    multi: true
  }]
})
export class ValidandoCepDirective implements AsyncValidator {

  constructor(private consultaCep: ConsultaCepService) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.consultaCep.getConsultaCep(cep).pipe(
      map((resultado: any) => resultado.erro ? { 'validadorCep': true } : null)
    );
  }
}
