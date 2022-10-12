import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { LangEnum } from '../common/constants/global.constant';
import { NotFoundExc } from '../common/exceptions/custom.exception';
import { getPagingParams, validateDuplicateByField } from '../common/utils';
import { FileService } from '../file/file.service';
import { CreateDocumentDto } from './dto/req/create-document.dto';
import { EditDocumentDto } from './dto/req/edit-document.dto';
import { GetAllDocumentDto } from './dto/req/get-all-document.dto';
import { DocumentTranslationRepository } from './repository/document-translate.repository';
import { DocumentsRepository } from './repository/document.repository';

@Injectable()
export class DocumentService {
  constructor(
    private documentRepository: DocumentsRepository,
    private documentTranslationRepository: DocumentTranslationRepository,
    private fileService: FileService,
  ) {}

  @Transactional()
  async createDocument(document: CreateDocumentDto) {
    const { fileId, translations } = document;
    validateDuplicateByField('lang', translations);
    const file = await this.fileService.findOneOrError(fileId);
    const newDocument = await this.documentRepository.create(document);
    newDocument.file = file;

    const trans = translations.map((item) => {
      return this.documentTranslationRepository.create(item);
    });
    const createdDocumentTrans = await this.documentTranslationRepository.save(
      trans,
    );
    newDocument.translates = createdDocumentTrans;
    return await this.documentRepository.save(newDocument);
  }

  async getAllDocumentByAdmin(params: GetAllDocumentDto) {
    const { data, total } = await this.searchDocuments(params);
    return {
      data,
      total,
    };
  }

  async deleteDocuments(ids) {
    const result = await this.documentRepository.softDelete({
      id: In(ids),
    });
    return result;
  }

  async getAllDocumentClient(params: GetAllDocumentDto, lang: LangEnum) {
    const { data, total } = await this.searchDocuments(params, lang);
    const res = data.map((item) => {
      return {
        ...item,
        shortDesc: item.translates[0].shortDesc,
      };
    });

    return {
      data: res,
      total,
    };
  }

  @Transactional()
  async editDocument(editDocument: EditDocumentDto, id: number) {
    const { translations } = editDocument;
    validateDuplicateByField('lang', translations);
    let documents = await this.documentRepository.findOne({
      relations: ['translates'],
      where: {
        id,
      },
    });
    if (!documents) throw new NotFoundExc();
    documents = {
      ...documents,
      ...editDocument,
    };
    const trans = await this.documentTranslationRepository.create(translations);
    documents.translates = trans;
    await this.documentTranslationRepository.delete({
      documents,
    });
    const res = await this.documentRepository.save(documents);
    return res;
  }

  async searchDocuments(params: GetAllDocumentDto, lang?: LangEnum) {
    const { page, size, shortDesc, ...rest } = params;
    const { take, skip } = getPagingParams(page, size);
    const language = lang ? lang : LangEnum.Vi;

    const [data, total] = await this.documentRepository
      .createQueryBuilder('documents')
      .leftJoinAndSelect('documents.translates', 'translates')
      .leftJoinAndSelect('documents.file', 'file')
      .where((qb) => {
        qb.where({
          ...rest,
        });
        if (lang) qb.andWhere('translates.lang = :lang', { lang: language });
        if (shortDesc) {
          qb.where('translates.shortDesc LIKE :shortDesc', {
            shortDesc: `%${shortDesc}%`,
          });
        }
      })
      .take(take)
      .skip(skip)
      .orderBy('documents.id', 'DESC')
      .getManyAndCount();

    return { data, total };
  }
}
