interface OtofudaCharacter {
  id: string;
  name: string;
  ruby: string;
  image: string;
  battleImage: string;
  blood: 'A' | 'B' | 'O' | 'AB';
  height: number;
  weight: 'ヒミツ';
  hobby: string;
  favorite: string;
  comic?: string;
}

export const characters: OtofudaCharacter[] = [
  {
    id: 'kanon',
    name: '華音',
    ruby: 'かのん',
    image: '/characters/kanon.png',
    battleImage: '/characters/battle/kanon.png',
    blood: 'A',
    height: 159,
    weight: 'ヒミツ',
    hobby: '食べること、歌うこと',
    favorite: 'ハンバーグ',
    comic: '/comics/gj-jyeb9j'
  },
  {
    id: 'kadone',
    name: '門音',
    ruby: 'かどね',
    image: '/characters/kadone.png',
    battleImage: '/characters/battle/kadone.png',
    blood: 'B',
    height: 163,
    weight: 'ヒミツ',
    hobby: 'イタズラすること',
    favorite: '辛いラーメン',
    comic: '/comics/r1gyujnpb'
  },
  {
    id: 'kunon',
    name: '空音',
    ruby: 'くのん',
    image: '/characters/kunon.png',
    battleImage: '/characters/battle/kunon.png',
    blood: 'A',
    height: 168,
    weight: 'ヒミツ',
    hobby: '旅行、泳ぐこと',
    favorite: 'ぶどう',
    comic: '/comics/3sgakuhqj'
  },
  {
    id: 'hirono',
    name: '大音',
    ruby: 'ひろの',
    image: '/characters/hirono.png',
    battleImage: '/characters/battle/hirono.png',
    blood: 'B',
    height: 149,
    weight: 'ヒミツ',
    hobby: '高いところに行く、登山',
    favorite: '骨付き肉、牛乳',
    comic: '/comics/qzeg_qmth'
  },
  {
    id: 'shuon',
    name: '珠音',
    ruby: 'しゅおん',
    image: '/characters/shuon.png',
    battleImage: '/characters/battle/shuon.png',
    blood: 'O',
    height: 170,
    weight: 'ヒミツ',
    hobby: '知らない街のお店に入ること',
    favorite: 'ポテトサラダ'
  }
] as const
