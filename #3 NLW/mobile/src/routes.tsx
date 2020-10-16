import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';

import SelectMapPosition from './pages/OrphanageCreate/SelectMapPosition';
import OrphanageData from './pages/OrphanageCreate/OrphanageData';

import Header from './components/Header';

const Routes: React.FC = () => (
    <NavigationContainer>
        <Navigator screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#F2F3F5' }
        }}>
            <Screen
                name="OrphanagesMap"
                component={OrphanagesMap}
            />

            <Screen
                name="Orphanage"
                component={Orphanage}
                options={{
                    headerShown: true,
                    header: () => <Header showCancel={false} title="Orfanato" />
                }}
            />

            <Screen
                name="SelectMapPosition"
                component={SelectMapPosition}
                options={{
                    headerShown: true,
                    header: () => <Header title="Selecione no mapa" />
                }}
            />

            <Screen
                name="OrphanageData"
                component={OrphanageData}
                options={{
                    headerShown: true,
                    header: () => <Header title="Informe os dados" />
                }}
            />
        </Navigator>
    </NavigationContainer>
);

export default Routes;
