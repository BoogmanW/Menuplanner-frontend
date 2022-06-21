import { Component, Injectable } from '@angular/core';
import { Stringifier } from 'postcss';
import { AbstractModalComponent } from '../shared/components/abstract-modal/abstract-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: AbstractModalComponent[] = [];

  addModal(modal: AbstractModalComponent) {
    console.log('modalService : addModal : ' + modal.id2);
    this.modals.push(modal);
    console.log(this.modals);
  }

  removeModal(id: string) {
    console.log('modalService : removeModal : ' + id);
    this.modals = this.modals.filter((x) => x.id2 !== id);
    console.log(this.modals);
  }

  confirmModal(id: string) {
    console.log('modalService : showModal : ' + id);
    const modal = this.modals.find((x) => x.id2 === id);
    modal?.confirmMethod();
  }

  cancelModal(id: string) {
    console.log('modalService : showModal : ' + id);
    const modal = this.modals.find((x) => x.id2 === id);
    modal?.cancelMethod();
  }

  showModal(id: string) {
    console.log('modalService : showModal : ' + id);
    const modal = this.modals.find((x) => x.id2 === id);
    modal?.showMethod();
    console.log(this.modals);
  }

  // hideModal(id: string) {
  //   // todo probably not needed anymore
  //   console.log('modalService : hideModal : ' + id);
  //   const modal = this.modals.find((x) => x.id === id);
  //   modal?.confirmClicked();
  //   console.log(this.modals);
  // }
}
