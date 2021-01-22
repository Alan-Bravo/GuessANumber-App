import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import TitleText from './TitleText';
import Colors from '../constants/colors';

interface Props {
    title: string,
}

const Header: React.FC<Props> = props => {
    return(
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        paddingTop: 36, 
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default Header;