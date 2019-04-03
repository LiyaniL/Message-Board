 var rbac = require('mongoose-rbac');
 
rbac.init({
  admin: [
    ['create', 'Post'],
    ['read', 'Post'],
    ['update', 'Post'],
    ['delete', 'Post']
  ],
  readonly: [
    // we can also specify permissions as an object
    { action: 'read', subject: 'Post' }
  ]
}, function (err, admin, readonly) {
  console.log(admin);
  console.log(readonly);
});