<template>
  <div class="articles-page">
    <div class="article-list" v-loading="loading">
      <div class="article-card" v-for="item in articles" :key="item.id">
        <div class="article-title" v-html="item.title"></div>
        <div class="article-desc">{{item.description}}</div>
        <div class="article-bottom-container">
          <div class="left">
            <span class="views">
              <i class="el-icon-view"></i>
              {{item.views || 0}}
            </span>
            <span>{{ item.lastmodify | timeFormat }}</span>
          </div>
          <div class="right">
            <el-button type="text" @click="handleClickAritcle(item)">查看</el-button>
            <el-button v-if="isAdmin" type="text" @click="handleDelete(item)">删除</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

import { getBlogList } from "@/http/api";

export default {
  name: "ArticleList",
  data() {
    return {
      articles: [],
      loading: false
    };
  },
  filters: {
    timeFormat(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  computed: {
    isAdmin() {
      return this.$route.query.isAdmin;
    }
  },
  mounted() {
    this.getBlogList();
  },
  methods: {
    getBlogList() {
      const params = {};
      if (this.$route.query.isAdmin) {
        params.isAdmin = 1;
      }
      this.loading = true;
      getBlogList(params)
        .then(({ payload }) => {
          this.articles = payload || [];
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleClickAritcle(item) {
      this.$router.push({
        name: "article-detail",
        params: {
          id: item.id
        }
      });
    },
    handleDelete(item) {
      this.$confirm("确定要删除这篇文章吗？", "提示").then(() => {
        this.$api.deleteBlog(item.id).then(() => {
          this.$message.success("删除成功");
          this.getBlogList();
        });
      }).catch(() => {})
    }
  }
};
</script>

<style lang="scss">
.article-list {
  width: 400px;
  margin: 0 auto;
}
.article {
  &-card {
    cursor: pointer;
    padding: 10px 8px;
    border-bottom: 1px solid #efefef;
  }
  &-title {
    line-height: 30px;
    font-size: 18px;
    font-weight: 700;
    color: #000;
    &:hover {
      opacity: 0.8;
    }
  }
  &-desc {
    min-height: 30px;
    font-size: 13px;
    color: #555;
    line-height: 24px;
  }
  &-bottom-container {
    font-size: 13px;
    color: #555;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > span {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
