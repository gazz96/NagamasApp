import { View, Image, Dimensions, StyleSheet } from "react-native"
import { Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import { ScrollView } from "react-native-gesture-handler";
import Gap from "../components/Gap";
import CategoryProductBlock from "../components/CategoryProductBlock";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";

const {width} = Dimensions.get('window');

const HomeScreen = () => {

    const isFocused = useIsFocused();
    
    useEffect(() => {

    }, [isFocused])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Searchbar  
                        placeholder="Search"
                        mode="bar"
                        style={{width: '83%'}}
                    />
                    <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-end'}}>
                        <Image source={require('../assets/logo.jpg')} style={styles.logo}/>
                    </View>
                </View>
            </View>
            <ScreenWrapper style={{flex: 1}}>
                
                <Gap height={10}/>
                <View style={{ paddingHorizontal: 16, flex: 1 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flex: 1}}>

                        <View style={styles.imageWrapper}>
                            <Image source={require('../assets/banner-01.jpg')} style={styles.image}/>
                        </View>

                        <View style={styles.imageWrapper}>
                            <Image source={require('../assets/banner-01.jpg')} style={styles.image}/>
                        </View>

                    </ScrollView>
                </View>

                <Gap height={24}/>
                <Gap height={24}/>

                <CategoryProductBlock name="StarGold"/>

                <Gap height={24}/>


            </ScreenWrapper>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    logo: {
        width: 50, 
        height: 50,
        objectFit: 'cover',
        borderRadius: 50
    },
    imageWrapper: {
        flex: 1, 
        width: width - 40,
        marginRight: 8
    },
    image: {
        width: '100%', 
        height: 80, 
        borderRadius: 4,
    },
    imageProductWrrapper: {
        flex: 1, 
        width: 85,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 8
    },
    imageProduct: {
        flex: 1,
        width: null, 
        height: null, 
        borderRadius: 4,
        resizeMode: 'cover',
    },
    productItem: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        width: 120,
        marginRight: 16
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    productTitle: {
        fontSize: 12,
    },
    productStock: {
        fontSize: 12,

    }
})