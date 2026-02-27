import { Component, ViewContainerRef,
  TemplateRef,
  ViewChild} from '@angular/core';
import type { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { DxButtonTypes } from 'devextreme-angular/ui/button';
import { DxTreeViewComponent } from 'devextreme-angular/';
import { DxDropDownBoxTypes } from 'devextreme-angular/ui/drop-down-box';
import { DxTreeListTypes } from 'devextreme-angular/ui/tree-list';
import { DxCheckBoxTypes } from 'devextreme-angular/ui/check-box';
import { Customer, Category, DataService } from './services/data.service';
import { one } from "devextreme/events";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild("treeViewComponent", { static: false }) treeViewComponent!: DxTreeViewComponent;

  @ViewChild("customFilterRowEditor", { static: true }) filterRowEditorRef!: TemplateRef<{ options: DxDataGridTypes.EditorPreparingEvent }>;

  dataGridArgs: DxDataGridTypes.EditorPreparingEvent | null = null;

  dropDownBoxValue: number | null = null;

  isDropDownBoxOpened: boolean = false;

  treeListSelectedRowKeys: [number] | [] = [];

  customers!: Customer[];
  
  categories!: Category[];

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

  constructor(private viewContainerRef: ViewContainerRef, private dataService: DataService) {
    this.customers = this.dataService.getCustomers();
    this.categories = this.dataService.getCategories();
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
        onValueChanged: (args: DxCheckBoxTypes.ValueChangedEvent) => {
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

      childView.rootNodes.forEach((element: HTMLElement) => {
        e.editorElement.appendChild(element);
      });

      one(e.editorElement, "dxremove", () => {
        childView.destroy();
      });
    }
  }

  gridOptionChanged(e: DxDataGridTypes.OptionChangedEvent): void {
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

  calculateDisplayValue = (row: Customer): string => {
    return this.categories.find((c) => c.id === row.CategoryId)?.name ?? '';
  }
}
