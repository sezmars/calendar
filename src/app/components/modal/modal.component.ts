import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {isUndefined} from 'util';
import * as get from 'lodash/get';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnChanges, AfterViewInit {
  @Input() public closeFromChange: boolean;
  @Input() public modalOrientation: boolean;
  @Input() public containerElement: ElementRef;
  @Output() public create = new EventEmitter<boolean>();
  @Output() public closeModal = new EventEmitter<boolean>();
  @ViewChild('containerModal') public containerModal: ElementRef;
  public visible = false;
  public classState: string;
  public isActiveModal = false;

  constructor(private zone: NgZone, private renderer: Renderer2) { }

  ngAfterViewInit() {
    if (this.containerElement) {
      this.renderer.listen(this.containerElement, 'click', this.toggle.bind(this));
    }
  }

  public ngOnChanges() {
    if (this.closeFromChange) {
      this.isActiveModal = false;
      this.closeModal.emit(true);
    }
  }

  public onHandleOutsideClick = (event: MouseEvent) => {
    this.zone.run(() => {
      this.checkStateModal(event);
      if (
        (this.containerElement as any) !== event.target &&
        !(this.containerElement as any).contains(event.target as any)
      ) {
        this.isActiveModal = false;
        this.addOrRemoveListener(event);
      }
    });
  }

  public checkStateModal(event) {
    switch (event.type) {
      case 'click' && this.isActiveModal:
        this.isActiveModal = false;
        break;
      case 'click' && !this.isActiveModal:
        this.isActiveModal = true;
        break;
    }
    event.stopPropagation();
  }

  public close(event) {
    event.stopPropagation();
    this.isActiveModal = !this.isActiveModal;
    this.closeModal.emit(true);
  }

  private addOrRemoveListener(event?) {
    if (!isUndefined(event)) {
      switch (event.type) {
        case 'click' && this.isActiveModal:
          document.removeEventListener('click', this.onHandleOutsideClick);
          break;
        case 'click':
          document.removeEventListener('click', this.onHandleOutsideClick);
          break;
      }
    } else {
      document.addEventListener('click', this.onHandleOutsideClick);
    }
  }

  private toggle() {
    this.addOrRemoveListener();
    this.isActiveModal = true;
    if (this.isActiveModal) {
      setTimeout(() => {
        const rect = (this.containerElement as any).getClientRects()[0];
        if (Boolean(this.containerModal) && rect) {
          this.visible = true;
          const baseClientHeight = get(this.containerElement, 'clientHeight', 0);
          const containerHeight = this.containerModal.nativeElement.offsetHeight;
          const screenHeight = window.innerHeight - containerHeight;
          const bottom = rect.bottom - 30 + baseClientHeight;
          if (bottom > screenHeight) {
            this.modalOrientation ? this.classState = 'create' : this.classState = 'change';
          }
        }
      }, 0);
    }
  }
}
