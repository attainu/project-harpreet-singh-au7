import {Order, CartItem} from "./productRoutes.js";


router.post("/additems", (req, res) => {
    const orderController = {
        createOrder: (req, res) => {
            req.body.order.user = req.profile;
            onst OrderObj = new Order(req.body.order);
            OrderObj.save((err, data) => {
                if (err) {
                    return res
                        .status(404)
                        .json({error: errorHandler(err)});
                    }
                return res.json(data);
            });

    },
    listOrders: (req, res) => {
        Order
            .find()
            .populate('user', "_id name address")
            .sort("-created")
            .exec((err, orders) => {
                if (err) {
                    return res
                        .status(404)
                        .json({error: errorHandler(err)});
                }
                res.json(orders);
            });
    }
    }