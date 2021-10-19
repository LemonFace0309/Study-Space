import { visibilityEnum, features } from './reducer';

const setInitialState = (defaults) => ({
  name: 'My Study Space',
  description: '',
  visibility: visibilityEnum.private,
  studyPattern: [50, 10],
  features: [features.chat, features.camera, features.microphone],
  ...defaults,
});

export default setInitialState;
