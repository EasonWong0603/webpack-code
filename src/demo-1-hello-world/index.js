(function () {
  function hello() {
    return 'hello';
  }
  function world() {
    return 'world';
  }
  const s = hello() + ' ' + world();
  console.log(s);
})();
