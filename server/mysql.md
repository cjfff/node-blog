## mysql 数据库

- show databases; 列出所有的数据表

- CREATE SCHEMA `myblog` ; 创建数据库

真实操作步骤
use databases;

create table xxx {

}

```mysql
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(32) NOT NULL,
  `realname` varchar(20) DEFAULT NULL,
  `nikename` varchar(20) DEFAULT NULL,
  `email` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
```


```mysql
CREATE TABLE `blogs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) NOT NULL,
  `content` longtext,
  `createtime` bigint(20) NOT NULL,
  `author` varchar(20) NOT NULL,
  `lastmodify` bigint(20) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `views` bigint(20) DEFAULT NULL COMMENT '文章点击数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
```

- use myblog(使用某个数据库)

- show tables; 查看所有表

- show create table users; 显示创建表语句

### 增加
insert into users (username, `password`, realname) values ('zhangsan', '123', '张三');


### 查询
- select * from users; // 查询全部列
- select id, username from users; // 部分查询
- select * from users where username='zhangsan'; // 判断语句
- select * from users where username='zhangsan' and password='123'; 并且
- select * from users where username='zhangsan' or password='123'; 或者
- select * from users where password like '%1%' order by id desc; // 排序
- select * from users where state<>0; 不等于 <>

### 更改
- update users set realname='李四2' where username='lisi';
- update users set realname='李四2', title=111 where username='lisi';
- update users set state=0 where state=1;

### 删除
- delete from users where realname='李四';

### 添加列
ALTER TABLE users(表)
	ADD COLUMN `state` TINYINT(2) NOT NULL DEFAULT 1;


## 原生 node 操作数据库
- 首先安装 mysql 库
```js
const mysql = require("mysql");

// 创建连接对象
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "********",
  port: "3306",
  database: "myblog"
});


// 开始连接
con.connect()

// 执行 sql 语句
const sql = 'select * from users;'
con.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(result);
})

// 关闭连接
con.end()
```

## 错误码解决

### 1075 要求使用安全的更新方法
- SET SQL_SAFE_UPDATES=0;

### 1366 解决方法
> 其实是表字段的字符编码与插入的数据不符合，改变即可。

- https://blog.csdn.net/tuchui88/article/details/77651980

```mysql
show variables like 'character%';

set character_set_database=utf8;
set character_set_client=utf8;
set character_set_system=utf8;
set character_set_connection=utf8;
```