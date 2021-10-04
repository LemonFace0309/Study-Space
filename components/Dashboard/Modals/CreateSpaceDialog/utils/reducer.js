import produce from 'immer';

const reducer = produce((draft, action) => {
  switch (action.type) {
    default:
      console.warn('Action type not found. Returning default state');
      return draft;
  }
});

export default reducer;
