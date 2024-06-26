import {Product} from "./product.js";

export class Services {
    async fetchDataFromJson(filePath) {
        try {
            const response = await fetch(filePath);
            const jsonData = await response.json();

            // Create Product instances from the parsed JSON data
            return jsonData.map(
                (item) =>
                    new Product(
                        item.id,
                        item.name,
                        item.price,
                        item.screen,
                        item.backCamera,
                        item.frontCamera,
                        item.img,
                        item.desc,
                        item.type
                    )
            );
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getPhones(){
        const filePath = '../database/products.json';
        return this.fetchDataFromJson(filePath);
    }

    async getPhoneById(id) {
        const filePath = '../database/products.json';
        const products = await this.fetchDataFromJson(filePath);
        return products.find(product => product.id === id);
    }
}
