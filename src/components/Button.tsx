import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ButtonProps {
    onClick: Function
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
    return(
        <TouchableOpacity onPress={() => onClick()}>
            <Text style={styles.button}>Save Score</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        margin: 30,
        padding: 10,
        borderWidth: 2,
        width: '50%',
        color: 'white',
        borderColor: 'white',
        backgroundColor: 'transparent',
        borderRadius: 3,
        opacity: 0.3
    }
});

export default Button;