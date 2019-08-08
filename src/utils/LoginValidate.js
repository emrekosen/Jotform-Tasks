import Validator from "validator";

export default function validateInput(data) {
  if (Validator.isEmpty(data.username)) {
    console.log("false");
    return false;
  }
  if (Validator.isEmpty(data.password)) {
    console.log("false");
    return false;
  }
  console.log("true");
  return true;
}
