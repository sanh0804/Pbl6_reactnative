import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../../../consts/consts';

const styles = StyleSheet.create({
    favoriteBox: {
        flexDirection: "row",
        w: "92%",
        h: 120,
        marginX: 3,
        bg: "#faefeb",
        rounded: 10,
        alignItems: "center",
        padding: 2,
        flexWrap: 'wrap',
        justifyContent: "center"
    },
    favoriteIcon: {
        width: 44,
        height: 44,
        borderRadius: 44 / 2,
        bg: Colors.white,
        margin: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    listContainer: {
        flexWrap: "wrap",
        direction: "row",
        justifyContent: "space-between",
        px: 6
    },
    productPress: {
        w: "47%",
        bg: Colors.white,
        rounded: "md",
        pt: 0.3,
        my: 3,
        pb: 3,
        overflow: "hidden",
    }
});



export default styles;