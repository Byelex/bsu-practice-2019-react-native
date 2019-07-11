import React from 'react';
import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import cities from '../current.city.list.min';
import RadioForm from 'react-native-radio-form';
import Colors from "../constants/Colors";
import {choseBackgroundColor, getCurrentCoordinates} from "../utils";
import {MonoText} from "../components/StyledText";

let radio_props = [
    {label: 'Kelvin', value: ''},
    {label: 'Fahrenheit', value: 'imperial'},
    {label: 'Celsius', value: 'metric'}
];

export default class SettingsScreen extends React.Component {

    render() {
        return (
            <View>
                <View style={styles.container}>

                    <View style={styles.subcontainer}>
                        <MonoText style={styles.text}>
                            Location
                        </MonoText>
                        <MonoText style={styles.subtext}>
                            {this.props.city}
                        </MonoText>
                    </View>

                    <MonoText style={styles.label}>
                        Find by geolocation
                    </MonoText>

                    <Button
                        onPress={() => getCurrentCoordinates().then(res => this.props.changeLocation(...res))}
                        title="Get my location"
                        color={Colors.buttonColor}
                    />

                    <MonoText style={styles.label}>
                        Find by name
                    </MonoText>
                    <SearchableDropdown
                        containerStyle={{
                            padding: 1
                        }}
                        onItemSelect={item => {
                            this.props.changeLocation(item.coord.lat, item.coord.lon)
                        }}
                        textInputStyle={{
                            padding: 12,
                            borderWidth: 1,
                            backgroundColor: 'white',
                            borderColor: Colors.evening,
                            borderRadius: 5,
                        }}
                        itemStyle={{
                            padding: 11,
                            marginTop: 2,
                            backgroundColor: 'white',
                            borderColor: Colors.evening,
                            borderWidth: 2,
                            borderRadius: 5,
                        }}
                        itemTextStyle={{color: 'black'}}
                        itemsContainerStyle={{
                            maxHeight: 140
                        }}
                        items={cities}
                        defaultIndex={0}
                        placeholder="Start typing"
                        placeholderTextColor={'grey'}
                        resetValue={true}
                        underlineColorAndroid="transparent"
                    />
                </View>

                <View style={styles.container}>
                    <MonoText style={styles.text}>
                        API key
                    </MonoText>
                    <MonoText style={styles.label}>
                        Set API key
                    </MonoText>
                    <TextInput
                        style={{
                            height: 53,
                            backgroundColor: 'white',
                            borderColor: Colors.evening,
                            borderWidth: 1,
                            paddingLeft: 13,
                            borderRadius: 5,
                        }}
                        placeholder="Start typing"
                        placeholderTextColor={'grey'}
                        onChangeText={(text) => this.setState({text})}
                        value={this.props.api_key}
                    />
                    <View style={{
                        padding: 5,
                        alignSelf: 'center',
                        width: 100
                    }}>
                        <Button
                            onPress={() => alert("JSON.stringify(value)")}
                            title="Submit"
                            color={Colors.buttonColor}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <MonoText style={styles.text}>
                        Temperature metric
                    </MonoText>
                    <RadioForm
                        initial={this.props.units}
                        dataSource={radio_props}
                        outerColor={'white'}
                        innerColor={Colors.buttonColor}
                        formHorizontal={false}
                        circleSize={30}
                        labelHorizontal={true}
                        onPress={radio => this.props.changeUnit(radio.value)}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        margin: 5,
        borderBottomColor: Colors.tabIconDefault,
        borderBottomWidth: 2,
        backgroundColor: choseBackgroundColor()
    },
    subcontainer: {
        flexDirection: 'row',
    },
    text: {
        fontWeight: 'bold',
        marginRight: 'auto',
        color: 'white',
        fontSize: 20,
        padding: 5
    },
    subtext: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingTop: 8
    },
    label: {
        color: 'white',
        fontSize: 16,
        paddingLeft: 10,
        paddingVertical: 5
    }
});

SettingsScreen.navigationOptions = {
    title: 'Settings',
};