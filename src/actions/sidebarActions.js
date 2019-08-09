export const toggleHandler = () => (dispatch, getState) => {
  const wrapper = document.getElementById("wrapper");
  if (wrapper.className.indexOf("toggled") > -1) {
    wrapper.classList.remove("toggled");
  } else {
    wrapper.classList.add("toggled");
  }
};
