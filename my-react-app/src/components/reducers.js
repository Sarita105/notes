import { CREATE_NOTE } from "./actions";
const initialState = { data: [] };
export const notes = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_NOTE: {
      const { note } = payload;
      const newNote = {
        note: note, isCompleted: false, id: state.data.length +1
      };
       return state.concat(newNote);
      return {
        ...state,
        data: state.data.concat(newNote),
      };
    }
  }
};
