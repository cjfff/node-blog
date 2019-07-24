<template>
  <div class="publish-page">
    <el-form-renderer :content="content" ref="form">
      <el-form-item label>
        <el-button type="primary" @click="handleSubmit">发布文章</el-button>
      </el-form-item>
    </el-form-renderer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: [
        {
          type: "input",
          id: "title",
          label: "标题",
          el: {
            placeholder: "请输入标题"
          },
          rules: [
            {
              required: true,
              message: "请输入文章标题",
              triggle: "blur"
            }
          ]
        },
        {
          type: "input",
          id: "content",
          label: "标题",
          el: {
            placeholder: "请输入内容",
            type: "textarea",
            column: 6,
            rows: 10
          },
          rules: [
            {
              required: true,
              message: "请输入内容",
              triggle: "blur"
            }
          ]
        }
      ]
    };
  },
  computed: {},
  methods: {
    handleSubmit() {
      this.$form.validate(validate => {
        if (!validate) return;

        const value = this.$form.getFormValue();

        this.$api.postBlog(value).then((res) => {
          this.$message.success("发布成功");
          setTimeout(() => {
            this.$router.push('/article/?isAdmin=1')
          }, 500);
        });
      });
    }
  }
};
</script>

<style>
</style>
