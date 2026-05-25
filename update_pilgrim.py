import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('src/pages/culture.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到需要替换的文本 - 使用更短的唯一标识
old_text = '''    description: `每年，来自世界各地的朝圣者踏上这条神圣的转山之路。据统计，每年约有3-5万名朝圣者完成转山，其中约60%来自西藏本地，30%来自中国内地，10%来自海外（印度、尼泊尔、欧美等）。

随着交通条件的改善和朝圣文化的传播，这个数字正在逐年增长。2026年，预计将有更多来自世界各地的信徒，踏上这条通往心灵深处的道路。`,
    descriptionEn: `Every year, pilgrims from around the world embark on this sacred circumambulation path. Statistics show that approximately 30,000 to 50,000 pilgrims complete the kora annually, with about 60% from Tibet, 30% from mainland China, and 10% from overseas (India, Nepal, Europe, America, etc.).

As transportation conditions improve and pilgrimage culture spreads, this number is growing year by year. In 2026, more believers from around the world are expected to set foot on this path leading to the depths of the soul.`,'''

new_text = '''    description: `每年，来自世界各地的朝圣者踏上这条神圣的转山之路。据估算，每年实际完成转山的朝圣者超过20万人，其中约60%来自西藏本地，30%来自中国内地，10%来自海外（印度、尼泊尔、欧美等）。考虑到冈仁波齐在藏传佛教、印度教、苯教和耆那教中的神圣地位，以及全球数十亿相关信徒，潜在朝圣者数量达到数亿级别。

印度政府每年收到上百万份朝圣申请，但由于中印协议限制和高原环境承载力，实际获批的只有数千人。这种"供不应求"的局面，更凸显了冈仁波齐在全球信徒心中的独特地位。`,
    descriptionEn: `Every year, pilgrims from around the world embark on this sacred circumambulation path. Estimates suggest that over 200,000 pilgrims complete the kora annually, with approximately 60% from Tibet, 30% from mainland China, and 10% from overseas (India, Nepal, Europe, America, etc.). Considering Mount Kailash's sacred status in Tibetan Buddhism, Hinduism, Bon, and Jainism, and the billions of related believers globally, the potential pilgrim population reaches hundreds of millions.

The Indian government receives over one million pilgrimage applications annually, but due to Sino-Indian agreement restrictions and high-altitude environmental carrying capacity, only a few thousand are approved. This "supply-demand imbalance" further highlights Kailash's unique status in the hearts of global believers.`,'''

if old_text in content:
    content = content.replace(old_text, new_text)
    with open('src/pages/culture.astro', 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: Updated pilgrim numbers')
else:
    print('ERROR: Could not find text to replace')
    
    # 尝试搜索关键词
    if '3-5万名' in content:
        print('Found 3-5万名 in content')
    else:
        print('Could not find 3-5万名')
        
    # 显示内容的一部分
    idx = content.find('每年，来自')
    if idx != -1:
        print(f'Found 每年，来自 at index {idx}')
        print(f'Context: {repr(content[idx:idx+200])}')
