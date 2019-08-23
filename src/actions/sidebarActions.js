export const toggleHandler = () => (dispatch, getState) => {
  const wrapper = document.getElementById("sidebar");
  if (wrapper.className.indexOf("active") > -1) {
    wrapper.classList.remove("active");
  } else {
    wrapper.classList.add("active");
  }
  const content = document.getElementById("content");
  if (content.className.indexOf("active") > -1) {
    content.classList.remove("active");
  } else {
    content.classList.add("active");
  }
};
