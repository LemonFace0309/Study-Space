import produce from 'immer';

export const visibilityEnum = {
  private: 'Private',
  public: 'Public',
};

export const features = {
  chat: 'chat',
  camera: 'camera',
  microphone: 'microphone',
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case 'updateName': {
      draft.name = action.name;
      break;
    }
    case 'updateDescription': {
      draft.description = action.description;
      break;
    }
    case 'updateVisbility': {
      if (Object.values(visibilityEnum).find((val) => val === action.visibility)) {
        draft.visibility = action.visibility;
      }
      break;
    }
    default:
      console.warn('Action type not found. Returning default state');
  }
});

export default reducer;
