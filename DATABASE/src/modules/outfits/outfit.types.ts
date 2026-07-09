export interface CreateOutfitDto {
  title: string;
  description: string;
  style: string;
  coverImage?: string;
  productIds: string[];
}

export interface UpdateOutfitDto {
  title?: string;
  description?: string;
  style?: string;
  coverImage?: string;
  productIds?: string[];
}
