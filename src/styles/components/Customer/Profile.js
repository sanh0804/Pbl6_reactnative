import { StyleSheet, Dimensions } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1
    },
    userInforSection: {
        paddingHorizotal: 30,
        marginBottom: 25,
        marginLeft: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'

    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 0
    },
    inforBoxWrapper: {
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100
    },
    inforBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30
    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26
    }
})

