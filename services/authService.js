import AuthSlice from '~/redux/AuthSlice';
// import CartSlice from '~/redux/CartSlice';
import * as httpRequest from '~/utils/httpRequest';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(AuthSlice.actions.loginStart());
    try {
        const res = await httpRequest.post('user/login', {
            Email: user.Email,
            Password: user.Password,
        });
        dispatch(AuthSlice.actions.loginSuccess(res.data));
        // const result = await httpRequest.get('cart', {
        //     headers: { Authorization: `Bearer ${res.data.accessToken}` },
        // });
        // dispatch(CartSlice.actions.handleCart(result.data));

        // navigate('/');
        return res.data;
    } catch (error) {
        dispatch(AuthSlice.actions.loginFailed());
        return error.response.data;
    }
// };
// export const registerUser = async (user, dispatch, navigate) => {
//     dispatch(AuthSlice.actions.registerStart());
//     try {
//         const res = await httpRequest.post('user/register', {
//             Email: user.Email,
//             Password: user.Password,
//             ConfirmPassword: user.ConfirmPassword,
//         });
//         dispatch(AuthSlice.actions.registerSuccess(res.data));
//         navigate('/');

//         return res.data;
//     } catch (error) {
//         dispatch(AuthSlice.actions.registerFailed());
//         console.error('error', error.response.data);
//         return error.response.data;
//     }
// };
// export const logOutUser = async (dataUpdate, dispatch, navigate, id = '1', accessToken, axiosJWT) => {
//     dispatch(AuthSlice.actions.logOutStart());
//     try {
//         const resCart = await axiosJWT.put('cart', dataUpdate, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         const res = await axiosJWT.post('user/logout', id, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         dispatch(AuthSlice.actions.logOutSuccess());
//         dispatch(CartSlice.actions.handleCart([]));

//         console.log('logout', res.data);
//         navigate('/');
//         return res.data;
//     } catch (error) {
//         dispatch(AuthSlice.actions.logOutFailed());
//         console.log(error, AuthSlice.actions.logOutFailed());
//     }
};