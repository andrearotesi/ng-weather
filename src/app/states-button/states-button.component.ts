import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-states-button',
  templateUrl: './states-button.component.html'
})
export class StatesButtonComponent implements OnInit {

  @Input()
  initialTemplate: TemplateRef<any>;

  @Input()
  workingTemplate: TemplateRef<any>;

  @Input()
  doneTemplate: TemplateRef<any>;

  @Input()
  errorTemplate: TemplateRef<any>;

  currentTemplate: TemplateRef<any>;

  @Input()
  set observable(obs: Observable<any>) {
    if (obs) {
      this.currentTemplate = this.workingTemplate;
      obs.subscribe({
        next: () => this.currentTemplate = this.workingTemplate,
        complete: () => {
          this.currentTemplate = this.doneTemplate;
          this.resetTemplate();
        },
        error: () => {
          this.currentTemplate = this.errorTemplate;
          this.resetTemplate();
        }
      });
    }
  }

  ngOnInit() {
    this.currentTemplate = this.initialTemplate;
  }

  resetTemplate() {
    setTimeout(() => {
      this.currentTemplate = this.initialTemplate;
    }, 500);
  }

}
