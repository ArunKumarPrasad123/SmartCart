/* eslint-disable react-refresh/only-export-components */
import React, { useContext, useEffect, useState, createContext } from 'react'
import axios from 'axios'
import { authDataContext } from './AuthContext'
import { toast } from 'react-toastify'
import { userDataContext } from './UserContext'

export const shopDataContext = createContext()

function ShopContext({children}) {

    let [products, setProducts] = useState([])
    let [search, setSearch] = useState('')
    let { userData } = useContext(userDataContext)
    let [showSearch, setShowSearch] = useState(false)
    let { serverUrl } = useContext(authDataContext)
    let [cartItem, setCartItem] = useState({})
    let [loading, setLoading] = useState(false)
    let currency = '₹'
    let delivery_fee = 40

    const getProducts = React.useCallback(async () => {
        try {
            let result = await axios.get(serverUrl + "/api/product/list")
            setProducts(result.data)
        } catch (error) {
            console.log(error)
        }
    }, [serverUrl])


    const addtoCart = async (itemId, size) => {
        if (!size) {
            console.log("Select Product Size")
            return
        }
        let cartData = structuredClone(cartItem)
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1
            } else {
                cartData[itemId][size] = 1
            }

        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItem(cartData);
       
        if (userData) {
            setLoading(true)
            try {
                
        let result =   await axios.post(serverUrl + "/api/cart/add", { itemId, size }, { withCredentials: true })
        console.log(result.data)
                toast.success("Product Added")
                setLoading(false)
            } catch {
                setLoading(false)
                toast.error("Add Cart Error")
            }
        }
    }

    const getUserCart = React.useCallback(async () => {
        try {
            const result = await axios.post(serverUrl + '/api/cart/get', {}, { withCredentials: true })
            setCartItem(result.data)
        } catch (error) {
            console.log(error)
        }
    }, [serverUrl])

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem)
        cartData[itemId][size] = quantity
        setCartItem(cartData)
        if (userData) {
            try {
                await axios.post(serverUrl + "/api/cart/update", { itemId, size, quantity }, { withCredentials: true })
            } catch (error) {
              console.log(error)
              toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item]
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
        return totalCount
    }

    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item]
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        }
        return totalAmount
    }

    useEffect(() => {
        getProducts()
    }, [getProducts])

    useEffect(() => {
        getUserCart()
    }, [getUserCart])

    let value = {
        products, currency, delivery_fee, getProducts, search, setSearch, showSearch, setShowSearch, cartItem, addtoCart, getCartCount, setCartItem, updateQuantity, getCartAmount, loading
    }
    return (
        <shopDataContext.Provider value={value}>
            {children}
        </shopDataContext.Provider>
    )
}

export default ShopContext

