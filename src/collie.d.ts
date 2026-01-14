// Allows importing Collie templates as React components.
// Customize this typing if your templates expose specific inputs.
declare module "*.collie" {
  import type { ComponentType } from "react";
  const component: ComponentType<Record<string, unknown>>;
  export default component;
}
