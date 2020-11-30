# User Sign Up

> ## Success case

1. ✅ Receives a request of type **POST** on route **/v1/user/signup**
2. ✅ Validate required data **name**, **email**, **password**
3. ✅ Validate field **email** is valid
4. ✅ **Validate** if email already exists
5. ✅ **Creates** an account with informed data
6. ✅ Generates an access **token** from the user ID
7. ✅ Returns **201** with ID, user's name and access token

> ## Exceptions

1. ✅ Returns error **404** if API doesn't exist
2. ✅ Returns error **400** if name, email and password doesn't provided by user
3. ✅ Returns error **400** if email isn't valid
4. ✅ Returns error **403** if email already exists
5. ✅ Returns error **422** if error when create user account
6. ✅ Returns error **422** if error when try to generate access token
