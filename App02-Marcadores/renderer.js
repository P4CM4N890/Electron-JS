const shell = require('electron'); // To open links in the default browser

class Markers{
    constructor(){
        this.error = document.querySelector('.errorMessage');
        this.formCreate = document.querySelector('.createForm');
        this.markerURL = document.querySelector('.createMarkerURL');
        this.buttonMarker = document.querySelector('.createButton');
        this.markers = document.querySelector('.markers');
        this.removeMarkers = document.querySelector('.removeMarkers')

        this.parser = new DOMParser();

        this.eventListeners();
    }

    eventListeners(){
        this.markerURL.addEventListener('keyup', () => {
            this.buttonMarker.disabled = !this.markerURL.validity.valid;
        });

        this.formCreate.addEventListener('submit', this.createMark.bind(this));

        this.removeMarkers.addEventListener('click', this.deleteAll.bind(this));

        this.markers.addEventListener('click', this.openLink.bind(this));
    }

    createMark(event) {
        event.preventDefault();

        const url = this.markerURL.value;

        fetch(url)
        .then(answer => answer.text())
        .then(this.getContent.bind(this))   // bind sirve como para heredar las instancias
        .then(this.findTitle)
        .then(title => this.saveMarker(url, title))
        .then(this.deleteData.bind(this))
        .then(this.viewMarkers.bind(this))
        .catch(error => this.reportError(error, url))
    }

    getContent(content) {
        console.log(content);
        return this.parser.parseFromString(content, 'text/html');
    }

    findTitle(html) {
        return html.querySelector('title').innerText;
    }

    saveMarker(url, title) {
        localStorage.setItem(url, JSON.stringify({title: title, url: url}));
    }

    deleteData(){
        this.markerURL.value = null;
    }

    getMarkers() {
        return Object.keys(localStorage).map(k => JSON.parse(localStorage.getItem(k)));
    }

    createMarkerHTML(marker) {
        return `<li class="url list-group-item"><h6>${marker.title}</h6><a href="${marker.url}">${marker.url}</a></li>`;
    }

    viewMarkers() {
        let markers = this.getMarkers();
        let html = markers.map(this.createMarkerHTML).join('');

        this.markers.innerHTML = `<ul class="list-group">${html}</ul>`;
    }

    reportError(error, url) {
        this.error.classList.remove('visually-hidden');
        this.error.innerHTML = `Ocurrió un error al acceder a ${url} : ${error}`;

        setTimeout(() => {
            this.error.innerHTML = null;
            this.error.classList.add('visually-hidden');
        }, 5000);
    }

    deleteAll(){
        localStorage.clear();

        this.markers.innerHTML = '';
    }

    openLink(event){
        if(event.target.href){
            event.preventDefault();
            shell.shell.openExternal(event.target.href);
        }
    }
}

// View saved bookmarks
let loadMarkers = new Markers();
loadMarkers.viewMarkers();