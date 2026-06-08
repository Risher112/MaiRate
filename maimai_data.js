(async function() {
    alert("데이터 수집을 시작합니다. 잠시만 기다려주세요...");
    let r = [];
    // 마스터(3), 리마스터(4) 페이지를 순차적으로 불러옵니다.
    let diffs = [3, 4]; 
    
    for (let d of diffs) {
        try {
            let res = await fetch(`https://maimaidx.jp/maimai-mobile/record/musicGenre/search/?genre=99&diff=${d}`);
            let text = await res.text();
            let doc = new DOMParser().parseFromString(text, 'text/html');
            let blocks = doc.querySelectorAll('.music_block');
            
            blocks.forEach(el => {
                let t = el.querySelector('.music_title')?.innerText.trim();
                let a = el.querySelector('.music_achievement_num')?.innerText.match(/[0-9.]+/);
                if (t && a) {
                    r.push({
                        title: t,
                        achieve: parseFloat(a[0]),
                        difficulty: d === 3 ? 'Master' : 'Re:Master',
                        type: el.innerHTML.includes('music_dx') ? 'DX' : 'Standard',
                        ap: el.innerHTML.includes('ap.png')
                    });
                }
            });
        } catch (e) {
            console.error("데이터 수집 중 오류 발생:", e);
        }
    }

    if (r.length > 0) {
        alert(r.length + "곡의 데이터를 찾았습니다! 분석기로 이동합니다.");
        window.location.href = "https://risher112.github.io/MaiRate/index.html?data=" + encodeURIComponent(JSON.stringify(r));
    } else {
        alert("데이터를 찾지 못했습니다. 마이마이넷에 로그인되어 있는지 확인하세요.");
    }
})();
