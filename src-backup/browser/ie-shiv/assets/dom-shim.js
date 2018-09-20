export let toggleClass = body.classList && typeof body.classList.toggle === 'function' ?
(elem, className) => {
  elem.classList.toggle(className)
}
:
(elem, className) => {
  let classes = elem.className.split(' ')
  let classNameExist = classes.indexOf(className) > -1
  if (classNameExist) {
    classes.splice(classNameExist, 1)
  } else {
    classes.push(className)
  }
  elem.className = classes.join(" ")
}
