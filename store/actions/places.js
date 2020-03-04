import * as FileSystem from 'expo-file-system'
import * as actionTypes from './actionTypes'
import { insertPlace, fetchPlaces } from '../../helpers/db'
import ENV from '../../env'

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`)

        if(!response.ok) {
            throw new Error('Something went wrong!')
        }

        const resData = await response.json()
        if(!resData.results) {
            throw new Error('Something went wrong!')
        }

        const address = resData.results[0].formatted_address;
        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            })
            const dbResult = await insertPlace(
                title,
                newPath,
                address,
                location.lat,
                location.lng
            )
            console.log(dbResult)
            dispatch({ type: actionTypes.ADD_PLACE, placeData: {id: dbResult.insertId, title: title, image: newPath, address: address, coords: {lat: location.lat, lng: location.lng} } })
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces()
            
            dispatch({ type: actionTypes.SET_PLACES, places: dbResult.rows._array })
        } catch(err) {
            throw err
        }
    }
}

export const deletePlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await deletePlaces()

            dispatch({ type: actionTypes.DELETE_PLACES })
        } catch(err) {
            throw err
        }
    }
}

