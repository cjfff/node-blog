<template>
  <div class="article-detail">
    <h2 class="title">{{article.title}}</h2>
    <div class="desc">{{article.description}}</div>
    <div class="content">{{article.content}}</div>
  </div>
</template>

<script>
import { getBlogDetail } from "@/http/api";

export default {
  name: "ArticleDetail",
  props: ["id"],
  data() {
    return {
      article: {}
    };
  },
  mounted() {
    getBlogDetail(this.id).then(res => {
      this.article = { ...res.payload };
    });
  }
};
</script>

<style>
</style>
