const fs = require('fs');
const content = fs.readFileSync('src/pages/culture.astro', 'utf8');

// Find and replace Jainism section
const oldJain = `  {
    name: \`耆那教\`,
    nameEn: \`Jainism\`,
    icon: \`🪔\`,
    description: \`耆那教是印度最古老的宗教之一，与佛教同时期兴起。耆那教徒相信，他们的第一位祖师勒舍波在冈仁波齐获得了最终的解脱。

在耆那教传统中，冈仁波齐被称为「八足山」（Astapada），象征着精神修行的最高境界。虽然耆那教朝圣者前往冈仁波齐的人数相对较少，但这座山在他们心中的神圣地位，与其他宗教并无二致。\`,
    descriptionEn: \`Jainism is among India's oldest religions, emerging alongside Buddhism. Jains believe their first Tirthankara, Rishabhanatha, attained final liberation at Mount Kailash.

In Jain tradition, Kailash is called "Astapada" (Eight-Footed Mountain), symbolizing the highest realm of spiritual practice. Though Jain pilgrims to Kailash are relatively few, the mountain holds equally sacred status in their hearts as in other faiths.\`,
    history: \`耆那教与冈仁波齐的关联，在四大宗教中拥有最少的直接文献依据。耆那教经典中对「八足山」的描述比较抽象，并未明确指向今日西藏阿里地区的这座具体山峰。

这种「文献薄弱」不等于「信仰虚假」。耆那教徒对冈仁波齐的虔诚是真实的。但从学术研究的角度来看，我们需要承认：相比于藏传佛教和印度教，耆那教与冈仁波齐的关联链条需要更多的文本学研究来支撑。\`,
    historyEn: \`Jainism's connection to Kailash has the weakest direct textual basis among the four religions. Jain scriptures describe "Astapada" in abstract terms without clearly identifying today's specific peak in Tibet's Ngari Prefecture.

This "textual thinness" does not equal "false faith." Jain devotion to Kailash is genuine. But from an academic standpoint, we must acknowledge that Jainism's Kailash connection requires more philological study compared to Tibetan Buddhism and Hinduism.\`
  },`;

const newJain = `  {
    name: \`耆那教\`,
    nameEn: \`Jainism\`,
    icon: \`🪔\`,
    description: \`耆那教是印度最古老的宗教之一，与佛教同时期兴起，公元前6世纪由大雄（Mahavira）正式系统化。耆那教徒相信，他们的第一位祖师勒舍波（Rishabhanatha，又称Adinatha）在冈仁波齐获得了最终的解脱（Moksha）。

在耆那教传统中，冈仁波齐被称为「八足山」（Astapada），象征着精神修行的最高境界。山名来源于其独特的四棱锥形山体——从四个方向看都有两条"足"（山脊），共八条，故名「八足」。

虽然耆那教朝圣者前往冈仁波齐的人数相对较少，但这座山在他们心中的神圣地位，与其他宗教并无二致。耆那教强调非暴力（Ahimsa）和苦行，转山被视为净化业力、接近解脱的重要途径。\`,
    descriptionEn: \`Jainism is among India's oldest religions, emerging alongside Buddhism in the 6th century BCE, systematized by Mahavira. Jains believe their first Tirthankara, Rishabhanatha (Adinatha), attained final liberation (Moksha) at Mount Kailash.

In Jain tradition, Kailash is called "Astapada" (Eight-Footed Mountain), symbolizing the highest realm of spiritual practice. The name derives from its unique four-sided pyramid shape—from each direction, two "feet" (ridges) are visible, totaling eight.

Though Jain pilgrims to Kailash are relatively few, the mountain holds equally sacred status in their hearts. Jainism emphasizes non-violence (Ahimsa) and asceticism; circumambulation is seen as a path to purify karma and approach liberation.\`,
    history: \`耆那教与冈仁波齐的关联，在四大宗教中拥有最少的直接文献依据。耆那教经典中对「八足山」的描述比较抽象，并未明确指向今日西藏阿里地区的这座具体山峰。

这种「文献薄弱」不等于「信仰虚假」。耆那教徒对冈仁波齐的虔诚是真实的。但从学术研究的角度来看，我们需要承认：相比于藏传佛教和印度教，耆那教与冈仁波齐的关联链条需要更多的文本学研究来支撑。

**耆那教的独特贡献**：
耆那教对冈仁波齐的诠释，强调了「苦行」和「自律」的精神。在耆那教的宇宙观中，冈仁波齐是宇宙的中心点，是灵魂从轮回中解脱的门户。这种诠释与耆那教整体的哲学体系高度一致。

**现代耆那教朝圣**：
由于耆那教信徒主要集中在印度西部（古吉拉特邦、拉贾斯坦邦、马哈拉施特拉邦），前往冈仁波齐的旅程对他们而言尤为遥远。现代交通的发展，使得越来越多的耆那教徒能够完成这一神圣的朝圣之旅。\`,
    historyEn: \`Jainism's connection to Kailash has the weakest direct textual basis among the four religions. Jain scriptures describe "Astapada" in abstract terms without clearly identifying today's specific peak in Tibet's Ngari Prefecture.

This "textual thinness" does not equal "false faith." Jain devotion to Kailash is genuine. But from an academic standpoint, we must acknowledge that Jainism's Kailash connection requires more philological study compared to Tibetan Buddhism and Hinduism.

**Jainism's Unique Contribution**:
Jain interpretation of Kailash emphasizes "asceticism" and "self-discipline." In Jain cosmology, Kailash is the universe's central point, the portal for souls to escape reincarnation. This aligns perfectly with Jainism's broader philosophical system.

**Modern Jain Pilgrimage**:
As most Jains live in western India (Gujarat, Rajasthan, Maharashtra), the journey to Kailash is especially distant for them. Modern transportation has enabled increasing numbers of Jains to complete this sacred pilgrimage.\`
  },`;

if (content.includes(oldJain)) {
  const newContent = content.replace(oldJain, newJain);
  fs.writeFileSync('src/pages/culture.astro', newContent);
  console.log('✅ 耆那教内容已更新');
} else {
  console.log('❌ 找不到耆那教部分');
}
