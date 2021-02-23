class Supply {
    constructor(uuid, name, cost, description, sellingPrice, createdAt, updatedAt){
        this.uuid = uuid;
        this.name = name;
        this.cost = cost;
        this.description = description;
        this.sellingPrice = sellingPrice;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Supply;