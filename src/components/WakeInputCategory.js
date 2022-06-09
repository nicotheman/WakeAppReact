import * as React from "react";
import {StyleSheet, View, Text} from 'react-native';

export function WakeInputCategory(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontWeight: "700",
        textTransform: "uppercase",
        fontSize: 14,
        textAlign: "left",
    }
})