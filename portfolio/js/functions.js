export function addClassName(className,...elements) {
  for (let element of elements) {
    element.classList.add(className);
  }
}

export function removeClassName(className,...elements) {
  for (let element of elements) {
    element.classList.remove(className);
  }
}

export function toggleClassName(className,...elements) {
  for (let element of elements) {
    element.classList.toggle(className);
  }
}
