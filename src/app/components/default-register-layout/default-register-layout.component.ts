import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-default-register-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-register-layout.component.html',
  styleUrl: './default-register-layout.component.scss'
})
export class DefaultRegisterLayoutComponent {
  @Input() userName: string = '';
  @Input() descricao: string = '';
  @Input() primaryButtonText = '';
  @Input() secondaryButtonText = '';
  @Input() disablePrimaryButton : boolean = true;
  @Output('submit') onSubmit = new EventEmitter();
  @Output('navigate') onNavigate = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }

}
