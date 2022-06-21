import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-abstract-modal',
  templateUrl: './abstract-modal.component.html',
  styleUrls: ['./abstract-modal.component.css'],
})
export class AbstractModalComponent implements OnInit {
  @Output() confirm = new EventEmitter<void>(); // method to execute when confirm is clicked
  @Output() cancel = new EventEmitter<void>(); // method to execute when cancel is clicked

  id2: string;

  constructor(protected modalService: ModalService) {}

  ngOnInit(): void {}

  setId(id: string) {
    console.log('setting id on abstract to ' + id);
    this.id2 = id;
    console.log(this.getId());
  }

  getId() {
    return this.id2;
  }

  cancelClicked() {
    console.log('my id: ' + this.id2);
    this.modalService.cancelModal(this.id2);
    //this.cancel.emit();
  }

  confirmClicked() {
    this.confirm.emit();
  }

  showMethod() {
    console.log('Abstract show called from service');
  }

  cancelMethod() {
    console.log('Abstract cancel called from service');
  }

  confirmMethod() {
    console.log('Abstract confirm called from service');
  }
}
