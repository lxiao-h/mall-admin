// var roleMain = {
//     customer: ['Product', 'ProductAdd', 'ProductList', 'Home', 'Index'],
//     admin: ['Product', 'ProductAdd', 'ProductList', 'Home', 'Index', 'Category']
// }

export default function roleAdmin(role, routes) {
  console.log(routes);
  // return roleMain[role];
  if (role === 'admin') return routes;
  const menuRoutes = routes.filters((it) => {
    const obj = it;
    if (obj.children) {
      obj.children = it.children.filters((i) => i.meta.role === 'all');
      return true;
    }
    return it.meta.role === 'all';
  });
  return menuRoutes;
}
