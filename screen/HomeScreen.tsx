import { View, Image, Dimensions, StyleSheet } from "react-native"
import { Searchbar, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenWrapper from "../components/ScreenWrapper";
import { ScrollView } from "react-native-gesture-handler";
import Gap from "../components/Gap";

const {width} = Dimensions.get('window');

const HomeScreen = () => {
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

                <View style={{ paddingHorizontal: 16, flex: 1 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: '#222'}}>StarGold</Text>
                        <Text style={{color: 'red', fontSize: 10, fontWeight: 'bold'}}>Lihat Semua</Text>
                    </View>
                    <Gap height={16}/>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flex: 1}}>
                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold 0.1gr</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>

                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold 0.1gr</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>

                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold 0.1gr</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>

                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold 0.1gr</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                <Gap height={24}/>

                <View style={{ paddingHorizontal: 16, flex: 1 }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={{fontWeight: 'bold', color: '#222'}}>StarGold Custom</Text>
                        <Text style={{color: 'red', fontSize: 10, fontWeight: 'bold'}}>Lihat Semua</Text>
                    </View>
                    <Gap height={16}/>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flex: 1}}>
                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold Custom Series Idul Fitri</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>

                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold Custom Series Imlek</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>

                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold Custom Series Congratulation</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>

                        <View style={styles.productItem}>
                            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                <View style={styles.imageProductWrrapper}>
                                    <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct}/>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.productTitle}>StarGold Custom Series Thankyou</Text>
                                <Text style={styles.productPrice}>Rp. 169,000</Text>
                                <Text style={styles.productStock}>Terjual > 100</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>

                    

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