// Using jsonwebtoken function
//algorithm needs a secret key (as String) to encode and decode token.
//This key has also been re used to work in encrypt and decrypt of ssn
//admin secret key, which enables users to register as a admin to the portal
//Should ideally have seprate keys for each of the above use cases
module.exports = {
  secret: "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
};
