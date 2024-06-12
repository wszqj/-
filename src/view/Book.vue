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

// 数据集合
const tableData = ref(
    [
      {
        "id": 1,
        "bookName": '西游记1',
        "category": '名著',
        "stock": '99',
        "price": '520.00',
        "createTime": '2024-06-05 15:55:00',
        "updateTime": '2024-06-05 15:55:00'
      },
      {
        "id": 2,
        "bookName": '西游记2',
        "category": '小说',
        "stock": '99',
        "price": '520.00',
        "createTime": '2024-06-05 15:55:00',
        "updateTime": '2024-06-05 15:55:00'
      }
    ]
)
// 图书数据模型
const bookModel = ref({
  id: '',
  bookName: '',
  image: '',
  category: '',
  stock: '',
  price: '',
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
const bookName = ref('')
const type = ref('')

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

  // 遍历 tableData 数组
  for (let i = 0; i < tableData.value.length; i++) {
    // 如果书名匹配
    if (tableData.value[i].bookName === bookName.value || tableData.value[i].category === type.value) {
      // 将匹配的项目添加到 searchResult 中
      result.value.push(tableData.value[i])
    }
  }
  dataType.value = 1
}

// 重置搜索表单，并恢复数据
const reSet = () => {
  bookName.value = ''
  type.value = ''
  dataType.value = 0
}

//删除书籍
const deleteBook = (row) => {
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
        for (let i = 0; i < tableData.value.length; i++) {
          // 如果id匹配
          if (tableData.value[i].id === row.id) {
            // 将匹配的项目移除 searchResult 中 (从i开始删除，删除1个)
            tableData.value.splice(i, 1)
            break;
          }
        }
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
const clearBookModel = () => {
  bookModel.value = {
    id: '',
    bookName: '',
    category: '',
    stock: '',
    price: '',
    createTime: '',
    updateTime: ''
  }
}
// 获取当前书籍的详细信息
const bookInfo = (row) => {
  title.value='编辑书籍'
  visibleDrawer.value=true
  // 遍历 tableData 数组
  for (let i = 0; i < tableData.value.length; i++) {
    // 如果id匹配
    if (tableData.value[i].id === row.id) {
      // 将匹配的项目移除 searchResult 中 (从i开始删除，删除1个)
      bookModel.value = tableData.value[i]
      break;
    }
  }
}
// 新增书籍
const bookAdd = () => {
  // 添加时设置为当前时间
  const currentTime = formatDateTime(new Date());
  const bookToAdd = {
    id: generateRandomTwoDigitId(),  // 此处应该是有后端生成
    bookName: bookModel.value.bookName,
    category: bookModel.value.category,
    stock: bookModel.value.stock,
    price: bookModel.value.price,
    createTime: currentTime,
    updateTime: currentTime
  };

  tableData.value.push(bookToAdd); // 直接添加普通对象到数组中
  ElMessage.success('添加成功');

  // 清空模型数据
  clearBookModel();
  visibleDrawer.value = false; // 关闭抽屉或对话框
}

// 更新书籍信息
const updateBook = () => {
  // 添加时设置为当前时间
  const currentTime = formatDateTime(new Date());
  for (let i = 0; i < tableData.value.length; i++) {
    // 如果id匹配
    if (tableData.value[i].id === bookModel.value.id) {
      // 更新数据
      tableData.value[i]={
        id: bookModel.value.id,
        bookName: bookModel.value.bookName,
        category: bookModel.value.category,
        stock: bookModel.value.stock,
        price: bookModel.value.price,
        createTime: currentTime,
        updateTime: currentTime,
      }
      break;
    }
  }
  ElMessage.success('更新成功');
  // 清空模型数据
  clearBookModel();
  visibleDrawer.value = false; // 关闭抽屉或对话框
}

</script>
<template>
  <el-card shadow="always" class="page-container">
    <header style="margin-bottom: 30px; font-size: 25px">图书管理</header>

    <el-button type="primary" style="float: right" @click="clearBookModel(); visibleDrawer=true; title='添加书籍'">
      <el-icon>
        <Plus/>
      </el-icon>
      <span>添加书籍</span>
    </el-button>
    <!--    搜索表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="书名：">
        <el-input v-model="bookName" placeholder="请输入书名" clearable/>
      </el-form-item>
      <el-form-item label="书籍类型：">
        <el-select placeholder="请选择书籍类型" v-model="type" style="width: 200px">
          <el-option
              v-for="c in types"
              :key="c.id"
              :label="c.typeName"
              :value="c.typeName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search() ">搜索</el-button>
        <el-button @click="reSet()">重置</el-button>
      </el-form-item>
    </el-form>
    <!--    数据展示区域-->
    <el-table id="table" :data="(dataType>0?result:tableData)" style="width: 100%">
      <el-table-column fixed prop="id" type="index" label="序号" width="120"/>
      <el-table-column prop="bookName" label="书名"/>
      <el-table-column prop="category" label="分类"/>
      <el-table-column prop="stock" label="库存"/>
      <el-table-column prop="price" label="价格"/>
      <el-table-column prop="createTime" label="创建日期" width="240"/>
      <el-table-column prop="updateTime" label="修改日期" width="240"/>
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button :icon="Edit" plain type="primary" @click="bookInfo(row)" circle/>
          <el-button :icon="Delete" plain type="danger" @click="deleteBook(row)" circle/>
        </template>
      </el-table-column>
    </el-table>

    <!--    抽屉-->
    <el-drawer v-model="visibleDrawer" :title="title" direction="rtl" size="50%">
      <el-card class="drawerCard">
        <!-- 添加书籍表单 -->
        <el-form :model="bookModel" label-width="100px" ref="form">
          <el-form-item label="书名" prop="businessPhone">
            <el-input v-model="bookModel.bookName" placeholder="请输入书名"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="trader">
            <el-input v-model="bookModel.price" placeholder="请输入价格"></el-input>
          </el-form-item>
          <el-form-item label="库存" prop="amountPaid">
            <el-input v-model="bookModel.stock" placeholder="请输入库存"></el-input>
          </el-form-item>
          <el-form-item label="书籍类型" prop="type">
            <el-select placeholder="请选择书籍类型" v-model="bookModel.category">
              <el-option v-for="c in types" :key="c.id" :label="c.typeName" :value="c.typeName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="bookModel.createTime" disabled></el-input>
          </el-form-item>
          <el-form-item label="修改时间">
            <el-input v-model="bookModel.updateTime" disabled></el-input>
          </el-form-item>
          <!--        提交按钮-->
          <el-form-item>
            <el-button type="primary" @click="title==='添加书籍'?bookAdd():updateBook()">完成</el-button>
            <el-button @click="visibleDrawer=false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-drawer>
  </el-card>
</template>
<style scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
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