import { Link } from '../shared/models/link.model';

export class Routes {
  constructor(
    public left?: Link[],
    public right?: Link[]
  ) { }
}

export const defaultLinks: Routes = {
  left: [
  ],
  right: [
  ]
};

export const employeeLinks: Routes = {
  left: [
    { label: "Order", path: "order", icon: "add_circle" },
    { label: "Tables", path: "tables", icon: "tab" },
    { label: "Orders", path: "orders", icon: "receipt" },
  ],
  right: [
    { label: "My profile", path: "my-profile", icon: "account_circle" },
    { label: "Logout", path: "logout", isDialog: true, icon: 'exit_to_app' }
  ]
};

export const adminLinks: Routes = {
  left: [
    ...employeeLinks.left
  ],
  right: [
    {
      label: "Admin", path: "admin", icon: "build", isOpened: true, children: [
        { label: "Users", path: "users", icon: "people" },
        { label: "Products", path: "products", icon: "fastfood" },
        { label: "Categories", path: "categories", icon: "bookmark" },
        { label: "Tables", path: "tables", icon: "tab" }
      ]
    },
    ...employeeLinks.right
  ]
};
