import { Injectable } from '@nestjs/common';
import { Not, In, Raw } from 'typeorm';
import { DeletedConst } from '../common/constants/soft-delete.constant';
import { parseOffsetAndLimit } from '../common/helpers/paginate.helper';
import { processTranslateData } from '../common/helpers/translate.helper';
import { processProductTranslateData } from '../common/helpers/product.helper';
import { generateMapDataWithKeyFieldPair } from '../common/helpers/util.helper';
import {
  getMysqlCurrentDate,
  getCurrentDateFormatDMY,
} from '../common/helpers/date.helper';
import { RpcErrorExc } from '../common/exceptions/custom.exception';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { FindAllInventoriesDto } from './dto/find-all-inventories.dto';
import { DeleteMultiInventoriesDto } from './dto/delete-multi-inventories.dto';
import { DeleteMultiInventoryProductsDto } from './dto/delete-multi-inventory-products.dto';
import { DeleteMultiInventoryInputHistoriesDto } from './dto/delete-multi-inventory-input-histories.dto';
import { FindAllInventoryProductsDto } from './dto/find-all-inventory-products.dto';
import { CreateInventoryInputHistoryDto } from './dto/create-inventory-input-history.dto';
import { UpdateInventoryInputHistoryDto } from './dto/update-inventory-input-history.dto';
import { FindAllInventoryInputHistoriesDto } from './dto/find-all-inventory-input-histories.dto';
import { FindOneInventoryInputHistoryDto } from './dto/find-one-inventory-input-history.dto';
import { InventoryInputHistoryDetailDto } from './dto/inventory-input-history-detail.dto';
import { InventoryRepo } from './repository/inventory.repository';
import { InventoryProductRepo } from './repository/inventory-product.repository';
import { Inventory } from './schemas/inventory.schema';
import { ProductCategoryTranslateRepository } from '../product-category/repositories/product-category-translate.repository';
import { InventoryInputHistoryRepository } from '../inventory-input-history/repository/inventory-input-history.repository';
import { InventoryInputHistoryDetailRepository } from '../inventory-input-history/repository/inventory-input-history-detail.repository';
import { AdminRepository } from '../admin/repositories/admin.repository';
import { ProductRepository } from '../product/repositories/product.repository';

@Injectable()
export class InventoryService {
  constructor(
    private inventoryRepo: InventoryRepo,
    private inventoryProductRepo: InventoryProductRepo,
    private productCategoryTranslateRepo: ProductCategoryTranslateRepository,
    private inventoryInputHistoryRepo: InventoryInputHistoryRepository,
    private adminRepository: AdminRepository,
    private productRepository: ProductRepository,
  ) {}

  async createOneInventory(createInventoryDto: CreateInventoryDto) {
    await this.checkUniqueInventoryData(createInventoryDto);
    return await this.inventoryRepo.save(createInventoryDto);
  }

  async findAllInventories(reqData: FindAllInventoriesDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const [results, count] = await this.inventoryRepo
      .createQueryBuilder('inventory')
      .innerJoinAndSelect('inventory.country', 'inventory_country')
      .innerJoinAndSelect('inventory.city', 'inventory_city')
      .innerJoinAndSelect('inventory.district', 'inventory_district')
      .innerJoinAndSelect('inventory.ward', 'inventory_ward')
      .orderBy({
        'inventory.name': 'ASC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    return { results, total: count, max_page: maxPage };
  }

  async findAllInventoryProducts(reqData: FindAllInventoryProductsDto) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    const lang = 'vi';
    let query = this.inventoryProductRepo
      .createQueryBuilder('inventory_product')
      .innerJoinAndSelect(
        'inventory_product.product',
        'inventory_product_product',
      )
      .innerJoinAndSelect(
        'inventory_product_product.translates',
        'inventory_product_product_translates',
        'inventory_product_product_translates.language_code = :lang',
        {
          lang,
        },
      )
      .innerJoin(
        'inventory_product_product.translates',
        'inventory_product_product_translates_filter',
        'inventory_product_product_translates_filter.language_code = :lang_filter',
        {
          lang_filter: lang,
        },
      )
      .where('inventory_product.inventory_id = :inventory_id', {
        inventory_id: reqData.inventory,
      })
      .orderBy({
        'inventory_product_product_translates.name': 'ASC',
      })
      .skip(offset)
      .take(limit);
    if (reqData.search) {
      query = query.andWhere(
        'inventory_product_product.code LIKE :code OR inventory_product_product_translates_filter.name LIKE :name',
        {
          code: `%${reqData.search}%`,
          name: `%${reqData.search}%`,
        },
      );
    }
    const [data, count] = await query.getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    const categoryIds: any[] = data.map((item) => {
      return item.product.category;
    });
    const productCateTranslates = await this.productCategoryTranslateRepo.find({
      where: {
        language_code: lang,
        language_field: 'name',
        product_category_id: In(categoryIds),
      },
    });
    const mapProductCateTranslates: any = generateMapDataWithKeyFieldPair(
      'product_category_id',
      '',
      productCateTranslates,
    );
    const results = data.map((item) => {
      const processedTranslate = processProductTranslateData(
        item['product']['translates'],
      );
      delete item['product']['translates'];
      item['product'] = {
        ...item['product'],
        ...processedTranslate[lang],
      };
      if (mapProductCateTranslates.hasOwnProperty(item.product.category)) {
        const processedCateTranslate = processTranslateData([
          mapProductCateTranslates[item.product.category],
        ]);
        item.product.category = {
          id: item.product.category,
          ...processedCateTranslate[lang],
        };
      }

      return item;
    });
    return { results, total: count, max_page: maxPage };
  }

  findOne(id: number) {
    return `This action returns a #${id} inventory`;
  }

  async updateOneInventory(updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.inventoryRepo.findOne(updateInventoryDto.id);
    if (!inventory) {
      throw new RpcErrorExc(`not_found:Kho hàng không tồn tại`);
    }
    await this.checkUniqueInventoryData(updateInventoryDto);
    return await this.inventoryRepo.save(updateInventoryDto);
  }

  async softDeleteMultiInventories(
    deletedBy: number,
    deleteMultiInventoriesDto: DeleteMultiInventoriesDto,
  ) {
    // TODO: Khi kho hàng có sản phẩm đang có đơn đặt hàng ở các trạng thái
    // (Đã xác nhận, Đang lấy hàng, Đang giao hàng) thì không được phép xóa kho hàng
    const softDeleted = await this.inventoryRepo.softDelete({
      id: In(deleteMultiInventoriesDto.ids),
    });
    if (softDeleted) {
      await this.inventoryRepo.update(
        {
          id: In(deleteMultiInventoriesDto.ids),
        },
        {
          deleted: DeletedConst.DELETED,
          deleted_by: deletedBy,
        },
      );
    }

    return 'Đã xóa thành công';
  }

  async deleteMultiInventoryProducts(
    deletedBy: number,
    reqData: DeleteMultiInventoryProductsDto,
  ) {
    // TODO: Nếu sản phẩm trong kho đang có đơn đặt hàng ở các trạng thái
    // (Đã xác nhận, Đang lấy hàng, Đang giao hàng) thì không được phép xóa sản phẩm đó
    const softDeleted = await this.inventoryProductRepo.delete({
      id: In(reqData.ids),
      inventory_id: reqData.inventory,
    });

    return 'Đã xóa thành công';
  }

  async softDeleteMultiInventoryInputHistories(
    deletedBy: number,
    reqData: DeleteMultiInventoryInputHistoriesDto,
  ) {
    const inputHistories = await this.inventoryInputHistoryRepo.find({
      where: {
        inventory_id: reqData.inventory,
        id: In(reqData.ids),
      },
      relations: ['details'],
    });
    if (inputHistories && inputHistories.length) {
      const mapProductsNumberNeedDecrease: any = {};
      const productIds: any[] = [];
      const dataUpdateProductsInInventory: any[] = [];
      inputHistories.forEach((element) => {
        if (element.details && element.details.length) {
          element.details.forEach((item) => {
            if (
              !mapProductsNumberNeedDecrease.hasOwnProperty(item.product_id)
            ) {
              mapProductsNumberNeedDecrease[item.product_id] = item.number;
              productIds.push(item.product_id);
            }
          });
        }
      });
      if (productIds.length) {
        const productsInInventory = await this.inventoryProductRepo.find({
          where: {
            inventory_id: reqData.inventory,
            product_id: In(productIds),
          },
        });
        if (productsInInventory && productsInInventory.length) {
          productsInInventory.forEach((element) => {
            if (
              mapProductsNumberNeedDecrease.hasOwnProperty(element.product_id)
            ) {
              dataUpdateProductsInInventory.push({
                id: element.id,
                remaining_number:
                  element.remaining_number -
                  mapProductsNumberNeedDecrease[element.product_id],
              });
            }
          });
        }
      }

      const promiseUpdateData: any[] = [
        this.inventoryInputHistoryRepo.softDelete({
          inventory_id: reqData.inventory,
          id: In(reqData.ids),
        }),
      ];
      if (dataUpdateProductsInInventory.length) {
        promiseUpdateData.push(
          this.inventoryProductRepo.save(dataUpdateProductsInInventory),
        );
      }
      const [softDeleted] = await Promise.all(promiseUpdateData);
      if (softDeleted) {
        await this.inventoryInputHistoryRepo.update(
          {
            inventory_id: reqData.inventory,
            id: In(reqData.ids),
          },
          {
            deleted: DeletedConst.DELETED,
            deleted_by: deletedBy,
          },
        );
      }
    }

    return 'Đã xóa thành công';
  }

  async createOneInventoryInputHistory(
    createdBy: number,
    reqData: CreateInventoryInputHistoryDto,
  ) {
    if (!this.validateDetailInputHistory(reqData.details)) {
      throw new RpcErrorExc(`bad_request:Tạo phiếu nhập kho không thành công`);
    }
    const [inventoryGet, createdByGet] = await Promise.all([
      this.inventoryRepo.findOne(reqData.inventory),
      this.adminRepository.findOne(createdBy),
    ]);
    if (!inventoryGet) {
      throw new RpcErrorExc(`not_found:Kho hàng không tồn tại`);
    }
    const inputCode = await this.generateNewInventoryInputHistoryCode(
      inventoryGet,
    );
    if (!inputCode) {
      throw new RpcErrorExc(`bad_request:Tạo phiếu nhập kho không thành công`);
    }
    const inputHistoryCreated = await this.inventoryRepo.manager.transaction(
      async (entityManager) => {
        const inventoryInputHistoryRepo = entityManager.getCustomRepository(
          InventoryInputHistoryRepository,
        );
        const inventoryProductRepo =
          entityManager.getCustomRepository(InventoryProductRepo);
        const newInputHistory = await inventoryInputHistoryRepo.save({
          code: inputCode,
          inventory_id: reqData.inventory,
          created_by_id: createdBy,
          updated_by_id: createdBy,
          details: reqData.details,
        });
        if (!newInputHistory) {
          throw new RpcErrorExc(
            `bad_request:Tạo phiếu nhập kho không thành công`,
          );
        }
        const inventoryProductsUpdateData: any[] = [];
        const currentInventoryProducts = await inventoryProductRepo.find({
          where: {
            inventory_id: reqData.inventory,
          },
        });
        if (currentInventoryProducts && currentInventoryProducts.length) {
          const mapCurrentInventoryProductNumber =
            generateMapDataWithKeyFieldPair(
              'product_id',
              '',
              currentInventoryProducts,
            );
          reqData.details.map((item) => {
            const inventoryProductData: any = {
              product_id: item.product_id,
            };
            let remainingNumber = item.number;
            if (
              mapCurrentInventoryProductNumber.hasOwnProperty(item.product_id)
            ) {
              const currentInventoryProduct =
                mapCurrentInventoryProductNumber[item.product_id];
              inventoryProductData['id'] = currentInventoryProduct['id'];
              remainingNumber += currentInventoryProduct['remaining_number'];
            } else {
              inventoryProductData['inventory_id'] = reqData.inventory;
            }
            inventoryProductData['remaining_number'] = remainingNumber;
            inventoryProductsUpdateData.push(inventoryProductData);
          });
        } else {
          reqData.details.map((item) => {
            inventoryProductsUpdateData.push({
              product_id: item.product_id,
              inventory_id: reqData.inventory,
              remaining_number: item.number,
            });
          });
        }
        await inventoryProductRepo.save(inventoryProductsUpdateData);
        // TODO: update total of each products

        return newInputHistory;
      },
    );
    inputHistoryCreated['inventory'] = inventoryGet;
    inputHistoryCreated['created_by'] = createdByGet;

    // TODO: check date time return, mysql server timezone GMT+7 but typeorm return GMT+0
    return inputHistoryCreated;
  }

  async updateOneInventoryInputHistory(
    updatedBy: number,
    reqData: UpdateInventoryInputHistoryDto,
  ) {
    if (!this.validateDetailInputHistory(reqData.details)) {
      throw new RpcErrorExc(
        `bad_request:Chỉnh sửa phiếu nhập kho không thành công`,
      );
    }
    const [
      inventoryGet,
      updatedByGet,
      inputHistoriesGet,
      inventoryProductsGet,
    ] = await Promise.all([
      this.inventoryRepo.findOne(reqData.inventory),
      this.adminRepository.findOne(updatedBy),
      this.inventoryInputHistoryRepo.find({
        where: {
          id: reqData.input_history,
        },
        relations: ['details'],
        take: 1,
      }),
      this.inventoryProductRepo.find({
        where: {
          inventory_id: reqData.inventory,
        },
      }),
    ]);
    if (!inventoryGet) {
      throw new RpcErrorExc(`not_found:Kho hàng không tồn tại`);
    }
    if (!inputHistoriesGet || !inputHistoriesGet.length) {
      throw new RpcErrorExc(`not_found:Phiếu nhập kho không tồn tại`);
    }
    const inputHistoryGet = inputHistoriesGet[0];
    const mapCurrentProducts = generateMapDataWithKeyFieldPair(
      'product_id',
      'number',
      inputHistoryGet.details,
    );
    const mapNewProducts = generateMapDataWithKeyFieldPair(
      'product_id',
      'number',
      reqData.details,
    );
    const mapCurrentInventoryProducts = generateMapDataWithKeyFieldPair(
      'product_id',
      '',
      inventoryProductsGet,
    );
    const inputHistoryUpdated = await this.inventoryRepo.manager.transaction(
      async (entityManager) => {
        const inventoryInputHistoryRepo = entityManager.getCustomRepository(
          InventoryInputHistoryRepository,
        );
        const inventoryInputHistoryDetailRepo =
          entityManager.getCustomRepository(
            InventoryInputHistoryDetailRepository,
          );
        const inventoryProductRepo =
          entityManager.getCustomRepository(InventoryProductRepo);
        const productsChange: any = {
          insert: {},
          update: {},
          delete: {},
        };
        reqData.details.forEach((element) => {
          if (!mapCurrentProducts.hasOwnProperty(element.product_id)) {
            productsChange['insert'][element.product_id] = element.number;
          }
        });
        inputHistoryGet.details.forEach((element) => {
          if (!mapNewProducts.hasOwnProperty(element.product_id)) {
            productsChange['delete'][element.product_id] = element.number;
          } else {
            productsChange['update'][element.product_id] = {
              old: element.number,
              new: mapNewProducts[element.product_id],
            };
          }
        });
        console.log(productsChange);
        const dataUpdateInventoryInputHistoryDetails: any[] = [];
        const dataUpdateInventoryProducts: any[] = [];
        Object.keys(productsChange['insert']).forEach((productId) => {
          const inventoryProductData: any = {
            product_id: productId,
          };
          let remainingNumber = productsChange['insert'][productId];
          if (mapCurrentInventoryProducts.hasOwnProperty(productId)) {
            const currentInventoryProduct =
              mapCurrentInventoryProducts[productId];
            inventoryProductData['id'] = currentInventoryProduct['id'];
            remainingNumber += currentInventoryProduct['remaining_number'];
          } else {
            inventoryProductData['inventory_id'] = inventoryGet.id;
          }
          inventoryProductData['remaining_number'] = remainingNumber;
          dataUpdateInventoryProducts.push(inventoryProductData);
          dataUpdateInventoryInputHistoryDetails.push({
            input_history_id: inputHistoryGet.id,
            product_id: productId,
            number: productsChange['insert'][productId],
          });
        });
        Object.keys(productsChange['update']).forEach((productId) => {
          dataUpdateInventoryInputHistoryDetails.push({
            input_history_id: inputHistoryGet.id,
            product_id: productId,
            number: productsChange['update'][productId]['new'],
          });
          if (mapCurrentInventoryProducts.hasOwnProperty(productId)) {
            const numberChange =
              productsChange['update'][productId]['new'] -
              productsChange['update'][productId]['old'];
            const newNumber =
              mapCurrentInventoryProducts[productId]['remaining_number'] +
              numberChange;
            dataUpdateInventoryProducts.push({
              id: mapCurrentInventoryProducts[productId]['id'],
              remaining_number: newNumber,
            });
          }
        });
        Object.keys(productsChange['delete']).forEach((productId) => {
          if (mapCurrentInventoryProducts.hasOwnProperty(productId)) {
            const numberChange = 0 - productsChange['delete'][productId];
            const newNumber =
              mapCurrentInventoryProducts[productId]['remaining_number'] +
              numberChange;
            dataUpdateInventoryProducts.push({
              id: mapCurrentInventoryProducts[productId]['id'],
              remaining_number: newNumber,
            });
          }
        });
        console.log(dataUpdateInventoryProducts);
        console.log(dataUpdateInventoryInputHistoryDetails);
        await Promise.all([
          inventoryInputHistoryDetailRepo.delete({
            input_history_id: inputHistoryGet.id,
          }),
          inventoryInputHistoryRepo.save(
            {
              id: inputHistoryGet.id,
              updated_by_id: -1,
            },
            {
              transaction: false,
            },
          ),
        ]);
        await Promise.all([
          inventoryInputHistoryRepo.save(
            {
              id: inputHistoryGet.id,
              updated_by_id: updatedBy,
            },
            {
              transaction: false,
            },
          ),
          inventoryInputHistoryDetailRepo.save(
            dataUpdateInventoryInputHistoryDetails,
            {
              transaction: false,
            },
          ),
          inventoryProductRepo.save(dataUpdateInventoryProducts, {
            transaction: false,
          }),
        ]);
        // TODO: update total of each products

        return inputHistoryGet;
      },
    );
    delete inputHistoryGet.details;
    inputHistoryGet['inventory'] = inventoryGet;
    inputHistoryGet['updated_by'] = updatedByGet;

    // TODO: check date time return, mysql server timezone GMT+7 but typeorm return GMT+0
    return inputHistoryGet;
  }

  async findAllInventoryInputHistories(
    reqData: FindAllInventoryInputHistoriesDto,
  ) {
    const { offset, limit } = parseOffsetAndLimit(reqData.page, reqData.limit);
    let query = this.inventoryInputHistoryRepo
      .createQueryBuilder('inventory_input_history')
      .innerJoinAndSelect(
        'inventory_input_history.inventory',
        'inventory_input_history_inventory',
      )
      .innerJoinAndSelect(
        'inventory_input_history.created_by',
        'inventory_input_history_created_by',
      );
    if (reqData.inventory) {
      query = query.where({
        inventory_id: reqData.inventory,
      });
    }
    const [results, count] = await query
      .orderBy({
        'inventory_input_history.created_at': 'DESC',
      })
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    const maxPage = Math.ceil(count / limit);
    return { results, total: count, max_page: maxPage };
  }

  async findOneInventoryInputHistory(reqData: FindOneInventoryInputHistoryDto) {
    const lang = 'vi';
    const result = await this.inventoryInputHistoryRepo
      .createQueryBuilder('inventory_input_history')
      .innerJoinAndSelect(
        'inventory_input_history.inventory',
        'inventory_input_history_inventory',
      )
      .innerJoinAndSelect(
        'inventory_input_history.created_by',
        'inventory_input_history_created_by',
      )
      .innerJoinAndSelect(
        'inventory_input_history.details',
        'inventory_input_history_details',
      )
      .innerJoinAndSelect(
        'inventory_input_history_details.product',
        'inventory_input_history_details_product',
      )
      .leftJoinAndSelect(
        'inventory_input_history_details_product.translates',
        'inventory_input_history_details_product_translates',
        'inventory_input_history_details_product_translates.language_code= :productLang',
        {
          productLang: lang,
        },
      )
      .leftJoinAndSelect(
        'inventory_input_history_details_product.images',
        'inventory_input_history_details_product_images',
        'is_thumbnail = :is_thumbnail',
        {
          is_thumbnail: 1,
        },
      )
      .leftJoinAndSelect(
        'inventory_input_history_details_product_images.image',
        'inventory_input_history_details_product_images_image',
      )
      .where(
        'inventory_input_history.id = :id AND inventory_input_history.inventory_id = :inventory_id',
        {
          id: reqData.input_history,
          inventory_id: reqData.inventory,
        },
      )
      .getOne();
    if (!result) {
      throw new RpcErrorExc(`not_found:Phiếu nhập kho không tồn tại`);
    }
    result.details = result.details.map((item) => {
      const processedTranslate = processProductTranslateData(
        item['product']['translates'],
      );
      delete item['product']['translates'];
      item['product'] = {
        ...item['product'],
        ...processedTranslate[lang],
      };
      item['product']['images'] = item['product']['images'].map((item) => {
        const newItem: any = item;
        if (item.image) {
          newItem['name'] = item.image.name;
          newItem['url'] = item.image.url;
          delete newItem.image;
        }

        return newItem;
      });

      return item;
    });

    return result;
  }

  private async checkUniqueInventoryData(data: any) {
    let inventoryGet = null;
    const codeCondition: any = {
      code: data.code,
    };
    const nameCondition: any = {
      name: data.name,
    };
    if (data.hasOwnProperty('id')) {
      codeCondition['id'] = Not(data.id);
      nameCondition['id'] = Not(data.id);
    }
    const inventoriesGet = await this.inventoryRepo.find({
      where: [codeCondition, nameCondition],
      take: 1,
    });
    if (inventoriesGet && inventoriesGet.length) {
      inventoryGet = inventoriesGet[0];
      if (data.code == inventoryGet.code) {
        throw new RpcErrorExc(`conflict:Trùng mã kho hàng`);
      }
      if (data.name == inventoryGet.name) {
        throw new RpcErrorExc(`conflict:Trùng tên kho hàng`);
      }
    }

    return;
  }

  private async generateNewInventoryInputHistoryCode(inventory: Inventory) {
    let newCode = null;
    let nextOrderNumber = 1;
    if (inventory) {
      const currentDate = getCurrentDateFormatDMY();
      const mysqlCurrentDate = getMysqlCurrentDate();
      if (currentDate && mysqlCurrentDate) {
        const inputsInCurrentDate = await this.inventoryInputHistoryRepo.find({
          where: {
            inventory_id: inventory.id,
            created_at: Raw(
              (alias) => `${alias} >= :fromDate AND ${alias} <= :toDate`,
              {
                fromDate: `${mysqlCurrentDate} 00:00:00`,
                toDate: `${mysqlCurrentDate} 23:59:59`,
              },
            ),
          },
        });
        if (inputsInCurrentDate && inputsInCurrentDate.length) {
          nextOrderNumber = inputsInCurrentDate.length + 1;
        }
        newCode = `${inventory.code}-N-${currentDate}-${nextOrderNumber}`;
      }
    }

    return newCode;
  }

  private validateDetailInputHistory(data: InventoryInputHistoryDetailDto[]) {
    let rs = true;
    if (!data || !data.length) {
      return !rs;
    }
    const mapData: any = {};
    data.every((item) => {
      if (mapData.hasOwnProperty(item.product_id)) {
        rs = false;
        return rs;
      } else {
        mapData[item.product_id] = item.number;
        return true;
      }
    });
    // TODO: validate product id exists

    return rs;
  }
}
