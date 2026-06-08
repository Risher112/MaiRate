javascript:(async function(){
    let targetDiffs = [3, 4];
    let allData = [];
    alert("수집을 시작합니다. 페이지를 옮겨다니며 데이터를 모으는 동안 절대 창을 닫지 마세요!");

    async function waitForData(selector, timeout = 5000) {
        return new Promise((resolve) => {
            let start = Date.now();
            let check = setInterval(() => {
                if (document.querySelectorAll(selector).length > 0 || Date.now() - start > timeout) {
                    clearInterval(check);
                    resolve();
                }
            }, 500);
        });
    }

    for(let d of targetDiffs) {
        window.location.href = "https://maimaidx.jp/maimai-mobile/record/musicGenre/search/?genre=99&diff=" + d;
        
        // 페이지가 완전히 로딩될 때까지 최대 5초 대기
        await waitForData('.music_block');
        
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
        // 다음 페이지로 가기 전 잠시 휴식
        await new Promise(r => setTimeout(r, 1000));
    }
    
    if(allData.length > 0) {
        window.location.href = "https://risher112.github.io/MaiRate/index.html?data=" + encodeURIComponent(JSON.stringify(allData));
    } else {
        alert("데이터를 찾지 못했습니다. 페이지가 로딩되는 동안 인터넷이 느리거나, 클래스명이 바뀌었을 수 있습니다. 콘솔(F12)을 확인해주세요.");
        console.log("현재 페이지 HTML 일부:", document.body.innerText.substring(0, 1000));
    }
})();
