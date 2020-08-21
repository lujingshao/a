<template>
  <div class="Tables">
    <el-button type="text" @click="InsertOfver({uid : -1 })">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :default-expand-all="true"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="id" sortable></el-table-column>
      <el-table-column prop="date" label="日期" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button @click="updateFn(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteFn(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="InsertOfver(scope.row)" type="text" size="small">添加子类</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            style="width: 100%"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="InsertFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "Tables",
  data() {
    return {
      flag: sessionStorage.getItem("flag") || 0,
      talbeDATAs: JSON.parse(sessionStorage.getItem("tableDATAs")) || [],
      tableData: [],
      dialogFormVisible: false,
      form: {
        date: "",
        name: "",
        address: "",
      },
      uid: null,
      formLabelWidth: "120px",
    };
  },
  created() {
    // 整治规则
    this.tableData = this.InseRules(
      JSON.parse(JSON.stringify(this.talbeDATAs)),
      -1
    );
  },
  methods: {
    //删除
    deleteFn(row) {
      this.deleteRecursion(row.id, row.uid);
    },
    deleteRecursion(id, uid){
      for(let i = 0; i < this.talbeDATAs.length; i++){
        console.log(this.talbeDATAs[i].id)
        if(this.talbeDATAs[i].fss === 1) return ;
        if(this.talbeDATAs[i].id === id){
          this.talbeDATAs[i].fss = 1;
        }
        if(this.talbeDATAs[i].id === uid){
          this.deleteRecursion(this.talbeDATAs[i].id, this.talbeDATAs[i].uid);
        }
        if(this.talbeDATAs[i].uid === id){
          this.deleteRecursion(this.talbeDATAs[i].id, this.talbeDATAs[i].uid);
        }
      }

    },
    //编辑
    updateFn(row) {
      console.log(row);
    },

    //添加子类 ， //添加
    InsertOfver(uid) {
      this.uid = uid;
      this.dialogFormVisible = true;
    },
    InsertFn() {
      if (this.uid !== null) {
        this.form.id = this.flag++;
        this.form.uid = this.uid.id != undefined ? this.uid.id : -1;
        this.form.children = [];
        this.talbeDATAs.push(JSON.parse(JSON.stringify(this.form)));
      }
      // 整治规则
      this.tableData = this.InseRules(
        JSON.parse(JSON.stringify(this.talbeDATAs)),
        -1
      );
      // 存入session
      sessionStorage.setItem("tableDATAs", JSON.stringify(this.talbeDATAs));
      sessionStorage.setItem("flag", this.flag);
      this.dialogFormVisible = false;
    },
    InseRules(tableDate, num) {
      let data = [];
      for (let i = 0; i < tableDate.length; i++) {
        let temp = tableDate[i];
        if (temp.uid === num) {
          data.push(temp);
          // tableDate.splice(i,1);
          // i--;
        }
      }
      data.forEach((item) => {
        let a = this.InseRules(this.talbeDATAs, item.id);
        item.children = a;
      });
      return data;
    },
  },
};
</script>
<style lang="scss" scoped></style>