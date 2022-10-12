import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";

interface SkeletonProps {
    width: string | number;
    height: number;
    borderRadius: number;
    marginBottom?: number;
};


const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius, marginBottom }) => {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: false,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: false,
                }),
            ])
        ).start();
    }, [opacity]);

    return (
        <Animated.View style={{ ...styles.container, width, height, borderRadius, opacity, marginBottom }} />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'grey',
    },
});

export default Skeleton;