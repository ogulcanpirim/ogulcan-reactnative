import { StyleSheet, View, FlatList, Animated } from 'react-native';
import React, { useCallback, useRef } from 'react';
import CategoryTab from './CategoryTab';
import { useTheme } from '@react-navigation/native';
import CategoryType from '../store/types/category';

interface CategoryPickerProps {
    categories: Array<CategoryType>;
    selected: CategoryType | undefined;
    setSelected: (value: CategoryType) => void;
};

const CategoryPicker: React.FC<CategoryPickerProps> = ({ categories, selected, setSelected }) => {

    const sliderRef = useRef<FlatList<CategoryType>>(null);
    const scrollX = useRef(new Animated.Value(0)).current;
    const theme = useTheme();

    const handleItemPress = (item: CategoryType, index: number) => {
        setSelected(item);
        sliderRef.current?.scrollToIndex({ index })
    }

    const renderItem = useCallback(({ item, index }: { item: CategoryType, index: number }) => {
        return (
            <CategoryTab
                theme={theme}
                selected={selected?.name === item.name}
                name={item.name}
                onPress={() => handleItemPress(item, index)}
            />
        );
    }, [selected, theme]);

    return (
        <View style={styles.container}>
            <FlatList
                ref={sliderRef}
                data={categories}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
                onScrollToIndexFailed={info => {
                    const wait = new Promise((resolve: any) => setTimeout(resolve, 1));
                    wait.then(() => {
                        sliderRef.current?.scrollToIndex({ index: info.index, animated: true });
                    });
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
    },
    list: {
        alignItems: 'center',
    },

    indicator: {
        position: 'absolute',
        height: 5,
        width: 100,
        bottom: 5,
        backgroundColor: '#000'
    },
})

export default React.memo(CategoryPicker);