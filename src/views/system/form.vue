<template>
  <div>
    <TableSearch :query="query" :options="searchOpt" :search="handleSearch" />
    <div class="container">
      <TableCustom
        :columns="columns"
        :tableData="tableData"
        :total="page.total"
        :viewFunc="handleView"
        :delFunc="handleDelete"
        :page-change="changePage"
        :editFunc="handleEdit"
      >
        <template #status="{ rows }">
          <span v-if="rows.status">有效</span>
          <span v-else>无效</span>
        </template>
        <template #status1="{ rows }">
          <el-button type="primary" size="small" plain @click="handleFormEdit(rows)"
            >表单编辑</el-button
          >
        </template>
        <template #toolbarBtn>
          <el-button type="primary" :icon="CirclePlusFilled" @click="visible = true"
            >新增</el-button
          >
        </template>
      </TableCustom>
    </div>
    <el-dialog
      :title="isEdit ? '编辑' : '新增'"
      v-model="visible"
      width="700px"
      destroy-on-close
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <TableEdit
        :form-data="rowData"
        :options="options"
        :edit="isEdit"
        :update="updateData"
      />
    </el-dialog>
    <el-dialog title="查看详情" v-model="visible1" width="700px" destroy-on-close>
      <TableDetail :data="viewData"></TableDetail>
    </el-dialog>
    <el-dialog
      title="表单编辑"
      v-model="formEditVisible"
      width="1200px"
      destroy-on-close
      center
      :close-on-click-modal="false"
      @close="closeDialog"
    >
      <formEditorPreview @submit="handleSubmit"></formEditorPreview>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="system-form">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { CirclePlusFilled } from "@element-plus/icons-vue";
import { Form } from "@/types/form";
import { fetchFormData } from "@/api";
import TableCustom from "@/components/table-custom.vue";
import TableDetail from "@/components/table-detail.vue";
import TableSearch from "@/components/table-search.vue";
import formEditorPreview from "./form-editor-preview.vue";
import { FormOption, FormOptionList } from "@/types/form-option";

// 查询相关
const query = reactive({
  name: "",
});
const searchOpt = ref<FormOptionList[]>([
  { type: "input", label: "名称：", prop: "name" },
]);
const handleSearch = () => {
  changePage(1);
};

// 表格相关
let columns = ref([
  { type: "index", label: "序号", width: 55, align: "center" },
  { prop: "name", label: "名称" },
  { prop: "code", label: "编码" },
  { prop: "category", label: "分类" },
  { prop: "status", label: "状态" },
  { prop: "status1", label: "表单视图" },
  { prop: "operator", label: "操作", width: 250 },
]);
const page = reactive({
  index: 1,
  size: 10,
  total: 0,
});
const tableData = ref<Form[]>([]);
/**
 * 获取数据
 */
const getData = async () => {
  const res = await fetchFormData();
  tableData.value = res.data.list;
  page.total = res.data.pageTotal;
};
getData();

const changePage = (val: number) => {
  page.index = val;
  getData();
};

// 新增/编辑弹窗相关
let options = ref<FormOption>({
  labelWidth: "100px",
  span: 12,
  list: [
    { type: "input", label: "表单名称", prop: "name", required: true },
    { type: "input", label: "编码", prop: "code", required: false },
    { type: "input", label: "分类", prop: "category", required: false },
    {
      type: "select",
      label: "状态",
      prop: "status",
      required: false,
      opts: [
        { label: "有效", value: 1 },
        { label: "无效", value: 0 },
      ],
    },
  ],
});
const visible = ref(false);
const isEdit = ref(false);
const rowData = ref({});
const handleEdit = (row: Form) => {
  rowData.value = { ...row };
  isEdit.value = true;
  visible.value = true;
};
const updateData = () => {
  closeDialog();
  getData();
};

const closeDialog = () => {
  visible.value = false;
  isEdit.value = false;
  formEditVisible.value = false;
};

// 查看详情弹窗相关
const visible1 = ref(false);
const viewData = ref({
  row: {},
  list: [],
});
const handleView = (row: Form) => {
  viewData.value.row = { ...row };
  viewData.value.list = [
    {
      prop: "id",
      label: "表单ID",
    },
    {
      prop: "name",
      label: "表单名称",
    },
    {
      prop: "code",
      label: "编码",
    },
    {
      prop: "category",
      label: "分类",
    },
    {
      prop: "status",
      label: "状态",
    },
  ];
  visible1.value = true;
};

// 删除相关
const handleDelete = (row: Form) => {
  ElMessage.success("删除成功");
};

/**
 * 表单编辑
 */
// 表单编辑弹窗相关
const formEditVisible = ref(false);
const handleFormEdit = (row: Form) => {
  formEditVisible.value = false;
  formEditVisible.value = true;
};

/**
 * 保存后回调
 */
const handleSubmit = () => {
  closeDialog();
  getData();
};
</script>

<style>
.el-form--inline .el-form-item {
  width: 220px;
}
</style>
