import { format } from "date-fns";

export default function formatDate(date?: Date | string): string {
  if (!date) return "";

  let d;
  if (typeof date === "string") {
    d = new Date(date);
  } else if (date instanceof Date) {
    d = date;
  } else {
    throw new Error(
      "Bad call to formatDate: param 'date' was not of type Date, string, or undefiend"
    );
  }

  return format(d, "M/d/yyyy");
}
