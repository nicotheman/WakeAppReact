import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

export function MapBoxResult({list, onSelected}) {
    const onPress = (item) => {
        onSelected({
            geo: [
                item.geometry.coordinates[0].toString(),
                item.geometry.coordinates[1].toString(),
            ],
            name: item.place_name_de
        })
    }
    return (
        <View style={styles.resultBox}>
            {list.map((item, index) => (
                <TouchableHighlight key={index}
                                    onPress={() => onPress(item)}>
                    <Text style={styles.resultItem}>{item.place_name_de}</Text>
                </TouchableHighlight>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    resultBox: {
        position: "absolute",
        bottom: -10,
        left: -10,
        zIndex: 999,
        backgroundColor: '#FFF',
        width: 1080
    },
    resultItem: {
        padding: 15,
        borderBottomColor: '#000',
        borderBottomWidth: 1
    }
});