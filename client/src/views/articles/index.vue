<template>
  <div class="articles-page">
    <div class="article-list">
      <div
        class="article-card"
        v-for="item in articles"
        :key="item.id"
        @click="handleClickAritcle(item)"
      >
        <div class="article-title" v-html="item.title"></div>
        <div class="article-desc">{{item.description}}</div>
        <div class="article-bottom-container">
          <span class="views">
            <i class="el-icon-view"></i>
            {{item.views || 0}}
          </span>
          <span>{{ item.lastmodify | timeFormat }}</span>
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
      articles: []
    };
  },
  filters: {
    timeFormat(time) {
      return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  mounted() {
    const params = {};
    if (this.$route.query.isAdmin) {
      params.isAdmin = 1;
    }
    getBlogList(params).then(({ payload }) => {
      this.articles = payload || [];
    });
  },
  methods: {
    handleClickAritcle(item) {
      this.$router.push({
        name: "article-detail",
        params: {
          id: item.id
        }
      });
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
    > span {
      display: inline-block;
      margin-right: 10px;
    }
  }
}
</style>
