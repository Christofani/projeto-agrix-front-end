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
  farmId: number
}

export interface CropDetailsProps {
  cropId: number;
  onBack: () => void;
}

export interface CreateCropProps {
  onCancel?: () => void;
}

export interface CropListProps {
  onNavigate: (cropId?: number) => void;
}