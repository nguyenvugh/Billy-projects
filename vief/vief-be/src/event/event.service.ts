import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { LangEnum, TIMELINE_EVENT } from '../common/constants/global.constant';
import {
  ConflictExc,
  NotFoundExc,
} from '../common/exceptions/custom.exception';
import { getPagingParams, validateDuplicateByField } from '../common/utils';
import { FileService } from '../file/file.service';
import { CreateEventDto } from './dto/req/admin/create-event.dto';
import { EditEventDto } from './dto/req/admin/edit-event.dto';
import { RegisterEventDto } from './dto/req/client/register-event.dto';
import { GetListEventsDto } from './dto/req/get-list-event.dto';
import { EventTranslationRepository } from './repository/event-translation.repository';
import { EventRepository } from './repository/event.repository';
import { EventsToRegisterInfoRepository } from './repository/events-to-register-info.repository';
import { RegisterInfoRepository } from './repository/register-info.repository';

@Injectable()
export class EventService {
  constructor(
    private fileService: FileService,
    private eventRepository: EventRepository,
    private eventTranslationRepository: EventTranslationRepository,
    private registerInfoRepository: RegisterInfoRepository,
    private eventsToRegisterInfoRepository: EventsToRegisterInfoRepository,
  ) {}

  @Transactional()
  async createEvent(createEvent: CreateEventDto) {
    const { thumbnailId, isFeature, field, location, timeStart, translations } =
      createEvent;
    validateDuplicateByField('lang', translations);
    validateDuplicateByField('slug', translations);

    const arrSlug = translations.map((trans) => trans.slug);
    const isExitBySlug = await this.eventTranslationRepository.find({
      where: {
        slug: In(arrSlug),
      },
    });

    if (isExitBySlug.length > 0) throw new ConflictExc('slug already exists');
    const thumbnail = await this.fileService.findOneOrError(thumbnailId);

    const event = this.eventRepository.create({
      thumbnail,
      isFeature,
      field,
      location,
      timeStart,
    });
    await this.eventRepository.save(event);

    const data = translations.map((item) => {
      return {
        ...item,
        event,
      };
    });

    const trans = this.eventTranslationRepository.create(data);
    await this.eventTranslationRepository.insert(trans);

    return event;
  }

  @Transactional()
  async deleteEvents(ids: number[]) {
    const data = await this.eventTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.event', 'event')
      .where('event.id IN (:...ids)', { ids })
      .getMany();
    const idsTrans = data.map((i) => i.id);

    if (idsTrans.length > 0) {
      const resultTrans = await this.eventTranslationRepository.softDelete(
        idsTrans,
      );

      if (!resultTrans.affected) {
        throw new NotFoundExc('translate');
      }
    }
    const result = await this.eventRepository.softDelete({
      id: In(ids),
    });
    if (!result.affected) throw new NotFoundExc();
    return result;
  }

  async getListEvents(getEvents: GetListEventsDto, lang: LangEnum) {
    const { page, size, title, location, timeline, ...rest } = getEvents;
    const { take, skip } = getPagingParams(page, size);
    const language = lang ? lang : LangEnum.Vi;

    const [data, total] = await this.eventRepository
      .createQueryBuilder('event')
      .innerJoinAndSelect('event.translates', 'translates')
      .leftJoinAndSelect('event.thumbnail', 'thumbnail')
      .where((qb) => {
        qb.where({
          ...rest,
        }).andWhere('translates.lang = :lang', { lang: language });
        if (title) {
          qb.andWhere('translates.title LIKE :title', { title: `%${title}%` });
        }
        if (location) {
          qb.andWhere('event.location LIKE :location', {
            location: `%${location}%`,
          });
        }
        if (timeline === TIMELINE_EVENT.UPCOMING) {
          qb.andWhere('event.timeStart >= :time', {
            time: new Date().toISOString(),
          });
        }
        if (timeline === TIMELINE_EVENT.TOOK_PLACE) {
          qb.andWhere('event.timeStart <= :time', {
            time: new Date().toISOString(),
          });
        }
      })
      .take(take)
      .skip(skip)
      .orderBy('event.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data,
      total,
    };
  }

  async getDetailEventByAdmin(id: number) {
    const res = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: ['translates', 'thumbnail'],
    });

    if (!res) throw new NotFoundExc();
    return res;
  }

  async getDetailEventByClient(slug: string, lang: LangEnum) {
    const language = lang ? lang : LangEnum.Vi;
    const data = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoinAndSelect('event.thumbnail', 'thumbnail')
      .innerJoinAndSelect('event.translates', 'translates')
      .where('translates.lang = :language', { language })
      .andWhere('translates.slug = :slug', { slug })
      .getOne();

    if (!data) throw new NotFoundExc();

    return {
      data,
    };
  }

  @Transactional()
  async registerEvent(registerEvent: RegisterEventDto) {
    const { eventId, email, phone, fullName } = registerEvent;

    const event = await this.eventRepository.findOne({
      where: {
        id: eventId,
      },
    });

    if (!event) throw new NotFoundExc();

    const isExitByPhoneOrEmail = await this.registerInfoRepository
      .createQueryBuilder('register')
      .leftJoinAndSelect(
        'register.eventsToRegisterInfo',
        'eventsToRegisterInfo',
      )
      .leftJoinAndSelect('eventsToRegisterInfo.event', 'event')
      .where((qb) => {
        qb.where('event.id = :id', { id: eventId });
        qb.andWhere('(register.email = :email OR register.phone = :phone)', {
          email,
          phone,
        });
      })
      .getMany();
    if (isExitByPhoneOrEmail.length > 0)
      throw new ConflictExc('email or phone already registered in this event');

    const register = this.registerInfoRepository.create({
      email,
      phone,
      fullName,
    });
    await this.registerInfoRepository.save(register);

    const eventToRegister = this.eventsToRegisterInfoRepository.create({
      event: event,
      registerInfo: register,
    });
    await this.eventsToRegisterInfoRepository.save(eventToRegister);

    return eventToRegister;
  }

  async getListRegisterByAdmin(eventId: number) {
    const [data, total] = await this.registerInfoRepository
      .createQueryBuilder('register')
      .leftJoinAndSelect(
        'register.eventsToRegisterInfo',
        'eventsToRegisterInfo',
      )
      .leftJoinAndSelect('eventsToRegisterInfo.event', 'event')
      .where('event.id = :id', { id: eventId })
      .getManyAndCount();

    return {
      data,
      total,
    };
  }

  @Transactional()
  async editEvent(editEvent: EditEventDto, id: number) {
    const { translations, thumbnailId } = editEvent;
    validateDuplicateByField('lang', translations);
    validateDuplicateByField('slug', translations);

    const image = await this.fileService.findOneOrError(thumbnailId);

    let event = await this.eventRepository.findOne({
      where: {
        id,
      },
    });
    if (!event) throw new NotFoundExc();

    event = {
      ...event,
      ...editEvent,
      thumbnail: image,
    };

    const translate = await this.eventTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.event', 'event')
      .where('event.id = :id', { id: event.id })
      .getMany();

    const transNotExitLang = [];
    translations.forEach((trans, index) => {
      if (!translate.map((t) => t.lang).includes(trans.lang)) {
        transNotExitLang.push(trans);
        translations.splice(index, 1);
      }
    });

    const listTransId = await this.eventTranslationRepository
      .createQueryBuilder('translate')
      .leftJoinAndSelect('translate.event', 'event')
      .where('translate.slug IN (:...slugs)', {
        slugs: translations.map((translation) => translation.slug),
      })
      .andWhere('event.id = :id', { id })
      .getMany();

    const isExitBySlug = await this.eventTranslationRepository
      .createQueryBuilder()
      .where((qb) => {
        if (listTransId.length) {
          qb.where({
            slug: In(transNotExitLang.map((translation) => translation?.slug)),
          }).orWhere('id NOT IN (:...ids) AND slug IN (:...slugs)', {
            slugs: translations.map((t) => t?.slug),
            ids: listTransId.map((t) => t?.id),
          });
        } else {
          qb.where({
            slug: In(transNotExitLang.map((translation) => translation?.slug)),
          }).orWhere('slug IN (:...slugs)', {
            slugs: translations.map((t) => t?.slug),
          });
        }
      })
      .getMany();

    if (isExitBySlug.length) throw new ConflictExc('slug already exists');
    const data = transNotExitLang.map((item) => {
      return {
        ...item,
        event,
      };
    });

    translations.forEach(async (trans) => {
      const translate = await this.eventTranslationRepository
        .createQueryBuilder('translate')
        .leftJoinAndSelect('translate.event', 'event')
        .where('event.id = :id', { id })
        .andWhere('translate.lang = :lang', { lang: trans.lang })
        .getOne();
      if (translate.id) {
        await this.eventTranslationRepository.save({
          ...trans,
          id: translate.id,
        });
      }
    });

    const trans = this.eventTranslationRepository.create(data);
    await this.eventTranslationRepository.save(trans);

    await this.eventRepository.save(event);

    return event;
  }
}
