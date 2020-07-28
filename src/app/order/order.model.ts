class Order{
    constructor(
        public address : string,
        public number: number,
        public optionalAddress: string,
        public paymentOption : string,
        public orderItems : OrderItems[] = [],
        public id?: string
    ) {}
}

class OrderItems {
    constructor(public quantity : number, public menuId : string){}
}

export {Order, OrderItems}