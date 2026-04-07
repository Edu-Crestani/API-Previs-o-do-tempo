const sectionInfos = document.querySelector('#section__infos')
const closeW = document.querySelector('.close__window')
const li = document.querySelectorAll('.li__upcoming__days')

let i = [...li].findIndex(el => el.classList.contains('active'))
if (i === -1) i = 0 // fallback

function updateActive() {
    li.forEach(el => el.classList.remove('active'))
    li[i].classList.add('active')
}

function arrow(x){
    i = (i + x + li.length) % li.length
    updateActive()
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') arrow(1)
    if (e.key === 'ArrowLeft') arrow(-1);
    if(e.key === 'Escape') sectionInfos.classList.add('hidden')
})

li.forEach((item, index) => {
    item.addEventListener('click', () => {
        i = index
        updateActive()
        sectionInfos.classList.remove('hidden')
    })
})

closeW.addEventListener('click', () => {
    sectionInfos.classList.add('hidden')
})

