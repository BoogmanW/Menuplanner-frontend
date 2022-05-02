import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-abstract-modal',
  templateUrl: './abstract-modal.component.html',
  styleUrls: ['./abstract-modal.component.css']
})
export class AbstractModalComponent implements OnInit {

  @Output() onConfirm = new EventEmitter<void>()  // method to execute when confirm is clicked
  @Output() onCancel = new EventEmitter<void>()   // method to execute when cancel is clicked
  constructor() { }

  ngOnInit(): void { }

  cancel()
  {
    console.log("cancel abstractmodal")
    console.log(this.onCancel) 
    this.onCancel.emit();
  }

  confirm()
  {
    console.log("confirm abstractmodal")
    console.log(this.onConfirm) 
    this.onConfirm.emit();
  }

}
