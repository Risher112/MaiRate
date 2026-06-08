(function() {
    let r = [];
    document.querySelectorAll('.music_block').forEach(el => {
        let t = el.querySelector('.music_title')?.innerText.trim();
        let a = el.querySelector('.music_achievement_num')?.innerText.match(/[0-9.]+/);
        if (t && a) {
            r.push({
                title: t,
                achieve: parseFloat(a[0]),
                difficulty: document.title.includes('Master') ? 'Master' : 'Re:Master',
                type: el.innerHTML.includes('music_dx') ? 'DX' : 'Standard',
                ap: el.innerHTML.includes('ap.png')
            });
        }
    });
    if (r.length > 0) {
        window.location.href = "https://risher112.github.io/MaiRate/index.html?data=" + encodeURIComponent(JSON.stringify(r));
    } else {
        alert("데이터를 찾지 못했습니다. 리스트 페이지가 맞는지 확인하세요!");
    }
})();
