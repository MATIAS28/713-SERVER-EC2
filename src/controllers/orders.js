const Order = require('../models/order')
const { paymentService } = require("../services/paymentService")

//Guarda la orden en la base de datos
const saveOrder = async (order, res) => {
    const products = order.products
    const items = []
    products.forEach(product => {
        const item = {
            title: product.name,
            picture_url: product.img,
            description: product.description,
            category_id: product.category,
            quantity: product.quantity,
            unit_price: product.unit_price
          }
          
          order.totalPrice + (product.quantity * product.unit_price)
        items.push(item)
    })

    await order.save(async (e, orderSaved) => {
        console.log(e)
        if(e) return res.status(500).send({message: 'Error al guardar la orden'})
        if(!orderSaved) return res.status(404).send({message: 'No fue posible guardar la orden'})

        const paymentURL = await paymentService(items, orderSaved._id)
        
        return res.status(201).send(paymentURL)
    })
}

//Crear una nueva orden
async function createNewOrder(req, res){
    let {...newOrder} = req.body
    let order = new Order(newOrder)
    order.user = req.user.sub
    const orderId = req.params.id

    try {
    await saveOrder(order, res)
    } catch (e) {
        console.log(e);
        return res.status(404).send({message: 'Error al guardar la orden'})
    }
}

//Hacer pago
function getPaymentLink(req, res){

    Order.findById(req.params.id, async (e, order) => {
        if(e) res.status(500).send({message: 'Error al devolver la orde'})
        if(!order) res.status(404).send({message: 'La orden no existe'})
        const paymentURL = await paymentService(order.products, order._id)
        
        return res.status(200).send(paymentURL)

    })
}

//valida el pago o hace el pago
function validatePayment(req, res){
    const id = req.params.id

    Order.findByIdAndUpdate(id, {paid: true}, (e, orderUpdated) => {
        if(e) return res.status(500).send({message: 'Error al registrar el pago'})
        if(!orderUpdated) return res.status(404).send({message: 'No se encontro la orden'})

        return res.status(201).send({message: 'pagado exitosamente'})
    })
}

//devuelve las ordenes del usuario
function getOrders(req, res){
    Order.find({user: req.user.sub}).sort('-createdAt').exec((e, orders) => {
        if(e) return res.status(500).send({message: 'Erro al devolver las ordenes'})
        if(!orders) return res.status(404).send({message: 'Aun no tienes ordenes'})

        return res.status(200).send(orders)
    })
}

//devuelve una orden en especifico
function getOrder(req, res){
    let orderId = req.params.id

    try {
        Order.findById(orderId, (e, order) => {
            if(e) return res.status(500).send({message: 'Error al devolver la orden'})
            if(!order) return res.status(404).send({message: 'La orden no existe'})
    
            return res.status(200).send({order: order})
        })
    } catch (e) {
        return res.send({message: e})
    }
}

//devuelve todas las ordenes 
function getAllOrders(req, res){
    Order.find().sort('-createAt').exec((e, orders) => {
        if(e) return res.status(500).send({message: 'Error al devolver la orden'})
        if(!orders) return res.status(404).send({message: 'La orden no existe'})

        return res.status(200).send({orders: orders})
    })
}

function shippedOut(req, res){

    Order.findByIdAndUpdate(req.params.id, {delivered: true}, (e, orderDelivered) => {
        if(e) return res.status(500).send({message: 'Hubo un error al marcar como enviado'})
        if(!orderDelivered) return res.status(404).send({message: 'La orden no existe'})

        return res.status(200).send({orderDelivered: orderDelivered})
    })
}

module.exports = {
    createNewOrder,
    getOrder,
    getOrders,
    getAllOrders,
    getPaymentLink,
    shippedOut,
    validatePayment
}