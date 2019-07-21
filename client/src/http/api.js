import axios from "./index";

// 登录
export const login = params => axios.$post("/api/user/login", params);

// 检查是否登录
export const checkLogin = () => axios.$get("/api/user/checkLogin");

export const logout = () => axios.$post("/api/user/logout");

// 获取 文章列表
export const getBlogList = params => axios.$get("/api/blog", { params });

// 获取文章详情
export const getBlogDetail = id => axios.$get(`/api/blog/${id}`);

export const postBlog = params => axios.$post("/api/blog", params);
