// var roleMain = {
//     customer: ['Product', 'ProductAdd', 'ProductList', 'Home', 'Index'],
//     admin: ['Product', 'ProductAdd', 'ProductList', 'Home', 'Index', 'Category']
// }

export default function roleAdmin(role, routes) {
  //   console.log(routes);
  // return roleMain[role];
  if (role === 'admin') return routes;
  const menuRoutes = routes.filter((it) => {
    const obj = it;
    if (obj.children) {
      const { children } = obj;
      obj.children = children.filter((i) => i.meta.role === 'all');
    }
    return it.meta.role === 'all';
  });
  return menuRoutes;
}
