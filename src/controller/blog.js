const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select id, title, content,author, createtime, lastmodify from blogs where 1=1 `;

  if (author) {
    sql += `and author='${author}' `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`;

  return exec(sql)
};

const getDetail = id => {
  return {
    id: 1,
    title: "标题A",
    content: "内容A",
    createTime: 1561392728744,
    author: "zhangsan"
  };
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性

  return {
    id: 3 // 表示新建博客，插入表后的id
  };
};

const updateBlog = (id, blogData = {}) => {
  console.log(id, blogData);
  return true;
};

const delBlog = id => {
  // 要删除博客的 id
  return true;
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
