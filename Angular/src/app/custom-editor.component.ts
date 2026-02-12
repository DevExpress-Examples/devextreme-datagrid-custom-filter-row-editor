import {
  Component, ViewChild, Input, Output, EventEmitter,
} from '@angular/core';
import { DxDropDownBoxComponent } from 'devextreme-angular/ui/drop-down-box';
import { DxTreeListComponent } from 'devextreme-angular/ui/tree-list';
import { categories } from './data';

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.scss'],
})
export class CustomEditorComponent {
  @ViewChild('dropDownBox', { static: false }) dropDownBox!: DxDropDownBoxComponent;

  @ViewChild('treeList', { static: false }) treeList!: DxTreeListComponent;

  @Input() value: number | null = null;

  @Output() valueChange = new EventEmitter<number | null>();

  categories = categories;

  selectedRowKeys: number[] = [];

  ngOnInit(): void {
    if (this.value != null) {
      this.selectedRowKeys = [this.value];
    }
  }

  ngOnChanges(): void {
    if (this.value != null) {
      this.selectedRowKeys = [this.value];
    } else {
      this.selectedRowKeys = [];
    }
  }

  onSelectionChanged(e: any): void {
    const selectedId = e.selectedRowKeys[0];
    if (!selectedId) return;
    this.dropDownBox.instance.close();
    this.valueChange.emit(selectedId);
    this.selectedRowKeys = [selectedId];
  }

  clearSelection(): void {
    this.value = null;
    this.selectedRowKeys = [];
    this.valueChange.emit(null);
    this.dropDownBox.instance.close();
  }

  onDropDownValueChanged(e: any): void {
    this.value = e.value;
  }
}
