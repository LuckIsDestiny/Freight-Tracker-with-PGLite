export type Shipper = {
  id: string;
  contactPerson: string;
  contactPhone: string | null;
  contactEmail: string | null;
  company: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateShipperInput = {
  contactPerson: string;
  contactPhone?: string;
  contactEmail?: string;
  company: string;
};

export type UpdateShipperInput = {
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  company?: string;
};
