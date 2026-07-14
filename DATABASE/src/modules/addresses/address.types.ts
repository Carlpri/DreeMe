export interface CreateAddressDto {
  fullName: string;
  phone: string;
  county: string;
  city: string;
  area: string;
  street: string;
  building?: string;
  postalCode?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  label?: string;
  isDefault?: boolean;
}

export interface UpdateAddressDto {
  fullName?: string;
  phone?: string;
  county?: string;
  city?: string;
  area?: string;
  street?: string;
  building?: string;
  postalCode?: string;
  landmark?: string;
  latitude?: number;
  longitude?: number;
  label?: string;
  isDefault?: boolean;
}
