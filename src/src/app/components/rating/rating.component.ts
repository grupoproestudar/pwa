import { Component, Output, forwardRef, EventEmitter } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "rating",
  template: `
    <ion-buttons>
      <ion-button  fill="clear" *ngFor="let current of [1, 2, 3]; let i = index"
        (click)="onClick(i + 1)" (mouseover)="hoverRate = i + 1" (mouseleave)="hoverRate = 0">
        <ion-icon slot="icon-only" name="star" [class.filled]="(i + 1 <= hoverRate || (!hoverRate && i + 1 <= rate))"></ion-icon>
      </ion-button>
    </ion-buttons>
  `,
  styles: [
    `
      ion-buttons {
        display: flex;
        justify-content: center;
      }
      [ion-button][disabled] {
        opacity: 1;
      }
      ion-icon {
        color: gray;
      }
      ion-icon.filled {
        color: #0f063f;
      }
    `
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    }
  ]
})
export class RatingComponent implements ControlValueAccessor {

  @Output() rateChange: EventEmitter<number> = new EventEmitter();

  rate:number = 1;
  hoverRate: number;
  _onChange: Function;

  onClick(value: number) {
    this.rate = value;
    this.rateChange.emit(this.rate);
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.rate = value;
    }
  }

  registerOnChange(fn: (_: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {}

}
