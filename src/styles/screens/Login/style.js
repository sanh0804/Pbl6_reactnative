import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../../consts/consts';
const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "flex-end"
    },
    container: {
        w: "full",
        h: "full",
        top: "0",
        px: "6",
        justifyContent: "center",
        alignItems: "center",
    },
    heading: {
        marginTop: 7,
        marginBottom: 1,
        fontSize: 20
    },
    iconImg: {
        flex: 1,
        resizeMode: "stretch",
        margin: 1,
        source: require('../../../../assets/icon.png')
    },
    buttonSignIn: {
        backgroundColor: Colors.subGreen,
        height: 55,
        alignItems: "center",
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.main,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        letterSpacing: 0.5
    },
    bottomContainer: {
        justifyContent: "center",
        height: height / 3,
        marginBottom: 30
    },
    textInput: {
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 25,
        paddingLeft: 15,
    },
    inputContainer: {
        marginBottom: 30,
        ...StyleSheet.absoluteFill,
        zIndex: -1,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: Colors.subGreen,
        height: 55,
        alignItems: "center",
        borderRadius: 35,
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.main,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        justifyContent: "center"

    },

    text: {
        color: Colors.black,
        fontWeight: "bold",
        borderColor: "none"
    },
    closeButtonContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 20,
        top: -20
    }
})


