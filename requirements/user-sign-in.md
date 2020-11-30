# User Sign In

> ## Success case

1. ✅ Receives a request of type **POST** on route **/v1/user/signin**
2. ✅ Validate required data **email**, **password**
3. ✅ Validate field **email** is valid
4. ✅ **Find** the user by email
4. ✅ **Compare** the password of the request with that of the database
6. ✅ Generates an access **token** from the user ID
7. ✅ Returns **200** with user's ID, name and access token

> ## Exceptions

1. ✅ Returns error **404** if API doesn't exist
2. ✅ Returns error **400** if email and password doesn't provided by user
3. ✅ Returns error **400** if email isn't valid
4. ✅ Returns error **403** if email already exists
5. ✅ Returns error **404** if email not found in database
6. ✅ Returns error **401** if check validation password fails
7. ✅ Returns error **422** if error when try to generate access token

