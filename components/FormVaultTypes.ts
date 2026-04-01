export type FormFieldType = "text" | "email" | "number" | "textarea" | "dropdown";

export type FormField = {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options: string[];
};

export type FormResponse = {
  id: string;
  timestamp: string;
  values: Record<string, string>;
};
