export interface Customer {
  ID: number;
  CompanyName: string;
  IsActive: boolean;
  Zipcode: number;
  CategoryId: number;
}

export interface Category {
  id: number;
  parentId: number;
  name: string;
}

export const customers: Customer[] = [
  {
    ID: 1,
    CompanyName: 'Super Mart of the West',
    IsActive: true,
    Zipcode: 72716,
    CategoryId: 2,
  },
  {
    ID: 2,
    CompanyName: 'Electronics Depot',
    IsActive: false,
    Zipcode: 30339,
    CategoryId: 3,
  },
  {
    ID: 3,
    CompanyName: 'K&S Music',
    IsActive: true,
    Zipcode: 55403,
    CategoryId: 3,
  },
  {
    ID: 4,
    CompanyName: "Tom's Club",
    IsActive: true,
    Zipcode: 98027,
    CategoryId: 5,
  },
  {
    ID: 5,
    CompanyName: 'E-Mart',
    IsActive: false,
    Zipcode: 60179,
    CategoryId: 1,
  },
  {
    ID: 6,
    CompanyName: 'Office Supplies Co',
    IsActive: true,
    Zipcode: 10001,
    CategoryId: 2,
  },
  {
    ID: 7,
    CompanyName: 'Home Comforts',
    IsActive: false,
    Zipcode: 60601,
    CategoryId: 6,
  },
  {
    ID: 8,
    CompanyName: 'Tech World',
    IsActive: true,
    Zipcode: 94016,
    CategoryId: 1,
  },
  {
    ID: 9,
    CompanyName: 'Furniture Hub',
    IsActive: true,
    Zipcode: 75001,
    CategoryId: 4,
  },
  {
    ID: 10,
    CompanyName: 'Mobile Express',
    IsActive: false,
    Zipcode: 33101,
    CategoryId: 3,
  },
];

export const categories: Category[] = [
  { id: 1, parentId: 0, name: 'Electronics' },
  { id: 2, parentId: 1, name: 'Laptops' },
  { id: 3, parentId: 1, name: 'Phones' },
  { id: 4, parentId: 0, name: 'Furniture' },
  { id: 5, parentId: 4, name: 'Chairs' },
  { id: 6, parentId: 4, name: 'Tables' },
];