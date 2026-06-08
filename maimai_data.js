javascript:(async function(){
    let targetDiffs = [3, 4];
    let allData = [];
    alert("수집을 시작합니다. 페이지가 자동으로 전환되니 잠시 기다려주세요!");

    for(let d of targetDiffs) {
        // 1. 해당 난이도 페이지로 이동
        window.location.href = "https://maimaidx.jp/maimai-mobile/record/musicGenre/search/?genre=99&diff=" + d;
        
        // 2. 페이지 로딩을 기다림 (약 3초)
        await new Promise(r => setTimeout(r, 3000));
        
        // 3. 현재 페이지에서 데이터 추출
        document.querySelectorAll('.music_block').forEach(el => {
            let t = el.querySelector('.music_title')?.innerText.trim();
            let a = el.querySelector('.music_achievement_num')?.innerText.match(/[0-9.]+/);
            if(t && a) {
                allData.push({
                    title: t,
                    achieve: parseFloat(a[0]),
                    difficulty: d === 3 ? 'Master' : 'Re:Master',
                    type: el.innerHTML.includes('music_dx') ? 'DX' : 'Standard',
                    ap: el.innerHTML.includes('ap.png')
                });
            }
        });
    }
    
    // 4. 수집 완료 후 분석기로 전송
    if(allData.length > 0) {
        window.location.href = "https://risher112.github.io/MaiRate/index.html?data=" + encodeURIComponent(JSON.stringify(allData));
    } else {
        alert("데이터를 찾지 못했습니다. 혹시 로그인이 풀렸거나 페이지 로딩이 너무 느린지 확인해주세요.");
    }
})();
