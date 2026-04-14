interface IState {
  ui: {
    openAttrId: number | null;
  };
  data: {
    attributes: Record<
      number,
      {
        selected: number[];
      }
    >;
  };
  config: {
    imageBasedAttrId: number | null;
  };
}

export const initialState: IState = {
  ui: { openAttrId: null },
  data: { attributes: {} },
  config: { imageBasedAttrId: null },
};

type Action =
  | { type: 'TOGGLE_OPEN'; id: number }
  | { type: 'TOGGLE_VALUE'; attrId: number; valueId: number }
  | { type: 'SET_IMAGE_ATTR'; id: number | null }
  | { type: 'RESET' };

export function reducer(state: IState, action: Action): IState {
  switch (action.type) {
    case 'TOGGLE_OPEN':
      return {
        ...state,
        ui: {
          openAttrId: state.ui.openAttrId === action.id ? null : action.id,
        },
      };

    case 'TOGGLE_VALUE': {
      const current = state.data.attributes[action.attrId] ?? {
        selected: [],
      };

      const exists = current.selected.includes(action.valueId);

      return {
        ...state,
        data: {
          attributes: {
            ...state.data.attributes,
            [action.attrId]: {
              selected: exists
                ? current.selected.filter((v) => v !== action.valueId)
                : [...current.selected, action.valueId],
            },
          },
        },
      };
    }

    case 'SET_IMAGE_ATTR':
      return {
        ...state,
        config: {
          imageBasedAttrId:
            state.config.imageBasedAttrId === action.id ? null : action.id,
        },
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}
