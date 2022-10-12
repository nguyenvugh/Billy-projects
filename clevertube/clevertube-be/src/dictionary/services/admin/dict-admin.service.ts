import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { EvDict } from "../../entities/ev_dict.entity";
import { EvDictRepository } from "../../repository/ev_dict.repository";
import { CreateDictAdminDto } from '../../dtos/admin/create-dict-admin.dto';
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";
import { FindAllDictsAdminDto } from './../../dtos/admin/find-all-dicts-admin.dto';
import { UpdateOneDictAdminDto } from "../../../dictionary/dtos/admin/update-dict-admin.dto";
import { In, IsNull, Not } from "typeorm";

@Injectable()
export class DictAdminService {
    constructor(
        private evDictRepository: EvDictRepository,
    ){}

    //CREATE Dict Admin:
    async createDictionaryAdmin(
        createDictAdminDto: CreateDictAdminDto
    ): Promise<EvDict> {
        const { word, detail, example } = createDictAdminDto;

        const existWord = await this.evDictRepository.findOne({ word: word });
        if (existWord) {
            throw new ConflictException(`Duplicate word!`);
        }

        const newEVDictionary = this.evDictRepository.create({
            word,
            detail,
            example,
        })

        return this.evDictRepository.save(newEVDictionary);
    }

    //GETALL Dict Admin:
    async findAllDictsAdmin(
        options: IPaginationOptions, //page, limit
        params: FindAllDictsAdminDto //name
    ): Promise<Pagination<EvDict>> {
        const { word } = params

        const queryBuilder = this.evDictRepository.createQueryBuilder(`dicts`);
        queryBuilder
            .select(`dicts.idx`)
            .groupBy(`dicts.idx`)
            .where(() => {
                if (word) {
                    queryBuilder.andWhere(`dicts.word LIKE :word`, {
                        word: `%${word}`,
                    });
                    options.route +=`&word=${word}`;
                }
            });

        const result = await paginate<EvDict>(queryBuilder, options);
            
        return new Pagination<EvDict>(
            await Promise.all(
                result.items.map(async (dictsHasIdx) => {
                  const dict = await this.evDictRepository
                    .createQueryBuilder(`dict`)
                    .where(`dict.idx = :idx`, { idx: dictsHasIdx.idx })
                    .getOne();
                    return dict;
                }),
            ),
            result.meta,
            result.links,
        );
    }

    //GETONE Dict Admin:
    async findOneDictAdmin(idx: number) {
        const existDict = await this.evDictRepository
            .createQueryBuilder(`dict`)
            .where({ idx })
            .getOne();
        if (!existDict) {
            throw new NotFoundException(`Not found word!`);
        }

        return existDict;
    }

    //UPDATEONE Dict Admin:
    async updateOneDictAdmin(
        idx: number,
        updateOneDictAdminDto: UpdateOneDictAdminDto
    ) {
        const {
            word,
            detail,
            example
        } = updateOneDictAdminDto

        const existDict = await this.evDictRepository.findOne({ idx: idx });
        if (!existDict) {
            throw new NotFoundException(`Not found word`);
        }

        const existDictWord = await this.evDictRepository.findOne({ 
            idx: Not(idx),
            word: word
         })
         if (existDictWord) {
             throw new ConflictException(`Duplicate word!`)
         }

         if (updateOneDictAdminDto) {
            existDict.word = word,
            existDict.detail = detail,
            existDict.example = example
         }

         await this.evDictRepository.save(existDict);
         return this.findOneDictAdmin(idx);
    }

    //DELETEONE Dict Admin:
    async deleteOneDictAdmin(idx: number) {
        const [result] = await Promise.all([
            this.evDictRepository.softDelete({ idx: idx, deletedAt: IsNull() })
        ]);

        if (!result.affected) {
            throw new NotFoundException(`Not found word`);
        }

        if (result.affected) {
            return `Delete Success!`
        }

        return result;
    }

    //DELETEMULTI Dicts Admin:
    async deleteMultiDictsAdmin(idxs: number[]) {
        const [result] = await Promise.all([
            this.evDictRepository.softDelete({
                idx: In(idxs),
                deletedAt: IsNull()
            })
        ])
        if (!result.affected) {
            throw new NotFoundException(`Not found 1 word`);
        }
        if (result.affected) {
            return (`Delete Multi Success!`);
        }

        return result;
    }

}