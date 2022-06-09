import React, {useEffect, useState} from 'react'
import {StyleSheet, View, Text, TouchableHighlight, Image} from 'react-native';
import {Touchable} from "react-native-web";

export function WakeRadio({onSelected, selected, value}) {
    let icon = require('./icons/bicycle.png');
    switch(value) {
        case "bicycle":
            icon = require('./icons/bicycle.png');
            break;
        case "drive":
            icon = require('./icons/drive.png');
            break;
        case "transit":
            icon = require('./icons/transit.png')
            break;
        case "walk":
            icon = require('./icons/walk.png')
            break;
    }
    return (
        <TouchableHighlight style={[styles.WakeRadio, selected ? styles.selected : '']} onPress={() => onSelected(value)}>
            <View>
                {(value) &&
                    <Image style={styles.Image} source={icon}></Image>
                }
            </View>
        </TouchableHighlight>
    )
}
const styles = StyleSheet.create({
    WakeRadio: {
        backgroundColor: "#FFF",
        width: 55,
        height: 55,
        padding: 10,
        borderRadius: 15,
        margin: 5
    },
    selected: {
        backgroundColor: "#ffcf24"
    },
    Image: {
      width: 35,
      height: 35
    }
})