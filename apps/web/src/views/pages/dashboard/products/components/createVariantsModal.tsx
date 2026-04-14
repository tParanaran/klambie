import { useReducer } from 'react';
import { generateCombinations } from '@/utils/addProduct';
import { IProductFormValues } from '../types';
import { useFormikContext } from 'formik';
import useAttribute from '@/views/pages/c/hooks/useAttribute';
import ModalContainer from '@/views/components/modalContainer';
import { initialState, reducer } from '../hooks/useReducer';

interface ICreateVariantModal {
  onClose: () => void;
  onDone: () => void;
  showModal: boolean;
  handlerModal: () => void;
}

export default function CreateVariantModal({
  onClose,
  onDone,
  showModal,
  handlerModal,
}: ICreateVariantModal) {
  const { values, setFieldValue } = useFormikContext<IProductFormValues>();
  const { attributes } = useAttribute();

  const [state, dispatch] = useReducer(reducer, initialState);

  const { ui, data, config } = state;
  const { openAttrId } = ui;
  const { imageBasedAttrId } = config;

  const isValid =
    values.basePrice &&
    values.baseStock &&
    Object.keys(data.attributes).length > 0 &&
    Object.values(data.attributes).every((a) => a.selected.length > 0);

  const handleGenerate = () => {
    if (!isValid) return;

    const arrays = Object.values(data.attributes).map((a) => a.selected);

    const combinations = generateCombinations(arrays);

    const variants = combinations.map((combo) => ({
      attributeValueId: combo,
      stock: values.baseStock ?? '',
      basePrice: values.basePrice ?? '',
      comparePrice: values.comparePrice ?? '',
      barcode: '',
      image: imageBasedAttrId
        ? combo.find((id) =>
            data.attributes[imageBasedAttrId]?.selected.includes(id),
          )
        : null,
    }));

    setFieldValue('productVariants', variants);

    onClose();
    onDone();
  };

  return (
    <ModalContainer
      handlerModal={handlerModal}
      showModal={showModal}
      style="lg:w-5xl z-50 mx-auto bg-secondary-opacity shadow-xl backdrop-blur-xl rounded-2xl p-3 overflow-y-scroll scrollbar-hide max-h-[60vh] h-full mt-[40vh]"
      isFilter
    >
      <h1 className="mb-3 font-semibold text-center text-lg">
        Select Variants
      </h1>

      {attributes.map((attr) => {
        const isOpen = openAttrId === attr.id;
        const selectedAttr = data.attributes[attr.id];
        const isImage = imageBasedAttrId === attr.id;

        return (
          <div key={attr.id} className="mb-3">
            <button
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_OPEN', id: attr.id })}
              className="w-full text-left px-4 h-10 rounded-full bg-black/10 dark:bg-white/10 flex justify-between items-center"
            >
              <span className="flex items-center gap-2">
                {attr.name}

                {isImage && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-orange-600 text-white">
                    IMG
                  </span>
                )}
              </span>

              <span className="text-xs opacity-50 flex items-center gap-2">
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({
                      type: 'SET_IMAGE_ATTR',
                      id: attr.id,
                    });
                  }}
                  className={`px-2 py-1 rounded text-[10px] cursor-pointer ${
                    isImage
                      ? 'bg-orange-600 text-white'
                      : 'bg-black/10 dark:bg-white/10'
                  }`}
                >
                  {isImage ? 'IMG ON' : 'IMG OFF'}
                </span>

                {isOpen ? 'Close' : 'Select'}
              </span>
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-2 px-2 flex flex-wrap gap-2">
                {attr.attributeValues.map((val: any) => {
                  const active = selectedAttr?.selected.includes(val.id);

                  return (
                    <button
                      key={val.id}
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: 'TOGGLE_VALUE',
                          attrId: attr.id,
                          valueId: val.id,
                        })
                      }
                      className={`px-3 py-1 rounded-full text-sm ${
                        active
                          ? 'bg-orange-600 text-white'
                          : 'bg-black/10 dark:bg-white/10'
                      }`}
                    >
                      {val.value}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}

      <button
        disabled={!isValid}
        onClick={handleGenerate}
        className="w-full mt-3 py-2 bg-orange-600 text-white rounded disabled:opacity-50"
      >
        Generate Variants
      </button>

      <button onClick={onClose} className="w-full mt-2 py-2 text-sm opacity-60">
        Cancel
      </button>
    </ModalContainer>
  );
}
