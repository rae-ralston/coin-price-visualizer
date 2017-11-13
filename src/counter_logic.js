const addCounter = list => {
  return [...list, 0];
}

const removeCounter = (list, index) {
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
}

const incrementCounter = (list, index) => {
  return[
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ]
}

const toggleTodo = todo => {
  
}

export default {
  addCounter,
  removeCounter,
  incrementCounter,
  toggleTodo
}
