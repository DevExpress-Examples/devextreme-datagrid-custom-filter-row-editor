import { Component, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { customers, categories, Customer } from './data';
import { CustomEditorComponent } from './custom-editor.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;

  customers = customers;

  categories = categories;

  customEditorInstance: CustomEditorComponent | null = null;

  onEditorPreparing(e: any): void {
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

    // Customize category filter editor via component
    // The custom editor is handled via editCellTemplate in the HTML
  }

  onOptionChanged(e: any): void {
    if (e.fullName === 'columns[3].filterValue' && e.value === null) {
      if (this.customEditorInstance) {
        this.customEditorInstance.clearSelection();
      }
    }
  }

  calculateDisplayValue(row: Customer): string {
    return categories.find((c) => c.id === row.CategoryId)?.name ?? '';
  }
}
