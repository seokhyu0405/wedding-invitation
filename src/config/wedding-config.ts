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
    title: "♡⁺｡⋆ 원석 🤍 상휴 결혼해요 ⁺｡⋆♡",
    description: "aT포레웨딩홀 | 2026년 4월 5일 12시반",
    ogImage: "/images/main.jpeg",
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },

  // 메인 화면
  main: {
    title: "Wedding Invitation",
    image: "/images/main.jpeg",
    date: "2026년 4월 5일 일요일 12시 30분",
    venue: "aT포레웨딩홀"
  },

  // 소개글
  intro: {
    title: "",
    text: "서로를 바라보며 걸어온\n소중한 발걸음이\n이제 하나의 길로 이어집니다.\n\n사랑과 믿음으로\n새 가정을 이루는 저희 두 사람의\n작은 시작을 알려드립니다."
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
},
  // 갤러리
  gallery: {
    layout: "grid" as GalleryLayout, // "scroll" 또는 "grid" 선택
    position: "bottom" as GalleryPosition, // "middle" (현재 위치) 또는 "bottom" (맨 하단) 선택
    images: [
      "/images/gallery/image1.jpg",
      "/images/gallery/image2.jpg",
      "/images/gallery/image3.jpg",
      "/images/gallery/image4.jpg",
      "/images/gallery/image5.jpg",
      "/images/gallery/image6.jpg",
      "/images/gallery/image7.jpg",
      "/images/gallery/image8.jpg",
      "/images/gallery/image9.jpg",
    ],
  } as GalleryConfig,

  // 초대의 말씀
  invitation: {
    message: "한 줄기 별빛이 되어 만난 인연\n평생을 함께 걸어가려 합니다.\n\n소중한 분들의 축복 속에\n저희 두 사람이 첫 걸음을 내딛습니다.\n\n귀한 시간 내어 함께해 주신다면\n그 어떤 축복보다 값진 선물이 될 것입니다.\n\n",
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
      bank: "은행명",
      number: "123-456-789012",
      holder: "양원석",
    },
    bride: {
      bank: "은행명",
      number: "987-654-321098",
      holder: "윤상휴",
    },
    groomFather: {
      bank: "은행명",
      number: "111-222-333444",
      holder: "양재준",
    },
    groomMother: {
      bank: "은행명",
      number: "555-666-777888",
      holder: "김선용",
    },
    brideFather: {
      bank: "은행명",
      number: "999-000-111222",
      holder: "윤응률",
    },
    brideMother: {
      bank: "은행명",
      number: "333-444-555666",
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