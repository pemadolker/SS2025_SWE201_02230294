import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { useState } from "react";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: require("../../assets/images/image1.png"),
      heading: "Get going with us",
      subtitle: "Use GoCar to egt accross town - from anywhere,at any time.",
    },
    {
      image: require("../../assets/images/image2.png"),
      heading: "Welcome to Gojek",
      subtitle: "We'are your go-to app for the hassie-free commutes.",
    },
    {
      image: require("../../assets/images/image3.png"),
      heading: "Rides for all",
      subtitle: "Up to three stops with every trip - perfect for the travel with friends and family.",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Gojek Logo */}
      <Image source={require("../../assets/images/gojek_logo.png")} style={styles.logo} resizeMode="contain" />

      {/* Language Selector */}
      <Text style={styles.language}>🌐 English</Text>

      {/* Swiper for Manual Sliding */}
      <Swiper
        style={styles.swiper}
        showsPagination={true}
        loop={false}
        autoplay={false}
        onIndexChanged={(index) => setCurrentIndex(index)}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Image source={slide.image} style={styles.illustration} resizeMode="contain" />
          </View>
        ))}
      </Swiper>

      {/* Dynamic Heading & Subtitle */}
      <Text style={styles.heading}>{slides[currentIndex].heading}</Text>
      <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>I'm new, sign me up</Text>
      </TouchableOpacity>

      {/* Terms and Privacy Policy */}
      <Text style={styles.terms}>
        By logging in or registering, you agree to our
        <Text style={styles.link}> Terms of Service </Text>
        and
        <Text style={styles.link}> Privacy Policy.</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 40,
    position: "absolute",
    top: 50,
    left: 20,
  },
  language: {
    position: "absolute",
    top: 50,
    right: 20,
    fontSize: 14,
    color: "#555",
  },
  swiper: {
    height: 200,
    marginVertical: 20,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  illustration: {
    width: width * 0.8,
    height: 180,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#00AA5B",
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupButton: {
    backgroundColor: "#F3F4F6",
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 25,
  },
  signupText: {
    color: "#00AA5B",
    fontSize: 16,
    fontWeight: "bold",
  },
  terms: {
    fontSize: 12,
    textAlign: "center",
    color: "#777",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  link: {
    color: "#00AA5B",
    fontWeight: "bold",
  },
});
