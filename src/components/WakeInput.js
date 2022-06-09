import React, {useEffect, useState} from 'react'
import {StyleSheet, View, TextInput, Text, Alert} from 'react-native';

export function WakeInput(props) {
    const [value, onChangeText] = React.useState(props.value);

    let onEdit = (value) => {
        onChangeText(value);
        if(props.onEdit) {
            props.onEdit(value);
        }
    }

    return (
        <View style={styles.wakeInput}>
            <Text style={styles.title}>{props.title}</Text>
            <TextInput value={props.value}
                       onChangeText={(text) => onEdit(text)}
                       style={styles.input}
                       placeholder={props.placeholder}>
            </TextInput>
        </View>
    );
}


const styles = StyleSheet.create({
    wakeInput: {
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#929292',
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#FFF',
        overflow: "hidden"
    },
    title: {
        height: "100%",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 20,
        paddingTop: 24,
        fontWeight: "700",
        fontSize: 14,
        textTransform: "uppercase",
        backgroundColor: "#FFF",
        zIndex: 99,
    },
    input: {
        padding: 20,
        textAlign: "right",
        fontWeight: "300",
        fontSize: 16
    },
});