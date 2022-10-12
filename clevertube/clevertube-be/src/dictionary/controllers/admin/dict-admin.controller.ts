import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Patch, Post, Query } from "@nestjs/common";
import { DictAdminService } from './../../services/admin/dict-admin.service';
import { CreateDictAdminDto } from './../../dtos/admin/create-dict-admin.dto';
import { EvDict } from "../../../dictionary/entities/ev_dict.entity";
import { FindAllDictsAdminDto } from './../../dtos/admin/find-all-dicts-admin.dto';
import { Pagination } from "nestjs-typeorm-paginate";
import { UpdateOneDictAdminDto } from './../../dtos/admin/update-dict-admin.dto';

@Controller(`admin/dictionaries`)
export class DictAdminController {
    constructor(
        private readonly dictAdminService: DictAdminService
    ) {}

    //CREATE Dict Admin:
    @Post()
    async createDictAdmin(
        @Body() createDictAdminDto: CreateDictAdminDto,
    ): Promise<EvDict> {
        return this.dictAdminService.createDictionaryAdmin(createDictAdminDto);
    }

    //GETALL Dicts Admin:
    @Get()
    async findAllDictsAdmin(
        @Query(`page`) page = 1,
        @Query(`limit`) limit = 10,
        @Query() params: FindAllDictsAdminDto
    ): Promise<Pagination<EvDict>> {
        limit = limit > 100 ? 100 : limit;

        return this.dictAdminService.findAllDictsAdmin(
            {
                page,
                limit,
                route: `http://localhost:${process.env.PORT}/admin/dictionaries?`
            },
            params
        );
    }

    //GETONE Dict Admin:
    @Get(`:idx`)
    async findOneDictAdmin(
        @Param(`idx`) idx: number,
    ) {
        return this.dictAdminService.findOneDictAdmin(idx);
    }

    //UPDATEONE Dict Admin:
    @Patch(`:idx`)
    async updateOneDictAdmin(
        @Param(`idx`) idx: number,
        @Body() updateOneDictAdmin: UpdateOneDictAdminDto
    ) {
        return this.dictAdminService.updateOneDictAdmin(
            idx,
            updateOneDictAdmin
        );
    }

    //DELETEONE Dict Admin:
    @Delete(`:idx`)
    async deleteOneDictAdmin(@Param(`idx`) idx: number) {
        return this.dictAdminService.deleteOneDictAdmin(idx);
    }

    //DELETEMULTI Dicts Admin:
    @Delete()
    async deleteMultiDictsAdmin(
        @Query(`idxs`, ParseArrayPipe) idxs: number[]
    ) {
        return this.dictAdminService.deleteMultiDictsAdmin(idxs);
    }
}