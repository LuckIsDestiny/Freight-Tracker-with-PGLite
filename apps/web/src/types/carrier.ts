export type Carrier = {
  id: string;
  mcNumber: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateCarrierInput = {
  mcNumber: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  name: string;
};

export type UpdateCarrierInput = {
  mcNumber?: string;
  contactPerson?: string;
  contactPhone?: string;
  contactEmail?: string;
  name?: string;
};
