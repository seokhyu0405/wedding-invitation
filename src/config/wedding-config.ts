const uniqueIdentifier = "JWK-WEDDING-TEMPLATE-V1";

// 갤러리 레이아웃 타입 정의
type GalleryLayout = "scroll" | "grid";
type GalleryPosition = "middle" | "bottom";

interface GalleryConfig {
  layout: GalleryLayout;
  position: GalleryPosition;
  images: string[];
}

export const weddingConfig = {
  // 메타 정보
  meta: {
    title: "원석 ♡ 상휴 결혼합니다",
    description: "aT포레웨딩홀 | 2026년 4월 5일 12시 30분",
    ogImage: "/images/main3.jpeg",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },

  // 메인 화면
  main: {
    title: "Wedding Invitation",
    image: "/images/main2.jpeg",
    date: "2026년 4월 5일 일요일 12시 30분",
    venue: "aT포레웨딩홀"
  },

  // 소개글
  intro: {
    title: "",
    text: ""
  },

  // 결혼식 일정
  date: {
    year: 2026,
    month: 4,
    day: 5,
    hour: 12,
    minute: 30,
    displayDate: "2026.04.4 SUN PM 12:30",
  },

  // 장소 정보
  venue: {
    name: "aT포레웨딩홀",
    address: "서울 서초구 강남대로 27, aT센터 5층",
    tel: "02-6300-2300",
    naverMapId: "aT포레웨딩홀",
    coordinates: {
      latitude: 37.46825607206417,
      longitude: 127.03656647602433,
    },
    placeId: "2107641562",
    mapZoom: "17",
    mapNaverCoordinates: "14141300,4507203,15,0,0,0,dh",
  transportation: {
    subway:
      "신분당선 양재시민의숲역(매헌) 하차\n" +
      "- 지상 4번 출구 이용\n" +
      "- 지하 내부 통로로 aT센터와 바로 연결 가능\n" +
      "- 2호선 강남역, 3호선 양재역에서 신분당선 환승 가능",

    bus:
      "※ 하차 정류장 안내\n" +
      "- 일반/간선/지선버스: aT센터·양재꽃시장 하차\n" +
      "- 좌석/광역버스: 시민의숲·양재꽃시장 하차\n\n" +

      "■ 서울 지선(초록)\n" +
      "0411, 4432\n\n" +

      "■ 서울 간선(파랑)\n" +
      "140, 400, 405, 421, 440, 441, 452, 470, 741\n\n" +

      "■ 경기 일반버스\n" +
      "11-3, 917 (잠실, 과천, 안양)\n\n" +

      "■ 광역/좌석버스\n" +
      "(광역) 9404, 9408, 9409, 9711\n" +
      "(인천) 9100, 9200, 9201, 9300, 9500, 9501, 9802, M6405, M6450\n" +
      "(성남) 9408, 9400\n" +
      "(수원) 3002, 3007, 3008\n" +
      "(용인) 5001, 5001-1, 5002B\n" +
      "(경기) 1311, 1550, 1550-1, 1560\n\n" +

      "■ 마을버스\n" +
      "서초 20 (양재역 → 시민의숲·양재꽃시장)",
  },
  parking:
    "건물 지하 주차장 이용 가능 (하객 주차 2시간 무료)",
  hall: {
    location: "연회장은 지하 1층에 마련되어 있습니다. 예식 30분 전부터 이용가능합니다:)",
    reception: "식장 앞은 양재천이 흐르고있습니다. 벚꽃길에서 따뜻한 봄날의 여유를 즐겨보세요! 🌸",
  },
},
  // 갤러리
  gallery: {
    layout: "grid" as GalleryLayout, // "scroll" 또는 "grid" 선택
    position: "bottom" as GalleryPosition, // "middle" (현재 위치) 또는 "bottom" (맨 하단) 선택
  images: [
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-29_001.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-30_002.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-30_003.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-31_004.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-31_005.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-32_006.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-32_007.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-32_008.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-32_009.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-33_010.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-33_011.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-33_012.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-34_013.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-34_014.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-34_015.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-34_016.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-35_017.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-35_018.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-36_019.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-36_020.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-37_021.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-37_022.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-37_023.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-38_024.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-38_025.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-38_026.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-39_027.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-39_028.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-40_029.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-06-40_030.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-07-01_001.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-07-02_002.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-07-03_003.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-07-03_004.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-07-05_006.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-07-06_007.jpeg",
      "/images/gallery/KakaoTalk_Photo_2026-01-23-10-07-06_008.jpeg",
    ],
  } as GalleryConfig,

  // 초대의 말씀
  invitation: {
    message: "♡⁺｡⋆⁺｡⋆♡ \n\n수많은 변수들 속에서\n서로라는 최적의 해를 찾았습니다.\n\n값진 정답을 평생동안 증명해 나가기 위한 첫 걸음을 \n소중한 분들 앞에서 내딛고자합니다.\n\n귀한 시간 내어 함께해 주신다면\n그 어떤 축복보다 값진 선물이 될 것입니다.\n\n ♡⁺｡⋆⁺｡⋆♡ \n\n",
    photo: "/images/main3.jpeg",
    groom: {
      name: "양원석",
      label: "아들",
      father: "양재준",
      mother: "김선용",
    },
    bride: {
      name: "윤상휴",
      label: "딸",
      father: "윤응률",
      mother: "신영아",
    },
  },

  // 연락처
  contact: {
    groom: {
      phone: "010-8834-9334", // 신랑 전화번호
    },
    bride: {
      phone: "010-4300-9520", // 신부 전화번호
    },
  },

  // 계좌번호
  account: {
    groom: {
      bank: "농협은행",
      number: "3028834933461",
      holder: "양원석",
    },
    bride: {
      bank: "국민은행",
      number: "94300952066",
      holder: "윤상휴",
    },
    groomFather: {
      bank: "농협은행",
      number: "108712019287",
      holder: "양재준",
    },
    groomMother: {
      bank: "농협은행",
      number: "3520809481393",
      holder: "김선용",
    },
    brideFather: {
      bank: "우리은행",
      number: "26608229202101",
      holder: "윤응률",
    },
    brideMother: {
      bank: "우리은행",
      number: "26622128802001",
      holder: "신영아",
    }
  },

  // RSVP 설정
  rsvp: {
    enabled: false, // RSVP 섹션 표시 여부
    showMealOption: false, // 식사 여부 입력 옵션 표시 여부
  },

  // 슬랙 알림 설정
  slack: {
    webhookUrl: process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL || "",
    channel: "#wedding-response",
    compactMessage: true, // 슬랙 메시지를 간결하게 표시
  },
}; 