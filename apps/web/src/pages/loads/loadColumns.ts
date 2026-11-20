import type { Column } from "../../types/column";
import type { Load } from "../../types/load";
import { getLocaleDate } from "../../utils/formatDate";

export const loadColumns: Column<Load>[] = [
  { header: "Origin", cell: (load) => load.origin },
  { header: "Destination", cell: (load) => load.destination },
  {
    header: "Status",
    cell: (load) => load.status,
  },
  {
    header: "Est. Pickup",
    cell: (load) =>
      load.estimatedPickupDate ? getLocaleDate(load.estimatedPickupDate) : "NA",
  },
  {
    header: "Est. Delivery",
    cell: (load) =>
      load.estimatedDeliveryDate
        ? getLocaleDate(load.estimatedDeliveryDate)
        : "NA",
  },
  {
    header: "PickedUpAt",
    cell: (load) => (load.pickedUpAt ? getLocaleDate(load.pickedUpAt) : "NA"),
  },
  {
    header: "DeliveredAt",
    cell: (load) => (load.deliveredAt ? getLocaleDate(load.deliveredAt) : "NA"),
  },
  {
    header: "CreatedAt",
    cell: (load) => getLocaleDate(load.createdAt),
  },
  {
    header: "UpdatedAt",
    cell: (load) => getLocaleDate(load.updatedAt),
  },
];
