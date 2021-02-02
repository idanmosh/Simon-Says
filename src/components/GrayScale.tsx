import React from 'react';
import { StyleSheet, View, Text } from "react-native";

interface GrayScaleProps {
    disabled: boolean;
}

const GrayScale: React.FC<GrayScaleProps> = ({ disabled, children }) => {
    return(
        <View style={[styles.container, !disabled ? { opacity: 0.7, backgroundColor: 'gray', height: '100%', width: '100%' } : { opacity: 1 }]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GrayScale;