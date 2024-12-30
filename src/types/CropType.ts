import { Fertilizer } from "./FertilizerType";

export interface Crop {
  id: number;
  name: string;
  plantedArea: number;
  plantedDate: string;
  harvestDate: string;
  farmId: number; //
  fertilizers: Fertilizer[];
}

export interface CreateCropType {
  name: string;
  plantedArea: number;
  plantedDate: string;
  harvestDate: string;
  farmId: number // ID da fazenda associada à plantação
}

export interface CropDetailsProps {
  cropId: number;
  onBack: () => void;
}

export interface CreateCropProps {
  onCancel?: () => void; // Função para cancelar
}

export interface CropListProps {
  onNavigate: (cropId: number) => void;
}