import Validator from "validator";

export default function validateInput(data) {
  if (Validator.isEmpty(data.username)) {
    return false;
  }
  if (Validator.isEmpty(data.password)) {
    return false;
  }
  return true;
}
