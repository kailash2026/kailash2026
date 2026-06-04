cd "C:\Users\Administrator\.openclaw\workspace\kailash2026"

# 读取文件
$content = Get-Content src/pages/routes.astro -Raw

# 1. 添加日语和韩语字段到 routePlans 数据
# 替换 twoDay 对象
$content = $content -replace '(\s+)nameEn: "2-Day Kora",', @"
`$1nameEn: "2-Day Kora",
`$1nameJa: "二日間コーラ",
`$1nameKo: "이일 코라",
"@

$content = $content -replace '(\s+)subtitleEn: "For experienced trekkers with good altitude adaptation",', @"
`$1subtitleEn: "For experienced trekkers with good altitude adaptation",
`$1subtitleJa: "挑戦的・体力に自信のある巡礼者向け",
`$1subtitleKo: "도전적・체력이 좋은 순례자용",
"@

$content = $content -replace '(\s+)totalDistanceEn: "52 km",', @"
`$1totalDistanceEn: "52 km",
`$1totalDistanceJa: "52km",
`$1totalDistanceKo: "52km",
"@

$content = $content -replace '(\s+)totalDurationEn: "2 Days 1 Night",', @"
`$1totalDurationEn: "2 Days 1 Night",
`$1totalDurationJa: "2日1夜",
`$1totalDurationKo: "2일 1밤",
"@

$content = $content -replace '(\s+)difficultyEn: "Hard",', @"
`$1difficultyEn: "Hard",
`$1difficultyJa: "困難",
`$1difficultyKo: "어려움",
"@

$content = $content -replace '(\s+)descriptionEn: "Day 1: Darchen to Drirapuk \(22km\)\. Day 2: Start at 3-4 AM, cross Drolma La and return to Darchen \(30km\)\. Only one night stay, extremely demanding second day\.",', @"
`$1descriptionEn: "Day 1: Darchen to Drirapuk (22km). Day 2: Start at 3-4 AM, cross Drolma La and return to Darchen (30km). Only one night stay, extremely demanding second day.",
`$1descriptionJa: "初日はタルチェンからディラプク寺まで（22km）、二日目は早朝3-4時出発でドマラ峠を越えてタルチェンに戻る（30km）。宿泊は1泊のみ、二日目の負荷は極めて大きい。",
`$1descriptionKo: "첫날 타르첸에서 디라푹 사원까지 (22km), 둘째 날 새벽 3-4시 출발해 도마라 고개를 넘어 타르첸으로 귀환 (30km). 숙박은 1박만, 둘째 날 부담이 매우 큼.",
"@

$content = $content -replace '(\s+)warningEn: "⚠️ Day 2 requires 30km with 5648m pass crossing\. Extremely demanding\. Not recommended for first-time pilgrims\.",', @"
`$1warningEn: "⚠️ Day 2 requires 30km with 5648m pass crossing. Extremely demanding. Not recommended for first-time pilgrims.",
`$1warningJa: "⚠️ 二日目は30km・5648m峠越え。極めて厳しく、初めての巡礼者には非推奨。",
`$1warningKo: "⚠️ 둘째 날 30km·5648m 고개 넘기. 매우 힘들며, 처음 하는 순례자에게 비추천.",
"@

# 替换 days 数组中的字段
$content = $content -replace '(\s+)dayEn: "Day 1",', @"
`$1dayEn: "Day 1",
`$1dayJa: "初日",
`$1dayKo: "첫째 날",
"@

$content = $content -replace '(\s+)dayEn: "Day 2",', @"
`$1dayEn: "Day 2",
`$1dayJa: "二日目",
`$1dayKo: "둘째 날",
"@

$content = $content -replace '(\s+)titleEn: "Darchen → Drirapuk",', @"
`$1titleEn: "Darchen → Drirapuk",
`$1titleJa: "タルチェン → ディラプク寺",
`$1titleKo: "타르첸 → 디라푹 사원",
"@

$content = $content -replace '(\s+)titleEn: "Drirapuk → Drolma La → Darchen",', @"
`$1titleEn: "Drirapuk → Drolma La → Darchen",
`$1titleJa: "ディラプク寺 → ドマラ峠 → タルチェン",
`$1titleKo: "디라푹 사원 → 도마라 고개 → 타르첸",
"@

$content = $content -replace '(\s+)distanceEn: "22 km",', @"
`$1distanceEn: "22 km",
`$1distanceJa: "22km",
`$1distanceKo: "22km",
"@

$content = $content -replace '(\s+)distanceEn: "30 km",', @"
`$1distanceEn: "30 km",
`$1distanceJa: "30km",
`$1distanceKo: "30km",
"@

$content = $content -replace '(\s+)altitudeEn: "4600m → 5200m",', @"
`$1altitudeEn: "4600m → 5200m",
`$1altitudeJa: "4600m → 5200m",
`$1altitudeKo: "4600m → 5200m",
"@

$content = $content -replace '(\s+)altitudeEn: "5200m → 5648m → 4600m",', @"
`$1altitudeEn: "5200m → 5648m → 4600m",
`$1altitudeJa: "5200m → 5648m → 4600m",
`$1altitudeKo: "5200m → 5648m → 4600m",
"@

$content = $content -replace '(\s+)durationEn: "6-8 hours",', @"
`$1durationEn: "6-8 hours",
`$1durationJa: "6-8時間",
`$1durationKo: "6-8시간",
"@

$content = $content -replace '(\s+)durationEn: "10-14 hours",', @"
`$1durationEn: "10-14 hours",
`$1durationJa: "10-14時間",
`$1durationKo: "10-14시간",
"@

# 替换 description 字段
$content = $content -replace '(\s+)descriptionEn: "Depart from Darchen, pass Choku Gompa, follow Lhaqu Valley upstream to Drirapuk\. Relatively gentle terrain for altitude adaptation\. Arrive before 3 PM to rest early for Day 2\.",', @"
`$1descriptionEn: "Depart from Darchen, pass Choku Gompa, follow Lhaqu Valley upstream to Drirapuk. Relatively gentle terrain for altitude adaptation. Arrive before 3 PM to rest early for Day 2.",
`$1descriptionJa: "タルチェンを出発、曲古寺を経て、ラ曲河谷を遡上し、最終的にディラプク寺に到着。標高順化の初日、比較的平坦な道。午後3時前に到着し、翌日に備えて早めに休息。",
`$1descriptionKo: "타르첸 출발, 쿠쿠 사원을 지나, 라취 계곡을 따라 올라가 디라푹 사원에 도착. 해발 적응의 첫날, 비교적 평탄한 길. 오후 3시 전에 도착하여 다음 날을 위해 일찍 휴식.",
"@

$content = $content -replace '(\s+)descriptionEn: "Depart at 3-4 AM in darkness with headlamps\. Cross 5648m Drolma La\. Descend past Tsoji Lake and Zhongzhepu Temple without stopping, continue directly to Darchen\. Ultimate test of body and will\.",', @"
`$1descriptionEn: "Depart at 3-4 AM in darkness with headlamps. Cross 5648m Drolma La. Descend past Tsoji Lake and Zhongzhepu Temple without stopping, continue directly to Darchen. Ultimate test of body and will.",
`$1descriptionJa: "早朝3-4時に暗闇の中出発、ヘッドライトで5648mのドマラ峠を越える。下山してトジ錯、ゾンチュプ寺を経て、宿泊せずにタルチェンに戻る。体力と意志の究極の試練。",
`$1descriptionKo: "새벽 3-4시 어둠 속 출발, 헤드램프로 5648m 도마라 고개를 넘는다. 하산하여 토지 호, 종추푸 사원을 지나 숙박 없이 타르첸으로 돌아간다. 체력과 의지의 궁극적인 시험.",
"@

# 替换 highlights 字段
$content = $content -replace '(\s+)highlightsEn: \["Choku Gompa", "Mani Stone Piles", "Drirapuk \(only lodging\)"\],', @"
`$1highlightsEn: ["Choku Gompa", "Mani Stone Piles", "Drirapuk (only lodging)"],
`$1highlightsJa: ["曲古寺", "マニ石群", "ディラプク寺（唯一の宿泊所）"],
`$1highlightsKo: ["쿠쿠 사원", "마니석 군", "디라푹 사원 (유일한 숙소)"],
"@

$content = $content -replace '(\s+)highlightsEn: \["Drolma La \(5648m, highest point\)", "Tsoji Lake", "Zhongzhepu Temple", "Darchen \(finish\)"\],', @"
`$1highlightsEn: ["Drolma La (5648m, highest point)", "Tsoji Lake", "Zhongzhepu Temple", "Darchen (finish)"],
`$1highlightsJa: ["ドマラ峠（5648m、最高点）", "トジ錯", "ゾンチュプ寺", "タルチェン（終点）"],
`$1highlightsKo: ["도마라 고개 (5648m, 최고점)", "토지 호", "종추푸 사원", "타르첸 (종점)"],
"@

# 替换 tips 字段
$content = $content -replace '(\s+)tipsEn: "Don\'t rush on Day 1\. Allow time for altitude adaptation\. Drirapuk is the only lodging—confirm bed availability in peak season\.",', @"
`$1tipsEn: "Don't rush on Day 1. Allow time for altitude adaptation. Drirapuk is the only lodging—confirm bed availability in peak season.",
`$1tipsJa: "初日は急がないで、標高順化の時間を与える。ディラプク寺は唯一の宿泊所、繁忙期は事前確認を。",
`$1tipsKo: "첫날 서두르지 마세요. 해발 적응 시간을 허용하세요. 디라푹 사원은 유일한 숙소, 성수기는 사전 확인.",
"@

$content = $content -replace '(\s+)tipsEn: "Headlamp mandatory! The 1km before the pass is steepest—pace yourself\. Protect knees on descent\. Quick hot water refills at teahouses\. Consider porter or horse to save energy\.",', @"
`$1tipsEn: "Headlamp mandatory! The 1km before the pass is steepest—pace yourself. Protect knees on descent. Quick hot water refills at teahouses. Consider porter or horse to save energy.",
`$1tipsJa: "ヘッドライト必須！峠前1kmが最も急、ペースを保つ。下山時は膝を保護。道中の茶屋で熱湯を補給。ポーターや馬を利用して体力を節約することを推奨。",
`$1tipsKo: "헤드램프 필수! 고개 전 1km가 가장 가파름, 페이스 유지. 하산 시 무릎 보호. 도중 찻집에서 뜨거운 물 보충. 포터나 말을 이용해 체력을 절약하세요.",
"@

# 2. 添加日语和韩语到 threeDay 对象
$content = $content -replace '(\s+)nameEn: "3-Day Kora",', @"
`$1nameEn: "3-Day Kora",
`$1nameJa: "三日間コーラ",
`$1nameKo: "삼일 코라",
"@

$content = $content -replace '(\s+)subtitleEn: "Standard itinerary · Comfortable pace for most pilgrims",', @"
`$1subtitleEn: "Standard itinerary · Comfortable pace for most pilgrims",
`$1subtitleJa: "標準行程・多くの巡礼者に適した快適なペース",
`$1subtitleKo: "표준 일정・대부분의 순례자에게 적합한 편안한 페이스",
"@

$content = $content -replace '(\s+)totalDurationEn: "3 Days 2 Nights",', @"
`$1totalDurationEn: "3 Days 2 Nights",
`$1totalDurationJa: "3日2夜",
`$1totalDurationKo: "3일 2밤",
"@

$content = $content -replace '(\s+)difficultyEn: "Moderate",', @"
`$1difficultyEn: "Moderate",
`$1difficultyJa: "中程度",
`$1difficultyKo: "보통",
"@

$content = $content -replace '(\s+)descriptionEn: "The classic Kora itinerary\. Day 1 for altitude adaptation, Day 2 for pass crossing, Day 3 easy return\. Two nights at Drirapuk and Zunzhepu\. Reasonable pace for most pilgrims\.",', @"
`$1descriptionEn: "The classic Kora itinerary. Day 1 for altitude adaptation, Day 2 for pass crossing, Day 3 easy return. Two nights at Drirapuk and Zunzhepu. Reasonable pace for most pilgrims.",
`$1descriptionJa: "クラシックなコーラ行程。初日は標高順化、二日目は峠越え、三日目は楽な帰路。ディラプク寺とゾンチュプ寺で2泊。多くの巡礼者に適した合理的なペース。",
`$1descriptionKo: "클래식 코라 일정. 첫날 해발 적응, 둘째 날 고개 넘기, 셋째 날 편안한 귀환. 디라푹 사원과 종추푸 사원에서 2박. 대부분의 순례자에게 적합한 합리적인 페이스.",
"@

# 替换 threeDay 的 days 字段
$content = $content -replace '(\s+)dayEn: "Day 3",', @"
`$1dayEn: "Day 3",
`$1dayJa: "三日目",
`$1dayKo: "셋째 날",
"@

$content = $content -replace '(\s+)titleEn: "Drirapuk → Zunzhepu",', @"
`$1titleEn: "Drirapuk → Zunzhepu",
`$1titleJa: "ディラプク寺 → ゾンチュプ寺",
`$1titleKo: "디라푹 사원 → 종추푸 사원",
"@

$content = $content -replace '(\s+)titleEn: "Zunzhepu → Darchen",', @"
`$1titleEn: "Zunzhepu → Darchen",
`$1titleJa: "ゾンチュプ寺 → タルチェン",
`$1titleKo: "종추푸 사원 → 타르첸",
"@

$content = $content -replace '(\s+)distanceEn: "18 km",', @"
`$1distanceEn: "18 km",
`$1distanceJa: "18km",
`$1distanceKo: "18km",
"@

$content = $content -replace '(\s+)distanceEn: "12 km",', @"
`$1distanceEn: "12 km",
`$1distanceJa: "12km",
`$1distanceKo: "12km",
"@

$content = $content -replace '(\s+)altitudeEn: "5200m → 5648m → 4800m",', @"
`$1altitudeEn: "5200m → 5648m → 4800m",
`$1altitudeJa: "5200m → 5648m → 4800m",
`$1altitudeKo: "5200m → 5648m → 4800m",
"@

$content = $content -replace '(\s+)altitudeEn: "4800m → 4600m",', @"
`$1altitudeEn: "4800m → 4600m",
`$1altitudeJa: "4800m → 4600m",
`$1altitudeKo: "4800m → 4600m",
"@

$content = $content -replace '(\s+)durationEn: "8-10 hours",', @"
`$1durationEn: "8-10 hours",
`$1durationJa: "8-10時間",
`$1durationKo: "8-10시간",
"@

$content = $content -replace '(\s+)durationEn: "3-4 hours",', @"
`$1durationEn: "3-4 hours",
`$1durationJa: "3-4時間",
`$1durationKo: "3-4시간",
"@

# 替换 threeDay 的 description 字段
$content = $content -replace '(\s+)descriptionEn: "Depart from Darchen, pass Choku Gompa, follow Lhaqu Valley upstream to Drirapuk\. Gentle terrain for altitude adaptation\. Drirapuk faces Kailash\'s north face—perfect for photos\.",', @"
`$1descriptionEn: "Depart from Darchen, pass Choku Gompa, follow Lhaqu Valley upstream to Drirapuk. Gentle terrain for altitude adaptation. Drirapuk faces Kailash's north face—perfect for photos.",
`$1descriptionJa: "タルチェンを出発、曲古寺を経て、ラ曲河谷を遡上し、ディラプク寺に到着。標高順化の初日、比較的平坦な道。ディラプク寺はカイラス北壁を望む絶好の撮影スポット。",
`$1descriptionKo: "타르첸 출발, 쿠쿠 사원을 지나, 라취 계곡을 따라 올라가 디라푹 사원에 도착. 해발 적응의 첫날, 비교적 평탄한 길. 디라푹 사원은 카일라스 북벽을 바라보는 최고의 촬영 장소.",
"@

$content = $content -replace '(\s+)descriptionEn: "The hardest day\. Depart early to cross 5648m Drolma La, the highest point\. Descend past Tsoji Lake \(Mercy Lake\) to Zunzhepu Temple\. Multiple teahouses along the way for rest and resupply\.",', @"
`$1descriptionEn: "The hardest day. Depart early to cross 5648m Drolma La, the highest point. Descend past Tsoji Lake (Mercy Lake) to Zunzhepu Temple. Multiple teahouses along the way for rest and resupply.",
`$1descriptionJa: "最も厳しい一日。早朝出発で5648mのドマラ峠（最高点）を越える。慈悲湖（トジ錯）を経てゾンチュプ寺に到着。道中に複数の茶屋で休息と補給が可能。",
`$1descriptionKo: "가장 힘든 하루. 이른 출발로 5648m 도마라 고개(최고점)를 넘는다. 자비의 호수(토지 호)를 지나 종추푸 사원에 도착. 도중에 여러 찻집에서 휴식과 보급 가능.",
"@

$content = $content -replace '(\s+)descriptionEn: "Easy day with gentle descent through the canyon back to Darchen\. Victory is near—last rest stop at Zongdui Teahouse\.",', @"
`$1descriptionEn: "Easy day with gentle descent through the canyon back to Darchen. Victory is near—last rest stop at Zongdui Teahouse.",
`$1descriptionJa: "楽な一日。峡谷を緩やかに下り、タルチェンに戻る。勝利は目前—ゾンドゥイ茶屋で最後の休息。",
`$1descriptionKo: "편안한 하루. 협곡을 따라 천천히 하산하여 타르첸으로 돌아간다. 승리가 눈앞—종둬이 찻집에서 마지막 휴식.",
"@

# 替换 threeDay 的 highlights 字段
$content = $content -replace '(\s+)highlightsEn: \["Choku Gompa", "Mani Stone Piles", "Drirapuk \(D1 camp, north face view\)"\],', @"
`$1highlightsEn: ["Choku Gompa", "Mani Stone Piles", "Drirapuk (D1 camp, north face view)"],
`$1highlightsJa: ["曲古寺", "マニ石群", "ディラプク寺（D1宿泊点、北壁展望）"],
`$1highlightsKo: ["쿠쿠 사원", "마니석 군", "디라푹 사원 (D1 숙소, 북벽 전망)"],
"@

$content = $content -replace '(\s+)highlightsEn: \["Drolma La \(5648m, highest point\)", "Tsoji Lake", "Zunzhepu Temple \(D2 camp\)"\],', @"
`$1highlightsEn: ["Drolma La (5648m, highest point)", "Tsoji Lake", "Zunzhepu Temple (D2 camp)"],
`$1highlightsJa: ["ドマラ峠（5648m、最高点）", "トジ錯", "ゾンチュプ寺（D2宿泊点）"],
`$1highlightsKo: ["도마라 고개 (5648m, 최고점)", "토지 호", "종추푸 사원 (D2 숙소)"],
"@

$content = $content -replace '(\s+)highlightsEn: \["Canyon scenery", "Lake Manasarovar view", "Zongdui Teahouse", "Darchen \(finish\)"\],', @"
`$1highlightsEn: ["Canyon scenery", "Lake Manasarovar view", "Zongdui Teahouse", "Darchen (finish)"],
`$1highlightsJa: ["峡谷の風景", "マナサロワール湖遠望", "ゾンドゥイ茶屋", "タルチェン（終点）"],
`$1highlightsKo: ["협곡 풍경", "마나사로바르 호수 원경", "종둬이 찻집", "타르첸 (종점)"],
"@

# 替换 threeDay 的 tips 字段
$content = $content -replace '(\s+)tipsEn: "Don\'t rush on Day 1\. Allow time for altitude adaptation\. Lodging is basic—bring a -10°C sleeping bag\.",', @"
`$1tipsEn: "Don't rush on Day 1. Allow time for altitude adaptation. Lodging is basic—bring a -10°C sleeping bag.",
`$1tipsJa: "初日は急がないで、標高順化の時間を与える。宿泊は簡素—10℃対応の寝袋を持参。",
`$1tipsKo: "첫날 서두르지 마세요. 해발 적응 시간을 허용하세요. 숙소는 기본적—10℃ 등급 침낭을 가져오세요.",
"@

$content = $content -replace '(\s+)tipsEn: "The 1km before the pass is steepest—pace yourself\. Protect knees on descent\. Zunzhepu lodging is more basic than Drirapuk and may be full in peak season\.",', @"
`$1tipsEn: "The 1km before the pass is steepest—pace yourself. Protect knees on descent. Zunzhepu lodging is more basic than Drirapuk and may be full in peak season.",
`$1tipsJa: "峠前1kmが最も急—ペースを保つ。下山時は膝を保護。ゾンチュプ寺の宿泊はディラプク寺より簡素で、繁忙期は満室になる可能性あり。",
`$1tipsKo: "고개 전 1km가 가장 가파름—페이스 유지. 하산 시 무릎 보호. 종추푸 사원 숙소는 디라푹 사원보다 더 기본적이며, 성수기에는 만실될 수 있음.",
"@

$content = $content -replace '(\s+)tipsEn: "Victory is near but stay careful—watch your step\. Celebrate with a good meal back in Darchen!"', @"
`$1tipsEn: "Victory is near but stay careful—watch your step. Celebrate with a good meal back in Darchen!",
`$1tipsJa: "勝利は目前だが油断せず—足元に注意。タルチェンに戻って美味しい食事で祝おう！",
`$1tipsKo: "승리가 눈앞이지만 방심하지 마세요—발밑에 주의. 타르첸에 돌아가서 맛있는 식사로 축하하세요!",
"@

# 3. 添加日语和韩语到 oneDay 对象
$content = $content -replace '(\s+)nameEn: "1-Day Kora",', @"
`$1nameEn: "1-Day Kora",
`$1nameJa: "一日コーラ",
`$1nameKo: "일일 코라",
"@

$content = $content -replace '(\s+)subtitleEn: "Extreme challenge · For experienced pilgrims or elite endurance athletes only",', @"
`$1subtitleEn: "Extreme challenge · For experienced pilgrims or elite endurance athletes only",
`$1subtitleJa: "極限の挑戦・経験豊富な巡礼者やエリート持久選手のみ",
`$1subtitleKo: "극한의 도전・숙련된 순례자나 엘리트 지구력 선수만",
"@

$content = $content -replace '(\s+)totalDistanceEn: "52-56 km",', @"
`$1totalDistanceEn: "52-56 km",
`$1totalDistanceJa: "52-56km",
`$1totalDistanceKo: "52-56km",
"@

$content = $content -replace '(\s+)totalDurationEn: "1 Day \(12-22 hours\)",', @"
`$1totalDurationEn: "1 Day (12-22 hours)",
`$1totalDurationJa: "1日（12-22時間）",
`$1totalDurationKo: "1일 (12-22시간)",
"@

$content = $content -replace '(\s+)difficultyEn: "Extreme",', @"
`$1difficultyEn: "Extreme",
`$1difficultyJa: "極限",
`$1difficultyKo: "극한",
"@

$content = $content -replace '(\s+)descriptionEn: "Completing the 52-56 km outer Kora in one day is the most challenging form of pilgrimage\. Elevation 4560m→5648m→4560m\. Ultimate test of fitness, altitude adaptation, and willpower\. Every year there are rescue cases due to altitude sickness, hypothermia, and getting lost\.",', @"
`$1descriptionEn: "Completing the 52-56 km outer Kora in one day is the most challenging form of pilgrimage. Elevation 4560m→5648m→4560m. Ultimate test of fitness, altitude adaptation, and willpower. Every year there are rescue cases due to altitude sickness, hypothermia, and getting lost.",
`$1descriptionJa: "52-56kmの外回りコーラを1日で完走することは、最も挑戦的な巡礼形態。標高4560m→5648m→4560m。体力、標高適応力、意志力の究極の試験。毎年、高山病、低体温症、迷子による救助事例が発生。",
`$1descriptionKo: "52-56km 외회 코라를 1일에 완주하는 것은 가장 도전적인 순례 형태. 해발 4560m→5648m→4560m. 체력, 해발 적응력, 의지력의 궁극적인 시험. 매년 고산병, 저체온증, 미아에 의한 구조 사례가 발생.",
"@

$content = $content -replace '(\s+)warningEn: "⚠️ Extremely high risk! Rescue cases occur every year\. Only for three groups: experienced Tibetan pilgrims, professional endurance athletes/trail runners, and rare hardcore trekkers with exceptional fitness\. Ordinary tourists must NOT attempt!"', @"
`$1warningEn: "⚠️ Extremely high risk! Rescue cases occur every year. Only for three groups: experienced Tibetan pilgrims, professional endurance athletes/trail runners, and rare hardcore trekkers with exceptional fitness. Ordinary tourists must NOT attempt!",
`$1warningJa: "⚠️ 極めて高いリスク！毎年救助事例が発生。対象は3つのグループのみ：経験豊富なチベット巡礼者、プロの持久選手/トレイルランナー、極めて優れた体力を持つ稀なハードコアトレッカー。一般観光客は絶対に試みないでください！",
`$1warningKo: "⚠️ 매우 높은 위험! 매년 구조 사례가 발생. 대상은 3개 그룹만: 숙련된 티베트 순례자, 프로 지구력 선수/트레일 러너, 극히 우수한 체력을 가진 드문 하드코어 트레커. 일반 관광객은 절대 시도하지 마세요!",
"@

# 替换 oneDay 的 days 字段
$content = $content -replace '(\s+)dayEn: "Full Day",', @"
`$1dayEn: "Full Day",
`$1dayJa: "終日",
`$1dayKo: "종일",
"@

$content = $content -replace '(\s+)titleEn: "Darchen → Drirapuk → Drolma La → Darchen",', @"
`$1titleEn: "Darchen → Drirapuk → Drolma La → Darchen",
`$1titleJa: "タルチェン → ディラプク寺 → ドマラ峠 → タルチェン",
`$1titleKo: "타르첸 → 디라푹 사원 → 도마라 고개 → 타르첸",
"@

$content = $content -replace '(\s+)distanceEn: "52-56 km",', @"
`$1distanceEn: "52-56 km",
`$1distanceJa: "52-56km",
`$1distanceKo: "52-56km",
"@

$content = $content -replace '(\s+)altitudeEn: "4560m → 5648m → 4560m",', @"
`$1altitudeEn: "4560m → 5648m → 4560m",
`$1altitudeJa: "4560m → 5648m → 4560m",
`$1altitudeKo: "4560m → 5648m → 4560m",
"@

$content = $content -replace '(\s+)durationEn: "12-22 hours",', @"
`$1durationEn: "12-22 hours",
`$1durationJa: "12-22時間",
`$1durationKo: "12-22시간",
"@

# 替换 oneDay 的 description 字段
$content = $content -replace '(\s+)descriptionEn: "Depart at 3-5 AM with headlamps\. Pass Choku Gompa and Drirapuk \(no overnight stay\), cross 5648m Drolma La, descend past Tsoji Lake and Zhongzhepu Temple without stopping, return directly to Darchen\. No lodging—carry sufficient supplies and emergency gear\.",', @"
`$1descriptionEn: "Depart at 3-5 AM with headlamps. Pass Choku Gompa and Drirapuk (no overnight stay), cross 5648m Drolma La, descend past Tsoji Lake and Zhongzhepu Temple without stopping, return directly to Darchen. No lodging—carry sufficient supplies and emergency gear.",
`$1descriptionJa: "早朝3-5時にヘッドライトで出発。曲古寺、ディラプク寺（宿泊なし）を経て、5648mのドマラ峠を越える。トジ錯、ゾンチュプ寺を通過し、タルチェンに直接戻る。宿泊なし—十分な補給と非常用装備を持参。",
`$1descriptionKo: "새벽 3-5시 헤드램프로 출발. 쿠쿠 사원, 디라푹 사원(숙박 없음)을 지나, 5648m 도마라 고개를 넘는다. 토지 호, 종추푸 사원을 통과하여 타르첸으로 직접 귀환. 숙박 없음—충분한 보급과 비상 장비를 휴대.",
"@

# 替换 oneDay 的 highlights 字段
$content = $content -replace '(\s+)highlightsEn: \["Choku Gompa", "Drirapuk \(no stay\)", "Drolma La \(5648m\)", "Tsoji Lake", "Zhongzhepu Temple \(no stay\)", "Darchen \(finish\)"\],', @"
`$1highlightsEn: ["Choku Gompa", "Drirapuk (no stay)", "Drolma La (5648m)", "Tsoji Lake", "Zhongzhepu Temple (no stay)", "Darchen (finish)"],
`$1highlightsJa: ["曲古寺", "ディラプク寺（宿泊なし）", "ドマラ峠（5648m）", "トジ錯", "ゾンチュプ寺（宿泊なし）", "タルチェン（終点）"],
`$1highlightsKo: ["쿠쿠 사원", "디라푹 사원 (숙박 없음)", "도마라 고개 (5648m)", "토지 호", "종추푸 사원 (숙박 없음)", "타르첸 (종점)"],
"@

# 替换 oneDay 的 tips 字段
$content = $content -replace '(\s+)tipsEn: "Headlamp and spare batteries mandatory! Carry high-calorie food, emergency blanket, satellite phone or GPS\. Consider local guide or porter\. If altitude sickness symptoms appear \(headache, nausea, breathing difficulty\), stop immediately and descend\.",', @"
`$1tipsEn: "Headlamp and spare batteries mandatory! Carry high-calorie food, emergency blanket, satellite phone or GPS. Consider local guide or porter. If altitude sickness symptoms appear (headache, nausea, breathing difficulty), stop immediately and descend.",
`$1tipsJa: "ヘッドライトと予備電池必須！高カロリー食品、非常用毛布、衛星電話またはGPSを持参。地元ガイドやポーターを検討。高山病の症状（頭痛、吐き気、呼吸困難）が現れたら、直ちに停止して下山。",
`$1tipsKo: "헤드램프와 여분 배터리 필수! 고칼로리 식품, 비상용 담요, 위성전화 또는 GPS를 휴대. 현지 가이드나 포터를 고려. 고산병 증상(두통, 메스꺼움, 호흡곤란)이 나타나면 즉시 중단하고 하산.",
"@

# 4. 添加日语和韩语到 supplyStations 数据
# 替换补给站字段
$content = $content -replace '(\s+)nameEn: "Tarqin",', @"
`$1nameEn: "Tarqin",
`$1nameJa: "タルチェン",
`$1nameKo: "타르첸",
"@

$content = $content -replace '(\s+)distanceEn: "0km \(Start\)",', @"
`$1distanceEn: "0km (Start)",
`$1distanceJa: "0km（起点）",
`$1distanceKo: "0km (시작)",
"@

$content = $content -replace '(\s+)suppliesEn: \["Water", "Coke", "Energy Drinks", "Instant Noodles", "Bread", "Chocolate", "Beef Jerky", "Compressed Biscuits", "Oxygen", "Jackets", "Hats", "Gloves", "Trekking Poles", "Knee Pads", "Sunscreen", "Lip Balm"\],', @"
`$1suppliesEn: ["Water", "Coke", "Energy Drinks", "Instant Noodles", "Bread", "Chocolate", "Beef Jerky", "Compressed Biscuits", "Oxygen", "Jackets", "Hats", "Gloves", "Trekking Poles", "Knee Pads", "Sunscreen", "Lip Balm"],
`$1suppliesJa: ["水", "コーラ", "エネルギードリンク", "インスタントラーメン", "パン", "チョコレート", "ビーフジャーキー", "圧縮ビスケット", "酸素", "ジャケット", "帽子", "手袋", "トレッキングポール", "膝当て", "日焼け止め", "リップクリーム"],
`$1suppliesKo: ["물", "콜라", "에너지 드링크", "인스턴트 라면", "빵", "초콜릿", "소고기 육포", "압축 비스킷", "산소", "재킷", "모자", "장갑", "트레킹 폴", "무릎 보호대", "선스크린", "립밤"],
"@

$content = $content -replace '(\s+)lodgingEn: "Guesthouses & Hotels \(dorms/private rooms\)",', @"
`$1lodgingEn: "Guesthouses & Hotels (dorms/private rooms)",
`$1lodgingJa: "民宿・ホテル（相部屋/個室）",
`$1lodgingKo: "게스트하우스 & 호텔 (도미토리/개인실)",
"@

$content = $content -replace '(\s+)servicesEn: "Restaurants, shops, gas station, post office, internet café, clinic, vehicle/horse/porter rental"', @"
`$1servicesEn: "Restaurants, shops, gas station, post office, internet café, clinic, vehicle/horse/porter rental",
`$1servicesJa: "レストラン、商店、ガソリンスタンド、郵便局、インターネットカフェ、診療所、車/馬/ポーター貸出",
`$1servicesKo: "레스토랑, 상점, 주유소, 우체국, 인터넷 카페, 진료소, 차량/말/포터 대여"
"@

# 保存文件
$content | Set-Content src/pages/routes.astro -NoNewline
Write-Host "Done!"
