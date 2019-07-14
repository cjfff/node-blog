<template>
  <el-container class="home-page">
    <el-header>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{userInfo.username || '菜单'}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in dropdownList"
            :command="item.type"
            :key="item.type"
            :divided="item.divided"
          >{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-main>
      <router-view :key="$route.path + `?_=Date.now`"></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    dropdownList() {
      return !this.userInfo.username
        ? [
            {
              name: "登录",
              type: "login",
              divided: false
            }
          ]
        : [
            {
              name: "个人主页",
              type: "myblog",
              divided: false
            },
            {
              name: "发表文章",
              type: "publish",
              divided: true
            },
            {
              name: "退出登录",
              type: "logout",
              divided: false
            }
          ];
    }
  },
  created() {
    this.checkLogin();
  },
  methods: {
    ...mapActions("user", ["checkLogin", 'logout']),
    handleCommand(type) {
      const handleMap = {
        myblog: () => {
          this.$router.push({
            name: "article-list",
            query: {
              isAdmin: 1
            }
          });
        },
        login: () => this.$router.push("/login"),
        logout: () => this.logout()
      };
      const fn = handleMap[type];
      fn && fn();
      console.log(type);
    }
  }
};
</script>

<style lang="scss">
.home-page {
  .el-header {
    display: flex;
    border-bottom: 1px solid #efefef;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
