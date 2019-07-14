export default function axiosExtra(axios) {
  for (let method of [
    "request",
    "delete",
    "get",
    "head",
    "options",
    "post",
    "put",
    "patch"
  ]) {
    axios["$" + method] = function() {
      return this[method].apply(this, arguments).then(res => res && res.data);
    };
  }
}
