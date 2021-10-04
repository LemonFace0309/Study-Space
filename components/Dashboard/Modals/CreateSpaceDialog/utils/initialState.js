export const visibilityEnum = {
  private: 'Private',
  public: 'Public',
};

export const features = {
  chat: 'chat',
  camera: 'camera',
  microphone: 'microphone',
};

const setInitialState = (defaults) => ({
  name: 'My Study Space',
  description: '',
  visibility: visibilityEnum.private,
  studyPattern: 50,
  features: [features.chat, features.camera, features.microphone],
  ...defaults,
});

export default setInitialState;
