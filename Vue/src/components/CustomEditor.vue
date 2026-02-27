<script setup lang="ts">
import { ref, watch } from 'vue';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxDropDownBox, { DxButton as DxDropDownBoxButton } from 'devextreme-vue/drop-down-box';
import type { DxDropDownBoxTypes } from 'devextreme-vue/drop-down-box';
import DxTreeList, { DxColumn as DxTreeListColumn, DxSelection as DxTreeListSelection } from 'devextreme-vue/tree-list';
import type { DxTreeListTypes } from 'devextreme-vue/tree-list';
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';
import type { DxButtonTypes } from 'devextreme-vue/button';
import { categories } from '../data';

interface CustomEditorProps {
  gridEditorEvent: DxDataGridTypes.EditorPreparingEvent;
}

const props = defineProps<CustomEditorProps>();
const dropDownBoxRef = ref<InstanceType<typeof DxDropDownBox> | null>(null);
const dropDownBoxValue = ref<number | null>(props.gridEditorEvent.value as number | null);
const treeListSelectedRowKeys = ref<number[]>(
  props.gridEditorEvent.value ? [props.gridEditorEvent.value] : []
);

watch(dropDownBoxValue, (newValue: number | null) => {
  treeListSelectedRowKeys.value = newValue != null ? [newValue] : [];
});

function treeListSelectionChanged(e: DxTreeListTypes.SelectionChangedEvent): void {
  const selectedId: number | undefined = e.currentSelectedRowKeys[0];
  if (selectedId === undefined) return;
  const dropDownBoxInstance = dropDownBoxRef.value?.instance;
  dropDownBoxValue.value = selectedId;
  dropDownBoxInstance?.close();
  props.gridEditorEvent.setValue(selectedId);
}

function dropDownBoxValueChanged(e: DxDropDownBoxTypes.ValueChangedEvent): void {
  dropDownBoxValue.value = e.value as number | null;
}

function clearDropDownSelection(): void {
  dropDownBoxValue.value = null;
  dropDownBoxRef.value?.instance?.close();
}

const dropDownBoxButtonOptions: DxButtonTypes.Properties = {
  icon: 'remove',
  onClick: () => {
    props.gridEditorEvent.setValue(null);
    clearDropDownSelection();
  },
};

defineExpose({
  clearDropDownSelection,
});
</script>

<template>
  <div>
    <DxDropDownBox
      ref="dropDownBoxRef"
      :value="dropDownBoxValue"
      @value-changed="dropDownBoxValueChanged"
      :data-source="categories"
      value-expr="id"
      display-expr="name"
    >
      <template #content>
        <DxTreeList
          height="100%"
          :selected-row-keys="treeListSelectedRowKeys"
          :data-source="categories"
          key-expr="id"
          parent-id-expr="parentId"
          @selection-changed="treeListSelectionChanged"
        >
          <DxTreeListSelection mode="single"/>
          <DxTreeListColumn data-field="name"/>
        </DxTreeList>
      </template>
      <DxDropDownBoxButton
        location="after"
        name="customClear"
        :options="dropDownBoxButtonOptions"
      />
    </DxDropDownBox>
  </div>
</template>
