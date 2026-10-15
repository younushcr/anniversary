const $ = (s) => document.querySelector(s);
const gate = $('#gate');
const site = $('#site');
const dob = $('#dob');
const error = $('#gate-error');
const unlock = $('#unlock');
const reasons = [
  "The way you can make an ordinary day feel special just by being in it.",
  "Your laugh, your little moods, and the way you make me smile without even trying.",
  "Because underneath all your drama is the softest, sweetest heart.",
  "The way our conversations can go from deep life talks to the dumbest argument ever in 0.2 seconds.",
  "Because even from far away, you somehow feel close to me.",
  "Your courage, your dreams, and the person you're growing into.",
  "Because you're my favourite notification, favourite distraction, and favourite human.",
  "Because it's you. Not a perfect person — my person. And I'd still choose you."
];
let reasonIndex = 0;
function unlockSite(){
  if(dob.value !== '2006-06-24'){
    error.textContent = "EHHHH WRONGGG 😭 Try again, baby. You know my birthday! 💗";
    dob.classList.remove('shake'); void dob.offsetWidth; dob.classList.add('shake');
    return;
  }
  error.textContent = 'THAT’S MY GIRLLLL 😭❤️☺️';
  unlock.innerHTML = 'THAT’S MY GIRL 😭❤️ <span>☺</span>';
  unlock.disabled = true;
  musicManuallyPaused = false;
startMusic();
  setTimeout(() => {
    gate.classList.add('hidden'); site.classList.remove('hidden');
    document.body.classList.remove('locked');
    window.scrollTo(0,0);
    startPetals();
    setTimeout(() => makeBurst(window.innerWidth/2, window.innerHeight*.48, 36), 300);
  }, 650);
}
unlock.addEventListener('click', unlockSite);
dob.addEventListener('keydown', e => { if(e.key === 'Enter') unlockSite(); });
dob.addEventListener('change', () => { error.textContent=''; });
document.body.classList.add('locked');

function renderReason(){
  $('#reason-text').textContent = reasons[reasonIndex];
  $('#reason-count').textContent = `${String(reasonIndex+1).padStart(2,'0')} / ${String(reasons.length).padStart(2,'0')}`;
  $('#reason-progress').style.width = `${((reasonIndex+1)/reasons.length)*100}%`;
}
$('#next-reason').addEventListener('click', () => {reasonIndex=(reasonIndex+1)%reasons.length;renderReason();});
$('#prev-reason').addEventListener('click', () => {reasonIndex=(reasonIndex-1+reasons.length)%reasons.length;renderReason();});

const audio = $('#our-song');
const musicToggle = $('#music-toggle');
let musicManuallyPaused = false;

function updateMusicButton(playing) {
  musicToggle.innerHTML = playing
    ? '♫ <span>playing our song</span>'
    : '♫ <span>our little song</span>';

  musicToggle.setAttribute('aria-pressed', String(playing));
}

async function startMusic() {
  if (musicManuallyPaused) return;

  try {
    audio.volume = 0.6;
    await audio.play();
    updateMusicButton(true);
  } catch (error) {
    updateMusicButton(false);
  }
}

// Toggle music manually
musicToggle.addEventListener('click', async () => {
  if (audio.paused) {
    musicManuallyPaused = false;
    await startMusic();
  } else {
    musicManuallyPaused = true;
    audio.pause();
    updateMusicButton(false);
  }
});

audio.addEventListener('play', () => updateMusicButton(true));
audio.addEventListener('pause', () => updateMusicButton(false));
audio.addEventListener('error', () => updateMusicButton(false));

$('#love-button').addEventListener('click', () => {
  $('#final-message').classList.remove('hidden');
  makeBurst(window.innerWidth/2, window.innerHeight*.62, 90);
  for(let i=0;i<18;i++) setTimeout(()=>makeBurst(Math.random()*window.innerWidth,Math.random()*window.innerHeight*.75,16),i*90);
  $('#love-button').textContent='I LOVE YOU MORE, DONKEY 😭❤️';
});

function makeHeart(x,y){
  const el=document.createElement('span'); el.className='cursor-heart';
  el.textContent=['♥','♡','✦'][Math.floor(Math.random()*3)];
  el.style.left=x+'px';el.style.top=y+'px';el.style.fontSize=(10+Math.random()*17)+'px';
  $('#hearts-layer').appendChild(el);setTimeout(()=>el.remove(),1200);
}
function makeBurst(x,y,count){
  for(let i=0;i<count;i++)setTimeout(()=>makeHeart(x+(Math.random()-.5)*240,y+(Math.random()-.5)*150),Math.random()*260);
}
let lastHeart=0;
document.addEventListener('pointermove',e=>{
  if(site.classList.contains('hidden'))return;
  const now=Date.now();if(now-lastHeart>65){makeHeart(e.clientX,e.clientY);lastHeart=now;}
});
function startPetals(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  setInterval(()=>{
    if(site.classList.contains('hidden'))return;
    const p=document.createElement('span');p.className='petal';p.textContent=Math.random()>.5?'♡':'✿';
    p.style.left=Math.random()*100+'vw';p.style.fontSize=(10+Math.random()*13)+'px';
    p.style.setProperty('--drift',(Math.random()*180-90)+'px');
    p.style.animationDuration=(7+Math.random()*7)+'s';
    document.body.appendChild(p);setTimeout(()=>p.remove(),15000);
  },850);
}
const canvas=$('#stars'),ctx=canvas.getContext('2d');let stars=[];
function resizeStars(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:Math.min(150,Math.floor(innerWidth/7))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.4+.2,a:Math.random()*.65+.12,s:Math.random()*.008+.002}));}
function drawStars(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const s of stars){s.a+=Math.sin(Date.now()*s.s)*.004;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,220,237,${Math.max(.08,Math.min(.8,s.a))})`;ctx.fill();}requestAnimationFrame(drawStars);}
addEventListener('resize',resizeStars);resizeStars();drawStars();
renderReason();