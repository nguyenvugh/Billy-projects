import {
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as duration from 'duration-fns';
import { google } from 'googleapis';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import {
  BadRequestExc,
  ConflictExc,
  ExpectationFailedExc,
  NotFoundExc,
} from '../../common/exceptions/custom.exception';
import { EvDictRepository } from '../../dictionary/repository/ev_dict.repository';
import { LevelRepository } from '../../level/repositories/topic.repository';
import { TopicRepository } from '../../topic/repositories/topic.repository';
import {
  YoutubeTranscriptError,
  YoutubeTranscriptService,
} from '../../utils-module/services/youtube-transcript.service';
import { AddVideoHighlightWordDto } from '../dtos/admin/req/add-video-highlight-word.dto';
import { AddVideoTranscriptDto } from '../dtos/admin/req/add-video-transcript.dto';
import { AddVideoTopicDto } from '../dtos/admin/req/add-video-topic.dto';
import { AddVideoDto } from '../dtos/admin/req/add-video.dto';
import { DeleteVideosDto } from '../dtos/admin/req/delete-videos.dto';
import { GetVideoListDto } from '../dtos/admin/req/get-video-list.dto';
import { RemoveHighlightWordDto } from '../dtos/admin/req/remove-video-highlight-word.dto';
import { RemoveVideoTranscriptDto } from '../dtos/admin/req/remove-video-transcript.dto';
import { RemoveVideoTopicDto } from '../dtos/admin/req/remove-video-topic.dto';
import { TranscriptVideoDto } from '../dtos/admin/req/transcript-video.dto';
import { UpdateVideoTranscriptDto } from '../dtos/admin/req/update-video-transcript.dto';
import { UpdateVideoDto } from '../dtos/admin/req/update-video.dto';
import { Videos } from '../entities/videos.entity';
import { VideoTypeKey } from '../enums/video-type-key.enum';
import { VideoHighlightWordsRepository } from '../repositories/video-highlight-words.repository';
import { VideoTranscriptsRepository } from '../repositories/video-transcript.repository';
import { VideosToTopicRepository } from '../repositories/videos-to-topic.repository';
import { VideosRepository } from '../repositories/videos.repository';
import { getVideoYoutubeId } from '../utils/helper.util';
import { YoutubeVideoInfo } from '../interfaces/base.interface';
import { VideoTypesRepository } from '../repositories/video-types.repository';
import { In, IsNull } from 'typeorm';
import { VideosToTopic } from '../entities/videos-to-topic.entity';

@Injectable()
export class VideosAdminService {
  constructor(
    private videosRepo: VideosRepository,
    private ytbTranscriptService: YoutubeTranscriptService,
    private videoTranscriptRepo: VideoTranscriptsRepository,
    private videoHighlightWordRepo: VideoHighlightWordsRepository,
    private evDictRepo: EvDictRepository,
    private videosToTopicRepo: VideosToTopicRepository,
    private videoTypesRepo: VideoTypesRepository,
  ) {}

  // For reference purpose
  // async updateIsFeaturedForExistingData() {
  //   const queryBuilder = this.videosRepo
  //     .createQueryBuilder('videos')
  //     .update()
  //     .set({ isFeature: false })
  //     // Qb update does not format where statement
  //     // "is_feature" is column name in database not the entity's field
  //     .where(`"is_feature" IS NULL`);
  //   console.log('sql', queryBuilder.getQuery());
  //   return queryBuilder.execute();
  // }

  async getVideoList(data: GetVideoListDto, baseRoute: string) {
    const { page, search, limit } = data;
    const queryBuilder = this.videosRepo
      .createQueryBuilder('videos')
      .select('videos.id')
      .groupBy('videos.id');

    let route = baseRoute;
    if (search) {
      queryBuilder.andWhere('videos.name ILIKE :search', {
        search: `%${search}%`,
      });
      route += `?search=${search}`;
    }

    const result = await paginate<Videos>(queryBuilder, {
      page,
      limit,
      route,
    });

    console.log('result', result);

    let videoResult = [];

    const videoIds = result.items.map((videoOnlyHasId) => videoOnlyHasId.id);
    if (videoIds.length > 0) {
      videoResult = await this.videosRepo
        .createQueryBuilder('videos')
        .leftJoinAndSelect('videos.videosType', 'videosType')
        .leftJoinAndSelect('videos.level', 'level')
        .leftJoinAndSelect('level.translates', 'levelTranslations')
        .leftJoinAndSelect('videos.videosToTopics', 'videosToTopics')
        .leftJoinAndSelect('videosToTopics.topic', 'topic')
        .leftJoinAndSelect('topic.translates', 'topicTranslations')
        .where('videos.id IN (:...id)', { id: videoIds })
        .getMany();
    }

    return new Pagination<Videos>(videoResult, result.meta, result.links);
  }

  async getVideoDetails(id: number) {
    const video = await this.videosRepo.getVideoDetails(id);
    if (!video) throw new NotFoundExc('Video not found');
    return video;
  }

  async deleteVideos(data: DeleteVideosDto) {
    const { ids } = data;
    const [resultFist] = await Promise.all([
      this.videosRepo.softDelete(ids),
      this.videosToTopicRepo.softDelete({
        videosId: In(ids),
        deletedAt: IsNull(),
      }),
    ]);
    if (!resultFist.affected) {
      throw new NotFoundExc('Video');
    }

    // return this.videosRepo.softDelete(ids);
  }

  async transcriptVideos(data: TranscriptVideoDto) {
    const { url, videoType } = data;
    if (videoType === VideoTypeKey.YOUTUBE) {
      try {
        const result = await this.ytbTranscriptService.fetchTranscript(url);
        return result;
      } catch (error) {
        if (error instanceof YoutubeTranscriptError)
          throw new UnprocessableEntityException(error.message);
        throw new InternalServerErrorException(error.message);
      }
    }
  }

  async addVideo(data: AddVideoDto) {
    const {
      levelKey,
      topicKeys,
      name,
      desc,
      transcripts,
      videoUrl,
      highlightWords,
      isFeature,
    } = data;

    const videoCode = getVideoYoutubeId(videoUrl);

    if (!videoCode) throw new BadRequestExc('Video url is not valid');

    const existedVideo = await this.videosRepo.findOne({ videoCode });
    if (existedVideo) throw new ConflictExc('Video already existed');

    const videoInfo = await this.getYoutubeVideoInfo(videoCode);
    if (!videoInfo) throw new BadRequestExc('Can not find video info');
    const { length: videoLength, thumbnails } = videoInfo;
    if (!videoLength) throw new BadRequestExc('Video length is not valid');

    const videoTranscripts = transcripts.map((transcript) =>
      this.videoTranscriptRepo.create({
        content: transcript.text,
        duration: transcript.duration,
        startTime: transcript.offset,
      }),
    );

    const videosToTopics = topicKeys.map((topicKey) =>
      this.videosToTopicRepo.create({
        topicKey,
      }),
    );

    let videoHighlightWords = [];
    if (highlightWords) {
      videoHighlightWords = await Promise.all(
        highlightWords.map(async (highlightWord) => {
          const evDict = await this.evDictRepo.findOne({ word: highlightWord });
          if (evDict)
            return this.videoHighlightWordRepo.create({ evDict: evDict });
          console.error(
            `${highlightWord} is not exist in evdict \n at videos-admin.service.ts`,
          );
        }),
      );
      videoHighlightWords = videoHighlightWords.filter(Boolean);
    }

    const video = this.videosRepo.create({
      desc,
      name,
      videoCode,
      length: videoLength,
      videoTranscripts,
      videoTypesKey: VideoTypeKey.YOUTUBE,
      videosToTopics,
      levelKey,
      videoHighlightWords: videoHighlightWords.filter(Boolean),
      thumbnails,
      isFeature,
    });

    return this.videosRepo.save(video);
  }

  async updateVideo(data: UpdateVideoDto) {
    const {
      desc,
      levelKey,
      name,
      videoId,
      isFeature,
      highlightWords,
      topicKeys,
    } = data;

    const video = await this.videosRepo
      .createQueryBuilder('videos')
      .leftJoinAndSelect('videos.videosToTopics', 'videosToTopics')
      .leftJoinAndSelect('videos.videoHighlightWords', 'videoHighlightWords')
      .where('videos.id = :videoId', { videoId })
      .getOne();
    if (!video) throw new NotFoundExc('Video not found');

    if (name) video.name = name;
    if (desc) video.desc = desc;
    if (levelKey) video.levelKey = levelKey;
    if (typeof isFeature === 'boolean') video.isFeature = isFeature;

    if (topicKeys?.length > 0) {
      await this.updateVideoToTopic(video, topicKeys);
    }

    if (highlightWords?.length > 0) {
    }

    return this.videosRepo.save(video);
  }

  async updateVideoToTopic(video: Videos, topicKeys: string[]) {
    const deleted: number[] = [];

    // Delete videoToTopic that is not in request
    video.videosToTopics = video.videosToTopics.filter(
      (videosToTopic, index) => {
        const isExisted = topicKeys.some(
          (topicKey) => topicKey === videosToTopic.topicKey,
        );
        if (isExisted) return true;
        // If videosToTopic is not in request data, delete it from db
        deleted.push(videosToTopic.id);
        return false;
      },
    );

    // Save topic in request that do not exist in db to db
    topicKeys.forEach((topicKey) => {
      const isExisted = video.videosToTopics.some(
        (videosToTopic) => videosToTopic.topicKey === topicKey,
      );
      if (!isExisted) {
        video.videosToTopics.push(
          this.videosToTopicRepo.create({
            topicKey,
          }),
        );
      }
    });

    if (deleted.length) {
      await this.videosToTopicRepo.delete(deleted);
    }
  }

  async updateVideoHighlightWord(video: Videos, highlightWords: string[]) {
    const deleted: number[] = [];
    const highlightWordAdded: string[] = [];

    // Delete videoHighlightWord that is not in request
    video.videoHighlightWords = video.videoHighlightWords.filter(
      (videoHighlightWord, index) => {
        const isExisted = highlightWords.some(
          (highlightWord) => highlightWord === videoHighlightWord.evDict.word,
        );
        if (isExisted) return true;
        // If videoHighlightWord is not in request data, delete it from db
        deleted.push(videoHighlightWord.id);
        return false;
      },
    );

    // Save videoHighlightWord in request that do not exist in db to db
    highlightWords.forEach((highlightWord) => {
      const isExisted = video.videoHighlightWords.some(
        (videoHighlightWord) =>
          videoHighlightWord.evDict.word === highlightWord,
      );
      if (!isExisted) highlightWordAdded.push(highlightWord);
    });

    const evDictAdded = await Promise.all(
      highlightWordAdded.map(async (item) =>
        this.evDictRepo.findOne({ word: item }),
      ),
    );

    evDictAdded.forEach((evDict) =>
      video.videoHighlightWords.push(
        this.videoHighlightWordRepo.create({
          evDict,
        }),
      ),
    );

    if (deleted.length) {
      await this.videoHighlightWordRepo.delete(deleted);
    }
  }

  async addTranscript(data: AddVideoTranscriptDto) {
    const { duration, offset, text, videoId } = data;
    return this.videoTranscriptRepo.save({
      videosId: videoId,
      duration,
      content: text,
      startTime: offset,
    });
  }

  async updateTranscript(data: UpdateVideoTranscriptDto) {
    const { duration, offset, text, transcriptId } = data;

    return this.videoTranscriptRepo.update(transcriptId, {
      duration,
      startTime: offset,
      content: text,
    });
  }

  async removeTranscript(data: RemoveVideoTranscriptDto) {
    const { transcriptId } = data;
    return this.videoTranscriptRepo.softDelete(transcriptId);
  }

  // Docs: https://developers.google.com/youtube/v3/docs/videos?hl=en_US#resource
  /**
   * @param {string} id youtube video id
   */
  private async getYoutubeVideoInfo(id: string): Promise<YoutubeVideoInfo> {
    const result = await google.youtube('v3').videos.list({
      auth: process.env.YOUTUBE_API_KEY,
      part: ['contentDetails', 'snippet'],
      maxResults: 1,
      id: [id],
    });
    const video = result?.data?.items?.[0];
    if (!video) return null;
    return {
      length: duration.toSeconds(result.data.items[0].contentDetails.duration),
      thumbnails: video.snippet.thumbnails,
    };
  }
}
