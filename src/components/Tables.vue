<template>
  <div class="Tables">
    <el-button type="text" @click="InsertOfver({uid : -1 })">添加</el-button>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      :default-expand-all="false"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="id" sortable></el-table-column>
      <el-table-column prop="date" label="日期" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="seeFn(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="updateFn(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleteFn(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="InsertOfver(scope.row)" type="text" size="small">添加子类</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加" :visible.sync="dialogFormVisible">
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

    <el-dialog title="修改" :visible.sync="dialogFormVisibles">
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
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="updateIn">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看" :visible.sync="dialogFormVisibleed">
      <el-form :model="form">
        <el-form-item label="日期" :label-width="formLabelWidth">
          <el-col>{{ form.date }}</el-col>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-col>{{ form.name }}</el-col>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-col>{{ form.address }}</el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleed = false">关 闭</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="查看" :visible.sync="dialogFormVisibleed">
      <el-row>
        <el-col :span="5">日期</el-col>
        <el-col :span="19">{{ form.date }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">姓名</el-col>
        <el-col :span="19">{{ form.name }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">地址</el-col>
        <el-col :span="19">{{ form.address }}</el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleed = false">取 消</el-button>
        <el-button type="primary" @click="updateIn">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>
<script>
export default {
  name: "Tables",
  data() {
    return {
      flag: localStorage.getItem("flag") || 1,
      talbeDATAs: JSON.parse(localStorage.getItem("tableDATAs")) || [],
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisibles: false,
      dialogFormVisibleed: false,
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
      this.deleteRecursion(row.id);
      // 整治规则
      this.tableData = this.InseRules(
        JSON.parse(JSON.stringify(this.talbeDATAs)),
        -1
      );
      localStorage.setItem("tableDATAs", JSON.stringify(this.talbeDATAs));
    },
    deleteRecursion(id) {
      for (let i = 0; i < this.talbeDATAs.length; i++) {
        let temp = this.talbeDATAs[i];
        if (temp.uid === id) {
          this.talbeDATAs.splice(i, 1);
          i--;
          this.deleteRecursion(temp.id);
        }
        if (temp.id === id) {
          this.talbeDATAs.splice(i, 1);
          i--;
        }
      }
      return;
    },
    //编辑
    updateFn(row) {
      this.form = JSON.parse(JSON.stringify(row));
      this.dialogFormVisibles = true;
    },
    updateIn() {
      let arr = this.talbeDATAs.map((item) => {
        if (item.id === this.form.id) {
          return (item = this.form);
        }
        return item;
      });
      localStorage.setItem("tableDATAs", JSON.stringify(arr));
      this.tableData = this.InseRules(arr, -1);
      this.dialogFormVisibles = false;
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
      localStorage.setItem("tableDATAs", JSON.stringify(this.talbeDATAs));
      localStorage.setItem("flag", this.flag);
      this.dialogFormVisible = false;
    },
    //查看
    seeFn(row){
      this.form = row;
      this.dialogFormVisibleed = true;
    },
    //规则
    InseRules(tableDate, num) {
      let data = [];
      for (let i = 0; i < tableDate.length; i++) {
        let temp = tableDate[i];
        if (temp.uid === num) {
          data.push(temp);
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