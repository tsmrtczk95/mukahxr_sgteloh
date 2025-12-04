// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

// ADDED NEW CODES
import { loadAudioList, loadVideoList, loadArticleText, loadPDF, loadExternalURL, loadQuiz, closePanelExternal } from './components/ui.js';

// Example lists - update to match your assets
const audioList = [{label:'Narration - English', src:'./assets/audio/audio1.mp3'}];
const videoList = [
  {label:'Jerunei - Tiang Pengembumian Masyarakat Melanau', src:'./assets/video/vid_jerunei_tiang.mp4'},
  {label:'Demo Video', src:'./assets/video/video1.mp4'}
];

document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', async (ev)=>{
    const type = btn.dataset.open;
    if(type==='audio') loadAudioList(audioList);
    else if(type==='video') {
      loadVideoList(videoList);
    }
    else if(type==='articles') {
      // toggle example: load text file; you can create a list UI instead
      await loadArticleText('./assets/articles/article1.txt','Article: Intro');
    }
    else if(type==='quiz') {
      await loadQuiz('./assets/quiz/quiz1.json');
    }
    else if(type==='home') {
      // navigate to homepage or close panel
      closePanelExternal();
      // window.location.href = '/';
    }
  });
});

// mobile drawer toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const drawer = document.getElementById('mobile-drawer');
mobileBtn.addEventListener('click', ()=> {
  const open = drawer.style.display==='flex';
  drawer.style.display = open ? 'none' : 'flex';
  drawer.setAttribute('aria-hidden', String(open));
});

// hotspot example: click on hotspot open content (delegated)
document.addEventListener('click', (e)=>{
  const el = e.target.closest('.Hotspot');
  if(el){
    // customize by data-attributes on hotspot element
    const id = el.getAttribute('slot') || 'hotspot';
    // for demo, open article
    loadArticleText('./assets/articles/article1.txt', 'Hotspot: '+id);
  }
});

// Accessibility: close panel with Escape
document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape'){
    closePanelExternal();
  }
});
