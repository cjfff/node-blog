const { exec } = require("../db/mysql");
const xss = require('xss')

const getList = (author, keyword) => {
  let sql = `select id, title, content,author, createtime, lastmodify, views, description from blogs where 1=1 `;

  if (author) {
    sql += `and author='${author}' `;
  }

  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`;

  return exec(sql);
};

const getDetail = id => {
  let sql = `select id, title, content,author, createtime, lastmodify,views, description from blogs where id=${id}; `;
  return exec(sql).then(rows => rows[0]);
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象，包含title content 属性
  const { title, content, author } = blogData;
  const date = Date.now();
  let sql = `
     insert into blogs (title, content, author, createtime, lastmodify)
     values ('${xss(title)}', '${xss(content)}', '${author}', ${date}, ${date});
  `;
  return exec(sql);
};

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData,
    date = Date.now();
  let sql = `
    update blogs set title='${title}', content='${content}', lastmodify=${date} 
    where id=${id};
  `;
  return exec(sql).then(row => row.changedRows > 0);
};

const delBlog = (id, author) => {
  let sql = `
    delete from blogs where id=${id} and author='${author}';
  `;
  // 要删除博客的 id
  return exec(sql).then(row => row.affectedRows > 0);
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
};
