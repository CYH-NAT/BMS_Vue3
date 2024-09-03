<template>
    <div class="user-header">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-form :inline="true" :model="formInline">
            <el-form-item label="請輸入">
                <el-input placeholder="請輸入用戶名" v-model="formInline.keyWord" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-for="item in tableLabel" :key="item.porp" :width="item.width || 125" :prop="item.prop"
                :label="item.label">
                <template #default="scope" v-if="item.label == '性別'">
                    <div>{{ scope.row.sex == '1' ? '男' : '女' }}</div>
                </template>
                <!-- 對性別行重新渲染 -->
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="120">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">
                        編輯
                    </el-button>
                    <el-button type="danger" size="small" @click="handleDelete2(scope.row)">刪除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pager" background layout="prev, pager, next" :total="config.total" size="small"
            @current-change='handleChange' />
    </div>
    <el-dialog
        v-model="dialogVisible"
        :title="action == 'add' ? '新增用户' : '编輯用户'"
        width="35%"
        :before-close="handleClose">
        <!--需要注意的是设置了:inline="true"，会对el-select的样式造成影响，我们通过给他设置一个class=select-clearn 在css进行处理-->
        <el-form :inline="true" :model="formUser" :rules="rules" ref="userForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formUser.name" placeholder="請輸入姓名" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年齡" prop="age">
                        <el-input v-model.number="formUser.age" placeholder="請輸入年齡" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item class="select-clearn" label="性别" prop="sex">
                        <el-select v-model="formUser.sex" placeholder="請選擇">
                            <el-option label="男" value="1" />
                            <el-option label="女" value="0" />
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="出生日期" prop="birth">
                        <el-date-picker v-model="formUser.birth" type="date" placeholder="請輸入" style="width: 100%" value-format="YYYY-MM-DD"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-form-item label="地址" prop="addr">
                    <el-input v-model="formUser.addr" placeholder="請輸入地址" />
                </el-form-item>
            </el-row>
            <el-row style="justify-content: flex-end">
                <el-form-item>
                    <el-button type="primary" @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="onSubmit">確定</el-button>
                </el-form-item>
            </el-row>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { ref, getCurrentInstance, onMounted, reactive,nextTick } from 'vue'

const handleEdit = val => {
    action.value = 'edit'
    dialogVisible.value=true  //設為true的時候彈窗才會開始渲染
    // console.log(val)  //由此可知表單傳進來的數字會自動變成number類型

    //Object.assign(formUser,{...val,sex:''+val.sex})
        //如果在這直接執行，數據會跑得比渲染彈窗還快。即因為彈窗還沒有渲染完，被當成彈窗的初始值，而不是彈窗渲染完之後使用者輸入的值
    nextTick(()=>{
        Object.assign(formUser,{...val,sex:''+val.sex})      //Object.assign(目標,素材)
        //確保彈窗的DOM渲染完成才變動數據，常見的BUG，面試常考
    })

}

const tableData = ref([])

const { proxy } = getCurrentInstance()

const getUserData = async () => {
    const data = await proxy.$api.getUserData(config)
    //console.log(data)
    tableData.value = data.list
    config.total = data.count
}

const tableLabel = reactive([
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'age',
        label: '年齡'
    },
    {
        prop: 'sex',
        label: '性別'
    },
    {
        prop: 'birth',
        label: '出生日期',
        width: 200
    },
    {
        prop: 'addr',
        label: '地址',
        width: 400
    },
])

const formInline = reactive({
    keyWord: ''
})

const config = reactive({
    name: '',
    total: 0,
    page: 1
})

const action = ref('add')
const dialogVisible=ref(false)
const formUser = reactive({sex:'1'})
//表单校验规则
const rules = reactive({
  name: [{ required: true, message: "姓名是必填項", trigger: "blur" }],
  age: [
    { required: true, message: "年齡是必填項", trigger: "blur" },
    { type: "number", message: "年齡必須是數字" },
  ],
  sex: [{ required: true, message: "性別是必填項", trigger: "change" }],
  birth: [{ required: true, message: "出生日期是必選項" }],
  addr:[{ required: true, message: '地址是必填項' }]
})

const handleSearch = () => {
    config.name = formInline.keyWord
    getUserData()
}

const handleChange = page => {
    config.page = page
    getUserData()
}


const handleDelete2 = val => {
    ElMessageBox.confirm('你確定要刪除嗎？').then(async () => {
        await proxy.$api.deleteUser({ id: val.id })
        ElMessage({
            showClose: true,
            message: '刪除成功',
            type: 'success'
        })
        getUserData()
    }).catch(err => console.log(err))
}

const handleClose = ()=>{
    //得到表單的DOM，調用resetFields重置表單
    proxy.$refs["userForm"].resetFields()
    //關閉對話框
    dialogVisible.value=false
}

const handleCancel = ()=>{
    handleClose()
}

const handleAdd = ()=>{
    dialogVisible.value=true
}

const onSubmit = ()=>{
    //先要校驗
    proxy.$refs['userForm'].validate(async valid=>{
        if(valid){
            let res =null;
            if(action.value=='add'){
                res= await proxy.$api.addUser(formUser)
            }else{
                res= await proxy.$api.editUser(formUser)
            }
            if(res){
                dialogVisible.value=false
                proxy.$refs["userForm"].resetFields()
                getUserData()
            }
        }else{
            ElMessage({
                showClose:true,
                message:'請輸入正確的內容',
                type:'error'
            })
        }
    })
}

onMounted(() => {
    getUserData()
    action.value='add'
})

</script>

<style lang="less" scoped>
.user-header {
    display: flex;
    justify-content: space-between;
}

.table {
    position: relative; //給父集加上relative
    .pager {
        position: absolute;
        margin-top: 20px;
        right: 10px;
    }
}
.select-clearn{
    display: flex;
}
</style>