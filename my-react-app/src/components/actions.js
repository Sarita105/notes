export const CREATE_NOTE = 'CREATE_NOTE';

export const createNote = note => ({
  type: CREATE_NOTE,
  payload: { note },
});
