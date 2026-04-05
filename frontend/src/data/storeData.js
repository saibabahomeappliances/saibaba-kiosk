import { Star, Truck, CreditCard, ShieldCheck } from 'lucide-react';

export const storeInfo = {
    name: "Sai Baba Home Appliances",
    tagline: "Trusted Home Appliances Store in Ambattur",
    phone: "+91 98418 59710",
    address: "3/157, Madras Thiruvallur High Rd, Secretariat Colony, Venkatapuram, Ambattur, Chennai – 600053",
    hours: "Open daily – Closes at 9 PM",
    mapsLink: "https://maps.app.goo.gl/RVCquNBDL8enLjGu7",
    rating: 5.0,
    whatsappLink: "https://wa.me/919841859710?text=Hi,%20I%20am%20interested%20in%20your%20products.%20Can%20you%20send%20me%20the%20list%3F",
};

export const categories = [
    { id: 1, title: "Refrigerators", image: "https://images.unsplash.com/photo-1571175443880-49e1d58b95da?auto=format&fit=crop&w=800&q=80" },
    { id: 2, title: "Washing Machines", image: "https://images.unsplash.com/photo-1626806775351-538af440617c?auto=format&fit=crop&w=800&q=80" },
    { id: 3, title: "Air Conditioners", image: "https://images.unsplash.com/photo-1614631446501-abcf76949eca?auto=format&fit=crop&w=800&q=80" },
    { id: 4, title: "Televisions", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80" },
    { id: 5, title: "Kitchen Appliances", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80" },
    { id: 6, title: "Small Appliances", image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=800&q=80" },
];

export const features = [
    { icon: ShieldCheck, title: "Genuine Products", desc: "100% original from top brands" },
    { icon: Truck, title: "Fast Local Delivery", desc: "Serving Ambattur & nearby areas" },
    { icon: CreditCard, title: "All Payment Modes", desc: "Cards, UPI, No Cost EMI" },
    { icon: Star, title: "Trusted Store", desc: "Serving customers with trust" },
];

export const paymentMethods = [
    "Google Pay", "Credit Cards", "Debit Cards", "EMI", "Cash"
];

export const mockProducts = [
    {
        id: "p1",
        title: "Samsung 253L Double Door Refrigerator",
        description: "Frost-free double door refrigerator with digital inverter technology.",
        price: 24500,
        category: "Refrigerators",
        image: "https://images.unsplash.com/photo-1581577908955-46fd18293774?auto=format&fit=crop&w=600&q=80",
        specifications: '["253 Liters", "3 Star Rating", "Frost Free", "Digital Inverter"]',
        model_number: "RT28A3453S8/HL"
    },
    {
        id: "p2",
        title: "LG 7kg Fully Automatic Top Load",
        description: "Smart inverter washing machine with TurboDrum.",
        price: 17500,
        category: "Washing Machines",
        image: "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?auto=format&fit=crop&w=600&q=80",
        specifications: '["7 Kg Capacity", "Smart Inverter", "Turbo Drum", "5 Star Rating"]',
        model_number: "T70SKSF1Z"
    },
    {
        id: "p3",
        title: "Daikin 1.5 Ton 3 Star Split AC",
        description: "Inverter split AC with Coanda airflow for uniform cooling.",
        price: 36900,
        category: "Air Conditioners",
        image: "https://images.unsplash.com/photo-1631557088273-0941f173b9ce?auto=format&fit=crop&w=600&q=80",
        specifications: '["1.5 Ton", "3 Star Rating", "Inverter Compressor", "Copper Condenser"]',
        model_number: "MTKL50U"
    },
    {
        id: "p4",
        title: "Sony Bravia 55 inch 4K Ultra HD TV",
        description: "Smart LED Google TV with X1 4K Processor.",
        price: 63990,
        category: "Televisions",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80",
        specifications: '["55 Inches", "4K Ultra HD", "Google TV", "X-Reality PRO"]',
        model_number: "KD-55X74L"
    },
    {
        id: "p5",
        title: "Whirlpool 20L Microwave Oven",
        description: "Solo microwave oven with feather touch control.",
        price: 5490,
        category: "Kitchen Appliances",
        image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80",
        specifications: '["20 Liters", "Solo Type", "Feather Touch", "Auto Cook Menus"]',
        model_number: "MAGICOOK PRO 20SE"
    },
    {
        id: "p6",
        title: "Philips Daily Collection Mixer Grinder",
        description: "750W mixer grinder with 3 stainless steel jars.",
        price: 3299,
        category: "Small Appliances",
        image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80",
        specifications: '["750 Watts", "3 Jars", "Advanced Ventilation", "Sturdy Handles"]',
        model_number: "HL7756/00"
    }
];
