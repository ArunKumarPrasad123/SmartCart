import React, { useContext, useEffect, useState, useCallback } from 'react'
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../Context/ShopContext';
import Card from '../component/Card';

function Collections() {
    let [showFilter, setShowFilter] = useState(false)
    let [showCategories, setShowCategories] = useState(false)
    let [showSubCategories, setShowSubCategories] = useState(false)
    let { products, search, showSearch } = useContext(shopDataContext)
    let [filterProduct, setFilterProduct] = useState([])
    let [category, setCaterory] = useState([])
    let [subCategory, setSubCaterory] = useState([])
    let [sortType, setSortType] = useState("relavent")

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCaterory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCaterory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = useCallback(() => {
        let productCopy = products.slice()
        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)
    }, [products, showSearch, search, category, subCategory])

    const sortProducts = useCallback(() => {
        let fbCopy = [...filterProduct]
        switch (sortType) {
            case 'low-high':
                setFilterProduct(fbCopy.sort((a, b) => a.price - b.price))
                break
            case 'high-low':
                setFilterProduct(fbCopy.sort((a, b) => b.price - a.price))
                break
            default:
                applyFilter()
                break
        }
    }, [filterProduct, sortType, applyFilter])

    useEffect(() => {
        sortProducts()
        // eslint-disable-next-line
    }, [sortType])

    useEffect(() => {
        setFilterProduct(products)
        
    }, [products])

    useEffect(() => {
        applyFilter()
        
    }, [category, subCategory, search, showSearch, applyFilter])

    return (
        <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] overflow-x-hidden z-[2] pb-[110px]'>
            {/* Sidebar */}
            <div className={`w-full md:w-[30vw] lg:w-[20vw] min-h-[8vh] md:min-h-screen p-5 border-r border-gray-400 text-[#aaf5fa] bg-[#141414] z-20 transition-all duration-300
                ${showFilter ? "h-auto" : "h-[8vh]"} 
                md:h-auto
                md:fixed md:top-[70px] md:left-0 md:bottom-0 md:overflow-y-auto
            `}>
                <p className='text-[22px] md:text-[25px] font-semibold flex gap-2 items-center justify-between md:justify-start cursor-pointer select-none' onClick={() => setShowFilter(prev => !prev)}>
                    FILTERS
                    <span className="md:hidden">
                        {!showFilter ? <FaChevronRight className='text-[18px]' /> : <FaChevronDown className='text-[18px]' />}
                    </span>
                </p>
                {/* Categories Accordion */}
                <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-4 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
                    <div className='flex items-center justify-between cursor-pointer' onClick={() => setShowCategories(prev => !prev)}>
                        <p className='text-[17px] md:text-[18px] text-[#f8fafa]'>CATEGORIES</p>
                        <span>{showCategories ? <FaChevronDown /> : <FaChevronRight />}</span>
                    </div>
                    {showCategories && (
                        <div className='w-full md:w-[230px] flex flex-col gap-2 mt-2'>
                            <label className='flex items-center gap-2 text-[15px] md:text-[16px] font-light'>
                                <input type="checkbox" value={'Men'} className='w-3' onChange={toggleCategory} /> Men
                            </label>
                            <label className='flex items-center gap-2 text-[15px] md:text-[16px] font-light'>
                                <input type="checkbox" value={'Women'} className='w-3' onChange={toggleCategory} /> Women
                            </label>
                            <label className='flex items-center gap-2 text-[15px] md:text-[16px] font-light'>
                                <input type="checkbox" value={'Kids'} className='w-3' onChange={toggleCategory} /> Kids
                            </label>
                        </div>
                    )}
                </div>
                {/* Sub-Categories Accordion */}
                <div className={`border-2 border-[#dedcdc] pl-5 py-3 mt-4 rounded-md bg-slate-600 ${showFilter ? "" : "hidden"} md:block`}>
                    <div className='flex items-center justify-between cursor-pointer' onClick={() => setShowSubCategories(prev => !prev)}>
                        <p className='text-[17px] md:text-[18px] text-[#f8fafa]'>SUB-CATEGORIES</p>
                        <span>{showSubCategories ? <FaChevronDown /> : <FaChevronRight />}</span>
                    </div>
                    {showSubCategories && (
                        <div className='w-full md:w-[230px] flex flex-col gap-2 mt-2'>
                            <label className='flex items-center gap-2 text-[15px] md:text-[16px] font-light'>
                                <input type="checkbox" value={'TopWear'} className='w-3' onChange={toggleSubCategory} /> TopWear
                            </label>
                            <label className='flex items-center gap-2 text-[15px] md:text-[16px] font-light'>
                                <input type="checkbox" value={'BottomWear'} className='w-3' onChange={toggleSubCategory} /> BottomWear
                            </label>
                            <label className='flex items-center gap-2 text-[15px] md:text-[16px] font-light'>
                                <input type="checkbox" value={'WinterWear'} className='w-3' onChange={toggleSubCategory} /> WinterWear
                            </label>
                        </div>
                    )}
                </div>
            </div>
            {/* Main Content */}
            <div className='flex-1 w-full md:ml-[30vw] lg:ml-[20vw] md:py-2'>
                <div className='w-full flex flex-col lg:flex-row lg:px-[50px] justify-between items-start md:items-center gap-4 md:gap-0'>
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />
                    <select
                        name=""
                        id=""
                        className='bg-slate-600 w-full md:w-[200px] h-[45px] md:h-[50px] px-[10px] text-white rounded-lg hover:border-[#46d1f7] border-2'
                        onChange={(e) => setSortType(e.target.value)}
                    >
                        <option value="relavent">Sort By: Relavent</option>
                        <option value="low-high">Sort By: Low to High</option>
                        <option value="high-low">Sort By: High to Low</option>
                    </select>
                </div>
                <div className='w-full min-h-[70vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-[30px] py-4 place-items-center'>
                    {filterProduct.map((item, index) => (
                        <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collections
