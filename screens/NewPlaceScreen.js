import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Button, TextInput, ScrollView } from 'react-native'
import Colors from '../constants/Colors'
import { useDispatch } from 'react-redux'
import * as action from '../store/actions'
import ImageSelector from '../components/ImageSelector'
import LocationPicker from '../components/LocationPicker'

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('')
    const [selectedImage, setSelectedImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()

    const dispatch = useDispatch()

    const titleChangeHandler = text => {
        setTitleValue(text)
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath)
    }

    const savePlaceHandler = () => {
        dispatch(action.addPlace(titleValue, selectedImage, selectedLocation))
        props.navigation.goBack()
    }

    const locationPickedHandler = useCallback(location => {
        setSelectedLocation(location)
    }, [])

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue}/>
                <ImageSelector onImageTaken={imageTakenHandler}/>
                <LocationPicker navigation={props.navigation} onLocationPicked={locationPickedHandler}/>
                <Button title='Save Place' color={Colors.primary} onPress={savePlaceHandler}/>
            </View>
        </ScrollView>
    )
}

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }

})

export default NewPlaceScreen