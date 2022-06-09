import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {WakeInput} from "../components/WakeInput";
import {WakeInputCategory} from "../components/WakeInputCategory";
import axios from "axios";
import {MapBoxResult} from "../components/MapBoxResult";
import {WakeRadio} from "../components/WakeRadio";
import {TextInput} from "react-native-web";

export function FormPage() {
    //Ist das richtig? Ist mir eigentlich egal, es funktioniert.
    const [transport, setTransport] = useState("drive");
    const [startLocation, setStartLocation] = useState("");
    const [startLocationGeo, setStartLocationGeo] = useState([]);
    const [startLocationOnEdit, setStartLocationOnEdit] = useState(false);
    const [destinationLocation, setDestinationLocation] = useState("");
    const [destinationLocationGeo, setDestinationLocationGeo] = useState([]);
    const [destinationLocationOnEdit, setDestinationLocationOnEdit] = useState(false);
    const [arrivalTime, setArrivalTime] = useState("");
    const [preparationTime, setPreparationTime] = useState("");
    const [locationList, setLocationList] = useState([]);
    const [resultTime, setResultTime] = useState(undefined);


    useEffect(() => {
        if(startLocation.length > 0) {
            setStartLocationOnEdit(true);
            (async () => {
                setLocationList(await searchLocation(startLocation))
            })();
        }
    }, [startLocation]);

    useEffect(() => {
        if(destinationLocation.length) {
            setDestinationLocationOnEdit(true);
            (async () => {
                setLocationList(await searchLocation(destinationLocation))
            })();
        }
    }, [destinationLocation])

    const onStartLocationSelected = (result) => {
        setStartLocation(result.name);
        setStartLocationGeo(result.geo)
        setTimeout(() => {
            setStartLocationOnEdit(false);
        }, 10)
    }
    const onDestinationLocationSelected = (result) => {
        setDestinationLocation(result.name);
        setDestinationLocationGeo(result.geo);
        setTimeout(() => {
            setDestinationLocationOnEdit(false);
        }, 1)
    }

    const searchLocation = async (param) => {
        return await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+param+'.json?limit=5&language=de&access_token=pk.eyJ1Ijoibmljb2xhc2dvbGZpZXIiLCJhIjoiY2w0MzlmeWZmMDFnaDNvb2RjcnplejgxYSJ9.1cLOEm9hmVgwvMepNifWzw')
            .then((res) => {
                return res.data.features;
            })
    }
    const onSubmit = async () => {
        //Alert.alert(startLocation)

        /*
        example object
        {
            startLocation: [
                13.3344, //lat
                52.52424 //lng
            ],
            destinationLocation: [
                13.3344, //lat
                52.52424 //lng
            ],
            arrivalTime: '08:00', //time of arrival
            preparationTime: '25', //mins of preparation (standing up, breakfast ...),
            transport: 'publicTransport' //publicTransport | car
        }
         */

        await axios({
            method: 'post',
            url: 'https://wakeapp-api.ho-me.zone/time',
            data: {
                startLocation: startLocation,
                destinationLocation: destinationLocation,
                arrivalTime: arrivalTime,
                preparationTime: preparationTime,
                transport: transport
            },
            headers: {
                'X-WA-Auth': 'ad6da46a9e74',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            }
        }).then((result) => {setResultTime(result.time)})
    }

    return (
        <View style={styles.container}>
            <WakeInputCategory title="Art"></WakeInputCategory>
            <View style={styles.transportMethods}>
                <WakeRadio onSelected={setTransport}
                           selected={transport === "drive"}
                           value="drive"></WakeRadio>
                <WakeRadio onSelected={setTransport}
                           selected={transport === "bicycle"}
                           value="bicycle"></WakeRadio>
                <WakeRadio onSelected={setTransport}
                           selected={transport === "walk"}
                           value="walk"></WakeRadio>
                <WakeRadio onSelected={setTransport}
                           selected={transport === "transit"}
                           value="transit"></WakeRadio>
            </View>

            <WakeInputCategory title="Fahrt"></WakeInputCategory>
            <WakeInput title="Start"
                       value={startLocation}
                       onEdit={setStartLocation}
                       isOnFocus={setStartLocationOnEdit}></WakeInput>
            {(locationList && startLocationOnEdit) && <MapBoxResult list={locationList} onSelected={(result) => onStartLocationSelected(result)}></MapBoxResult>}

            <WakeInput title="Ziel"
                       value={destinationLocation}
                       onEdit={setDestinationLocation}
                       isOnFocus={setDestinationLocationOnEdit}
            ></WakeInput>
            {(locationList && destinationLocationOnEdit) && <MapBoxResult list={locationList} onSelected={(result) => onDestinationLocationSelected(result)}></MapBoxResult>}

            <WakeInputCategory title="Zeiten"></WakeInputCategory>
            <WakeInput title="Ankunftszeit"
                       placeholder="8:00"
                       onEdit={setArrivalTime}
            ></WakeInput>
            <WakeInput title="Vorbereitungszeit (in min)"
                       placeholder="25"
                       onEdit={setPreparationTime}
            ></WakeInput>
            <TouchableHighlight onPress={onSubmit}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Jetzt Berechnen</Text>
                </View>
            </TouchableHighlight>


            {(resultTime) &&
                <View style={styles.result}>
                    <View style={styles.resultModal}>
                        <Text style={styles.resultModalTime}>{resultTime}</Text>
                        <Text style={styles.resultModalDetail}>Berechnete Weckzeit</Text>
                        <TouchableHighlight onPress={() => setResultTime(undefined)}>
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>Neu</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        backgroundColor: "#FFCF24",
        padding: 15,
        borderRadius: 14,
    },
    buttonText: {
        fontWeight: "700",
        fontSize: 18,
        textAlign: "center",
        textTransform: "uppercase"
    },
    transportMethods: {
        display: "flex",
        flexDirection: "row"
    },
    result: {
        top: -40,
        left: -10,
        height: "106%",
        width: "106%",
        backgroundColor: "rgba(206, 206, 206, 0.59)",
        position: "absolute",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    resultModal: {
        width: "90%",
        backgroundColor: "#FFF",
        padding: 20,
        marginBottom: 20,
        borderRadius: 15
    },
    resultModalTime: {
        fontWeight: "100",
        fontSize: 40,
        textAlign: "center"
    },
    resultModalDetail: {
        fontWeight: "700",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 20
    }
});