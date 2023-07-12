import {
	Animated,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../theme";
import { onDeparture, toPlane, onWaiting } from "../image/Images";

const OnBoarding = () => {
	const list = [
		{
			title: "Lets Traveling",
			description:
				"A flight is a journey made by flying, usually in an aeroplane. The flight will take four hours",
			img: toPlane,
		},
		{
			title: "Waiting for Plane",
			description:
				"Waiting can be like someone we dislike who challenges our patience and threatens our peace of mind.",
			img: onWaiting,
		},
		{
			title: "Departure",
			description: "A departure is the act of leaving somewhere.",
			img: onDeparture,
		},
	];

	const scrollX = new Animated.Value(0);

	function renderContent() {
		return (
			<Animated.ScrollView
				horizontal
				pagingEnabled
				scrollEnabled
				snapToAlignment="center"
				showsHorizontalScrollIndicator={false}
				decelerationRate={0}
				scrollEventThrottle={16}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
			>
				{list.map((item, index) => (
					<View key={index} style={{ width: SIZES.width }}>
						{/* image */}
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Image
								source={item.img}
								resizeMode="cover"
								style={{ width: "100%", height: "100%" }}
							/>
						</View>
						{/* Text */}
						<View
							style={{
								position: "absolute",
								bottom: "10%",
								left: 40,
								right: 40,
							}}
						>
							<Text
								style={{
									...FONTS.h1,
									color: COLORS.black,
									textAlign: "center",
								}}
							>
								{item.title}
							</Text>
							<Text
								style={{
									...FONTS.body3,
									textAlign: "center",
									marginTop: SIZES.base,
									color: COLORS.black,
								}}
							>
								{item.description}
							</Text>
						</View>
					</View>
				))}
			</Animated.ScrollView>
		);
	}

	function renderDots() {
		const dotPosition = Animated.divide(scrollX, SIZES.width);
		return (
			<View style={styles.dotContainer}>
				{list.map((item, index) => {
					const opacity = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [0.3, 1, 0.3],
						extrapolate: "clamp",
					});
					const dotSize = dotPosition.interpolate({
						inputRange: [index - 1, index, index + 1],
						outputRange: [SIZES.base, 17, SIZES.base],
						extrapolate: "clamp",
					});

					return (
						<Animated.View
							key={index}
							opacity={opacity}
							style={[styles.dot, { width: dotSize, height: dotSize }]}
						></Animated.View>
					);
				})}
			</View>
		);
	}
	return (
		<SafeAreaView style={styles.container}>
			<View>{renderContent()}</View>
			<View style={styles.dotRootContainer}>{renderDots()}</View>
		</SafeAreaView>
	);
};

export default OnBoarding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
	dot: {
		borderRadius: SIZES.radius,
		backgroundColor: COLORS.blue,
		marginHorizontal: SIZES.radius / 2,
	},
	dotContainer: {
		flexDirection: "row",
		height: SIZES.padding,
		alignItems: "center",
		justifyContent: "center",
	},
	dotRootContainer: {
		position: "absolute",
		bottom: SIZES.height > 700 ? "30%" : "20%",
	},
});
