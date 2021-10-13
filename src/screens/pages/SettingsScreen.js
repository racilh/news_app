import React from 'react';
import {Switch} from 'react-native';
import styled from 'styled-components/native';
import {useTheme} from "../../utils/ThemeManager";

const Container = styled.View`
  flex: 1;
  background:${props => props.theme.backgroundAlt};
  align-items: center;
  justify-content: center;`

const Title = styled.Text`
  color: ${props => props.theme.text};
`
function SettingsScreen() {
    const theme = useTheme()
    return (
        <Container>
            <Title>{theme.mode}</Title>
            <Switch
                value={theme.mode === 'dark'}
                onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
            />
        </Container>
    )
}
export default SettingsScreen;