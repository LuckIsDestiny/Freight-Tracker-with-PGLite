import type { Shipper } from "../../types/shipper";
import type { Column } from "../../types/column";
import { getLocaleDate } from "../../utils/formatDate";

export const shipperColumns: Column<Shipper>[] = [
  { header: "Company", cell: (shipper) => shipper.company },
  {
    header: "ContactPerson",
    cell: (shipper) => shipper.contactPerson,
  },
  {
    header: "ContactEmail",
    cell: (shipper) => (shipper.contactEmail ? shipper.contactEmail : "NA"),
  },
  {
    header: "ContactPhone",
    cell: (shipper) => (shipper.contactPhone ? shipper.contactPhone : "NA"),
  },
  {
    header: "CreatedAt",
    cell: (shipper) => getLocaleDate(shipper.createdAt),
  },
  {
    header: "UpdatedAt",
    cell: (shipper) => getLocaleDate(shipper.updatedAt),
  },
];
