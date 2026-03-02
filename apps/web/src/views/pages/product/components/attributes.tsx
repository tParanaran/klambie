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
          <div key={attr.attributeId} className="my-3">
            <h4>{attr.attributeName}</h4>
            <div className="flex space-x-2">
              {attr.values.map((value) => {
                const isSelected = selectedValueId === value.id;

                if (value.hexUrl) {
                  return (
                    <input
                      type="radio"
                      checked={isSelected}
                      key={value.id}
                      onChange={() => handleSelect(attr.attributeId, value.id)}
                      title={value.value}
                      className="appearance-none p-5 sm:p-4 m-1 rounded-full hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 checked:ring-1 checked:ring-black/90 checked:ring-offset-2 checked:ring-offset-slate-100"
                      style={{ backgroundColor: value.hexUrl }}
                    />
                  );
                }

                return (
                  <div key={value.id} className="my-4">
                    <input
                      type="radio"
                      id={value.value}
                      className="hidden peer"
                      name="Size"
                      checked={isSelected}
                      aria-label={value.value}
                      onChange={() => handleSelect(attr.attributeId, value.id)}
                    />
                    <label
                      htmlFor={value.value}
                      className="py-2 px-4 mb-2 rounded-md border hover:ring hover:ring-black/90 hover:ring-offset-1 hover:ring-offset-slate-100 peer-checked:ring-1 peer-checked:ring-black/90 peer-checked:ring-offset-2 peer-checked:ring-offset-slate-100"
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
