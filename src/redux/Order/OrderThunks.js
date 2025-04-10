import { createAsyncThunk } from "@reduxjs/toolkit"
import http from "../../api/axios-interceptor"
import { openMessage } from "../modal/modalSlice"
import axios from "axios"

export const getOrder = createAsyncThunk('order/getProfileByToken', async (_, thunkApi) => {
    try {
        const reponse = await http.get('api/Orders')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({ message: "Get Order Failed!", notificationType: 'error' }))
        return thunkApi.rejectWithValue(error)
    }
})

export const getOrderByAdmin = createAsyncThunk('order/getOrderByAdmin', async (_, thunkApi) => {
    try {
        const reponse = await http.get('api/Orders/GetOrdersForAdmin')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({ message: "Get Order Failed!", notificationType: 'error' }))
        return thunkApi.rejectWithValue(error)
    }
})

export const getCountByMonth = createAsyncThunk('order/getCountByMonth', async (_, thunkApi) => {
    try {
        const reponse = await http.get('api/Orders/GetOrderCountByMonth')
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({ message: "Get Order Failed!", notificationType: 'error' }))
        return thunkApi.rejectWithValue(error)
    }
})

export const getOrderById = createAsyncThunk('order/getOrderById', async (data, thunkApi) => {
    const { id } = data
    try {
        const reponse = await http.get(`api/Orders${id}`)
        return reponse
    } catch (error) {
        thunkApi.dispatch(openMessage({ message: "Get Order Failed!", notificationType: 'error' }))
        return thunkApi.rejectWithValue(error)
    }
})

const generateAccessToken = async () => {
    const auth = btoa(
        `AfvEjD2GwsbWde_v26eSnQ9I5Wm1tnnpeqGbS75HlpUBvRQ7hg0e8x9b_83s8fz5Q0JAVmsB2ILcwRUh:EAJKvO6-wv5yXjCBl3vhbCdXBDxYXNTpjDrMMoRMdwAYmuD1A0CtA1mOFsRPP4xiEZYgrKrTqD3zt_la`
    );

    try {
        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v1/oauth2/token`,
            "grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }
        );

        const data = response.data;
        return data.access_token;
    } catch (error) { }
};

export const createOrderPaypal = createAsyncThunk('order/createOrderPaypal', async (price, thunkApi) => {
    const accessToken = await generateAccessToken();

    try {
        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders`,
            {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        items: [
                            {
                                name: "Royal Oaks Inn",
                                description: "Hà Nội, Nam Từ Liêm",
                                quantity: "1",
                                unit_amount: {
                                    currency_code: "USD",
                                    value: price,
                                },
                            },
                        ],
                        amount: {
                            currency_code: "USD",
                            value: price,
                            breakdown: {
                                item_total: {
                                    currency_code: "USD",
                                    value: price,
                                },
                            },
                        },
                    },
                ],
                application_context: {
                    return_url: "https://example.com/return",
                    cancel_url: "https://example.com/cancel",
                },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const order = response;
        return order.data.id;
    } catch (error) {
    }
});

export const onApprove = createAsyncThunk('order/onApprove', async (data, thunkApi) => {
    const accessToken = await generateAccessToken();

    try {

        const {dataPaypal, price, note, startDate, endDate, roomId } = data
        const responsePaypal = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${dataPaypal.orderID}/capture`,
            {
                orderID: dataPaypal.orderID,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        const reponse = await http.post(`api/Orders`, {
            price: price,
            note: note,
            transactionId: responsePaypal.data.id,
            startDate: startDate,
            endDate: endDate,
            roomId: roomId,
        })
        thunkApi.dispatch(openMessage({ message: "Booking success!", notificationType: 'success' }))

        return
    } catch (error) {
    }
});