<template>
  <div class="Tables">
    <el-button type="text" @click="InsertOfver(0)">添加</el-button>
    <el-table
      :data="talbeDATAs"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="日期" sortable></el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="deleteFn(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="InsertOfver(scope.row.id)" type="text" size="small">添加子类</el-button>
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
      tableData: [],
      talbeDATAs: [],
      dialogFormVisible: false,
      form: {
        date: "",
        name: "",
        address: "",
      },
      uid: null,
      a: {},
      formLabelWidth: "120px",
    };
  },
  created() {
    this.a = JSON.parse(JSON.stringify(this.form));
  },
  methods: {
    //删除
    deleteFn(row) {
    //   console.log(row);
    },
    //添加
    InsertOfver(uid) {
      this.uid = uid;
      this.dialogFormVisible = true;
    },
    InsertFn(a, id = this.randomString()) {
      let form = JSON.parse(JSON.stringify(this.form));
      this.form = JSON.parse(JSON.stringify(this.a));
      form.uid = this.uid || 0;
      form.id = id;
      this.tableData.push(form);
      this.arrangementData();
      this.dialogFormVisible = false;
    },
    //最大id
    randomString() {
      if (this.tableData.length == 0) return 1;
      return (
        this.tableData.sort(function (a, b) {
          return b.id - a.id;
        })[0].id + 1
      );
    },
  },
};
</script>
<style lang="scss" scoped>
</style>