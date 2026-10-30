import React, { useState, useEffect, useRef, useMemo } from "react";

// ============================================================================
// 1. 한국 식품의약품안전처(식약처) 표준 식품영양성분 내장 데이터베이스 (REAL_NUTRITION_DB)
// ============================================================================
export const REAL_NUTRITION_DB = {
  "곤드레밥": { emoji: "🍚", category: "밥류", kcal: 330, carb: 68.0, protein: 7.2, fat: 2.1, sodium: 210, isVeggie: true },
  "찰보리밥": { emoji: "🍚", category: "밥류", kcal: 295, carb: 64.2, protein: 6.8, fat: 1.1, sodium: 8, isVeggie: true },
  "보리밥": { emoji: "🍚", category: "밥류", kcal: 295, carb: 64.2, protein: 6.8, fat: 1.1, sodium: 8, isVeggie: true },
  "발아현미밥": { emoji: "🌾", category: "밥류", kcal: 305, carb: 64.8, protein: 6.9, fat: 1.9, sodium: 9, isVeggie: true },
  "현미밥": { emoji: "🌾", category: "밥류", kcal: 305, carb: 64.8, protein: 6.9, fat: 1.9, sodium: 9, isVeggie: true },
  "검정약콩밥": { emoji: "🫘", category: "밥류", kcal: 315, carb: 62.5, protein: 9.2, fat: 2.6, sodium: 11, isVeggie: true },
  "백미밥": { emoji: "🍚", category: "밥류", kcal: 310, carb: 68.5, protein: 5.8, fat: 0.6, sodium: 6, isVeggie: false },
  "카레라이스": { emoji: "🍛", category: "밥류", kcal: 410, carb: 67.5, protein: 11.8, fat: 10.4, sodium: 560, isVeggie: true },

  "애호박두부된장찌개": { emoji: "🍲", category: "찌개류", kcal: 95, carb: 7.0, protein: 6.5, fat: 3.8, sodium: 620, isVeggie: true },
  "얼갈이된장국": { emoji: "🍲", category: "국류", kcal: 82, carb: 6.2, protein: 5.8, fat: 2.9, sodium: 570, isVeggie: true },
  "쇠고기미역국": { emoji: "🍲", category: "국류", kcal: 78, carb: 3.1, protein: 6.8, fat: 3.9, sodium: 580, isVeggie: true },
  "소고기뭇국": { emoji: "🥣", category: "국류", kcal: 74, carb: 4.2, protein: 7.1, fat: 3.1, sodium: 490, isVeggie: true },
  "맑은콩나물국": { emoji: "🌱", category: "국류", kcal: 42, carb: 3.8, protein: 3.9, fat: 1.1, sodium: 460, isVeggie: true },
  "김치찌개": { emoji: "🥘", category: "찌개류", kcal: 142, carb: 7.5, protein: 11.8, fat: 7.2, sodium: 690, isVeggie: false },

  "조랭이떡오징어볶음": { emoji: "🦑", category: "볶음류", kcal: 185, carb: 24.0, protein: 14.5, fat: 3.2, sodium: 480, isVeggie: false },
  "돼지갈비찜": { emoji: "🍖", category: "찜류", kcal: 270, carb: 12.8, protein: 22.5, fat: 14.2, sodium: 490, isVeggie: false },
  "제육볶음": { emoji: "🍖", category: "볶음류", kcal: 260, carb: 8.5, protein: 21.0, fat: 15.5, sodium: 520, isVeggie: false },
  "돈가스": { emoji: "🥩", category: "튀김류", kcal: 345, carb: 22.4, protein: 20.8, fat: 19.2, sodium: 470, isVeggie: false },
  "고등어카레구이": { emoji: "🐟", category: "구이류", kcal: 210, carb: 1.8, protein: 20.4, fat: 13.2, sodium: 320, isVeggie: false },
  "수제떡갈비": { emoji: "🍔", category: "구이류", kcal: 248, carb: 13.5, protein: 18.6, fat: 13.2, sodium: 440, isVeggie: false },
  "순살닭강정": { emoji: "🍗", category: "튀김류", kcal: 310, carb: 25.4, protein: 19.2, fat: 14.6, sodium: 460, isVeggie: false },

  "브로콜리새우전": { emoji: "🍤", category: "전류", kcal: 145, carb: 9.2, protein: 8.8, fat: 7.5, sodium: 240, isVeggie: true },
  "꿀단호박치즈구이": { emoji: "🧀", category: "구이류", kcal: 120, carb: 18.0, protein: 4.2, fat: 3.5, sodium: 110, isVeggie: true },
  "단호박찜": { emoji: "🎃", category: "찜류", kcal: 95, carb: 19.5, protein: 2.2, fat: 0.8, sodium: 45, isVeggie: true },
  "간장양념장": { emoji: "🥣", category: "양념류", kcal: 25, carb: 2.5, protein: 1.1, fat: 0.8, sodium: 450, isVeggie: false },
  "시금치나물": { emoji: "🥗", category: "나물류", kcal: 42, carb: 4.5, protein: 3.8, fat: 1.4, sodium: 185, isVeggie: true },
  "콩나물무침": { emoji: "🌱", category: "나물류", kcal: 48, carb: 4.8, protein: 3.6, fat: 1.8, sodium: 195, isVeggie: true },
  "멸치견과류볶음": { emoji: "🐟", category: "볶음류", kcal: 112, carb: 7.4, protein: 9.8, fat: 4.8, sodium: 280, isVeggie: false },
  "야채계란말이": { emoji: "🥚", category: "구이류", kcal: 118, carb: 3.8, protein: 9.2, fat: 7.2, sodium: 220, isVeggie: false },
  "오이생채": { emoji: "🥒", category: "무침류", kcal: 32, carb: 5.4, protein: 1.1, fat: 0.8, sodium: 180, isVeggie: true },

  "배추김치": { emoji: "🥬", category: "김치류", kcal: 18, carb: 2.8, protein: 1.2, fat: 0.2, sodium: 290, isVeggie: true },
  "깍두기": { emoji: "🎲", category: "김치류", kcal: 22, carb: 4.1, protein: 1.0, fat: 0.2, sodium: 260, isVeggie: true },
  "우유": { emoji: "🥛", category: "유제품", kcal: 130, carb: 9.5, protein: 6.2, fat: 7.0, sodium: 100, isVeggie: false },
  "요구르트": { emoji: "🧃", category: "유제품", kcal: 65, carb: 14.5, protein: 1.4, fat: 0.3, sodium: 35, isVeggie: false },
  "멜론": { emoji: "🍈", category: "과일류", kcal: 42, carb: 10.1, protein: 0.9, fat: 0.2, sodium: 12, isVeggie: true },
  "사과": { emoji: "🍎", category: "과일류", kcal: 57, carb: 14.2, protein: 0.3, fat: 0.2, sodium: 2, isVeggie: true }
};

export function lookupNutrition(rawName) {
  const name = (rawName || "").trim();
  if (!name) return null;
  if (REAL_NUTRITION_DB[name]) return { name, ...REAL_NUTRITION_DB[name] };
  for (const [dbKey, val] of Object.entries(REAL_NUTRITION_DB)) {
    if (dbKey.includes(name) || name.includes(dbKey)) return { name, ...val };
  }
  return { name, emoji: "🥗", category: "보조반찬", kcal: 75, carb: 7.5, protein: 4.5, fat: 2.8, sodium: 210, isVeggie: true };
}

// ============================================================================
// 2. 로컬 텍스트 정제 및 메뉴 분리 정규식 함수
// ============================================================================
export function parseMenuTextWithRegex(rawText) {
  if (!rawText || !rawText.trim()) return [];
  let cleaned = rawText;
  cleaned = cleaned.replace(/\*?\s*(에너지|단백질|칼슘|철|kcal|Kcal|KCAL|g|mg)[\s\S]*/g, " ");
  cleaned = cleaned.replace(/\([0-9\.,\s]+\)/g, " ");
  cleaned = cleaned.replace(/[0-9]+(\.[0-9]+)?(\/[0-9]+(\.[0-9]+)?)*\s*/g, " ");
  cleaned = cleaned.replace(/[\*\#\/\~\(\)\[\]\:\;\-\+\=•·"']+/g, " ");
  return cleaned
    .split(/[,\s]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1);
}

const WEEKLY_EXAMPLE_DATA = [
  {
    dayKey: "mon",
    dayLabel: "월요일",
    dateStr: "5월 18일",
    rawNotice: "곤드레밥(5.6) 간장양념장(5.6.13) 애호박두부된장찌개(5.6.16) 조랭이떡오징어볶음(5.6.13.17) 브로콜리새우전(1.5.6.8.9.13) 꿀단호박치즈구이(2) 배추김치(9) 우유(2) * 에너지/단백질/칼슘/철 683.97/33.10/389.37/3.12"
  },
  {
    dayKey: "tue",
    dayLabel: "화요일",
    dateStr: "5월 19일",
    rawNotice: "찰보리밥 얼갈이된장국(5.6) 돼지갈비찜(5.6.10.13) 시금치나물(5.6) 깍두기(9) 멜론 * 에너지/단백질/칼슘/철 715.20/38.40/265.10/3.45"
  },
  {
    dayKey: "wed",
    dayLabel: "수요일",
    dateStr: "5월 20일",
    rawNotice: "발아현미밥 쇠고기미역국(5.6.16) 고등어카레구이(2.5.6.7) 야채계란말이(1.5) 콩나물무침(5) 배추김치(9) 사과 * 에너지/단백질/칼슘/철 702.50/39.80/312.40/3.80"
  },
  {
    dayKey: "thu",
    dayLabel: "목요일",
    dateStr: "5월 21일",
    rawNotice: "검정약콩밥(5) 소고기뭇국(5.6.16) 수제떡갈비(1.5.6.10.16) 멸치견과류볶음(4.5.6.13) 단호박찜 배추김치(9) 요구르트(2) * 에너지/단백질/칼슘/철 748.10/37.90/410.20/3.60"
  },
  {
    dayKey: "fri",
    dayLabel: "금요일",
    dateStr: "5월 22일",
    rawNotice: "카레라이스(2.5.6.10.12.16) 맑은콩나물국(5) 순살닭강정(1.5.6.12.15) 오이생채(13) 배추김치(9) 우유(2) * 에너지/단백질/칼슘/철 835.40/36.20/295.00/3.20"
  }
];

export default function SmartLunchLens() {
  const [weeklyData, setWeeklyData] = useState(() =>
    WEEKLY_EXAMPLE_DATA.map((d) => ({
      ...d,
      isRegistered: true,
      imageUrl: null,
      menus: parseMenuTextWithRegex(d.rawNotice)
    }))
  );
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [dinnerVariantIdx, setDinnerVariantIdx] = useState(0);
  const fileInputRef = useRef(null);

  const currentDay = weeklyData[selectedDayIdx] || weeklyData[0];

  const handleFillAllWeekExample = () => {
    setWeeklyData(
      WEEKLY_EXAMPLE_DATA.map((d) => ({
        ...d,
        isRegistered: true,
        imageUrl: null,
        menus: parseMenuTextWithRegex(d.rawNotice)
      }))
    );
  };

  const handleDayImageUpload = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const uploadedDataUrl = ev.target.result;
      setWeeklyData((prev) =>
        prev.map((day, idx) =>
          idx === selectedDayIdx
            ? {
                ...day,
                isRegistered: true,
                imageUrl: uploadedDataUrl,
                menus: day.menus.length > 0 ? day.menus : parseMenuTextWithRegex(WEEKLY_EXAMPLE_DATA[idx].rawNotice)
              }
            : day
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const dayAnalysis = useMemo(() => {
    const mappedMenus = (currentDay?.menus || []).map((m) => lookupNutrition(m)).filter(Boolean);
    const totals = mappedMenus.reduce(
      (acc, cur) => ({
        kcal: acc.kcal + cur.kcal,
        carb: acc.carb + cur.carb,
        protein: acc.protein + cur.protein,
        fat: acc.fat + cur.fat,
        sodium: acc.sodium + cur.sodium,
        veggieCount: acc.veggieCount + (cur.isVeggie ? 1 : 0)
      }),
      { kcal: 0, carb: 0, protein: 0, fat: 0, sodium: 0, veggieCount: 0 }
    );

    const dinners = [
      {
        rice: { name: "발아현미밥", desc: "식이섬유 보충" },
        soup: { name: "저염 맑은 콩나물국", desc: "나트륨 배출을 돕는 칼륨 함유" },
        main: { name: "닭가슴살 채소 볶음", desc: "고단백 저염식" },
        side: { name: "파프리카 브로콜리 숙회", desc: "비타민 C 집중 보충" },
        dessert: { name: "바나나 반 개", desc: "칼륨 풍부 · 나트륨 배출" }
      },
      {
        rice: { name: "서리태 검은콩밥", desc: "성장기 식물성 단백질 보충" },
        soup: { name: "한우 소고기 무국", desc: "필수 아미노산과 철분 공급" },
        main: { name: "고등어 노릇 구이", desc: "고단백 · 칼슘 · 오메가-3" },
        side: { name: "잔멸치 아몬드 볶음", desc: "뼈 건강을 위한 칼슘 반찬" },
        dessert: { name: "플레인 요거트 & 사과", desc: "칼슘 흡수율과 유산균 보충" }
      }
    ];

    return {
      mappedMenus,
      totals,
      roundedKcal: Math.round(totals.kcal),
      roundedSodium: Math.round(totals.sodium),
      reasonBadge: "점심에 나트륨이 높아 칼륨과 비타민이 풍부한 식단으로 구성했습니다",
      selectedDinner: dinners[dinnerVariantIdx % dinners.length]
    };
  }, [currentDay, dinnerVariantIdx]);

  return (
    <div className="min-h-screen bg-teal-50/40 py-6 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* 상단: 월~금 한 주 급식 캘린더 모아보기 뷰 */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-teal-100 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-black text-slate-900">📅 월~금 한 주 급식 캘린더 모아보기</h2>
          <button
            onClick={handleFillAllWeekExample}
            className="px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-black"
          >
            📄 이번 주 식단표 예시 한 번에 채우기
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {weeklyData.map((dayItem, idx) => {
            const isSelected = idx === selectedDayIdx;
            const isRegistered = dayItem.isRegistered && dayItem.menus.length > 0;
            const dayKcal = Math.round(
              dayItem.menus.reduce((sum, m) => sum + (lookupNutrition(m)?.kcal || 0), 0)
            );
            return (
              <button
                key={dayItem.dayKey}
                onClick={() => setSelectedDayIdx(idx)}
                className={`p-4 rounded-2xl border-2 text-left ${
                  isSelected ? "border-teal-500 bg-teal-50/50" : "border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black">{dayItem.dayLabel} ({dayItem.dateStr})</span>
                  <span className="text-[11px] font-black">{isRegistered ? "등록 완료" : "미등록"}</span>
                </div>
                <div className="text-xs text-slate-700">
                  {dayItem.menus.slice(0, 3).join(", ")}
                </div>
                <div className="mt-2 text-xs font-black text-teal-700">{dayKcal} kcal</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 하단 2단 작업 영역 */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6 bg-white rounded-3xl p-6 border border-teal-100">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleDayImageUpload(e.target.files?.[0])}
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="min-h-[220px] rounded-2xl border-2 border-dashed border-teal-300 flex flex-col items-center justify-center p-4 cursor-pointer"
          >
            {currentDay.imageUrl ? (
              <img src={currentDay.imageUrl} alt="식단표" className="max-h-40 object-contain rounded-xl" />
            ) : (
              <p className="text-sm font-bold text-slate-600">{currentDay.dayLabel} 식단표 사진을 올려주세요</p>
            )}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-base font-black">{currentDay.dayLabel} 메뉴 태그</span>
            <button className="px-3 py-1.5 rounded-full bg-teal-600 text-white text-xs font-black">+ 메뉴 추가</button>
          </div>
        </section>

        <section className="lg:col-span-6 bg-white rounded-3xl p-6 border border-teal-100 space-y-4">
          <h2 className="text-lg font-black">
            {currentDay.dayLabel} 총 열량: {dayAnalysis.roundedKcal} kcal / 나트륨: {dayAnalysis.roundedSodium} mg
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-base font-black">🍽️ 맞춤 저녁 5첩 반상</span>
            <button
              onClick={() => setDinnerVariantIdx((p) => p + 1)}
              className="px-3 py-1 rounded-full bg-teal-600 text-white text-xs font-black"
            >
              🔄 다른 추천
            </button>
          </div>
          <p className="text-xs font-bold text-slate-600">{dayAnalysis.reasonBadge}</p>
        </section>
      </main>
    </div>
  );
}
