export default (state, action) => {
  switch (action.type) {
    case 'dragStart':
      return { ...state, isDragging: true };
    case 'dragEnd':
      return { ...state, isDragging: false };
    case 'dropBefore':
    case 'dropAfter':
      console.log("drop happened", action);
      return { ...state };
    default:
      throw new Error();
  }
}
