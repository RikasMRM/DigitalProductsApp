import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Create: undefined;
  Products: undefined;
  ProductDetails: { productId: string };
  AdditionalDetails: { productId: string };
};

export type CreateScreenProps = NativeStackScreenProps<RootStackParamList, 'Create'>;
export type ProductsScreenProps = NativeStackScreenProps<RootStackParamList, 'Products'>;
export type ProductDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;
export type AdditionalDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'AdditionalDetails'>;
