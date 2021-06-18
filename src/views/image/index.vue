<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div style="padding-bottom: 20px;" class="btngroup">
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部" @click.native="loadImage()"></el-radio-button>
          <el-radio-button label="收藏"
          @click.native="collectHandle"
          ></el-radio-button>
        </el-radio-group>
        <el-button
        size="mini"
        type='success'
        @click="centerDialogVisible = true"
        >添加素材</el-button>
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
         :xs="12"
         :sm="6"
         :md="6"
         :lg="4"
         v-for="(item, index) in images"
         :key="index"
         >
          <el-image
            style="height: 200px"
            :src='item.url'
            fit="cover"
          ></el-image>
        </el-col>
      </el-row>
      <!-- /素材列表 -->

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[5, 10, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total_page">
    </el-pagination>
    </el-card>

    <!-- 弹出框 -->
      <el-dialog
        title="上传素材"
        :visible.sync="centerDialogVisible"
        width="30%"
        :append-to-body='true'
        center
        :modal-append-to-body='false'
        >
        <el-upload
          list-type="picture-card"
          class="avatar-uploader"
          action="#"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </el-dialog>
  </div>
</template>

<script>
import { getImages } from '../../api/image'
export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    return {
      radio1: '全部',
      images: [],
      isCollect: false,
      centerDialogVisible: false, // 上传图片的弹出层
      page: 1,
      per_page: 10,
      total_page: 400
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImage(false)
  },
  mounted () {},
  methods: {
    async loadImage (collect = false) {
      const { data: res } = await getImages({
        collect,
        page: this.page,
        per_page: this.per_page
      })
      this.total_page = res.data.total_count
      this.images = res.data.results
    },

    // 每页条数改变触发的回调
    handleSizeChange (val) {
      this.per_page = val
      this.loadImage(this.isCollect)
    },

    // 页数改变触发回调
    handleCurrentChange (val) {
      this.page = val
      this.loadImage(this.isCollect)
    },

    collectHandle () {
      this.isCollect = true
      this.loadImage(this.isCollect)
    }
  }
}
</script>

<style scoped lang="less">
.btngroup {
  display: flex;
  justify-content: space-between;
}
.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    // width: 178px;
    // // height: 178px;
    // line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
