import type { Carrier } from "../../types/carrier";
import type { Column } from "../../types/column";
import { getLocaleDate } from "../../utils/formatDate";

export const carrierColumns: Column<Carrier>[] = [
  { header: "Name", cell: (carrier) => carrier.name },
  { header: "MCNumber", cell: (carrier) => carrier.mcNumber },
  {
    header: "ContactPerson",
    cell: (carrier) => carrier.contactPerson,
  },
  {
    header: "ContactEmail",
    cell: (carrier) => (carrier.contactEmail ? carrier.contactEmail : "NA"),
  },
  {
    header: "ContactPhone",
    cell: (carrier) => carrier.contactPhone,
  },
  {
    header: "CreatedAt",
    cell: (carrier) => getLocaleDate(carrier.createdAt),
  },
  {
    header: "UpdatedAt",
    cell: (carrier) => getLocaleDate(carrier.updatedAt),
  },
];
