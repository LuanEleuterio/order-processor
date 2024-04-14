db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'app_database',
    },
  ],
});
