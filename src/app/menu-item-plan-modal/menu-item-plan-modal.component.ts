import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MenuItemService } from '../services/menu-item.service';
import { ModalService } from '../services/modal.service';
import { AbstractModalComponent } from '../shared/components/abstract-modal/abstract-modal.component';
import { Day } from '../shared/models/day';
import { MenuItem } from '../shared/models/menu-item';
import { MenuItemFilterPipe } from '../shared/pipes/menu-item-filter.pipe';

@Component({
  selector: 'app-menu-item-plan-modal',
  templateUrl: './menu-item-plan-modal.component.html',
  styleUrls: ['./menu-item-plan-modal.component.css'],
  outputs: [],
})
export class MenuItemPlanModalComponent extends AbstractModalComponent implements OnInit, OnDestroy {
  @Input() day: Day;
  @Input() id: string;
  private element: any;
  @ViewChild('menuItemInput') menuItemInput: ElementRef;

  allMenuItems: MenuItem[];
  filteredMenuItems: MenuItem[];
  selectedMenuItem?: MenuItem;
  menuItemInputSubscription: Subscription;

  menuItemFilterString: string;
  showMenuItemPicker: boolean;

  selectedMenuItemIndex: number;

  planMenuItemForm = this.formBuilder.group({
    menuItem: ['', Validators.required],
    time: ['', Validators.required],
    comment: ['', Validators.required],
  });

  constructor(
    private menuItemService: MenuItemService,
    private formBuilder: FormBuilder,
    private menuItemFilterPipe: MenuItemFilterPipe,
    private el: ElementRef,
    modalService: ModalService
  ) {
    super(modalService);

    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an ID!');
      return;
    }
    console.log('setting super id to ' + this.id);
    super.setId(this.id);
    console.log('get on super:' + super.getId());
    console.log('direct access property on super:' + super.id2); // todo weirdly enough, when using getID everything works fine, but when directly accessing the property it doesn't work

    //add element to bottom of page
    document.body.appendChild(this.element);

    this.modalService.addModal(this);

    this.menuItemService.menuItemsChanged$.subscribe((menuItems) => {
      this.allMenuItems = menuItems;
    });
  }

  ngOnDestroy(): void {
    this.modalService.removeModal(this.id2);
    this.element.remove();
  }

  @HostListener('window:keydown.ArrowDown')
  handleKeyDown() {
    if (!this.showMenuItemPicker) return;
    if (this.selectedMenuItemIndex == this.filteredMenuItems.length - 1) return;
    this.selectedMenuItemIndex++;
  }

  @HostListener('window:keydown.ArrowUp')
  handleKeyUp() {
    if (!this.showMenuItemPicker) return;
    if (this.selectedMenuItemIndex == -1) return;
    this.selectedMenuItemIndex--;
  }

  @HostListener('window:keydown.Enter')
  handleKeyEnter() {
    if (!this.showMenuItemPicker) return;

    if (this.filteredMenuItems[this.selectedMenuItemIndex]) {
      this.selectMenuItem(this.filteredMenuItems[this.selectedMenuItemIndex]);
    }
  }

  @HostListener('window:keydown.Escape')
  handleKeyEscape() {
    this.menuItemInput.nativeElement.blur();
  }

  onMenuItemFocused($event: any) {
    this.menuItemInputSubscription = this.planMenuItemForm.controls['menuItem'].valueChanges.subscribe((value) => {
      this.filteredMenuItems = this.menuItemFilterPipe.transform(this.allMenuItems, value);
    });
    $event.target.select();

    this.showMenuItemPicker = true;
    this.selectedMenuItemIndex = -1;

    console.log($event.target);
  }

  onMenuItemBlurred() {
    this.planMenuItemForm.patchValue({ menuItem: this.selectedMenuItem?.title });
    this.showMenuItemPicker = false;
    this.menuItemInputSubscription.unsubscribe();
  }

  selectMenuItem(menuItem: MenuItem) {
    this.selectedMenuItem = menuItem;
    this.planMenuItemForm.patchValue({ menuItem: this.selectedMenuItem?.title });
    this.menuItemInput.nativeElement.blur();
  }

  onPlanMenuItemFormSubmit() {
    console.log(this.planMenuItemForm);
    // todo send post request
  }

  onCancel(): void {
    console.log('non-abstract cancel');
    // this.modalService.hideModal(this.id);
  }

  onConfirm(): void {
    // todo confirm logic
    // this.modalService.hideModal(this.id);
  }

  showMethod() {
    console.log('show called from service');
  }

  cancelMethod() {
    console.log('cancel called from service');
  }

  confirmMethod() {
    console.log('confirm called from service');
  }

  cancelClicked(): void {
    super.cancelClicked();
    console.log('concrete here');
  }
}
