export interface ICategories {
  id: number;
  hierarchyId: number;
  name: string;
  slug: string;
  level: number;
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

export interface IPagination {
  totalItems: number;
  totalPages: number;
  currentPages: number;
}
