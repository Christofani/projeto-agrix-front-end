export interface Crop {
  id: number;
  name: string;
  plantedArea: number;
  plantedDate: string;
  harvestDate: string;
  farmId: number; // ID da fazenda associada à plantação
}