import * as actionTypes from '../actions/actionTypes'
import Place from '../../models/place'

const INTIAL_STATE = {
    places: []
}

export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case actionTypes.SET_PLACES:
        return {
          places: action.places.map(
            pl => new Place(pl.id.toString(), pl.title, pl.imageUri, pl.address, pl.lat, pl.lng)
          )
        };
      case actionTypes.ADD_PLACE:
        const newPlace = new Place(
          action.placeData.id.toString(),
          action.placeData.title,
          action.placeData.image,
          action.placeData.address,
          action.placeData.coords.lat,
          action.placeData.coords.lng
        );
        return {
          places: state.places.concat(newPlace)
        };
      default:
        return state;
    }
  };