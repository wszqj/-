<script setup>
import {Delete, Edit, Plus} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

import {useTokenStore} from "@/stores/token.js";
import router from "@/router/index.js";
const userTokenStore = useTokenStore()
if (userTokenStore.token===''){
  ElMessage.error("请先登录！")
  router.push('/login')
}
// 图书数据模型
const categoryModel = ref({
  id: '',
  typeName: '',
  createTime: '',
  updateTime: ''
})

const types = ref([
  {
    "id": 1,
    "typeName": "名著",
    "createTime": '2024-03-16 14:57:00',
    "updateTime": '2024-03-16 14:57:00'
  },
  {
    "id": 2,
    "typeName": "小说",
    "createTime": '2024-03-16 14:57:00',
    "updateTime": '2024-03-16 14:57:00'
  }
])

// 序列化时间格式
function formatDateTime(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的，所以需要加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
// 随机ID
function generateRandomTwoDigitId() {
  return Math.floor(Math.random() * 90) + 10; // 生成10到99之间的随机数
}
// 表单数据
const typeName = ref('')
// 搜索结果类
const result = ref([])
// 数据展示区的状态
const dataType = ref(0)
// 抽屉是否显示
const visibleDrawer = ref(false)
// 抽屉的标题
const title = ref('')

// 搜索
const search = () => {
  // 清除之前的搜索结果
  result.value = []

  // 遍历 types 数组
  for (let i = 0; i < types.value.length; i++) {
    // 如果书名匹配
    if (types.value[i].typeName === typeName.value) {
      // 将匹配的项目添加到 searchResult 中
      result.value.push(types.value[i])
    }
  }
  dataType.value = 1
}

// 重置搜索表单，并恢复数据
const reSet = () => {
  typeName.value = ''
  dataType.value = 0
}

//删除书籍
const deleteCategory = (row) => {
  ElMessageBox.confirm(
      '你确认要删除该书籍吗?',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        // 遍历 tableData 数组
        for (let i = 0; i < types.value.length; i++) {
          // 如果id匹配
          if (types.value[i].id === row.id) {
            // 将匹配的项目移除 searchResult 中 (从i开始删除，删除1个)
            types.value.splice(i, 1)
            break;
          }
        }
        // 遍历 result 数组
        for (let i = 0; i < result.value.length; i++) {
          // 如果id匹配
          if (result.value[i].id === row.id) {
            // 将匹配的项目移除 searchResult 中 (从i开始删除，删除1个)
            result.value.splice(i, 1)
            break;
          }
        }
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
      })
}

// 清空抽屉数据
const clearCategoryModel = () => {
  categoryModel.value = {
    id: '',
    typeName: '',
    createTime: '',
    updateTime: ''
  }
}
// 获取当前书籍的详细信息
const categoryInfo = (row) => {
  title.value='编辑书籍'
  visibleDrawer.value=true
  // 遍历 tableData 数组
  for (let i = 0; i < types.value.length; i++) {
    // 如果id匹配
    if (types.value[i].id === row.id) {
      // 将匹配的项目移除 searchResult 中 (从i开始删除，删除1个)
      categoryModel.value = types.value[i]
      break;
    }
  }
}

// 新增书籍
const addCategory = () => {
  // 添加时设置为当前时间
  const currentTime = formatDateTime(new Date());
  const category = {
    id: generateRandomTwoDigitId(),  // 此处应该是有后端生成
    typeName: categoryModel.value.typeName,
    createTime: currentTime,
    updateTime: currentTime
  };

  types.value.push(category); // 直接添加普通对象到数组中
  ElMessage.success('添加成功');

  // 清空模型数据
  clearCategoryModel();
  visibleDrawer.value = false; // 关闭抽屉或对话框
}

// 更新书籍信息
const updateCategory = () => {
  // 添加时设置为当前时间
  const currentTime = formatDateTime(new Date());
  for (let i = 0; i < types.value.length; i++) {
    // 如果id匹配
    if (types.value[i].id === categoryModel.value.id) {
      // 更新数据
      types.value[i]={
        id: categoryModel.value.id,
        bookName: categoryModel.value.typeName,
        createTime: currentTime,
        updateTime: currentTime,
      }
      break;
    }
  }
  ElMessage.success('更新成功');
  // 清空模型数据
  clearCategoryModel();
  visibleDrawer.value = false; // 关闭抽屉或对话框
}

</script>
<template>
  <el-card shadow="always" class="page-container">
    <header style="margin-bottom: 30px; font-size: 25px">图书分类管理</header>

    <el-button type="primary" style="float: right" @click="clearCategoryModel(); visibleDrawer=true; title='添加分类'">
      <el-icon>
        <Plus/>
      </el-icon>
      <span>添加分类</span>
    </el-button>

    <!--    搜索表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="分类名：">
        <el-input v-model="typeName" placeholder="请输入分类名" clearable/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search() ">搜索</el-button>
        <el-button @click="reSet()">重置</el-button>
      </el-form-item>
    </el-form>

    <!--    数据展示区域-->
    <el-table id="table" :data="(dataType> 0 ? result : types)" style="width: 100%">
      <el-table-column fixed prop="id" type="index" label="序号" width="200"/>
      <el-table-column prop="typeName" label="分类名"/>
      <el-table-column prop="createTime" label="创建日期" />
      <el-table-column prop="updateTime" label="修改日期" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button :icon="Edit" plain type="primary" @click="categoryInfo(row)" circle/>
          <el-button :icon="Delete" plain type="danger" @click="deleteCategory(row)" circle/>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="visibleDrawer" :title="title" width="500">
      <el-form>
        <el-form-item label="请输入分类名称">
          <el-input v-model="categoryModel.typeName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="visibleDrawer = false">取消</el-button>
          <el-button type="primary" @click="title==='添加分类'?addCategory():updateCategory()">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  background-color: #F8FBFE;
  border-radius: 25px;
  z-index: 1;
}
.el-table {
  --el-table-border-color: transparent;
  --el-table-border: none;
  --el-table-header-text-color: #333366;
  --el-table-row-hover-bg-color: #eeefff;
  --el-table-header-bg-color: transparent;
  --el-table-bg-color: #F8FBFE;
  --el-table-tr-bg-color: transparent;
}

.el-table,
.el-table th,
.el-table td {
  color: var(--el-table-text-color);
  background-color: var(--el-table-bg-color);
}

.el-table th {
  color: var(--el-table-header-text-color);
}

.el-table tr:hover {
  background-color: var(--el-table-row-hover-bg-color);
}

.el-table .current-row {
  background-color: var(--el-table-current-row-bg-color);
}
</style>