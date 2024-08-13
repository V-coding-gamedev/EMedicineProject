import React, {useState, useEffect } from 'react';
import axios from 'axios'; 

import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const headerStyle = {
        background: '#333',
        color: '#fff',
        display: 'flex',
        padding: '15px'
    }

    const logoutBtnStyle = {
        marginLeft: '900px',
        background: '#333',
        color: '#ff1100',
        borderColor: '#ff1100',
        borderStyle: 'solid'
    }

    const gridContainer = {
        marginTop: '20px',
        display: 'grid',
        gridTemplateColumns: '300px 300px 300px 300px',
        gridTemplateRows: '300px 300px 300px 300px',
        gridGap: '5px', 
        justifyContent: 'center'
    }

    const gridItem = {
        backgroundColor: '#dedfe0',
        textAlign: 'center',
        fontSize: '20px', 
        margin: '20px',
        color: '#333',
        borderStyle: 'solid',
        borderRadius: '20px',
    }

    const [medicineList, setMedicines] = useState([])

    useEffect(() => {
        const getMedicines = async () => {
            axios.get('https://localhost:5000/GetAllMedicines').then((response) => {
                /*console.log(response.data);*/
                setMedicines(response.data);
            }).catch((error) => {
                console.log(error)
            })
        }
        getMedicines(); 
    }, [])

    console.log(medicineList); // check

    // xem lại
    const handleQuantityChange = (id, newQuantity) => {
        setMedicines((prevMedicines) =>
            prevMedicines.map((medicine) =>
                medicine.id === id ? { ...medicine, quantity: newQuantity } : medicine
            )
        );
    };

    let images = [
        'https://5.imimg.com/data5/SELLER/Default/2023/7/330506870/UM/GZ/QO/135658020/aspirin-dispersible-tablets-500x500.jpg',
        'https://cdn.nhathuoclongchau.com.vn/unsafe/800x0/filters:quality(95)/https://cms-prod.s3-sgn09.fptcloud.com/ibuprofen_la_gi_huong_dieu_tri_khi_bi_ngo_doc_ibuprofen1_51003b0b0f.png',
        'https://vinmec-prod.s3.amazonaws.com/images/20230218_051500_983773_Paracetamol_500mg.max-800x800.jpg',
        'https://product.hstatic.net/200000217829/product/cetirizine_stada_10_mg_-_thuoc_chong_di_ung_3054e48dbc6744aaa3af2b5ce173c9d7_master.jpg',
        'https://www.domesco.com/pictures/catalog/products/san-pham-2024/Amoxicillin-500-mg-VD-22625-15-10-vi-x-10-vien-nang-cung-00224-.png',
        'https://i5.walmartimages.com/seo/Herbion-Naturals-Sugar-Free-Cough-Syrup-with-Stevia-5-FL-Oz_d7e5e89e-75f4-4786-bb71-a88a3232bc8b.6e224ef8a5056c9972a70a7cad0f88dc.jpeg',
        'https://down-sg.img.susercontent.com/file/my-11134207-7r990-ltf0napncuoe78',
        'https://images-na.ssl-images-amazon.com/images/I/61RJwFBjEUL.jpg',
        'https://media.tractorsupply.com/is/image/TractorSupplyCompany/1619326?wid=456&hei=456&fmt=webp&qlt=100,0&resMode=sharp2&op_usm=0.9,1.0,8,0',
        'https://purenutrition.in/cdn/shop/products/DiabeticCareamazonproductimages_1.jpg?v=1708880692&width=1445'
    ];
    
    return (
        <div>
            <header style={headerStyle}>
                <div style={{ display: 'flex' }}>
                    <h2 style={{ marginLeft: '20px', fontSize: '20px' }}>E-Medicine Web</h2>
                    <h2 style={{ marginLeft: '40px', fontSize: '20px' }}>My Profile</h2>
                    <h2 style={{ marginLeft: '40px', fontSize: '20px' }}>My Orders</h2>
                    <h2 style={{ marginLeft: '40px', fontSize: '20px' }}>Cart</h2>
                </div>

                <button style={logoutBtnStyle }>
                    Logout
                </button>
            </header>

            <div style={gridContainer}>
                {medicineList.map((medicine) => {
                    return (
                        <div style={gridItem} key={medicine.id}>
                            <h3>{medicine.name}</h3>
                            <h4>Price: {medicine.unitPrice}</h4>
                            <div style={{ display: 'flex', marginLeft: '10px', marginRight: '10px' }}>
                                <h4>Quantity: </h4>

                                <input
                                    style={{ marginLeft: '10px' }}
                                    type="number" id="quantity"
                                    class="form-control"
                                    value={medicine.quantity}
                                />

                                {/*setMedicines((prevMedicines) =>*/}
                                {/*    prevMedicines.map((medicine) =>*/}
                                {/*                        medicine.id === id ? {...medicine, quantity: newQuantity } : medicine*/}
                                {/*    )*/}
                                {/*);*/}
                            </div>
                            
                            <h4>Status: {medicine.status}</h4>
                            <button>Add To Cart</button>
                        </div>
                    )
                })}
            </div>
        </div>
        
    )
}

export default HomePage;