<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/1123050391/25.2.2%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1317695)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
[![](https://img.shields.io/badge/💬_Leave_Feedback-feecdd?style=flat-square)](#does-this-example-address-your-development-requirementsobjectives)
<!-- default badges end -->
# DataGrid for DevExtreme - How to customize built-in Filter Row Editor

This example demonstrates how to customize the built-in Filter Row editor in the DataGrid. The example uses the [DataGrid.onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onEditorPreparing) event handler and shows two approaches: assigning the `e.editorName` property or rendering a custom component in the `e.editorElement`.

![DataGrid with Custom Filter Row Editor](./images/custom-filter-row-editor.gif)

## Implementation Details

### Modify `e.editorName` Approach
- Define the [DataGrid.onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onEditorPreparing) event handler and override the `e.editorName` value.

### Render Custom Editor Approach
- Define the [DataGrid.onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onEditorPreparing) event handler and set `e.cancel = true` to cancel the built-in editor rendering.
- For jQuery: append a custom component to `e.editorElement`.
- For React, Angular, and Vue: use the framework's rendering method to append a custom editor/component to `e.editorElement`.

## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)
    - [data.js](jQuery/src/data.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
    - [app.service.ts](Angular/src/app/services/data.service.ts)
- **Vue**
    - [HomeContent.vue](Vue/src/components/HomeContent.vue)
    - [CustomEditor.vue](Vue/src/components/CustomEditor.vue)
    - [data.ts](Vue/src/data.ts)
- **React**
    - [App.tsx](React/src/App.tsx)
    - [CustomEditor.tsx](React/src/components/CustomEditor.tsx)
    - [data.ts](React/src/data.ts)
    - [types.ts](React/src/types/CustomEditor.types.ts)
- **ASP.NET Core**    
    - [Index.cshtml](<ASP.NET Core/Views/Home/Index.cshtml>)
    - [CategoriesController.cs](<ASP.NET Core/Controllers/CategoriesController.cs>)
    - [CustomersController.cs](<ASP.NET Core/Controllers/CustomersController.cs>)

## Documentation

- [Getting Started with DataGrid](https://js.devexpress.com/Documentation/Guide/UI_Components/DataGrid/Getting_Started_with_DataGrid/)
- [DataGrid API - onEditorPreparing](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Configuration/#onEditorPreparing)

<!-- feedback -->
## Does This Example Address Your Development Requirements/Objectives?

[<img src="https://www.devexpress.com/support/examples/i/yes-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-custom-filter-row-editor&~~~was_helpful=yes) [<img src="https://www.devexpress.com/support/examples/i/no-button.svg"/>](https://www.devexpress.com/support/examples/survey.xml?utm_source=github&utm_campaign=devextreme-datagrid-custom-filter-row-editor&~~~was_helpful=no)

(you will be redirected to DevExpress.com to submit your response)
<!-- feedback end -->
