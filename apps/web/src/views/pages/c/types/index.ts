export interface ICategories {
  id: number;
  name: string;
  slug: string;
  subcategories?: ICategories[];
}

export interface IAttributeValue {
  id: number;
  value: string;
  slug: string;
  hexUrl?: string;
}

export interface IAttribute {
  id: number;
  name: string;
  slug: string;
  attributeValues: IAttributeValue[];
}
