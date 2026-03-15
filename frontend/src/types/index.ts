export interface Caterer {
  _id: string;
  name: string;
  location: string;
  pricePerPlate: number;
  cuisines: string[];
  rating: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  message: string;
}
