const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRETO, API_KEY, API_URL } = process.env;
const axios = require('axios');
const ip = require('ip');

const { getUserByEmail } = require('../configuration/consultasTask3/usuario.js');

const { savePurchase } = require('../configuration/consultasTask3/compra.js');

router.post('/', (req, res) => {
    const { description, precio, cardType, cvv, expirationMonth, expirationYear, token, idProducto } = req.body;

    console.log(req.body)
    jwt.verify(token, JWT_SECRETO, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido, por favor inicie sesión de nuevo', error: "token" });
        }

        const payData = {
            "amount": precio,
            "card-number": cardType,
            "cvv": cvv,
            "expiration-month": expirationMonth,
            "expiration-year": expirationYear,
            "full-name": "APPROVED",
            "currency": "USD",
            "description": "description",
            "reference": `product_id:${idProducto}`,
        };

        axios.post(`${API_URL}/payments`, payData, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            }
        })
            .then((response) => {
                const datos = response.data.data
                console.log("Response:", response.data);

                const email = decoded.email



                getUserByEmail(email, (err, row) => {
                    if (err) {
                        console.error('Error al buscar usuario:', err);
                        return;
                    }

                    if (row) {
                        //aqui se puede utilizar el id

                        const data = {
                            description: description,
                            user_id: row.id,
                            producto_id: Number(idProducto),
                            cantidad: 1,
                            ip_cliente: ip.address(),
                            id_transaccion: datos.transaction_id,
                            total_pagado: datos.amount
                        }

                        savePurchase(data, (err, lastID) => {
                            if (err) {
                                console.error('Error al guardar la compra:', err);
                                return;
                            }

                            console.log('Compra guardada con ID:', lastID);
                        });


                        res.json({ status: 'success', data: response.data });

                    } else {
                        console.log('No se encontró un usuario con ese correo electrónico')
                        res.status(500).json({ status: 'error', message: 'Error al procesar el pago' });
                    }
                });


            })
            .catch((error) => {
                console.error("Error:", error);
                res.status(500).json({ status: 'error', message: 'Error al procesar el pago' });
            });
    });




    /* res.json({ status: 'success' }); */


});

module.exports = router;