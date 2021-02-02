import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../constants';
import Sound from 'react-native-sound';
import Color from "color";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { width } = Dimensions.get('screen');

interface PadProps {
    color: string;
    onClick: Function;
    active: boolean;
}

const Pad: React.FC<PadProps> = ({ color, onClick, active }) => {

    let style;
    const lighten = (from: string) => Color(from).lighten(0.333).hex();

    switch (color) {
        case colors.green:
            style = [styles.topLeft, { backgroundColor: active ? lighten(color) : color }];
            break;
        case colors.red:
            style = [styles.topRight, { backgroundColor: active ? lighten(color) : color }];
            break;
        case colors.yellow:
            style = [styles.bottomLeft, { backgroundColor: active ? lighten(color) : color }];
            break;
        case colors.blue:
            style = [styles.bottomRight, { backgroundColor: active ? lighten(color) : color }];
            break;
        default:
            style = null;
            break;
    }
    
    return (
        <TouchableOpacity style={style} onPress={() => onClick()}/>
    );
}

const styles = StyleSheet.create({
    topLeft: {
        margin: 3,
        height: width * 0.4,
        width: width * 0.4,
        borderTopLeftRadius: 320,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20
    },
    topRight: {
        margin: 3,
        height: width * 0.4,
        width: width * 0.4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 320,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    bottomLeft: {
        margin: 3,
        height: width * 0.4,
        width: width * 0.4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 320,
    },
    bottomRight: {
        margin: 3,
        height: width * 0.4,
        width: width * 0.4,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 320,
        borderBottomLeftRadius: 20,
    },
});

export default Pad;