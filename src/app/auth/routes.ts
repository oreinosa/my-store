import { Link } from '../shared/models/link.model';

export const defaultLinks: Link[] = [
  { label: "Deals", path: "deals", },
  { label: "Gift cards", path: "gift-cards" },
  { label: "Stores", path: "stores" },
  { label: "Contact us", path: "contact-us" },
];

export const adminLinks: Link[] = [
  ...defaultLinks,
  {
    label: "Admin", path: "admin", children: [
      { label: "Users", path: "users" },
      { label: "Products", path: "products" },
      { label: "Categories", path: "categories" },

    ]
  }
];