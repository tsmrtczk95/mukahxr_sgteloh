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
const audioList = [
  {label:'About Jerunei: Body Replacement Chamber', src:'./assets/audio/about_bodychamber.mp3'},
  {label:'About Jerunei: Carved Cavity', src:'./assets/audio/about_cavity.mp3'}
];
const videoList = [
  {label:'Jerunei : Tiang Pengembumian Masyarakat Melanau',
   src:'./assets/video/vid_jerunei_tiang.mp4'},
  {label:'Demo Video',
   src:'./assets/video/video1.mp4'}
];
//const articleList = [{label: "Wiki: Jerunei", src:"./assets/article/wiki_jerunei.pdf", type: "pdf"}];

document.querySelectorAll('[data-open]').forEach(btn=>{
  btn.addEventListener('click', async (ev)=>{
    const type = btn.dataset.open;
    if(type==='audio') loadAudioList(audioList);
    else if(type==='video') {
      loadVideoList(videoList);
    }
    else if(type==='articles') {
      // toggle example: load text file; you can create a list UI instead
      await loadArticleText('./assets/article/text.txt','Article: About the Jerunei');
      // loadArticleText(articleList);
    }
    else if(type==='quiz') {
      await loadQuiz('./assets/quiz/quiz.json');
    }
    else if(type==='home') {
      // navigate to homepage or close panel
      // closePanelExternal();
      window.location.href = 'https://sites.google.com/poliku.edu.my/mukahxplore/3d-experiences';
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
/* DISABLED HOTSPOT TO ARTICLE
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
*/
// Accessibility: close panel with Escape
document.addEventListener('keydown',(e)=>{
  if(e.key==='Escape'){
    closePanelExternal();
  }
});
// == NEW 2025-12-04 ==
UI.openArticle = function(article) {
  const viewer = document.getElementById("articleViewer");

  // Load PDF using iframe
  viewer.innerHTML = `
    <iframe 
      src="${article.src}" 
      style="width:100%; height:100%; border:0;"
      allowfullscreen>
    </iframe>
  `;

  UI.openArticleModal();
};

UI.loadArticleList = function(list) {
  const container = document.getElementById("articleContainer");
  container.innerHTML = "";

  list.forEach(article => {
    const item = document.createElement("button");
    item.textContent = article.label;

    item.onclick = () => UI.openArticle(article);

    container.appendChild(item);
  });
};
/**********
****NEW****/
// Load article list into the side panel
function loadArticleList(list) {
  const container = document.getElementById('articleContainer');
  container.innerHTML = "";

  list.forEach(article => {
    const btn = document.createElement("button");
    btn.className = "list-item";
    btn.textContent = article.label;

    btn.addEventListener("click", () => {
      openPDF(article.src, article.label);
    });

    container.appendChild(btn);
  });

  openPanel("articles");
}

// Show PDF in the modal/iframe
function openPDF(src, title) {
  const viewer = document.getElementById("articleViewer");
  viewer.innerHTML = `
    <iframe 
      src="${src}" 
      style="width:100%; height:100%; border:none;" 
      allowfullscreen>
    </iframe>
  `;

  document.getElementById("articleTitle").textContent = title;
  openPanel("article-viewer");
}
