export default {
  mounted() {
    this.$nextTick(() => {
      Object.entries(this.$refs).forEach(([k, v]) => {
        this[`$${k}`] = v
      });
    });
  }
};
