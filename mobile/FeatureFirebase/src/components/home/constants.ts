import {Article, IconEmotion} from './interfaces';

export const NEWS_TABS = [
  {
    label: 'News',
    key: 'news',
  },
  {
    label: 'Reels',
    key: 'reels',
  },
  {
    label: 'Meeting',
    key: 'meet',
  },
];

export const ACTIONS = [
  {
    icon: 'thumbs-up-outline',
    label: 'Like',
  },
  {
    icon: 'chatbox-outline',
    label: 'Comments',
  },
  {
    icon: 'arrow-redo-outline',
    label: 'Share',
  },
];

export const ARTICLES: Article[] = [
  {
    avatarUrl:
      'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/276320272_114766421174255_8314863619723757339_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=St-ZdNFJJJYAX-Q5Cu2&_nc_ht=scontent.fhan4-1.fna&oh=00_AT8W9xpR8mfsaznmrCdCwwUQH02Br9Jdl251qcwU6fYPlQ&oe=6278EAAB',
    name: 'Cống Quỳnh',
    time: 6,
    timeUnit: 'hours',
    content: 'Vẫn còn nguyên vẹn cái cảm xúc ấy chỉ là khác người thôi',
    image:
      'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/279232584_124119493572281_3776324246433614119_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=-Vdm2UUCRnMAX90ggPU&_nc_ht=scontent.fhan4-3.fna&oh=00_AT-VxrbkDgGjt72G3CnD8x4SSRKvqSBtC17mPSEU3B1qxQ&oe=62795774',
    emotions: ['like', 'cute', 'angry'],
    interactNumber: 1400,
    commentNumber: 200,
    sharingNumber: 120,
    feeling: 'đang cảm thấy đang yêu. sdsad sa d asd sa d',
  },
  {
    avatarUrl:
      'https://scontent.fhan3-4.fna.fbcdn.net/v/t1.6435-1/75412108_10158702853373539_4768309577198338048_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=DFIMhiu4ZI4AX8GAARs&_nc_ht=scontent.fhan3-4.fna&oh=00_AT-B10PEsbuX77AgV9nxIW7AMYpecex-DZkOep1hNUxmWQ&oe=629A5344',
    name: 'Tuan Nguyen Duong Thanh ',
    time: 2,
    timeUnit: 'minutes',
    content:
      'Về cùng một nhà nên gặp ngày 2 lần 🥂❤️ #AppsFlyer #Vgames #HeroesTD',
    image:
      'https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/279487463_10160865428428539_5412343171197018971_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=8wJ5y1LhwB4AX_q9m5R&_nc_ht=scontent.fhan4-1.fna&oh=00_AT8muDc33ONVX5MimFvHVVV4xKjHuVfAgqDoViavgjoKEg&oe=627938F4',
    emotions: ['like', 'love'],
    interactNumber: 100,
    commentNumber: 20,
    sharingNumber: 10,
    feeling: 'đang cảm thấy đáng yêu tại',
  },
  {
    avatarUrl:
      'https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/279070952_1430472390736184_1274481708236103794_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=AZMhTRyG0oEAX97KJZk&_nc_ht=scontent.fhan3-4.fna&oh=00_AT_5Qb3bxzHg40vyj4n3wMSYP05xvAZHRvm4Kic3hOOteg&oe=62780919',
    name: 'Tuệ Tĩnh',
    time: 6,
    timeUnit: 'hours',
    content: '',
    image:
      'https://scontent.fhan3-3.fna.fbcdn.net/v/t39.30808-6/279492863_1430192444097512_2099004611564961799_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=7FmLupMj__IAX8C3N-K&_nc_ht=scontent.fhan3-3.fna&oh=00_AT9KtkKiUrQ64LKCIEkRwMbu1uo_vHQHNuOKQCuJKrPj7Q&oe=6278E2CB',
    emotions: ['like', 'cute', 'angry'],
    interactNumber: 100,
    commentNumber: 100,
    sharingNumber: 20,
    feeling: '',
  },
  {
    avatarUrl:
      'https://scontent.fhan3-4.fna.fbcdn.net/v/t1.6435-1/169787607_1629433840590762_4523324359187006731_n.jpg?stp=cp0_dst-jpg_p80x80&_nc_cat=106&ccb=1-5&_nc_sid=7206a8&_nc_ohc=oL2WuAHeUAwAX_p1ELJ&_nc_ht=scontent.fhan3-4.fna&oh=00_AT_F9SRZJd52s8nqQv52QFuXkppcOcYyP6y5J4lq04iv6w&oe=629AC1CD',
    name: 'Nguyễn Lan',
    time: 1,
    timeUnit: 'hours',
    content: `Chăm chỉ gấp đôi bù hôm qua nàoooo.
    Hôm qua lỡ bao nhiêu đơn hôm nay kb khách có thương e k nữa🥺
    Menu nhà Umai LaN Lan hôm nay có`,
    image:
      'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/279289206_1908377762696367_4158895299834180972_n.jpg?stp=dst-jpg_p960x960&_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=9QK4CAWt3rEAX9l-LAv&_nc_ht=scontent.fhan4-3.fna&oh=00_AT_b8VvclCP9gLFolA5fAV6CQ7yVJ7cLCg9Hq5diVwxAIA&oe=627885B5',
    emotions: ['like', 'cute'],
    interactNumber: 120,
    commentNumber: 200,
    sharingNumber: 120,
    feeling: '',
  },
  {
    avatarUrl:
      'https://scontent.fhan3-4.fna.fbcdn.net/v/t39.30808-1/278959362_4935144289945837_3135468591695530624_n.jpg?stp=c0.0.80.80a_cp0_dst-jpg_p80x80&_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=eYeKqgQ1IN4AX-6uTyZ&_nc_ht=scontent.fhan3-4.fna&oh=00_AT8AN5s0vEKdXcj4huqZ42S72k5vyg1m0Cazvub3s8YYrw&oe=6278C7E6',
    name: 'Nguyễn Hồng Nhung',
    time: 2,
    timeUnit: 'hours',
    content:
      'Nguyễn Hồng Nhung đang cười rất to vào ngày kỷ nịm hò hẹn đầu tiên',
    image:
      'https://scontent.fhan3-5.fna.fbcdn.net/v/t39.30808-6/279533431_4948220898638176_1433854724144920999_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=Wb3T9Q0DyvMAX9OhJeC&_nc_ht=scontent.fhan3-5.fna&oh=00_AT8fcGbDihv6ee9FICbwfLEkohh4FcoNFgbx4jUAQXDAvg&oe=6277DC5C',
    emotions: ['like', 'cute'],
    interactNumber: 150,
    commentNumber: 100,
    sharingNumber: 20,
    feeling: '',
  },
];

export const ICONS: IconEmotion = {
  like: 'https://scontent.xx.fbcdn.net/m1/v/t6/An_XUUa_RbP2uET34reUSm-SORfxZQNdt2qwiHe_jChIrox_kWTKPuumUxVKjVtTAUmrLxP1d3MPQr8dvNQ7KdG7CrRS9_VO8025Pr61AQ2hAA.png?ccb=10-5&oh=00_AT_rkyYuYeOKvQxVE0eA_wP0_5f-86o_VyCL_pGmfGnUaw&oe=6277D4F6&_nc_sid=55e238',
  love: 'https://scontent.xx.fbcdn.net/m1/v/t6/An-vDn-iv5dSKtkj5M1tNpwignA9KetY66fU2Hc539Ef0hHg4BXQz5GRuwYhj77AjT0J8s7BtwT8AgZigfqs34LUj1TPfySZD1RNRm1UKPiYbA.png?ccb=10-5&oh=00_AT8Ly1npFMxOARjZMFrG0w2BebfBqyAE6V7YQjPQNO48Qw&oe=6277F368&_nc_sid=55e238',
  haha: 'https://scontent.xx.fbcdn.net/m1/v/t6/An9_qBXxONoGAJ9zmjFbTtbBGSrrUOHrftNu_RTBdkXANIh9jsQotZHKzaxpYykEK8zTRVhrDB8ycaBzVCey2ta6uXkEQMKFmi5cK1HcUEMQzg.png?ccb=10-5&oh=00_AT8TBskYn0VrwggUMMJqszPxy9GH6TIefPcQ730dH3c8GA&oe=627860F3&_nc_sid=55e238',
  wow: 'https://scontent.xx.fbcdn.net/m1/v/t6/An_xv2BcmCLLu9OGiLQ4f2bgdCEavBQnr4s0CBcpY5vPzv8X5rp-IjRiKiYMwCIc9mzZhM9FJlqfvqHf9ExFiE1MWSS6e3rW9Zz6VkzNKWqic8hy.png?ccb=10-5&oh=00_AT_NAQdJd9mIm2db0aCYDuhtXEWJFtmBIq3iwJuKQCP6Xw&oe=627965F1&_nc_sid=55e238',
  cute: 'https://scontent.xx.fbcdn.net/m1/v/t6/An-9fyYLftTy_Mg2cJpugh-vEVNfbtI-fVn4FNS7K-sgIMu9pT62Tb1u9Dfm-xYLtjbLQk-yVHp_IlY_4iMVYp0xLpO7sJvbxbC2OIiRxzS02cOuKEoo.png?ccb=10-5&oh=00_AT_LYU5M2iu1uzoGDKrj_fp3y-i0oRT6VEJJBdl2Ado3Og&oe=62782C98&_nc_sid=55e238',
  sad: 'https://scontent.xx.fbcdn.net/m1/v/t6/An-0mG6nK_Uk-eBw_Z5hXaQPl2Il-GAtgNisMF_CPi6qvu85Lx2-5PalMJvS7fIbuodHct0V3tJrvSxzau9mOcNxqVhoiy8lxxQ9edz-6r6_o9YroQ.png?ccb=10-5&oh=00_AT-eZhahIvDCePQdAxH1cLK7PBReSFTkfj2DSNUs8hzUzQ&oe=62782EC4&_nc_sid=55e238',
  angry:
    'https://scontent.xx.fbcdn.net/m1/v/t6/An-OzaYGRs8HJMUUdL-Q9pzzUe-6dYQYH0YuulfJGzClIwZB6ubbGwhtChGS8FxnChgEmifrcrhalKyw7ubZeQmjvur00_4Bm3UKlJBnXJyqwKsR.png?ccb=10-5&oh=00_AT-FMuCprXJilee4GBYMScN4PfaxRiKa_vGdHHy4XOj2Dg&oe=62791C2B&_nc_sid=55e238',
};
