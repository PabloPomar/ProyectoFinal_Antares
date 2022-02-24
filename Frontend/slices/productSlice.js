import { createSlice } from "@reduxjs/toolkit";

// pasamos el estado inicial de la app
const initialState = {
  selectedProducts: {},
  productTypes: ["cerveza", "hamburguesa", "pizza"],
  productList: {
    kolsch1: {
      id: "kolsch1",
      title: "Kölsch",
      type: "cerveza",
      subtitle: "dorada / suave / fresca / frutada",
      desc: "Existen muchas cervezas doradas y refrescantes. Pero frutadas y con destellos finales de lúpulo, sólo hay un estilo: la Kölsch. En Antares rescatamos la antigua receta de la cerveza favorita de los bebedores en colonia, Alemania, y la honramos desde 1998. En nuestra cocina, su legado sigue intacto.",
      alcVol: "5%",
      ibu: 22,
      amargor: "2/4",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/antaresfacu-17d20.appspot.com/o/productos%2Fcervezas%2Fkolsch_beer.png?alt=media&token=0b744a21-74d5-4983-aaa6-adc6c11662e9",
      quantity: 0,
    },
    scotch1: {
      id: "scotch1",
      title: "Scotch",
      type: "cerveza",
      subtitle: "rubí / maltosa / dulce / con cuerpo",
      desc: "Escocia es tierra de cebada y la Scotch Ale lleva ese paisaje impregnado en su código genético. Rubí intenso. Seis grados de alcohol. Dulce y maltosa. La Antares más servida en nuestro Brewpub. Una fórmula a prueba del paso del tiempo.",
      alcVol: "6%",
      ibu: 18,
      amargor: "1/4",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/antaresfacu-17d20.appspot.com/o/productos%2Fcervezas%2Fscotch_beer.png?alt=media&token=a3ed2418-6382-4541-9dbe-e996a565bcf6",
      quantity: 0,
    },
    porter1: {
      id: "porter1",
      title: "Porter",
      type: "cerveza",
      subtitle: "marrón oscura / chocolate / café",
      desc: "Maltas oscuras. Sabor y aroma penetrante y nocturno. Chocolate, azúcar negro y café. La Porter es la cerveza tributo de Antares a la cultura de los primeros pubs en el puerto de Londres. Cheers.",
      alcVol: "5,5%",
      ibu: 27,
      amargor: "2/4",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/antaresfacu-17d20.appspot.com/o/productos%2Fcervezas%2Fporter_beer.png?alt=media&token=070b0f73-9ba4-4d75-ac16-999fd65f2b35",
      quantity: 0,
    },
    barleywine1: {
      id: "barleywine1",
      title: "Barley Wine",
      type: "cerveza",
      subtitle: "bronce / compleja / fuerte / corpulenta",
      desc: "Nuestra cerveza de mayor graduación alcohólica. Una hermandad de malta y licor, con rasgos de nuez, caramelo y dulce de leche. Barley Wine, cuando la vid se vuelve cebada.",
      alcVol: "10%",
      ibu: 53,
      amargor: "3/4",
      imageURL:
        "https://firebasestorage.googleapis.com/v0/b/antaresfacu-17d20.appspot.com/o/productos%2Fcervezas%2Fbarleywine_beer.png?alt=media&token=9ae135c2-7cba-415b-8263-925786b26867",
      quantity: 0,
    },
  },
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeProductQuantity: (state, action) => {
      state.productList[action.payload.id].quantity = action.payload.quantity;
    },
    addToRemoveFromCart: (state, action) => {
      if (state.selectedProducts[action.payload.id]) {
        if (action.payload.quantity == 0) {
          delete state.selectedProducts[action.payload.id];
        } else {
          state.selectedProducts[action.payload.id] = action.payload.quantity;
        }
      } else {
        state.selectedProducts[action.payload.id] = action.payload.quantity;
      }
    },
  },
});

// Actions
export const { changeProductQuantity, addToRemoveFromCart } =
  productSlice.actions;

// Selectors
export const selectProducts = (state) => state.products;
export const selectOrder = (state) => state.products.selectedProducts;

export default productSlice.reducer;
