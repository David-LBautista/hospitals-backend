const getMenuFront = (role = 'USER_ROLE' | 'ADMIN_ROLE') => {
  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', path: '/' },
        { title: 'Progress', path: 'progress' },
        { title: 'Graphics', path: 'graph' },
        { title: 'Promises', path: 'promises' },
        { title: 'Rxjs', path: 'rxjs' },
      ],
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        //{ title: 'Users', path: 'users'},
        { title: 'Hospitals', path: 'hospitals' },
        { title: 'Doctors', path: 'doctors' },
      ],
    },
  ];
  if (role === 'ADMIN_ROLE') {
    menu[1].submenu.unshift({ title: 'Users', path: 'users' });
  }
  return menu;
};

module.exports = {
  getMenuFront,
};
