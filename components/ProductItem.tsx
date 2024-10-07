import {
    StyleSheet,
    Text,
    View, 
    Dimensions,
    Image
} from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const ProductItem = ({ id, title, price, defaultWidth = 120 }) => {
    
    const navigation = useNavigation();

    return (
        <View style={styles.productItem(defaultWidth)}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Single Product", {
                    productId: id
                })
            }}>
                
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.imageProductWrrapper}>
                            <Image source={require('../assets/banner-01.jpg')} style={styles.imageProduct} />
                        </View>
                    </View>
                    <View>
                        <Text numberOfLines={1} style={styles.productTitle}>{title}</Text>
                        <Text style={styles.productPrice}>{price}</Text>
                        {/* <Text style={styles.productStock}>Terjual > 100</Text> */}
                    </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imageWrapper: {
        flex: 1,
        width: width - 40,
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
    productItem: (productWidth) =>  {
        return {
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: '#ccc',
            justifyContent: 'center',
            width: productWidth,
            // marginRight: 16
        }
    },
    productPrice: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#222222'
    },
    productTitle: {
        fontSize: 12,
        color: '#222222'
    },
    productStock: {
        fontSize: 12,

    }
})

export default ProductItem