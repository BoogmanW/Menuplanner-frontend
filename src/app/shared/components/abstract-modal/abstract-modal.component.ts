import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abstract-modal',
  templateUrl: './abstract-modal.component.html',
  styleUrls: ['./abstract-modal.component.css'],
})
export class AbstractModalComponent implements OnInit {
  @Output() confirm = new EventEmitter<void>(); // method to execute when confirm is clicked
  @Output() cancel = new EventEmitter<void>(); // method to execute when cancel is clicked

  @Input() id: string;
  id2: string;

  constructor() {}

  ngOnInit(): void {}

  cancelClicked() {
    this.cancel.emit();
  }

  confirmClicked() {
    this.confirm.emit();
  }
}
