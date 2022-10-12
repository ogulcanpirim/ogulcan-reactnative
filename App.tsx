import React from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//screens
import CreateScreen from './src/screens/Create';
import DetailScreen from './src/screens/Detail';
import CategoryTabs from './src/components/CategoryTabs';

//redux
import store from './src/store';
import { Provider } from 'react-redux';
import ProductType from './src/store/types/product';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Create: undefined;
  Detail: ProductType;
  Content: { categoryName: string };
};

const App = () => {

  const scheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name='Home' component={CategoryTabs} />
          <Stack.Screen name='Create' component={CreateScreen} />
          <Stack.Screen name='Detail' component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
