import { SaleDTO } from "./SaleDTO";

export type RootStackParamList = {
    Home: undefined;
    VendasList: undefined;
    RegisterSale: undefined;
    ManageSales: undefined;
    SalesItemDetail: { sale: SaleDTO  };
    SalesEdit: { sale: SaleDTO, onSave?: (updated: SaleDTO) => void; };
};