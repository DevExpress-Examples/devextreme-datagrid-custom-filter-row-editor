import { Component, ViewContainerRef,
  TemplateRef,
  ViewChild} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import type { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { customers, categories, Customer, Category } from './data';
import { one } from "devextreme/events";
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxTreeViewComponent } from 'devextreme-angular/ui/tree-view';
import { DxDropDownBoxTypes } from 'devextreme-angular/ui/drop-down-box';
import { DxTreeListTypes } from 'devextreme-angular/ui/tree-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  @ViewChild("treeViewComponent", { static: false }) treeViewComponent!: DxTreeViewComponent;

  @ViewChild("customFilterRowEditor", { static: true })
  filterRowEditorRef!: TemplateRef<any>;

  dropDownBoxValue: number | null = null;

  treeListSelectedRowKeys: [number] | [] = [];

  isDropDownBoxOpened: boolean = false;

  customers!: Customer[];
  
  categories!: Category[];

  dataGridArgs: DxDataGridTypes.EditorPreparingEvent | null = null;

  dropDownBoxButtonOptions: DxButtonTypes.Properties = {
    icon: 'remove',
    stylingMode: 'text',
    onClick: (): void => {
      if (this.dataGridArgs) {
        this.dataGridArgs.setValue(null);
      }
      this.clearDropDownSelection();
    },
  }

  constructor(private viewContainerRef: ViewContainerRef) {
    this.customers = customers;
    this.categories = categories;
  }

  clearDropDownSelection(): void {
    this.dropDownBoxValue = null;
    this.treeListSelectedRowKeys = [];
    this.isDropDownBoxOpened = false;
  }
  
  gridEditorPreparing(e: DxDataGridTypes.EditorPreparingEvent): void {
    // Customize boolean filter editor via e.editorName
    if (e.parentType === 'filterRow' && e.dataField === 'IsActive') {
      e.editorName = 'dxCheckBox';
      e.editorOptions = {
        value: e.value,
        enableThreeStateBehavior: true,
        onValueChanged: (args: any) => {
          e.setValue(args.value ?? null);
        },
      };
    }

    // Customize category filter editor via appendChild
    if (e.parentType === 'filterRow' && e.dataField === 'CategoryId') {
      e.cancel = true;
      const childView = this.viewContainerRef.createEmbeddedView(
        this.filterRowEditorRef,
        { options: e }
      );

      childView.rootNodes.forEach((element) => {
        e.editorElement.appendChild(element);
      });

      one(e.editorElement, "dxremove", () => {
        childView.destroy();
      });
    }
  }

    gridOptionChanged(e: any): void {
    if (e.fullName === 'columns[3].filterValue' && e.value === null) {
      this.clearDropDownSelection();
    }
  }

  dropDownBoxInitialized(e: DxDropDownBoxTypes.InitializedEvent, dataGridArgs: DxDataGridTypes.EditorPreparingEvent): void{
    this.dropDownBoxValue = dataGridArgs.value;
    this.dataGridArgs = dataGridArgs;
  }

  treeListSelectionChanged(e: DxTreeListTypes.SelectionChangedEvent, dataGridArgs: DxDataGridTypes.EditorPreparingEvent): void {
    const selectedId = e.currentSelectedRowKeys[0];
    if (!selectedId) return;
    this.dropDownBoxValue = selectedId;
    this.treeListSelectedRowKeys = selectedId != null ? [selectedId] : [];
    dataGridArgs.setValue(selectedId);
    this.isDropDownBoxOpened = false; 
  }

  calculateDisplayValue(row: Customer): string {
    return categories.find((c) => c.id === row.CategoryId)?.name ?? '';
  }
}
