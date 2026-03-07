import { IGroupedAttribute } from '../types/product.types';

interface IAttributes {
  handleSelect: (attributeId: number, valueId: number) => void;
  selectedAttributes: Record<number, number>;
  groupedAttributes: IGroupedAttribute[];
}

export default function Attributes({
  handleSelect,
  groupedAttributes,
  selectedAttributes,
}: IAttributes) {
  return (
    <div>
      {groupedAttributes.map((attr) => {
        const selectedValueId = selectedAttributes[attr.attributeId];
        const selectedValue = attr.values.find(
          (v) => v.id === selectedValueId,
        )?.value;
        return (
          <div key={attr.attributeId} className="my-2">
            <h4>{attr.attributeName}</h4>
            <div className="flex space-x-2 flex-wrap">
              {attr.values.map((value) => {
                const isSelected = selectedValueId === value.id;

                if (value.hexUrl) {
                  return (
                    <input
                      key={value.value}
                      type="radio"
                      id={value.value}
                      checked={isSelected}
                      disabled={!value.inStock}
                      aria-label={value.value}
                      onChange={() => handleSelect(attr.attributeId, value.id)}
                      title={value.value}
                      className="appearance-none p-3 sm:p-4 m-1 rounded-full hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 checked:ring-1 checked:ring-black/90 checked:ring-offset-2 checked:ring-offset-slate-100"
                      style={{ backgroundColor: value.hexUrl }}
                    />
                  );
                }

                return (
                  <div key={value.value} className="my-3">
                    <input
                      type="radio"
                      id={value.value}
                      className="hidden peer"
                      disabled={!value.inStock}
                      name={attr.attributeName}
                      checked={isSelected}
                      aria-label={value.value}
                      onChange={() => handleSelect(attr.attributeId, value.id)}
                    />
                    <label
                      htmlFor={value.value}
                      className={`py-2 px-4 mb-2 rounded-md border hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 peer-checked:ring-1 peer-checked:ring-black/90 peer-checked:ring-offset-2 peer-checked:ring-offset-slate-100 ${value.inStock ? '' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70'}`}
                    >
                      {value.value}
                    </label>
                  </div>
                );
              })}
            </div>
            {selectedValue && (
              <p className="text-sm opacity-50">
                {attr.attributeName}: {selectedValue}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
