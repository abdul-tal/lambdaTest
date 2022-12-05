const { DefaultApi, User } = require('users_and_auth_apis');
const api = new DefaultApi()
const body = new User(); // {User}
const user = {
    "name": "Abdul Rahman-client-3",
    "email": "email-client-3",
    "password": "password"

};
const requestBody = User.constructFromObject(user);

const callback = function(error, data, response) {
  if (error) {
    console.log('\n\n----errorrrrr------')
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ');
    console.log(data);
  }
};
api.registerPost(requestBody, callback);