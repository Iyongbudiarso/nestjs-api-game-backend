import { Injectable } from "@nestjs/common";
import { ShopRepository } from "../shop-repository/shop-repository";

@Injectable()
export class ShopService {
  constructor(private shopRepository: ShopRepository) {}

  async getItems() {
    const items = await this.shopRepository.getItems();
    return items.map((val) => ({
      ...val,
      price: Number(val.price),
    }));
  }

  async buyItem(userId: number, itemId: number) {
    const success = await this.shopRepository.buyItemWithTransaction(
      userId,
      itemId,
    );
    if (!success) {
      throw new Error("Purchase failed");
    }
  }
}
