import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

type InputTypes = 'text' | 'password' | 'email';

@Component({
  selector: 'app-primary-input',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimaryInputComponent),
      multi: true
    }
  ],
  templateUrl: './primary-input.component.html',
  styleUrl: './primary-input.component.scss'
})
export class PrimaryInputComponent implements ControlValueAccessor{
  @Input() type: InputTypes = "text";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Output('blur') onBlur = new EventEmitter();

  value: string = "";
  onChange: any = () => {};
  onTouch: any = () => {};


  onBlurEvent(event: Event){
    this.onBlur.emit(event);
  }


  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }
}

